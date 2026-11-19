// Eilean Mòr opening frame assembled from 22 Gemini paper-cut layers (projects/eilean-mor/layers/prompts.json),
// generated via Playwright MCP, watermark-removed, white background cut out.
// Technique: skill learned/paper-buildup-assembly — fixed camera, pieces arrive in order
// ground (0-1.2s) → big masses (1.2-3.6s) → mid details (3.6-6s) → small extras (6-8.5s), idle motion after landing.
import { paper } from "@remotion/effects/paper";
import { AbsoluteFill, Img, Solid, staticFile, useCurrentFrame } from "remotion";
import { Assemble, type Piece } from "../paper/Assemble";
import { Beam, P, Stars, flash2 } from "./kit";

export const LAYER_FPS = 15;
export const LAYER_DURATION_S = 9.5;

const L = (name: string, w: number) => (
  <Img
    src={staticFile(`eilean/layers/${name}.png`)}
    style={{ width: w, display: "block", filter: "drop-shadow(8px 14px 6px rgba(10,16,30,0.5))" }}
  />
);

// x/y = top-left in the 1920x1080 frame; widths chosen so the finished frame is full edge to edge
const PIECES: Piece[] = [
  // 1. ground — full-width sea strips, back to front
  { id: "sea-back", at: 0.0, entry: "rise", x: -340, y: 680, z: 2, idle: { bob: 4, period: 3.2 }, node: L("L01_sea_back", 2600) },
  { id: "sea-mid", at: 0.35, entry: "rise", x: -300, y: 800, z: 6, idle: { bob: 6, period: 2.7 }, node: L("L02_sea_mid", 2600) },
  { id: "sea-front", at: 0.7, entry: "rise", x: -360, y: 905, z: 10, idle: { bob: 8, period: 2.3 }, node: L("L03_sea_front", 2600) },
  // 2. big masses
  { id: "island", at: 1.2, entry: "rise", x: 470, y: 400, z: 3, node: L("L04_island", 1000) },
  { id: "lighthouse", at: 1.7, entry: "unfold", x: 760, y: 40, z: 4, node: L("L05_lighthouse", 420) },
  { id: "cloud-a", at: 2.2, entry: "slideL", x: -60, y: 40, z: 1, idle: { drift: 5 }, node: L("L06_cloud_a", 640) },
  { id: "cloud-b", at: 2.5, entry: "slideR", x: 1300, y: 70, z: 1, idle: { drift: -4 }, node: L("L07_cloud_b", 600) },
  { id: "ship", at: 2.9, entry: "slideL", x: -20, y: 560, z: 7, idle: { bob: 7, sway: 1.5, period: 2.4 }, node: L("L08_ship", 560) },
  // 3. mid details
  { id: "rock-left", at: 3.6, entry: "pop", x: 330, y: 690, z: 8, node: L("L09_rock_left", 230) },
  { id: "rock-right", at: 3.85, entry: "pop", x: 1390, y: 700, z: 8, node: L("L10_rock_right", 300) },
  { id: "ducat", at: 4.2, entry: "drop", x: 600, y: 300, z: 9, idle: { sway: 2 }, node: L("L11_keeper_ducat", 70) },
  { id: "marshall", at: 4.45, entry: "drop", x: 670, y: 302, z: 9, idle: { sway: 2 }, node: L("L12_keeper_marshall", 62) },
  { id: "mcarthur", at: 4.7, entry: "drop", x: 1170, y: 330, z: 9, idle: { sway: 2 }, node: L("L13_keeper_mcarthur", 76) },
  { id: "crate", at: 5.05, entry: "pop", x: 1250, y: 430, z: 9, node: L("L14_crate", 90) },
  { id: "flag", at: 5.35, entry: "unfold", x: 520, y: 290, z: 9, idle: { sway: 6, period: 1.2 }, node: L("L15_flag", 130) },
  // 4. small extras filling the edges
  { id: "gull-a", at: 6.0, entry: "slideR", x: 1480, y: 330, z: 11, idle: { bob: 14, drift: -14, period: 1.4 }, node: L("L16_gull_a", 170) },
  { id: "gull-b", at: 6.3, entry: "slideL", x: 300, y: 250, z: 11, idle: { bob: 12, drift: 12, period: 1.6 }, node: L("L17_gull_b", 130) },
  { id: "foam-a", at: 6.6, entry: "pop", x: 560, y: 885, z: 12, idle: { bob: 5 }, node: L("L18_foam_a", 300) },
  { id: "foam-b", at: 6.85, entry: "pop", x: 1150, y: 860, z: 12, idle: { bob: 6, sway: 3 }, node: L("L19_foam_b", 160) },
  { id: "buoy", at: 7.1, entry: "pop", x: 1660, y: 780, z: 12, idle: { bob: 10, sway: 8, period: 1.8 }, node: L("L20_buoy", 140) },
  { id: "moon", at: 7.4, entry: "pop", x: 1700, y: 20, z: 1, node: L("L21_moon", 200) },
  { id: "rock-small", at: 7.7, entry: "pop", x: 60, y: 840, z: 12, idle: { bob: 3 }, node: L("L22_rock_small", 230) },
];

export const LayerAssemble: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / LAYER_FPS;
  const lit = t > 8.2 ? flash2(t - 8.2, 2.2) : 0; // payoff: the lamp switches on once the frame is complete
  return (
    <AbsoluteFill>
      <Solid width={1920} height={1080} color={P.night} effects={[paper({ colorFront: "#ffffff", colorBack: "#c9c2b4", amount: 0.9, seed: 21, folds: 0.4 })]} />
      <Stars f={f} n={34} />
      <Assemble pieces={PIECES} />
      <Beam cx={760 + 210} cy={40 + 245} angle={-25 + (t - 8.2) * 45} power={lit} />
    </AbsoluteFill>
  );
};
