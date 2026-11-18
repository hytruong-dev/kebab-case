import { loadFont } from "@remotion/google-fonts/Baloo2";

// Baloo 2 ships a Vietnamese subset, so Vietnamese titles render with real diacritics.
export const { fontFamily: TITLE_FONT } = loadFont("normal", {
  weights: ["700", "800"],
  subsets: ["latin", "vietnamese"],
});
