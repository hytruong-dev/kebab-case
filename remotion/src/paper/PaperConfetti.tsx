import { dropShadow } from "@remotion/effects/drop-shadow";
import { paper } from "@remotion/effects/paper";
import { Star, Triangle } from "@remotion/shapes";
import { AbsoluteFill, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { DAY as P } from "./palette";

// Transparent overlay: paper stars and triangles burst then flutter down, on twos.
// Rendered by Remotion as alpha WebM, layered by HyperFrames as a <video>.
const PIECES = 26;
const COLORS = [P.accent, P.sun, P.hillMid, P.paper, P.skyDeep];

export const PaperConfetti: React.FC = () => {
  const raw = useCurrentFrame();
  const frame = raw - (raw % 2);
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill>
      {Array.from({ length: PIECES }, (_, i) => {
        const r = (k: string) => random(`confetti-${i}-${k}`);
        const delay = Math.floor(r("d") * 10);
        const burst = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 70 } });
        const t = Math.max(0, frame - delay) / fps;
        const angle = r("a") * Math.PI * 2;
        const dist = 260 + r("r") * 520;
        const x = width / 2 + Math.cos(angle) * dist * burst + Math.sin(t * 2 + i) * 30;
        const y = height / 2 + Math.sin(angle) * dist * burst * 0.6 + t * t * 120;
        const rot = r("rot") * 360 + t * (r("s") - 0.5) * 400;
        const color = COLORS[i % COLORS.length];
        const size = 30 + r("sz") * 40;
        const effects = [
          paper({ colorFront: "#ffffff", colorBack: "#eadfc8", amount: 0.8, seed: i }),
          dropShadow({ offsetX: 3, offsetY: 6, radius: 6, opacity: 0.35, color: "#2a211b" }),
        ];
        return (
          <div key={i} style={{ position: "absolute", left: x - size, top: y - size, rotate: `${rot}deg`, opacity: burst }}>
            {i % 2 === 0 ? (
              <Star points={5} innerRadius={size * 0.45} outerRadius={size} cornerRadius={4} fill={color} effects={effects} />
            ) : (
              <Triangle length={size * 1.6} direction="up" cornerRadius={4} fill={color} effects={effects} />
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
