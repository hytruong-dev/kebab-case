// Bridge: Remotion renders the paper-cut "plates" (scenes and alpha overlays),
// HyperFrames assembles them into the final film with its own blocks, titles and audio.
//
//   node scripts/build-plates.mjs            render every plate
//   node scripts/build-plates.mjs Confetti   render plates whose id contains "Confetti"
//
// Opaque plates -> H.264 MP4. Alpha plates -> VP9 WebM with yuva420p (HyperFrames reads alpha).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REMOTION = join(ROOT, "remotion");
const OUT = join(ROOT, "hyperframes", "assets", "plates");
const REMOTION_CLI = join(REMOTION, "node_modules", "@remotion", "cli", "remotion-cli.js");

export const PLATES = [
  { id: "PaperLandscape", file: "paper-landscape.mp4", alpha: false },
  { id: "PaperLandscapeDusk", file: "paper-landscape-dusk.mp4", alpha: false },
  { id: "PaperConfetti", file: "paper-confetti.webm", alpha: true },
];

// Exact single frames for HyperFrames transitions that need a still on each side of a cut
// (e.g. torn-paper-rip tears the last day frame away to reveal the first dusk frame).
export const STILLS = [
  { id: "PaperLandscape", frame: 149, file: "paper-landscape-last.png" },
  { id: "PaperLandscapeDusk", frame: 0, file: "paper-landscape-dusk-first.png" },
];

const filter = process.argv[2];
mkdirSync(OUT, { recursive: true });

for (const still of STILLS.filter((s) => !filter || s.id.includes(filter))) {
  const out = join(OUT, still.file);
  console.log(`\n▶ still ${still.id}@${still.frame} -> ${out}`);
  execFileSync(
    process.execPath,
    [REMOTION_CLI, "still", "src/index.ts", still.id, out, `--frame=${still.frame}`, "--gl=angle"],
    { cwd: REMOTION, stdio: "inherit" },
  );
}

for (const plate of PLATES.filter((p) => !filter || p.id.includes(filter))) {
  const out = join(OUT, plate.file);
  const args = [REMOTION_CLI, "render", "src/index.ts", plate.id, out, "--gl=angle"];
  if (plate.alpha) args.push("--codec=vp9", "--image-format=png", "--pixel-format=yuva420p");
  else args.push("--codec=h264", "--crf=16");
  console.log(`\n▶ ${plate.id} -> ${out}`);
  // node + the CLI's JS entry, no shell: paths with spaces ("paper-cut animation") stay one argument.
  execFileSync(process.execPath, args, { cwd: REMOTION, stdio: "inherit" });
  if (!existsSync(out) || statSync(out).size === 0) throw new Error(`Plate ${plate.id} produced no file`);
}
console.log("\n✓ plates ready in hyperframes/assets/plates");
