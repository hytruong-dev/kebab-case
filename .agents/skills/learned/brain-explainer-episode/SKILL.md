---
name: brain-explainer-episode
description: CHUẨN ĐÃ DUYỆT ("hoàn hảo", 2026-11-20) để sản xuất một tập của kênh YouTube quốc tế Brain & Psychology — animated explainer flat vector nền navy, mascot cố định, giọng tiếng Anh, 1 câu thoại = 1 cảnh dựng 2–3 nhịp. Dùng khi chủ dự án đưa docs/kịch bản một tập mới của kênh, nói "làm tập 02", "làm video brain/psychology", hoặc làm Shorts từ một tập.
---

# Brain & Psychology episode (chuẩn: `projects/brain-procrastination-ep01`, chủ dự án duyệt "hoàn hảo")

Kế hoạch kênh (nguồn gốc mọi quyết định): `projects/brain-procrastination-ep01/PLAN_owner.md` — 10 tập Season 1 (mục 3.3),
mascot + 10 biểu cảm (4.1–4.2), cấu trúc kịch bản (2.4, 3.4), Shorts (6), SEO (7.1), lắp ráp (7.2).

## Chuẩn v2 (docs chủ dự án 2026-11-21 — BẮT BUỘC)
- **Không vẽ đồ vật bằng code** (TASTE-35): đầu, não, cân, lửa, cửa, quả tạ… đều là ảnh Gemini; code chỉ vẽ biểu đồ/thanh/vòng/mũi tên/chữ và lớp phủ lên ảnh (vùng não sáng, kim đồng hồ, dòng chữ gõ). Cần vật mới → thêm vào job Gemini trước khi viết cảnh.
- **Thời lượng tập lẻ 10–11 phút** (TASTE-34). Lời thoại docs chỉ ~6 phút → giữ NGUYÊN VĂN docs, chèn thêm beat nghiên cứu có nguồn thật
  (ghi nguồn vào `BRIEF.md` + mô tả SEO) cho tới khi `timeline.total` = 600–660 s. Ước lượng trước: Kokoro `am_michael` ≈ 142 từ/phút.
- **1920×1080 60 fps** (`FPS` trong `remotion/src/brain/kit.tsx`; mọi thời gian tính bằng giây, không bằng frame).
- **Kết thúc mô-đun** (docs 7.3): chương cuối thường = `[BRIDGE_TRANSITION]` (tóm tắt + mở vòng sang tập sau, GIỮ khi ghép Mega-Video);
  chương riêng tên `"[SINGLE_OUTRO]"` (end screen → tập sau; CẮT khi ghép) — tên bắt đầu bằng `[` thì không có thẻ PART/chime.
- Season 1 = 6 tập nối nhau (docs 3.3) → Mega-Video > 1 tiếng sau tập 06.

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
| Chỉ dùng phần UI (`G`, `Check`, `Cross`, `Puzzle`); hình vector cũ KHÔNG dùng trong cảnh | `remotion/src/brain/icons.tsx` |
| **Đồ vật/nhân vật = ẢNH GEMINI BẮT BUỘC** (TASTE-35): mọi icon trong cảnh import từ đây; thiếu ảnh → render báo lỗi `Missing Gemini asset`, KHÔNG vẽ thay | `remotion/src/brain/iconsImg.tsx` |
| Cảnh của từng tập | `remotion/src/brain/epNN/shots.tsx` (mẫu: `ep01/shots.tsx`, 51 cảnh) |
| Giọng tiếng Anh Kokoro `am_michael` | `scripts/brain/tts_kokoro.py` (+ `scripts/tts-project.mjs --build` → `audio/timeline.json`) |
| Ảnh Gemini: khử logo, key xanh, cắt, xuất, bảng duyệt | `scripts/brain/assets.py <slug> <ep>` |
| Âm thanh tổng | `scripts/brain/audio.mjs <slug>` (đọc `projects/<slug>/brain.json`) |
| Props / ảnh tĩnh duyệt / render phim | `scripts/brain/render.mjs <slug> props|stills|film` |
| Tạo ảnh Gemini nhiều tài khoản | `tools/gemini-alt/run-thread.mjs` (CDP, `GEMINI_PORT`) |

## Quy trình 1 tập mới (slug ví dụ `brain-spotlight-ep02`, ep `ep02`)
0. **Cổng Tối Ưu Xu Hướng YouTube (BẮT BUỘC — theo `docs/YOUTUBE-TRENDING-PLAYBOOK.md` & 17 skills `TubeLabHQ`):**
   - Nếu TubeLab MCP đã kết nối (`.mcp.json`): chạy nhanh `trend-report` / `title-formulas` / `thumbnail-concepts` / `script-breakdown` / `comment-mining` để lấy outlier thực (xếp theo `averageViewsRatio`, không theo view thô). Nếu chưa kết nối: nói rõ phần dữ liệu nào chưa có (không bịa số) và vẫn áp dụng toàn bộ bộ nguyên tắc bên dưới.
   - **Packaging trước (Tiêu đề TRƯỚC, Thumbnail SAU):** Soạn 3 tiêu đề A/B/C đều **≤ 60 ký tự**, có **Anchor** đúng tệp tâm lý/não bộ, **xoay vòng khuôn tiêu đề** (không quá 50% số tập dùng cùng 1 cấu trúc câu — chống đánh dấu lặp nội dung theo `audit-channel-risk`).
   - **Thumbnail T1–T3 = Unique Angle + Familiar Problem:** tối đa **≤ 3 từ chữ (hoặc 0 chữ)**, **TUYỆT ĐỐI không lặp chữ tiêu đề** — chỉ vẽ phần hình ảnh/xung đột mà tiêu đề bỏ ngỏ.
   - **Kiến trúc Hook & Retention Beats:** 30 giây đầu đi thẳng `Hook → Promise → Stakes → Open Loop` khớp 100% lời hứa tiêu đề/thumbnail (không chào dài); toàn tập 10–11 phút có **10–20 beat có nhãn giữ chân**, bắt buộc có **≥ 2 late re-hooks** ở nửa sau video và nghiên cứu khoa học thật riêng biệt (không kịch bản mẫu thay tên).
1. **Sync + đọc**: `node scripts/memory.mjs sync`; đọc docs tập mới chủ dự án đưa + `PLAN_owner.md`. Không hỏi lại điều đã có trong docs/taste.
2. **Dự án**: `projects/<slug>/` gồm `PLAN_owner.md` (docs tập), `BRIEF.md`, `brain.json` = `{ "ep": "ep02", "ticks": [...], "alarms": [[shot, giây]] }`.
3. **Kịch bản** `script.json` (mẫu `projects/brain-procrastination-ep01/script.json`): lời thoại NGUYÊN VĂN docs, cắt mỗi câu/ý thành 1 beat
   `{ shot, say, show }` — `say` đọc số bằng chữ, `show` là chữ phụ đề hiện số (TASTE-10). Chương = phân cảnh của docs. Beat ≤ ~13 s.
4. **Giọng**: `python scripts/brain/tts_kokoro.py projects/<slug>` → `audio/timeline.json` (start/dur từng beat). Kokoro cần `pip install kokoro-onnx soundfile`.
5. **Ảnh Gemini** — sao `projects/brain-procrastination-ep01/assets/make_job.py` sang tập mới, sửa danh sách:
   - Mascot: dùng lại `M01–M15` của ep01 (chép sang `public/brain/ep02/`) — chỉ tạo biểu cảm/tư thế mới cần cho tập.
   - Đồ vật/nhân vật riêng của tập (`Cxx`/`Oxx`) trên phông xanh `#00FF00` (TASTE-24), 6 hero `H1–H6` (prompt từng phân cảnh trong docs) + 3 thumbnail `T1–T3`.
   - `job.refs = ["projects/brain-procrastination-ep01/assets/ref_mascot.png"]` → ảnh mascot được dán vào tin nhắn đầu → cùng nhân vật dù đổi tài khoản.
   - **3 tài khoản song song** (~25 ảnh/tài khoản, xong 77 ảnh trong ~20 phút): `split_jobs.py` chia job1 (tạo M01 trước, không ref) / job2 / job3 (ref = M01 vừa tạo), mỗi job MỘT chat; `assets/raw/` = gộp `job*/raw/`.
     Lỗi `download.saveAs ENOENT` lặp lại = thư mục tạm Playwright hỏng → dừng tiến trình đó, chạy lại cùng job (resume, cùng chat).
   - Chạy: mở Chrome profile riêng (`tools/gemini-alt/chrome-profile[-N]`, cổng 9333/9334/9335), `$env:GEMINI_PORT="933N"; node tools/gemini-alt/run-thread.mjs projects/<slug>/assets/job.json`.
     Hết lượt (QUOTA_HIT, ~15–30 ảnh/tài khoản) → **chuyển tài khoản khác chạy tiếp, không thay bằng hình vẽ code** (TASTE-32, LESSON-37). Xếp hero/thumbnail lên trước.
   - `python scripts/brain/assets.py <slug> ep02` → mở `assets/sheet_all.jpg` xem (khung đỏ = chạm mép → tạo lại).
6. **Cảnh**: tạo `remotion/src/brain/ep02/shots.tsx` (chép cấu trúc ep01: `M` mascot, `Sub`, `HeroOr`, `Loop`…), export `SHOTS`, đăng ký trong `EPISODES` ở `BrainEpisode.tsx`.
   Mỗi cảnh: `({ t, d })` → phần tử vào theo `pop(t, giây)`; bố cục mascot trái (x≈360–600) / nội dung phải; chữ lớn ≥ 52 px; không để trống > 4 s.
7. **Duyệt trước khi render dài**: `cd remotion; npx tsc --noEmit` → `node scripts/brain/render.mjs <slug> stills` → MỞ XEM `out/review/sheetNN.jpg` từng tấm, sửa đè chữ/lệch.
   Rồi **cổng chuyển động**: `cd remotion; node brain-motion-check.mjs <slug> --min 9` phải in `motion OK` (beat dài cần `Drift` + `Kick` trong `ep01/shots.tsx`) — nếu không QA sẽ FAIL "frozen" sau 20 phút render.
8. **Âm thanh + phim**: `node scripts/brain/audio.mjs <slug>` → `node scripts/brain/render.mjs <slug> film` (lỗi chỉ hiện "[Tab N…]" → ghi log ra file, chạy lại; LESSON-38)
   → `node scripts/master-audio.mjs out/<slug>.mp4` → `node scripts/qa-video.mjs out/<slug>.mp4 --expect <timeline.total + 1.55>` = **QA PASS** → trích 6–8 khung từ MP4 xem.
   Render 10 phút 60 fps ≈ 20 phút. Phụ đề: `node scripts/brain/srt.mjs <slug>`.
9. **Giao**: phụ đề `.srt` (12 từ/dòng, theo timeline), `SEO.md` (3 tiêu đề A/B/C, mô tả có mốc chương THẬT, tags, bình luận ghim), thumbnail ở `out/thumbnails/`.
10. **/retro**: `node scripts/memory.mjs retro <slug>` → điền → `log-video` + `add-*`. ⛔ Không tự đăng.

## Shorts 9:16 từ một tập (docs mục 6)
Dùng lại `shots`/assets của tập; composition dọc 1080×1920, nhịp 2–3 s, chừa 20% đáy + 15% phải (UI YouTube), hook 3 s, câu cuối nối về câu đầu (loop).

## Bẫy đã gặp
- Kokoro hash: JS in `1.0` thành `"1"` (LESSON-36). PowerShell ghi JSON có BOM/làm hỏng mảng lồng → dựng `job.json` bằng Python; script đã `stripBom`.
- Gemini hết lượt giữa chừng (LESSON-37). Render lỗi thoáng qua (LESSON-38). `--expect` phải là thời lượng thật, không làm tròn.
