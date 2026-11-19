// Playwright MCP routine (browser_run_code_unsafe, filename=this file): generate ONE Gemini image and save it to disk.
// The MCP sandbox has no fs/require, so the image is saved by drawing its dataURL in a temp tab sized to the image
// and taking a Playwright screenshot with `path` (native pixels, lossless PNG).
// Job input: before calling, set window.__pcJob = { prompt, out, newChat } on the Gemini page via browser_evaluate.
async (page) => {
  const job = await page.evaluate(() => window.__pcJob);
  if (!job || !job.prompt || !job.out) return { err: "no job: set window.__pcJob = {prompt, out, newChat}" };
  if (job.newChat) {
    await page.goto("https://gemini.google.com/app", { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(4000);
    await page.evaluate((j) => (window.__pcJob = j), job);
  }
  const before = await page.locator("model-response").count();
  const box = page.locator('rich-textarea .ql-editor, div[contenteditable="true"][role="textbox"]').first();
  await box.waitFor({ timeout: 60000 });
  await box.click();
  await page.evaluate((t) => {
    const el = document.querySelector("rich-textarea .ql-editor") || document.querySelector('div[contenteditable="true"][role="textbox"]');
    el.focus();
    document.execCommand("insertText", false, t);
  }, job.prompt);
  await page.waitForTimeout(700);
  await page.keyboard.press("Enter");

  let r = null;
  for (let i = 0; i < 110 && !r; i++) {
    await page.waitForTimeout(2500);
    r = await page
      .evaluate(async (b) => {
        const rs = [...document.querySelectorAll("model-response")];
        if (rs.length <= b) return null;
        const last = rs.at(-1);
        const im = [...last.querySelectorAll("img")].find((x) => x.naturalWidth > 300 && x.complete);
        if (!im) {
          const txt = last.innerText || "";
          if (/giới hạn|limit|thử lại sau|không thể tạo|không tạo được|bên thứ ba|vi phạm|chính sách|can't create/i.test(txt) && txt.length > 20) return { err: txt.slice(0, 200) };
          return null;
        }
        let data = im.src.startsWith("data:image/") ? im.src : null;
        if (!data) {
          try {
            const c = document.createElement("canvas");
            c.width = im.naturalWidth;
            c.height = im.naturalHeight;
            c.getContext("2d").drawImage(im, 0, 0);
            data = c.toDataURL("image/png");
          } catch (_) {
            const blob = await (await fetch(im.src)).blob();
            data = await new Promise((res) => {
              const fr = new FileReader();
              fr.onloadend = () => res(fr.result);
              fr.readAsDataURL(blob);
            });
          }
        }
        return { w: im.naturalWidth, h: im.naturalHeight, data };
      }, before)
      .catch(() => null);
    if (r && r.err && i < 4) r = null; // early refusal text can be a transient placeholder
  }
  if (!r) return { err: "timeout" };
  if (r.err) return r;

  const tab = await page.context().newPage();
  await tab.setViewportSize({ width: r.w, height: r.h });
  await tab.setContent(`<html><body style="margin:0;overflow:hidden"><img id="i" style="display:block" src="${r.data}"></body></html>`);
  await tab.waitForFunction(() => document.getElementById("i").complete);
  await tab.screenshot({ path: job.out, clip: { x: 0, y: 0, width: r.w, height: r.h } });
  await tab.close();
  return { ok: true, out: job.out, w: r.w, h: r.h };
};
