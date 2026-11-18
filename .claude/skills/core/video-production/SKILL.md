---
name: video-production
description: Quy trình sản xuất trọn gói một video paper-cut mới (Remotion plates + HyperFrames ghép phim) từ brief tới file MP4 đã QA và gói giao, có cổng kiểm tra từng bước và bước /retro tự học. Dùng khi chủ dự án nói "làm video mới", "làm video về <chủ đề>", "làm tiếp video", "sản xuất video".
---

# Sản xuất 1 video paper-cut (quy trình chuẩn)

Cấu trúc kế thừa từ `youtube_ai_edit-02/.agents/skills/core/episode-production` (Bước 0 → 8, cổng kiểm tra, không hỏi lại điều đã
quy định, dừng trước khi đăng), áp vào pipeline Remotion × HyperFrames của dự án này.

> 📖 Đọc trước: `AGENTS.md` · `.agent_memory/director_taste.md` · `.agent_memory/lessons_learned.md` · `.agents/skills/learned/`.
> 🧩 Mẫu: `remotion/src/paper/PaperLandscape.tsx`, `hyperframes/index.html`, `projects/paper-cut-film/RETRO.md` (video đầu tiên, RETRO điền mẫu).
> ⛔ **Cổng cấm đăng:** không bao giờ tự đăng/lên lịch. Xong Bước 8 → báo cáo → chờ lệnh.
> Không hỏi lại điều đã có trong `director_taste.md`. Chỉ dừng hỏi khi bị chặn thật (thiếu tài khoản HeyGen, thiếu tài sản thương hiệu).

## Bản đồ bước

| Bước | Làm | Cổng (phải đạt mới qua bước sau) |
| --- | --- | --- |
| 0 | `node scripts/memory.mjs sync` · tạo `projects/<slug>/` từ `templates/project/` | Mở đầu trả lời bằng dòng Memory Synced |
| 1 | Viết `projects/<slug>/BRIEF.md` (mục tiêu, khán giả, thời lượng, tỉ lệ khung, giọng/nhạc, cảnh) | Mọi cảnh có 1 câu "người xem thấy gì" |
| 2 | Kịch bản + storyboard trong `BRIEF.md`: mỗi câu thoại = 1 beat hình (TASTE-08/09) | Không beat nào > 15s (Shorts > 7s) |
| 3 | Giọng/nhạc nếu có: `/media-use` (`npx hyperframes tts` cục bộ, hoặc HeyGen khi được phép) → `npx hyperframes transcribe` | Có file âm thanh + mốc từng chữ |
| 4 | Remotion: viết/sửa plate theo skill `learned/paper-cut-layering`; khai báo trong `scripts/build-plates.mjs` | `npx tsc --noEmit` = 0; still giữa mỗi cảnh đã mở xem |
| 5 | `npm run palette` · `npm run plates` | Mọi file plate > 0 byte; alpha kiểm `ALPHA_MODE=1` |
| 6 | HyperFrames: ghép trong `hyperframes/index.html` theo skill `learned/remotion-plate-to-hyperframes`; tìm block bằng `catalog` trước khi tự viết | `npm run hf:check` ok, 0 error |
| 7 | `snapshot --at` giữa mỗi cảnh + sát mỗi điểm nối → XEM → `npm run hf:render` → `master-audio.mjs` → `qa-video.mjs --expect` | **QA PASS** + đã nhìn khung hình thật từ MP4 |
| 8 | /retro: `node scripts/memory.mjs retro <slug>` → điền `RETRO.md` → `log-video` + `add-lesson`/`add-taste`/`add-pattern` → báo cáo | Nhật ký đã ghi; báo cáo có đường dẫn file, thời lượng, LUFS |

## Chi tiết từng bước

### Bước 0 — đồng bộ & khởi tạo
1. `node scripts/memory.mjs sync` → in nguyên dòng đó ở đầu câu trả lời.
2. Slug `kebab-case` không dấu. `Copy-Item templates/project projects/<slug> -Recurse` (hoặc `cp -r`).
3. Đọc mục "Bài học rút ra" của 2 video gần nhất trong `production_log.md`.

### Bước 1-2 — brief, kịch bản, storyboard
- Ưu tiên gu đã ghi; điều chưa có thì chọn mặc định hợp lý và ghi vào brief (không hỏi).
- Mỗi beat: `thời điểm | câu thoại | hình (lớp giấy nào, vật gì, chuyển động gì) | chuyển cảnh | âm thanh`.
- Video có giọng: số đọc bằng chữ, hình/phụ đề hiện số (TASTE-10). Cụm neo beat phải duy nhất trong cảnh (LESSON-14).
- Video dài > 15s kể chuyện: có nhạc nền + SFX trên hành động nhìn thấy (TASTE-13).

### Bước 3 — âm thanh
- Theo skill `/media-use`. Chuẩn hóa từng đoạn giọng về -16 LUFS trước khi ghép (LESSON-12); `aresample=48000` đứng đầu (LESSON-11).
- Lời/thời điểm chốt rồi mới viết storyboard chi tiết (LESSON-14), hoặc chia beat theo câu ngay từ đầu.

### Bước 4-5 — Remotion plates
- Dùng lại `PaperLayer`, `palette.ts`, `ridgePath`, `font.ts`. Không viết lại.
- Hiệu ứng: tra `remotion/src/gallery/effects-catalog.ts` (90 hiệu ứng đã có tham số chạy được) và `TransitionsGallery.tsx`.
- Đổi gì trong Remotion → render lại đúng plate đó (LESSON-09).

### Bước 6 — HyperFrames
- `npx --yes hyperframes@0.9.65 catalog --query "<hành động, tiếng Anh>" --json` trước khi tự viết hiệu ứng; thư viện đầy đủ ở `hf-library/` + `docs/hyperframes-catalog.md`.
- Tuân thủ hợp đồng HyperFrames (AGENTS.md mục Hard rules) và chuyển cảnh có nguyên nhân (TASTE-05/07).

### Bước 7 — render & QA (không bỏ bước nào)
1. `npm run hf:check` → ok.
2. `cd hyperframes && npx --yes hyperframes@0.9.65 snapshot --at <t,…>` → mở PNG từng cái.
3. `npm run hf:render` (đổi tên output theo slug nếu cần).
4. `node scripts/master-audio.mjs out/<file>.mp4` (LESSON-18).
5. `node scripts/qa-video.mjs out/<file>.mp4 --kind clip|long|shorts --expect <data-duration>` → **QA PASS**.
6. Trích 3-4 khung hình từ MP4 cuối (`ffmpeg -ss <t> -i … -frames:v 1`) và nhìn.

### Bước 8 — /retro & báo cáo (DỪNG)
1. `node scripts/memory.mjs retro <slug>` → điền `projects/<slug>/RETRO.md`.
2. Chạy các lệnh ở mục "Thu hoạch" của RETRO: `log-video` (bắt buộc), `add-lesson` cho mỗi lỗi mới đã sửa, `add-taste` cho mỗi góp ý của chủ dự án, `add-pattern` cho cảnh được khen. Kỹ thuật dùng lần 2 → đóng gói vào `.agents/skills/learned/`.
3. Báo cáo: đường dẫn MP4, thời lượng, LUFS/TP, số cảnh, kết quả QA, điều đã học. Hỏi có cần chỉnh/đăng không → **dừng**.

## Checklist "xong"
- [ ] Memory synced ở đầu phiên; brief + storyboard trong `projects/<slug>/BRIEF.md`
- [ ] `tsc` sạch; plates render, alpha đã kiểm
- [ ] `hf:check` ok; snapshot giữa mỗi cảnh + mỗi điểm nối đã xem
- [ ] render → master → `qa-video` PASS; khung hình từ MP4 đã xem
- [ ] RETRO.md + production_log + bài học mới đã ghi; báo cáo và DỪNG
