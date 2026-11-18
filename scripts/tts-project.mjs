#!/usr/bin/env node
// Voice for a project: one OmniVoice (VoiceStudio, local, free) clip per sentence, cached by text hash,
// then tempo + 48 kHz + per-sentence loudness normalisation (LESSON-11, LESSON-12), then timeline.json.
// Sentence-level clips give exact beat timing — no ASR alignment needed.
//
//   node scripts/tts-project.mjs projects/<slug>            synthesize missing clips, then build
//   node scripts/tts-project.mjs projects/<slug> --build    only post-process + timeline (no synthesis)
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const P = resolve(ROOT, process.argv[2] || "");
const buildOnly = process.argv.includes("--build");
const script = JSON.parse(readFileSync(join(P, "script.json"), "utf8"));
const v = script.voice;
const RAW = join(P, "audio", "raw");
const OUT = join(P, "audio", "vo");
mkdirSync(RAW, { recursive: true });
mkdirSync(OUT, { recursive: true });

const GAP_SENTENCE = 0.35; // pause after each sentence
const GAP_CHAPTER = 2.2; // extra pause at chapter boundaries: room for the torn-paper chapter card
const LEAD = 0.8; // silence before the first word (a caption at 0s looks pre-existing)

const items = [];
for (const ch of script.chapters)
  ch.sentences.forEach((s, i) => {
    const h = createHash("sha1").update(`${v.ref}|${v.speed}|${s.say}`).digest("hex").slice(0, 10);
    items.push({ chapter: ch.id, chapterTitle: ch.title, idx: i, ...s, id: `${ch.id}_${String(i + 1).padStart(2, "0")}`, hash: h });
  });

const raw = (it) => join(RAW, `${it.id}_${it.hash}.wav`);
const missing = items.filter((it) => !existsSync(raw(it)));
if (!buildOnly && missing.length) {
  const py = join(process.env.LOCALAPPDATA, "com.debpalash.omnivoice-studio", "project", ".venv", "Scripts", "python.exe");
  if (!existsSync(py)) throw new Error(`VoiceStudio python not found: ${py}`);
  const jobs = missing.map((it) => ({ text: it.say, out: raw(it), speed: v.speed }));
  const jobsFile = join(P, "audio", "jobs.json");
  writeFileSync(jobsFile, JSON.stringify(jobs, null, 1));
  console.log(`synthesizing ${jobs.length} clips (cached: ${items.length - jobs.length})`);
  const r = spawnSync(py, [join(ROOT, "scripts", "omnivoice_tts.py"), "--ref", join(ROOT, v.ref), "--jobs", jobsFile], {
    stdio: "inherit",
    env: { ...process.env, PYTHONIOENCODING: "utf-8" },
  });
  if (r.status !== 0) throw new Error("OmniVoice failed");
}

// Post-process each clip: 48k first, tempo, trim edge silence, -16 LUFS, 5 ms fades.
const dur = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());
let t = LEAD;
const timeline = [];
let prevChapter = null;
for (const it of items) {
  if (!existsSync(raw(it))) throw new Error(`missing clip ${it.id} — run without --build`);
  const out = join(OUT, `${it.id}.wav`);
  const af = [
    "aresample=48000",
    `atempo=${v.tempo}`,
    "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05",
    "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse",
    "loudnorm=I=-16:TP=-2:LRA=7",
    "aresample=48000",
    "afade=t=in:d=0.005",
  ].join(",");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", raw(it), "-af", af, "-ac", "2", "-ar", "48000", out]);
  const d = dur(out);
  if (prevChapter !== null && prevChapter !== it.chapter) t += GAP_CHAPTER;
  timeline.push({ id: it.id, chapter: it.chapter, chapterTitle: it.chapterTitle, first: it.idx === 0, shot: it.shot, show: it.show, start: +t.toFixed(3), dur: +d.toFixed(3), file: `vo/${it.id}.wav` });
  t += d + GAP_SENTENCE;
  prevChapter = it.chapter;
}
writeFileSync(join(P, "audio", "timeline.json"), JSON.stringify({ total: +t.toFixed(3), items: timeline }, null, 1));
console.log(`timeline: ${timeline.length} sentences, ${t.toFixed(1)}s of narration`);
