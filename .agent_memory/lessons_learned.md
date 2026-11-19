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
