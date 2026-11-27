---
description: Làm một tập mới của kênh Brain & Psychology (tiếng Anh, flat vector navy, mascot) theo chuẩn EP01 đã duyệt — từ docs tập tới MP4 QA PASS + SEO, dừng trước khi đăng
---

1. `node scripts/memory.mjs sync` — mở đầu câu trả lời bằng dòng "🧠 [Memory Synced] …".
2. **Cổng Tối Ưu Xu Hướng YouTube (`docs/YOUTUBE-TRENDING-PLAYBOOK.md` + 17 skills TubeLabHQ):** kiểm tra góc độc đáo + SCAMPER twist, soạn 3 tiêu đề A/B/C ≤ 60 ký tự (xoay khuôn tiêu đề < 50% chống rủi ro `audit-channel-risk`), thiết kế 3 concept thumbnail T1–T3 ≤ 3 từ không lặp chữ tiêu đề, và kiểm tra Hook 30s + 10–20 retention beats có ≥ 2 late re-hooks trước khi vào kịch bản/ảnh.
3. Đọc `.agents/skills/learned/brain-explainer-episode/SKILL.md` và làm đúng các bước (0 → 10) trong đó.
4. Lệnh chính (slug `brain-<chu-de>-epNN`, ep `epNN`):
   - `python scripts/brain/tts_kokoro.py projects/<slug>` → giọng + `audio/timeline.json`
   - `GEMINI_PORT=933N node tools/gemini-alt/run-thread.mjs projects/<slug>/assets/job.json` (hết lượt → đổi tài khoản, chạy tiếp)
   - `python scripts/brain/assets.py <slug> <ep>` → xem `assets/sheet_all.jpg`
   - viết `remotion/src/brain/<ep>/shots.tsx`, đăng ký trong `BrainEpisode.tsx` → `cd remotion; npx tsc --noEmit`
   - `node scripts/brain/render.mjs <slug> stills` → XEM `out/review/sheet*.jpg`
   - `node scripts/brain/audio.mjs <slug>` → `node scripts/brain/render.mjs <slug> film`
   - `node scripts/master-audio.mjs out/<slug>.mp4` → `node scripts/qa-video.mjs out/<slug>.mp4 --expect <s>` = QA PASS
5. `.srt` + `SEO.md` + thumbnail → `/retro` → báo cáo (file, thời lượng, LUFS, QA) rồi DỪNG. Không tự đăng.
