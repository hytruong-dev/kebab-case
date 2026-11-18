# HyperFrames catalog (448 items)

Install any item into a project: `npx --yes hyperframes@0.9.65 add <name>`. All of them are already installed as editable source in `hf-library/`.

## Transitions (52)

| Name | Type | Description |
| --- | --- | --- |
| `beat-freeze-cut` | block | A beat-driven speed ramp, freeze-frame hit, and hard-cut sequence for music-led promos and montages. |
| `chromatic-radial-split` | block | Shader transition with chromatic aberration radial split |
| `cinematic-zoom` | block | Shader transition with dramatic zoom blur |
| `code-slice-hero` | block | A tiled headline surface flips cell by cell under a sweeping depth field to reveal the rear headline. |
| `cross-warp-morph` | block | Shader transition with cross-warped morphing |
| `domain-warp-dissolve` | block | Shader transition with fractal noise domain warping |
| `editorial-flash-overlay` | block | Finite neutral-warm light layers for a seek-safe camera-flash cut or social reveal |
| `flash-through-white` | block | Shader transition with white flash crossfade |
| `glitch` | block | Shader transition with digital glitch artifacts |
| `gravitational-lens` | block | Shader transition with gravitational lensing distortion |
| `hw-scribble-transition` | block | Overlay transition: scribble bands accumulate to cover the frame with a solid backstop, the host cuts beneath, and the scribble clears |
| `light-leak` | block | Shader transition with cinematic light leak overlay |
| `mk-clone-wall-transition` | block | Overlay transition: a tiled word wall covers the frame, inverts via difference blending, and clears — hard-cut the content beneath while covered |
| `organic-light-leak-overlay` | block | Finite CSS light-leak overlay for memory beats and motivated transitions |
| `ridged-burn` | block | Shader transition with ridged turbulence burn effect |
| `ripple-waves` | block | Shader transition with concentric ripple wave distortion |
| `sdf-iris` | block | Shader transition with signed distance field iris reveal |
| `swirl-vortex` | block | Shader transition with swirling vortex distortion |
| `thermal-distortion` | block | Shader transition with heat haze thermal distortion |
| `transitions-3d` | block | Showcase of 3D perspective flip and rotate transitions |
| `transitions-blur` | block | Showcase of blur-based transitions between scenes |
| `transitions-cover` | block | Showcase of cover/uncover slide transitions |
| `transitions-destruction` | block | Showcase of destructive break-apart transitions |
| `transitions-dissolve` | block | Showcase of dissolve and fade transitions |
| `transitions-distortion` | block | Showcase of warp and distortion transitions |
| `transitions-grid` | block | Showcase of grid-based tile transitions |
| `transitions-light` | block | Showcase of light-based glow and flash transitions |
| `transitions-mechanical` | block | Showcase of mechanical shutter and iris transitions |
| `transitions-other` | block | Showcase of miscellaneous creative transitions |
| `transitions-push` | block | Showcase of push and slide transitions |
| `transitions-radial` | block | Showcase of radial wipe and reveal transitions |
| `transitions-scale` | block | Showcase of scale and zoom transitions |
| `whip-pan` | block | Shader transition simulating a fast camera whip pan |
| `curtain-reveal` | component | Two pleated stage curtains gather outward from center, the way real velvet bunches at the tieback, revealing the stage underneath. A static pelmet frames the to |
| `cut-the-curve` | component | A velocity-matched directional hard cut: the outgoing subject accelerates with power4.in, swaps at peak velocity, and the incoming subject continues in the same |
| `fade-through` | component | A calm transition primitive that fades one layer out, passes through a wash, and reveals the next layer |
| `grid-pixelate-wipe` | component | Transition effect where the screen dissolves into a grid of squares that fade out with staggered timing — use between scenes |
| `halftone-dissolve` | component | Scene A dissolves into scene B through a growing halftone dot field: accent ink dots pop onto a fixed grid smallest-first, each opens into a window onto B, unti |
| `iris-reveal` | component | A circle clip-path opens from an authored origin revealing state B over state A in one confident pass, then holds on B. Classic register dims and desaturates th |
| `match-cut` | component | A circle accelerates into a hard single-frame scene swap, matches the incoming circle exactly, and continues into a smaller resting pose. |
| `micro-transitions` | component | A transitions.dev-inspired pack of badge, dropdown, modal, tabs, tooltip, and success-check micro transitions |
| `morph-swap` | component | Two slotted siblings stacked at one shared center: A holds, then condenses or reshapes into B on a shared 50% 50% transform origin. Condense shrink-fades A exac |
| `ordered-dither-pass` | component | Bayer-matrix ordered dithering quantizes a slotted scene (rasterized once at mount): the image emerges from pure 2-tone noise to clean, or dissolves the reverse |
| `paper-collage-reveal` | component | A scrapbook patchwork of torn paper scraps, each with its own texture and tilt, flutters away in a staggered scatter to reveal the content underneath. |
| `parallax-device-dive` | component | A canonical phone rises into view before the camera pushes through its screen and layered app UI expands to fill the frame. |
| `parallax-unzoom` | component | Reveal transition — focus card scales down from full frame as siblings parallax in to form a grid (reverse of parallax-zoom) |
| `parallax-zoom` | component | Center card scales up to fill the frame while siblings parallax outward — inspired by the eBay Playbook hero transition |
| `rubber-band-bumper` | component | An outgoing panel pulls against increasing resistance, holds at tension, then snaps past an edge with overshoot as the incoming panel settles behind it. |
| `text-match-cut` | component | One line of text becomes another mid-move: both ride a single 85 % easy-ease curve and hard-swap at the speed peak, as scale, tracking, or a same-direction slid |
| `torn-paper-rip` | component | A fibrous paper tear runs across the frame: the torn sheet shows its white paper core along the edge and lifts away on a soft shadow, leaving the next scene sta |
| `type-match-cut` | component | A headline splits vertically around an incoming panel, which grows from the negative space and takes the frame as the words exit through opposite edges. |
| `whip-pan-cut` | component | A full-frame whip pan: scene A whips off laterally with capped directional motion blur while scene B enters in the same direction at matched velocity, on a spee |

## Caption styles (16)

| Name | Type | Description |
| --- | --- | --- |
| `caption-camera-follow` | component | One sentence written across a world far larger than the frame. Each word is sized against everything already written, so the block grows geometrically and the c |
| `caption-clip-wipe` | component | Left-to-right clip-path wipe reveal per word |
| `caption-editorial-emphasis` | component | Dual-font system with dramatic size contrast for emphasis words |
| `caption-emoji-pop` | component | Emoji integration with stroked text and horizontal squeeze entrance |
| `caption-glitch-rgb` | component | RGB chromatic aberration with CRT scanline overlay |
| `caption-gradient-fill` | component | Gradient-clipped text with elastic bounce entrance |
| `caption-highlight` | component | Red background sweep behind each active word, TikTok-style |
| `caption-kinetic-slam` | component | Full-screen single-word display with alternating entrance directions |
| `caption-matrix-decode` | component | Character scramble animation before text reveal |
| `caption-neon-accent` | component | Multi-color neon glow accents with wiggle drift animation |
| `caption-neon-glow` | component | Cyan and magenta neon glow with keyword accent colors |
| `caption-parallax-layers` | component | Behind-subject 3D text layering with vertical stretch effect |
| `caption-particle-burst` | component | Keyword words trigger colored particle explosions |
| `caption-pill-karaoke` | component | Pill-shaped container with per-word karaoke color highlight |
| `caption-texture` | component | Flowing texture mask over large uppercase text — ships with 6 textures (lava, marble, metal, wood, concrete, rock), configurable via the texture variable |
| `caption-weight-shift` | component | Elegant font-weight transition between caption lines |

## Captions (1)

| Name | Type | Description |
| --- | --- | --- |
| `mk-callout-highlight` | block | A sentence whose word-by-word emphasis is driven by a single scalar — tween it to sync the highlight with a voiceover |

## Typography and kinetic type (36)

| Name | Type | Description |
| --- | --- | --- |
| `hw-path-text` | block | Handwriting flowing along any SVG path with a per-character reveal; the path is the only geometry input |
| `hw-title` | block | Handwritten display text with a scalar-driven word-by-word highlight sweep and a seeded squiggle underline sized to the text; boils |
| `hw-write-title` | block | True glyph write-on: filled Caveat letterforms revealed by baked per-glyph centerline strokes traced in real stroke order with a curvature-adaptive pen-velocity |
| `weight-wave` | block | A crest of thickness travels along a headline: each character swells from light to black and leans forward as the wave passes, driven by the wght and slnt varia |
| `wireframe-portal-title` | block | A wireframe portal bursts open, the title comes through, then its letters swap into a second phrase. |
| `yt-prism-title` | block | Display title on a transparent root: blur-focus entrance, red/blue fringe that settles then breathes, perspective bow, slow scale drift |
| `blur-out-up` | component | Words arrive clean and depart upward with increasing blur for airy exits. |
| `caret-swap` | component | A gradient caret expands over one phrase, collapses to the left, then types its replacement with a blinking caret. |
| `char-slam-explode` | component | Headline glyphs hold in a deterministic scatter, then reassemble with an overshooting slam and a three-frame landing shake. |
| `focus-blur-resolve` | component | A premium focus pull from heavy blur to crisp text, then a soft blur-out exit. |
| `headline-slam` | component | A heavyweight headline scales down into frame, lands with a deterministic three-frame shake, holds with subtle drift, and whips upward on exit. |
| `line-by-line-slide` | component | Each line enters from the left with staggered slide and exits to the right. |
| `logo-brand-close` | component | A display-scale wordmark cascades letter by letter into a centered lockup, the accent brand period lands last, an optional tagline and wide-tracked mono URL set |
| `marker-highlight` | component | Display text settles in, then one hand-drawn marker stroke (highlight, circle, underline, or scribble) draws over the emphasized word on cue. |
| `matrix-decode` | component | Random scramble resolves left-to-right into the target text. |
| `mk-emphasis-type` | component | Oversized low-contrast background word drifting slowly behind the subject — typography as texture |
| `morph-text` | component | Gooey text morph — cycles through an editable word list using SVG threshold + GSAP-driven blur for a fluid, satisfying transition effect |
| `per-word-crossfade` | component | Words gently fade into place with a short vertical drift for calm keynote rhythm. |
| `per-word-rise` | component | Words or characters rise into place in a controlled blur-to-sharp cascade, settle softly on landing, and hold still until the cut (optional fade or up exit). |
| `perspective-marquee` | component | A 3D tilted marquee with depth feel as items roll toward the horizon. |
| `rgb-glitch-text` | component | RGB-offset text copies jitter briefly for a controlled glitch window. |
| `scan-band` | component | A diagonal distortion band sweeps once across a clean wordmark, revealing clipped red and cyan offsets only inside the moving band. |
| `shared-axis-y` | component | Per-word vertical shared-axis transition for sharp editorial swaps. |
| `shared-axis-z` | component | Scale-based shared-axis transition for focus shifts and context depth. |
| `slot-machine-roll` | component | A vertical reel scrolls characters from one value to another. |
| `staggered-fade-up` | component | Words fade in and slide up one after another with configurable delay. |
| `strikethrough-replace` | component | Draw a strike line across old text, then reveal the replacement. |
| `ticker-takeover` | component | A mono ticker rolls through options, locks on a final word with an accent flash, and promotes it into a full-frame headline. |
| `titlecard-calm` | component | A restrained title card where a mono kicker and generous grotesque headline fade upward, drift almost imperceptibly, and exit cleanly. |
| `titlecard-lockup` | component | The calm breather titlecard: an optional mono kicker fades up, the wordmark settles dead-center with one restrained move, a hairline rule draws left to right, a |
| `top-down-letters` | component | Letters descend from above in a pronounced staircase with zero blur. |
| `tracking-in` | component | A precise letter-spacing reveal for premium headings and interface labels |
| `typewriter` | component | Character-by-character text reveal with a deterministic blinking cursor. |
| `variable-axis-type` | component | A locked one-line headline whose weight or width axis morphs into a decisive emphasis beat. |
| `vox-annotate` | component | The Vox-style annotate gesture: a keyword in a held sentence gets a hand-drawn marker while a thin connector draws up to a mono callout label, all as one choreo |
| `wordmark-tiles` | component | A wordmark resolves from deterministic color noise into correctly cropped glyph tiles through a spatially modulated GSAP wave. |

## Title cards (9)

| Name | Type | Description |
| --- | --- | --- |
| `canopy-part-title` | block | Leaves sweep through the frame and part to reveal the headline. |
| `carousel-text-circle-1` | block | A headline mask-reveals word by word while a circle carousel converges from off-frame and threads the line, collapses to centre, hard-cuts to a second line that |
| `carousel-text-circle-2` | block | A headline mask-reveals word by word while a circle carousel converges from off-frame and threads the line, collapses to centre, hard-cuts to a second line that |
| `carousel-text-circle-3` | block | A headline mask-reveals word by word while a circle carousel converges from off-frame and threads the line, collapses to centre, hard-cuts to a second line that |
| `carousel-text-circle-4` | block | A headline mask-reveals word by word while a circle carousel converges from off-frame and threads the line, collapses to centre, hard-cuts to a second line that |
| `carousel-text-circle-5` | block | A headline mask-reveals word by word while a circle carousel converges from off-frame and threads the line, collapses to centre, hard-cuts to a second line that |
| `extruded-logo` | block | Beveled 3D letters flip up one by one, the word swings so light runs across the bevels, then settles for a readable hold. Chrome, gold or matte. |
| `glass-hero` | block | A solid glass object rises in front of a giant headline and keeps turning, so the type bends and splits into colour through it. |
| `glass-shard-title` | block | Glass shards fly in through fog and tile themselves into the headline. |

## Lower thirds (13)

| Name | Type | Description |
| --- | --- | --- |
| `lower-third-bild` | block | News-style lower third with tight-fit text boxes: white headline bar with red drop-shadow, red sub-line with white drop-shadow. |
| `lt-accent-underline` | block | Cardless lower third for footage overlay: name rises, an accent rule draws left-to-right, role fades in; text-shadowed for legibility |
| `lt-bold-block` | block | High-energy podcast lower third: solid dark block wipes in, uppercase name slams up, accent tag pops |
| `lt-clean-bar` | block | Minimal white-card lower third for podcasts/interviews: accent tab, name + role, clip-wipe entrance |
| `lt-color-block` | block | High-energy lower third: bold accent-color block slides in with overshoot, condensed name + mono role |
| `lt-dark-card` | block | Charcoal card lower third for bright footage: name, drawn accent underline, role; slide-up entrance |
| `lt-kicker-name` | block | Cardless lower third with an accent eyebrow/kicker tag, heavy name, and a drawn baseline; for footage |
| `lt-mask-reveal` | block | Cardless lower third: an accent sweep crosses and clip-path-reveals a heavy name, role fades up; for footage |
| `lt-neon-border` | block | Two arcs of light travel the edge of a rounded panel and snap corner to corner, trailing a soft three-layer bloom. A lower third for a name and role. |
| `lt-side-rule` | block | Cardless lower third with a vertical accent bar; condensed display name + mono role, text-shadowed for footage |
| `lt-soft-pill` | block | Rounded white pill lower third for podcasts/interviews: status dot, name + role, scale-pop entrance |
| `lt-stack-bars` | block | Two stacked bars: a dark name bar wipes from the left, an accent role bar wipes from the right |
| `news-ticker` | block | Premium broadcast-style lower-third ticker with live label, headline ribbon, and scrolling news crawl. |

## Overlays (26)

| Name | Type | Description |
| --- | --- | --- |
| `camcorder-hud` | block | Responsive REC, battery, editable date placeholder, and timeline-driven counter overlay for creator-camera and camcorder treatments |
| `freeze-frame-dressing` | block | Timeline-driven paper, tape, and flash dressing for a freeze-frame or background-removed subject |
| `hw-pipeline` | block | Wobbled boxes with handwritten labels joined by curved connectors, drawing on in sequence from a node list |
| `hw-text-cloud` | block | Hand-drawn speech bubble with a positionable tail: outline draws on, paper fill fades in, handwritten text types per character; boils |
| `instagram-follow` | block | Animated Instagram follow overlay with profile card and follow button |
| `macos-notification` | block | Animated macOS-style notification banner with app icon and message |
| `reddit-post` | block | Animated Reddit post card overlay with upvotes and comments |
| `snow` | block | Seek-safe falling-snow overlay: sparse or dense flakes drift down with size, speed and opacity correlated per flake for depth, radial-masked so the frame center |
| `spotify-card` | block | Animated Spotify now-playing card with album art and progress bar |
| `starfield` | block | Seek-safe night-sky overlay: sparse or dense stars in three size tiers that twinkle and drift in two parallax layers, radial-masked to keep the frame center cle |
| `tiktok-follow` | block | Animated TikTok follow overlay with profile card and follow button |
| `x-post` | block | Animated X/Twitter post card overlay with engagement metrics |
| `yt-comment-card` | block | Social comments typing on over footage: avatar pop, username and time, per-character typewriter, likes row; image avatars or initials chips |
| `yt-lower-third` | block | Animated YouTube subscribe lower third with avatar and channel info |
| `grain-overlay` | component | Animated film grain texture overlay using CSS keyframes — adds warmth and analog character to any composition |
| `hw-arrow` | component | Wobbled draw-on arrow with straight, gentle, and swoop curve poses, a four-way stroke texture matrix (plain/soft/sharp/spray), and a travel-aligned head-arrival |
| `hw-box-label` | component | Wobbled rounded rectangle draws on — across the authored stroke matrix (plain/soft/sharp/spray) — or drops in and lands with a volume-true contact squash and bo |
| `hw-callout-circle` | component | Wobbled ellipse draws around a target with optional scribble fill and curved connector; the handwritten label pops in WITH momentum and the drawn shapes absorb  |
| `light-sweep-pass` | component | A traveling key light re-shades a slotted scene: a soft diagonal gradient band crosses the frame once while every per-element highlight and shadow shifts in loc |
| `native-notification-pop` | component | One system-faithful notification banner (iOS or macOS) drops in over any scene on an accurate interruptible spring: fast arrival, soft overshoot, settled mass,  |
| `sheet-spring-up` | component | A bottom sheet rushes up from below the frame on a real spring sampled frame by frame from reference footage, overshooting its resting place and settling back w |
| `typing-indicator` | component | The three-dot chat bubble that says someone is writing: it pops in at the thread's edge exactly as messaging apps do, holds while the reply is coming, and vanis |
| `vignette` | component | Cinematic radial vignette overlay using a pure-CSS gradient — darkens the edges to pull focus toward the center |
| `yt-circle-pointer` | component | Draw-on annotation ellipse around a target plus a countdown chip that pulses each tick |
| `yt-feather-highlight` | component | Dims the frame except a feathered ellipse; the hole's position and size are CSS variables, so helpers glide the spotlight between targets |
| `yt-screen-warp` | component | Grid, scanline, vignette, and sheen overlay plus a 3D-warp wrapper class that makes footage read as if playing on a physical display |

## Camera moves (14)

| Name | Type | Description |
| --- | --- | --- |
| `camera-dolly-zoom` | block | Camera tracks toward or away from the subject while the field of view changes the opposite way, so the subject holds its frame size while the background collaps |
| `rack-focus` | block | A focus pull with real aperture bokeh: the focal plane travels from a near subject to a far one, so one resolves as the other blows into hard-edged polygon disc |
| `camera-scan-gate` | component | A camera and QR recognition moment with a viewfinder sweep, bracket lock, confirmation pulse, and verified next beat. |
| `camera-shake` | component | Procedural handheld, telephoto and rig camera shake for any wrapper: nine measured profiles with per-lens projection, closed-form and seek-safe |
| `cursor-zoom-follow` | component | Screen-recording auto-zoom: the camera pushes in toward each upcoming click, trails the cursor on a smooth spring, marks every click with a press and a ring, th |
| `drift-hold` | component | A centered content card stays subtly alive through loop-exact rotation, scale breathing, and a slow light sweep. |
| `filmed-screen` | component | Your scene, filmed off a screen: perspective, depth of field that follows an element you name, LED sub-pixels and per-shot colour grades. Shots glide into each  |
| `focus-rack` | component | Focus shifts once between two cards at different apparent depths through synchronized blur, dimming, scale, and parallax. |
| `pan-stations` | component | A lateral camera move across a continuous row of labeled feature stations, with a steady dwell at each stop before the next pan. |
| `pull-back-reveal` | component | A tight stat detail holds, then one decelerating camera pull-back reveals the headline and supporting cards that recontextualize it. |
| `push-in` | component | A centered headline gains focus through one slow, continuous camera push and a gentle fade out. |
| `scroll-camera-story` | component | A compressed forced-scroll cinematic pass: a tall scene of slotted sections travels past the camera top to bottom, depth layers parallax at different rates, eac |
| `ui-focus-zoom` | component | A full app surface establishes with one settle, then the camera zooms and pans to an anchored region on its cue and holds the zoomed state, with an optional sof |
| `yt-camera-move` | component | Dynamic zoom, slide, and 3D tilt-pan helpers for any wrapper (video, include, card) with cubic-easing defaults and an edge-defocus pulse overlay |

## Handwritten / hand-drawn (4)

| Name | Type | Description |
| --- | --- | --- |
| `hw-frame` | block | Media in a hand-drawn border with corner doodles and a handwritten caption; the unit tilts slightly and boils (images inside the block; keep live footage in the |
| `hw-boil` | component | Hand-drawn jitter that re-poses every N frames, as seek-safe helpers: pose derives from quantized timeline time through a seeded hash; includes the shared onUpd |
| `hw-underline` | component | Hand-drawn squiggle underline, double-pass strikethrough, and bracket marks that draw on |
| `marker-checklist-card` | component | A hand-lettered paper card: marker headline with an underline and a drawn ellipse around one word, then three checklist rows whose checks draw themselves on - t |

## Textures (13)

| Name | Type | Description |
| --- | --- | --- |
| `falling-lines` | block | White lines fall down the frame at varied speeds, each fading into a trail. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `fractal-noise` | block | Soft grey fractal noise drifts across the frame like slow clouds. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `gabor-noise` | block | Grey streaky noise drifts across the frame like a moving fingerprint. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `halftone-field` | block | A full-bleed halftone light field: a grid of dots whose size and colour track a slow flowing simplex-noise field, so broad bands of light sweep across a mostly- |
| `marble` | block | Ink-dark veins wind through white in a marbled pattern that slowly shifts. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `plasma` | block | Deep violet plasma folds and churns across the whole frame. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `ripples` | block | Concentric rings ripple outward from the centre, white on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `worley-noise` | block | A field of drifting cells, light at their centres and dark at their edges. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `yt-lcd-background` | block | Textured paper board: scanlines with slow drift, optional pixel grid, static grain, and display text with a blur-focus entrance and chromatic-fringe title |
| `ascii-render-pass` | component | A slotted scene renders as live ASCII: a canvas samples the source's luminance grid (rasterized once at mount) and draws glyphs from a density ramp charset; res |
| `grain-field` | component | A clearly visible accent-tinted dot field drifts over a subtle luminance gradient in an exact ambient loop. |
| `ink-bleed-reveal` | component | Liquid ink blooms through paper under a gooey blur-plus-threshold filter, merges, then contracts as a crisp slotted mark resolves beneath it, with static seeded |
| `texture-mask-text` | component | CSS luminance masks that cut holes through letterforms - 66 pre-built texture masks from ambientCG PBR color maps |

## Backgrounds (24)

| Name | Type | Description |
| --- | --- | --- |
| `aurora` | block | Green and violet aurora curtains ripple across a night sky. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `blob` | block | A soft coral and pink blob with a warm highlight slowly changes shape on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `color-wheel` | block | A wide gradient slides slowly through the colours of the rainbow. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `cosmic-orb` | block | An iridescent soap-bubble planet: a slowly spinning sphere of nebula bands, dust lanes and twinkling stars wrapped in a refracting glass limb with chromatic abe |
| `flowing-gradient` | block | Bands of orange and violet flow across the frame in a smooth gradient. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `gallery-tunnel` | block | An infinite corridor of panels: a square tunnel receding to a vanishing point, its floor, ceiling and walls tiled with saturated colour slabs and caller-supplie |
| `godrays` | block | Rays of light fan out from a corner and drift across a deep blue field. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `lens-flare` | block | A camera lens flare: a bright star burst and a faint rainbow halo that slowly shimmer on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `mesh-gradient` | block | Soft coral, orange and violet fields blend and drift in a mesh gradient. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `mk-background` | block | Procedural soft-blob gradient backdrop in a minimalist presentation style: two radial blobs drifting over a base color, with an animatable rounded-card bar mask |
| `prism` | block | A white beam of light splits into a slowly turning rainbow. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `sine-wave` | block | A glowing white sine wave travels across a black frame. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `spiral` | block | A bold black and white spiral turns in the frame. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `spiral-galaxy` | block | A spiral galaxy seen from outside, turning with real differential rotation: inner stars orbit faster than outer ones, so the arms wind up over the shot instead  |
| `strands` | block | Thin ribbons of pink and blue light weave across a black field. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `stripes` | block | Bold black and white diagonal stripes slide across the frame. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `sun-burst` | block | Cream and black rays fan out from the centre and slowly turn. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `swirl` | block | Orange and blue color fields swirl and flow into each other across the whole frame. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `vfx-anamorphic-flare` | block | A drifting field of bright points, each one throwing the long horizontal blue-violet streak a real anamorphic cinema lens produces. Built from the measured filt |
| `vfx-liquid-background` | block | Organic liquid simulation with vertex displacement on a subdivided plane. HTML content floats above rippling fluid surface with real-time wave dynamics. |
| `voronoi` | block | Magenta cells with glowing blue centres shift and reshape across the frame. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `aurora-drift` | component | Three soft accent-derived aurora fields drift in an exact ambient loop over a deep base and faint vignette. |
| `beat-pulse-background` | component | An accent-derived backdrop pulses its glow intensity and saturation on a deterministic, supplied beat grid. |
| `dynamic-grid` | component | A responsive animated grid background driven by CSS variables for SaaS, code, and data scenes |

## WebGPU shaders (14)

| Name | Type | Description |
| --- | --- | --- |
| `chrome-orb` | block | A mirror-chrome orb reflects a bright studio light, on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `frost` | block | A frozen blue orb with frost creeping in from its edge, on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `goo` | block | A glossy green liquid ball whose surface bulges and ripples like wet goo, centred on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `heatmap` | block | Thermal colours flow through a glowing orb, on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `hologram` | block | A pale blue holographic orb with scan rings and flicker, on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `holographic` | block | An iridescent foil orb with a shifting rainbow sheen, centred on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `light-edge` | block | Purple and cyan light races around the edge of an orb on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `liquid-metal` | block | A chrome sphere ripples and flows like molten metal on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `nebula` | block | A small world of pink and blue gas swirls inside a sphere on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `obsidian` | block | A dark glass orb catches pink and cyan iridescent light on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `plastic` | block | A glossy white plastic orb with soft studio reflections, on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `thin-film` | block | An orb's rim shimmers with soap-bubble iridescence on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `water` | block | A sphere of wind-rippled water reflecting a blue sky, on black. A WebGPU shader from the Shaders library (shaders.com, MIT). |
| `waveform` | block | Equalizer bars in a blue to pink gradient pulse across the middle of the frame, like an audio visualizer. A WebGPU shader from the Shaders library (shaders.com, |

## Shaders (2)

| Name | Type | Description |
| --- | --- | --- |
| `code-shader-dissolve` | block | The code compiles into existence: a GPU fragment shader resolves it out of seeded noise with a chromatic dissolve front and edge glow, then holds crisp. |
| `vfx-text-cursor` | block | Dramatic text reveal with cursor glow, chromatic shadow rays, and directional lighting on a black stage. Canvas-based shader post-processing with spectral color |

## 3D (16)

| Name | Type | Description |
| --- | --- | --- |
| `app-showcase` | block | Fitness app product showcase with three floating smartphone screens |
| `carousel-orbit-1` | block | Image cards on a spinning 3D Fibonacci sphere, billboarded to the camera, sized by camera distance (Orbit style 1); 24 image slots. |
| `carousel-orbit-2` | block | Image cards on a spinning 3D Fibonacci sphere, billboarded to the camera, sized by camera distance (Orbit style 2); 24 image slots. |
| `carousel-orbit-3` | block | Image cards on a spinning 3D Fibonacci sphere, billboarded to the camera, sized by camera distance (Orbit style 3); 24 image slots. |
| `carousel-orbit-4` | block | Image cards on a spinning 3D Fibonacci sphere, billboarded to the camera, sized by camera distance (Orbit style 4); 24 image slots. |
| `carousel-orbit-5` | block | Image cards on a spinning 3D Fibonacci sphere, billboarded to the camera, sized by camera distance (Orbit style 5); 24 image slots. |
| `carousel-vision-1` | block | A ring of large image cards tilted into a row under a 3D camera, each card turning toward the centre (Vision style 1); 12 image slots. |
| `carousel-vision-2` | block | A ring of large image cards tilted into a row under a 3D camera, each card turning toward the centre (Vision style 2); 12 image slots. |
| `carousel-vision-3` | block | A ring of large image cards tilted into a row under a 3D camera, each card turning toward the centre (Vision style 3); 12 image slots. |
| `carousel-vision-4` | block | A ring of large image cards tilted into a row under a 3D camera, each card turning toward the centre (Vision style 4); 12 image slots. |
| `carousel-vision-5` | block | A ring of large image cards tilted into a row under a 3D camera, each card turning toward the centre (Vision style 5); 12 image slots. |
| `code-3d-extrude` | block | Syntax-highlighted code on a lit, beveled 3D slab that rotates through real space and settles to a readable rest — true WebGL depth and lighting, not a 2D trans |
| `ios26-liquid-glass` | block | 3D iPhone with a normal iOS 26 home screen, liquid glass app icons, shader wallpaper, dock, and fluid glass notifications that drop from the status area onto a  |
| `macos-tahoe-liquid-glass` | block | 3D MacBook with a macOS Tahoe-style desktop, glass menu bar, Finder window, dock, and cinematic device camera move. |
| `ui-3d-reveal` | block | Perspective 3D reveal animation for UI elements |
| `vfx-iphone-device` | block | Real GLTF iPhone 15 Pro Max and MacBook Pro models with live HTML-in-Canvas screen content, morphing glass lens, product review camera choreography, and 360° tu |

## Charts and data (16)

| Name | Type | Description |
| --- | --- | --- |
| `bar-chart-race` | block | Ranked bars grow and overtake each other as a time series advances, with the axis rescaling as values climb and the accent handing over to whoever leads |
| `data-chart` | block | Animated bar + line chart with staggered reveal, NYT-style typography, and value labels |
| `oscilloscope-trace` | block | CRT oscilloscope beam sweeping a waveform across a 10x8 graticule, with closed-form phosphor persistence: the tail decays as exp(-age/tau) and brightens where t |
| `spain-map` | block | Animated Spain choropleth by autonomous community with staggered reveals and gradient legend — D3 conic conformal projection |
| `us-map` | block | Animated US choropleth map with staggered state reveals, value labels, and gradient legend — pure inline SVG with GSAP |
| `us-map-bubble` | block | Animated US bubble map with proportional city markers, value callouts, and connection lines — composable with us-map |
| `us-map-flow` | block | Animated connection arcs between US cities over a base map — composable origin-destination flow visualization |
| `us-map-hex` | block | Animated hexagonal tile grid map — each state as an equal-weight hex with data fill and abbreviation label |
| `week-in-merges` | block | Each author's avatar bounces across their row at a speed set by how many pull requests they merged |
| `world-map` | block | Animated world choropleth with country-by-country reveal, tooltip labels, and rotating globe inset — D3 Natural Earth projection |
| `animated-bar-chart` | component | A compact data card with deterministic bar growth and value callouts. |
| `conic-progress-ring` | component | A token-driven conic progress ring whose angular fill and center count settle together from one registered percentage. |
| `decline-chart` | component | A metric line draws downward as its value counts down and the ambient background darkens in lockstep. |
| `logo-wall` | component | A trusted-by wall of placeholder lettermark logos that fades and scales into place with a deterministic per-cell stagger. |
| `number-wheel` | component | A rolling digit counter primitive for metrics, prices, counts, and scoreboards |
| `star-rating-fill` | component | A token-driven star row whose colored layer sweeps to a rating, preserves the fractional final star, and can count the value in sync. |

## Code (9)

| Name | Type | Description |
| --- | --- | --- |
| `code-diff` | block | An edit shown as a colored diff — removed lines collapse in red, added lines expand in green. |
| `code-highlight` | block | A highlight band sweeps across a target line while the surrounding context dims — draws the eye to one line. |
| `code-morph` | block | One snippet transforms into another — tokens glide between positions, leavers fade out, enterers fade in. Shiki Magic Move re-driven as a paused GSAP timeline. |
| `code-particle-assemble` | block | Thousands of GPU points scatter through space and fly to the exact glyph pixels of the code, resolving into readable syntax-highlighted text — a particle system |
| `code-scroll` | block | The camera scrolls a long file to bring a target line to center and spotlights it — for walking through real modules. |
| `code-snippet-apple-terminal-pro` | block | Apple Terminal Pro profile: black background with grey text and lime green cursor, per-character typing animation of a shell session. |
| `code-snippet-dark-2026` | block | VS Code workbench with per-character typing animation in the Dark 2026 theme. Full editor chrome with activity bar, sidebar, tabs, terminal, and status bar. |
| `code-snippet-dark-modern` | block | VS Code workbench with per-character typing animation in the Dark Modern theme. Full editor chrome with activity bar, sidebar, tabs, terminal, and status bar. |
| `code-typing` | block | Token-streamed typing reveal with a caret that tracks the frontier — deterministic, no CSS animation. |

## Mock UI (12)

| Name | Type | Description |
| --- | --- | --- |
| `ai-answer-rank` | block | Is your brand in the AI answer? A question types into a chat card, the assistant answers with a ranked list of three picks, then re-ranks: the promoted brand sl |
| `ai-chat-reveal` | block | A question is typed on a rising keyboard, sent, and answered by an AI that streams its reply word by word on a measured token rhythm - thinking dot, uneven burs |
| `chatgpt-exchange` | block | A portrait ChatGPT-style exchange types and sends a prompt, streams an answer, assembles a comparison table, and scrolls back through the result |
| `claude-exchange` | block | A portrait Claude-style exchange types a prompt, works through search and reasoning steps, then streams a detailed answer with citations and actions |
| `message-thread-reveal` | block | A full text conversation plays out on a phone - bubbles popping in, typing indicators, a shared link card, emoji, delivered receipts - with the whole thread scr |
| `notes-reveal` | block | A personal note is typed character by character in a notes app - caret riding every letter, the page scrolling up on measured settle curves as each line lands - |
| `notification-cascade` | block | Phone notifications land one after another and stack up the screen, each banner pushing the pile down as it arrives, before the whole stack lifts away into a cl |
| `share-sheet-carousel` | block | A share sheet springs up from the bottom of the phone and cycles previews inside its card on a fast cut rhythm while the blurred ground swaps behind it, ending  |
| `slack-notification-ad` | block | A portrait lock screen fills with escalating Slack video requests before HeyGen delivers the payoff |
| `chat-message` | component | One message arrives on the measured entry - scale 0.75, 0.12s, growing from its sender's corner. The type is an enum switched like marker-highlight's style: a r |
| `chat-thread` | component | The measured conversation as one mountable scene at full fidelity: status bar, back badge, avatar and name pill, bubbles with real iMessage tails, a Delivered r |
| `notes-typing` | component | The notes-app confession as a mountable scene: a bold title, then body lines typed character by character on the measured human keystroke rhythm, the caret ridi |

## Social (1)

| Name | Type | Description |
| --- | --- | --- |
| `thread-message-stack` | block | A source-owned editable conversation stack with arbitrary incoming and outgoing messages |

## Product demo (17)

| Name | Type | Description |
| --- | --- | --- |
| `browser-device-stage` | component | A generic app surface in token-native device chrome (browser, window, or phone). The screen is a slot for caller img/video/HTML with a token-styled skeleton def |
| `code-terminal-run` | component | A token-chrome terminal panel runs one command: the prompt line types deterministically behind an integer-cycle caret, executes after a beat, and output lines p |
| `cursor-drag-drop` | component | A cursor grabs a task card, lifts and tilts it into its motion, carries it in lockstep to an empty column, drops it with a small settle, and the list closes the |
| `cursor-marquee-select` | component | A cursor drags a selection rectangle across a photo grid; each tile rings and pops a check the frame the rectangle touches it, while a pill counts the selection |
| `icon-morph-beat` | component | An icon morphs between authored state silhouettes, shifts to an accent color, and marks completion with one restrained pulse. |
| `notification-stack` | component | 1 to 5 token notification cards slide-settle into a vertical stack on cues, newest on top; one card grows slightly and brightens as the focus while the rest dim |
| `offset-path-traveler` | component | A slotted traveler follows an authored path with tangent rotation, curved entry, and curved exit. |
| `press-ripple` | component | A cursor decel-arrives from off-stage, lands slightly off-center on a caller-positioned target, compresses with it in lockstep, releases with two small click ri |
| `screen-flow-carousel` | component | Two to five app screens ride a horizontal rail: one primary at center, neighbors receded, advancing on cues with a velocity-matched throw and a smooth long-tail |
| `segmentation-flood` | component | Machine-vision read of a slotted subject: translucent accent segmentation masks flood on in quantized scanline steps, each region gets a thin bracket and mono l |
| `soft-blob-touch` | component | A granular soft blob idles with slow internal drift; a scripted touch dot decel-arrives, the blob deforms toward it with an attraction bulge, then recovers with |
| `spring-stack-shuffle` | component | A stack of 3 to 5 slotted cards reshuffles on cues: the back card throws over the top and lands at the front with real mass, the rest compress and resettle; cue |
| `state-chip-rail` | component | A rail of mono status chips advances a seek-safe data-state snap machine on a cue schedule: active chip ink on surface, done chips dim, pending chips hollow, op |
| `sticky-mock-swap` | component | A pinned product mock cross-fades through accent-tinted feature states while matching captions rise, hold, and exit beside it. |
| `telemetry-hud` | component | Quiet mono debug-HUD readouts frame a slotted subject: corner brackets draw on, label:value lines tick their values on cues, one readout emphasized in accent. T |
| `tracing-beam` | component | A glowing dash follows one SVG path through three UI elements, lifting and brightening each element in sequence. |
| `typed-prompt` | component | A prompt line types itself in chunked human cadence behind a deterministic blinking caret, with optional backspace-and-retype correction of the final word. |

## Cursors (10)

| Name | Type | Description |
| --- | --- | --- |
| `agent-cursor` | component | An AI agent operating a UI: a cursor with an accent name label that types out each step, clicks each target with a small ring, and ends on a check. |
| `cursor-annotate` | component | A marker pen glides onto the frame and hand-draws a loose loop, an underline, or an arrow around a region, the ink laid exactly under its nib, then lifts and le |
| `cursor-context-menu` | component | A cursor right-clicks a file, a context menu blooms from its tip, the hover highlight tracks the item under it, and the chosen action plays out: duplicate, rena |
| `cursor-glyph-trail` | component | A tutorial cursor path: on a settings screen the arrow clicks through three steps, leaving a dotted trail spaced evenly by distance and a numbered marker at eac |
| `cursor-text-select` | component | An arrow turns into an I-beam over a document, drags a selection across a phrase character by character, raises a format toolbar, turns back into an arrow and c |
| `dart-cursor` | component | A bold outlined arrowhead that dives in from camera depth, flies nose-first with motion blur along its path, squashes on two clicks, and whips out of frame. |
| `magnetic-cursor` | component | A soft dot pointer glides across an editor toolbar, is pulled into each button and morphs into its rounded hover plate while the icon leans toward it, presses o |
| `multiplayer-cursors` | component | Labeled collaborator cursors with token-derived colors and soft glows drift from spread positions into a shared center zone, proving live multiplayer presence. |
| `oversized-cursor` | component | The look-here pointer for a video: the macOS arrow at 3.5x its normal size lands its tip on one control, clicks it on, settles just below it so the result stays |
| `touch-indicator` | component | A translucent contact-circle gesture actor for mobile UI scenes: it touches the glass on the frame the host target responds, then lifts. Tap or swipe, picked by |

## Carousels and galleries (11)

| Name | Type | Description |
| --- | --- | --- |
| `carousel-circle-1` | block | Image cards ride a circle with a size gradient by depth angle, sweeping in fast-slow-fast swings (Circle style 1); 12 image slots. |
| `carousel-circle-2` | block | Image cards ride a circle with a size gradient by depth angle, sweeping in fast-slow-fast swings (Circle style 2); 12 image slots. |
| `carousel-circle-3` | block | Image cards ride a circle with a size gradient by depth angle, sweeping in fast-slow-fast swings (Circle style 3); 12 image slots. |
| `carousel-circle-4` | block | Image cards ride a circle with a size gradient by depth angle, sweeping in fast-slow-fast swings (Circle style 4); 12 image slots. |
| `carousel-circle-5` | block | Image cards ride a circle with a size gradient by depth angle, sweeping in fast-slow-fast swings (Circle style 5); 12 image slots. |
| `carousel-path-1` | block | Image cards ride an open bezier path (arc, V, diagonal, wave, S-curve) with depth scaling and tangent rotation (Path style 1); 24 image slots. |
| `carousel-path-2` | block | Image cards ride an open bezier path (arc, V, diagonal, wave, S-curve) with depth scaling and tangent rotation (Path style 2); 12 image slots. |
| `carousel-path-3` | block | Image cards ride an open bezier path (arc, V, diagonal, wave, S-curve) with depth scaling and tangent rotation (Path style 3); 12 image slots. |
| `carousel-path-4` | block | Image cards ride an open bezier path (arc, V, diagonal, wave, S-curve) with depth scaling and tangent rotation (Path style 4); 24 image slots. |
| `carousel-path-5` | block | Image cards ride an open bezier path (arc, V, diagonal, wave, S-curve) with depth scaling and tangent rotation (Path style 5); 24 image slots. |
| `cuboid-carousel` | block | A chain of bevelled cuboids rides a travelling wave as a content carousel. |

## Motion primitives (45)

| Name | Type | Description |
| --- | --- | --- |
| `ascii-trail-reveal` | component | An authored S-curve sweeps through a deterministic ASCII grid, flipping cells away to reveal a labeled panel. |
| `beat-accent` | component | A single music-hit sting: impact flash, micro scale-pulse on the subject, immediate decay. |
| `bottom-up-letters` | component | Splits text into letters and reveals each glyph from below with deterministic staggered timing |
| `chart-story` | component | One chart builds from data in reading order and lands the exact supplied values: staggered bars, a left-to-right line with area fill, a sweeping donut, or filli |
| `constellation-hub` | component | Feature nodes brighten in narration order as real-length SVG connectors draw outward from a fixed central hub, then settle into one lockup. |
| `count-up` | component | A token-native stat counter that eases between values, counting up or down, and lands with a restrained scale pulse. |
| `cta-close` | component | A display-scale action line lands per word and fills the frame with air, one generous CTA capsule pops beneath it with a single overshoot, and the finished clos |
| `cta-lockup` | component | A canonical closing lockup that reveals an action line, pops in an accent CTA capsule, settles supporting microcopy, and holds with confidence. |
| `echo-trail` | component | A moving element renders with N ghosted copies of itself at t minus i times delta, opacity stepped down per ghost; one traversal, echoes collapsing into the set |
| `facet-morph` | component | A faceted low-poly mass of 36 triangles continuously reshapes between three authored silhouettes (blob, mark, badge) with per-facet flat shading that recomputes |
| `gesture-tap` | component | A contact circle taps a mobile pill button, releases it into a new labeled accent state, and lifts away. |
| `gloss-sweep` | component | A card lands with a restrained slam, catches one diagonal specular gloss, and holds perfectly still. |
| `grade-split-reveal` | component | The same picture twice, one flat and one finished, with a hard edge sweeping between them. It stops in the middle long enough to compare, then commits and the g |
| `grid-card-assemble` | component | N capability cards (thin-line icon that draws on, mono label, optional muted body) stagger-assemble into a grid or vertical list with a fade plus short slide in |
| `inline-highlight` | component | A clean marker-style inline highlight that animates behind text using a CSS scale variable |
| `kinetic-center-build` | component | Words enter from the right and push the growing phrase left until the final line locks centered. |
| `kinetic-type-swap` | component | A held sentence keeps its fixed text in place while one widest-word masked slot rolls through alternatives and settles on the final option. |
| `line-swap` | component | A masked full-line beat replacement: line A holds center then exits up through an overflow-hidden mask as line B enters bottom-up on the same beat, with an opti |
| `locked-nucleus-orbit` | component | A fixed center nucleus anchors deterministic satellite orbits that settle into a composed lockup. |
| `logo-sting` | component | A wordmark slams into its final scale, fires one accent ring and one white impact frame, then holds completely still. |
| `modal-morph` | component | A small card expands into a full panel, shared-element style: both layouts measured once at mount, the container morphs by transform only (never width/height tw |
| `multi-device-splay` | component | Phone, tablet, and desktop product mockups fan from a centered stack into a proud splayed arrangement with a subtle idle float. |
| `outline-draw` | component | A rounded outline that proves a callout by drawing clockwise as a hollow conic-gradient border with a clean closure. |
| `particle-image-reveal` | component | A seeded deterministic particle field converges and settles while a slotted image reveals beneath it, the trail thinning until the image holds clean. |
| `particle-text-dissolve` | component | Text assembles from a seeded particle cloud (or dissolves into it): per-particle targets sampled once from the rendered text bitmap at mount, table-driven parti |
| `pendulum-swing` | component | Content hangs from a fixed pivot and swings into rest with gravity-damped oscillation, like a hanging sign settling on its hook. |
| `physical-exit` | component | A card exits with physical momentum in toss, drop, or slide mode, carrying acceleration and rotation through the final offscreen pose without fading. |
| `radial-surround` | component | Labeled hairline chips assemble around a centered subject on an elliptical ring, then optionally converge inward with a subtle edge dim. The center never moves: |
| `scramble-reveal` | component | A deterministic hacker-style text reveal that cycles fixed glyph rows and locks the target string from left to right. |
| `scroll-feed` | component | A loop-friendly column of varied skeleton post cards scrolls upward with subtle motion trails and an agitated pace. |
| `slit-scan-reveal` | component | The frame's rows sample an authored subject at offset times: a canvas painter draws row slices of one pure position function evaluated at t minus offset(row), s |
| `social-proof-card` | component | The app-store close as one mountable scene: wordmark, five stars, a proof line, three feature icons and a CTA capsule build in a quiet stagger and hold - measur |
| `soft-blur-in` | component | A soft opacity, blur, and lift reveal for headlines, captions, and product UI callouts |
| `split-tilt-cards` | component | Two equal-weight cards arrive from opposite wings with mirrored rotateY book-open tilts under one shared perspective, pill badges spring-pop at each inner edge, |
| `spring-pop` | component | A badge pops in from a visible near-rest scale, overshoots full size once, and settles cleanly. |
| `stitched-text-draw` | component | Text drawn as thread stitches: a single-stroke display alphabet draws via attribute-driven dashoffset with stitch-tuned dash patterns, seeded angle jitter, need |
| `stop-motion-cadence` | component | The stepped-time law as a demo primitive: one driver quantizes timeline time to floor(t * fps) / fps and feeds ALL motion; four token paper-cut shapes throw-and |
| `svg-stroke-trace` | component | An authored SVG path draws from its measured length, holds with subtle drift, and optionally fills when the path is closed. |
| `swipe-rail` | component | A contact circle leads a horizontal card rail through a fast drag, momentum carry, and settled snap to the next card. |
| `testimonial-proof-card` | component | A quote card whose testimonial reveals per-line through a soft mask, with an avatar disc (initials default, image slot), mono name and role, an optional company |
| `text-shimmer` | component | A static headline receives one clean specular gradient sweep through its glyphs, then returns to its ordinary text color. |
| `trust-strip` | component | A monochrome trust row of wide-tracked mono wordmarks that fade in with an opacity-only left-to-right stagger, then hold dead still. |
| `variable-font-flex` | component | A word lands while its variable-font weight and width axes flex from hairline-condensed to black-wide with per-character stagger; font-size eases inversely so t |
| `velocity-throw-snap` | component | A five-shot rail whips past on a fast decaying curve, then overshoots and snaps the selected hero shot exactly to center. |
| `whiteboard-ink` | component | A whiteboard sketch draws one measured stroke at a time while a pen nib follows the active tip. Preset sketches (bulb, flow, rocket) or your own multi-stroke SV |

## Other (87)

| Name | Type | Description |
| --- | --- | --- |
| `apple-money-count` | block | Apple-style finance counter that counts from $0 to $10,000, flashes green, and bursts money icons with sound. |
| `blue-sweater-intro-video` | block | Warm AI creator intro sequence that resolves into an X follow card for @_blue_sweater_. |
| `cinemagraph` | block | A still photograph with one living region: the frame is frozen while a single feathered window keeps moving - here, steam rising over a cup - drawn from the see |
| `exploded-stack` | block | Isometric layer plates explode apart with a label beside each layer, hold, then collapse back into one stack. Built for architecture and system diagrams. |
| `flowchart` | block | Animated decision tree with SVG connectors, sticky-note nodes, cursor interaction, and typing correction |
| `flowchart-vertical` | block | Portrait animated decision tree with SVG connectors, sticky-note nodes, cursor interaction, and typing correction |
| `frost-sequence-camera-orbit` | block | An orbiting camera follows an ice logo as it breaks apart, reforms into two text moments, and fades. |
| `gooey-split` | block | A dot splits into a three-dot menu with a gooey metaball neck, spins into a swirl mark under directional shutter motion blur, then breaks back into three dots a |
| `heygen-avatar-promo-card` | block | A portrait HeyGen offer card pairs a moving avatar mosaic with bold promotional typography and a branded callout |
| `liquid-glass-notification` | block | Frosted glass notification cards floating over an aurora shader background |
| `liquid-glass-widgets` | block | Frosted glass stat cards, showcase panel and pill chips over an aurora shader background |
| `logo-outro` | block | Cinematic logo reveal with piece-by-piece assembly, glow bloom, tagline fade-in, and URL pill |
| `lottie-character-walk` | block | A jointed flat character walks in on planted feet, stops and points at a card; the body acting is a Lottie file and the stage is GSAP. |
| `mk-line-graph` | block | One or two SVG series draw on with dots popping and value labels riding the draw front; dim baseline axis, x-labels, color-dot legend |
| `mk-placeholder-grid` | block | N-up rounded-corner media grid (2-up, 3-up, 4-up, 3x2, hero plus two): per-cell inside-scale framing, staggered box-in entrance, slow settle |
| `mk-progress-stat` | block | Big-numeral statistic with count-up, label, thin progress track filling to value/max, and caption; light and dark schemes |
| `mk-specs-list` | block | Left-aligned specs/traits checklist over footage or a board: rows slide in staggered with an accent underline sweep; light and dark schemes |
| `north-korea-locked-down` | block | Realistic map zoom into North Korea with a red scribble circle, locked-down pop-up label, and reddish editorial wash. |
| `nyc-paris-flight` | block | Apple-style realistic map animation with a plane flying from New York to Paris, marker circle, landing pop, and sound effects. |
| `orbit-card` | block | A single feature card orbits a dot sphere on approved Blender camera motion. |
| `product-turntable` | block | A product turns a full revolution on a studio plinth in a seamless loop. Drop in a GLB or glTF model, or keep the built-in drink can with your own label. |
| `split-flap-board` | block | Solari-style departure board: every cell walks its drum forward through the intervening characters of a fixed alphabet until it lands on its target, so the text |
| `vfx-liquid-glass` | block | VFX composition block |
| `vfx-magnetic` | block | VFX composition block |
| `vfx-portal` | block | VFX composition block |
| `vfx-shatter` | block | VFX composition block |
| `vpn-youtube-spot` | block | Snappy Apple-style YouTube insert showing a phone finding and installing a friendly VPN app with sound effects. |
| `yt-logo-intro` | block | Logo stamp pops on a lined board, a kicker line gives way to the title with an accent arrow chip; seeded line distortion |
| `yt-vertical-fill` | block | Portrait media filling a widescreen frame via blurred-scale, mirror, or copy side fills; grid texture and foreground contrast lift (images inside the block; kee |
| `arc-motion-path` | component | A GSAP MotionPath primitive that flies a callout along a curved arc with autorotation. |
| `avatar-cloud` | component | Lettermark avatars populate a loose elliptical cloud while fine SVG links draw between the community and its central proof label. |
| `avatar-group-hover` | component | A distance-falloff avatar group lift with bouncy hover return |
| `badge-pop` | component | A transitions.dev-inspired notification badge pop with elastic scale and count reveal |
| `beat-timeline` | component | A paused master-timeline orchestration spine that pins titled beat rows to evenly spaced named labels. Each row enters on its label, holds with the sequence, th |
| `before-after-wipe` | component | Two full-bleed content slots compare before and after states as a persistent divider wipes the after layer over the before layer and rests at a configurable spl |
| `blur-in` | component | An Operator Black word-level content reveal that resolves its own text from controlled blur |
| `camera-rig-depth-stack` | component | A 3D camera-rig-style card stack with depth, parallax, and focus shift. |
| `caption-blend-difference` | component | Auto-inverting text using mix-blend-mode: difference — flips between white and black per-pixel against the background |
| `card-resize` | component | A transitions.dev-inspired card resize primitive that expands a compact card into a detail panel |
| `chromatic-aberration-wipe` | component | A fast slide wipe with RGB channel split on peak frames. |
| `colorama-wipe` | component | Headline reveal through a feathered, leaning wipe front that is blurred and colour-mapped as it passes, then settles to clean type and wipes off again — the Aft |
| `comparison-split` | component | Two full-bleed panels compare before and after states as a persistent divider wipes the vivid after layer over the muted before layer and rests at a configurabl |
| `confetti` | component | A deterministic celebration burst with seeded particles and gravity. |
| `device-frame-stage` | component | A phone or tablet mockup staged as a physical scene prop with a screen slot for arbitrary reconstructed UI, rising onto the stage, settling, and holding an idle |
| `directional-wipe` | component | A directional scene push that slides one panel over another. |
| `echo-smear` | component | Distance-adaptive streak — records each element's real trajectory (position, rotation, scale, opacity), then trails time-offset copies behind it in proportion t |
| `extended-keyframe` | component | The never-fully-lands arrival: an element covers most of its move in the first fifth of the duration and creeps the rest to the last frame, exits along its arri |
| `focus-swap` | component | Moves attention between two side-by-side cards as one recedes with scale, blur, and dimming while the other advances to full focus. |
| `icon-swap` | component | A scale-and-blur icon swap primitive for toolbar and action state changes |
| `input-feedback` | component | A transitions.dev-inspired input feedback primitive with shake, clear affordance, and success state |
| `keyframe-scrub-stack` | component | A keyframe-sequenced stack of cards with offset timing and easing presets. |
| `menu-morph` | component | A transitions.dev-inspired hamburger and plus-menu morph primitive for compact action menus |
| `mesh-gradient-bg` | component | A render-safe mesh gradient using animated radial layers. |
| `mk-usage-arc` | component | Thin circular gauge that draws on while its percentage counts up; one helper call drives both |
| `motion-blur` | component | After Effects-style motion blur — integrates each element over a shutter window (shutter angle, phase, samples per frame) by sampling the GSAP timeline at sub-f |
| `notification-pileup` | component | Mobile notification cards arrive faster and faster, each new alert pushing the existing stack downward into a dense, anxious tower. |
| `number-pop-in` | component | A transitions.dev-inspired digit pop-in with blur, lift, and staggered value reveal |
| `onboarding-stepper-flow` | component | A composed onboarding flow with milestone rail, active step card, and next-action button |
| `overwhelm-surround` | component | Tasks, tabs, pings, and notification bubbles accelerate inward around a calm central subject, turning overload into visible spatial pressure. |
| `page-slide` | component | A transitions.dev-inspired page slide primitive with outgoing and incoming panels |
| `panel-reveal` | component | A panel reveal primitive with height expansion and content fade |
| `pull-to-refresh` | component | A mobile list pulls through nonlinear rubber-band resistance, arms at a threshold, commits to a bounded loading indicator, then snaps exactly back to rest. |
| `separator` | component | A one-pixel structural separator with horizontal and vertical variants plus a seek-safe progress reveal |
| `settings-toggle-flow` | component | A composed settings flow with preference rows, toggle switches, and active-state feedback |
| `shimmer-sweep` | component | Animated light sweep across text or elements using a CSS gradient mask — ideal for AI accents and premium reveals |
| `shutter-slam` | component | One word thrown through six single-property beats under integrated shutter blur — two translate slams, a scale punch, then a full turn about each axis — on the  |
| `signup-flow` | component | A composed signup flow with social action, email field, password field, and submit button |
| `skeleton-reveal` | component | A skeleton loader transition that pulses, then cross-fades into content |
| `spotlight-card` | component | A card with a scripted cursor spotlight and lit border. |
| `stagger-cascade` | component | A responsive grid of tile cards that fades and travels into place with an evenly spaced per-item GSAP stagger. The ordered cascade is the only visual mechanic. |
| `stagger-lattice` | component | A staggered grid reveal inspired by Anime.js v4 stagger utilities, implemented with GSAP for HyperFrames. |
| `store-badge-lockup` | component | Settles a short headline above equal-size App Store and Google Play badges as a token-driven mobile end-card call to action. |
| `streaming-text` | component | Words arrive the way an AI answer streams - in uneven bursts on a measured token rhythm, each word landing grey and inking to full colour - rather than the even |
| `success-check` | component | A success check primitive with ring pop, path draw, and subtle rotate blur |
| `svg-line-draw-loader` | component | An Anime.js-style path drawing loader implemented as a seekable GSAP stroke timeline. |
| `svg-mask-reveal` | component | A soft token-colored sweep reveals media only through an editable SVG wordmark mask. |
| `tabs-slide-indicator` | component | A pill indicator transition that slides between active tabs |
| `terminal-simulator` | component | A terminal window types commands and streams log output. |
| `testimonial-card` | component | Reveals a customer quote at reading pace, then settles its avatar, author name, and handle beneath as a clean proof beat. |
| `text-stagger` | component | A transitions.dev-inspired text stagger primitive with enter, shimmer, and exit-ready words |
| `text-state-swap` | component | A text state swap primitive with outgoing blur and incoming lift |
| `three-orbiting-cards` | component | A Three.js-powered orbit scene driven by a paused GSAP timeline for deterministic renders. |
| `tilt-card` | component | A transitions.dev-inspired tilt card primitive with depth layers and hover-style parallax |
| `toggle-flip` | component | An oversized UI toggle switch that flips with real physicality: thumb overshoot, track color crossfade, and a soft press-compress before release. The reference  |
| `vector-editor-rig` | component | A dark design-tool app chrome with a live vector pen path, sequential anchor points, bezier handles, a selection frame, and theme-driven blue accents. |
| `x-follow-card` | component | A social follow card with avatar, handle, and follower motion. |
| `zoom-through-transition` | component | A transition that zooms through a focal card into the next scene. |
