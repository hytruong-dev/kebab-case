---
description: Khi chủ dự án góp ý / khen / chê một video — ghi vào bộ nhớ trước, rồi mới sửa và render lại
---

1. Phân loại góp ý: gu thẩm mỹ (→ `add-taste`), lỗi kỹ thuật vừa sửa (→ `add-lesson`), cảnh được khen (→ `add-pattern`).
2. Viết thành quy tắc cụ thể có số (vd "lớp giấy đáp trong 0.8-1.0s", không "mượt hơn") và chạy `node scripts/memory.mjs add-…` NGAY.
   Góp ý trái với quy tắc cũ → cập nhật đúng dòng cũ bằng `--id TASTE-xx`.
3. Sửa code / plate theo quy tắc mới → render lại → `node scripts/qa-video.mjs …` → cho xem.
4. Trả lời ngắn: đã ghi quy tắc nào (ID), đã sửa gì, kết quả QA.
