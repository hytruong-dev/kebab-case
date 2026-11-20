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
- [TASTE-19] (2026-11-19) ⚠️ ĐÃ THAY bởi TASTE-21/23/26 (chủ dự án chê bản 22 mảnh là rối); chỉ giữ ý camera đứng yên + mảnh nối tiếp + idle motion. Cảnh giới thiệu bối cảnh dùng kỹ thuật LẮP RÁP: 15-25 mảnh giấy nhỏ bay vào theo trình tự nền (0-1.2s) → khối lớn (1.2-3.6s) → chi tiết vừa (3.6-6s) → chi tiết nhỏ lấp mép (6-8.5s), mảnh sau vào khi mảnh trước còn đang đáp (không khoảnh khắc đứng hình), giữ 0.5-1s rồi cắt. Học từ clip mẫu chủ dự án gửi (Video Project 2).
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

## Bo cuc
- [TASTE-21] (2026-11-19) BO CUC GON NHU DIORAMA (chu nhan che 'roi, mau khong hai hoa' o ban 22 manh): 1 khung = 1 chu the hero (dao + hai dang o duong 1/3 phai), >=40% khoang tho (troi, bien lang), 1 bang mau don sac xanh dem + DUY NHAT 1 mau nong la den hai dang (nho). Cam rai sticker khong lien quan (tau, phao cam, co do, mat trang hoat hinh, ruong) khap khung. Truoc khi tao anh phai viet director BOOK.md (WORLD/PALETTE/LIGHT/COMPOSITION/NEGATIVE) va dan nguyen van vao prompt. Mau: projects/eilean-mor/director/assets/ref_good.jpg vs ref_bad.jpg.
- [TASTE-23] (2026-11-19) THU TU LOP CO BAN cho 1 khung (chu nhan danh so tren anh): 1 chan troi/bau troi -> 2 bien -> 3 nui (dao + vach da xa + bot song chan dao) -> 4 hai dang (+ nha gac). Tao anh dung thu tu nay trong CUNG chat voi khung master, moi lop 1 anh; dung thu tu nay cho ca thu tu lap rap. Chu nhan se nang cap them sau.
- [TASTE-25] (2026-11-19) ANH LOP PHAI FULL MAN HINH (full-bleed, tran 4 mep): KHONG co khung tranh/vien giay xe/passe-partout/tuong bao quanh. Gemini hay tu ve khung giay xe khi prompt noi 'paper-cut diorama' -> prompt phai cam ro va phai kiem tra 4 mep anh truoc khi dung. Canh mo dau bat dau tu MAN HINH TRANG roi tung thanh phan hien ra.
- [TASTE-26] (2026-11-19) TACH LOP CHI TIET: bien va nui la 2 lop rieng; nui gom 2 khoi cung tach rieng (dao chinh co duong mon + cau tau, va day vach da xa ben phai). Thu tu: troi -> bien -> vach da xa -> dao -> hai dang.
- [TASTE-27] (2026-11-19) Tuyệt đối không dùng 1 ảnh nguyên khối để show cả cảnh. Mọi cảnh paper-cut phải được bóc tách thành từng thành phần chi tiết nhỏ nhất (nền, bệ đỡ/sàn, chi tiết linh kiện, dây nối, hiệu ứng), tạo từng lớp trên phông xanh (#00FF00) trong cùng chat Gemini, tách nền bằng chroma_key.py, rồi lắp ráp từng thành phần trồi vào màn hình trắng theo đúng thứ tự chiều sâu.
- [TASTE-28] (2026-11-19) Tách lớp phông xanh phải cô lập 100% từng thành phần: Mỗi layer chỉ chứa duy nhất chi tiết của nó. Nghiêm cấm lặp lại chi tiết lõi (như lõi transistor Hình 4) vào các lớp khác (bệ đỡ L2, dây dẫn L3, bóng đèn L4). Bệ đỡ phải hoàn toàn phẳng và trống ở mặt trên trước khi lõi đáp xuống. Kiểm tra kỹ từng giây, loại bỏ triệt để mọi rác/clump phông xanh trôi nổi.

## Quy trinh anh
- [TASTE-22] (2026-11-19) MOT CHU DE = MOT CUOC HOI THOAI GEMINI: moi anh cua cung 1 canh/chu de phai tao noi tiep trong CUNG mot chat (scripts/gemini-thread-gen.js), tin nhan 1 = bat bien + khung master, cac tin sau chi noi 'giong anh 1, chi thay X'. KHONG mo new chat cho moi anh. Luu URL chat vao du an de sua tiep trong cung thread.
- [TASTE-24] (2026-11-19) PROMPT TACH LOP DUNG PHONG XANH: moi lop (tru lop troi) tao tren nen chroma-key xanh la phang #00FF00 (khong gradient/van giay/bong/vignette, khong loang xanh len vat, co xanh giu mau reu toi) de cat de. Cat bang tools/image/chroma_key.py.

## Noi dung giai thich
- [TASTE-29] (2026-11-20) Video giai thich khoa hoc phai CHI TIET TUNG BUOC de nguoi xem hieu dang dien giai gi: moi y trong loi thoai phai co hinh minh hoa rieng xuat hien DUNG LUC no duoc noi (khong 1 hinh cho ca doan dai); moi khai niem moi (khung hinh, toc do quet, goc quay, loi tat nao bo) phai duoc VE RA tung buoc truoc khi ket luan; co nhan chu ngan gon + so lieu tren hinh; khong de nguoi xem tu suy luan. (Chu nhan che wagon-wheel-effect 34s: 'chua chi tiet ve noi dung lan hinh anh, nguoi xem chua hieu')
- [TASTE-30] (2026-11-20) Chu nhan co the tu viet bo prompt asset (vd 24 anh flat vector) cho 1 video: lam DUNG style chu nhan chon (khong ep ve paper-cut khi chu nhan chon 'giu dung prompt'), van tao trong 1 chat Gemini, nen phong xanh thay nen trang, roi lap vao bai giang tung buoc da co (giu mui ten/so/nhan bang vector de goc chinh xac)
- [TASTE-31] (2026-11-20) Chu nhan muon hinh anh CHI TIET HON (wagon v3: nhieu canh chi la vai vat the tren nen giay trang tron -> trong). Moi canh can: 1 nen boi canh rieng hop noi dung (studio, xuong thi nghiem, rap phim, pho dem...) nhung giua nen diu de chua cho noi dung; them dao cu phu ke chuyen (dong ho bam giay, kinh lup, co ve, cuon phim, quat...); vat the co chuyen dong phu (cuon phim quay, kim dong ho chay) thay vi dung im

## Hình ảnh
- [TASTE-32] (2026-11-20) When Gemini runs out of quota, the owner wants to SWITCH TO ANOTHER ACCOUNT and keep generating every image the prompts call for (no substituting with code-drawn vector images), then put them in the project and re-render the video with all of the images.

## Kênh
- [TASTE-33] (2026-11-20) Brain & Psychology EP01 (projects/brain-procrastination-ep01) is the owner's APPROVED STANDARD ('hoan hao') for long-term production: future videos use the channel plan PLAN_owner.md + skill learned/brain-explainer-episode; the project was cleaned down to this pipeline (old Eilean/Transistor/Wagon projects deleted, lessons kept in .agent_memory).
