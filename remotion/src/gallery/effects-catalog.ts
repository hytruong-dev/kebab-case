// Every effect exported by @remotion/effects 4.0.544, with paper-cut-friendly params.
// `p` is 0..1 progress through the tile's showcase, so time-driven effects animate.
import type { EffectDescriptor } from "remotion";
import { barrelDistortion } from "@remotion/effects/barrel-distortion";
import { bevelAlpha } from "@remotion/effects/bevel-alpha";
import { blur } from "@remotion/effects/blur";
import { brightness } from "@remotion/effects/brightness";
import { burlap } from "@remotion/effects/burlap";
import { checkerboard } from "@remotion/effects/checkerboard";
import { chromaticAberration } from "@remotion/effects/chromatic-aberration";
import { colorCorrection } from "@remotion/effects/color-correction";
import { colorKey } from "@remotion/effects/color-key";
import { contourLines } from "@remotion/effects/contour-lines";
import { contrast } from "@remotion/effects/contrast";
import { cornerPin } from "@remotion/effects/corner-pin";
import { curves } from "@remotion/effects/curves";
import { cylinder } from "@remotion/effects/cylinder";
import { dotGrid } from "@remotion/effects/dot-grid";
import { dropShadow } from "@remotion/effects/drop-shadow";
import { duotone } from "@remotion/effects/duotone";
import { emboss } from "@remotion/effects/emboss";
import { evolve } from "@remotion/effects/evolve";
import { exposure } from "@remotion/effects/exposure";
import { filmBurn } from "@remotion/effects/film-burn";
import { fisheye } from "@remotion/effects/fisheye";
import { flannel } from "@remotion/effects/flannel";
import { fractalNoise } from "@remotion/effects/fractal-noise";
import { glow } from "@remotion/effects/glow";
import { grayscale } from "@remotion/effects/grayscale";
import { gridlines } from "@remotion/effects/gridlines";
import { halftone } from "@remotion/effects/halftone";
import { halftoneLinearGradient } from "@remotion/effects/halftone-linear-gradient";
import { hue } from "@remotion/effects/hue";
import { invert } from "@remotion/effects/invert";
import { irisWipe } from "@remotion/effects/iris-wipe";
import { lensBlur } from "@remotion/effects/lens-blur";
import { levels } from "@remotion/effects/levels";
import { lightLeak } from "@remotion/effects/light-leak";
import { lightTrail } from "@remotion/effects/light-trail";
import { lightning } from "@remotion/effects/lightning";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { linearGradientTint } from "@remotion/effects/linear-gradient-tint";
import { linearProgressiveBlur } from "@remotion/effects/linear-progressive-blur";
import { linearProgressivePixelate } from "@remotion/effects/linear-progressive-pixelate";
import { lines } from "@remotion/effects/lines";
import { liquidContours } from "@remotion/effects/liquid-contours";
import { longShadows } from "@remotion/effects/long-shadows";
import { magnify } from "@remotion/effects/magnify";
import { mirror } from "@remotion/effects/mirror";
import { noise } from "@remotion/effects/noise";
import { noiseDisplacement } from "@remotion/effects/noise-displacement";
import { outline } from "@remotion/effects/outline";
import { pageTurn } from "@remotion/effects/page-turn";
import { paper } from "@remotion/effects/paper";
import { pattern } from "@remotion/effects/pattern";
import { pixelDissolve } from "@remotion/effects/pixel-dissolve";
import { pixelate } from "@remotion/effects/pixelate";
import { radialProgressiveBlur } from "@remotion/effects/radial-progressive-blur";
import { radialProgressivePixelate } from "@remotion/effects/radial-progressive-pixelate";
import { radialWipe } from "@remotion/effects/radial-wipe";
import { rainFall } from "@remotion/effects/rain-fall";
import { regionBlur } from "@remotion/effects/region-blur";
import { rings } from "@remotion/effects/rings";
import { roughenEdges } from "@remotion/effects/roughen-edges";
import { saturation } from "@remotion/effects/saturation";
import { scale } from "@remotion/effects/scale";
import { scanlines } from "@remotion/effects/scanlines";
import { shadowsHighlights } from "@remotion/effects/shadows-highlights";
import { shatter } from "@remotion/effects/shatter";
import { shine } from "@remotion/effects/shine";
import { shrinkwrap } from "@remotion/effects/shrinkwrap";
import { skew } from "@remotion/effects/skew";
import { snowFall } from "@remotion/effects/snow-fall";
import { speckle } from "@remotion/effects/speckle";
import { sphere } from "@remotion/effects/sphere";
import { starburst } from "@remotion/effects/starburst";
import { tear } from "@remotion/effects/tear";
import { thermalVision } from "@remotion/effects/thermal-vision";
import { tile } from "@remotion/effects/tile";
import { tint } from "@remotion/effects/tint";
import { uvTranslate, xyTranslate } from "@remotion/effects/translate";
import { turbulentDisplace } from "@remotion/effects/turbulent-displace";
import { tvSignalOff } from "@remotion/effects/tv-signal-off";
import { venetianBlinds } from "@remotion/effects/venetian-blinds";
import { vibrance } from "@remotion/effects/vibrance";
import { vignette } from "@remotion/effects/vignette";
import { wave } from "@remotion/effects/wave";
import { waves } from "@remotion/effects/waves";
import { whiteBalance } from "@remotion/effects/white-balance";
import { whiteNoise } from "@remotion/effects/white-noise";
import { zigzag } from "@remotion/effects/zigzag";
import { zoomBlur } from "@remotion/effects/zoom-blur";

export type EffectEntry = {
  readonly name: string;
  readonly group: "paper" | "color" | "blur" | "light" | "distort" | "texture" | "edge" | "reveal" | "3d" | "weather";
  readonly make: (p: number) => EffectDescriptor<unknown>[];
};

export const EFFECTS: EffectEntry[] = [
  // Paper-cut core
  { name: "paper", group: "paper", make: () => [paper({ amount: 1, colorFront: "#ffffff", colorBack: "#e6d6b8" })] },
  { name: "roughenEdges", group: "paper", make: () => [roughenEdges({ border: 14 })] },
  { name: "tear", group: "paper", make: (p) => [tear({ progress: p })] },
  { name: "pageTurn", group: "paper", make: (p) => [pageTurn({ foldPosition: [1.1 - p * 0.9, 0.5], foldDirection: -75 })] },
  { name: "dropShadow", group: "paper", make: () => [dropShadow({ offsetX: 10, offsetY: 14, radius: 14, opacity: 0.5 })] },
  { name: "longShadows", group: "paper", make: () => [longShadows({ length: 60, angle: 45, opacity: 0.5 })] },
  { name: "bevelAlpha", group: "paper", make: () => [bevelAlpha({ edgeThickness: 10 })] },
  { name: "emboss", group: "paper", make: () => [emboss({})] },
  { name: "shrinkwrap", group: "paper", make: (p) => [shrinkwrap({ phase: p * 6 })] },
  { name: "burlap", group: "paper", make: () => [burlap({})] },
  { name: "flannel", group: "paper", make: () => [flannel({})] },
  // Colour and tone
  { name: "brightness", group: "color", make: () => [brightness({})] },
  { name: "contrast", group: "color", make: () => [contrast({})] },
  { name: "colorCorrection", group: "color", make: () => [colorCorrection({})] },
  { name: "colorKey", group: "color", make: () => [colorKey({})] },
  { name: "curves", group: "color", make: () => [curves({})] },
  { name: "duotone", group: "color", make: () => [duotone({ darkColor: "#2a211b", lightColor: "#f0a43a" })] },
  { name: "exposure", group: "color", make: () => [exposure({})] },
  { name: "grayscale", group: "color", make: () => [grayscale({})] },
  { name: "hue", group: "color", make: (p) => [hue({ degrees: p * 360 })] },
  { name: "invert", group: "color", make: () => [invert({})] },
  { name: "levels", group: "color", make: () => [levels({})] },
  { name: "linearGradient", group: "color", make: () => [linearGradient({})] },
  { name: "linearGradientTint", group: "color", make: () => [linearGradientTint({})] },
  { name: "saturation", group: "color", make: () => [saturation({})] },
  { name: "shadowsHighlights", group: "color", make: () => [shadowsHighlights({})] },
  { name: "thermalVision", group: "color", make: () => [thermalVision({})] },
  { name: "tint", group: "color", make: () => [tint({ color: "#d9553b", amount: 0.5 })] },
  { name: "vibrance", group: "color", make: () => [vibrance({})] },
  { name: "whiteBalance", group: "color", make: () => [whiteBalance({})] },
  // Blur
  { name: "blur", group: "blur", make: (p) => [blur({ radius: 2 + p * 14 })] },
  { name: "lensBlur", group: "blur", make: () => [lensBlur({})] },
  { name: "linearProgressiveBlur", group: "blur", make: () => [linearProgressiveBlur({})] },
  { name: "radialProgressiveBlur", group: "blur", make: () => [radialProgressiveBlur({})] },
  { name: "regionBlur", group: "blur", make: () => [regionBlur({ topLeft: [0.2, 0.2], bottomRight: [0.8, 0.8], blurRadius: 16 })] },
  { name: "zoomBlur", group: "blur", make: () => [zoomBlur({})] },
  { name: "lightTrail", group: "blur", make: () => [lightTrail({})] },
  // Light
  { name: "glow", group: "light", make: () => [glow({})] },
  { name: "lightLeak", group: "light", make: (p) => [lightLeak({ progress: p })] },
  { name: "shine", group: "light", make: (p) => [shine({ progress: p })] },
  { name: "starburst", group: "light", make: (p) => [starburst({ rays: 14, colors: ["#f0a43a", "#fbf4e6"], rotation: p * 90 })] },
  { name: "vignette", group: "light", make: () => [vignette({})] },
  { name: "lightning", group: "light", make: () => [lightning({})] },
  // Distortion and transforms
  { name: "barrelDistortion", group: "distort", make: () => [barrelDistortion({})] },
  { name: "chromaticAberration", group: "distort", make: () => [chromaticAberration({})] },
  { name: "cornerPin", group: "distort", make: () => [cornerPin({})] },
  { name: "fisheye", group: "distort", make: () => [fisheye({})] },
  { name: "magnify", group: "distort", make: (p) => [magnify({ center: [0.2 + p * 0.6, 0.5], size: 60 })] },
  { name: "mirror", group: "distort", make: () => [mirror({})] },
  { name: "noiseDisplacement", group: "distort", make: (p) => [noiseDisplacement({ center: [0.5, 0.5], radius: 0.5, seed: Math.floor(p * 8) })] },
  { name: "scale", group: "distort", make: (p) => [scale({ scale: 0.6 + p * 0.4 })] },
  { name: "skew", group: "distort", make: () => [skew({})] },
  { name: "tile", group: "distort", make: () => [tile({})] },
  { name: "xyTranslate", group: "distort", make: (p) => [xyTranslate({ x: (p - 0.5) * 80 })] },
  { name: "uvTranslate", group: "distort", make: (p) => [uvTranslate({ v: (p - 0.5) * 0.3 })] },
  { name: "turbulentDisplace", group: "distort", make: (p) => [turbulentDisplace({ evolution: p * 4 })] },
  { name: "wave", group: "distort", make: (p) => [wave({ phase: p * 10 })] },
  { name: "shatter", group: "distort", make: (p) => [shatter({ time: p * 2 })] },
  // Textures and patterns
  { name: "checkerboard", group: "texture", make: () => [checkerboard({})] },
  { name: "contourLines", group: "texture", make: () => [contourLines({})] },
  { name: "dotGrid", group: "texture", make: () => [dotGrid({})] },
  { name: "fractalNoise", group: "texture", make: (p) => [fractalNoise({ evolution: p * 4 })] },
  { name: "gridlines", group: "texture", make: () => [gridlines({})] },
  { name: "halftone", group: "texture", make: () => [halftone({ dotSize: 10, colorMode: "source" })] },
  { name: "halftoneLinearGradient", group: "texture", make: () => [halftoneLinearGradient({})] },
  { name: "lines", group: "texture", make: (p) => [lines({ offset: p * 40 })] },
  { name: "liquidContours", group: "texture", make: (p) => [liquidContours({ phase: p * 6 })] },
  { name: "noise", group: "texture", make: () => [noise({})] },
  { name: "pattern", group: "texture", make: () => [pattern({})] },
  { name: "rings", group: "texture", make: (p) => [rings({ offset: p * 40 })] },
  { name: "scanlines", group: "texture", make: (p) => [scanlines({ offset: p * 40 })] },
  { name: "speckle", group: "texture", make: () => [speckle({})] },
  { name: "tvSignalOff", group: "texture", make: () => [tvSignalOff({})] },
  { name: "waves", group: "texture", make: (p) => [waves({ phase: p * 6 })] },
  { name: "whiteNoise", group: "texture", make: () => [whiteNoise({})] },
  { name: "zigzag", group: "texture", make: (p) => [zigzag({ offset: p * 40 })] },
  // Edges
  { name: "outline", group: "edge", make: () => [outline({ width: 6, color: "#2a211b" })] },
  // Reveals (progress-driven, use as in/out transitions on a single layer)
  { name: "evolve", group: "reveal", make: (p) => [evolve({ progress: p })] },
  { name: "filmBurn", group: "reveal", make: (p) => [filmBurn({ progress: p })] },
  { name: "irisWipe", group: "reveal", make: (p) => [irisWipe({ outerRadius: 10 + p * 110, points: 6, feather: 4 })] }, // radius in px
  { name: "linearProgressivePixelate", group: "reveal", make: () => [linearProgressivePixelate({})] },
  { name: "pixelate", group: "reveal", make: (p) => [pixelate({ blockSize: 2 + Math.round(p * 20) })] },
  { name: "pixelDissolve", group: "reveal", make: (p) => [pixelDissolve({ progress: p })] },
  { name: "radialProgressivePixelate", group: "reveal", make: () => [radialProgressivePixelate({})] },
  { name: "radialWipe", group: "reveal", make: (p) => [radialWipe({ progress: p })] },
  { name: "venetianBlinds", group: "reveal", make: (p) => [venetianBlinds({ progress: p })] },
  // 3D (WebGPU)
  { name: "cylinder", group: "3d", make: (p) => [cylinder({ rotation: p * 360 })] },
  { name: "sphere", group: "3d", make: (p) => [sphere({ rotationY: p * 360 })] },
  // Weather
  { name: "rainFall", group: "weather", make: (p) => [rainFall({ time: p * 3 })] },
  { name: "snowFall", group: "weather", make: (p) => [snowFall({ time: p * 3 })] },
];
