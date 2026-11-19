---
name: paper-buildup-assembly
description: Kỹ thuật "lắp ráp khung hình" của paper-cut animation — nhiều mảnh giấy nhỏ chi tiết bay vào theo một trình tự cố định cho tới khi thành một khung hình đầy đủ. Dùng khi chủ dự án muốn cảnh mở đầu/giới thiệu bối cảnh "chi tiết, đầy đủ, hấp dẫn", hoặc nói "ghép nhiều layout nhỏ lại".
---

# Paper build-up assembly (học từ clip mẫu `Video Project 2.mp4`, 2026-11-19)

Mẫu code: `remotion/src/paper/Assemble.tsx` (component dùng chung) · `remotion/src/eilean/AssembleDemo.tsx` (22 mảnh, 9 s) · `out/eilean-assemble.mp4`.
Phân tích clip mẫu: `projects/_study/vp2/` (sheet_3fps.jpg, timing.py, camera.py).

## Clip mẫu cho thấy (đã đo, không đoán)
- 8.9 s, 1 shot dựng dần + cắt cứng 0.3 s cuối sang shot khác.
- **Camera đứng yên** (phase correlation: tổng pan 20 px trong 8.5 s). Mọi chuyển động là mảnh giấy.
- **Không có khoảnh khắc đứng hình**: mỗi 0.1 s luôn có 2–27% khung hình thay đổi → mảnh sau vào khi mảnh trước còn đang đáp.
- **Thứ tự**: mặt đất / nền chạy ngang toàn khung (0–1.2 s) → khối lớn ở giữa (1.2–3.6 s) → chi tiết vừa (3.6–6 s) →
  chi tiết nhỏ lấp mép khung (6–8.5 s) → khung hoàn chỉnh → cắt.
- Mảnh đã đáp **vẫn cử động nhẹ tại chỗ** (bập bềnh, đung đưa, trôi) → khung hình "sống" chứ không thành ảnh tĩnh.
- Mỗi mảnh là một hình giấy đơn giản, phẳng, màu rõ, có bóng đổ; độ chi tiết đến từ **số lượng** mảnh (15–25), không từ một hình phức tạp.

## Công thức
1. Liệt kê 15–25 mảnh theo 4 nhóm: nền (2–4) · khối lớn (3–5) · chi tiết vừa (5–8) · chi tiết nhỏ (5–8).
2. Mỗi mảnh: `{ id, at, entry, x, y, z, idle, node }` — `entry`: `rise` cho nền/sóng, `unfold` cho vật đứng (tháp, cờ),
   `slideL/R` cho vật trôi (mây, tàu), `drop` cho người/vật rơi, `pop` cho chi tiết nhỏ.
3. Nhịp vào: nền cách nhau 0.3 s, khối lớn 0.3–0.6 s, chi tiết 0.2–0.3 s. Tổng 7–8.5 s rồi **giữ 0.5–1 s** và để
   "phần thưởng" xuất hiện cuối cùng (ví dụ đèn hải đăng bật sáng).
4. `idle` cho mọi thứ sống được: sóng `bob`, tàu `bob+sway`, cờ `sway` nhanh, chim `bob+drift`, mây `drift` chậm.
5. Không di chuyển camera trong cảnh lắp ráp; cắt sang cảnh khác khi khung đã đầy.

## Bẫy
- `HtmlInCanvas` cần kích thước nguyên: `Cut` trong `kit.tsx` đã làm tròn (scale lẻ như 0.42 → lỗi `width must be a positive integer`).
