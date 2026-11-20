# SỔ TAY BÀI HỌC KỸ THUẬT (VERIFIED LESSONS)
> AI ở máy mới đọc file này để dùng ngay giải pháp đã kiểm chứng và KHÔNG thử lại các hướng đã thất bại.
> Thêm bằng `node scripts/memory.mjs add-lesson "triệu chứng" "cách sai" "giải pháp đúng"` (tự đánh số).
> Nguồn: `[paper-cut]` = dự án này · `[kế thừa LESSON-xx]` = `C:\QuangHy\youtube_ai_edit-02\.agent_memory\lessons_learned.md`.

### [LESSON-01] (2026-11-18)
- **Symptom:** [paper-cut] Render Remotion qua script ghi file ra `C:\QuangHy\paper-cut.mp4` thay vì đúng thư mục; script báo "produced no file".
- **Ruled-out Dead-end:** `execFileSync("npx", args, { shell: true })` trên Windows — đường dẫn có dấu cách ("paper-cut animation") bị tách thành 2 tham số.
- **Verified Golden Path:** Gọi `process.execPath` + `remotion/node_modules/@remotion/cli/remotion-cli.js` bằng `execFileSync` KHÔNG có shell (xem `scripts/build-plates.mjs`).

### [LESSON-02] (2026-11-18)
- **Symptom:** [paper-cut] `npx hyperframes add …` trong thư mục `hyperframes/` báo "could not determine executable to run".
- **Ruled-out Dead-end:** Gọi trần `npx hyperframes` — `package.json` cục bộ cũng tên `hyperframes` nên che mất CLI.
- **Verified Golden Path:** Luôn gọi `npx --yes hyperframes@0.9.65 <lệnh>` (các `npm run hf:*` đã làm sẵn).

### [LESSON-03] (2026-11-18)
- **Symptom:** [paper-cut] Lớp giấy Remotion bị tối/sai màu so với bảng màu.
- **Ruled-out Dead-end:** Đặt `paper({ colorFront: <màu lớp> })` — shader NHÂN màu nguồn với tông giấy nên màu bị bẩn.
- **Verified Golden Path:** Để màu ở nội dung (SVG/DOM), giữ `paper({ colorFront: "#ffffff", colorBack: "#eadfc8" })` gần trắng.

### [LESSON-04] (2026-11-18)
- **Symptom:** [paper-cut] Render lỗi `TypeError "seed" must be <= 1000`.
- **Ruled-out Dead-end:** Truyền seed tùy ý (vd `baseY * 7`) vào `paper()`/`roughenEdges()`.
- **Verified Golden Path:** Gập seed về `[0, 1000]` (`Math.abs(seed) % 1000`) — đã làm trong `PaperLayer`.

### [LESSON-05] (2026-11-18)
- **Symptom:** [paper-cut] Hiệu ứng WebGL2/WebGPU của `@remotion/effects` (paper, pageTurn, cylinder…) render trống khi chạy headless.
- **Ruled-out Dead-end:** Dùng renderer GL mặc định.
- **Verified Golden Path:** `Config.setChromiumOpenGlRenderer("angle")` trong `remotion.config.ts` và `--gl=angle` khi render. Đã kiểm trên máy này: WebGL2, WebGPU, HTML-in-canvas đều chạy (đo pixel). Máy không GPU: `--gl=swangle`.

### [LESSON-06] (2026-11-18)
- **Symptom:** [paper-cut] `hyperframes lint` báo `root_missing_composition_id` dù `#root` có đủ thuộc tính.
- **Ruled-out Dead-end:** Đặt `<template data-slot=…>` trước `#root` trong `index.html` — linter coi template đầu tiên là gốc.
- **Verified Golden Path:** Đặt mọi slot template SAU `#root`. Phần tử timed có con lồng bên trong → tách thành sub-composition (`compositions/grain.html`).

### [LESSON-07] (2026-11-18)
- **Symptom:** [paper-cut] Tưởng video confetti mất kênh alpha vì `ffprobe` báo `pix_fmt=yuv420p`.
- **Ruled-out Dead-end:** Render lại sang ProRes.
- **Verified Golden Path:** VP9 lưu alpha ở kênh phụ: kiểm `tag:ALPHA_MODE=1` và giải mã bằng `-c:v libvpx-vp9 … -vf alphaextract`. Render alpha: `--codec=vp9 --image-format=png --pixel-format=yuva420p`.

### [LESSON-08] (2026-11-18)
- **Symptom:** [paper-cut] Ô `irisWipe` trong gallery không đổi gì.
- **Ruled-out Dead-end:** Truyền `outerRadius` dạng 0..1.
- **Verified Golden Path:** Đọc schema trong `node_modules/@remotion/effects/dist/*.d.ts` trước khi dùng: `outerRadius` tính bằng pixel (0-2000). Kiểm toàn bộ gallery bằng `node scripts/audit-effects-gallery.mjs`.

### [LESSON-09] (2026-11-18)
- **Symptom:** [kế thừa LESSON-72] Render lại sau khi đổi ảnh/beat nhưng video vẫn hiện bản cũ.
- **Ruled-out Dead-end:** Tin cache render.
- **Verified Golden Path:** Đổi gì ở Remotion → `npm run plates` lại đúng plate đó rồi mới `hf:render`. Kiểm timestamp file plate mới.

### [LESSON-10] (2026-11-18)
- **Symptom:** [kế thừa LESSON-25] Ghép intro/outro (MP4 từ Gemini/Veo, `time_base 1/90000`) với master FFmpeg bị rơi hàng nghìn frame.
- **Ruled-out Dead-end:** `ffmpeg -f concat` thẳng các file khác timebase.
- **Verified Golden Path:** Chuẩn hóa mọi đoạn về cùng kích thước, fps, `yuv420p`, `-video_track_timescale` và audio 48 kHz stereo trước khi concat. Trong dự án này: đưa intro/outro vào HyperFrames như `<video>` clip thay vì concat.

### [LESSON-11] (2026-11-18)
- **Symptom:** [kế thừa LESSON-73] Tiếng ù/rè suốt video khi giọng TTS 24 kHz qua highpass/lowpass.
- **Ruled-out Dead-end:** Lọc lowpass 12 kHz trước khi resample (đúng tần số Nyquist → biquad mất ổn định).
- **Verified Golden Path:** `aresample=48000` đứng ĐẦU chuỗi `-af`. Kiểm sàn nhiễu lúc giọng nghỉ < -40 dBFS.

### [LESSON-12] (2026-11-18)
- **Symptom:** [kế thừa LESSON-97] Âm lượng chập chờn giữa các đoạn giọng, nhạc nền hổng nhịp, True Peak vượt -1 dBTP.
- **Ruled-out Dead-end:** Để nguyên âm lượng thô từng đoạn; lặp file nhạc có đuôi im lặng; limiter mặc định tự kích gain.
- **Verified Golden Path:** Chuẩn hóa từng đoạn giọng về -16 LUFS + micro-fade 5ms; nhạc nền liền mạch (crossfade); ducking release ~800ms ratio 3.5; `alimiter=limit=0.75:level=0`. Đích -14..-15 LUFS, TP ≤ -1.5.

### [LESSON-13] (2026-11-18)
- **Symptom:** [kế thừa LESSON-85] Windows `WinError 206 filename too long` khi ffmpeg có hàng trăm `-i`.
- **Ruled-out Dead-end:** Dồn mọi input vào một dòng lệnh (giới hạn 32767 ký tự).
- **Verified Golden Path:** Trộn âm trước (NumPy hoặc HyperFrames audio mix) thành 1 file rồi mux với 2 input.

### [LESSON-14] (2026-11-18)
- **Symptom:** [kế thừa LESSON-93] Viết phân cảnh trước khi có giọng thật → sau khi căn thời gian, hàng loạt hình giữ >15s.
- **Ruled-out Dead-end:** Sửa tay từng beat rồi render thử.
- **Verified Golden Path:** Chia beat theo từng câu ngay từ đầu, neo bằng cụm chữ DUY NHẤT trong chương; hoặc viết storyboard sau TTS. Chèn beat mới thì cấp ID mới, không đánh số lại ảnh cũ.

### [LESSON-15] (2026-11-18)
- **Symptom:** [kế thừa LESSON-82, LESSON-64] Lỗi lặp lại giữa các tập vì mỗi tập viết script riêng.
- **Ruled-out Dead-end:** Copy script của tập trước rồi sửa.
- **Verified Golden Path:** Công cụ dùng chung ở `scripts/` + `remotion/src/paper/`; mỗi video chỉ khác dữ liệu (`projects/<slug>/`). Script riêng của tập để trong `projects/<slug>/scripts/`.

### [LESSON-16] (2026-11-18)
- **Symptom:** [kế thừa LESSON-92] Gemini từ chối tạo ảnh ("nhà cung cấp nội dung bên thứ ba" / "không an toàn"), nguy cơ khóa tài khoản.
- **Ruled-out Dead-end:** Chép nguyên câu thoại có tên người nổi tiếng/vũ khí vào prompt; gửi tiếp trong chat đã bị cảnh báo.
- **Verified Golden Path:** Làm sạch prompt trước khi gửi (tên riêng → nhân vật hoạt hình chung, vũ khí → cơ chế hoạt hình vui), mở chat mới ngay khi bị từ chối. Bộ lọc mẫu: `youtube_ai_edit-02/src/episode/prompt_sanitizer.py`.

### [LESSON-17] (2026-11-18)
- **Symptom:** [kế thừa LESSON-04, LESSON-83] `faster-whisper` lỗi `open() got an unexpected keyword argument 'metadata_errors'` (PyAV mới).
- **Ruled-out Dead-end:** Truyền đường dẫn file cho `model.transcribe()`.
- **Verified Golden Path:** Giải mã bằng ffmpeg pipe sang mảng float32 16 kHz mono rồi truyền mảng. Trong dự án này ưu tiên `npx hyperframes transcribe`.

### [LESSON-18] (2026-11-18)
- **Symptom:** QA phát hiện phim paper-cut-film chỉ -18.6 LUFS (HyperFrames render không master loudness).
- **Ruled-out Dead-end:** Tin âm lượng mặc định của hf:render; chỉ nhìn max_volume.
- **Verified Golden Path:** Sau hf:render luôn chạy node scripts/master-audio.mjs <mp4> (loudnorm 2 lượt + alimiter, -14 LUFS, TP -1.5) rồi node scripts/qa-video.mjs. Kết quả: -14.2 LUFS, TP -1.5, QA PASS.

### [LESSON-19] (2026-11-18)
- **Symptom:** Giọng OmniVoice (VoiceStudio, CPU) đứng yên nhiều chục phút khi chạy cùng lúc với job TTS của dự án khác (youtube_ai_edit-02 Tập 33): cả hai job đều không ra file mới.
- **Ruled-out Dead-end:** Chạy song song 2 job OmniVoice, mỗi job dùng toàn bộ luồng CPU; giới hạn OMNIVOICE_THREADS=8 vẫn không đủ.
- **Verified Golden Path:** Trước khi chạy TTS, kiểm tra tiến trình omnivoice_tts.py của dự án khác (Get-CimInstance Win32_Process). Nếu có thì chờ nó xong, hoặc hỏi chủ dự án có cho tạm dừng không; chỉ chạy một job OmniVoice mỗi lần. Cache theo từng câu nên chạy lại sẽ tiếp từ câu còn thiếu.

### [LESSON-20] (2026-11-18)
- **Symptom:** Bản render HyperFrames --quality delivery ra 25 Mbps (700MB cho 3:52), quá nặng để upload.
- **Ruled-out Dead-end:** Dùng thẳng file delivery để đăng.
- **Verified Golden Path:** Master xong thì xuất thêm bản upload: ffmpeg -c:v libx264 -preset slow -crf 18 -movflags +faststart -c:a copy (384MB), rồi chạy lại qa-video.mjs trên bản đó.

### [LESSON-21] (2026-11-18)
- **Symptom:** ffmpeg tremolo báo 'Value 0.08 out of range [0.1 - 20000]' khi làm nhịp sóng biển chậm cho nhạc nền.
- **Ruled-out Dead-end:** Dùng tremolo cho nhịp chậm hơn 0.1 Hz.
- **Verified Golden Path:** Dùng volume='a+b*sin(2*PI*t/T)':eval=frame (T giây/chu kỳ, vd 12s cho sóng). Bed tự sinh: loudnorm -25 rồi sidechaincompress threshold 0.03 ratio 3.5 release 800 → ~-33 LUFS dưới giọng.

### [LESSON-22] (2026-11-18)
- **Symptom:** Đặt hình cho từng câu thoại mà không cần Whisper căn chữ.
- **Ruled-out Dead-end:** Tạo giọng cả đoạn dài rồi căn bằng ASR (dễ lệch, tốn thời gian).
- **Verified Golden Path:** Tạo giọng TỪNG CÂU (scripts/tts-project.mjs, cache theo hash), ghép bằng NumPy theo timeline.json: biết chính xác start/dur mỗi câu → mỗi câu một cảnh, phụ đề chia theo tỉ lệ ký tự. Kiểm tra lại bằng faster-whisper vài câu.

### [LESSON-23] (2026-11-19)
- **Symptom:** Playwright MCP: browser_run_code_unsafe không có require/fs/import (sandbox), tham số filename bị chặn ngoài thư mục MCP; ảnh lấy từ trang Gemini chỉ 1024x572.
- **Ruled-out Dead-end:** Ghi file bằng fs trong code MCP; đọc ảnh bằng canvas/dataURL từ thẻ img.
- **Verified Golden Path:** Lưu bằng API phía server: download.saveAs(path) sau khi bấm 'Tải hình ảnh có kích thước đầy đủ xuống' (ra 2752x1536), hoặc page.screenshot({path}). Truyền code inline. Lệnh chạy cả lô bị Cursor báo timeout nhưng vòng lặp trong trình duyệt vẫn chạy — theo dõi file trên đĩa.

### [LESSON-24] (2026-11-19)
- **Symptom:** Render lỗi 'HtmlInCanvas: width must be a positive integer. Received: 110.8' khi dùng Person s=0.42.
- **Ruled-out Dead-end:** Truyền kích thước lẻ (w*scale) thẳng vào PaperLayer/HtmlInCanvas.
- **Verified Golden Path:** Làm tròn trong Cut (Math.ceil(w) + PAD*2) — đã sửa trong remotion/src/eilean/kit.tsx, mọi scale đều dùng được.

### [LESSON-25] (2026-11-19)
- **Symptom:** PowerShell làm hỏng chuỗi filter ffmpeg: '$k:normalize' bị hiểu là biến có scope, 'adelay=$ms|$ms' cũng dễ vỡ; lệnh lỗi giữa chừng còn xoá luôn file render chưa ghép tiếng.
- **Ruled-out Dead-end:** Ghép filter_complex dài bằng chuỗi PowerShell nội suy rồi Remove-Item ngay trong cùng một dòng lệnh.
- **Verified Golden Path:** Viết bước âm thanh thành script Node (scripts/mux-assembly-audio.mjs) truyền mảng args cho ffmpeg; chỉ xoá file tạm sau khi bước sau đã thành công.

### [LESSON-26] (2026-11-19)
- **Symptom:** Ghep 6+ manh Gemini tao rieng le -> lech anh sang, ty le, bang mau; cat nen trang hong vi Gemini ve 'tam the giay' co bong xam quanh vat (khong phai nen trang thuan)
- **Ruled-out Dead-end:** Tao tung layer o new chat roi cat nen trang bang nguong mau; ky vong layer tu ghep khop nhau
- **Verified Golden Path:** Trong 1 chat: tao khung master H00 + tam nen P1 (troi/bien trong). Can chinh P1 vao H00 bang cv2.findTransformECC (dat 0.995 = cung camera). Mask = |H00 - P1| > 38 (blur 21, close 25, lay thanh phan lon nhat, lap lo) -> dao+bot; tach toa nha theo hop do do, bot = L>175 trong mask, song truoc = dai duoi bien song. Ghep lai sai so 2.66/255 so voi H00 => lap rap dung y khung da duyet. Code: remotion/src/eilean/DirectorOpening.tsx

### [LESSON-27] (2026-11-19)
- **Symptom:** Cat lop Gemini tu nen trang/khung chinh kho va ban (Gemini ve tam the giay co bong xam; tach bang hieu anh phai do hop tay)
- **Ruled-out Dead-end:** Nen trang + cutout_white.py; tach lop bang GrabCut/hieu anh tu khung master
- **Verified Golden Path:** Tao tung lop trong CUNG chat voi khung master, nen chroma-key xanh #00FF00 phang (prompt trong projects/eilean-mor/director/layers_greenscreen.json), roi python tools/image/chroma_key.py (key theo hue+saturation+G troi hon R,B, despill chi o vien nen co reu xanh dam van giu). Ket qua Eilean: 3 lop key sach, khop khung master ECC 0.94-0.99, lech <=5px, ghep thang khong can can chinh. Luu y MCP: browser_run_code_unsafe filename khong doc duoc file trong repo, va window.__job mat sau page.goto -> dan code inline kem job.

### [LESSON-28] (2026-11-19)
- **Symptom:** Lop Gemini bi ve trong khung tranh giay xe (passe-partout) va lan sang cac anh sau cung chat
- **Ruled-out Dead-end:** Chi them 'flat green background' - Gemini van bat chuoc khung cua anh truoc trong thread
- **Verified Golden Path:** Moi prompt lop them doan FULL-BLEED: 'no picture frame, no torn paper border, no mat/passe-partout, no wall, no vignette; ignore the framed images N-M, use ONLY image 1 as reference' + 'green right up to all four edges'. Kiem tra alpha 4 mep sau khi key (F3-F5 = 0). Ket qua: 5 lop full-man, khop master ECC 0.95-0.99, lech <=2px.

### [LESSON-29] (2026-11-19)
- **Symptom:** Lớp phông xanh bị lặp chi tiết (chủ thể dính vào mọi lớp khiến khi lắp ráp bị nhân đôi, trôi lơ lửng); cắt phông xanh sót viền
- **Ruled-out Dead-end:** Tin tưởng ảnh AI tự bóc tách mà không soi từng khung hình; dịch chuyển vị trí (translateY) khi các lớp còn dính chi tiết của nhau
- **Verified Golden Path:** 1) Kiểm tra từng ảnh layer: mỗi lớp CHỈ chứa đúng 1 thành phần duy nhất, không lặp lại; 2) Bóc tách bằng bounding box/mask chính xác từ khung master khi Gemini vẽ dính; 3) Khử sạch phông xanh 100% không còn hạt rác; 4) Giữ nguyên hệ tọa độ gốc chuẩn từng pixel.

### [LESSON-30] (2026-11-19)
- **Symptom:** Lõi transistor bị lặp lại ở các layer 5, 6, 7 khiến khi ráp video chi tiết bị nhân đôi bay lơ lửng trên trời và rác phông xanh chưa lọc sạch
- **Ruled-out Dead-end:** Để AI tự vẽ các lớp phụ mà không cô lập triệt để làm AI vẽ kèm lõi transistor vào mọi lớp
- **Verified Golden Path:** Bóc tách cô lập 100% từng linh kiện: L2 chỉ có bệ trống rỗng, L3 chỉ có dây cáp, L4 chỉ có bóng đèn, L5 chỉ có lõi; lọc sạch tuyệt đối rác phông xanh y < 450 trước khi lắp ráp

### [LESSON-31] (2026-11-19)
- **Symptom:** Dùng cắt hộp chữ nhật (bounding-box hard crop) và chỉ kiểm tra số liệu pixel bằng code mà không mở ảnh PNG xem bằng mắt khiến bóng đèn bị cắt cụt một nửa, dây bị đứt ngang, bóng đổ xanh đen dưới đế chưa được xóa và glow đặt lệch vị trí
- **Ruled-out Dead-end:** Viết script Python cắt cứng tọa độ hộp và chỉ in thống kê số pixel mà không dùng read_file xem trực tiếp từng ảnh layer và từng frame video
- **Verified Golden Path:** Phải dùng read_file xem trực tiếp bằng mắt từng layer PNG sau khi tách nền và từng frame 00s..11s của video; khử cả vùng bóng đổ xanh đậm (dark green shadow trên nền xanh), khử watermark Gemini, không cắt hộp đè lên linh kiện

### [LESSON-32] (2026-11-20)
- **Symptom:** ReferenceError React is not defined khi render Remotion
- **Ruled-out Dead-end:** Bỏ qua import React ở các component TSX phụ
- **Verified Golden Path:** Bổ sung import React from 'react' ở đầu mọi file TSX dùng JSX runtime, kiểm tra npx tsc --noEmit exit 0 trước khi render

### [LESSON-33] (2026-11-20)
- **Symptom:** Explainer shots: nhan giay dat y>900 de len thanh phu de (bottom 26px, cao ~60px) - chi thay khi xem frame that
- **Ruled-out Dead-end:** Can toa do bang mat trong code, khong render still
- **Verified Golden Path:** Giu dai an toan y>=900 cho phu de; render 1 still cuoi moi cau (frame = start+dur-0.2) bang remotion still --props timeline that, xem tung anh truoc khi render phim (LESSON-31)

### [LESSON-34] (2026-11-20)
- **Symptom:** Dang nhap Google trong Chrome do Playwright mo (launchPersistentContext / MCP) bi chan: 'Couldn't sign in - This browser or app may not be secure'
- **Ruled-out Dead-end:** Mo Chrome bang chromium.launchPersistentContext(channel chrome) roi bao chu nhan dang nhap
- **Verified Golden Path:** Mo Chrome THUONG voi --user-data-dir=tools/gemini-alt/chrome-profile --remote-debugging-port=9333, chu nhan dang nhap tay, script noi vao bang chromium.connectOverCDP (tools/gemini-alt/run-thread.mjs). Dung khi trinh duyet MCP dang ban hoac can tai khoan Google khac

### [LESSON-35] (2026-11-20)
- **Symptom:** Asset Gemini 1:1 ra 2048x2048 va KHONG theo dung so lieu prompt (banh xe 5 nan thay vi 8; tam xoay lech voi kim dong ho)
- **Ruled-out Dead-end:** Gia dinh asset dung tam (512,512) va dung so nan nhu script
- **Verified Golden Path:** Do tung asset bang OpenCV truoc khi dung (bbox, HoughCircles cho hoc banh/xe, mau theo vong tron cho goc nan, alpha cho tam kim); sua kich ban theo asset (doi 8 nan->5 nan, 72/60/-12 do) roi tao lai giong cau do; xuat 1024px vao remotion/public/<slug>/a

### [LESSON-36] (2026-11-20)
- **Symptom:** English voiceover needed (international channel); hyperframes tts fails 'kokoro-onnx not installed'; OmniVoice ref voices are Vietnamese only
- **Ruled-out Dead-end:** Waiting for ElevenLabs key, or using a Vietnamese OmniVoice ref for English
- **Verified Golden Path:** pip install kokoro-onnx soundfile -> scripts/tts_kokoro.py projects/<slug> (voice am_michael, models in ~/.cache/hyperframes/tts). Hash must match tts-project.mjs: JS prints speed 1.0 as '1'. Then tts-project.mjs --build makes timeline.json

### [LESSON-37] (2026-11-20)
- **Symptom:** Gemini quota hit mid-job (~14-30 images per account); a new account must keep the same mascot/style
- **Ruled-out Dead-end:** Substituting SVG drawings for the missing assets (owner wants the Gemini images); recreating the mascot from text only in a new account
- **Verified Golden Path:** Run 2+ Chromes with separate profiles + ports (tools/gemini-alt/chrome-profile-N, --remote-debugging-port=933N), owner signs in, GEMINI_PORT=933N node tools/gemini-alt/run-thread.mjs job.json; job.refs=[ref_mascot.png] is pasted into the FIRST message of the new chat -> same mascot. Order the job: hero/thumbnail images first. Rebuild job.json in Python (PowerShell ConvertTo-Json breaks nested arrays)
### [LESSON-38] (2026-11-20)
- **Symptom:** Remotion render fails once with only '[Tab N, react-dom-client.production.js:1141]' lines, exit 1
- **Ruled-out Dead-end:** Piping render output through Select -Last N hides the real error
- **Verified Golden Path:** Redirect the full log to a file (*> out/x.log) and re-run; a second identical run passed (transient). Also: qa --expect must use the exact total (timeline total + tail + ~0.05), not a rounded number
