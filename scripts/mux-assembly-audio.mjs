// Sound for an assembly scene: a soft sea bed + one paper "whoosh" per piece arrival, muxed onto a silent render.
//   node scripts/mux-assembly-audio.mjs <silent.mp4> <out.mp4> <duration_s> <t1,t2,...>
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const [silent, out, durS, times] = process.argv.slice(2);
const D = Number(durS);
const T = times.split(",").map(Number);
const whoosh = join(ROOT, "projects", "eilean-mor", "film", "assets", "sfx", "page-whoosh.wav");
const wav = out.replace(/\.mp4$/, ".audio.wav");

const args = ["-y", "-v", "error", "-f", "lavfi", "-i", `anoisesrc=color=brown:amplitude=0.4:seed=5:duration=${D}`];
let fc = `[0]lowpass=f=450,highpass=f=40,volume='0.5+0.5*pow(sin(2*PI*t/6),2)':eval=frame,afade=t=in:d=1,afade=t=out:st=${D - 1.2}:d=1.2,loudnorm=I=-22:TP=-4[bg];`;
let labels = "[bg]";
T.forEach((t, i) => {
  args.push("-i", whoosh);
  const ms = Math.round(t * 1000);
  fc += `[${i + 1}]adelay=${ms}|${ms},volume=0.45[s${i + 1}];`;
  labels += `[s${i + 1}]`;
});
fc += `${labels}amix=inputs=${T.length + 1}:normalize=0,aresample=48000[o]`;
execFileSync("ffmpeg", [...args, "-filter_complex", fc, "-map", "[o]", "-ac", "2", "-t", String(D), wav], { stdio: "inherit" });
execFileSync("ffmpeg", ["-y", "-v", "error", "-i", silent, "-i", wav, "-c:v", "copy", "-c:a", "aac", "-b:a", "320k", "-shortest", "-movflags", "+faststart", out], { stdio: "inherit" });
rmSync(wav);
console.log(`✓ ${out} (${T.length} arrival sounds)`);
