import { paper } from "@remotion/effects/paper";
import { getLength, getPointAtLength, getTangentAtLength } from "@remotion/paths";
import { Circle, Ellipse } from "@remotion/shapes";
import { dropShadow } from "@remotion/effects/drop-shadow";
import { roughenEdges } from "@remotion/effects/roughen-edges";
import { AbsoluteFill, Easing, Solid, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TITLE_FONT } from "./font";
import { ridgePath } from "./hills";
import { DAY, DUSK } from "./palette";
import { PaperLayer } from "./PaperLayer";

export type PaperLandscapeProps = {
  readonly title: string;
  readonly subtitle: string;
  readonly variant: "day" | "dusk";
};

const W = 1920;
const H = 1080;

// Stop-motion lives on "twos": the picture changes every 2nd frame (15 poses/s at 30 fps).
const onTwos = (frame: number) => frame - (frame % 2);

// Hand-placed paper wobbles: re-posed every 4 frames, seeded, so every render is identical.
const boil = (frame: number, seed: string, amount: number) => {
  const step = Math.floor(frame / 4);
  return (random(`${seed}-${step}`) - 0.5) * 2 * amount;
};

const BIRD_PATH = "M -200 520 C 300 300, 700 640, 1100 380 S 1700 240, 2150 330";

export const PaperLandscape: React.FC<PaperLandscapeProps> = ({ title, subtitle, variant }) => {
  const frame = onTwos(useCurrentFrame());
  const { fps, durationInFrames } = useVideoConfig();
  const P = variant === "dusk" ? DUSK : DAY;

  // Layers land back-to-front with a premium spring (no bounce on the big sheets).
  const land = (delay: number, damping = 18) =>
    spring({ frame: frame - delay, fps, config: { damping, stiffness: 90, mass: 0.9 } });

  const hills = [
    { key: "back", color: P.hillBack, baseY: 520, amp: 90, freq: 0.0021, seed: "hb", delay: 4, depth: 4, drift: 18 },
    { key: "mid", color: P.hillMid, baseY: 640, amp: 70, freq: 0.0032, seed: "hm", delay: 10, depth: 8, drift: 40 },
    { key: "front", color: P.hillFront, baseY: 790, amp: 55, freq: 0.0045, seed: "hf", delay: 16, depth: 14, drift: 80 },
  ];

  // Slow camera pan: each layer drifts by its own amount = parallax.
  const pan = interpolate(frame, [0, durationInFrames], [0, 1], { easing: Easing.inOut(Easing.sin) });

  const sunRise = land(0, 14);
  const sunY = interpolate(sunRise, [0, 1], [760, 300]);

  const birdLen = getLength(BIRD_PATH);
  const birdT = interpolate(frame, [40, durationInFrames - 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const birdPt = getPointAtLength(BIRD_PATH, birdT * birdLen) ?? { x: -200, y: 520 };
  const birdTan = getTangentAtLength(BIRD_PATH, birdT * birdLen) ?? { x: 1, y: 0 };
  const birdAngle = (Math.atan2(birdTan.y, birdTan.x) * 180) / Math.PI;
  const flap = Math.floor(frame / 4) % 2 === 0 ? 1 : 0.55;

  const titleIn = land(34, 11);
  const titleRot = interpolate(titleIn, [0, 1], [-14, -2]) + boil(frame, "title", 0.8);

  return (
    <AbsoluteFill style={{ backgroundColor: P.sky }}>
      {/* Sky sheet: paper texture only, no torn edge (it is the backing board). */}
      <Solid
        width={W}
        height={H}
        color={P.sky}
        effects={[paper({ colorFront: "#ffffff", colorBack: "#e6d6b8", amount: 1, seed: 3, folds: 0.5 })]}
      />

      {/* Sun: a cut paper disc that rises. */}
      <div style={{ position: "absolute", left: 1320 - 130, top: sunY - 130, rotate: `${boil(frame, "sun", 1.5)}deg` }}>
        <Circle
          radius={130}
          fill={P.sun}
          effects={[
            paper({ colorFront: "#ffffff", colorBack: "#f1dcb6", amount: 0.9, seed: 9 }),
            roughenEdges({ border: 6, seed: 40 }),
            dropShadow({ offsetX: 3, offsetY: 6, radius: 8, opacity: 0.3, color: "#2a211b" }),
          ]}
        />
      </div>

      {/* Clouds: drift on twos, a step at a time. */}
      {[
        { x: 260, y: 170, rx: 150, ry: 46, speed: 0.6, seed: 21 },
        { x: 980, y: 120, rx: 110, ry: 36, speed: 0.9, seed: 22 },
        { x: 1560, y: 210, rx: 170, ry: 50, speed: 0.45, seed: 23 },
      ].map((c) => (
        <div key={c.seed} style={{ position: "absolute", left: c.x - c.rx + frame * c.speed, top: c.y - c.ry }}>
          <Ellipse
            rx={c.rx}
            ry={c.ry}
            fill={P.paper}
            effects={[
              paper({ colorFront: "#ffffff", colorBack: "#eadfc8", amount: 0.8, seed: c.seed }),
              roughenEdges({ border: 5, seed: c.seed * 3 }),
              dropShadow({ offsetX: 2, offsetY: 5, radius: 6, opacity: 0.25, color: "#2a211b" }),
            ]}
          />
        </div>
      ))}

      {/* Bird: follows a path, banks along its tangent, flaps on fours. */}
      <div
        style={{
          position: "absolute",
          left: birdPt.x - 50,
          top: birdPt.y - 30,
          rotate: `${birdAngle}deg`,
          scale: `1 ${flap}`,
          opacity: birdT > 0 && birdT < 1 ? 1 : 0,
        }}
      >
        <svg width={100} height={60} viewBox="0 0 100 60">
          <path d="M 0 30 L 55 22 L 100 30 L 55 38 Z" fill={P.ink} />
          <path d="M 30 28 L 62 0 L 58 28 Z" fill={P.accent} />
        </svg>
      </div>

      {/* Hills: three torn sheets landing back-to-front, each panning by its own depth. */}
      {hills.map((h) => {
        const p = land(h.delay);
        const y = interpolate(p, [0, 1], [H - h.baseY + 120, 0]);
        const x = -pan * h.drift;
        return (
          <PaperLayer
            key={h.key}
            width={W + 200}
            height={H}
            seed={h.baseY}
            depth={h.depth}
            style={{ position: "absolute", left: -100 + x, top: y }}
          >
            <svg width={W + 200} height={H} viewBox={`0 0 ${W + 200} ${H}`}>
              <path
                d={ridgePath({ width: W + 200, height: H, baseY: h.baseY, amplitude: h.amp, frequency: h.freq, seed: h.seed })}
                fill={h.color}
              />
            </svg>
          </PaperLayer>
        );
      })}

      {/* Title tag: a paper label tossed in, held dead still except for the boil. */}
      <PaperLayer
        width={1100}
        height={300}
        seed={77}
        depth={16}
        style={{
          position: "absolute",
          left: 120,
          top: 380 + interpolate(titleIn, [0, 1], [700, 0]),
          rotate: `${titleRot}deg`,
        }}
      >
        <div
          style={{
            width: 1100,
            height: 300,
            backgroundColor: P.paper,
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 60,
            fontFamily: TITLE_FONT,
            color: P.ink,
          }}
        >
          <div style={{ fontSize: 110, fontWeight: 800, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 46, fontWeight: 700, color: P.accent, marginTop: 14 }}>{subtitle}</div>
        </div>
      </PaperLayer>
    </AbsoluteFill>
  );
};
