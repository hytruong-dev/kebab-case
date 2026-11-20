// Flat vector icon set for the brain channel (drawn in code: crisp at any zoom, exact colours, animatable parts).
// Every icon is an SVG <g> centred on (x, y); `s` = scale (1 ≈ 200 px wide). Use inside <S> from kit.tsx.
import React from "react";
import { C } from "./kit";

type P = { x: number; y: number; s?: number; k?: number; rot?: number; op?: number };
export const G: React.FC<P & { children: React.ReactNode }> = ({ x, y, s = 1, k = 1, rot = 0, op = 1, children }) =>
  k <= 0.01 || op <= 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * k})`} opacity={op}>
      {children}
    </g>
  );
const O = { stroke: "#0B1120", strokeWidth: 5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Side-view brain; `front` / `deep` glow the prefrontal area / the amygdala (0..1). */
export const Brain: React.FC<P & { front?: number; deep?: number; tint?: string; glitch?: number }> = ({ front = 0, deep = 0, tint = C.pink, glitch = 0, ...p }) => (
  <G {...p}>
    {glitch > 0 && <path d={BRAIN} fill="none" stroke={C.sky} strokeWidth={6} transform={`translate(${-8 * glitch} 0)`} opacity={0.7} />}
    {glitch > 0 && <path d={BRAIN} fill="none" stroke={C.coral} strokeWidth={6} transform={`translate(${8 * glitch} 0)`} opacity={0.7} />}
    <path d={BRAIN} fill={tint} {...O} />
    <path d="M -60 -40 C -30 -60 0 -30 -20 -10 M 10 -70 C 40 -60 30 -30 50 -30 M -80 10 C -60 0 -40 30 -10 20 M 20 0 C 50 10 60 -10 80 10 M -30 50 C 0 40 20 60 50 45" fill="none" stroke="#DB7093" strokeWidth={6} strokeLinecap="round" />
    <path d="M 40 70 C 50 95 70 110 85 100" fill="none" stroke="#DB7093" strokeWidth={14} strokeLinecap="round" />
    {front > 0 && <ellipse cx={75} cy={-20} rx={45} ry={55} fill={C.amber} opacity={0.65 * front} />}
    {deep > 0 && (
      <>
        <circle cx={10} cy={30} r={40 * deep} fill={C.coral} opacity={0.35 * deep} />
        <ellipse cx={10} cy={30} rx={14} ry={9} fill={C.coral} opacity={deep} transform="rotate(-20 10 30)" />
      </>
    )}
  </G>
);
const BRAIN = "M -95 20 C -120 -20 -100 -80 -50 -90 C -20 -110 40 -105 70 -80 C 110 -70 125 -20 110 15 C 115 50 80 75 45 70 C 20 85 -20 85 -40 70 C -80 75 -105 50 -95 20 Z";

/** Head silhouette facing right with the brain inside (cut-away). */
export const Head: React.FC<P & { front?: number; deep?: number; glitch?: number }> = ({ front = 0, deep = 0, glitch = 0, ...p }) => (
  <G {...p}>
    <path d="M -150 230 L -150 120 C -210 60 -200 -120 -90 -170 C 20 -215 140 -170 160 -60 C 168 -20 190 10 200 40 C 205 52 195 60 180 60 L 175 95 C 172 120 150 130 120 125 L 100 125 L 100 230 Z" fill={C.panel} stroke={C.line} strokeWidth={6} />
    <Brain x={0} y={-60} s={1.15} front={front} deep={deep} glitch={glitch} />
  </G>
);

/** The rational CEO (prefrontal cortex). */
export const Ceo: React.FC<P & { wave?: number }> = ({ wave = 0, ...p }) => (
  <G {...p}>
    <rect x={-45} y={-10} width={90} height={110} rx={22} fill="#1E3A8A" {...O} />
    <path d="M 0 -10 L -14 20 L 0 70 L 14 20 Z" fill={C.amber} />
    <path d="M -18 -10 L 0 15 L 18 -10" fill="#F8FAFC" />
    <circle cx={0} cy={-45} r={34} fill="#F5D0A9" {...O} />
    <path d="M -34 -55 C -30 -90 30 -90 34 -55 C 20 -70 -20 -70 -34 -55 Z" fill="#334155" />
    <circle cx={-12} cy={-45} r={4} fill="#0B1120" /><circle cx={12} cy={-45} r={4} fill="#0B1120" />
    <path d="M -10 -30 Q 0 -22 10 -30" fill="none" stroke="#0B1120" strokeWidth={4} strokeLinecap="round" />
    <g transform={`rotate(${-20 + wave * 30} 45 10)`}>
      <rect x={45} y={0} width={70} height={46} rx={4} fill={C.sky} {...O} />
      <path d="M 55 12 H 105 M 55 24 H 95 M 55 36 H 100" stroke="#F8FAFC" strokeWidth={4} />
    </g>
    <rect x={-35} y={100} width={22} height={40} fill="#1E3A8A" {...O} /><rect x={13} y={100} width={22} height={40} fill="#1E3A8A" {...O} />
  </G>
);

/** The Amygdala creature: coral fuzzy blob with big nervous eyes. `panic` 0..1 widens eyes + shakes. */
export const Amyg: React.FC<P & { panic?: number; t?: number; whistle?: boolean }> = ({ panic = 0, t = 0, whistle = true, ...p }) => {
  const sh = panic > 0 ? Math.sin(t * 40) * 4 * panic : 0;
  return (
    <G {...p} x={p.x + sh}>
      <path d="M -70 60 C -95 20 -85 -60 -30 -75 C 10 -95 70 -70 80 -20 C 95 20 75 65 40 75 C 0 90 -50 85 -70 60 Z" fill={C.coral} {...O} />
      {[-50, -20, 15, 45].map((x, i) => <path key={i} d={`M ${x} -70 l 8 -18 l 8 16`} fill={C.coral} {...O} />)}
      <circle cx={-22} cy={-15} r={22 + panic * 8} fill="#F8FAFC" {...O} />
      <circle cx={28} cy={-15} r={22 + panic * 8} fill="#F8FAFC" {...O} />
      <circle cx={-18} cy={-12} r={9 - panic * 3} fill="#0B1120" /><circle cx={32} cy={-12} r={9 - panic * 3} fill="#0B1120" />
      <path d={panic > 0.5 ? "M -15 35 Q 5 20 25 35 Q 5 50 -15 35 Z" : "M -15 35 Q 5 25 25 35"} fill={panic > 0.5 ? "#0B1120" : "none"} stroke="#0B1120" strokeWidth={5} />
      {whistle && <g transform="translate(70 20)"><rect x={0} y={-10} width={40} height={20} rx={8} fill={C.amber} {...O} /><circle cx={44} cy={0} r={12} fill={C.amber} {...O} /></g>}
    </G>
  );
};

/** Smartphone; `glow` lights the screen. */
export const Phone: React.FC<P & { glow?: number; badge?: boolean }> = ({ glow = 1, badge = true, ...p }) => (
  <G {...p}>
    {glow > 0 && <rect x={-90} y={-150} width={180} height={300} rx={50} fill={C.amber} opacity={0.18 * glow} />}
    <rect x={-60} y={-110} width={120} height={220} rx={20} fill="#0B1120" stroke={C.line} strokeWidth={6} />
    <rect x={-50} y={-95} width={100} height={185} rx={8} fill={glow > 0.5 ? "#312E81" : "#1E293B"} />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <rect key={i} x={-40 + (i % 3) * 30} y={-80 + Math.floor(i / 3) * 32} width={20} height={20} rx={5} fill={[C.amber, C.coral, C.teal, C.sky, C.pink][i % 5]} opacity={0.4 + 0.6 * glow} />
    ))}
    {badge && <circle cx={52} cy={-102} r={16} fill={C.coral} {...O} />}
  </G>
);

/** Laptop with a blank document and a cursor. */
export const Laptop: React.FC<P & { t?: number; fill?: number }> = ({ t = 0, fill = 0, ...p }) => (
  <G {...p}>
    <rect x={-150} y={-110} width={300} height={190} rx={12} fill="#0B1120" stroke={C.line} strokeWidth={6} />
    <rect x={-135} y={-96} width={270} height={162} rx={4} fill="#F8FAFC" />
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={-115} y={-78 + i * 22} width={(i === 5 ? 120 : 230) * Math.min(1, Math.max(0, fill * 6 - i))} height={8} rx={4} fill="#94A3B8" />)}
    {Math.floor(t * 2) % 2 === 0 && <rect x={-115 + (fill > 0 ? 130 : 0)} y={-80 + (fill > 0 ? Math.min(5, Math.floor(fill * 6)) * 22 : 0)} width={4} height={16} fill={C.bg} />}
    <path d="M -175 80 H 175 L 160 100 H -160 Z" fill={C.line} />
  </G>
);

/** Wall clock; hands at minutes `m` (0..60 -> one turn) and hours `h` (0..12). */
export const Clock: React.FC<P & { m?: number; h?: number; red?: boolean }> = ({ m = 0, h = 0, red = false, ...p }) => (
  <G {...p}>
    <circle r={100} fill="#F8FAFC" stroke={red ? C.coral : C.line} strokeWidth={14} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-80} x2={0} y2={i % 3 ? -72 : -64} stroke="#0B1120" strokeWidth={i % 3 ? 4 : 7} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-50} stroke="#0B1120" strokeWidth={9} strokeLinecap="round" transform={`rotate(${h * 30})`} />
    <line x1={0} y1={0} x2={0} y2={-74} stroke={C.coral} strokeWidth={6} strokeLinecap="round" transform={`rotate(${m * 6})`} />
    <circle r={8} fill="#0B1120" />
  </G>
);

/** Calendar page; `mark` circles the day. */
export const Calendar: React.FC<P & { mark?: number; label?: string }> = ({ mark = 0, label = "", ...p }) => (
  <G {...p}>
    <rect x={-110} y={-100} width={220} height={210} rx={16} fill="#F8FAFC" {...O} />
    <rect x={-110} y={-100} width={220} height={50} rx={16} fill={C.coral} />
    <rect x={-110} y={-70} width={220} height={20} fill={C.coral} />
    {Array.from({ length: 15 }, (_, i) => <rect key={i} x={-90 + (i % 5) * 38} y={-35 + Math.floor(i / 5) * 42} width={26} height={26} rx={5} fill="#CBD5E1" />)}
    {mark > 0 && <circle cx={-90 + 3 * 38 + 13} cy={-35 + 42 + 13} r={26} fill="none" stroke={C.coral} strokeWidth={7} strokeDasharray={`${163 * mark} 200`} />}
    {label && <text x={0} y={-66} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={26} fill="#F8FAFC">{label}</text>}
  </G>
);

/** Stack of papers (`n` sheets). */
export const Papers: React.FC<P & { n?: number; lean?: number }> = ({ n = 8, lean = 0, ...p }) => (
  <G {...p}>
    {Array.from({ length: n }, (_, i) => (
      <g key={i} transform={`translate(${Math.sin(i * 1.7) * 8 + lean * i} ${-i * 16}) rotate(${Math.sin(i * 2.3) * 4})`}>
        <rect x={-80} y={-8} width={160} height={16} rx={3} fill={i % 3 === 0 ? "#E2E8F0" : "#F8FAFC"} {...O} strokeWidth={3} />
      </g>
    ))}
  </G>
);

/** Spreadsheet window. */
export const Sheet: React.FC<P & { red?: number }> = ({ red = 0, ...p }) => (
  <G {...p}>
    <rect x={-160} y={-110} width={320} height={220} rx={12} fill="#F8FAFC" stroke={red > 0 ? C.coral : C.line} strokeWidth={6 + red * 6} />
    <rect x={-160} y={-110} width={320} height={34} rx={12} fill={red > 0.5 ? C.coral : "#16A34A"} />
    {Array.from({ length: 6 }, (_, r) => <line key={`r${r}`} x1={-150} x2={150} y1={-60 + r * 28} y2={-60 + r * 28} stroke="#CBD5E1" strokeWidth={2} />)}
    {Array.from({ length: 5 }, (_, c) => <line key={`c${c}`} y1={-76} y2={100} x1={-100 + c * 60} x2={-100 + c * 60} stroke="#CBD5E1" strokeWidth={2} />)}
  </G>
);

export const Boulder: React.FC<P & { label?: string }> = ({ label, ...p }) => (
  <G {...p}>
    <path d="M -110 60 C -130 0 -90 -90 -10 -100 C 70 -110 125 -50 115 20 C 110 70 60 95 0 92 C -60 95 -100 85 -110 60 Z" fill="#64748B" {...O} />
    <path d="M -60 -40 C -30 -60 10 -55 30 -40 M 20 20 C 50 15 70 30 80 45" fill="none" stroke="#475569" strokeWidth={8} strokeLinecap="round" />
    {label && <text x={0} y={20} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={34} fill="#F8FAFC">{label}</text>}
  </G>
);
export const Pebble: React.FC<P & { label?: string }> = ({ label, ...p }) => (
  <G {...p}>
    <ellipse rx={60} ry={42} fill={C.amber} {...O} />
    {label && <text x={0} y={10} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={30} fill={C.bg}>{label}</text>}
  </G>
);

export const Lock: React.FC<P & { open?: number; color?: string }> = ({ open = 0, color = C.amber, ...p }) => (
  <G {...p}>
    <path d={`M -45 -20 V -60 C -45 -115 45 -115 45 -60 V ${-20 - open * 45}`} fill="none" stroke="#94A3B8" strokeWidth={20} strokeLinecap="round" transform={`translate(${open * 30} ${-open * 20})`} />
    <rect x={-75} y={-25} width={150} height={120} rx={20} fill={color} {...O} />
    <circle cx={0} cy={25} r={14} fill="#0B1120" /><rect x={-5} y={25} width={10} height={35} fill="#0B1120" />
  </G>
);

export const Heart: React.FC<P & { glow?: number }> = ({ glow = 0, ...p }) => (
  <G {...p}>
    {glow > 0 && <circle r={150} fill={C.coral} opacity={0.25 * glow} />}
    <path d="M 0 90 C -120 10 -120 -80 -55 -85 C -25 -88 -5 -65 0 -50 C 5 -65 25 -88 55 -85 C 120 -80 120 10 0 90 Z" fill={C.coral} {...O} />
    <ellipse cx={-50} cy={-45} rx={18} ry={10} fill="#FECDD3" transform="rotate(-30 -50 -45)" />
  </G>
);

/** Round flask; `level` 0..1 of amber liquid. */
export const Flask: React.FC<P & { level?: number; t?: number }> = ({ level = 0.8, t = 0, ...p }) => (
  <G {...p}>
    <defs><clipPath id="flaskclip"><circle cx={0} cy={30} r={95} /></clipPath></defs>
    <g clipPath="url(#flaskclip)">
      <rect x={-100} y={125 - 190 * level} width={200} height={200} fill={C.amber} />
      {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={-50 + i * 20} cy={110 - ((t * 60 + i * 37) % (190 * level))} r={6} fill="#FDE68A" opacity={0.8} />)}
    </g>
    <circle cx={0} cy={30} r={95} fill="none" stroke="#CBD5E1" strokeWidth={8} />
    <rect x={-25} y={-120} width={50} height={60} fill="none" stroke="#CBD5E1" strokeWidth={8} />
    <rect x={-35} y={-130} width={70} height={14} rx={6} fill="#CBD5E1" />
  </G>
);

export const Bell: React.FC<P & { ring?: number }> = ({ ring = 0, ...p }) => (
  <G {...p} rot={(p.rot ?? 0) + ring * 15}>
    <path d="M -60 40 C -60 -20 -50 -70 0 -70 C 50 -70 60 -20 60 40 L 75 60 H -75 Z" fill={C.coral} {...O} />
    <circle cx={0} cy={72} r={16} fill={C.amber} {...O} />
    <circle cx={45} cy={-55} r={20} fill={C.amber} {...O} />
  </G>
);

export const AlarmButton: React.FC<P & { press?: number; flash?: number }> = ({ press = 0, flash = 0, ...p }) => (
  <G {...p}>
    {flash > 0 && <circle cy={-20} r={160} fill={C.coral} opacity={0.35 * flash} />}
    <rect x={-110} y={20} width={220} height={60} rx={14} fill="#334155" {...O} />
    <path d={`M -80 ${20} C -80 ${-60 + press * 30} 80 ${-60 + press * 30} 80 20 Z`} fill={C.coral} {...O} />
  </G>
);

/** Stylised fMRI scanner ring + bed; `scan` 0..1 sweeps a light line. */
export const Scanner: React.FC<P & { scan?: number }> = ({ scan = 0, ...p }) => (
  <G {...p}>
    <rect x={-260} y={60} width={420} height={36} rx={14} fill="#94A3B8" {...O} />
    <rect x={-220} y={96} width={40} height={70} fill="#475569" />
    <circle cx={60} cy={0} r={170} fill="#E2E8F0" {...O} />
    <circle cx={60} cy={0} r={95} fill={C.bg} {...O} />
    {scan > 0 && <rect x={60 - 95 + 190 * scan - 4} y={-95} width={8} height={190} fill={C.teal} opacity={0.9} />}
    <rect x={180} y={-20} width={30} height={40} rx={6} fill={C.teal} />
  </G>
);

export const Couch: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-170} y={-60} width={340} height={80} rx={30} fill="#B45309" {...O} />
    <rect x={-190} y={0} width={380} height={70} rx={24} fill={C.amber} {...O} />
    <rect x={-200} y={-30} width={50} height={110} rx={20} fill="#D97706" {...O} />
    <rect x={150} y={-30} width={50} height={110} rx={20} fill="#D97706" {...O} />
  </G>
);

export const Cookie: React.FC<P> = (p) => (
  <G {...p}>
    <circle r={60} fill="#D4A373" {...O} />
    {[[-20, -20], [20, -10], [-5, 20], [25, 25], [-30, 15]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={8} fill="#5C3A21" />)}
  </G>
);

export const Chest: React.FC<P> = (p) => (
  <G {...p}>
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={-110 + (i % 7) * 37} cy={-30 - Math.floor(i / 7) * 26 + Math.sin(i) * 6} r={22} fill={C.amber} {...O} strokeWidth={3} />)}
    <path d="M -140 -30 H 140 V 90 H -140 Z" fill="#92400E" {...O} />
    <rect x={-140} y={10} width={280} height={18} fill="#FBBF24" />
    <rect x={-18} y={0} width={36} height={44} rx={6} fill="#FBBF24" {...O} />
  </G>
);

/** Balance scale; `tilt` -1 (left down) .. 1 (right down). Children are drawn in the pans via render props. */
export const Scale: React.FC<P & { tilt?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ tilt = 0, left, right, ...p }) => {
  // beam pivots at (0,-150); positive tilt lowers the RIGHT end
  const r = (tilt * 14 * Math.PI) / 180;
  const ends = [
    { x: -220 * Math.cos(r), y: -150 - 220 * Math.sin(r), kid: left },
    { x: 220 * Math.cos(r), y: -150 + 220 * Math.sin(r), kid: right },
  ];
  return (
    <G {...p}>
      <rect x={-12} y={-150} width={24} height={300} fill="#94A3B8" {...O} />
      <rect x={-90} y={150} width={180} height={26} rx={10} fill="#64748B" {...O} />
      <line x1={ends[0].x} y1={ends[0].y} x2={ends[1].x} y2={ends[1].y} stroke="#CBD5E1" strokeWidth={14} strokeLinecap="round" />
      {ends.map(({ x: px, y: ey, kid }, i) => {
        const py = ey + 120;
        return (
          <g key={i}>
            <line x1={px} y1={py - 120} x2={px - 70} y2={py} stroke="#94A3B8" strokeWidth={4} />
            <line x1={px} y1={py - 120} x2={px + 70} y2={py} stroke="#94A3B8" strokeWidth={4} />
            <path d={`M ${px - 90} ${py} Q ${px} ${py + 50} ${px + 90} ${py} Z`} fill="#CBD5E1" {...O} />
            <g transform={`translate(${px} ${py - 10})`}>{kid}</g>
          </g>
        );
      })}
    </G>
  );
};

/** Flame; `h` 0..1 size. */
export const Flame: React.FC<P & { h?: number; t?: number }> = ({ h = 1, t = 0, ...p }) =>
  h <= 0.02 ? null : (
    <G {...p}>
      <g transform={`scale(${h * (1 + Math.sin(t * 12) * 0.05)}, ${h * (1 + Math.cos(t * 9) * 0.07)})`}>
        <path d="M 0 -150 C 60 -80 100 -40 90 20 C 80 80 40 100 0 100 C -40 100 -85 75 -90 20 C -95 -30 -60 -60 -40 -100 C -30 -60 -10 -50 0 -150 Z" fill={C.coral} />
        <path d="M 0 -60 C 35 -20 55 10 45 45 C 38 75 20 85 0 85 C -25 85 -45 70 -45 40 C -45 10 -20 -10 0 -60 Z" fill={C.amber} />
      </g>
    </G>
  );

export const FuelCan: React.FC<P & { pour?: number }> = ({ pour = 0, ...p }) => (
  <G {...p}>
    <rect x={-70} y={-90} width={140} height={180} rx={14} fill={C.coral} {...O} />
    <path d="M -40 -60 L 40 60 M 40 -60 L -40 60" stroke="#9F1239" strokeWidth={10} />
    <rect x={30} y={-125} width={40} height={40} rx={6} fill="#334155" {...O} />
    {pour > 0 && <path d={`M 70 -110 C 120 -120 150 -60 ${160} ${-60 + 160 * pour}`} fill="none" stroke={C.amber} strokeWidth={14} strokeLinecap="round" />}
  </G>
);

export const Weight: React.FC<P & { label?: string }> = ({ label = "", ...p }) => (
  <G {...p}>
    <path d="M -90 90 L -60 -50 H 60 L 90 90 Z" fill="#334155" {...O} />
    <path d="M -30 -50 C -30 -100 30 -100 30 -50" fill="none" stroke="#334155" strokeWidth={16} />
    {label && <text y={45} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={34} fill={C.coral}>{label}</text>}
  </G>
);

export const Knot: React.FC<P & { t?: number }> = ({ t = 0, ...p }) => (
  <G {...p} rot={(p.rot ?? 0) + t * 30}>
    {[0, 60, 120].map((r) => <ellipse key={r} rx={80} ry={35} fill="none" stroke={C.coral} strokeWidth={10} transform={`rotate(${r})`} />)}
  </G>
);

/** Retro CRT computer; `lines` boot-text progress 0..1. */
export const Crt: React.FC<P & { lines?: number; t?: number }> = ({ lines = 0, t = 0, ...p }) => (
  <G {...p}>
    <rect x={-170} y={-150} width={340} height={260} rx={24} fill="#D6CFC0" {...O} />
    <rect x={-140} y={-120} width={280} height={190} rx={18} fill="#052E16" />
    {Array.from({ length: 5 }, (_, i) => <rect key={i} x={-120} y={-100 + i * 32} width={(i % 2 ? 160 : 220) * Math.min(1, Math.max(0, lines * 5 - i))} height={12} fill="#4ADE80" opacity={0.85} />)}
    {Math.floor(t * 2) % 2 === 0 && <rect x={-120} y={-100 + Math.min(4, Math.floor(lines * 5)) * 32 + 32} width={14} height={14} fill="#4ADE80" />}
    <rect x={-60} y={110} width={120} height={30} fill="#BFB6A3" {...O} />
    <rect x={-190} y={140} width={380} height={40} rx={10} fill="#D6CFC0" {...O} />
  </G>
);

/** Generic grey person silhouette (the stranger). */
export const Person: React.FC<P & { color?: string }> = ({ color = "#64748B", ...p }) => (
  <G {...p}>
    <circle cy={-70} r={45} fill={color} {...O} />
    <path d="M -80 120 C -80 20 -50 -15 0 -15 C 50 -15 80 20 80 120 Z" fill={color} {...O} />
  </G>
);

/** Caveman running right. */
export const Caveman: React.FC<P & { t?: number }> = ({ t = 0, ...p }) => {
  const sw = Math.sin(t * 18) * 30;
  return (
    <G {...p}>
      <g transform={`rotate(${sw} 0 40)`}><rect x={-12} y={40} width={24} height={80} rx={10} fill="#C2855A" {...O} /></g>
      <g transform={`rotate(${-sw} 0 40)`}><rect x={-12} y={40} width={24} height={80} rx={10} fill="#C2855A" {...O} /></g>
      <path d="M -45 -40 L 45 -40 L 55 50 L -55 50 Z" fill="#92400E" {...O} />
      <path d="M -40 -40 L 0 0 L 40 -40" fill="none" stroke="#FBBF24" strokeWidth={6} />
      <circle cx={10} cy={-80} r={38} fill="#C2855A" {...O} />
      <path d="M -28 -95 C -20 -135 40 -135 48 -95 C 30 -110 -10 -110 -28 -95 Z" fill="#3F2A1D" />
      <circle cx={25} cy={-82} r={6} fill="#0B1120" />
      <path d="M 20 -62 Q 30 -55 40 -62" fill="#0B1120" stroke="#0B1120" strokeWidth={4} />
    </G>
  );
};

/** Sabertooth tiger running right. */
export const Tiger: React.FC<P & { t?: number }> = ({ t = 0, ...p }) => {
  const sw = Math.sin(t * 16) * 25;
  return (
    <G {...p}>
      {[-90, -50, 50, 90].map((x, i) => (
        <g key={x} transform={`rotate(${i % 2 ? sw : -sw} ${x} 20)`}><rect x={x - 14} y={20} width={28} height={70} rx={12} fill={C.amber} {...O} /></g>
      ))}
      <ellipse cx={0} cy={0} rx={130} ry={60} fill={C.amber} {...O} />
      {[-60, -25, 10, 45].map((x) => <path key={x} d={`M ${x} -55 q 10 30 0 60`} fill="none" stroke="#78350F" strokeWidth={10} strokeLinecap="round" />)}
      <path d="M -125 -10 C -170 -40 -180 -70 -160 -90" fill="none" stroke={C.amber} strokeWidth={16} strokeLinecap="round" />
      <circle cx={140} cy={-35} r={55} fill={C.amber} {...O} />
      <path d="M 120 -80 l 10 -25 l 15 22 M 160 -82 l 12 -22 l 10 26" fill={C.amber} {...O} />
      <circle cx={160} cy={-45} r={8} fill="#0B1120" />
      <path d="M 150 -5 L 200 -5 L 190 30 L 160 20 Z" fill="#7F1D1D" {...O} />
      <path d="M 165 -5 L 170 35 L 178 -5 M 185 -5 L 188 28 L 195 -5" fill="#F8FAFC" stroke="#0B1120" strokeWidth={2} />
    </G>
  );
};

/** Fist (fight). */
export const Fist: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-70} y={-50} width={140} height={110} rx={30} fill="#F5D0A9" {...O} />
    {[-45, -15, 15, 45].map((x) => <rect key={x} x={x - 14} y={-70} width={28} height={50} rx={14} fill="#F5D0A9" {...O} />)}
    <rect x={-40} y={60} width={80} height={60} fill="#334155" {...O} />
  </G>
);

/** Small icons for cards. */
export const Folder: React.FC<P & { color?: string }> = ({ color = C.amber, ...p }) => (
  <G {...p}><path d="M -80 -50 H -20 L 0 -30 H 80 V 60 H -80 Z" fill={color} {...O} /></G>
);
export const Keyboard: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-130} y={-50} width={260} height={100} rx={14} fill="#334155" {...O} />
    {Array.from({ length: 24 }, (_, i) => <rect key={i} x={-115 + (i % 8) * 29} y={-38 + Math.floor(i / 8) * 26} width={22} height={18} rx={4} fill="#94A3B8" />)}
  </G>
);
export const PlayCard: React.FC<P> = (p) => (
  <G {...p}>
    <rect x={-110} y={-70} width={220} height={140} rx={18} fill={C.coral} {...O} />
    <path d="M -25 -35 L 40 0 L -25 35 Z" fill="#F8FAFC" />
  </G>
);
export const Briefcase: React.FC<P> = (p) => (
  <G {...p}><rect x={-90} y={-50} width={180} height={120} rx={16} fill="#1E3A8A" {...O} /><path d="M -35 -50 V -75 H 35 V -50" fill="none" stroke="#0B1120" strokeWidth={10} /><rect x={-90} y={0} width={180} height={10} fill={C.amber} /></G>
);
export const GradCap: React.FC<P> = (p) => (
  <G {...p}><path d="M -110 -10 L 0 -60 L 110 -10 L 0 40 Z" fill="#1E293B" {...O} /><path d="M -60 15 V 55 C -30 80 30 80 60 55 V 15" fill="#334155" {...O} /><path d="M 80 0 V 60" stroke={C.amber} strokeWidth={8} /><circle cx={80} cy={65} r={10} fill={C.amber} /></G>
);
export const Bulb: React.FC<P & { on?: number }> = ({ on = 1, ...p }) => (
  <G {...p}>
    {on > 0 && <circle cy={-20} r={120} fill={C.amber} opacity={0.25 * on} />}
    <path d="M -55 10 C -90 -40 -60 -110 0 -110 C 60 -110 90 -40 55 10 C 40 30 35 45 35 60 H -35 C -35 45 -40 30 -55 10 Z" fill={on > 0.5 ? "#FDE68A" : "#CBD5E1"} {...O} />
    <rect x={-35} y={60} width={70} height={40} rx={8} fill="#94A3B8" {...O} />
  </G>
);
export const Gears: React.FC<P & { t?: number }> = ({ t = 0, ...p }) => (
  <G {...p}>
    {[{ x: -45, y: 10, r: 55, d: 1 }, { x: 55, y: -35, r: 40, d: -1.4 }].map((g, i) => (
      <g key={i} transform={`translate(${g.x} ${g.y}) rotate(${t * 60 * g.d})`}>
        {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-10} y={-g.r - 16} width={20} height={24} fill={C.amber} transform={`rotate(${k * 45})`} />)}
        <circle r={g.r} fill={C.amber} {...O} /><circle r={g.r * 0.35} fill={C.bg} />
      </g>
    ))}
  </G>
);
export const Telescope: React.FC<P> = (p) => (
  <G {...p}><g transform="rotate(-25)"><rect x={-110} y={-22} width={200} height={44} rx={10} fill={C.amber} {...O} /><rect x={90} y={-30} width={30} height={60} rx={6} fill="#B45309" {...O} /></g><path d="M -10 20 L -60 120 M -10 20 L 40 120 M -10 20 L -10 120" stroke="#94A3B8" strokeWidth={8} /></G>
);
export const Remote: React.FC<P> = (p) => (
  <G {...p}><rect x={-32} y={-100} width={64} height={200} rx={20} fill="#334155" {...O} /><circle cy={-65} r={14} fill={C.coral} />{[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={-14 + (i % 2) * 28} cy={-20 + Math.floor(i / 2) * 30} r={9} fill="#94A3B8" />)}</G>
);
export const Dumbbell: React.FC<P> = (p) => (
  <G {...p}><rect x={-90} y={-10} width={180} height={20} rx={8} fill="#94A3B8" {...O} />{[-110, -80, 80, 110].map((x) => <rect key={x} x={x - 14} y={-50} width={28} height={100} rx={8} fill="#334155" {...O} />)}</G>
);
export const Book: React.FC<P> = (p) => (
  <G {...p}><rect x={-80} y={-100} width={160} height={200} rx={10} fill={C.sky} {...O} /><rect x={-80} y={-100} width={24} height={200} fill="#0369A1" /><path d="M 40 -100 V -40 L 55 -55 L 70 -40 V -100" fill={C.coral} /></G>
);
export const Door: React.FC<P & { open?: number }> = ({ open = 0, ...p }) => (
  <G {...p}><rect x={-70} y={-140} width={140} height={280} fill="#0B1120" {...O} /><rect x={-70} y={-140} width={140 * (1 - open * 0.8)} height={280} fill="#92400E" {...O} /><circle cx={40 - open * 100} cy={10} r={9} fill={C.amber} /></G>
);
export const Check: React.FC<P & { color?: string }> = ({ color = C.teal, ...p }) => (
  <G {...p}><path d="M -40 0 L -10 30 L 45 -35" fill="none" stroke={color} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" /></G>
);
export const Cross: React.FC<P & { color?: string }> = ({ color = C.coral, ...p }) => (
  <G {...p}><path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke={color} strokeWidth={18} strokeLinecap="round" /></G>
);
export const Puzzle: React.FC<P & { p?: number }> = ({ p: prog = 0.9, ...p }) => (
  <G {...p}>
    <circle r={110} fill="none" stroke={C.line} strokeWidth={30} />
    <circle r={110} fill="none" stroke={C.teal} strokeWidth={30} strokeDasharray={`${691 * prog} 691`} transform="rotate(-90)" strokeLinecap="round" />
  </G>
);
