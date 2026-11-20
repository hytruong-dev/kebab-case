// Pre-render motion gate: for every beat >= MIN s, render tiny stills at 2 fps (one Remotion bundle, via renderStill API)
// and compute the same "frozen" metric as scripts/qa-video.mjs (per-second max mean-abs-diff on a 160x90 grey proxy < 0.6
// for >= 6 s). Run BEFORE the long film render; fix any shot it lists.
//   cd remotion; node brain-motion-check.mjs <slug> [--min 9]   (lives in remotion/ so it can import @remotion/renderer)
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RM = join(ROOT, "remotion");
const slug = process.argv[2];
const MIN = Number(process.argv[process.argv.indexOf("--min") + 1]) || 8;
execFileSync("node", [join(ROOT, "scripts/brain/render.mjs"), slug, "props"], { stdio: "inherit" });
const props = JSON.parse(readFileSync(join(RM, "brain_props.json"), "utf8"));
const FPS = Number(/export const FPS = (\d+)/.exec(readFileSync(join(RM, "src/brain/kit.tsx"), "utf8"))[1]);
const serve = await bundle({ entryPoint: join(RM, "src/index.ts"), rootDir: RM });
const comp = await selectComposition({ serveUrl: serve, id: "BrainEpisode", inputProps: props });
const tmp = join(ROOT, "out/motion");
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
const bad = [];
for (const it of props.items.filter((i) => i.dur >= MIN)) {
  const n = Math.floor(it.dur * 2);
  const files = [];
  for (let k = 0; k <= n; k++) {
    const f = Math.min(comp.durationInFrames - 1, Math.round((it.start + k / 2) * FPS));
    const out = join(tmp, `${it.shot}_${String(k).padStart(3, "0")}.png`);
    await renderStill({ composition: comp, serveUrl: serve, output: out, frame: f, inputProps: props, scale: 160 / 1920, chromiumOptions: { gl: "angle" } });
    files.push(out);
  }
  const res = execFileSync("python", ["-c", `
import sys, cv2, numpy as np
ims = [cv2.cvtColor(cv2.resize(cv2.imread(f), (160, 90)), cv2.COLOR_BGR2GRAY).astype(float) for f in sys.argv[1:]]
d = [np.abs(a - b).mean() for a, b in zip(ims, ims[1:])]
per = [max(d[i:i + 2]) for i in range(0, len(d), 2)]
run = best = 0
for a in per:
    run = run + 1 if a < 0.6 else 0
    best = max(best, run)
print(best, round(float(np.mean(per)), 2))
`, ...files]).toString().trim().split(" ");
  const run = Number(res[0]);
  console.log(`${run >= 5 ? "âœ—" : "âœ“"} ${it.shot.padEnd(22)} ${it.dur.toFixed(1)}s  longest still run ${run}s  activity ${res[1]}`);
  if (run >= 5) bad.push(it.shot);
}
console.log(bad.length ? `FIX (still >= 5 s): ${bad.join(", ")}` : "motion OK");
