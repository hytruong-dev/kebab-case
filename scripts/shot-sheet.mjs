// Renders one still per shot (at --at seconds into the shot, default 2.5) and tiles them into a contact sheet,
// so every shot can be reviewed before a long render.
//   node scripts/shot-sheet.mjs projects/eilean-mor [--at 2.5] [--only storm-sea,map]
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const P = resolve(ROOT, process.argv[2]);
const at = Number(process.argv.includes("--at") ? process.argv[process.argv.indexOf("--at") + 1] : 2.5);
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1].split(",") : null;
const script = JSON.parse(readFileSync(join(P, "script.json"), "utf8"));
const shots = script.chapters.flatMap((c) => c.sentences.map((s) => s.shot)).filter((s) => !only || only.includes(s));
const OUT = join(P, "review", "shots");
mkdirSync(OUT, { recursive: true });
const REMOTION = join(ROOT, "remotion");
const CLI = join(REMOTION, "node_modules", "@remotion", "cli", "remotion-cli.js");

// one composition run: each shot gets a 6s slot; the still is taken `at` seconds in
const SLOT = 6;
const props = { shots: shots.map((shot, i) => ({ shot, start: i * SLOT, dur: SLOT })), total: shots.length * SLOT };
const propsFile = join(P, "review", "sheet-props.json");
writeFileSync(propsFile, JSON.stringify(props));
const frames = shots.map((_, i) => Math.round((i * SLOT + at) * 15));
const seqDir = join(OUT, "seq");
mkdirSync(seqDir, { recursive: true });
execFileSync(
  process.execPath,
  [CLI, "render", "src/index.ts", "EileanChapter", seqDir, `--props=${propsFile}`, "--sequence", "--image-format=jpeg", "--gl=angle", `--frames=0-${props.total * 15 - 1}`, "--every-nth-frame=1", "--scale=0.25", "--log=error"].filter(Boolean),
  { cwd: REMOTION, stdio: "inherit" },
);
// pick frames and tile
const listFile = join(OUT, "list.txt");
writeFileSync(listFile, frames.map((fr) => `file '${join(seqDir, `element-${String(fr).padStart(String(props.total * 15 - 1).length, "0")}.jpeg`).replace(/\\/g, "/")}'`).join("\n"));
const cols = 6;
const rows = Math.ceil(frames.length / cols);
const sheet = join(P, "review", "shots-sheet.jpg");
execFileSync("ffmpeg", ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-vf", `tile=${cols}x${rows}:padding=6:color=white`, "-frames:v", "1", sheet]);
console.log(`sheet: ${sheet} (${shots.length} shots, order = script order)`);
