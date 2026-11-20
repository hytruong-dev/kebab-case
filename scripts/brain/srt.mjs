// Brain channel: SRT from script.json + audio/timeline.json (~12 words per cue, time split by characters).
//   node scripts/brain/srt.mjs <slug>   -> out/<slug>.srt
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
const ROOT = resolve(import.meta.dirname, "../..");
const slug = process.argv[2];
const P = join(ROOT, "projects", slug);
const rd = (f) => JSON.parse(readFileSync(join(P, f), "utf8").replace(/^\uFEFF/, ""));
const tl = rd("audio/timeline.json"), sc = rd("script.json");
const says = sc.chapters.flatMap((c) => c.sentences.map((s) => s.say));
const ts = (x) => { const ms = Math.round(x * 1000); const p = (n, w = 2) => String(n).padStart(w, "0"); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
const out = []; let n = 0;
tl.items.forEach((it, i) => {
  const w = says[i].split(/\s+/), chunks = [];
  for (let k = 0; k < w.length; k += 12) chunks.push(w.slice(k, k + 12).join(" "));
  const tot = chunks.reduce((a, c) => a + c.length, 0); let t = it.start;
  for (const c of chunks) { const d = (it.dur * c.length) / tot; out.push(`${++n}\n${ts(t)} --> ${ts(t + d)}\n${c}\n`); t += d; }
});
writeFileSync(join(ROOT, "out", `${slug}.srt`), out.join("\n"));
console.log(`${n} cues -> out/${slug}.srt`);
