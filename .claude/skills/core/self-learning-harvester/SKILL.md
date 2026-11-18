---
name: self-learning-harvester
description: Bộ não tự học của dự án — ghi gu đạo diễn, bài học kỹ thuật, mẫu hình ảnh và nhật ký vào .agent_memory/ ngay khi chủ dự án góp ý, sửa xong một lỗi, hoặc xuất xong video. Dùng mỗi khi có phản hồi "nhanh lên/chậm lại/đẹp đấy/giữ cái này/đừng làm vậy", khi vừa sửa lỗi render/âm thanh/font, và ở bước /retro cuối mỗi video.
---

# Self-Learning Harvester (bộ não tự tiến hóa)

Kế thừa từ `youtube_ai_edit-02` (chuẩn kulaxyz/self-learning-skills + agentbrain). Mục tiêu: **không bao giờ phải dạy lại AI
điều đã dạy, không bao giờ lặp lại lỗi đã sửa** — trên mọi máy, với mọi AI (Cursor, Antigravity, Claude Code, Codex).

## Bộ nhớ gồm gì

| File | Chứa | Ghi khi |
| --- | --- | --- |
| `.agent_memory/director_taste.md` | `[TASTE-xx]` gu thẩm mỹ, nhịp, màu, bố cục | chủ dự án góp ý / khen / cấm |
| `.agent_memory/lessons_learned.md` | `[LESSON-xx]` triệu chứng → cách sai → giải pháp đã kiểm chứng | vừa sửa xong một lỗi thật |
| `.agent_memory/visual_metaphor_dictionary.json` | mẫu hình ảnh đã được duyệt (từ khóa → bố cục, primitive, màu) | một cảnh được khen / duyệt |
| `.agent_memory/production_log.md` | nhật ký từng video | xuất xong video (/retro) |
| `.agents/skills/learned/<tên>/SKILL.md` | kỹ năng đóng gói, dùng lại được | một kỹ thuật lặp lại ≥ 2 lần và đã được duyệt |

## Lệnh (chạy từ thư mục gốc, chỉ cần Node)

```bash
node scripts/memory.mjs status
node scripts/memory.mjs sync            # in dòng "🧠 [Memory Synced]" đầu phiên
node scripts/memory.mjs add-taste "Quy tắc" --section "1. Phong cách paper-cut"
node scripts/memory.mjs add-lesson "Triệu chứng" "Cách làm sai cần tránh" "Giải pháp đã kiểm chứng"
node scripts/memory.mjs add-pattern "từ khóa" "bố cục" "prim1,prim2" "#mau1,#mau2" "ghi chú"
node scripts/memory.mjs log-video <slug> "Tiêu đề" <giây> "Bài học"
node scripts/memory.mjs retro <slug>    # tạo projects/<slug>/RETRO.md từ templates/RETRO.md
```
ID tự đánh số tiếp theo, không bao giờ trùng; công cụ không tự xóa dòng nào (quá 200 dòng chỉ cảnh báo để gộp tay).

## Nguyên tắc

1. **Ghi ngay trong lượt trả lời đó**, trước khi render lại. Góp ý không được ghi = góp ý sẽ bị lặp lại ở video sau.
2. **Chỉ ghi golden path đã chạy thật** (đã render/đo/nhìn thấy kết quả). Chưa kiểm chứng → chưa ghi.
3. **Một ý một dòng, cụ thể, có số**: "spring damping 0.8, đáp trong 0.6s" chứ không "chuyển động mượt hơn".
4. **Mâu thuẫn → sửa quy tắc cũ** (`--id TASTE-xx` để cập nhật đúng dòng), không để hai quy tắc ngược nhau cùng tồn tại.
5. **Gu của chủ dự án thắng mặc định của framework.** Khi HyperFrames/Remotion skill nói khác `director_taste.md`, làm theo `director_taste.md`.
6. **Đóng gói kỹ năng** khi một kỹ thuật được dùng lại lần 2 và đã được khen: tạo `.agents/skills/learned/<ten>/SKILL.md`
   (frontmatter `name`, `description`; nội dung: khi nào dùng, file mẫu, thông số, cách kiểm), thêm 1 dòng vào `.agents/skills/learned/README.md`.

## Ví dụ ánh xạ góp ý → lệnh

| Chủ dự án nói | Ghi |
| --- | --- |
| "Giấy rơi nhanh quá" | `add-taste "Lớp giấy đáp trong 0.8-1.0s (spring damping 18, stiffness 70), không dưới 0.6s" --section "2. Chuyển động & nhịp (chuẩn HyperFrames, áp dụng mặc định)"` |
| "Đoạn xé giấy đẹp, giữ" | `add-pattern "chuyển cảnh xé giấy" "torn-paper-rip" "..." "..." "..."` (+1 lần duyệt) |
| Vừa sửa lỗi render trắng | `add-lesson "Triệu chứng" "Cái đã thử mà sai" "Cái đã sửa được"` |
| Xuất xong video | `retro <slug>` → điền → `log-video` + các `add-*` trong mục Thu hoạch |
