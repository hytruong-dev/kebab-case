// Separate-account Gemini runner. Google refuses sign-in inside a Playwright-launched browser ("This browser or app
// may not be secure"), so we use a NORMAL Chrome with its own profile and a debug port; the owner signs in by hand
// once, then this script attaches over CDP. It never touches the Playwright MCP browser (mcp-chrome-*) used by
// other jobs. Same logic as scripts/gemini-thread-gen.js: ONE conversation for the whole job (TASTE-22), resumable.
//
// 1) start Chrome (once):
//    "C:\Program Files\Google\Chrome\Application\chrome.exe" --user-data-dir="<repo>\tools\gemini-alt\chrome-profile"
//        --remote-debugging-port=9333 --no-first-run https://gemini.google.com/app
// 2) sign in to Google in that window
// 3) node tools/gemini-alt/run-thread.mjs projects/<slug>/assets24/job.json   -> <job dir>/raw/<id>.png
import { chromium } from "playwright-core";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const jobFile = resolve(process.argv[2]);
const job = JSON.parse(readFileSync(jobFile, "utf8"));
const outDir = join(dirname(jobFile), "raw");
mkdirSync(outDir, { recursive: true });
const log = (...a) => console.log(new Date().toTimeString().slice(0, 8), ...a);

// GEMINI_PORT lets a 2nd account run in its own Chrome profile (e.g. 9334 + tools/gemini-alt/chrome-profile-2)
const browser = await chromium.connectOverCDP(`http://127.0.0.1:${process.env.GEMINI_PORT || 9333}`);
const ctx = browser.contexts()[0];
const page = ctx.pages().find((p) => /gemini\.google/.test(p.url())) || ctx.pages()[0] || (await ctx.newPage());
const BOX = 'rich-textarea .ql-editor, div[contenteditable="true"][role="textbox"]';

// wait for a signed-in Gemini (prompt box present, no "Sign in" button) — up to 20 min
for (let i = 0; ; i++) {
  const ok = await page.evaluate((sel) => {
    const signIn = [...document.querySelectorAll("a,button")].some((e) => /^(sign in|đăng nhập)$/i.test((e.innerText || "").trim()));
    return !!document.querySelector(sel) && !signIn;
  }, BOX).catch(() => false);
  if (ok) break;
  if (i % 12 === 0) log("WAITING_LOGIN — sign in to Google in the Chrome window (port 9333)");
  if (i > 240) { log("login timeout"); process.exit(2); }
  await page.waitForTimeout(5000);
}
log("LOGGED_IN", page.url());
if (job.chat && page.url() !== job.chat) await page.goto(job.chat, { waitUntil: "domcontentloaded", timeout: 90000 });
if (!job.chat) { // new topic = new conversation (TASTE-22)
  await page.goto("https://gemini.google.com/app", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(4000);
}

let first = !job.chat;
for (const [id, body] of job.steps) {
  const file = join(outDir, `${id}.png`);
  if (existsSync(file)) { log("skip", id); continue; }
  const prompt = first
    ? (job.intro || "We will make a set of separate illustration assets for ONE explainer video in this conversation. Each message asks for exactly ONE image. Keep exactly the same style, line weight and palette in every image.") + " " + job.invariants + " " + body
    : body;
  let done = false;
  for (let attempt = 1; attempt <= 2 && !done; attempt++) {
    try {
      const before = await page.locator("model-response").count();
      const box = page.locator(BOX).first();
      await box.waitFor({ timeout: 60000 });
      await box.click();
      // first message of a new chat: attach reference images (job.refs) by pasting them, so a new account keeps the same mascot/style
      if (first && job.refs?.length) {
        const files = job.refs.map((r) => ({ name: r.split(/[\\/]/).pop(), b64: readFileSync(resolve(r)).toString("base64") }));
        await page.evaluate(([sel, fs]) => {
          const [a, b] = sel.split(", ");
          const el = document.querySelector(a) || document.querySelector(b);
          const dt = new DataTransfer();
          for (const f of fs) dt.items.add(new File([Uint8Array.from(atob(f.b64), (c) => c.charCodeAt(0))], f.name, { type: "image/png" }));
          el.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true }));
        }, [BOX, files]);
        await page.waitForTimeout(6000);
        log("refs attached", files.map((f) => f.name).join(","));
      }
      await page.evaluate(([sel, t]) => {
        const [a, b] = sel.split(", ");
        const el = document.querySelector(a) || document.querySelector(b);
        el.focus();
        document.execCommand("insertText", false, t);
      }, [BOX, prompt]);
      await page.waitForTimeout(700);
      await page.keyboard.press("Enter");
      let st = null;
      for (let i = 0; i < 110 && !st; i++) {
        await page.waitForTimeout(2500);
        st = await page.evaluate((b) => {
          const rs = [...document.querySelectorAll("model-response")];
          if (rs.length <= b) return null;
          const last = rs.at(-1);
          if ([...last.querySelectorAll("img")].some((x) => x.naturalWidth > 300 && x.complete)) return { img: true };
          const txt = last.innerText || "";
          if (/giới hạn|limit|thử lại sau|không thể tạo|không tạo được|vi phạm|chính sách|can.t (create|generate)|try again later/i.test(txt) && txt.length > 20)
            return { err: txt.slice(0, 200) };
          return null;
        }, before).catch(() => null);
        if (st && st.err && i < 4) st = null; // early text is often a "creating image" preamble
      }
      if (!st || st.err) throw new Error(st ? st.err : "timeout");
      await page.waitForTimeout(1500);
      const btn = page.locator("model-response").last().getByRole("button", { name: /kích thước đầy đủ|full.size/i }).first();
      const [dl] = await Promise.all([page.waitForEvent("download", { timeout: 120000 }), btn.click()]);
      await dl.saveAs(file);
      first = false;
      done = true;
      job.chat = page.url();
      writeFileSync(jobFile, JSON.stringify(job, null, 1)); // keep the thread URL: fixes continue the SAME chat
      log("OK", id);
    } catch (e) {
      const msg = String(e.message || e);
      log("ERR", id, `attempt ${attempt}:`, msg.slice(0, 200));
      if (/giới hạn|limit|try again later|thử lại sau/i.test(msg)) { log("QUOTA_HIT — stop"); process.exit(3); }
    }
  }
}
log("ALL_DONE", job.chat);
process.exit(0); // leave the owner's Chrome open
