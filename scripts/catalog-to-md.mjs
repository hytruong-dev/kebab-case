// Writes docs/hyperframes-catalog.md from `npx hyperframes catalog --json`,
// grouped by primary tag, so the whole registry is browsable offline.
//   npx --yes hyperframes@0.9.65 catalog --json > .catalog.json && node scripts/catalog-to-md.mjs .catalog.json
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const items = JSON.parse(readFileSync(process.argv[2], "utf8").replace(/^\uFEFF/, ""));

const GROUPS = [
  ["transition", "Transitions"],
  ["caption-style", "Caption styles"],
  ["captions", "Captions"],
  ["typography", "Typography and kinetic type"],
  ["title-card", "Title cards"],
  ["lower-third", "Lower thirds"],
  ["overlay", "Overlays"],
  ["camera", "Camera moves"],
  ["handwritten", "Handwritten / hand-drawn"],
  ["texture", "Textures"],
  ["background", "Backgrounds"],
  ["webgpu-shader", "WebGPU shaders"],
  ["shader", "Shaders"],
  ["3d", "3D"],
  ["data", "Charts and data"],
  ["code", "Code"],
  ["mock-ui", "Mock UI"],
  ["social", "Social"],
  ["product-demo", "Product demo"],
  ["cursor", "Cursors"],
  ["carousel", "Carousels and galleries"],
  ["motion-primitive", "Motion primitives"],
];

const used = new Set();
let md = `# HyperFrames catalog (${items.length} items)\n\nInstall any item into a project: \`npx --yes hyperframes@0.9.65 add <name>\`. All of them are already installed as editable source in \`hf-library/\`.\n`;
for (const [tag, title] of GROUPS) {
  const group = items.filter((i) => !used.has(i.name) && (i.tags || []).includes(tag));
  if (!group.length) continue;
  md += `\n## ${title} (${group.length})\n\n| Name | Type | Description |\n| --- | --- | --- |\n`;
  for (const i of group) {
    used.add(i.name);
    md += `| \`${i.name}\` | ${i.type} | ${(i.description || "").replace(/\|/g, "/").replace(/\s+/g, " ").slice(0, 160)} |\n`;
  }
}
const rest = items.filter((i) => !used.has(i.name));
if (rest.length) {
  md += `\n## Other (${rest.length})\n\n| Name | Type | Description |\n| --- | --- | --- |\n`;
  for (const i of rest)
    md += `| \`${i.name}\` | ${i.type} | ${(i.description || "").replace(/\|/g, "/").replace(/\s+/g, " ").slice(0, 160)} |\n`;
}
mkdirSync(join(ROOT, "docs"), { recursive: true });
writeFileSync(join(ROOT, "docs", "hyperframes-catalog.md"), md);
console.log(`wrote docs/hyperframes-catalog.md (${items.length} items)`);
