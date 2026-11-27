# AGENTS.md — paper-cut video pipeline (Remotion × HyperFrames)

Read this first. It applies to any coding agent (Cursor, Antigravity, Claude Code, Codex, …).
Full background: `docs/REMOTION-x-HYPERFRAMES.md`. HyperFrames catalog: `docs/hyperframes-catalog.md`.

## 0. MEMORY PROTOCOL — mandatory at the start of every session (zero-retraining handover)

This project has a self-evolving portable memory (ported from `C:\QuangHy\youtube_ai_edit-02`). Before answering any
video request or writing any code, read in order:

1. `.agent_memory/director_taste.md` — the owner's taste rules `[TASTE-xx]`. Follow them; never ask again about anything written there.
   They override framework defaults (HyperFrames/Remotion skills) when they disagree.
2. `.agent_memory/lessons_learned.md` — verified fixes `[LESSON-xx]`. Use the golden path; never retry a ruled-out dead-end.
3. `.agent_memory/visual_metaphor_dictionary.json` and `.agents/skills/learned/` — approved visual patterns and packaged skills.
4. The last 2 entries of `.agent_memory/production_log.md`.
5. `docs/HANDOVER-TRAINING-2026-11-19.md` — how the owner trained the agent from the rejected "22 cluttered pieces" to the
 approved diorama pipeline; any paper-cut scene with AI images follows `.agents/skills/learned/diorama-layer-pipeline/`
 (workflow `.agent/workflows/lam-canh-diorama.md`).

Then run `node scripts/memory.mjs sync` and open your reply with the line it prints:
*"🧠 [Memory Synced] Đã đồng bộ bộ nhớ dự án (N quy tắc đạo diễn, M bài học kỹ thuật, …). Sẵn sàng sản xuất video tiếp theo theo đúng chuẩn của bạn!"*

### Continuous learning duty (skill: `.agents/skills/core/self-learning-harvester/SKILL.md`)
- Whenever the owner gives feedback (speed, layout, colour, "đẹp", "giữ", "đừng"), record it with
  `node scripts/memory.mjs add-taste|add-pattern …` **in that same reply, before re-rendering** (workflow `.agent/workflows/gop-y.md`).
- Whenever you fix a real bug, record it with `node scripts/memory.mjs add-lesson "symptom" "dead-end" "golden path"`.
- After every finished MP4, run **/retro**: `node scripts/memory.mjs retro <slug>` → fill `projects/<slug>/RETRO.md` →
  `log-video` + the `add-*` commands it lists; package a technique reused ≥ 2 times into `.agents/skills/learned/<name>/`.

### ⭐ Main production line — Brain & Psychology channel (`CurioShift` · `@CurioShiftMind`, approved "perfect", EP01, 2026-11-20)
When the owner gives an episode doc / topic for the channel (English, international, flat-vector navy explainer with the mascot):
follow `.agents/skills/learned/brain-explainer-episode/SKILL.md` (workflow `.agent/workflows/lam-tap-brain.md`).
Reference episode: `projects/brain-procrastination-ep01/` (channel plan `PLAN_owner.md`, `script.json`, `brain.json`, `SEO.md`),
brand kit `projects/curioshift-brand/` (`BRAND.md`, logo, banner, watermark),
code `remotion/src/brain/` (kit, icons, iconsImg, `epNN/shots.tsx`, `BrainEpisode.tsx`), scripts `scripts/brain/`.

### 📈 Mandatory YouTube Trending & Viral Optimization (`TubeLabHQ/youtube-research-skills` — Long-form AND Shorts)
Before scripting or generating assets for **ANY** new episode **or YouTube Short**, apply `docs/YOUTUBE-TRENDING-PLAYBOOK.md` (synthesized from the 17 installed skills in `.agents/skills/` and playbooks in `docs/youtube-research-skills/`):
- **Packaging first (Title BEFORE Thumbnail):** Titles ≤ 60 chars on proven formulas with audience anchors; rotate ≥ 4 distinct title shapes across a season (< 50% same shape to prevent repetitive-content demonetization risk per `audit-channel-risk`).
- **Thumbnail = Unique Angle + Familiar Problem:** ≤ 3 words (or 0 words), NEVER repeat words from the title — show what the title leaves out.
- **Retention script beats (`script-breakdown`):** First 30 s must deliver `Hook → Promise → Stakes → Open Loop` verbatim matching the title/thumbnail; 10–11 min episodes carry 10–20 typed beats with ≥ 2 **late re-hooks** in the second half.
- **YouTube Shorts (`9:16` · `BrainShort.tsx`):** Use TubeLab MCP with `type: "short"`, `contentKind: "short-form"` + `filterBy: "short"`, and `get_channel_shorts` (bare 11-char ID for transcripts/comments); build 30–45 s fast-cut Shorts (`2.5–3.8 s/beat`) with top escalating status pill, ALL-CAPS 2-color captions inside Safe Zones (clear bottom 20% & right 15%), `@CurioShiftMind` watermark, and Related Video funnel CTA (`docs/YOUTUBE-TRENDING-PLAYBOOK.md` §5).
- **Outliers & SCAMPER twists:** Rank by `averageViewsRatio` on emerging channels (< 100K–300K subs), never raw views; apply SCAMPER twists instead of copying; cite proof links when TubeLab MCP (`.mcp.json`) is connected and state clearly when TubeLab MCP is offline (never invent metrics).

### Making a new video — "làm video mới", "làm video về <chủ đề>" (other styles, e.g. paper-cut)
Follow `.agents/skills/core/video-production/SKILL.md` (Steps 0 → 8 with gates; short form `.agent/workflows/lam-video-moi.md`).
Per-video data lives in `projects/<slug>/` (`BRIEF.md` from `templates/project/`, `RETRO.md`).
⛔ Never publish or schedule anything on YouTube/social by yourself — stop after QA + report and wait for the owner's order.

## What this project is

A paper-cut animation pipeline that uses two video engines together:

- `remotion/` — **Remotion 4.0.544** (React + TypeScript). Renders *plates*: individual paper-cut shots
  and transparent overlays, using `@remotion/effects` (paper, roughenEdges, dropShadow, pageTurn, …),
  `@remotion/shapes`, `@remotion/paths`, `@remotion/noise`, `@remotion/transitions`.
- `hyperframes/` — **HyperFrames 0.9.65** (HTML + GSAP). Assembles the final film: places the plates as
  `<video>` clips and joins them with registry blocks (torn-paper-rip, paper-collage-reveal,
  stop-motion-cadence, hw-title, hw-scribble-transition), grain and audio.
- `shared/palette.json` — the one colour palette for both engines.
- `scripts/` — the bridge (`build-plates.mjs`, `sync-palette.mjs`) and tools.
- `hf-library/` — all 448 HyperFrames registry items as reference source (git-ignored; reinstall with
  `npx --yes hyperframes@0.9.65 add <name>`). Copy items from here, don't edit them in place.

Rule of thumb: **Remotion for what happens to pixels inside a shot; HyperFrames for the film around the shots**
(edit, joins, titles, captions, audio, avatar).

## Skills (read the matching one before working)

Project skills live in `.agents/skills/` (mirrored in `.claude/skills/`):

- HyperFrames: `hyperframes` (read first for any video work), `hyperframes-cli`, `hyperframes-registry`,
  `media-use`, `reverse-any-video`, `style-sampling`, `remotion-to-hyperframes`.
- Remotion: `remotion-best-practices` (router), `remotion-markup` (effects, transitions), `remotion-render`,
  `remotion-interactivity`, `remotion-captions`, `remotion-docs`, …
- YouTube Research & Trending (`TubeLabHQ/youtube-research-skills`, `.mcp.json` → `https://public-api.tubelab.net/mcp`):
  `tubelab-mcp`, `niche-finder`, `niche-bending`, `niche-validator`, `niche-watchlist`, `trend-report`,
  `video-ideation`, `script-breakdown`, `title-formulas`, `thumbnail-concepts`, `comment-mining`,
  `reverse-engineer-channel`, `reverse-engineer-niche`, `roast-channel`, `audit-channel-risk`,
  `revenue-maxxing`, `sponsorship-prospecting`. Full playbooks & roles: `docs/youtube-research-skills/` and `docs/YOUTUBE-TRENDING-PLAYBOOK.md`.

## Commands (run from the repo root)

```bash
npm run palette          # shared/palette.json -> hyperframes/assets/palette.css
npm run plates           # Remotion renders every plate into hyperframes/assets/plates/
npm run hf:check         # HyperFrames gate: lint + runtime + layout + contrast + audio
npm run hf:preview       # HyperFrames Studio at http://localhost:3002
npm run hf:render        # -> out/paper-cut-film.mp4
npm run master           # 2-pass loudnorm to -14 LUFS / TP -1.5 (video stream copied)
npm run qa               # objective QA gate: duration, size, LUFS, true peak, frozen stretches, silences
npm run build            # all of the above in order
npm run remotion:studio  # Remotion Studio (plates + galleries)
npm run memory           # memory bank status (node scripts/memory.mjs …)
```

On a fresh clone: `cd remotion && npm install`, then `npm run build`. Rendered plates and `out/` are not in git.

## Hard rules (break these and renders go wrong)

1. **Deterministic frames.** Every frame must be a pure function of time.
   - Remotion: drive everything from `useCurrentFrame()`; use `random(seed)` from `remotion`, never
     `Math.random()`; no CSS transitions/animations; no `Date.now()`.
   - HyperFrames: one paused GSAP timeline per composition registered as
     `window.__timelines["<composition-id>"]`; use `fromTo` (not `from`) in scene files; no `Date.now()`,
     no unseeded `Math.random`, no `repeat: -1`, no timers / `requestAnimationFrame` as a clock.
2. **HyperFrames CLI:** inside `hyperframes/` always call `npx --yes hyperframes@0.9.65 <cmd>`.
   A bare `npx hyperframes` fails ("could not determine executable") because the local package.json is
   named `hyperframes`.
3. **Path has a space** (`paper-cut animation`). Never run Remotion through a shell with the path as an
   unquoted argument — it splits and writes files to the wrong folder. `scripts/build-plates.mjs` calls
   `node node_modules/@remotion/cli/remotion-cli.js` via `execFileSync` without a shell; keep it that way.
4. **Colours:** edit only `shared/palette.json`, then `npm run palette`. Don't hard-code new colours.
5. **Remotion effects:** keep `Config.setChromiumOpenGlRenderer("angle")` in `remotion.config.ts`
   (WebGL2/WebGPU effects need it). `paper()` *multiplies* the source colour — keep its tones near white.
   `paper`/`roughenEdges` require `seed` in `[0, 1000]`. Write `effects` arrays inline.
6. **HyperFrames structure:** every timed element has `class="clip"`, `data-start`, `data-duration`; scene
   files put everything inside `<template>` and style `#root`; host id = scene `data-composition-id` =
   timeline key. Slot `<template data-slot=…>` elements go *after* `#root` in `index.html`.
   Asset paths are `assets/...` (no leading `/`).
7. **Alpha plates** are VP9 WebM with `--pixel-format=yuva420p` (ffprobe shows `yuv420p` + `ALPHA_MODE=1`;
   that is correct).
8. **Remotion License:** free for teams of up to 3 people; larger companies need a license.

## Definition of done (verify, don't assume)

After any change:

1. `cd remotion && npx tsc --noEmit` — must exit 0.
2. `npm run plates` if any Remotion plate changed.
3. `npm run hf:check` — `"ok": true`, no errors; weigh warnings.
4. Look at frames: `cd hyperframes && npx --yes hyperframes@0.9.65 snapshot --at <t,…>` and open the PNGs.
5. Only render the final film (`npm run hf:render`) when asked; then `npm run master` and
   `node scripts/qa-video.mjs out/<file>.mp4 --expect <root data-duration>` must print `QA PASS`
   (current film: 17.4 s, -14.2 LUFS, TP -1.5). Extract a few frames from the MP4 and look at them.
6. If the effects gallery changed: render it and run `node scripts/audit-effects-gallery.mjs out/remotion-effects-gallery.mp4 1`.
7. Record what you learned (memory protocol above). A task is not done until new lessons/taste are written.

## Where things are

| Need | File |
| --- | --- |
| ⭐ Brain channel episode (kit, icons, shots per episode) | `remotion/src/brain/` |
| ⭐ Brain channel scripts (TTS, assets, audio, render) | `scripts/brain/` · Gemini runner `tools/gemini-alt/run-thread.mjs` |
| 📈 YouTube Trending Playbook & TubeLab Research Skills | `docs/YOUTUBE-TRENDING-PLAYBOOK.md` · `docs/youtube-research-skills/` · `.mcp.json` |
| 🎨 CurioShift Channel Brand Kit (`@CurioShiftMind`) | `projects/curioshift-brand/` |
| Paper-cut shot (layers, parallax, title tag) | `remotion/src/paper/PaperLandscape.tsx` |
| Reusable paper sheet (texture + torn edge + shadow) | `remotion/src/paper/PaperLayer.tsx` |
| Alpha overlay example | `remotion/src/paper/PaperConfetti.tsx` |
| Compositions list | `remotion/src/Root.tsx` |
| All 90 effects with params | `remotion/src/gallery/effects-catalog.ts` |
| All 21 transitions | `remotion/src/gallery/TransitionsGallery.tsx` |
| Which plates get rendered | `scripts/build-plates.mjs` (`PLATES`, `STILLS`) |
| Film assembly / timing | `hyperframes/index.html` |
| HyperFrames scenes and blocks | `hyperframes/compositions/` |
| Owner's taste / verified fixes / approved patterns / log | `.agent_memory/` |
| Memory tool | `scripts/memory.mjs` |
| QA gate / loudness master | `scripts/qa-video.mjs` / `scripts/master-audio.mjs` |
| Production process / self-learning / packaged skills | `.agents/skills/core/` / `.agents/skills/learned/` |
| Per-video brief + retro | `projects/<slug>/` (templates in `templates/`) |
| Antigravity workflows | `.agent/workflows/` |

## Communication

The owner (Bình) writes in Vietnamese; reply in Vietnamese. Code, comments and commit messages stay in English.
