---
name: remotion-plate-to-hyperframes
description: Đưa cảnh Remotion vào phim HyperFrames — plate MP4, overlay alpha WebM, khung biên PNG làm slot cho chuyển cảnh. Dùng khi thêm/sửa một cảnh Remotion trong phim ghép.
---

# Remotion plate → HyperFrames (đã duyệt — video `paper-cut-film`, 2026-11-18)

## Thêm một plate
1. Tạo `<Composition id="X">` trong `remotion/src/Root.tsx` (thư mục `Plates`).
2. Khai báo trong `scripts/build-plates.mjs`:
   - cảnh đặc: `{ id: "X", file: "x.mp4", alpha: false }` → H.264 CRF 16
   - overlay trong suốt: `{ id: "X", file: "x.webm", alpha: true }` → VP9 `yuva420p` (kiểm alpha theo LESSON-07)
   - khung biên cho chuyển cảnh: thêm vào `STILLS` (`frame` = khung cuối/đầu chính xác)
3. `npm run plates X` (lọc theo id).
4. `hyperframes/index.html`: `<video id class="clip plate" src="assets/plates/x.mp4" data-start data-duration data-track-index muted playsinline style="z-index:N">`.
   Nâng `data-duration` của `#root` nếu clip vượt quá.

## Chuyển cảnh bằng block HyperFrames có slot
- `torn-paper-rip`: `<template data-slot="torn-paper-rip-from">` (khung cuối cảnh A) và `-to` (khung đầu cảnh B), đặt SAU `#root` (LESSON-06).
  Cảnh B bắt đầu đúng lúc xé xong (`start + 1.0s` IN của block). Thêm SFX `page-turn.wav` ở điểm xé.
- `paper-collage-reveal`: slot rỗng → mảnh giấy bay đi để lộ plate đang chạy bên dưới.
- `hw-scribble-transition`: đặt phủ qua điểm cắt (che 0.85-1.35s cục bộ), cắt cứng bên dưới.

## Kiểm (bắt buộc theo thứ tự)
`npm run hf:check` → `npx --yes hyperframes@0.9.65 snapshot --at <giữa mỗi cảnh, sát mỗi điểm nối>` → mở PNG →
`npm run hf:render` → `node scripts/master-audio.mjs out/<f>.mp4` → `node scripts/qa-video.mjs out/<f>.mp4 --expect <data-duration>`.
