// One palette for both engines: Remotion imports shared/palette.json here,
// scripts/sync-palette.mjs writes the same values to hyperframes/assets/palette.css.
import palette from "../../../shared/palette.json";

export type Palette = typeof palette;
export const DAY: Palette = palette;

// Dusk: same layers, re-lit. Kept here (not in JSON) because it is derived.
export const DUSK: Palette = {
  ...palette,
  sky: "#3b3358",
  skyDeep: "#5a4a7a",
  sun: "#f6e7c1",
  hillBack: "#6c6a92",
  hillMid: "#47507a",
  hillFront: "#28304f",
  accent: "#f0a43a",
};
