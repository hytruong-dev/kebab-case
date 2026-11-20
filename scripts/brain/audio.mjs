// Brain channel audio (channel plan 7.2 step 4): narration + SFX on every visible change + soft ambient synth bed,
// then loudnorm -14 LUFS / TP -1.5. All SFX/music are synthesised with ffmpeg (no licensing questions).
//   node scripts/brain/audio.mjs <slug>   -> projects/<slug>/audio/master-audio.wav + remotion/public/brain/<ep>/master-audio.wav
// Episode extras live in projects/<slug>/brain.json: { "ep": "ep01", "ticks": ["hook_deadline"], "alarms": [["threat_alarm", 2.6]] }
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
const stripBom = (s) => s.replace(/^\uFEFF/, ""); // PowerShell writes UTF-8 with BOM

const ROOT = resolve(import.meta.dirname, "../..");
const slug = process.argv[2];
if (!slug) throw new Error("usage: node scripts/brain/audio.mjs <slug>");
const P = resolve(ROOT, "projects", slug);
const cfg = JSON.parse(stripBom(readFileSync(join(P, "brain.json"), "utf8")));
const OUT = join(P, "audio");
const SFXD = join(OUT, "sfx");
mkdirSync(SFXD, { recursive: true });
const tl = JSON.parse(stripBom(readFileSync(join(OUT, "timeline.json"), "utf8")));
const TAIL = 1.5; // = BrainEpisode tail
const CARD = 1.6; // = BrainEpisode CARD
const D = tl.total + TAIL;

const ff = (args) => execFileSync("ffmpeg", ["-y", "-v", "error", ...args], { stdio: "inherit" });
const gen = (name, src) => { const f = join(SFXD, name); if (!existsSync(f)) ff(["-f", "lavfi", "-i", src, "-ar", "48000", "-ac", "2", f]); return f; };
// soft "pop" (sine chirp down), airy whoosh (filtered noise swell), tick (short click), chapter chime (two partials)
const pop = gen("pop.wav", "aevalsrc='0.6*sin(2*PI*(520+900*exp(-t*40))*t)*exp(-t*28)':d=0.18");
const whoosh = gen("whoosh.wav", "anoisesrc=d=0.5:c=pink:a=0.5,highpass=f=500,lowpass=f=5000,afade=t=in:d=0.22,afade=t=out:st=0.24:d=0.26");
const tick = gen("tick.wav", "aevalsrc='0.7*sin(2*PI*2400*t)*exp(-t*160)':d=0.05");
const chime = gen("chime.wav", "aevalsrc='0.35*(sin(2*PI*660*t)+0.6*sin(2*PI*990*t))*exp(-t*3)':d=1.4");
const alarm = gen("alarm.wav", "aevalsrc='0.25*sin(2*PI*(700+200*sin(2*PI*6*t))*t)*(1-t/1.2)':d=1.2");
// ambient synth bed: slow detuned minor chord + gentle tremolo, low-passed
const bed = join(SFXD, "bed.wav");
if (!existsSync(bed))
  ff(["-f", "lavfi", "-i",
    "aevalsrc='0.10*(sin(2*PI*110*t)+sin(2*PI*110.6*t)+0.8*sin(2*PI*130.8*t)+0.7*sin(2*PI*164.8*t)+0.5*sin(2*PI*220*t))*(0.75+0.25*sin(2*PI*0.08*t))':d=60",
    "-af", "lowpass=f=900,aecho=0.8:0.7:120|260:0.25|0.18", "-ar", "48000", "-ac", "2", bed]);

const inputs = [], parts = [], labels = [];
const add = (file, t, vol) => {
  const i = inputs.length;
  inputs.push(file);
  const ms = Math.max(0, Math.round(t * 1000));
  parts.push(`[${i}]aresample=48000,aformat=channel_layouts=stereo,volume=${vol},adelay=${ms}|${ms}[a${i}]`);
  labels.push(`[a${i}]`);
};
tl.items.forEach((it, idx) => {
  add(join(OUT, it.file), it.start, 1.0);
  if (idx > 0) add(whoosh, it.start - 0.15, 0.22); // every cut
  add(pop, it.start + 0.35, 0.28); // first element popping in
  if (it.first && idx > 0) add(chime, it.start - CARD, 0.3);
});
// clock ticks under the listed beats, alarm sirens at [shot, offset s]
for (const shot of cfg.ticks || []) {
  const b = tl.items.find((i) => i.shot === shot);
  if (b) for (let s = (b === tl.items[0] ? 0.4 : b.start); s < b.start + b.dur; s += 0.5) add(tick, s, 0.25);
}
for (const [shot, off] of cfg.alarms || []) {
  const b = tl.items.find((i) => i.shot === shot);
  if (b) add(alarm, b.start + off, 0.35);
}

const i = inputs.length;
inputs.push(bed);
parts.push(`[${i}]aresample=48000,aloop=loop=-1:size=2e9,atrim=0:${D},volume=0.16,afade=t=in:d=2,afade=t=out:st=${(D - 2.5).toFixed(2)}:d=2.5[m]`);
// two-stage: mix -> loudnorm (master-audio.mjs re-checks after render)
const filter = `${parts.join(";")};${labels.join("")}[m]amix=inputs=${labels.length + 1}:normalize=0:duration=longest,atrim=0:${D.toFixed(3)},loudnorm=I=-14:TP=-1.5:LRA=9[out]`;
const args = [];
inputs.forEach((f) => args.push("-i", f));
args.push("-filter_complex", filter, "-map", "[out]", "-ar", "48000", "-ac", "2", join(OUT, "master-audio.wav"));
ff(args);
const pub = join(ROOT, "remotion/public/brain", cfg.ep);
mkdirSync(pub, { recursive: true });
copyFileSync(join(OUT, "master-audio.wav"), join(pub, "master-audio.wav"));
console.log(`audio: ${tl.items.length} sentences, ${labels.length - tl.items.length} sfx, ${D.toFixed(2)} s`);
