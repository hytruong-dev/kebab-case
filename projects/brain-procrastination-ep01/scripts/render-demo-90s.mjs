// Renders the upgraded first ~102 seconds (Beats 1-11: Part 1 Hook + Part 2 Opening)
// of brain-procrastination-ep01 as a standalone review demo MP4.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../../..");
const RM = join(ROOT, "remotion");
const slug = "brain-procrastination-ep01";
const stripBom = (s) => s.replace(/^\uFEFF/, "");

const cfg = JSON.parse(stripBom(readFileSync(join(ROOT, "projects", slug, "brain.json"), "utf8")));
const tl = JSON.parse(stripBom(readFileSync(join(ROOT, "projects", slug, "audio/timeline.json"), "utf8")));
const assets = readdirSync(join(RM, "public/brain", cfg.ep))
  .filter((f) => /^[MCOHT]\d/.test(f))
  .map((f) => f.replace(/\.(png|jpg)$/, ""));

// First 11 beats (Part 1: 9 beats + Chapter 2 card + roommates_intro + pfc_ceo)
const items = tl.items.slice(0, 11);
const last = items[items.length - 1];
const total = Number((last.start + last.dur).toFixed(3));
const props = { items, total, tail: 1.5, withAudio: true, assets, ep: cfg.ep };
const propsFile = join(RM, "brain_demo_props.json");
writeFileSync(propsFile, JSON.stringify(props));
console.log(`Demo props: ${items.length} beats, ${total}s + 1.5s tail = ${(total + 1.5).toFixed(2)}s`);

const outMp4 = join(ROOT, "out", "brain-ep01-upgrade-demo.mp4");
execFileSync(
  "node",
  [
    "node_modules/@remotion/cli/remotion-cli.js",
    "render",
    "src/index.ts",
    "BrainEpisode",
    outMp4,
    "--props=brain_demo_props.json",
    "--codec=h264",
    "--crf=18",
    "--audio-bitrate=320k",
    "--concurrency=8",
    "--gl=angle",
    "--log=error",
  ],
  { cwd: RM, stdio: "inherit" },
);
console.log(`✓ Demo rendered: ${outMp4}`);

