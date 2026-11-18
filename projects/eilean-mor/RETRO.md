# RETRO — eilean-mor

## 1. Kết quả
- File: `out/eilean-mor.mp4` (bản gốc, 700 MB) · `out/eilean-mor_youtube.mp4` (bản đăng, CRF 18, 384 MB)
- Thời lượng: 232.6 s (3:52) · LUFS / TP: -14.0 / -1.5 · QA: PASS (cả 2 bản), không đoạn đứng hình ≥ 6 s
- 7 chương · 51 câu = 51 cảnh paper-cut · 6 thẻ chương xé giấy · 149 nhóm phụ đề · nhạc nền tự sinh + 7 SFX
- Thời gian máy: giọng ~60 phút (bị kẹt 40 phút do tranh CPU) · plates ~15 phút · hf:render ~16 phút

## 2. Góp ý của chủ dự án → quy tắc
| Góp ý | Quy tắc | Đã ghi? |
| --- | --- | --- |
| Chọn chờ Tập 33 xong rồi mới chạy giọng (phương án 1) | Không bao giờ chạy 2 job OmniVoice cùng lúc | LESSON-19 ✓ |

## 3. Lỗi đã gặp → cách sửa
| Triệu chứng | Đã thử mà sai | Cách đúng | Đã ghi? |
| --- | --- | --- | --- |
| Giọng đứng 40 phút | 2 job OmniVoice song song, giới hạn luồng | 1 job mỗi lần, kiểm tra tiến trình trước | LESSON-19 ✓ |
| tremolo lỗi f < 0.1 | tremolo cho nhịp sóng chậm | volume expression theo t | LESSON-21 ✓ |
| Nhạc nền -39.7 LUFS (không nghe thấy) | loudnorm -30 trước ducking | loudnorm -25 + makeup → -33 | LESSON-21 ✓ |
| File 700 MB | dùng bản delivery để đăng | xuất thêm bản CRF 18 | LESSON-20 ✓ |

## 4. Đáng giữ
- `remotion/src/eilean/kit.tsx` (biển, đảo, hải đăng + chùm sáng Fl(2), tàu, búp bê giấy, Note/Tag/Stamp) — dùng lại cho video bí ẩn/lịch sử biển.
- Quy trình "1 câu = 1 file giọng = 1 cảnh" (`scripts/tts-project.mjs` → `scripts/build-eilean.mjs`): khớp hình-lời chính xác, không cần ASR.
- Kỹ thuật dùng lần 2 → nên đóng gói `learned/narrated-paper-film` khi làm video kế tiếp cùng kiểu.

## 5. Lần sau làm khác đi
- Kiểm tra CPU rảnh trước khi chạy TTS.
- `build-eilean.mjs` đang gắn tên dự án — tổng quát hóa thành `build-narrated.mjs` khi làm video thứ 2 cùng kiểu.
- Video < 8:30 nên không có mid-roll (TASTE-18); nếu muốn kiếm tiền thì mở rộng kịch bản (thêm chương bối cảnh nghề gác đèn, lời kể của Walter Aldebert 1953-57, giả thuyết đánh nhau).
