# RETRO — <slug>

> Bước 8 (/retro). Điền xong rồi chạy các lệnh ở mục "Thu hoạch". Mục đích: video sau làm nhanh hơn và không lặp lỗi.

## 1. Kết quả
- File: `out/<file>.mp4` · Thời lượng: … s · LUFS / TP: … / … · QA: PASS/FAIL
- Số cảnh: … · Plate Remotion: … · Block HyperFrames dùng: …
- Thời gian máy (render plates / hf:render): … / …

## 2. Chủ dự án đã góp ý gì (nguyên văn) → quy tắc
| Góp ý | Quy tắc rút ra (cụ thể, có số) | Đã ghi? |
| --- | --- | --- |
| | | |

## 3. Lỗi đã gặp → cách sửa đã kiểm chứng
| Triệu chứng | Đã thử mà sai | Cách đúng | Đã ghi? |
| --- | --- | --- | --- |
| | | | |

## 4. Cảnh/kỹ thuật đáng giữ
- Mẫu hình ảnh được khen: …
- Kỹ thuật dùng lần thứ 2 trở lên → nên đóng gói thành `.agents/skills/learned/<tên>/`: …

## 5. Lần sau làm khác đi
- …

## 6. Thu hoạch (chạy các lệnh này)
```bash
node scripts/memory.mjs log-video <slug> "<tiêu đề>" <giây> "<bài học chính>"
node scripts/memory.mjs add-taste "<quy tắc>" --section "<mục>"
node scripts/memory.mjs add-lesson "<triệu chứng>" "<cách sai>" "<cách đúng>"
node scripts/memory.mjs add-pattern "<từ khóa>" "<bố cục>" "<primitives>" "<màu>" "<ghi chú>"
```
