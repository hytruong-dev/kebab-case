# 🖥️ Hướng Dẫn Vận Hành Dự Án Khi Chuyển Sang Máy Mới

Tài liệu này đảm bảo khi bạn chuyển sang bất kỳ máy tính mới nào (Windows / macOS / Linux), chỉ cần 3 bước đơn giản là bạn hoặc AI agent (Cursor, Antigravity, Claude Code, v.v.) có thể tiếp tục sản xuất video bình thường, mượt mà và đúng 100% chuẩn chất lượng hiện tại.

---

## 1. Yêu Cầu Cài Đặt Trước (Prerequisites)

1. **Git**
2. **Node.js** (Khuyên dùng v20 hoặc v22 LTS)
3. **Python 3.10+**
4. **FFmpeg**: Cần có sẵn trong terminal (`ffmpeg -version` chạy được).
   - *Windows:* Cài qua `winget install Gyan.FFmpeg` hoặc tải từ ffmpeg.org và thêm thư mục `bin` vào Environment Variables (Path).
   - *macOS:* `brew install ffmpeg`
   - *Linux:* `sudo apt install ffmpeg`

---

## 2. Các Lệnh Cài Đặt Sau Khi Clone

Mở Terminal trong thư mục dự án và chạy lần lượt:

```bash
# 1. Cài đặt các gói npm ở thư mục gốc (quản lý scripts, hyperframes, linter)
npm install

# 2. Cài đặt các gói npm cho Remotion (máy dựng video React)
cd remotion
npm install
cd ..

# 3. Cài đặt thư viện Python (dùng khi xử lý giọng nói Kokoro TTS và xử lý ảnh Gemini)
pip install kokoro-onnx soundfile Pillow
```

---

## 3. Kiểm Tra Đồng Bộ Hệ Thống

Chạy lệnh kiểm tra bộ nhớ dự án:
```bash
node scripts/memory.mjs sync
```
*Kết quả sẽ hiển thị:*
`🧠 [Memory Synced] Đã đồng bộ bộ nhớ dự án (38 quy tắc đạo diễn, 43 bài học kỹ thuật, 8 mẫu hình ảnh, 4 kỹ năng đã học, 18 video trong nhật ký)...`

Kiểm tra mã nguồn TypeScript:
```bash
# Windows PowerShell:
Set-Location remotion; npx tsc --noEmit; Set-Location ..

# macOS / Linux / Bash:
cd remotion && npx tsc --noEmit && cd ..
```
*Nếu không báo lỗi gì, hệ thống đã sẵn sàng 100%!*

---

## 4. Cách Ra Lệnh Cho AI Bên Máy Mới

Khi mở dự án trên IDE có AI (Antigravity, Cursor, Claude Code...), bạn chỉ cần gửi yêu cầu như bình thường:

> **Ví dụ câu lệnh:**
> - *"Tiếp tục sản xuất video cho tôi"*
> - *"Hãy sản xuất tập 2 kênh Brain về chủ đề: Tại sao chúng ta lại trì hoãn và cách khắc phục theo khoa học"*
> - *"Mở Remotion Studio để tôi xem trước tập 1"*

### Tại sao AI bên máy mới sẽ hiểu và làm đúng ngay lập tức?
1. **`AGENTS.md`** đóng vai trò là "Bộ chỉ huy" tự động nạp vào AI ngay từ câu chào đầu tiên.
2. **`.agent_memory/`** chứa đầy đủ toàn bộ 38 quy tắc gu thẩm mỹ của bạn (`[TASTE-01]` đến `[TASTE-38]`) và 43 bài học kinh nghiệm (`[LESSON-01]` đến `[LESSON-43]`), bao gồm:
   - Quy tắc background full-bleed không để hở khoảng trống (`[TASTE-37]`).
   - Nhân vật mascot đặt sát đáy màn hình (`[TASTE-37]`).
   - Bỏ bảng PART chuyển chương giữa video để video liền mạch (`[TASTE-38]`).
   - Âm thanh master chuẩn -14 LUFS / True Peak -1.5 dBTP.
3. **`.agents/skills/learned/brain-explainer-episode/`** và quy trình **`.agent/workflows/lam-tap-brain.md`** hướng dẫn AI từng bước từ phân tích kịch bản, ánh xạ hình ảnh, tạo nhịp hoạt họa, đến render và kiểm tra chất lượng.

---

## 5. Các Lệnh Thường Dùng Khi Sản Xuất

| Tác vụ | Lệnh thực hiện |
| :--- | :--- |
| **Xem trước visual trực quan** | `npm run remotion:studio` |
| **Render tập phim hoàn chỉnh** | `node scripts/brain/render.mjs <tên-thư-mục-tập>` |
| **Trộn âm thanh & Master -14 LUFS** | `node scripts/brain/audio.mjs <tên-thư-mục-tập>` |
| **Xuất phụ đề SRT chuẩn khung hình** | `node scripts/brain/srt.mjs <tên-thư-mục-tập>` |
| **Kiểm định chất lượng video (QA)** | `node scripts/qa-video.mjs out/<tên-file>.mp4 --expect <thời-lượng-giây>` |

