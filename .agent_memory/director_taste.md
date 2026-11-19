# HỒ SƠ GU ĐẠO DIỄN (DIRECTOR TASTE)
> Quy tắc thẩm mỹ của chủ dự án (Bình). Mọi video mới PHẢI theo các quy tắc dưới đây; không hỏi lại những gì đã ghi.
> Thêm/sửa bằng `node scripts/memory.mjs add-taste "..." --section "..."`. Quy tắc mới nhất thắng quy tắc cũ cùng chủ đề.
> Nguồn: `[paper-cut]` = rút ra trong dự án này · `[kế thừa TASTE-xx]` = từ `C:\QuangHy\youtube_ai_edit-02\.agent_memory\director_taste.md`.

## 1. Phong cách paper-cut
- [TASTE-01] (2026-11-18) [paper-cut] Ba dấu hiệu bắt buộc để một lớp "đọc ra là giấy": thớ giấy (`paper()`), mép xé/cắt (`roughenEdges()`), bóng đổ tách lớp (`dropShadow()`). Dùng chung qua `remotion/src/paper/PaperLayer.tsx`, không tự viết lại.
- [TASTE-02] (2026-11-18) [paper-cut] Chuyển động stop-motion "on twos": hình đổi mỗi 2 frame (15 tư thế/giây ở 30fps); rung tay (boil) đổi tư thế mỗi 4 frame, có seed. Không dùng chuyển động trơn liên tục cho vật giấy.
- [TASTE-03] (2026-11-18) [paper-cut] Chiều sâu bằng nhiều lớp giấy (tối thiểu nền + 3 lớp), lớp gần trôi nhiều hơn lớp xa khi camera lia (parallax); lớp gần có bóng đổ sâu hơn (depth 4 → 14px).
- [TASTE-04] (2026-11-18) [paper-cut] Bảng màu duy nhất ở `shared/palette.json` (kem/nâu giấy, xanh đồi, cam nắng, đỏ nhấn). Không hard-code màu mới; biến thể (hoàng hôn) = cùng lớp, tô lại màu.
- [TASTE-05] (2026-11-18) [paper-cut] Chuyển cảnh phải có lý do vật lý của giấy: xé (torn-paper-rip), mảnh giấy bay đi (paper-collage-reveal), lật trang (pageTurn / bookFlip), bút dạ quét che. Không crossfade giữa hai thế giới.
- [TASTE-19] (2026-11-19) Cảnh giới thiệu bối cảnh dùng kỹ thuật LẮP RÁP: 15-25 mảnh giấy nhỏ bay vào theo trình tự nền (0-1.2s) → khối lớn (1.2-3.6s) → chi tiết vừa (3.6-6s) → chi tiết nhỏ lấp mép (6-8.5s), mảnh sau vào khi mảnh trước còn đang đáp (không khoảnh khắc đứng hình), giữ 0.5-1s rồi cắt. Học từ clip mẫu chủ dự án gửi (Video Project 2).
- [TASTE-20] (2026-11-19) Trong cảnh lắp ráp CAMERA ĐỨNG YÊN; chuyển động đến từ mảnh giấy. Mảnh đã đáp vẫn cử động nhẹ tại chỗ (sóng bập bềnh, tàu lắc, cờ phất, chim bay, mây trôi). Độ chi tiết đến từ SỐ LƯỢNG mảnh đơn giản, không từ một hình phức tạp.

## 2. Chuyển động & nhịp (chuẩn HyperFrames, áp dụng mặc định)
- [TASTE-06] (2026-11-18) [paper-cut] Vật đến: ease đuôi dài (`expo.out`/`power4.out`, spring damping 0.7-0.85); lia camera `power2.inOut`; thoát `power3.in`, ngắn hơn lúc vào 40-50%. Tiêu đề đáp xong thì đứng yên, không trôi/thở.
- [TASTE-07] (2026-11-18) [paper-cut] Dùng 3-5 kiểu chuyển cảnh trong một phim, mỗi kiểu có nguyên nhân trên màn hình; tối đa 1/3 điểm nối là cắt cứng.

## 3. Hình ảnh khớp lời (kế thừa, áp dụng khi video có giọng đọc)
- [TASTE-08] (2026-11-18) [kế thừa TASTE-35, TASTE-47] Mỗi câu/ý thoại = 1 hình riêng vẽ đúng thứ đang nói (danh từ, hành động, con số). Người xem không phải tự tưởng tượng. Không dùng lại hình cho ý khác.
- [TASTE-09] (2026-11-18) [kế thừa TASTE-47, luật 3] Mỗi hình giữ 3-15 giây (Shorts ≤ 7s). Quá 15s → tách câu, thêm hình.
- [TASTE-10] (2026-11-18) [kế thừa luật 6, LESSON-67] Lời đọc viết số bằng chữ, phụ đề/hình hiện số ("ba mét rưỡi" → `3,5m`).
- [TASTE-11] (2026-11-18) [kế thừa TASTE-60] Văn phong mặc định: hài hước + thú vị + khoa học đúng; mỗi 20-30 giây ≥ 1 chỗ cười; không đùa sai sự thật, không thô tục.

## 4. Âm thanh
- [TASTE-12] (2026-11-18) [kế thừa TASTE-32] Không giọng thì thầm/ASMR; câu chốt ngắn, dứt khoát.
- [TASTE-13] (2026-11-18) [kế thừa QA youtube_ai_edit-02] Video dài master về -14 LUFS (chấp nhận -15.5..-12.5), True Peak ≤ -1 dBTP; Shorts -20..-13 LUFS. Âm thanh trên mọi hành động nhìn thấy được (xé, lật, bay).

## 5. Ảnh AI (khi dùng Gemini/HeyGen để tạo hình)
- [TASTE-14] (2026-11-18) [kế thừa TASTE-71] Prompt an toàn tuyệt đối: không tên nhân vật/người thật/thương hiệu có bản quyền, không sinh trắc học, không vũ khí/máu me; chuyển sang dạng hoạt hình chung. Bị từ chối → mở chat mới, không gửi tiếp trong chat đã bị cảnh báo.
- [TASTE-15] (2026-11-18) [kế thừa TASTE-35, TASTE-36] Ảnh AI không được có chữ bên trong (NO TEXT); mọi chữ do engine vẽ. Khử watermark Gemini trước khi dùng.

## 6. Xuất bản
- [TASTE-16] (2026-11-18) [kế thừa AGENTS.md youtube_ai_edit-02] ⛔ KHÔNG BAO GIỜ tự đăng / lên lịch YouTube. Làm xong gói SEO thì dừng, báo cáo, chờ chủ dự án ra lệnh "đăng" kèm giờ.
- [TASTE-17] (2026-11-18) [kế thừa TASTE-70] Tiêu đề không ghi số phút. Không chèn lời "bấm đăng ký" vào giọng đọc nếu đã có outro làm việc đó.
- [TASTE-18] (2026-11-18) [kế thừa TASTE-46, TASTE-61] Nếu là video dài kiếm tiền YouTube: ≥ 8:30 để có mid-roll. Thiếu thời lượng → viết thêm nội dung, không làm chậm giọng.
