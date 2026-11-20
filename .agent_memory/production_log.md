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

### Video: eilean-layer-assemble - "Lắp ráp cảnh mở đầu bằng 22 lớp giấy Gemini" (2026-11-19 03:50)
- **Thời lượng:** 9.5s
- **Bài học rút ra:** 22 prompt từng mảnh (nền trắng) qua Playwright MCP, khử logo 22/22, tách nền 22/22, lắp theo 4 nhóm, 22 tiếng giấy, đèn bật cuối. QA PASS -14.0 LUFS.

### Video: eilean-director-opening - "Màn mở đầu Eilean Mòr - diorama 5 lớp phông xanh (bản huấn luyện)" (2026-11-19 07:44)
- **Thời lượng:** 10.0s
- **Bài học rút ra:** Từ bản 22 mảnh bị chê rối -> sổ đạo diễn + 1 chat Gemini + khung master + 5 lớp full-bleed phông xanh (trời, biển, vách xa, đảo, hải đăng), chroma_key, khớp master ECC 0.95-0.99, mở bằng màn trắng. Skill learned/diorama-layer-pipeline. Chưa có âm thanh/QA.

### Video: transistor-1947 - "Khoảnh khắc khai sinh bóng bán dẫn tại Bell Labs (1947)" (2026-11-19 08:14)
- **Thời lượng:** 30.0s
- **Bài học rút ra:** 6 prompt theo luồng 1 chat Gemini Pro, tải bản 2752px, khử watermark 6/6, Remotion stop-motion on-twos 15fps, audio sfx mux + master -14 LUFS TP -1.5, QA PASS.

### Video: transistor-diorama - "Màn lắp ráp diorama transistor 1947 từ 5 lớp phông xanh" (2026-11-19 08:33)
- **Thời lượng:** 12.0s
- **Bài học rút ra:** Lắp ráp từng thành phần từ nền trắng: L1 nền -> L2 bệ -> L3 dây -> L4 đèn -> L5 transistor core. Khử viền 4 cạnh = 0, đèn dây tóc bừng sáng ở 6.8s, QA PASS -14 LUFS.

### Video: transistor-crystal-diorama - "Tinh the Gecmani Bell Labs 1947" (2026-11-19 10:39)
- **Thời lượng:** 12.0s
- **Bài học rút ra:** Tach lop truc tiep tu master artwork loai bo hoan toan vien xanh chroma key; tung thanh phan lap rap theo thu tu lop do sau Remotion; visual inspection tung frame.

### Video: wagon-wheel-effect - "Ảo giác Bánh xe ma: Tại sao xe chạy tới mà bánh lại quay giật lùi?" (2026-11-20 03:11)
- **Thời lượng:** 34.0s
- **Bài học rút ra:** Cấu trúc video khoa học giải thích nghịch lý: Hook xe chạy -> Phân tích nan hoa cận cảnh -> Mô hình cửa chập 24 FPS -> Sơ đồ góc quay 350 vs 10 độ -> Đèn đường 50Hz đời thực

### Video: wagon-wheel-effect - "Ao giac banh xe ma v2 (15 cau, moi cau 1 hinh)" (2026-11-20 04:20)
- **Thời lượng:** 95.3s
- **Bài học rút ra:** Video giai thich phai ve tung buoc lap luan; thi nghiem nan do 30/360/350 lam ro aliasing; giu dai an toan phu de

### Video: wagon-wheel-effect - "Ao giac banh xe ma v3 (24 asset Gemini cua chu nhan + bai giang 15 buoc)" (2026-11-20 07:20)
- **Thời lượng:** 95.7s
- **Bài học rút ra:** Asset Gemini phai do lai hinh hoc; noi Chrome thuong qua CDP de dung tai khoan khac

### Video: wagon-wheel-effect - "Ao giac banh xe ma v4 (them 8 nen boi canh + 10 dao cu)" (2026-11-20 08:07)
- **Thời lượng:** 95.7s
- **Bài học rút ra:** Moi canh 1 nen boi canh rieng + dao cu chuyen dong phu; giua nen de tron cho so do

### Video: brain-procrastination-ep01 - "Why Your Brain Loves Procrastinating (EP01, English, Brain & Psychology)" (2026-11-20 09:09)
- **Thời lượng:** 376.0s
- **Bài học rút ra:** English Kokoro voice; Gemini quota ~14 imgs -> mascot via Gemini, rest as SVG icons; 51 one-line beats; -14.0 LUFS QA PASS

### Video: brain-procrastination-ep01-v2 - "EP01 v2 — fully illustrated with Gemini (64 images, 3 accounts)" (2026-11-20 10:40)
- **Thời lượng:** 376.0s
- **Bài học rút ra:** Each icon reads public/brain/ep01/<id>.png via AssetCtx (fallback to vector); 6 hero images used as backdrops; 3 thumbnails in out/thumbnails; QA PASS -14.0 LUFS

### Video: brain-procrastination-ep01-v2b - "S1E01 rebuilt from owner doc v2 — 10:22, 60 fps, modular bridge + single outro" (2026-11-20 19:23)
- **Thời lượng:** 622.0s
- **Bài học rút ra:** Doc voiceover verbatim + 21 sourced research beats to hit 10-11 min; 77 Gemini imgs via 3 parallel accounts; motion-check gate before the 20-min render; QA PASS -14.0 LUFS
