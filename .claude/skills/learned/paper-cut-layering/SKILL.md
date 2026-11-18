---
name: paper-cut-layering
description: Dựng một cảnh paper-cut nhiều lớp trong Remotion — thớ giấy, mép xé, bóng đổ, parallax, stop-motion on twos. Dùng khi cần một cảnh/plate phong cách giấy cắt mới.
---

# Paper-cut layering (đã duyệt — video `paper-cut-film`, 2026-11-18)

Mẫu chuẩn: `remotion/src/paper/PaperLandscape.tsx`. Viên gạch: `remotion/src/paper/PaperLayer.tsx`.

## Công thức
1. **Nền**: `<Solid>` màu `sky` + `paper({ amount: 1, colorFront: "#ffffff", colorBack: "#e6d6b8" })`, không xé mép.
2. **Mỗi lớp** bọc trong `<PaperLayer width height seed depth>`: bên trong là SVG/DOM màu từ `palette.ts`.
   - Màu nằm ở nội dung, KHÔNG ở `paper()` (LESSON-03). Seed tự gập về [0,1000] (LESSON-04).
   - `depth` 4 (xa) → 8 → 14 (gần) → 16 (nhãn tiêu đề).
3. **Hình dạng**: đồi = `ridgePath()` (noise2D có seed); mặt trời/mây = `@remotion/shapes` có `effects` riêng; vật bay = `@remotion/paths` (`getPointAtLength` + `getTangentAtLength` để nghiêng theo đường).
4. **Thời gian**: `frame = f - (f % 2)` (on twos); boil = `random(seed-step)` với `step = floor(frame/4)`; lớp đáp bằng `spring` damping 18, trễ 4/10/16 frame từ sau ra trước.
5. **Parallax**: lớp dịch `-pan * drift` với drift 18/40/80px, `pan` = `interpolate` + `Easing.inOut(Easing.sin)` cả cảnh.
6. **Biến thể** (ngày/hoàng hôn): cùng component, prop `variant`, bảng màu `DUSK` dẫn xuất trong `palette.ts`.

## Kiểm
- `cd remotion && npx tsc --noEmit`
- `node node_modules/@remotion/cli/remotion-cli.js still src/index.ts <Comp> out/x.png --frame=90` → mở ảnh, đo vài pixel bằng ffmpeg crop 1x1.
- Cần `Config.setChromiumOpenGlRenderer("angle")` (LESSON-05).
