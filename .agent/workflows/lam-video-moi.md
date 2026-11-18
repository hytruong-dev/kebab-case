---
description: Làm một video paper-cut mới (Remotion plates + HyperFrames ghép phim) từ brief tới MP4 đã QA, tự học ở cuối, dừng trước khi đăng
---

1. `node scripts/memory.mjs sync` — mở đầu câu trả lời bằng dòng "🧠 [Memory Synced] …".
2. Đọc `AGENTS.md`, `.agent_memory/director_taste.md`, `.agent_memory/lessons_learned.md`, `.agents/skills/learned/`.
3. Làm theo `.agents/skills/core/video-production/SKILL.md` Bước 0 → 8 (không hỏi lại điều đã quy định):
   - `projects/<slug>/` từ `templates/project/` → viết `BRIEF.md` (kịch bản + storyboard)
   - Remotion plate → `npm run palette` → `npm run plates`
   - ghép `hyperframes/index.html` → `npm run hf:check` → `snapshot --at …` (xem PNG)
   - `npm run hf:render` → `node scripts/master-audio.mjs out/<f>.mp4` → `node scripts/qa-video.mjs out/<f>.mp4 --expect <s>`
   - `node scripts/memory.mjs retro <slug>` → điền → `log-video` / `add-lesson` / `add-taste` / `add-pattern`
4. Báo cáo (file, thời lượng, LUFS, QA, bài học) rồi DỪNG. Không tự đăng.
