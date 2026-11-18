#!/usr/bin/env node
// Portable self-learning memory for this project (ported from youtube_ai_edit-02/src/memory/memory_harvester.py).
// Everything lives as plain Markdown/JSON in .agent_memory/ and .agents/skills/learned/, so any agent
// (Cursor, Antigravity, Claude Code, Codex) on any machine inherits it by reading files.
//
//   node scripts/memory.mjs status
//   node scripts/memory.mjs sync                                  # the "Memory Synced" line for the start of a session
//   node scripts/memory.mjs add-taste "rule text" [--id TASTE-12] [--section "Chuyển động"]
//   node scripts/memory.mjs add-lesson "symptom" "dead-end to avoid" "verified golden path" [--id LESSON-20] [--replace]
//   node scripts/memory.mjs add-pattern "keyword" "layout" "primitives,csv" "colors,csv" "notes"
//   node scripts/memory.mjs log-video <slug> "title" <seconds> "lessons learned"
//   node scripts/memory.mjs retro <slug>                          # create projects/<slug>/RETRO.md from the template
//
// Fixes vs the original: IDs are auto-numbered and never duplicated; nothing is ever deleted
// (the old harvester silently dropped old taste rules past 150 lines — now it only warns).
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, appendFileSync, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MEM = join(ROOT, ".agent_memory");
const LEARNED = join(ROOT, ".agents", "skills", "learned");
const F = {
  taste: join(MEM, "director_taste.md"),
  lessons: join(MEM, "lessons_learned.md"),
  patterns: join(MEM, "visual_metaphor_dictionary.json"),
  log: join(MEM, "production_log.md"),
};
const SOFT_LIMIT_LINES = 200;
const now = () => new Date().toISOString().slice(0, 16).replace("T", " ");
const today = () => new Date().toISOString().slice(0, 10);
const read = (f) => (existsSync(f) ? readFileSync(f, "utf8") : "");

function init() {
  mkdirSync(MEM, { recursive: true });
  mkdirSync(LEARNED, { recursive: true });
  if (!existsSync(F.taste)) writeFileSync(F.taste, "# HỒ SƠ GU ĐẠO DIỄN (DIRECTOR TASTE)\n\n");
  if (!existsSync(F.lessons)) writeFileSync(F.lessons, "# SỔ TAY BÀI HỌC KỸ THUẬT (VERIFIED LESSONS)\n\n");
  if (!existsSync(F.patterns)) writeFileSync(F.patterns, JSON.stringify({ version: "1.0.0", metaphors: {} }, null, 2));
  if (!existsSync(F.log)) writeFileSync(F.log, "# NHẬT KÝ SẢN XUẤT (PRODUCTION LOG)\n\n");
}

const ids = (text, prefix) => [...text.matchAll(new RegExp(`\\[(${prefix}-\\d+)\\]`, "g"))].map((m) => m[1]);
const nextId = (text, prefix) => {
  const nums = ids(text, prefix).map((s) => Number(s.split("-")[1]));
  return `${prefix}-${String((nums.length ? Math.max(...nums) : 0) + 1).padStart(2, "0")}`;
};
const counts = () => {
  const taste = read(F.taste);
  const lessons = read(F.lessons);
  const patterns = Object.keys(JSON.parse(read(F.patterns) || "{}").metaphors || {});
  const skills = existsSync(LEARNED) ? readdirSync(LEARNED, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : [];
  const videos = (read(F.log).match(/^### Video:/gm) || []).length;
  return {
    taste: (taste.match(/^- \[TASTE-\d+\]/gm) || []).length,
    lessons: (lessons.match(/^### \[LESSON-\d+\]/gm) || []).length,
    patterns,
    skills,
    videos,
  };
};

function warnSize(file) {
  const n = read(file).split("\n").length;
  if (n > SOFT_LIMIT_LINES)
    console.log(`⚠ ${file.replace(ROOT + "\\", "").replace(ROOT + "/", "")} có ${n} dòng (> ${SOFT_LIMIT_LINES}). Hãy gộp các quy tắc trùng ý bằng tay — công cụ không tự xóa.`);
}

function parseFlags(argv) {
  const flags = {};
  const pos = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const k = argv[i].slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
      flags[k] = v;
    } else pos.push(argv[i]);
  }
  return { flags, pos };
}

const cmds = {
  status() {
    init();
    const c = counts();
    console.log("============================================================");
    console.log("🧠 TRẠNG THÁI BỘ NHỚ DỰ ÁN (PORTABLE MEMORY BANK)");
    console.log("============================================================");
    console.log(`  • Gu đạo diễn      .agent_memory/director_taste.md          : ${c.taste} quy tắc`);
    console.log(`  • Bài học kỹ thuật .agent_memory/lessons_learned.md         : ${c.lessons} bài học`);
    console.log(`  • Mẫu hình ảnh     .agent_memory/visual_metaphor_dictionary : ${c.patterns.length} mẫu`);
    console.log(`  • Kỹ năng đã học   .agents/skills/learned/                  : ${c.skills.length} [${c.skills.join(", ")}]`);
    console.log(`  • Video đã làm     .agent_memory/production_log.md          : ${c.videos} video`);
    console.log("============================================================");
  },
  sync() {
    init();
    const c = counts();
    console.log(
      `🧠 [Memory Synced] Đã đồng bộ bộ nhớ dự án (${c.taste} quy tắc đạo diễn, ${c.lessons} bài học kỹ thuật, ${c.patterns.length} mẫu hình ảnh, ${c.skills.length} kỹ năng đã học, ${c.videos} video trong nhật ký). Sẵn sàng sản xuất video tiếp theo theo đúng chuẩn của bạn!`,
    );
  },
  "add-taste"(argv) {
    init();
    const { flags, pos } = parseFlags(argv);
    const text = pos.join(" ").trim();
    if (!text) throw new Error('Thiếu nội dung: add-taste "quy tắc" [--id TASTE-12] [--section "..."]');
    let body = read(F.taste);
    const id = flags.id || nextId(body, "TASTE");
    const line = `- [${id}] (${today()}) ${text}`;
    const re = new RegExp(`^- \\[${id}\\].*$`, "m");
    if (re.test(body)) {
      body = body.replace(re, line);
      console.log(`[MEMORY UPDATED] Đã cập nhật ${id}`);
    } else if (flags.section && body.includes(`## ${flags.section}`)) {
      const start = body.indexOf(`## ${flags.section}`);
      const nextH = body.indexOf("\n## ", start + 3);
      const at = nextH === -1 ? body.length : nextH;
      body = body.slice(0, at).replace(/\n*$/, "\n") + line + "\n" + body.slice(at);
      console.log(`[MEMORY UPDATED] Đã thêm ${id} vào mục "${flags.section}"`);
    } else {
      body = body.replace(/\n*$/, "\n") + (flags.section ? `\n## ${flags.section}\n` : "") + line + "\n";
      console.log(`[MEMORY UPDATED] Đã thêm ${id}`);
    }
    writeFileSync(F.taste, body);
    warnSize(F.taste);
  },
  "add-lesson"(argv) {
    init();
    const { flags, pos } = parseFlags(argv);
    if (pos.length < 3) throw new Error('Cần 3 phần: add-lesson "triệu chứng" "cách sai cần tránh" "giải pháp đã kiểm chứng"');
    const [symptom, deadEnd, golden] = pos;
    let body = read(F.lessons);
    const id = flags.id || nextId(body, "LESSON");
    const entry = `### [${id}] (${today()})\n- **Symptom:** ${symptom}\n- **Ruled-out Dead-end:** ${deadEnd}\n- **Verified Golden Path:** ${golden}\n`;
    const re = new RegExp(`### \\[${id}\\][\\s\\S]*?(?=\\n### \\[|$)`);
    if (re.test(body)) {
      if (!flags.replace) throw new Error(`${id} đã tồn tại. Bỏ --id để tự đánh số mới, hoặc thêm --replace để ghi đè.`);
      body = body.replace(re, entry.trimEnd());
    } else body = body.replace(/\n*$/, "\n\n") + entry;
    writeFileSync(F.lessons, body);
    console.log(`[MEMORY UPDATED] Đã lưu bài học ${id}`);
    warnSize(F.lessons);
  },
  "add-pattern"(argv) {
    init();
    const [keyword, layout, prims = "", colors = "", notes = ""] = argv;
    if (!keyword || !layout) throw new Error('add-pattern "từ khóa" "bố cục" "prim1,prim2" "#mau1,#mau2" "ghi chú"');
    const data = JSON.parse(read(F.patterns));
    const key = keyword.trim().toLowerCase();
    const prev = data.metaphors[key] || { approvedCount: 0 };
    data.metaphors[key] = {
      approvedCount: (prev.approvedCount || 0) + 1,
      layoutPattern: layout,
      primitives: prims.split(",").map((s) => s.trim()).filter(Boolean),
      preferredColors: colors.split(",").map((s) => s.trim()).filter(Boolean),
      notes,
      updatedAt: now(),
    };
    writeFileSync(F.patterns, JSON.stringify(data, null, 2) + "\n");
    console.log(`[MEMORY UPDATED] Mẫu hình ảnh "${key}" (đã duyệt ${data.metaphors[key].approvedCount} lần)`);
  },
  "log-video"(argv) {
    init();
    const [slug, title, seconds, notes = ""] = argv;
    if (!slug || !title || !seconds) throw new Error('log-video <slug> "tiêu đề" <giây> "bài học"');
    const entry = `\n### Video: ${slug} - "${title}" (${now()})\n- **Thời lượng:** ${Number(seconds).toFixed(1)}s\n- **Bài học rút ra:** ${notes}\n`;
    appendFileSync(F.log, entry);
    console.log(`[MEMORY UPDATED] Đã ghi nhật ký sản xuất cho ${slug}`);
  },
  retro(argv) {
    const [slug] = argv;
    if (!slug) throw new Error("retro <slug>");
    const dir = join(ROOT, "projects", slug);
    mkdirSync(dir, { recursive: true });
    const out = join(dir, "RETRO.md");
    if (existsSync(out)) console.log(`Đã có ${out} — mở ra điền tiếp.`);
    else {
      copyFileSync(join(ROOT, "templates", "RETRO.md"), out);
      console.log(`Đã tạo ${out}. Điền xong thì chạy log-video / add-lesson / add-taste theo mục "Thu hoạch" trong file.`);
    }
  },
};

const [cmd = "status", ...rest] = process.argv.slice(2);
if (!cmds[cmd]) {
  console.error(`Lệnh không hợp lệ: ${cmd}. Dùng: ${Object.keys(cmds).join(" | ")}`);
  process.exit(1);
}
try {
  cmds[cmd](rest);
} catch (e) {
  console.error("✗", e.message);
  process.exit(1);
}
