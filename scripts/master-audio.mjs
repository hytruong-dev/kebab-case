#!/usr/bin/env node
// Two-pass EBU R128 master to a loudness target, video stream copied untouched (TASTE-13, LESSON-12).
//   node scripts/master-audio.mjs out/paper-cut-film.mp4 [--lufs -14] [--tp -1.5] [-o out/x_master.mp4]
// Default output overwrites the input after a successful pass (via a temp file).
import { spawnSync } from "node:child_process";
import { renameSync, existsSync, statSync } from "node:fs";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("-"));
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
if (!file || !existsSync(file)) {
  console.error("Dùng: node scripts/master-audio.mjs <video.mp4> [--lufs -14] [--tp -1.5] [-o out.mp4]");
  process.exit(1);
}
const I = Number(opt("--lufs", -14));
const TP = Number(opt("--tp", -1.5));
const out = opt("-o", null);
const target = out || file.replace(/\.mp4$/i, ".mastering.tmp.mp4");

const pass1 = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", file, "-vn", "-af", `loudnorm=I=${I}:TP=${TP}:LRA=11:print_format=json`, "-f", "null", "-"], {
  encoding: "utf8",
}).stderr;
const m = JSON.parse(pass1.slice(pass1.lastIndexOf("{"), pass1.lastIndexOf("}") + 1));
console.log(`đo được: ${m.input_i} LUFS, TP ${m.input_tp} dBTP`);

const af =
  `aresample=48000,loudnorm=I=${I}:TP=${TP}:LRA=11:measured_I=${m.input_i}:measured_TP=${m.input_tp}` +
  `:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true,` +
  `alimiter=limit=${Math.pow(10, TP / 20).toFixed(3)}:level=0`;
const r = spawnSync("ffmpeg", ["-hide_banner", "-y", "-v", "error", "-i", file, "-c:v", "copy", "-af", af, "-ar", "48000", "-c:a", "aac", "-b:a", "320k", target], {
  stdio: "inherit",
});
if (r.status !== 0 || !existsSync(target) || statSync(target).size === 0) {
  console.error("✗ master thất bại");
  process.exit(1);
}
if (!out) renameSync(target, file);
console.log(`✓ đã master → ${out || file}. Kiểm lại: node scripts/qa-video.mjs ${out || file}`);
