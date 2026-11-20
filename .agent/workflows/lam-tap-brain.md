---
description: Làm một tập mới của kênh Brain & Psychology (tiếng Anh, flat vector navy, mascot) theo chuẩn EP01 đã duyệt — từ docs tập tới MP4 QA PASS + SEO, dừng trước khi đăng
---

1. `node scripts/memory.mjs sync` — mở đầu câu trả lời bằng dòng "🧠 [Memory Synced] …".
2. Đọc `.agents/skills/learned/brain-explainer-episode/SKILL.md` và làm đúng 10 bước trong đó.
3. Lệnh chính (slug `brain-<chu-de>-epNN`, ep `epNN`):
   - `python scripts/brain/tts_kokoro.py projects/<slug>` → giọng + `audio/timeline.json`
   - `GEMINI_PORT=933N node tools/gemini-alt/run-thread.mjs projects/<slug>/assets/job.json` (hết lượt → đổi tài khoản, chạy tiếp)
   - `python scripts/brain/assets.py <slug> <ep>` → xem `assets/sheet_all.jpg`
   - viết `remotion/src/brain/<ep>/shots.tsx`, đăng ký trong `BrainEpisode.tsx` → `cd remotion; npx tsc --noEmit`
   - `node scripts/brain/render.mjs <slug> stills` → XEM `out/review/sheet*.jpg`
   - `node scripts/brain/audio.mjs <slug>` → `node scripts/brain/render.mjs <slug> film`
   - `node scripts/master-audio.mjs out/<slug>.mp4` → `node scripts/qa-video.mjs out/<slug>.mp4 --expect <s>` = QA PASS
4. `.srt` + `SEO.md` + thumbnail → `/retro` → báo cáo (file, thời lượng, LUFS, QA) rồi DỪNG. Không tự đăng.
