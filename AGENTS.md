# AGENTS.md — paper-cut video pipeline (Remotion × HyperFrames)

Read this first. It applies to any coding agent (Cursor, Antigravity, Claude Code, Codex, …).
Full background: `docs/REMOTION-x-HYPERFRAMES.md`. HyperFrames catalog: `docs/hyperframes-catalog.md`.

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

## Commands (run from the repo root)

```bash
npm run palette          # shared/palette.json -> hyperframes/assets/palette.css
npm run plates           # Remotion renders every plate into hyperframes/assets/plates/
npm run hf:check         # HyperFrames gate: lint + runtime + layout + contrast + audio
npm run hf:preview       # HyperFrames Studio at http://localhost:3002
npm run hf:render        # -> out/paper-cut-film.mp4
npm run build            # all of the above in order
npm run remotion:studio  # Remotion Studio (plates + galleries)
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
5. Only render the final film (`npm run hf:render`) when asked; then confirm with
   `ffprobe out/paper-cut-film.mp4` that duration equals the root `data-duration` (currently 17.4 s).
6. If the effects gallery changed: render it and run `node scripts/audit-effects-gallery.mjs out/remotion-effects-gallery.mp4 1`.

## Where things are

| Need | File |
| --- | --- |
| Paper-cut shot (layers, parallax, title tag) | `remotion/src/paper/PaperLandscape.tsx` |
| Reusable paper sheet (texture + torn edge + shadow) | `remotion/src/paper/PaperLayer.tsx` |
| Alpha overlay example | `remotion/src/paper/PaperConfetti.tsx` |
| Compositions list | `remotion/src/Root.tsx` |
| All 90 effects with params | `remotion/src/gallery/effects-catalog.ts` |
| All 21 transitions | `remotion/src/gallery/TransitionsGallery.tsx` |
| Which plates get rendered | `scripts/build-plates.mjs` (`PLATES`, `STILLS`) |
| Film assembly / timing | `hyperframes/index.html` |
| HyperFrames scenes and blocks | `hyperframes/compositions/` |

## Communication

The owner (Bình) writes in Vietnamese; reply in Vietnamese. Code, comments and commit messages stay in English.
