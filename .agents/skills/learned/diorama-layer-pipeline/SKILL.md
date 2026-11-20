---
name: diorama-layer-pipeline
description: Quy trình ĐÃ ĐƯỢC CHỦ DỰ ÁN DUYỆT để làm một màn paper-cut diorama gọn gàng — viết sổ đạo diễn, tạo khung master + từng lớp trong MỘT cuộc hội thoại Gemini, lớp full màn hình trên phông xanh, key bằng chroma_key.py, lắp lại trong Remotion từ màn hình trắng theo thứ tự trời → biển → vách xa → đảo → chủ thể. Dùng cho mọi cảnh mở đầu/giới thiệu bối cảnh mới; thay thế cách 22 mảnh rời (gemini-paper-layers / paper-buildup-assembly).
---

# Diorama layer pipeline (đã duyệt: Eilean Mòr SC01, 2026-11-19)

Mẫu hoàn chỉnh: `projects/eilean-mor/director/` (BOOK.md, layers_greenscreen.json, H00_hero.png, F1–F5) ·
`remotion/src/eilean/DirectorOpening.tsx` (composition `EileanDirectorOpening`) · `out/eilean-director-opening.mp4`.
Quy tắc gốc: TASTE-21 … TASTE-26, LESSON-26 … LESSON-28.

## 0. Đọc trước
`.agents/skills/cinematic-director/SKILL.md` (Mode C: director book; Mode E: keyframe prompt) và
`.agents/skills/cinematic-video-prompt/references/03-composition.md`. Chỉ đọc phần cần.

## 1. Sổ đạo diễn trước khi tạo bất kỳ ảnh nào — `projects/<slug>/director/BOOK.md`
Năm chuỗi bất biến, dán NGUYÊN VĂN vào tin nhắn đầu tiên của chat, không bao giờ diễn đạt lại:
- `WORLD` — một diorama giấy cắt, vật liệu, mép xé, bóng giữa các lớp, chụp thẳng.
- `PALETTE` — một tông đơn sắc + DUY NHẤT một màu nhấn nhỏ gắn với một vật của câu chuyện (Eilean: đèn hải đăng hổ phách).
- `LIGHT` — một nguồn sáng, hướng, tỉ lệ sáng/tối, bóng đổ về đâu.
- `COMPOSITION` — 16:9, MỘT chủ thể hero ở đường 1/3, chân trời ở 1/3 trên, ≥ 40% khoảng thở, không gì quan trọng chạm mép.
- `NEGATIVE` — không chữ/số/logo/watermark, không khung, liệt kê đích danh vật cấm (tàu, phao cam, cờ đỏ…), cấm màu ấm ngoài màu nhấn.

## 2. MỘT chủ đề = MỘT cuộc hội thoại Gemini (TASTE-22)
- Tin 1: "We will make ONE paper-cut film scene together in this conversation…" + 5 chuỗi + mô tả khung master `H00_hero`.
- Chủ nhân duyệt khung master trước. Các tin sau chỉ nói "Same world, palette, light and camera as image 1 … chỉ đổi X".
- Lưu URL chat vào dự án (`layers_greenscreen.json` → `chat`) để lần sửa sau tiếp tục ĐÚNG thread đó.
- Không bao giờ `newChat` cho từng mảnh (đó là nguyên nhân bản 22 mảnh bị rối, lệch sáng, lệch màu).

## 3. Tách lớp theo thứ tự cơ bản (TASTE-23, TASTE-26)
| # | Lớp | Nền |
|---|---|---|
| F1 | trời/chân trời, kéo xuống hết khung | không cần phông xanh (là lớp đáy) |
| F2 | biển từ đường chân trời tới mép dưới, biển liền chỗ đảo | phông xanh phía trên |
| F3 | vách đá xa (khối núi phụ) | phông xanh |
| F4 | đảo chính + đường mòn + cầu tàu + bọt chân đảo, đỉnh để trống | phông xanh |
| F5 | chủ thể (hải đăng + nhà gác), đèn TẮT | phông xanh |
Mỗi lớp 1 ảnh, cùng camera, cùng kích thước, cùng vị trí như ảnh 1 → chồng lên là khớp, không cần căn chỉnh.

## 4. Câu prompt bắt buộc cho mỗi lớp (copy nguyên)
FULL-BLEED (LESSON-28 — Gemini hay tự vẽ khung tranh giấy xé rồi lây sang ảnh sau):
> FULL-BLEED: the picture fills the whole 16:9 image edge to edge. There is NO picture frame, NO torn paper border, NO mat, NO passe-partout, NO wall or card around it, NO window opening, NO vignette. Do NOT copy the frame from the last images: use ONLY image 1 as the reference for shapes, sizes and positions.

PHÔNG XANH (TASTE-24):
> Every pixel that is not the object is ONE flat solid pure chroma-key green (#00FF00) right up to all four edges: no gradient, no texture, no shadow on the green, no green spill on the object, no outline. Keep the object colours exactly as in image 1 (grass stays dark muted moss green). Same camera, same size, same position as in image 1. No text, no watermark.

## 5. Chạy tự động (Playwright MCP, ~30 s/ảnh)
- Code: `scripts/gemini-thread-gen.js`. MCP KHÔNG đọc được file trong repo qua `filename`, và `window.__job` mất sau `page.goto`
  → dán code inline vào `browser_run_code_unsafe`, job là hằng số trong code. Lệnh thường quá thời gian chờ của MCP nhưng vẫn chạy
  tiếp: chờ file `<dir>/<id>.png` cuối cùng xuất hiện.
- Tải bản đầy đủ 2752×1536 bằng nút "Tải hình ảnh có kích thước đầy đủ xuống" + `download.saveAs`.

## 6. Hậu kỳ ảnh
```
python tools/image/gemini_watermark.py image F*.png --inplace --force      # khử logo Gemini
python tools/image/chroma_key.py F2_sea.png F3_cliffs.png F4_island.png F5_lighthouse.png   # -> *_key.png, giữ nguyên kích thước
```
Kiểm tra (bắt buộc, LESSON-27/28): alpha 4 mép của lớp vật thể = 0 (không sót khung); ghép F1..F5 so với H00 bằng
`cv2.findTransformECC` (đạt 0.95–0.99, lệch ≤ 2 px); xem ảnh ghép cạnh ảnh master. Nền trắng/`cutout_white.py` chỉ là phương án cũ.

## 7. Dựng Remotion (`DirectorOpening.tsx` làm mẫu)
- Nền `#ffffff` — mở đầu là MÀN HÌNH TRẮNG (TASTE-25), trời fade lên trên.
- Thứ tự & thời điểm: trời 0.5 s (fade) → biển 1.4 s → vách xa 2.4 s → đảo 3.2 s (trồi từ dưới, spring) → chủ thể 4.4 s (mọc lên từ chân, scaleY, transformOrigin = chân tháp đo trên master).
- Camera đứng yên trong lúc lắp (TASTE-20); xong khung mới đẩy vào rất chậm (≤ 4%).
- Màu nhấn là phần thưởng cuối: đèn bật (Beam, flash2) ở 6.6 s, vị trí đo bằng pixel ấm trên master.
- Copy lớp vào `remotion/public/<slug>/dir/` ở 1920×1080; `npx tsc --noEmit`; render; cắt 6–8 khung từ MP4 và XEM.

## Không làm (đã thất bại)
- 22 mảnh rời, mỗi mảnh một new chat, rải khắp khung (ảnh chủ nhân chê: `projects/eilean-mor/director/assets/ref_bad.jpg`).
- Nhiều màu ấm/bão hoà cạnh nhau; vật hoạt hình lẫn vật tả thực; không có chủ thể chính.
- Tách lớp từ ảnh master bằng GrabCut/hiệu ảnh (đảo tối lẫn biển tối) — chỉ dùng khi không thể tạo lại lớp.
- Lớp có khung tranh / viền giấy / tường bao quanh.
