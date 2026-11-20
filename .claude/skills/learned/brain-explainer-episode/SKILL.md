---
name: brain-explainer-episode
description: CHUẨN ĐÃ DUYỆT ("hoàn hảo", 2026-11-20) để sản xuất một tập của kênh YouTube quốc tế Brain & Psychology — animated explainer flat vector nền navy, mascot cố định, giọng tiếng Anh, 1 câu thoại = 1 cảnh dựng 2–3 nhịp. Dùng khi chủ dự án đưa docs/kịch bản một tập mới của kênh, nói "làm tập 02", "làm video brain/psychology", hoặc làm Shorts từ một tập.
---

# Brain & Psychology episode (chuẩn: `projects/brain-procrastination-ep01`, chủ dự án duyệt "hoàn hảo")

Kế hoạch kênh (nguồn gốc mọi quyết định): `projects/brain-procrastination-ep01/PLAN_owner.md` — 10 tập Season 1 (mục 3.3),
mascot + 10 biểu cảm (4.1–4.2), cấu trúc kịch bản (2.4, 3.4), Shorts (6), SEO (7.1), lắp ráp (7.2).

## Nhìn là biết đúng chuẩn
- 1920×1080, 30 fps, nền navy `#0F172A` có hạt bụi trôi; vàng `#F59E0B` = dữ liệu/tích cực, đỏ san hô `#F43F5E` = căng thẳng, thêm teal/sky.
- Mỗi câu thoại = 1 cảnh (TASTE-08). Mỗi cảnh **dựng dần 2–3 nhịp** (pop-in, số đếm, vòng/thanh/đồng hồ chạy, gạch chữ) → hình đổi mỗi 2–4 s.
- Mascot (Gemini) bên trái + đồ vật Gemini/vector + chữ động bên phải; 6 tranh hero (mỗi phần 1 tấm) làm nền cho câu mở phần.
- Thẻ chương "PART n", phụ đề dạng viên thuốc ở đáy (≤ 860 px cho nhãn khác), thanh tiến độ mảnh ở đỉnh.
- Âm thanh: giọng + whoosh mỗi lần cắt + pop khi phần tử đầu vào + chime đổi chương + tick/alarm theo nội dung + nền synth; -14 LUFS / TP -1.5.

## Cấu trúc file (dùng lại, KHÔNG viết lại)
| Cái gì | Ở đâu |
| --- | --- |
| Khung tập (chương, phụ đề, progress, audio, registry tập) | `remotion/src/brain/BrainEpisode.tsx` (`EPISODES = { ep01, … }`) |
| Kit: `Pic`, `Hero`, `Title`, `Tag`, `Card`, `Count`, `Ring`, `Bar`, `Meter`, `Arrow`, `Glow`, `pop`, `ramp`, `useHas`, `ShotProps` | `remotion/src/brain/kit.tsx` |
| Icon vector có tham số động (não sáng vùng, Amygdala hoảng, vòng lặp, cân, đồng hồ…) | `remotion/src/brain/icons.tsx` |
| Cùng API nhưng vẽ ảnh Gemini nếu có (fallback vector) — **import icon từ đây** | `remotion/src/brain/iconsImg.tsx` |
| Cảnh của từng tập | `remotion/src/brain/epNN/shots.tsx` (mẫu: `ep01/shots.tsx`, 51 cảnh) |
| Giọng tiếng Anh Kokoro `am_michael` | `scripts/brain/tts_kokoro.py` (+ `scripts/tts-project.mjs --build` → `audio/timeline.json`) |
| Ảnh Gemini: khử logo, key xanh, cắt, xuất, bảng duyệt | `scripts/brain/assets.py <slug> <ep>` |
| Âm thanh tổng | `scripts/brain/audio.mjs <slug>` (đọc `projects/<slug>/brain.json`) |
| Props / ảnh tĩnh duyệt / render phim | `scripts/brain/render.mjs <slug> props|stills|film` |
| Tạo ảnh Gemini nhiều tài khoản | `tools/gemini-alt/run-thread.mjs` (CDP, `GEMINI_PORT`) |

## Quy trình 1 tập mới (slug ví dụ `brain-spotlight-ep02`, ep `ep02`)
1. **Sync + đọc**: `node scripts/memory.mjs sync`; đọc docs tập mới chủ dự án đưa + `PLAN_owner.md`. Không hỏi lại điều đã có trong docs/taste.
2. **Dự án**: `projects/<slug>/` gồm `PLAN_owner.md` (docs tập), `BRIEF.md`, `brain.json` = `{ "ep": "ep02", "ticks": [...], "alarms": [[shot, giây]] }`.
3. **Kịch bản** `script.json` (mẫu `projects/brain-procrastination-ep01/script.json`): lời thoại NGUYÊN VĂN docs, cắt mỗi câu/ý thành 1 beat
   `{ shot, say, show }` — `say` đọc số bằng chữ, `show` là chữ phụ đề hiện số (TASTE-10). Chương = phân cảnh của docs. Beat ≤ ~13 s.
4. **Giọng**: `python scripts/brain/tts_kokoro.py projects/<slug>` → `audio/timeline.json` (start/dur từng beat). Kokoro cần `pip install kokoro-onnx soundfile`.
5. **Ảnh Gemini** — sao `projects/brain-procrastination-ep01/assets/make_job.py` sang tập mới, sửa danh sách:
   - Mascot: dùng lại `M01–M15` của ep01 (chép sang `public/brain/ep02/`) — chỉ tạo biểu cảm/tư thế mới cần cho tập.
   - Đồ vật/nhân vật riêng của tập (`Cxx`/`Oxx`) trên phông xanh `#00FF00` (TASTE-24), 6 hero `H1–H6` (prompt từng phân cảnh trong docs) + 3 thumbnail `T1–T3`.
   - `job.refs = ["projects/brain-procrastination-ep01/assets/ref_mascot.png"]` → ảnh mascot được dán vào tin nhắn đầu → cùng nhân vật dù đổi tài khoản.
   - Chạy: mở Chrome profile riêng (`tools/gemini-alt/chrome-profile[-N]`, cổng 9333/9334/9335), `$env:GEMINI_PORT="933N"; node tools/gemini-alt/run-thread.mjs projects/<slug>/assets/job.json`.
     Hết lượt (QUOTA_HIT, ~15–30 ảnh/tài khoản) → **chuyển tài khoản khác chạy tiếp, không thay bằng hình vẽ code** (TASTE-32, LESSON-37). Xếp hero/thumbnail lên trước.
   - `python scripts/brain/assets.py <slug> ep02` → mở `assets/sheet_all.jpg` xem (khung đỏ = chạm mép → tạo lại).
6. **Cảnh**: tạo `remotion/src/brain/ep02/shots.tsx` (chép cấu trúc ep01: `M` mascot, `Sub`, `HeroOr`, `Loop`…), export `SHOTS`, đăng ký trong `EPISODES` ở `BrainEpisode.tsx`.
   Mỗi cảnh: `({ t, d })` → phần tử vào theo `pop(t, giây)`; bố cục mascot trái (x≈360–600) / nội dung phải; chữ lớn ≥ 52 px; không để trống > 4 s.
7. **Duyệt trước khi render dài**: `cd remotion; npx tsc --noEmit` → `node scripts/brain/render.mjs <slug> stills` → MỞ XEM `out/review/sheetNN.jpg` từng tấm, sửa đè chữ/lệch.
8. **Âm thanh + phim**: `node scripts/brain/audio.mjs <slug>` → `node scripts/brain/render.mjs <slug> film` (lỗi chỉ hiện "[Tab N…]" → ghi log ra file, chạy lại; LESSON-38)
   → `node scripts/master-audio.mjs out/<slug>.mp4` → `node scripts/qa-video.mjs out/<slug>.mp4 --expect <timeline.total + 1.55>` = **QA PASS** → trích 6–8 khung từ MP4 xem.
9. **Giao**: phụ đề `.srt` (12 từ/dòng, theo timeline), `SEO.md` (3 tiêu đề A/B/C, mô tả có mốc chương THẬT, tags, bình luận ghim), thumbnail ở `out/thumbnails/`.
10. **/retro**: `node scripts/memory.mjs retro <slug>` → điền → `log-video` + `add-*`. ⛔ Không tự đăng.

## Shorts 9:16 từ một tập (docs mục 6)
Dùng lại `shots`/assets của tập; composition dọc 1080×1920, nhịp 2–3 s, chừa 20% đáy + 15% phải (UI YouTube), hook 3 s, câu cuối nối về câu đầu (loop).

## Bẫy đã gặp
- Kokoro hash: JS in `1.0` thành `"1"` (LESSON-36). PowerShell ghi JSON có BOM/làm hỏng mảng lồng → dựng `job.json` bằng Python; script đã `stripBom`.
- Gemini hết lượt giữa chừng (LESSON-37). Render lỗi thoáng qua (LESSON-38). `--expect` phải là thời lượng thật, không làm tròn.
