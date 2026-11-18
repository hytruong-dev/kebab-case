# RETRO — paper-cut-film

> Video đầu tiên của pipeline Remotion × HyperFrames (2026-11-18). Đây cũng là ví dụ mẫu cách điền RETRO.

## 1. Kết quả
- File: `out/paper-cut-film.mp4` · Thời lượng: 17.4 s · LUFS / TP: -14.2 / -1.5 (sau master) · QA: PASS
- Số cảnh: 4 (ngày → hoàng hôn → confetti → outro) · Plate Remotion: 3 + 2 khung biên · Block HyperFrames: paper-collage-reveal, torn-paper-rip, hw-scribble-transition, stop-motion-cadence, hw-title, grain
- Thời gian máy: render plates ~105 s · hf:render 75 s

## 2. Chủ dự án đã góp ý gì → quy tắc
| Góp ý | Quy tắc rút ra | Đã ghi? |
| --- | --- | --- |
| (chưa có góp ý trực tiếp về hình — video demo) | Gu mặc định paper-cut ghi thành TASTE-01..07 | ✓ |

## 3. Lỗi đã gặp → cách sửa đã kiểm chứng
| Triệu chứng | Đã thử mà sai | Cách đúng | Đã ghi? |
| --- | --- | --- | --- |
| Plate ghi ra sai thư mục | npx + shell trên đường dẫn có dấu cách | node + remotion-cli.js, không shell | LESSON-01 ✓ |
| `npx hyperframes` không chạy | gọi trần | `npx --yes hyperframes@0.9.65` | LESSON-02 ✓ |
| seed > 1000 | seed tùy ý | gập seed | LESSON-04 ✓ |
| lint root_missing_composition_id | slot template trước #root | dời slot sau #root | LESSON-06 ✓ |
| irisWipe không đổi | radius 0..1 | radius pixel | LESSON-08 ✓ |
| Phim chỉ -18.6 LUFS | tin âm lượng mặc định | master-audio.mjs | LESSON-18 ✓ |

## 4. Cảnh/kỹ thuật đáng giữ
- Mẫu: phong cảnh giấy nhiều lớp, xé giấy ngày→hoàng hôn, confetti alpha (đã ghi vào visual_metaphor_dictionary).
- Đã đóng gói: `learned/paper-cut-layering`, `learned/remotion-plate-to-hyperframes`.

## 5. Lần sau làm khác đi
- Có nhạc nền + giọng đọc thì master ngay trong pipeline (`npm run build` đã gồm master + QA).
- Viết `BRIEF.md` trước khi code.

## 6. Thu hoạch (đã chạy)
```bash
node scripts/memory.mjs log-video paper-cut-film "Remotion × HyperFrames paper-cut demo" 17.4 "..."   # đã ghi tay trong production_log
node scripts/memory.mjs add-lesson "..." "..." "..."   # LESSON-18
```
