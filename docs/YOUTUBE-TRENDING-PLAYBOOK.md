# 📈 CurioShift — YouTube Trending & Viral Optimization Playbook

> **Nguồn nghiên cứu chuyên sâu:** Toàn bộ 17 Agent Skills, 6 vai trò Agency và 3 Playbooks từ [`TubeLabHQ/youtube-research-skills`](https://github.com/TubeLabHQ/youtube-research-skills) (đã cài đầy đủ vào `.agents/skills/`, `.claude/skills/` và `docs/youtube-research-skills/`).
> **Áp dụng bắt buộc cho mọi tập video tiếp theo trên kênh `CurioShift` (`@CurioShiftMind`).**

---

## 1. Hệ Sinh Thái 17 Kỹ Năng Nghiên Cứu YouTube (6 Vai Trò Agency)

| Vai trò | Skills đã cài trong `.agents/skills/` | Dùng khi nào trong quy trình sản xuất? |
| :--- | :--- | :--- |
| 🔭 **Niche Scout** | `niche-finder`, `niche-bending`, `niche-watchlist` | Tìm ngách/format mới đang bứt phá, "bẻ ngách" (bend) format thành công sang thị trường/chủ đề mới, theo dõi đối thủ định kỳ. |
| ⚖️ **Validator** | `niche-validator` | Chấm điểm **Market Size / Unsaturated / Profitable** (0–100) trước khi mở series mới (quyết định *Enter / Enter with a twist / Stay out*). |
| 📈 **Trend Analyst** | `trend-report` | Quét các video **Outlier** (đột biến view so với trung bình kênh) trong tháng gần nhất, trích nguyên văn Hook 30s và từ khóa kéo click. |
| 🎬 **Script Analyst** | `script-breakdown` | Mổ xẻ cấu trúc giữ chân của video outlier thành bảng nhịp (beat sheet) và khung kịch bản (script skeleton). |
| 🎨 **Packaging Team** | `title-formulas`, `thumbnail-concepts` | **LUÔN LÀM TIÊU ĐỀ TRƯỚC, THUMBNAIL SAU.** Sinh tiêu đề theo công thức đã chứng minh + thiết kế thumbnail bổ sung góc nhìn mới. |
| 🧭 **Channel Strategist** | `reverse-engineer-niche`, `reverse-engineer-channel`, `roast-channel`, `audit-channel-risk` | Giải mã toàn bộ ngách/đối thủ, chẩn đoán thẳng lỗi kéo tụt view, và **kiểm định rủi ro tắt kiếm tiền / khóa kênh** cho kênh faceless/AI. |
| 💬 **Audience & Ideas** | `comment-mining`, `video-ideation` | Đào bình luận nhiều like nhất để lấy đúng ngôn ngữ/nỗi đau của khán giả + tạo ý tưởng có **SCAMPER Twist**. |
| 💰 **Monetization Team** | `revenue-maxxing`, `sponsorship-prospecting` | Tối ưu 5 tầng doanh thu (AdSense → Sponsors → Buyer Intent → Newsletter → Own Products). |
| 🔌 **Data Layer** | `tubelab-mcp` | Quy tắc gọi TubeLab MCP (`https://public-api.tubelab.net/mcp`), kiểm soát credit, bộ lọc chất lượng & độ mới. |

---

## 2. 7 Nguyên Lý Cốt Lõi Bắt Buộc Áp Dụng Cho Mỗi Tập `CurioShift`

Những quy tắc này phải chạy ở **Bước 0 (Pre-Production Viral Gate)** — *trước khi viết kịch bản và tạo ảnh Gemini* — bất kể đã kết nối TubeLab MCP hay chưa:

### Nguyên lý 1: Đo bằng Tỷ lệ Đột biến (Outlier Ratio), KHÔNG đo bằng View thô
- Một video đạt **50K view** trên kênh trung bình **5K view** (`10× Outlier`) giá trị hơn gấp nhiều lần một video 2M view trên kênh 10M sub.
- Khi nghiên cứu chủ đề/format cho CurioShift (kênh mới), ưu tiên học hỏi các **Outlier trên kênh nhỏ/vừa (< 100K–300K subs)** hoặc kênh mới lập dưới 1 năm — vì thành công đó đến từ **format & packaging**, không phải nhờ độ nổi tiếng có sẵn.
- Quy tắc **3 kênh xác nhận**: Một pattern chỉ được coi là xu hướng thật khi có **≥ 3 video thắng từ 3 kênh khác nhau** (1 video viral chỉ chứng minh ý tưởng, không chứng minh format).

### Nguyên lý 2: Đóng gói Chuẩn CTR — Tiêu đề TRƯỚC, Thumbnail SAU (`title-formulas` + `thumbnail-concepts`)
- **Tiêu đề (Title):**
  - Độ dài cứng **≤ 60 ký tự** để không bị cắt trên điện thoại.
  - Dựng trên **công thức có khe trống `[SLOTS]`** đã được chứng minh (Proven), điền khe trống bằng **điều người xem muốn**, KHÔNG điền thứ người làm tự hào.
  - Phải có **Neo thuật toán (Anchors)** — tên cơ chế/khái niệm/từ khóa quen thuộc (*Procrastination, Dopamine, Overthinking, IQ, Habit Loop, fMRI*) để YouTube biết chính xác phải đề xuất cho tệp khán giả nào.
  - **Không bao giờ hứa điều video không chứng minh được** trong 30 giây đầu.
- **Thumbnail:**
  - Công thức vàng: **`Thumbnail = Góc nhìn mới (Unique Angle) + Vấn đề quen thuộc (Familiar Problem)`**.
  - **Tối đa 3 từ chữ (hoặc 0 chữ)** trên thumbnail — và **TUYỆT ĐỐI KHÔNG lặp lại chữ của tiêu đề**. Thumbnail phải thể hiện phần hình ảnh mà tiêu đề cố tình bỏ trống để tạo khoảng trống tò mò (*curiosity gap*).
  - Bố cục cụ thể tới từng đạo cụ, tư thế, hướng nhìn (tránh mô tả chung chung kiểu "tương phản cao, biểu cảm mạnh"). Với CurioShift: tận dụng mascot tối giản hoặc đồ họa cắt lớp đối lập trên nền `#0F172A` + điểm sáng `#F59E0B` / `#F43F5E`.

### Nguyên lý 3: Kiến trúc Kịch bản Giữ chân 10–20 Nhịp (`script-breakdown`)
- **30 giây đầu (Hook) quyết định sống còn:** Không chào hỏi, không giới thiệu kênh. Phải khớp lập tức với lời hứa của tiêu đề & thumbnail theo chuỗi:
  `Hook (0:00–0:10) → Promise (0:10–0:20) → Stakes (0:20–0:30) → Open Loop`
- **Chu kỳ giữ chân cho video dài 10–11 phút (10–20 beat có nhãn chức năng):**
  Không đặt tên nhịp theo *chủ đề* — hãy kiểm tra mỗi nhịp theo *chức năng giữ người xem*:
  `hook` → `promise` → `stakes` → `open loop` → `proof (nghiên cứu thật)` → **`re-hook`** → `mini-payoff` → **`late re-hook`** → `final payoff` → `bridge / CTA`
- **Luật Late Re-Hook:** Video dài dễ tụt retention ở phút 3–4 và phút 6–7 nếu trả hết đáp án ở mini-payoff đầu tiên. **Bắt buộc đặt tối thiểu 2–3 Re-Hook ở nửa sau video** (mở vòng tò mò mới ngay trước hoặc ngay sau mỗi mini-payoff).

### Nguyên lý 4: Bảo Vệ Kiếm Tiền & Chống Đánh Gậy Nội Dung Lặp (`audit-channel-risk` — SỐNG CÒN VỚI KÊNH AI/FACELESS)
Theo kiểm định chính sách kiếm tiền YouTube trong `audit-channel-risk`:
1. **Chống lặp cấu trúc tiêu đề:** Nếu **> 50% video trên kênh dùng chung một khuôn tiêu đề** (đếm theo *hình dạng/cấu trúc*, không chỉ từ ngữ), YouTube rất dễ xếp vào *repetitive/templated content*!
   - **Giải pháp bắt buộc cho CurioShift:** Xoay vòng ít nhất **4 khuôn tiêu đề khác nhau** trong cùng một Mùa (ví dụ: không để tất cả các tập đều là *"Why Your Brain..."* — phải xen kẽ dạng *How [X] Hijacks...*, *The [Concept] Trap: Why...*, *[Number]-Day [Result] Protocol*, *What Actually Happens When...*).
2. **Chống kịch bản "thay tên đổi họ":** Kịch bản tập mới KHÔNG được theo kiểu chỉ thay tên khái niệm vào cùng một khung câu nói của tập cũ. Mỗi tập phải có ẩn dụ thị giác riêng, nghiên cứu khoa học thực tế riêng, và nhịp kể mới.
3. **Tín hiệu con người thật (Human Authorship Signals):**
   - Phần Giới thiệu kênh (About) & mô tả video nêu rõ nguồn nghiên cứu thực tế (peer-reviewed studies), góc nhìn biên tập riêng.
   - Hình ảnh minh họa riêng biệt từng cảnh (tuân thủ nghiêm `[TASTE-35]` Gemini-only custom assets + chuyển động Remotion 60fps — tuyệt đối không dùng slide ảnh tĩnh lặp lại kiểu "AI slop").
   - Luôn giữ tiêu chuẩn **Content Authenticity** cao (trong TubeLab: `classificationQuality: "neutral"` cho tìm kiếm, `"positive"` cho thumbnail).

### Nguyên lý 5: Biến Tấu Có Chủ Đích Bằng SCAMPER & Đào Bình Luận (`video-ideation` + `comment-mining`)
- Không bao giờ sao chép nguyên xi ý tưởng hay tiêu đề của đối thủ. Dùng **SCAMPER** (*Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse*) hoặc **ghép 2 pattern thắng thành 1 góc nhìn mới** chưa ai quay.
- **Khai thác ngôn ngữ khán giả (`comment-mining`):** Bình luận nhiều like = lá phiếu nhu cầu (1 câu hỏi 900 like = 900 người muốn xem video đó). Ghi lại nguyên văn câu chữ khán giả dùng để đặt vào Hook và Tiêu đề (một chủ đề thật cần xuất hiện ở **≥ 3 video** khác nhau).

### Nguyên lý 6: Thiết Kế Cho Chuỗi Đề Xuất & 5 Tầng Doanh Thu (`revenue-maxxing`)
- **AdSense chỉ là tầng nền** (dù độ dài **10–11 phút** và bản ghép **Mega-Documentary > 1 tiếng** của CurioShift đã tối ưu cực tốt cho mid-roll ads & RPM US/UK).
- **Buyer Intent (Ý định hành động):** Ưu tiên chủ đề hứa hẹn kết quả rõ ràng (*tăng tập trung, bỏ trì hoãn, cai dopamine rẻ tiền, ngủ sâu, xử lý overthinking*) thay vì chỉ kiến thức giải trí thuần túy — giúp dễ bán sản phẩm số (PDF Protocol, Notion Focus System, Newsletter) và hút nhà tài trợ giáo dục (*Brilliant, Ground News, Readwise, Opal*) khi kênh vượt 10K subs.
- **Tránh Off-Audience Hits:** Không làm video lệch tệp khán giả chỉ để câu view ngắn hạn — anchor sai sẽ kéo tệp người xem không xem các tập sau, làm tụt CTR toàn kênh.

### Nguyên lý 7: Trung Thực Dữ Liệu (Data Honesty & Chế Độ Khi Có / Chưa Có TubeLab MCP)
- **Khi đã kết nối TubeLab MCP (`https://public-api.tubelab.net/mcp`):**
  - Mọi chỉ số (view, outlier ratio, ngày đăng, subscriber, hook nguyên văn, link video/kênh) phải lấy trực tiếp từ tool response, trích dẫn link đầy đủ, không bịa số.
  - Luôn đặt cửa sổ thời gian (`publishedAtFrom: "month"` → mở rộng dần `trimester` → `semester` → `year`).
  - Tiết kiệm credit: Dùng lệnh search có phí (2–5 credits) để tìm ứng viên, rồi đào sâu bằng các lệnh read **miễn phí** (`get_channel`, `get_video`, `get_video_transcript`, `get_video_comments`).
  - Fetch tuần tự các phản hồi lớn (transcript, comments) từng video một để tránh ghi đè file tạm.
- **Khi chưa kết nối TubeLab MCP:**
  - AI phải **nói rõ ngay từ đầu** rằng chưa kết nối TubeLab MCP (nêu rõ phần dữ liệu nào không có như *outlier ratio toàn sàn, RPM band, lost-ads/terminated channels*), ghi `"not available"` cho số liệu thiếu và **không bao giờ bịa số liệu**.
  - Vẫn áp dụng **100% các nguyên lý đóng gói, kiến trúc hook/beat, chống lặp tiêu đề, SCAMPER, và thẩm định thumbnail** cho tập phim!

---

## 3. Cách Kết Nối TubeLab MCP (Tùy Chọn — Để Mở Khóa Dữ Liệu Outlier Thời Gian Thực)

File `.mcp.json` đã được thêm sẵn tại gốc dự án với endpoint chuẩn:
```json
{
  "mcpServers": {
    "tubelab": {
      "type": "http",
      "url": "https://public-api.tubelab.net/mcp"
    }
  }
}
```
- **Claude Code:** Tự nhận từ `.mcp.json` (lần gọi đầu sẽ mở OAuth đăng nhập tài khoản TubeLab) hoặc chạy `claude mcp add --transport http tubelab https://public-api.tubelab.net/mcp`.
- **Cursor / Antigravity / IDE khác:** Thêm MCP Server HTTP `https://public-api.tubelab.net/mcp` kèm header `Authorization: Bearer <TUBELAB_API_KEY>` (gói Pro) hoặc OAuth theo hướng dẫn tại https://tubelab.net/docs/api/mcp-server.

---

## 4. Checklist Bắt Buộc Trước Khi Bấm Sản Xuất Mỗi Tập Mới (Pre-Production Viral Gate)

Trước khi viết `script.json` hoặc tạo ảnh Gemini cho tập tiếp theo của **CurioShift**:
1. [ ] **Chọn góc & Twist:** Ý tưởng có rõ *Unique Angle* + *Familiar Problem* + *SCAMPER Twist* (không sao chép nguyên xi)?
2. [ ] **Kiểm tra Tiêu đề (3 phương án A/B/C):** Mỗi tiêu đề **≤ 60 ký tự**, có **Anchor** đúng tệp tâm lý/não bộ, và **khuôn tiêu đề không lặp quá 50%** so với các tập trước?
3. [ ] **Kiểm tra Thumbnail (T1–T3):** Thiết kế *sau* tiêu đề, **≤ 3 từ chữ (hoặc 0 chữ)**, **không lặp chữ tiêu đề**, thể hiện rõ xung đột/ẩn dụ trực quan ngay ở kích thước nhỏ (`320px`)?
4. [ ] **Kiểm tra Hook 30s & Retention Beats:** 30 giây đầu khớp lời hứa tiêu đề không chào dài; toàn tập 10–11 phút có **10–20 beat có nhãn** (`hook → promise → stakes → open loop → proof → re-hook → mini-payoff → late re-hook → payoff → bridge`)?
5. [ ] **Kiểm tra Rủi ro Kiếm tiền (`audit-channel-risk`):** Kịch bản có nghiên cứu thật riêng biệt (không "thay tên đổi họ"), tài nguyên hình ảnh mới (`TASTE-35`), mô tả ghi nguồn đầy đủ?

---

## 5. Áp Dụng TubeLab MCP & Tối Ưu Cho Video YouTube Shorts (9:16 · 60fps)

Mọi video **YouTube Shorts** của `CurioShift` cũng **BẮT BUỘC** áp dụng quy trình nghiên cứu từ **TubeLab MCP** + các skill trong `.agents/skills/` trước khi viết kịch bản và render (`BrainShort.tsx` / `scripts/brain/render-short.mjs`):

### 5.1. Bộ lọc TubeLab MCP dành riêng cho Shorts (theo `skills/tubelab-mcp/SKILL.md`)
- **Tìm Shorts đột biến (Outliers):** gọi `search_outliers` với **`type: "short"`**, **`publishedAtFrom: "month"`** (hoặc `"trimester"`), **`classificationQuality: "neutral"`** và **`subscribersCountTo: 300000`** để soi các Short thắng nhờ format chứ không nhờ kênh lớn.
- **Tìm kênh Shorts bứt phá:** gọi `search_channels` **bắt buộc ghép cặp `contentKind: "short-form"` + `filterBy: "short"`** để các bộ lọc view/ratio đọc đúng chỉ số Shorts (lưu ý: ước tính kiếm tiền trên kênh chỉ làm Shorts kém chính xác hơn video dài).
- **Giải mã kênh đối thủ miễn phí:** gọi `get_channel_shorts` (miễn phí, trả về mẫu Shorts kèm cờ outlier) để phân tích các tập Shorts thắng nhất của kênh mẫu (như `@IfverseTales`).
- **Đọc Hook 3 giây & Bình luận miễn phí:** cắt bỏ tiền tố `shorts/` để lấy đúng **Video ID 11 ký tự**, sau đó gọi `get_video_transcript` (chỉ đọc 10–15 giây đầu để lấy Hook nguyên văn) và `get_video_comments` để lấy đúng câu hỏi khán giả hay hỏi nhất làm Hook/Pinned Comment.

### 5.2. Chuẩn dựng hình Shorts `CurioShift` (học từ `@IfverseTales` + `PLAN_owner.md` mục 6)
1. **Khung hình & Độ dài vàng:** `1080×1920` (9:16), `60 fps`, thời lượng tối ưu **30–45 giây**, chuyển cảnh nhanh **2,5–3,8 giây/nhịp**, giọng Kokoro `am_michael` tốc độ `1.10–1.15x`, master `-14 LUFS / TP -1.5 dBTP` (`node scripts/qa-video.mjs <file> --kind shorts`).
2. **Thanh trạng thái leo thang ở đỉnh (Top Escalating Status Pill):** đặt ở `y ≈ 145px` (ví dụ `LABEL: ~~LAZY~~`, `AMYGDALA • THREAT 100%`, `TRICK #1 • 5-MIN RULE`) để giữ mắt người xem ngay trong 0,5 giây đầu.
3. **Phụ đề ALL-CAPS 2 màu + Vùng an toàn (Safe Zone):** đặt gọn ở `y = 1320..1490`, **chừa trống 20% đáy (`y > 1536`)** và **15% cạnh phải (`x > 915`)** khỏi nút UI YouTube; watermark `@CurioShiftMind` nhỏ gọn ở mép trái phía trên phụ đề (`y ≈ 1265`).
4. **Phễu kéo về Video dài (Related Video Funnel):** 3–4 giây cuối hiện nút vàng `FULL VIDEO ON THE CHANNEL ↓` + ghim liên kết **Video liên quan (Related Video)** về đúng tập dài tương ứng trên YouTube Studio.
5. **Trung thực dữ liệu khi chưa kết nối TubeLab MCP:** nếu Antigravity chưa kết nối MCP `tubelab`, báo rõ ngay từ đầu (các số outlier ratio/RPM/ad-status ghi `not available`), dùng Playwright MCP quan sát trực tiếp kênh mẫu và vẫn áp dụng trọn bộ chuẩn dựng hình & packaging bên trên.

