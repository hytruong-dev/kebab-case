# NHẬT KÝ SẢN XUẤT (PRODUCTION LOG)
> Mỗi video xong ghi 1 mục bằng `node scripts/memory.mjs log-video …` (bước /retro). Đọc để biết lần trước làm gì, mất bao lâu, rút ra gì.

### Video: paper-cut-film - "Remotion × HyperFrames paper-cut demo" (2026-11-18 17:30)
- **Thời lượng:** 17.4s | 1920x1080 @ 30fps | H.264 + AAC | -31.9 dB mean, -2.8 dB max (chưa master LUFS)
- **Cấu trúc:** collage reveal (HF) → plate ngày (Remotion) → torn-paper-rip (HF, slot = khung Remotion) → plate hoàng hôn + confetti alpha (Remotion) → scribble (HF) → outro stop-motion + hw-title (HF) + grain + 5 SFX.
- **Bài học rút ra:** LESSON-01..08. `hf:check` PASS lần đầu sau khi dời slot template. Chưa có giọng đọc/nhạc nền → lần sau master về -14 LUFS (TASTE-13).

### Video: eilean-mor - "Ngọn hải đăng Eilean Mor: Bí ẩn 3 người gác đèn biến mất" (2026-11-18 15:42)
- **Thời lượng:** 232.6s
- **Bài học rút ra:** 7 chương, 51 câu = 51 cảnh paper-cut (Remotion 15fps on twos), 6 thẻ chương xé giấy (HyperFrames), phụ đề 149 nhóm, giọng OmniVoice tempo 1.08, nhạc nền tự sinh (sóng + drone) ducking. QA PASS -14.0 LUFS TP -1.5, không đoạn đứng hình. Bản YouTube CRF18 384MB.

### Video: eilean-wave-scene - "Con sóng ở bến phía tây (màn chuyển động 12 lớp giấy Gemini)" (2026-11-19 02:54)
- **Thời lượng:** 26.5s
- **Bài học rút ra:** 12 prompt theo lớp, tạo qua Playwright MCP ~30s/ảnh, tải bản 2752px, khử logo 12/12, tách nền 4 lớp iso; 6 beat; QA PASS -14.0 LUFS.

### Video: eilean-assemble - "Lắp ráp cảnh mở đầu Eilean Mòr (học từ clip mẫu)" (2026-11-19 03:20)
- **Thời lượng:** 9.0s
- **Bài học rút ra:** 22 mảnh, 4 nhóm, camera đứng yên, idle motion, đèn bật là phần thưởng cuối. Component dùng chung remotion/src/paper/Assemble.tsx.
