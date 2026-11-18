#!/usr/bin/env node
// Assemble a narrated paper-cut film: Remotion renders one plate per chapter from the narration timeline,
// HyperFrames joins them with torn-paper chapter cards, captions, grain, narration, ducked music and SFX.
//
//   node scripts/build-eilean.mjs projects/eilean-mor <stage...>
//   stages: plates | frames | audio | film | all      (all = plates frames audio film)
// Then: cd <P>/film && npx --yes hyperframes@0.9.65 check  → render → scripts/master-audio.mjs → scripts/qa-video.mjs
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const P = resolve(ROOT, process.argv[2]);
let stages = process.argv.slice(3);
if (!stages.length || stages.includes("all")) stages = ["plates", "frames", "audio", "film"];
const FILM = join(P, "film");
const A = join(FILM, "assets");
const REMOTION = join(ROOT, "remotion");
const CLI = join(REMOTION, "node_modules", "@remotion", "cli", "remotion-cli.js");
const script = JSON.parse(readFileSync(join(P, "script.json"), "utf8"));
const tl = JSON.parse(readFileSync(join(P, "audio", "timeline.json"), "utf8"));
const TAIL = 3.0; // hold after the last sentence
const RIP = 2.2; // chapter break length (matches GAP_CHAPTER + GAP_SENTENCE in tts-project.mjs, roughly)
const r3 = (x) => Math.round(x * 1000) / 1000;
const dur = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());
for (const d of [A, join(A, "plates"), join(A, "frames"), join(A, "audio"), join(FILM, "compositions")]) mkdirSync(d, { recursive: true });

// ---- chapter layout from the narration timeline ----
const chapters = script.chapters.map((c, ci) => {
  const items = tl.items.filter((i) => i.chapter === c.id);
  const last = items[items.length - 1];
  const isLast = ci === script.chapters.length - 1;
  const start = ci === 0 ? 0 : items[0].start; // plate starts where its first sentence starts
  const end = isLast ? last.start + last.dur + TAIL : last.start + last.dur + 0.35;
  return { ...c, n: ci + 1, items, start: r3(start), end: r3(end) };
});
// chapter breaks fill the gap between plates exactly
for (let i = 1; i < chapters.length; i++) chapters[i].breakStart = chapters[i - 1].end;
const TOTAL = r3(chapters[chapters.length - 1].end);

if (stages.includes("plates")) {
  for (const c of chapters) {
    const out = join(A, "plates", `${c.id}.mp4`);
    const total = c.end - c.start;
    const shots = c.items.map((it, k) => ({ shot: it.shot, start: k === 0 ? 0 : r3(it.start - c.start), dur: it.dur }));
    const propsFile = join(P, "audio", `props-${c.id}.json`);
    writeFileSync(propsFile, JSON.stringify({ shots, total: r3(total) }));
    console.log(`\n▶ plate ${c.id} (${total.toFixed(1)}s, ${shots.length} shots)`);
    execFileSync(process.execPath, [CLI, "render", "src/index.ts", "EileanChapter", out, `--props=${propsFile}`, "--codec=h264", "--crf=16", "--gl=angle", "--log=error"], {
      cwd: REMOTION,
      stdio: "inherit",
    });
    if (!existsSync(out) || statSync(out).size === 0) throw new Error(`plate ${c.id} empty`);
  }
}

if (stages.includes("frames")) {
  // exact last frame of each plate = the sheet that gets torn away at the next chapter break
  for (const c of chapters) {
    const src = join(A, "plates", `${c.id}.mp4`);
    execFileSync("ffmpeg", ["-y", "-v", "error", "-sseof", "-0.1", "-i", src, "-frames:v", "1", "-update", "1", join(A, "frames", `${c.id}-last.png`)]);
  }
  console.log("✓ boundary frames");
}

if (stages.includes("audio")) {
  // narration: every sentence clip placed at its timeline start, mixed in Node (LESSON-13: no giant ffmpeg command)
  const SR = 48000;
  const N = Math.ceil(TOTAL * SR);
  const L = new Float32Array(N);
  const R = new Float32Array(N);
  for (const it of tl.items) {
    const raw = execFileSync("ffmpeg", ["-v", "error", "-i", join(P, "audio", it.file), "-f", "f32le", "-ac", "2", "-ar", String(SR), "-"], { maxBuffer: 1 << 28 });
    const f = new Float32Array(raw.buffer, raw.byteOffset, raw.length / 4);
    const off = Math.round(it.start * SR);
    for (let i = 0; i < f.length / 2 && off + i < N; i++) {
      L[off + i] += f[2 * i];
      R[off + i] += f[2 * i + 1];
    }
  }
  const inter = Buffer.alloc(N * 8);
  for (let i = 0; i < N; i++) {
    inter.writeFloatLE(L[i], i * 8);
    inter.writeFloatLE(R[i], i * 8 + 4);
  }
  const voPcm = join(P, "audio", "narration.f32");
  writeFileSync(voPcm, inter);
  const vo = join(A, "audio", "narration.wav");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-f", "f32le", "-ar", String(SR), "-ac", "2", "-i", voPcm, "-c:a", "pcm_s16le", vo]);

  // music: original ambient bed generated locally (no licensing): sea (brown noise, slow swell) + low minor drone,
  // seeded, then ducked under the narration (sidechain, release 800 ms — LESSON-12)
  const bed = join(P, "audio", "bed.wav");
  execFileSync("ffmpeg", [
    "-y", "-v", "error",
    "-f", "lavfi", "-i", `anoisesrc=color=brown:amplitude=0.5:seed=7:duration=${TOTAL}`,
    "-f", "lavfi", "-i", `sine=frequency=55:duration=${TOTAL}`,
    "-f", "lavfi", "-i", `sine=frequency=65.4:duration=${TOTAL}`,
    "-f", "lavfi", "-i", `sine=frequency=82.4:duration=${TOTAL}`,
    "-filter_complex",
      // swells slower than tremolo allows (min 0.1 Hz): a volume expression of t, still a pure function of time
      "[0]lowpass=f=420,highpass=f=40,volume='0.35+0.65*pow(sin(2*PI*t/12),2)':eval=frame[sea];" +
      "[1][2][3]amix=inputs=3:normalize=0,volume='0.6+0.4*sin(2*PI*t/21)':eval=frame,lowpass=f=700[drone];" +
      "[sea][drone]amix=inputs=2:weights=1 0.55:normalize=0,afade=t=in:d=2,afade=t=out:st=" + (TOTAL - 3) + ":d=3," +
      "loudnorm=I=-25:TP=-6,aresample=48000[out]",
    "-map", "[out]", "-ac", "2", bed,
  ]);
  const music = join(A, "audio", "music.wav");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", bed, "-i", vo, "-filter_complex", "[0][1]sidechaincompress=threshold=0.03:ratio=3.5:attack=60:release=800:makeup=1[o]", "-map", "[o]", music]);
  console.log(`✓ narration ${dur(vo).toFixed(1)}s + ducked music bed`);
}

if (stages.includes("film")) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  // per-chapter copies of torn-paper-rip: slots are looked up by name, so each break needs its own name + id prefix
  const ripSrc = readFileSync(join(ROOT, "hyperframes", "compositions", "components", "torn-paper-rip.html"), "utf8");
  for (const c of chapters.slice(1)) {
    const html = ripSrc.replaceAll("torn-paper-rip", `rip-${c.id}`).replaceAll("tpr-", `r${c.n}-`);
    writeFileSync(join(FILM, "compositions", `rip-${c.id}.html`), html);
  }
  // opening: scraps of paper fly off the first plate
  copyFileSync(join(ROOT, "hyperframes", "compositions", "components", "paper-collage-reveal.html"), join(FILM, "compositions", "paper-collage-reveal.html"));
  // grain over the whole film
  const grain = readFileSync(join(ROOT, "hyperframes", "compositions", "grain.html"), "utf8").replace(/data-duration="[\d.]+"/, `data-duration="${TOTAL}"`).replace("35 both", `${Math.ceil(TOTAL / 0.5)} both`);
  writeFileSync(join(FILM, "compositions", "grain.html"), grain);

  // captions: each sentence split into groups of ≤ 7 words, timed by character share within the sentence
  const groups = [];
  for (const it of tl.items) {
    const words = it.show.split(/\s+/).filter(Boolean);
    const chunks = [];
    for (let i = 0; i < words.length; ) {
      const left = words.length - i;
      const take = left <= 8 ? left : Math.min(7, Math.ceil(left / Math.ceil(left / 7)));
      chunks.push(words.slice(i, i + take).join(" "));
      i += take;
    }
    const totalChars = chunks.reduce((a, s) => a + s.length, 0);
    let t0 = it.start;
    for (const ch of chunks) {
      const d = (it.dur * ch.length) / totalChars;
      groups.push({ text: ch, start: r3(t0), dur: r3(Math.max(0.5, d)) });
      t0 += d;
    }
  }
  const capHtml = `<!doctype html>
<html lang="en">
  <body>
    <template>
      <style>
        #root { position: absolute; inset: 0; pointer-events: none; }
        .cap { position: absolute; left: 0; right: 0; bottom: 86px; display: flex; justify-content: center; }
        .cap-t {
          display: inline-block; max-width: 1500px; padding: 14px 34px 18px; text-align: center;
          font-family: "Be Vietnam Pro", sans-serif; font-weight: 700; font-size: 50px; line-height: 1.22; color: #2a211b;
          background: #fbf4e6; border-radius: 10px; box-shadow: 6px 10px 0 rgba(18, 23, 41, 0.45);
        }
      </style>
      <div id="root" data-composition-id="captions" data-width="1920" data-height="1080">
${groups
  .map(
    (g, i) =>
      `        <div id="cap-${i}" class="cap clip" data-start="${g.start}" data-duration="${g.dur}" data-track-index="0"><span id="cap-t-${i}" class="cap-t" style="rotate: ${((i % 3) - 1) * 0.6}deg">${esc(g.text)}</span></div>`,
  )
  .join("\n")}
      </div>
      <script>
        const tl = gsap.timeline({ paused: true });
        for (let i = 0; i < ${groups.length}; i++) {
          const el = document.getElementById("cap-" + i);
          const s = parseFloat(el.dataset.start);
          tl.fromTo("#cap-t-" + i, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.14, ease: "power3.out" }, s);
        }
        window.__timelines = window.__timelines || {};
        window.__timelines["captions"] = tl;
      </script>
    </template>
  </body>
</html>
`;
  writeFileSync(join(FILM, "compositions", "captions.html"), capHtml);

  const host = (id, src, start, d, track, z, extra = "") =>
    `      <div id="${id}" data-composition-id="${id}" data-composition-src="${src}" data-start="${start}" data-duration="${d}" data-track-index="${track}" data-track-kind="${id === "captions" ? "captions" : "graphics"}" data-width="1920" data-height="1080" style="z-index: ${z}"${extra}></div>`;
  const body = [];
  for (const c of chapters)
    body.push(
      `      <video id="plate-${c.id}" class="clip plate" src="assets/plates/${c.id}.mp4" data-start="${c.start}" data-duration="${r3(c.end - c.start)}" data-track-index="0" muted playsinline style="z-index: 1"></video>`,
    );
  body.push(host("paper-collage-reveal", "compositions/paper-collage-reveal.html", 0, 2.6, 1, 3, ` data-variable-values='{"panels": 8, "tone": "mixed", "spread": "outward"}'`));
  for (const c of chapters.slice(1))
    body.push(host(`rip-${c.id}`, `compositions/rip-${c.id}.html`, c.breakStart, r3(c.start - c.breakStart), 1, 3, ` data-variable-values='{"direction": "${c.n % 2 ? "right-to-left" : "left-to-right"}", "tone": "cream", "roughness": 64}'`));
  body.push(host("captions", "compositions/captions.html", 0, TOTAL, 2, 20));
  body.push(host("grain", "compositions/grain.html", 0, TOTAL, 3, 30));
  body.push(`      <audio id="vo" src="assets/audio/narration.wav" data-start="0" data-duration="${TOTAL}" data-track-index="4" data-volume="1"></audio>`);
  body.push(`      <audio id="music" src="assets/audio/music.wav" data-start="0" data-duration="${TOTAL}" data-track-index="5" data-volume="1"></audio>`);
  body.push(`      <audio id="sfx-open" src="assets/sfx/page-whoosh.wav" data-start="0.15" data-duration="0.65" data-track-index="6" data-volume="0.8"></audio>`);
  for (const c of chapters.slice(1)) {
    body.push(`      <audio id="sfx-rip-${c.id}" src="assets/sfx/page-turn.wav" data-start="${r3(c.breakStart + 0.05)}" data-duration="0.4" data-track-index="6" data-volume="1"></audio>`);
  }
  const slots = [];
  for (const c of chapters.slice(1)) {
    const prev = chapters[c.n - 2];
    slots.push(`    <template data-slot="rip-${c.id}-from"><img class="slot-still" src="assets/frames/${prev.id}-last.png" alt="" /></template>`);
    slots.push(
      `    <template data-slot="rip-${c.id}-to"><div class="card"><div class="card-sheet" style="rotate: ${c.n % 2 ? -1.5 : 1.5}deg"><div class="card-k">Chương ${c.n}</div><div class="card-t">${esc(c.title)}</div></div></div></template>`,
    );
  }
  slots.push(`    <template data-slot="paper-collage-reveal-content"><div></div></template>`);

  const index = `<!doctype html>
<!-- Generated by scripts/build-eilean.mjs from ${script.slug}/script.json + audio/timeline.json. Edit the script, not this file. -->
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Be Vietnam Pro"; src: url("assets/fonts/BeVietnamPro-Bold.ttf") format("truetype"); font-weight: 700; }
      @font-face { font-family: "Be Vietnam Pro"; src: url("assets/fonts/BeVietnamPro-SemiBold.ttf") format("truetype"); font-weight: 600; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; overflow: hidden; background: #121729; }
      #root { position: relative; width: 1920px; height: 1080px; overflow: hidden; }
      .plate { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; object-fit: cover; }
      .slot-still { display: block; width: 100%; height: 100%; object-fit: cover; }
      .card { position: absolute; inset: 0; background: #d8c29c; display: flex; align-items: center; justify-content: center; }
      .card-sheet { background: #fbf4e6; padding: 56px 110px 64px; border-radius: 16px; box-shadow: 14px 22px 0 rgba(42, 33, 27, 0.35); text-align: center; color: #2a211b; font-family: "Be Vietnam Pro", sans-serif; }
      .card-k { font-size: 46px; font-weight: 600; color: #d9553b; letter-spacing: 0.08em; text-transform: uppercase; }
      .card-t { font-size: 124px; font-weight: 700; line-height: 1.05; margin-top: 8px; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1920" data-height="1080" data-fps="30">
${body.join("\n")}
    </div>

${slots.join("\n")}

    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`;
  writeFileSync(join(FILM, "index.html"), index);
  writeFileSync(join(P, "audio", "film-layout.json"), JSON.stringify({ total: TOTAL, chapters: chapters.map(({ id, n, title, start, end, breakStart }) => ({ id, n, title, start, end, breakStart })) }, null, 1));
  console.log(`✓ film/index.html: ${TOTAL}s, ${chapters.length} plates, ${chapters.length - 1} torn-paper chapter cards, ${groups.length} caption groups`);
}
