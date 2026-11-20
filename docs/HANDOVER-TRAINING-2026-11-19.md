# Bàn giao huấn luyện — từ thất bại đến bản được duyệt (2026-11-19)

Tài liệu cho AI kế tiếp (Antigravity, Cursor, Codex…). Đọc sau `AGENTS.md` mục 0. Mọi quy tắc dưới đây đã nằm trong
`.agent_memory/` — file này kể LÝ DO và THỨ TỰ để AI mới hiểu gu của chủ dự án (Bình), không phải đoán lại.

## Dòng thời gian
| # | Bản | Chủ dự án nói | Bài học → quy tắc |
|---|---|---|---|
| 1 | `eilean-mor` phim 232 s, 51 cảnh vẽ bằng code | (đạt QA) muốn cảnh chi tiết, hấp dẫn hơn | chuyển sang ảnh AI giấy cắt |
| 2 | `eilean-wave-scene` — 12 lớp Gemini | "viết prompt từng layer chi tiết" | skill `gemini-paper-layers` |
| 3 | `eilean-assemble` / `eilean-layer-assemble` — 22 mảnh, mỗi mảnh 1 new chat, nền trắng | **"rối, khó nhìn, màu sắc và bối cảnh không hài hoà"** (`director/assets/ref_bad.jpg`) | TASTE-21: một chủ thể, ≥40% khoảng thở, đơn sắc + 1 màu nhấn; TASTE-22: một chủ đề = một chat Gemini |
| 4 | Cài repo đạo diễn | "tìm repo có gu thẩm mỹ, dựng phim như đạo diễn thực thụ" | cài `.agents/skills/cinematic-director` (DirectorSKILL, MIT) + `cinematic-video-prompt` (MIT); viết `projects/eilean-mor/director/BOOK.md` |
| 5 | Khung master H00 + tách lớp bằng hiệu ảnh | duyệt khung (`director/assets/ref_good.jpg` ≈ H00_hero.png) | LESSON-26 |
| 6 | 4 lớp phông xanh | khoanh số trên ảnh: **1 chân trời → 2 biển → 3 núi → 4 hải đăng**; "viết prompt phông xanh cho dễ cắt" | TASTE-23 thứ tự lớp; TASTE-24 phông xanh; LESSON-27 `chroma_key.py` |
| 7 | Lớp bị vẽ trong khung tranh giấy xé | **"full màn, không nằm trong khung tranh; màn hình trắng rồi từng thành phần hiện ra; tách riêng biển và núi, núi 2 khối tách riêng"** | TASTE-25 full-bleed + mở bằng màn trắng; TASTE-26 trời → biển → vách xa → đảo → hải đăng; LESSON-28 câu cấm khung |
| 8 | `out/eilean-director-opening.mp4` | bàn giao sang Antigravity | skill `learned/diorama-layer-pipeline` |
| 9 | (Antigravity) `transistor-1947` 30 s — 6 ảnh Gemini, 1 chat (`projects/transistor-1947/`) | — | log-video |
| 10 | (Antigravity) `transistor-diorama` 12 s — 5 lớp phông xanh: nền → bệ → dây → đèn chân không → lõi transistor | **không dùng 1 ảnh nguyên khối; bóc tách thành phần nhỏ nhất; mỗi lớp CHỈ 1 thành phần, không lặp lõi, bệ phải trống, sạch rác phông xanh** | TASTE-27, TASTE-28; LESSON-29/30 |
| 11 | (Antigravity) `transistor-crystal-diorama` 12 s — tách lớp từ master bằng rembg + đặt tọa độ (`scripts/prepare_crystal_layers.py`) | **phải mở xem từng PNG và từng giây video bằng mắt; không cắt hộp đè lên vật** | LESSON-31 |
| 12 | (Antigravity) `wagon-wheel-effect` 34 s — explainer khoa học vẽ bằng code (`remotion/src/wagon/`), học cấu trúc từ clip mẫu "Video Project 3" (`projects/reference_analysis/`) | "học cách làm nội dung từ video mẫu, làm chậm tỉ mỉ từng chi tiết" | cấu trúc nghịch lý → cơ chế → hình học → đời thực → kết luận; LESSON-32 (`import React`) |

## Cái đang được duyệt — làm tiếp từ đây
- Quy trình: `.agents/skills/learned/diorama-layer-pipeline/SKILL.md` (đầy đủ prompt, lệnh, kiểm tra).
- Dữ liệu: `projects/eilean-mor/director/` — BOOK.md, `layers_greenscreen.json`, H00_hero.png (master), F1_sky … F5_lighthouse (+ `_key.png`).
- Chat Gemini của chủ đề này: https://gemini.google.com/app/335ef19c9e4bf9ed (tài khoản Gemini Pro của chủ dự án, đăng nhập sẵn trong Playwright MCP). Sửa/thêm lớp → tiếp tục trong chat này.
- Code: `remotion/src/eilean/DirectorOpening.tsx`, composition `EileanDirectorOpening` (10 s, 15 fps) trong `remotion/src/Root.tsx`.
- Render: `cd remotion; npx remotion render src/index.ts EileanDirectorOpening ..\out\eilean-director-opening.mp4`.

## Quy tắc đã bị thay thế (đừng làm theo)
- TASTE-19 (lắp 15–25 mảnh nhỏ rải khắp khung) → thay bằng TASTE-21/23/26: ít lớp lớn, đúng chiều sâu, một chủ thể.
  Vẫn giữ từ TASTE-19/20: camera đứng yên khi lắp, mảnh sau vào khi mảnh trước còn đang đáp, idle motion nhẹ.
- Skill `learned/gemini-paper-layers` và `learned/paper-buildup-assembly`: phần "mỗi mảnh 1 new chat, nền trắng, nhiều sticker" đã lỗi thời.
- `scripts/gemini-mcp-gen.js` (1 ảnh/1 new chat): chỉ dùng cho ảnh đơn lẻ; cảnh dùng `scripts/gemini-thread-gen.js`.
- `tools/image/cutout_white.py` (nền trắng): Gemini vẽ "tấm thẻ giấy" có bóng xám → cắt bẩn. Dùng phông xanh + `chroma_key.py`.

## Chủ dự án sẽ còn nâng cấp (chưa làm)
- Thêm lớp chi tiết (mây, chim, thuyền…) — phải theo TASTE-21: thêm như lớp chiều sâu trong cùng chat, giữ bảng màu, không rải sticker.
- Âm thanh cho màn này, ghép vào HyperFrames, QA (`npm run qa`) — chưa chạy cho `eilean-director-opening`.

## Cách ghi tiếp khi chủ dự án góp ý
`node scripts/memory.mjs add-taste "…" --section "…"` ngay trong câu trả lời, trước khi render lại; sửa được lỗi thật →
`add-lesson "triệu chứng" "ngõ cụt" "cách đúng"`; video xong → `retro <slug>` + `log-video`. Cập nhật bảng dòng thời gian ở trên.
