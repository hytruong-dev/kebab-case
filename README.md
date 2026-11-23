# 🧠 Brain Explainer Studio

> **Automated AI Animated Video Production Pipeline (Remotion 4.0 × Gemini AI × FFmpeg)**  
> Sản xuất video hoạt hình giải thích tâm lý học & khoa học hành vi (Psychology / Brain Explainers) theo tiêu chuẩn quốc tế (phong cách Kurzgesagt / Psych2Go / Better Than Yesterday).

---

## 🌟 Tổng Quan Dự Án

Dự án này là một **Hệ Thống Sản Xuất Video Bằng Mã Nguồn (Video-as-Code Studio)** hoàn chỉnh:
- **Engine Đồ Họa:** [Remotion 4.0](https://www.remotion.dev/) (React 19 + TypeScript) kết xuất đồ họa vector phẳng 60fps, 1080p full-bleed (`Stage`, `GlassCard`, `BottomMascot`, `GroundShadow`).
- **AI Visuals Generator:** Tự động sinh hình minh họa, nhân vật mascot, và icon đồng bộ qua Google Gemini (`tools/gemini-alt/` & `scripts/brain/assets.py`).
- **Xử Lý Âm Thanh Chuẩn Broadcast:** Tích hợp lồng tiếng AI (Kokoro TTS), sinh hiệu ứng âm thanh (SFX), nhạc nền synth ambient, và tự động làm chủ âm lượng theo chuẩn YouTube: **-14.0 LUFS / True Peak -1.5 dBTP** (`scripts/brain/audio.mjs`).
- **Hệ Thống Tự Học & Bộ Nhớ Tự Tiến Hóa (Self-Evolving Memory):** Lưu giữ 38+ quy tắc gu đạo diễn (`[TASTE-xx]`) và 43+ bài học kỹ thuật (`[LESSON-xx]`) trong `.agent_memory/`, giúp bất kỳ AI agent nào tiếp quản dự án đều giữ vững 100% tiêu chuẩn thẩm mỹ của đạo diễn.

---

## 🚀 Hướng Dẫn Thiết Lập Khi Sang Máy Mới (Setup on New Machine)

Khi clone dự án sang một máy tính mới, chỉ cần thực hiện các bước sau để mọi thứ hoạt động trơn tru:

### 1. Yêu Cầu Môi Trường (Prerequisites)
- **Node.js** >= 18.x
- **Python** >= 3.10
- **FFmpeg** (đã thêm vào `PATH` hệ thống, kiểm tra bằng `ffmpeg -version`)

### 2. Cài Đặt Dependencies
Từ thư mục gốc của dự án:
```bash
# 1. Cài đặt root dependencies
npm install

# 2. Cài đặt Remotion dependencies
cd remotion
npm install
cd ..

# 3. Cài đặt Python dependencies cho TTS & Asset Processing (nếu cần sinh giọng đọc / cắt ảnh)
pip install kokoro-onnx soundfile Pillow
```

### 3. Kiểm Tra Đồng Bộ Bộ Nhớ & TypeScript
```bash
# Đồng bộ bộ nhớ dự án
node scripts/memory.mjs sync

# Kiểm tra TypeScript Remotion không có lỗi
cd remotion && npx tsc --noEmit && cd ..
```

---

## 🤖 Hướng Dẫn Cho AI Agent Tiếp Quản Dự Án (Instructions for AI Agents)

> **Dành cho Cursor, Antigravity, Claude Code, Codex hoặc bất kỳ trợ lý AI nào:**

1. **Đọc tài liệu theo thứ tự bắt buộc:**
   - [AGENTS.md](file:///c:/QuangHy/paper-cut%20animation/AGENTS.md) — Quy chuẩn chung của toàn bộ pipeline.
   - [.agent_memory/director_taste.md](file:///c:/QuangHy/paper-cut%20animation/.agent_memory/director_taste.md) — 38 quy tắc gu đạo diễn (`[TASTE-01]` đến `[TASTE-38]`).
   - [.agent_memory/lessons_learned.md](file:///c:/QuangHy/paper-cut%20animation/.agent_memory/lessons_learned.md) — 43 bài học kỹ thuật tránh các ngõ cụt (`[LESSON-01]` đến `[LESSON-43]`).
2. **Chạy đồng bộ bộ nhớ:**
   ```bash
   node scripts/memory.mjs sync
   ```
3. **Quy trình làm tập mới:**
   - Làm theo quy trình tại [.agent/workflows/lam-tap-brain.md](file:///c:/QuangHy/paper-cut%20animation/.agent/workflows/lam-tap-brain.md) và skill [.agents/skills/learned/brain-explainer-episode/SKILL.md](file:///c:/QuangHy/paper-cut%20animation/.agents/skills/learned/brain-explainer-episode/SKILL.md).
   - Tham khảo tập mẫu chuẩn Season 1 Episode 1: `projects/brain-procrastination-ep01/` và mã nguồn `remotion/src/brain/ep01/shots.tsx`.

---

## 🎬 Các Lệnh Thao Tác Nhanh (Quick Commands)

```bash
# Xem trước video trực quan trên trình duyệt (Remotion Studio)
npm run remotion:studio

# Render tập phim Brain hoàn chỉnh (ra file MP4 tại out/)
node scripts/brain/render.mjs brain-procrastination-ep01

# Trộn âm thanh, SFX và master -14 LUFS
node scripts/brain/audio.mjs brain-procrastination-ep01

# Xuất phụ đề SRT chuẩn khớp từng khung hình
node scripts/brain/srt.mjs brain-procrastination-ep01

# Kiểm tra chất lượng video tự động (QA gate)
node scripts/qa-video.mjs out/brain-procrastination-ep01.mp4 --expect 622.3
```

---

## 📁 Cấu Trúc Thư Mục Chính

```text
├── .agent/workflows/          # Quy trình tự động hóa cho AI (làm tập mới, ghi nhận góp ý)
├── .agent_memory/             # Bộ nhớ tự tiến hóa: gu đạo diễn, bài học kỹ thuật, nhật ký
├── .agents/skills/            # Hệ thống skill chuyên sâu cho Remotion & Brain Explainer
├── projects/                  # Dữ liệu từng tập phim (kịch bản, âm thanh, kế hoạch kênh)
│   └── brain-procrastination-ep01/
├── remotion/                  # Mã nguồn React / TypeScript dựng hình hoạt họa
│   ├── public/brain/          # Tài nguyên đồ họa AI (mascots, objects, backgrounds)
│   └── src/brain/             # Bộ kit hoạt họa (BrainEpisode, Stage, GlassCard, BottomMascot)
├── scripts/                   # Bộ công cụ tự động (render, audio mix, QA, memory)
└── tools/gemini-alt/          # Công cụ sinh ảnh tự động từ Gemini AI
```

---
*Created & Maintained by QuangHy · Powered by Remotion & Antigravity AI.*
