---
description: Làm một màn paper-cut diorama gọn gàng (khung master + lớp phông xanh trong MỘT chat Gemini, lắp từ màn hình trắng) theo gu chủ dự án đã duyệt
---

1. `node scripts/memory.mjs sync` — mở đầu câu trả lời bằng dòng "🧠 [Memory Synced] …".
2. Đọc `docs/HANDOVER-TRAINING-2026-11-19.md` (vì sao) và `.agents/skills/learned/diorama-layer-pipeline/SKILL.md` (làm thế nào).
3. Viết `projects/<slug>/director/BOOK.md`: WORLD / PALETTE / LIGHT / COMPOSITION / NEGATIVE (TASTE-21).
4. Gemini qua Playwright MCP, MỘT cuộc hội thoại cho cả chủ đề (TASTE-22): tin 1 = bất biến + khung master → chờ chủ dự án duyệt.
5. Trong cùng chat: lớp F1 trời → F2 biển → F3 vách xa → F4 đảo/khối chính → F5 chủ thể; mỗi prompt có câu FULL-BLEED và câu PHÔNG XANH (TASTE-23…26, LESSON-28).
6. `python tools/image/gemini_watermark.py image F*.png --inplace --force` → `python tools/image/chroma_key.py F2… F5…` → kiểm tra mép alpha = 0 và ghép khớp master.
7. Remotion theo `remotion/src/eilean/DirectorOpening.tsx`: nền trắng, lớp vào theo thứ tự, camera đứng yên, màu nhấn cuối. `npx tsc --noEmit` → render → xem 6–8 khung từ MP4.
8. Góp ý mới → `add-taste` ngay; lỗi đã sửa → `add-lesson`; cập nhật bảng trong `docs/HANDOVER-…md`. Báo cáo rồi DỪNG, không tự đăng.
