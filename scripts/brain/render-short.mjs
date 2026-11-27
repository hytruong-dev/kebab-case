// Render a 9:16 1080x1920 60fps CurioShift YouTube Short (BrainShort composition):
//   node scripts/brain/render-short.mjs <slug>
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const stripBom = (s) => s.replace(/^\uFEFF/, "");
const ROOT = resolve(import.meta.dirname, "../..");
const REM = join(ROOT, "remotion");
const CLI = join(REM, "node_modules/@remotion/cli/remotion-cli.js");

const slug = process.argv[2];
if (!slug) throw new Error("usage: node scripts/brain/render-short.mjs <slug>");

const P = resolve(ROOT, "projects", slug);
const cfg = JSON.parse(stripBom(readFileSync(join(P, "brain.json"), "utf8")));
const tl = JSON.parse(stripBom(readFileSync(join(P, "audio/timeline.json"), "utf8")));
const propsPath = join(REM, "brain_short_props.json");
const props = {
  items: tl.items.map((it) => ({
    id: it.id,
    shot: it.shot,
    show: it.show,
    start: it.start,
    dur: it.dur,
  })),
  total: tl.total,
  tail: cfg.tail ?? 0.45,
  withAudio: true,
  ep: cfg.ep || "ep01",
  audioDir: cfg.audioDir || cfg.ep || "short01",
};
writeFileSync(propsPath, JSON.stringify(props, null, 2));

const outDir = join(ROOT, "out");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `${slug}.mp4`);
console.log(`Rendering BrainShort -> ${outFile} (${(props.total + props.tail).toFixed(2)}s @ 60fps 1080x1920)`);
execFileSync(
  process.execPath,
  [CLI, "render", "src/index.ts", "BrainShort", outFile, `--props=${propsPath}`, "--codec=h264", "--crf=17", "--pixel-format=yuv420p"],
  { cwd: REM, stdio: "inherit" }
);
console.log(`Rendered: ${outFile}`);

