// "Con sóng ở bến phía tây" — one motion screen built from 12 Gemini paper-cut layers
// (projects/eilean-mor/papercut/prompts.json). 15 fps = stop-motion poses; camera moves ease both ways.
//
// Beats (seconds):
//  0.0  establishing  sky + far sea + island, slow push in, light rain
//  4.5  west landing  cut closer: the geo, two keepers (cut-out) walk in hauling the rope box
//  9.0  wave rises    wave plate rises from below with parallax, McArthur runs in from the left
// 13.0  crash         wave-crash plate slams in (camera shake), spray + debris layers burst outward
// 17.5  why           cross-section of the geo: water forced in, shot up (diagram arrows animate)
// 22.0  aftermath     window view: oilskin on the peg, the white column of water far out at sea
import { lightLeak } from "@remotion/effects/light-leak";
import { rainFall } from "@remotion/effects/rain-fall";
import { vignette } from "@remotion/effects/vignette";
import { AbsoluteFill, Easing, Img, Sequence, Solid, interpolate, random, staticFile, useCurrentFrame } from "remotion";

export const WAVE_FPS = 15;
export const WAVE_DURATION_S = 26.5;
const s = (x: number) => Math.round(x * WAVE_FPS);
const io = Easing.inOut(Easing.cubic);
const out = Easing.out(Easing.cubic);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const boil = (f: number, k: string, a: number) => (random(`${k}-${Math.floor(f / 2)}`) - 0.5) * 2 * a;
const src = (n: string) => staticFile(`eilean/${n}`);

// a full-frame plate with a camera move (scale + pan), cover-fitted
const Plate: React.FC<{ name: string; f: number; d: number; from?: [number, number, number]; to?: [number, number, number]; opacity?: number; style?: React.CSSProperties }> = ({
  name,
  f,
  d,
  from = [1, 0, 0],
  to = [1.08, 0, 0],
  opacity = 1,
  style,
}) => {
  const k = interpolate(f, [0, s(d)], [0, 1], { ...clamp, easing: io });
  const sc = from[0] + (to[0] - from[0]) * k;
  const x = from[1] + (to[1] - from[1]) * k;
  const y = from[2] + (to[2] - from[2]) * k;
  return (
    <AbsoluteFill style={{ opacity, ...style }}>
      <Img src={src(name)} style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${sc}`, translate: `${x}px ${y}px` }} />
    </AbsoluteFill>
  );
};

// a cut-out sprite (transparent PNG) with paper drop shadow and boil
const Sprite: React.FC<{ name: string; x: number; y: number; w: number; rot?: number; f: number; k: string; opacity?: number; flip?: boolean }> = ({
  name,
  x,
  y,
  w,
  rot = 0,
  f,
  k,
  opacity = 1,
  flip,
}) => (
  <Img
    src={src(name)}
    style={{
      position: "absolute",
      left: x + boil(f, k + "x", 3),
      top: y + boil(f, k + "y", 3),
      width: w,
      rotate: `${rot + boil(f, k + "r", 0.8)}deg`,
      scale: flip ? "-1 1" : undefined,
      opacity,
      filter: "drop-shadow(10px 16px 6px rgba(17,35,59,0.45))",
    }}
  />
);

const Rain: React.FC<{ f: number; amount?: number }> = ({ f, amount = 0.5 }) => (
  <Solid width={1920} height={1080} color="transparent" style={{ position: "absolute", inset: 0 }} effects={[rainFall({ time: f / WAVE_FPS, opacity: amount })]} />
);

// ---------------- beats ----------------
const Establish: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plate name="pc01_sky.jpg" f={f} d={5} from={[1.05, 0, 0]} to={[1.08, -20, 0]} />
      <AbsoluteFill style={{ top: 260 }}>
        <Plate name="pc02_sea_far.jpg" f={f} d={5} from={[1.0, 0, 0]} to={[1.06, -40, 0]} style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 30%)" }} />
      </AbsoluteFill>
      <Plate name="pc03_island_lighthouse.jpg" f={f} d={5} from={[0.62, 260, 230]} to={[0.72, 180, 200]} style={{ maskImage: "radial-gradient(ellipse 60% 62% at 50% 52%, black 55%, transparent 80%)" }} />
      <Rain f={f} amount={0.35} />
    </AbsoluteFill>
  );
};

const Landing: React.FC = () => {
  const f = useCurrentFrame();
  const walk = interpolate(f, [0, s(4)], [0, 1], { ...clamp, easing: out });
  return (
    <AbsoluteFill>
      <Plate name="pc04_west_landing.jpg" f={f} d={4.5} from={[1.12, 40, 0]} to={[1.04, 0, 10]} />
      <Sprite name="pc08_keepers_cut.png" x={interpolate(walk, [0, 1], [-700, 120])} y={560} w={760} f={f} k="kp" />
      <Rain f={f} amount={0.45} />
    </AbsoluteFill>
  );
};

const Rise: React.FC = () => {
  const f = useCurrentFrame();
  const rise = interpolate(f, [0, s(3.2)], [0, 1], { ...clamp, easing: Easing.out(Easing.quad) });
  const run = interpolate(f, [s(1.2), s(4)], [0, 1], { ...clamp, easing: io });
  return (
    <AbsoluteFill>
      <Plate name="pc04_west_landing.jpg" f={f} d={4} from={[1.04, 0, 10]} to={[1.0, 0, 30]} />
      <Plate name="pc05_wave_rise.jpg" f={f} d={4} from={[1.0, 0, 0]} to={[1.1, 0, -30]} style={{ translate: `0 ${interpolate(rise, [0, 1], [1080, 0])}px`, maskImage: "linear-gradient(to bottom, transparent 0%, black 14%)" }} />
      <Sprite name="pc08_keepers_cut.png" x={120} y={600} w={700} f={f} k="kp2" opacity={interpolate(rise, [0.6, 1], [1, 0.9], clamp)} />
      <Sprite name="pc09_mcarthur_cut.png" x={interpolate(run, [0, 1], [-560, 1180])} y={300} w={460} rot={8} f={f} k="mc" />
      <Rain f={f} amount={0.55} />
    </AbsoluteFill>
  );
};

const Crash: React.FC = () => {
  const f = useCurrentFrame();
  const burst = interpolate(f, [0, s(2.6)], [0, 1], { ...clamp, easing: out });
  const shake = f < s(1.2) ? boil(f, "shake", 18 * (1 - f / s(1.2))) : 0;
  const pieces = Array.from({ length: 9 }, (_, i) => i);
  return (
    <AbsoluteFill style={{ translate: `${shake}px ${shake * 0.6}px` }}>
      <Plate name="pc06_wave_crash.jpg" f={f} d={4.5} from={[1.18, 0, 0]} to={[1.04, 0, 0]} />
      {/* white flash on impact */}
      <AbsoluteFill style={{ background: "#dfe8ee", opacity: interpolate(f, [0, 3, 8], [0.85, 0.5, 0], clamp) }} />
      <Sprite name="pc11_spray_cut.png" x={460 - burst * 120} y={interpolate(burst, [0, 1], [700, 40])} w={1000 + burst * 300} f={f} k="sp" opacity={interpolate(burst, [0, 0.15, 0.8, 1], [0, 1, 1, 0.6])} />
      {pieces.map((i) => {
        const a = (i / pieces.length) * Math.PI * 1.2 + Math.PI * 1.15;
        const dist = 260 + random(`d${i}`) * 520;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 960 + Math.cos(a) * dist * burst - 160,
              top: 620 + Math.sin(a) * dist * burst + burst * burst * 260 - 100,
              width: 320,
              height: 200,
              rotate: `${(random(`r${i}`) - 0.5) * 540 * burst}deg`,
              backgroundImage: `url(${src("pc10_debris_cut.png")})`,
              backgroundSize: "960px auto",
              backgroundPosition: `${-(i % 3) * 320}px ${-Math.floor(i / 3) * 170}px`,
              opacity: burst > 0.02 ? 1 : 0,
              filter: "drop-shadow(8px 12px 4px rgba(17,35,59,0.45))",
            }}
          />
        );
      })}
      <Rain f={f} amount={0.6} />
    </AbsoluteFill>
  );
};

const Why: React.FC = () => {
  const f = useCurrentFrame();
  // a slow "explainer" push into the cave mouth, then up the column of water
  return (
    <AbsoluteFill>
      <Plate name="pc07_geyser_cave.jpg" f={f} d={4.5} from={[1.0, 0, 40]} to={[1.22, 0, 120]} />
      <Solid
        width={1920}
        height={1080}
        color="transparent"
        style={{ position: "absolute", inset: 0 }}
        effects={[lightLeak({ progress: interpolate(f, [0, s(4.5)], [0.1, 0.6], clamp), seed: 3, hueShift: 190 })]}
      />
    </AbsoluteFill>
  );
};

const Aftermath: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Plate name="pc12_lighthouse_window.jpg" f={f} d={4.5} from={[1.12, 60, 0]} to={[1.0, 0, 0]} />
      <Solid width={1920} height={1080} color="transparent" style={{ position: "absolute", inset: 0 }} effects={[vignette({})]} />
    </AbsoluteFill>
  );
};

// paper flip between beats: the outgoing beat lifts away (scale + slight rotate) over the incoming one
const Beat: React.FC<{ children: React.ReactNode; d: number }> = ({ children, d }) => {
  const f = useCurrentFrame();
  const inK = interpolate(f, [0, 5], [0, 1], { ...clamp, easing: out });
  const outK = interpolate(f, [s(d) - 5, s(d)], [0, 1], clamp);
  return (
    <AbsoluteFill
      style={{
        clipPath: `inset(0 0 0 0)`,
        scale: `${interpolate(inK, [0, 1], [1.05, 1]) * interpolate(outK, [0, 1], [1, 1.04])}`,
        rotate: `${interpolate(inK, [0, 1], [-1.2, 0])}deg`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const BEATS: [number, number, React.FC][] = [
  [0, 4.5, Establish],
  [4.5, 4.5, Landing],
  [9.0, 4.0, Rise],
  [13.0, 4.5, Crash],
  [17.5, 4.5, Why],
  [22.0, 4.5, Aftermath],
];

export const WaveScene: React.FC = () => (
  <AbsoluteFill style={{ background: "#11233b" }}>
    {BEATS.map(([at, d, C]) => (
      <Sequence key={at} from={s(at)} durationInFrames={s(d)} name={C.name}>
        <Beat d={d}>
          <C />
        </Beat>
      </Sequence>
    ))}
  </AbsoluteFill>
);
