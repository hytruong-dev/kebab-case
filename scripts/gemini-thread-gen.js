// Playwright MCP routine (browser_run_code_unsafe): generate a WHOLE SCENE inside ONE Gemini conversation.
// Owner rule (TASTE-21): one topic = one chat thread, never a new chat per image, so Gemini keeps the same world,
// palette, light, scale and camera across every image. Proven on Eilean Mor SC01: the sky plate registered to the
// master frame at ECC 0.995 (same camera), so pieces can be split out and assembled back into the exact frame.
//
// Job input (set first via browser_evaluate):
//   window.__pcThread = {
//     dir: "C:/.../projects/<topic>/director/",       // output folder
//     chat: "https://gemini.google.com/app/<id>",     // optional: continue an existing thread for this topic
//     invariants: "WORLD: ... PALETTE: ... LIGHT: ... COMPOSITION: ... NEGATIVE: ...",  // from BOOK.md, verbatim
//     steps: [["H00_hero", "IMAGE 1 (master frame): ..."], ["P1_sky", "Same world and camera as image 1: ..."], ...]
//   }
// Message 1 = "we make ONE scene in this conversation" + invariants + master frame. Later messages only reference
// "image 1" — the invariants are NOT re-pasted (the thread carries them) — and change exactly one thing each.
// Layer order (TASTE-23): master frame, then 1 horizon/sky -> 2 sea -> 3 mountains -> 4 lighthouse/subject.
// Every layer except the sky asks for a flat chroma-key green #00FF00 background (TASTE-24; full wording in
// projects/eilean-mor/director/layers_greenscreen.json) and is keyed with tools/image/chroma_key.py.
// NOTE: the Playwright MCP cannot load this file via `filename` (allowed roots exclude the repo) and
// window.* job data is lost on page.goto — paste the code inline with the job object as a constant.
// Output: <dir>/<id>.png at full size (2752x1536), via the "download full size" button + download.saveAs.
// Then: python tools/image/gemini_watermark.py image <files> --inplace --force
async (page) => {
  const job = await page.evaluate(() => window.__pcThread).catch(() => null);
  if (!job || !job.dir || !job.steps?.length) return { err: "set window.__pcThread = {dir, invariants, steps}" };
  await page.goto(job.chat || "https://gemini.google.com/app", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(4000);
  const results = [];
  for (let s = 0; s < job.steps.length; s++) {
    const [id, body] = job.steps[s];
    const prompt =
      s === 0 && !job.chat
        ? "We will make ONE paper-cut film scene together in this conversation. Keep every image in exactly the same world, palette, light, scale and camera as the first image. " +
          job.invariants + " " + body
        : body;
    try {
      const before = await page.locator("model-response").count();
      const box = page.locator('rich-textarea .ql-editor, div[contenteditable="true"][role="textbox"]').first();
      await box.waitFor({ timeout: 60000 });
      await box.click();
      await page.evaluate((t) => {
        const el = document.querySelector("rich-textarea .ql-editor") || document.querySelector('div[contenteditable="true"][role="textbox"]');
        el.focus();
        document.execCommand("insertText", false, t);
      }, prompt);
      await page.waitForTimeout(700);
      await page.keyboard.press("Enter");
      let st = null;
      for (let i = 0; i < 110 && !st; i++) {
        await page.waitForTimeout(2500);
        st = await page
          .evaluate((b) => {
            const rs = [...document.querySelectorAll("model-response")];
            if (rs.length <= b) return null;
            const last = rs.at(-1);
            if ([...last.querySelectorAll("img")].some((x) => x.naturalWidth > 300 && x.complete)) return { img: true };
            const txt = last.innerText || "";
            if (/giới hạn|limit|thử lại sau|không thể tạo|không tạo được|bên thứ ba|vi phạm|chính sách|can.t create/i.test(txt) && txt.length > 20)
              return { err: txt.slice(0, 160) };
            return null;
          }, before)
          .catch(() => null);
        if (st && st.err && i < 4) st = null; // early text is often a "creating image" preamble
      }
      if (!st || st.err) {
        results.push({ id, err: st ? st.err : "timeout" });
        continue;
      }
      await page.waitForTimeout(1500);
      const btn = page.locator("model-response").last().getByRole("button", { name: "Tải hình ảnh có kích thước đầy đủ xuống" }).first();
      const [dl] = await Promise.all([page.waitForEvent("download", { timeout: 120000 }), btn.click()]);
      await dl.saveAs(job.dir + id + ".png");
      results.push({ id, ok: true });
    } catch (e) {
      results.push({ id, err: String(e).slice(0, 160) });
    }
  }
  results.push({ chat: page.url() }); // store this URL in the project so later fixes continue the SAME thread
  return results;
}
