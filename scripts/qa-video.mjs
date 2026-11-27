#!/usr/bin/env node
// Objective QA gate for a finished video (port of youtube_ai_edit-02 `pipeline.py qa` + `src/qa/retention_audit.py`).
// Pure ffmpeg/ffprobe, no Python needed.
//
//   node scripts/qa-video.mjs out/paper-cut-film.mp4 [--kind long|shorts|clip] [--expect 17.4] [--json]
//
// Checks (TASTE-13, LESSON-11/12):
//   duration    within the kind's range (and within 0.1s of --expect if given)
//   loudness    integrated LUFS in range, true peak <= -1 dBTP           (skipped for silent videos)
//   frozen      stretches >= 6s where the picture barely changes          (retention killer)
//   silences    >= 0.8s gaps in the audio (reported, not failed)
//   size        1920x1080 (long/clip) or 1080x1920 (shorts)
import { execFileSync, spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const opt = (k, d) => (args.includes(`--${k}`) ? args[args.indexOf(`--${k}`) + 1] : d);
if (!file) {
  console.error("Dùng: node scripts/qa-video.mjs <video.mp4> [--kind long|shorts|clip] [--expect <giây>] [--json]");
  process.exit(1);
}
const kind = opt("kind", "clip");
const expect = opt("expect") ? Number(opt("expect")) : null;
const RULES = {
  long: { dur: [510, 660], lufs: [-15.5, -12.5], size: [1920, 1080] }, // >= 8:30 for mid-roll (TASTE-18)
  shorts: { dur: [25, 59.5], lufs: [-20, -13], size: [1080, 1920] },
  clip: { dur: [1, 3600], lufs: [-16, -12.5], size: [1920, 1080] }, // short films / demos
}[kind];
if (!RULES) throw new Error(`--kind phải là long | shorts | clip`);

const probe = JSON.parse(
  execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height", "-of", "json", file]).toString(),
);
const duration = Number(probe.format.duration);
const v = probe.streams.find((s) => s.codec_type === "video");
const hasAudio = probe.streams.some((s) => s.codec_type === "audio");

const ff = (a) => spawnSync("ffmpeg", ["-hide_banner", "-nostats", ...a], { encoding: "utf8", maxBuffer: 1 << 30 });

// Loudness (EBU R128 integrated + true peak)
let lufs = null;
let tp = null;
if (hasAudio) {
  const e = ff(["-i", file, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"]).stderr;
  const I = [...e.matchAll(/I:\s+(-?[\d.]+|-inf) LUFS/g)].pop();
  const P = [...e.matchAll(/Peak:\s+(-?[\d.]+|-inf) dBFS/g)].pop();
  lufs = I && I[1] !== "-inf" ? Number(I[1]) : null;
  tp = P && P[1] !== "-inf" ? Number(P[1]) : null;
}

// Silences
const sil = [];
if (hasAudio) {
  const e = ff(["-i", file, "-vn", "-af", "silencedetect=n=-38dB:d=0.8", "-f", "null", "-"]).stderr;
  const st = [...e.matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
  const du = [...e.matchAll(/silence_duration: ([\d.]+)/g)].map((m) => Number(m[1]));
  st.forEach((s, i) => du[i] !== undefined && sil.push([s, du[i]]));
}

// Visual activity: per-second max of mean abs frame difference on a 160x90 grey proxy at 2 fps
const W = 160;
const H = 90;
const raw = spawnSync("ffmpeg", ["-v", "error", "-i", file, "-vf", `fps=2,scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"], {
  maxBuffer: 1 << 30,
}).stdout;
const n = Math.floor(raw.length / (W * H));
const diffs = [];
for (let f = 1; f < n; f++) {
  let s = 0;
  const a = (f - 1) * W * H;
  const b = f * W * H;
  for (let i = 0; i < W * H; i++) s += Math.abs(raw[b + i] - raw[a + i]);
  diffs.push(s / (W * H));
}
const perSec = [];
for (let i = 0; i + 1 < diffs.length; i += 2) perSec.push(Math.max(diffs[i], diffs[i + 1]));
const THR = 0.6;
const MIN_FREEZE = 6;
const frozen = [];
let run = 0;
[...perSec, 99].forEach((a, i) => {
  if (a < THR) run++;
  else {
    if (run >= MIN_FREEZE) frozen.push([i - run, run]);
    run = 0;
  }
});

const checks = [];
const add = (name, ok, detail, hard = true) => checks.push({ name, ok, detail, hard });
add("duration", duration >= RULES.dur[0] && duration <= RULES.dur[1], `${duration.toFixed(2)}s (cho phép ${RULES.dur[0]}-${RULES.dur[1]}s)`);
if (expect !== null) add("expected-duration", Math.abs(duration - expect) <= 0.1, `${duration.toFixed(2)}s vs ${expect}s`);
add("size", v && v.width === RULES.size[0] && v.height === RULES.size[1], `${v?.width}x${v?.height}`);
if (hasAudio && lufs !== null) {
  add("loudness", lufs >= RULES.lufs[0] && lufs <= RULES.lufs[1], `${lufs.toFixed(1)} LUFS (đích ${RULES.lufs[0]}..${RULES.lufs[1]})`);
  add("true-peak", tp !== null && tp <= -1, `${tp?.toFixed(1)} dBTP (≤ -1)`);
} else add("audio", false, "không có tiếng", false);
add("frozen", frozen.length === 0, frozen.length ? frozen.map(([s, r]) => `${s}s→${s + r}s`).join(", ") : "không đoạn nào đứng hình ≥ 6s");
add("silences", true, sil.length ? sil.map(([s, d]) => `${s.toFixed(1)}s(${d.toFixed(1)}s)`).join(", ") : "không", false);

const pass = checks.filter((c) => c.hard).every((c) => c.ok);
if (args.includes("--json")) console.log(JSON.stringify({ file, kind, pass, duration, lufs, tp, frozen, silences: sil, checks }, null, 2));
else {
  console.log(`QA ${file} [${kind}]`);
  for (const c of checks) console.log(`  ${c.ok ? "✓" : c.hard ? "✗" : "•"} ${c.name.padEnd(18)} ${c.detail}`);
  console.log(`  mean visual activity ${(perSec.reduce((a, b) => a + b, 0) / Math.max(1, perSec.length)).toFixed(2)}`);
  console.log(pass ? "QA PASS" : "QA FAIL — sửa trước khi giao");
}
process.exit(pass ? 0 : 2);
