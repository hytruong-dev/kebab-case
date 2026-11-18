// Audits a frame of the Remotion EffectsGallery: every tile should differ from the
// untouched source swatch and must not be blank. Flags effects that silently did nothing or broke.
//   node scripts/audit-effects-gallery.mjs out/remotion-effects-gallery.mp4 2
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [video, at = "2"] = process.argv.slice(2);
const names = [...readFileSync(join(ROOT, "remotion/src/gallery/effects-catalog.ts"), "utf8").matchAll(/\{ name: "(\w+)"/g)].map((m) => m[1]);

const W = 1920;
const H = 90 + Math.ceil(names.length / 10) * 138 + 20;
const raw = execFileSync("ffmpeg", ["-v", "error", "-ss", at, "-i", video, "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], {
  maxBuffer: W * H * 3 + 1024,
});

const tile = (i) => {
  const x0 = 20 + (i % 10) * 190;
  const y0 = 90 + Math.floor(i / 10) * 138;
  const px = [];
  for (let y = y0; y < y0 + 110; y += 2)
    for (let x = x0; x < x0 + 180; x += 2) {
      const o = (y * W + x) * 3;
      px.push([raw[o], raw[o + 1], raw[o + 2]]);
    }
  return px;
};
const stats = (px) => {
  const l = px.map(([r, g, b]) => 0.299 * r + 0.587 * g + 0.114 * b);
  const mean = l.reduce((a, b) => a + b, 0) / l.length;
  const sd = Math.sqrt(l.reduce((a, b) => a + (b - mean) ** 2, 0) / l.length);
  return { mean, sd };
};
const diff = (a, b) => a.reduce((s, p, k) => s + Math.abs(p[0] - b[k][0]) + Math.abs(p[1] - b[k][1]) + Math.abs(p[2] - b[k][2]), 0) / (a.length * 3);

// Reference: "brightness" with default params is the closest thing to an identity tile.
const ref = tile(names.indexOf("brightness"));
const rows = names.map((n, i) => {
  const t = tile(i);
  const { mean, sd } = stats(t);
  return { n, mean: mean.toFixed(0), sd: sd.toFixed(1), diff: diff(t, ref).toFixed(1), blank: sd < 2 };
});
const blank = rows.filter((r) => r.blank);
console.log(`tiles: ${rows.length}, blank: ${blank.length}`);
for (const r of rows) console.log(`${r.blank ? "BLANK" : "  ok "} ${r.n.padEnd(28)} mean=${r.mean.padStart(3)} sd=${r.sd.padStart(5)} diffFromRef=${r.diff}`);
