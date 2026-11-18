import { AbsoluteFill, HtmlInCanvas, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TITLE_FONT } from "../paper/font";
import { DAY as P } from "../paper/palette";
import { EFFECTS } from "./effects-catalog";

export const COLS = 10;
export const TILE_W = 180;
export const TILE_H = 110;
const GAP_X = 10;
const LABEL_H = 22;
const ROW_H = TILE_H + LABEL_H + 6;

export const galleryHeight = () => 90 + Math.ceil(EFFECTS.length / COLS) * ROW_H + 20;

// The same small paper-cut scene is the source for every tile, so effects compare fairly.
const Swatch: React.FC = () => (
  <div style={{ width: TILE_W, height: TILE_H, backgroundColor: P.sky, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 120, top: 14, width: 40, height: 40, borderRadius: 20, backgroundColor: P.sun }} />
    <svg width={TILE_W} height={TILE_H} style={{ position: "absolute", inset: 0 }}>
      <path d="M0 70 Q 45 40 90 66 T 180 58 L180 110 L0 110 Z" fill={P.hillBack} />
      <path d="M0 88 Q 60 62 120 86 T 180 84 L180 110 L0 110 Z" fill={P.hillFront} />
    </svg>
    <div
      style={{
        position: "absolute",
        left: 14,
        top: 16,
        fontFamily: TITLE_FONT,
        fontWeight: 800,
        fontSize: 26,
        color: P.ink,
      }}
    >
      Giấy
    </div>
  </div>
);

export const EffectsGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // Progress ping-pongs 0 -> 1 -> 0, so every time-driven effect shows its full range.
  const p = interpolate(frame, [0, durationInFrames / 2, durationInFrames - 1], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1f1b17", fontFamily: TITLE_FONT }}>
      <div style={{ position: "absolute", left: 20, top: 18, color: P.paper, fontSize: 40, fontWeight: 800 }}>
        @remotion/effects — {EFFECTS.length} effects
      </div>
      {EFFECTS.map((e, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const left = 20 + col * (TILE_W + GAP_X);
        const top = 90 + row * ROW_H;
        return (
          <div key={e.name} style={{ position: "absolute", left, top }}>
            <HtmlInCanvas width={TILE_W} height={TILE_H} effects={e.make(p)}>
              <Swatch />
            </HtmlInCanvas>
            <div style={{ color: "#d8c29c", fontSize: 16, fontWeight: 700, marginTop: 2, whiteSpace: "nowrap" }}>
              {e.name}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
