// Brain channel: build props (timeline + Gemini assets present + ep) and render review stills or the film.
//   node scripts/brain/render.mjs <slug> props               -> remotion/brain_props.json
//   node scripts/brain/render.mjs <slug> stills [3,7,12]     -> out/review/s01..sNN.jpg (85% into each beat) + sheetNN.jpg
//   node scripts/brain/render.mjs <slug> film                -> out/<slug>.mp4  (then: master-audio.mjs + qa-video.mjs)
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
const stripBom = (s) => s.replace(/^\uFEFF/, ""); // PowerShell writes UTF-8 with BOM

const ROOT = resolve(import.meta.dirname, "../..");
const slug = process.argv[2];
if (!slug) throw new Error("usage: node scripts/brain/render.mjs <slug> props|stills|film");
const cfg = JSON.parse(stripBom(readFileSync(join(ROOT, "projects", slug, "brain.json"), "utf8")));
const RM = join(ROOT, "remotion");
const FPS = Number(/export const FPS = (\d+)/.exec(readFileSync(join(RM, "src/brain/kit.tsx"), "utf8"))[1]);
const tl = JSON.parse(stripBom(readFileSync(join(ROOT, "projects", slug, "audio/timeline.json"), "utf8")));
const assets = readdirSync(join(RM, "public/brain", cfg.ep)).filter((f) => /^[MCOHT]\d/.test(f)).map((f) => f.replace(/\.(png|jpg)$/, ""));
const mode = process.argv[3] || "props";
const props = { items: tl.items, total: tl.total, tail: 1.5, withAudio: mode === "film", assets, ep: cfg.ep };
writeFileSync(join(RM, "brain_props.json"), JSON.stringify(props));
console.log(`props: ${tl.items.length} beats, ${assets.length} assets`);
const cli = (args) => execFileSync("node", ["node_modules/@remotion/cli/remotion-cli.js", ...args], { cwd: RM, stdio: "inherit" });
if (mode === "stills") {
  mkdirSync(join(ROOT, "out/review"), { recursive: true });
  const only = process.argv[4] ? process.argv[4].split(",").map(Number) : null;
  tl.items.forEach((it, i) => {
    if (only && !only.includes(i + 1)) return;
    const f = Math.round((it.start + it.dur * 0.85) * FPS);
    cli(["still", "src/index.ts", "BrainEpisode", join(ROOT, `out/review/s${String(i + 1).padStart(2, "0")}.jpg`), `--frame=${f}`, "--props=brain_props.json", "--scale=0.25", "--log=error"]);
  });
}
if (mode === "film")
  cli(["render", "src/index.ts", "BrainEpisode", join(ROOT, "out", `${slug}.mp4`), "--props=brain_props.json", "--codec=h264", "--crf=18", "--audio-bitrate=320k", "--concurrency=8", "--log=error"]);
if (mode === "stills") {
  // contact sheets of 9 for quick review (open them and LOOK before the long render)
  execFileSync("python", ["-c", `
import cv2, glob, numpy as np
fs = sorted(glob.glob("out/review/s[0-9]*.jpg")); t = []
for i, f in enumerate(fs):
    im = cv2.resize(cv2.imread(f), (480, 270)); cv2.putText(im, f[-6:-4], (8, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 255), 2); t.append(im)
while len(t) % 3: t.append(np.zeros((270, 480, 3), np.uint8))
rows = [np.hstack(t[i:i+3]) for i in range(0, len(t), 3)]
for k in range(0, len(rows), 3): cv2.imwrite(f"out/review/sheet{k//3+1:02d}.jpg", np.vstack(rows[k:k+3]))
`], { cwd: ROOT, stdio: "inherit" });
}
