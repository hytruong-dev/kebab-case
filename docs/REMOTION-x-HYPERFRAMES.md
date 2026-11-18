# Remotion × HyperFrames — paper-cut pipeline

Sources studied: remotion-dev/remotion (repo), remotion.dev/docs, heygen-com/hyperframes (repo),
hyperframes.heygen.com/guides/avatar-presenter. Versions installed: Remotion **4.0.544**, HyperFrames CLI **0.9.65**.

## 1. How the two engines think

| | Remotion | HyperFrames |
| --- | --- | --- |
| Authoring | React components | Plain HTML + CSS + GSAP (or Lottie, WAAPI, anime.js, Three.js) |
| Time model | Every frame is a pure function of `useCurrentFrame()` | The renderer pauses a timeline and **seeks** it to each frame |
| Units | Frames (`interpolate(frame, [0, 30], …)`) | Seconds (`data-start`, `data-duration`, `tl.to(…, 2.4)`) |
| Banned | CSS transitions/animations, wall clocks | `Date.now()`, unseeded `Math.random`, `repeat: -1`, tweening `display`/`visibility` on a `.clip` |
| Strength | Pixel effects (WebGL2/WebGPU), shader transitions, typed props, shapes/paths/noise | ~450 ready blocks, audio mixing, agent-friendly HTML, Studio editing, captions, HeyGen media |
| License | Remotion License (free ≤ 3 people) | Apache 2.0 |

## 2. Split of the work in this project

```
shared/palette.json ──► remotion/src/paper/palette.ts      (import)
                   └──► hyperframes/assets/palette.css      (scripts/sync-palette.mjs)

remotion/  ── renders PLATES ──► hyperframes/assets/plates/  (scripts/build-plates.mjs)
  PaperLandscape(.mp4)       layered paper world, parallax, stop-motion "on twos"
  PaperLandscapeDusk(.mp4)   same world re-lit
  PaperConfetti(.webm)       VP9 + alpha overlay
  *-last.png / *-first.png   exact boundary frames used as tear slots

hyperframes/ ── ASSEMBLES the film ──► out/paper-cut-film.mp4
  paper-collage-reveal  → torn scraps lift off the opening plate
  torn-paper-rip        → day sheet torn away onto dusk (Remotion frames in its slots)
  alpha confetti        → Remotion WebM layered as a <video>
  hw-scribble-transition→ marker scribble covers the cut
  stop-motion-cadence + hw-title on a kraft board → outro
  grain + SFX mix       → finish
```

Rule of thumb: **Remotion for what happens to pixels inside a shot, HyperFrames for the film around the shots**
(edit, joins, overlays, titles, captions, audio, avatars).

## 3. Commands

```bash
npm run palette          # shared palette -> CSS
npm run plates           # Remotion renders every plate into hyperframes/assets/plates
npm run hf:check         # lint + runtime + layout + contrast + audio gate
npm run hf:preview       # HyperFrames Studio preview
npm run hf:render        # -> out/paper-cut-film.mp4
npm run build            # all of the above
npm run remotion:studio  # Remotion Studio (plates + galleries)
```

Windows note: the workspace path contains a space; `build-plates.mjs` runs Remotion through
`node remotion-cli.js` without a shell so the path stays one argument. In `hyperframes/`, call the CLI as
`npx --yes hyperframes@0.9.65 …` (the local package.json is named `hyperframes` and shadows a bare `npx hyperframes`).

## 4. Remotion: every animation/effect primitive

**Core animation** (`remotion`): `useCurrentFrame`, `useVideoConfig`, `interpolate` (+ `easing`, `posterize`,
`extrapolateLeft/Right`), `interpolateColors`, `spring` (damping/stiffness/mass), `Easing.*`, `random(seed)`,
`Sequence`, `Series`, `Loop`, `Freeze`, `AbsoluteFill`, `Solid`, `Img`, `CanvasImage`, `HtmlInCanvas`,
`createEffect` (2d / webgl2 / webgpu custom effects), `Interactive.*` (Studio-editable markup).

**@remotion/effects — 91 effects** (live gallery: composition `EffectsGallery`, `out/remotion-effects-gallery.mp4`;
90 tiles — `lut` needs a `.cube` file. `scripts/audit-effects-gallery.mjs` checks every tile renders and isn't blank.
Colour effects called with `{}` use identity defaults, so their tiles look like the source until you set params):

- Paper-cut core: `paper`, `roughenEdges`, `tear`, `pageTurn`*, `dropShadow`, `longShadows`, `bevelAlpha`, `emboss`, `shrinkwrap`, `burlap`, `flannel`
- Colour: `brightness`, `contrast`, `colorCorrection`, `colorKey`, `curves`, `duotone`, `exposure`, `grayscale`, `hue`, `invert`, `levels`, `linearGradient`, `linearGradientTint`, `lut`, `saturation`, `shadowsHighlights`, `thermalVision`, `tint`, `vibrance`, `whiteBalance`
- Blur: `blur`, `lensBlur`, `linearProgressiveBlur`, `radialProgressiveBlur`, `regionBlur`, `zoomBlur`, `lightTrail`
- Light: `glow`, `lightLeak`, `shine`, `starburst`, `vignette`, `lightning`
- Distort: `barrelDistortion`, `chromaticAberration`, `cornerPin`, `fisheye`, `magnify`, `mirror`, `noiseDisplacement`, `scale`, `skew`, `tile`, `xyTranslate`, `uvTranslate`, `turbulentDisplace`, `wave`, `shatter`
- Texture: `checkerboard`, `contourLines`, `dotGrid`, `fractalNoise`, `gridlines`, `halftone`, `halftoneLinearGradient`, `lines`, `liquidContours`, `noise`, `pattern`, `rings`, `scanlines`, `speckle`, `tvSignalOff`, `waves`, `whiteNoise`, `zigzag`
- Edge: `outline`
- Reveal (progress 0→1): `evolve`, `filmBurn`, `irisWipe`, `linearProgressivePixelate`, `pixelate`, `pixelDissolve`, `radialProgressivePixelate`, `radialWipe`, `venetianBlinds`
- 3D*: `cylinder`, `sphere` — Weather: `rainFall`, `snowFall`

\* WebGPU. Everything else is WebGL2. `remotion.config.ts` sets `Config.setChromiumOpenGlRenderer("angle")` —
verified on this machine: WebGL2, WebGPU and HTML-in-canvas all render headless.

Gotchas found while building: `paper()` **multiplies** the source colour (keep its tones near white to keep the
palette); `paper`/`roughenEdges` validate `seed ≤ 1000`; effects arrays should be inline and stable for Studio.

**@remotion/transitions — 21 presentations** (gallery: `TransitionsGallery`, `out/remotion-transitions-gallery.mp4`):
`fade`, `slide`, `wipe`, `flip`, `cube`, `clockWipe`, `iris`, `none`, `pushCut`, `bookFlip`, `blurSlide`,
`dissolve`, `filmBurn`, `crosswarp`, `crossZoom`, `dreamyZoom`, `linearBlur`, `ripple`, `swap`, `zoomBlur`,
`zoomInOut` + timings `linearTiming`, `springTiming`; `TransitionSeries.Transition` (overlaps scenes, shortens
the total) vs `TransitionSeries.Overlay` (on the cut, keeps length).

**Other installed packages**: `@remotion/shapes` (Circle, Ellipse, Rect, Triangle, Star, Polygon, Pie, Heart, Arrow,
Callout, Spark — all accept `effects`), `@remotion/paths` (`evolvePath`, `getPointAtLength`, `getTangentAtLength`,
`interpolatePath`, `warpPath`…), `@remotion/noise` (`noise2D/3D/4D`), `@remotion/motion-blur` (`Trail`,
`CameraMotionBlur`, `HtmlInCanvasMotionBlur`), `@remotion/light-leaks`, `@remotion/rough-notation` (Highlight,
Underline, Circle, Box, Bracket, StrikeThrough, CrossedOff), `@remotion/starburst`, `@remotion/gsap`
(`useGsapTimeline` — a GSAP timeline seeked by the Remotion frame), `@remotion/animation-utils`,
`@remotion/layout-utils` (`fitText`, `measureText`), `@remotion/captions`, `@remotion/lottie`,
`@remotion/google-fonts` (Baloo 2 with the Vietnamese subset is used for titles), `@remotion/sfx`, `@remotion/media`.

**Remotion Elements** (install with `npx remotion elements use <url> --composition <id> --yes`): Peel, Shine, Tear
apart, Paper Texture, Notebook Paper, Polaroid Pictures, Circle Marker, Text Marker, Crossed Off, Strike Through,
captions (Basic, Rounded, Moving Pill, Popping Word, Word Highlight), charts, maps, lower thirds, YouTube cards.

## 5. HyperFrames: every animation/effect primitive

**Contract** (from the skill): `class="clip"` + `data-start` + `data-duration` on every timed element; one paused
GSAP timeline per composition registered as `window.__timelines["<id>"]`; `fromTo` not `from` in scenes; scene files
wrap everything in `<template>` and style `#root`; host id = scene id = timeline key.

**Motion craft** (measured from HyperFrames' launch films): fast moves 0.3–0.6 s with 6–12 px blur; arrivals on
`expo.out`/`power4.out`, camera moves `power2.inOut`, exits `power3.in` and 40–50 % shorter; overlap 30–50 %;
stagger letters 1 frame, words 60–120 ms, list items 40–80 ms; titles land then hold dead still; 3–5 transition
kinds per film, each caused by something on screen (zoom through, object becomes the world, morph, carry across,
colour flood, whip, iris from click, dip cut, blur swap). Render-time motion blur: `data-motion-blur="on"`.

**Registry — 448 items** (210 blocks, 238 components), all installed as source in `hf-library/`, indexed in
[`hyperframes-catalog.md`](hyperframes-catalog.md). Paper-cut-relevant: `torn-paper-rip`, `paper-collage-reveal`,
`stop-motion-cadence`, `ink-bleed-reveal`, `freeze-frame-dressing`, `hw-*` (boil, title, write-title, path-text,
arrow, box-label, callout-circle, underline, scribble-transition, frame, pipeline, text-cloud),
`marker-checklist-card`, `stitched-text-draw`, `grain-overlay`, `yt-lcd-background`.

**Shader transitions**: `@hyperframes/shader-transitions` (e.g. `flash-through-white`). **Other runtimes**: CSS
keyframes (finite), WAAPI, Lottie/dotLottie, anime.js v4, Three.js/WebGPU/canvas via the `hf-seek` event.

## 6. Avatar presenter (HeyGen)

From the avatar-presenter guide: a HeyGen avatar reads the script on camera; HyperFrames builds scenes, captions and
music around it. Needs a HeyGen account (`heygen auth login --oauth` for the HeyGen CLI, or an API key in the Studio
app) and uses HeyGen credits. Media goes through `/media-use`:
`npx hyperframes media-use resolve --type video --intent "<presenter + script>" --project hyperframes` lands the clip
in `assets/`; `npx hyperframes remove-background` cuts it out so titles can pass behind; `npx hyperframes transcribe`
gives word timings for captions. For this pipeline the avatar is just another plate on the HyperFrames side —
Remotion paper layers can sit in front of or behind the cut-out presenter. Before sharing: approved words, names and
numbers right, presenter never covers the point of the shot, music under the voice.
