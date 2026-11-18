// Paper-cut set pieces for "Eilean Mòr". Every visible thing is a cut sheet (PaperLayer: fibre + torn edge + shadow).
// Plate renders at 15 fps, so every frame is already a stop-motion pose (TASTE-02 "on twos" at 30 fps output).
import { noise2D } from "@remotion/noise";
import { paper } from "@remotion/effects/paper";
import { rainFall } from "@remotion/effects/rain-fall";
import { Easing, Solid, interpolate, random, spring } from "remotion";
import { TITLE_FONT } from "../paper/font";
import { DAY } from "../paper/palette";
import { PaperLayer } from "../paper/PaperLayer";

export const P = DAY as typeof DAY & Record<string, string>;
export const FPS = 15;
export const W = 1920;
export const H = 1080;

// ---------- timing helpers (local frame f, values in seconds) ----------
export const sec = (s: number) => Math.round(s * FPS);
export const ramp = (f: number, a: number, b: number, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(f, [sec(a), Math.max(sec(a) + 1, sec(b))], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
export const land = (f: number, delay: number, damping = 14) =>
  spring({ frame: f - sec(delay), fps: FPS, config: { damping, stiffness: 110, mass: 0.8 } });
// hand-placed paper wobble: new pose every 2 plate frames, seeded (pure function of f)
export const boil = (f: number, key: string, amt: number) => (random(`${key}-${Math.floor(f / 2)}`) - 0.5) * 2 * amt;

// ---------- a cut sheet ----------
type CutProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  seed: number;
  depth?: number;
  rot?: number;
  opacity?: number;
  children: React.ReactNode;
};
const PAD = 26; // room for the torn edge and the cast shadow inside the canvas
export const Cut: React.FC<CutProps> = ({ x, y, w, h, seed, depth = 8, rot = 0, opacity = 1, children }) => (
  <PaperLayer
    width={w + PAD * 2}
    height={h + PAD * 2}
    seed={seed}
    depth={depth}
    style={{ position: "absolute", left: x - PAD, top: y - PAD, rotate: `${rot}deg`, opacity }}
  >
    <div style={{ position: "absolute", left: PAD, top: PAD, width: w, height: h }}>{children}</div>
  </PaperLayer>
);

// ---------- backgrounds ----------
export const Backdrop: React.FC<{ color: string; seed?: number; rain?: number }> = ({ color, seed = 3, rain }) => (
  <Solid
    width={W}
    height={H}
    color={color}
    effects={
      rain !== undefined
        ? [paper({ colorFront: "#ffffff", colorBack: "#cfc6b4", amount: 0.9, seed, folds: 0.5 }), rainFall({ time: rain, opacity: 0.55 })]
        : [paper({ colorFront: "#ffffff", colorBack: "#d9cfbb", amount: 0.9, seed, folds: 0.5 })]
    }
  />
);

export const Stars: React.FC<{ f: number; n?: number }> = ({ f, n = 40 }) => (
  <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    {Array.from({ length: n }, (_, i) => {
      const x = random(`sx${i}`) * W;
      const y = random(`sy${i}`) * H * 0.45;
      const tw = Math.floor(f / 3 + i) % 5 === 0 ? 0.35 : 0.9;
      return <circle key={i} cx={x} cy={y} r={1.5 + random(`sr${i}`) * 2} fill={P.paper} opacity={tw} />;
    })}
  </svg>
);

// ---------- sea ----------
const wavePath = (w: number, h: number, base: number, amp: number, len: number, phase: number, seed: string) => {
  let d = `M 0 ${h} L 0 ${base}`;
  for (let x = 0; x <= w; x += 20) {
    const y = base + Math.sin((x / len) * Math.PI * 2 + phase) * amp + noise2D(seed, x / 300, phase * 0.2) * amp * 0.6;
    d += ` L ${x} ${y.toFixed(1)}`;
  }
  return `${d} L ${w} ${h} Z`;
};
export const Sea: React.FC<{ f: number; top?: number; rough?: number; night?: boolean }> = ({ f, top = 760, rough = 1, night = true }) => {
  const layers = [
    { c: night ? P.seaDeep : P.seaMid, base: top, amp: 10 * rough, len: 420, sp: 0.06, d: 4 },
    { c: night ? P.seaMid : P.sea, base: top + 90, amp: 16 * rough, len: 360, sp: 0.1, d: 8 },
    { c: night ? P.sea : "#3a6b93", base: top + 190, amp: 22 * rough, len: 300, sp: 0.15, d: 12 },
  ];
  return (
    <>
      {layers.map((l, i) => (
        <Cut key={i} x={-40} y={l.base - 60} w={W + 80} h={H - l.base + 80} seed={40 + i * 7} depth={l.d}>
          <svg width={W + 80} height={H - l.base + 80}>
            <path d={wavePath(W + 80, H - l.base + 80, 60, l.amp, l.len, f * l.sp * rough + i, `w${i}`)} fill={l.c} />
          </svg>
        </Cut>
      ))}
    </>
  );
};

// ---------- island with cliffs ----------
export const islandPath = (w: number, h: number) =>
  `M 0 ${h} L 30 ${h * 0.45} L 110 ${h * 0.3} L 230 ${h * 0.18} L 420 ${h * 0.12} L 600 ${h * 0.16} L 780 ${h * 0.26} L 880 ${h * 0.42} L ${w} ${h} Z`;
export const Island: React.FC<{ x: number; y: number; s?: number; seed?: number; night?: boolean }> = ({ x, y, s = 1, seed = 61, night = true }) => {
  const w = 920 * s;
  const h = 420 * s;
  return (
    <Cut x={x} y={y} w={w} h={h} seed={seed} depth={8}>
      <svg width={w} height={h} viewBox="0 0 920 420" preserveAspectRatio="none">
        <path d={islandPath(920, 420)} fill={night ? P.rockDark : P.rock} />
        <path d={`M 110 126 L 230 76 L 420 50 L 600 67 L 780 109 L 760 130 L 600 92 L 420 78 L 230 100 Z`} fill={P.grass} opacity={night ? 0.55 : 1} />
      </svg>
    </Cut>
  );
};

// ---------- lighthouse ----------
export const LighthouseSvg: React.FC<{ lit: number; night?: boolean }> = ({ lit, night = true }) => (
  <svg width={260} height={520} viewBox="0 0 260 520">
    {/* keeper's house */}
    <rect x={150} y={400} width={105} height={100} fill={night ? "#cfc6b4" : P.paper} />
    <polygon points="140,402 202,360 265,402" fill={P.rockDark} />
    <rect x={190} y={440} width={22} height={60} fill={P.wood} />
    <rect x={160} y={425} width={20} height={18} fill={lit > 0.3 ? P.lamp : P.nightDeep} />
    {/* tower */}
    <polygon points="70,500 150,500 138,140 82,140" fill={night ? "#e9e1d0" : "#ffffff"} />
    <rect x={64} y={128} width={92} height={14} fill="#c98b2e" />
    <rect x={78} y={70} width={64} height={60} fill={P.ink} />
    <rect x={86} y={78} width={48} height={44} fill={lit > 0.02 ? P.lamp : "#2b3350"} opacity={lit > 0.02 ? 0.4 + 0.6 * lit : 1} />
    <polygon points="72,72 110,40 148,72" fill={P.ink} />
    <rect x={106} y={28} width={8} height={14} fill={P.ink} />
    <rect x={98} y={300} width={22} height={34} fill={P.nightDeep} />
  </svg>
);
export const Lighthouse: React.FC<{ x: number; y: number; s?: number; lit?: number; night?: boolean; seed?: number }> = ({ x, y, s = 1, lit = 0, night = true, seed = 71 }) => (
  <Cut x={x} y={y} w={260 * s} h={520 * s} seed={seed} depth={10}>
    <div style={{ transform: `scale(${s})`, transformOrigin: "0 0" }}>
      <LighthouseSvg lit={lit} night={night} />
    </div>
  </Cut>
);
// two light wedges from the lantern (not paper: it is light)
export const Beam: React.FC<{ cx: number; cy: number; angle: number; power: number; len?: number }> = ({ cx, cy, angle, power, len = 1500 }) =>
  power <= 0.01 ? null : (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "screen" }}>
      <defs>
        <linearGradient id="bm" x1="0" x2="1">
          <stop offset="0" stopColor={P.beam} stopOpacity={0.85 * power} />
          <stop offset="1" stopColor={P.beam} stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0, 180].map((o) => (
        <polygon
          key={o}
          points={`0,-14 ${len},-150 ${len},150 0,14`}
          fill="url(#bm)"
          transform={`translate(${cx} ${cy}) rotate(${angle + o})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={26 * power} fill={P.lamp} opacity={power} />
    </svg>
  );
// Fl(2) W 30s compressed for the screen: two short flashes, then dark
export const flash2 = (t: number, period = 4) => {
  const p = t % period;
  return p < 0.25 ? 1 : p > 0.5 && p < 0.75 ? 1 : 0;
};

// ---------- ships ----------
export const Ship: React.FC<{ x: number; y: number; s?: number; seed?: number; smoke?: number; f?: number; name?: string }> = ({ x, y, s = 1, seed = 81, f = 0, name }) => (
  <Cut x={x} y={y} w={520 * s} h={260 * s} seed={seed} depth={10}>
    <svg width={520 * s} height={260 * s} viewBox="0 0 520 260">
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={300 - i * 34 - (f % 20)} cy={40 - i * 12} r={16 + i * 6} fill="#8f8a84" opacity={0.75 - i * 0.2} />
      ))}
      <rect x={285} y={60} width={34} height={90} fill={P.ink} />
      <rect x={285} y={74} width={34} height={14} fill={P.accent} />
      <rect x={180} y={120} width={190} height={50} fill={P.paper} />
      {[200, 240, 280, 320].map((wx) => (
        <rect key={wx} x={wx} y={134} width={16} height={14} fill={P.lamp} opacity={0.8} />
      ))}
      <rect x={130} y={30} width={6} height={140} fill={P.ink} />
      <path d="M 20 170 L 500 170 L 450 240 L 70 240 Z" fill={P.ink} />
      <path d="M 20 170 L 500 170 L 492 184 L 28 184 Z" fill={P.accent} />
      {name ? (
        <text x={260} y={222} textAnchor="middle" fontFamily={TITLE_FONT} fontWeight={800} fontSize={26} fill={P.paper}>
          {name}
        </text>
      ) : null}
    </svg>
  </Cut>
);

// ---------- people (paper dolls) ----------
export type Look = { coat: string; cap?: boolean; beard?: boolean; shirt?: boolean; hat?: boolean; lantern?: boolean };
export const KEEPERS: Record<string, Look & { name: string }> = {
  ducat: { name: "James Ducat", coat: "#2c3e63", cap: true, beard: true },
  marshall: { name: "Thomas Marshall", coat: "#3d5a4a", cap: true },
  mcarthur: { name: "Donald McArthur", coat: "#f2ece0", shirt: true, beard: true },
  moore: { name: "Joseph Moore", coat: "#5b3f30", cap: true, lantern: true },
  muirhead: { name: "Robert Muirhead", coat: "#3b3632", hat: true },
};
export const PersonSvg: React.FC<{ look: Look; arm?: number }> = ({ look, arm = 0 }) => (
  <svg width={140} height={300} viewBox="0 0 140 300">
    <rect x={44} y={190} width={20} height={100} fill={P.ink} />
    <rect x={76} y={190} width={20} height={100} fill={P.ink} />
    <path d="M 34 96 L 106 96 L 116 210 L 24 210 Z" fill={look.coat} />
    {look.shirt ? <path d="M 34 96 L 106 96 L 112 150 L 28 150 Z" fill="#ffffff" /> : null}
    <rect x={14} y={100} width={18} height={92} fill={look.shirt ? "#ffffff" : look.coat} transform={`rotate(${arm} 23 104)`} />
    <rect x={108} y={100} width={18} height={92} fill={look.shirt ? "#ffffff" : look.coat} transform={`rotate(${-arm} 117 104)`} />
    {look.lantern ? (
      <g transform={`rotate(${-arm} 117 104)`}>
        <rect x={104} y={192} width={26} height={30} fill={P.lamp} />
        <rect x={104} y={186} width={26} height={6} fill={P.ink} />
      </g>
    ) : null}
    <circle cx={70} cy={62} r={34} fill="#efc9a4" />
    {look.beard ? <path d="M 40 66 Q 70 116 100 66 Q 70 84 40 66" fill="#7a5a3a" /> : null}
    <circle cx={58} cy={58} r={4} fill={P.ink} />
    <circle cx={82} cy={58} r={4} fill={P.ink} />
    {look.cap ? <path d="M 34 44 Q 70 6 106 44 L 116 48 L 30 48 Z" fill={P.ink} /> : null}
    {look.hat ? (
      <>
        <rect x={42} y={6} width={56} height={34} fill={P.ink} />
        <rect x={28} y={36} width={84} height={8} fill={P.ink} />
      </>
    ) : null}
  </svg>
);
export const Person: React.FC<{ who: keyof typeof KEEPERS | Look; x: number; y: number; s?: number; seed: number; arm?: number; rot?: number; opacity?: number }> = ({
  who,
  x,
  y,
  s = 1,
  seed,
  arm,
  rot,
  opacity,
}) => {
  const look = typeof who === "string" ? KEEPERS[who] : who;
  return (
    <Cut x={x} y={y} w={140 * s} h={300 * s} seed={seed} depth={10} rot={rot} opacity={opacity}>
      <div style={{ transform: `scale(${s})`, transformOrigin: "0 0" }}>
        <PersonSvg look={look} arm={arm} />
      </div>
    </Cut>
  );
};

// ---------- labels ----------
export const Tag: React.FC<{ x: number; y: number; big: string; small?: string; seed: number; rot?: number; color?: string; w?: number }> = ({
  x,
  y,
  big,
  small,
  seed,
  rot = -3,
  color = P.paper,
  w = 360,
}) => (
  <Cut x={x} y={y} w={w} h={small ? 170 : 120} seed={seed} depth={14} rot={rot}>
    <div
      style={{
        width: w,
        height: small ? 170 : 120,
        background: color,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: TITLE_FONT,
        color: P.ink,
      }}
    >
      <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1 }}>{big}</div>
      {small ? <div style={{ fontSize: 30, fontWeight: 700, color: P.accent, marginTop: 6 }}>{small}</div> : null}
    </div>
  </Cut>
);
export const Note: React.FC<{ x: number; y: number; w: number; h: number; seed: number; rot?: number; bg?: string; children: React.ReactNode }> = ({
  x,
  y,
  w,
  h,
  seed,
  rot = 0,
  bg = P.paper,
  children,
}) => (
  <Cut x={x} y={y} w={w} h={h} seed={seed} depth={12} rot={rot}>
    <div style={{ width: w, height: h, background: bg, padding: 28, boxSizing: "border-box", fontFamily: TITLE_FONT, color: P.ink }}>{children}</div>
  </Cut>
);
export const Stamp: React.FC<{ x: number; y: number; text: string; f: number; at: number; rot?: number }> = ({ x, y, text, f, at, rot = -12 }) => {
  const k = land(f, at, 9);
  if (f < sec(at)) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        rotate: `${rot}deg`,
        scale: `${interpolate(k, [0, 1], [2.2, 1])}`,
        opacity: Math.min(1, k * 1.5),
        border: `10px solid ${P.accent}`,
        color: P.accent,
        padding: "8px 28px",
        fontFamily: TITLE_FONT,
        fontWeight: 800,
        fontSize: 84,
        borderRadius: 12,
        mixBlendMode: "multiply",
      }}
    >
      {text}
    </div>
  );
};
