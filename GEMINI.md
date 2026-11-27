# GEMINI.md / Antigravity entry point

Đọc `AGENTS.md` trước — mục 0 là **giao thức bộ nhớ bắt buộc** (đọc `.agent_memory/`, chạy `node scripts/memory.mjs sync`,
mở đầu trả lời bằng dòng "🧠 [Memory Synced]").

- **Dòng sản xuất chính — Kênh YouTube `CurioShift` (`@CurioShiftMind`):** Khi chủ dự án nói *"làm tập mới"*, *"làm tập 02"*, *"làm video mới"*, *"sản xuất video về <chủ đề>"* (trừ khi yêu cầu riêng phong cách paper-cut):
  1. **BẮT BUỘC đọc và áp dụng `docs/YOUTUBE-TRENDING-PLAYBOOK.md` (17 skills `TubeLabHQ/youtube-research-skills` trong `.agents/skills/`) ngay ở Bước 0** trước khi viết kịch bản hay tạo ảnh: chọn góc bằng Outlier Ratio + SCAMPER twist, soạn 3 tiêu đề ≤ 60 ký tự có Anchor và xoay ≥ 4 khuôn tiêu đề (< 50% lặp chống rủi ro `audit-channel-risk`), thiết kế thumbnail ≤ 3 từ (không lặp chữ tiêu đề), cấu trúc Hook 30s + 10–20 nhịp giữ chân có ≥ 2 late re-hooks.
  2. Thực hiện đúng workflow `.agent/workflows/lam-tap-brain.md` → skill `.agents/skills/learned/brain-explainer-episode/SKILL.md`.
- **Phong cách paper-cut / diorama (khi chủ dự án yêu cầu riêng):** workflow `.agent/workflows/lam-video-moi.md` / `.agent/workflows/lam-canh-diorama.md` → skill `.agents/skills/core/video-production/SKILL.md`.
- **Chủ dự án góp ý/khen/chê:** workflow `.agent/workflows/gop-y.md` — ghi vào bộ nhớ (`.agent_memory/`) TRƯỚC rồi mới sửa.
- **Skills tự động nạp từ `.agents/skills/`:** `brain-explainer-episode`, 17 skills YouTube research (`trend-report`, `title-formulas`, `thumbnail-concepts`, `script-breakdown`, `video-ideation`, `comment-mining`, `audit-channel-risk`, `reverse-engineer-niche`, `reverse-engineer-channel`, `roast-channel`, `niche-*`, `revenue-maxxing`, `sponsorship-prospecting`, `tubelab-mcp`), `hyperframes*`, `remotion-*`, `core/`, `learned/`.
- Lệnh render lâu (plates, `scripts/brain/render.mjs`, `hf:render`) chạy nền và theo dõi log, không chờ chặn.
- ⛔ Không bao giờ tự đăng/lên lịch video lên YouTube/MXH nếu chưa có lệnh trực tiếp của chủ dự án.
