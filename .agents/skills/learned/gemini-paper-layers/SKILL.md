---
name: gemini-paper-layers
description: Tạo bộ ảnh lớp giấy cắt (paper-cut) bằng Gemini qua Playwright MCP rồi dựng thành một màn chuyển động nhiều lớp trong Remotion. Dùng khi chủ dự án muốn một cảnh "chi tiết, nhiều hình, hấp dẫn" bằng ảnh AI phong cách giấy xé.
---

# Gemini paper-cut layers → một màn chuyển động (đã duyệt: Eilean Mòr "Con sóng", 2026-11-19)

Mẫu: `projects/eilean-mor/papercut/prompts.json` (12 prompt) · `remotion/src/eilean/WaveScene.tsx` · `out/eilean-wave-scene.mp4`.

## 1. Viết prompt theo LỚP, không theo "1 cảnh = 1 ảnh"
Một màn hấp dẫn cần nhiều lớp để có parallax và chuyển động:
| Loại | Ví dụ | Ghi chú |
| --- | --- | --- |
| background | bầu trời, biển xa | không vật chính |
| mid | đảo + hải đăng, bến tàu | bối cảnh chính |
| hero | sóng dựng lên, sóng đổ | khoảnh khắc cao trào (mỗi pha 1 ảnh) |
| explainer | mặt cắt khe đá + mũi tên | giải thích "vì sao", không chữ |
| character `_iso` | búp bê giấy người gác đèn | **NỀN TRẮNG TRƠN** để tách nền |
| props/fx `_iso` | mảnh vỡ, bọt sóng | nền trắng, vật cách xa nhau |
| detail | cửa sổ + áo mưa treo | cảnh kết cảm xúc |
Khối `_style` chung dán trước mọi prompt: "GIẤY CẮT THỦ CÔNG nhiều lớp… mép xé lộ thớ trắng, bóng đổ giữa lớp", bảng màu hex của dự án,
"Không chữ, không số, không logo, không watermark… không bạo lực, không máu" (TASTE-14/15).

## 2. Tạo ảnh bằng Playwright MCP (profile Chrome đã đăng nhập Gemini)
- Code trong `browser_run_code_unsafe` bị sandbox: **không có** `require`/`fs`/`import`, và `filename` chỉ đọc được trong thư mục của MCP → truyền code inline.
- Lưu file bằng API phía server của Playwright: `download.saveAs(path)` hoặc `page.screenshot({ path })` — ghi được vào thư mục dự án.
- Bấm nút **"Tải hình ảnh có kích thước đầy đủ xuống"** trong `model-response` cuối → ảnh gốc **2752×1536** (ảnh xem trước trên trang chỉ 1024×572).
- Mỗi ảnh một chat mới (`page.goto('https://gemini.google.com/app')`), ~30 s/ảnh. Một lệnh MCP chạy cả lô: phía Cursor báo timeout sau vài phút nhưng vòng lặp trong trình duyệt vẫn chạy tiếp → theo dõi file xuất hiện trong thư mục.

## 3. Hậu kỳ
1. Khử logo Gemini: `python tools/image/gemini_watermark.py image <files> --inplace --force` (bản gốc giữ ở `_raw/`).
2. Tách nền lớp `_iso`: `python tools/image/cutout_white.py <files>` → `*_cut.png` (flood-fill từ mép, giữ màu trắng bên trong vật, mép mềm 2px). Kiểm bằng cách ghép lên nền tối.
3. Đưa vào `remotion/public/<dự án>/`: plate → JPG 2304px; cut-out → PNG ≤ 1600px.

## 4. Dựng màn (Remotion, 15 fps)
- Mỗi beat 4–4.5 s, 5–6 beat; plate có camera move (scale + pan, ease in-out); sprite có boil + drop-shadow giấy.
- Cao trào: shake giảm dần 1.2 s + chớp trắng 3 frame + bọt/mảnh vỡ bung theo quỹ đạo (cắt sprite sheet bằng background-position).
- Thêm effect Remotion: `rainFall` cho bão, `lightLeak` cho cảnh giải thích, `vignette` cho cảnh kết.
- Âm thanh: nền sóng (brown noise + volume swell theo t), whoosh/page-turn đúng mốc beat → `master-audio.mjs` → `qa-video.mjs`.
