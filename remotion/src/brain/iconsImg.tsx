// STRICT Gemini-only objects (TASTE-35): every object/character is the episode's Gemini illustration
// (public/brain/<ep>/<id>.png, cropped to the subject). Code only adds overlays ON the image (glows, clock hands,
// typed lines, labels) — never a vector look-alike. A missing asset throws, so the render/still fails loudly
// and the image gets generated in Gemini instead of being silently replaced.
// Pure UI marks (Check, Cross, Puzzle ring) are infographic elements and stay in code.
import React from "react";
import { Img } from "remotion";
import { C, useAsset, useHas } from "./kit";
import { Check, Cross, G, Puzzle } from "./icons";

type P = { x: number; y: number; s?: number; k?: number; rot?: number; op?: number };

/** Image inside SVG via foreignObject so Remotion's <Img> waits for the load (no blank frames). */
export const Im: React.FC<{ n: string; w: number; h: number; cx?: number; cy?: number; filter?: string; op?: number; style?: React.CSSProperties }> = ({
  n, w, h, cx = 0, cy = 0, filter, op = 1, style,
}) => {
  const asset = useAsset();
  const has = useHas();
  if (!has.has(n)) throw new Error(`Missing Gemini asset "${n}" — generate it (tools/gemini-alt) and run scripts/brain/assets.py (TASTE-35)`);
  return (
    <foreignObject x={cx - w / 2} y={cy - h / 2} width={w} height={h} style={{ overflow: "visible" }}>
      <Img src={asset(`${n}.png`)} style={{ width: "100%", height: "100%", objectFit: "contain", opacity: op, filter: filter ?? "drop-shadow(0 10px 14px rgba(0,0,0,0.35))", ...style }} />
    </foreignObject>
  );
};

/** Plain Gemini object with optional under/over overlays (local units, centred on the object). */
function obj<T extends P>(n: string, w: number, h: number, opts: { over?: (p: T) => React.ReactNode; under?: (p: T) => React.ReactNode } = {}): React.FC<T> {
  const Comp: React.FC<T> = (props) => (
    <G {...props}>
      {opts.under?.(props)}
      <Im n={n} w={w} h={h} />
      {opts.over?.(props)}
    </G>
  );
  return Comp;
}
const label = (y: number, size: number, fill = "#F8FAFC") => (p: { label?: string }) =>
  p.label ? <text x={0} y={y} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={size} fill={fill} stroke="#0B1120" strokeWidth={size / 7} paintOrder="stroke">{p.label}</text> : null;
const pill = (y: number, size: number, bg: string) => (p: { label?: string }) =>
  p.label ? (
    <g transform={`translate(0 ${y})`}>
      <rect x={-p.label.length * size * 0.36 - 18} y={-size * 0.85} width={p.label.length * size * 0.72 + 36} height={size * 1.5} rx={size * 0.75} fill={bg} />
      <text x={0} y={size * 0.2} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={size} fill="#0F172A">{p.label}</text>
    </g>
  ) : null;

/* ---------- anatomy (Gemini head / brain + glow overlays) ---------- */

/** O01 head cross-section (821x900). Overlay anchors measured on the image (local units, image height 460):
 *  brain centre (41,-69), prefrontal = front of brain (138,-64), amygdala = deep centre (46,-9). */
export const Head: React.FC<P & { front?: number; deep?: number; glitch?: number }> = ({ front = 0, deep = 0, glitch = 0, ...p }) => (
  <G {...p} x={p.x + (glitch ? Math.sin(p.x + glitch * 97) * 6 * glitch : 0)}>
    {glitch > 0 && <Im n="O01_head_section" w={420} h={460} cx={-10 * glitch} op={0.55} filter="hue-rotate(180deg) saturate(3)" />}
    {glitch > 0 && <Im n="O01_head_section" w={420} h={460} cx={10 * glitch} op={0.55} filter="hue-rotate(-40deg) saturate(3)" />}
    <Im n="O01_head_section" w={420} h={460} />
    {front > 0 && <ellipse cx={138} cy={-64} rx={58} ry={70} fill={C.amber} opacity={0.55 * front} style={{ mixBlendMode: "screen" }} />}
    {deep > 0 && (
      <>
        <circle cx={46} cy={-9} r={60 * deep} fill={C.coral} opacity={0.3 * deep} />
        <ellipse cx={46} cy={-9} rx={20} ry={13} fill={C.coral} opacity={deep} transform="rotate(-20 46 -9)" />
      </>
    )}
  </G>
);

/** O02 brain (900x812, front = right). */
export const Brain: React.FC<P & { front?: number; deep?: number; glitch?: number; tint?: string }> = ({ front = 0, deep = 0, glitch = 0, ...p }) => (
  <G {...p}>
    {glitch > 0 && <Im n="O02_brain_glow" w={280} h={252} cx={-8 * glitch} op={0.55} filter="hue-rotate(180deg) saturate(3)" />}
    <Im n="O02_brain_glow" w={280} h={252} />
    {front > 0 && <ellipse cx={85} cy={-25} rx={55} ry={65} fill={C.amber} opacity={0.5 * front} style={{ mixBlendMode: "screen" }} />}
    {deep > 0 && (
      <>
        <circle cx={10} cy={25} r={45 * deep} fill={C.coral} opacity={0.35 * deep} />
        <ellipse cx={10} cy={25} rx={15} ry={10} fill={C.coral} opacity={deep} transform="rotate(-20 10 25)" />
      </>
    )}
  </G>
);

/* ---------- characters ---------- */

export const Ceo = obj<P & { wave?: number }>("C01_ceo", 280, 320);
export const Amyg: React.FC<P & { panic?: number; t?: number; whistle?: boolean }> = (p) => {
  const sh = p.panic ? Math.sin((p.t ?? 0) * 40) * 4 * p.panic : 0;
  return (
    <G {...p} x={p.x + sh} s={(p.s ?? 1) * (1 + 0.08 * (p.panic ?? 0))}>
      {p.panic ? <circle r={150} fill={C.coral} opacity={0.25 * p.panic} /> : null}
      <Im n="C02_amygdala" w={260} h={260} />
    </G>
  );
};
export const Caveman: React.FC<P & { t?: number }> = (p) => (
  <G {...p} y={p.y - Math.abs(Math.sin((p.t ?? 0) * 9)) * 18}><Im n="C03_caveman" w={240} h={320} /></G>
);
export const Tiger: React.FC<P & { t?: number }> = (p) => (
  <G {...p} y={p.y - Math.abs(Math.sin((p.t ?? 0) * 8 + 1)) * 16}><Im n="C04_sabertooth" w={440} h={300} cx={30} /></G>
);
export const Person: React.FC<P & { color?: string }> = ({ color, ...p }) => (
  <G {...p}><Im n="O51_stranger" w={220} h={260} filter={color && color !== "#64748B" && color !== "#475569" ? `drop-shadow(0 0 18px ${color})` : undefined} /></G>
);
export const Fist = obj<P>("O52_fist", 240, 240);

/* ---------- objects ---------- */

export const Phone = obj<P & { glow?: number; badge?: boolean }>("O05_smartphone", 180, 290, {
  under: (p) => (p.glow ? <rect x={-100} y={-160} width={200} height={320} rx={60} fill={C.amber} opacity={0.15 * p.glow} /> : null),
});
/** O04 laptop (900x645): white screen ≈ x -114..114, y -118..38 (local, w=380). `fill` types grey lines on it. */
export const Laptop = obj<P & { t?: number; fill?: number }>("O04_laptop_blank", 380, 272, {
  over: (p) => (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={-95} y={-100 + i * 22} width={(i === 5 ? 100 : 185) * Math.min(1, Math.max(0, (p.fill ?? 0) * 6 - i))} height={8} rx={4} fill="#94A3B8" />
      ))}
    </>
  ),
});
export const Clock = obj<P & { m?: number; h?: number; red?: boolean }>("O06_wall_clock", 240, 240, {
  over: (p) => (
    <>
      <line x1={0} y1={0} x2={0} y2={-48} stroke="#0B1120" strokeWidth={9} strokeLinecap="round" transform={`rotate(${(p.h ?? 0) * 30})`} />
      <line x1={0} y1={0} x2={0} y2={-70} stroke={C.coral} strokeWidth={6} strokeLinecap="round" transform={`rotate(${(p.m ?? 0) * 6})`} />
      <circle r={8} fill="#0B1120" />
      {p.red ? <circle r={118} fill="none" stroke={C.coral} strokeWidth={6} opacity={0.8} /> : null}
    </>
  ),
});
export const Calendar = obj<P & { mark?: number; label?: string }>("O25_calendar", 250, 250, {
  under: (p) => (p.mark ? <circle r={150} fill={C.coral} opacity={0.12 * p.mark} /> : null),
  over: pill(-150, 30, C.amber),
});
export const Papers: React.FC<P & { n?: number; lean?: number }> = (p) => {
  const h = Math.max(200, (p.n ?? 8) * 18 + 60);
  return <G {...p}><Im n="O07_papers_stack" w={h * 0.8} h={h} cy={-h / 2 + 30} /></G>;
};
export const Sheet = obj<P & { red?: number }>("O17_spreadsheet", 360, 260, {
  under: (p) => (p.red ? <rect x={-190} y={-140} width={380} height={280} rx={24} fill={C.coral} opacity={0.45 * p.red} /> : null),
});
export const Boulder = obj<P & { label?: string }>("O08_boulder", 300, 260, { over: label(15, 34) });
export const Pebble = obj<P & { label?: string }>("O09_pebble", 170, 130, { over: label(10, 30) });
export const Lock: React.FC<P & { open?: number; color?: string }> = (p) => (
  <G {...p}><Im n={(p.open ?? 0) > 0.5 ? "O11_padlock_open" : "O10_padlock_closed"} w={220} h={260} cy={-10} /></G>
);
export const Heart = obj<P & { glow?: number }>("O12_heart", 260, 240, {
  under: (p) => (p.glow ? <circle r={160} fill={C.coral} opacity={0.22 * p.glow} /> : null),
});
export const Flask = obj<P & { level?: number; t?: number }>("O13_dopamine_flask", 260, 300, {
  under: () => <circle r={170} fill={C.amber} opacity={0.15} />,
  over: (p) => <>{Array.from({ length: 5 }, (_, i) => <circle key={i} cx={-40 + i * 20} cy={70 - (((p.t ?? 0) * 50 + i * 31) % 120)} r={6} fill="#FDE68A" opacity={0.8} />)}</>,
});
/** O14 retro computer: `lines` types green boot text on the CRT (screen ≈ x -120..80, y -120..-10, w=420). */
export const Crt = obj<P & { lines?: number; t?: number }>("O14_retro_computer", 420, 380, {
  over: (p) => <>{Array.from({ length: 4 }, (_, i) => <rect key={i} x={-110} y={-110 + i * 24} width={(i % 2 ? 120 : 170) * Math.min(1, Math.max(0, (p.lines ?? 0) * 4 - i))} height={10} fill="#4ADE80" opacity={0.85} />)}</>,
});
export const Bell: React.FC<P & { ring?: number }> = (p) => (
  <G {...p} rot={(p.rot ?? 0) + (p.ring ?? 0) * 15}><Im n="O15_bell" w={200} h={200} /></G>
);
export const AlarmButton = obj<P & { press?: number; flash?: number }>("O16_alarm_button", 280, 230, {
  under: (p) => (p.flash ? <circle cy={-10} r={170} fill={C.coral} opacity={0.35 * p.flash} /> : null),
});
export const Scanner = obj<P & { scan?: number }>("O03_fmri", 520, 420, {
  over: (p) => (p.scan ? <rect x={-260 + 520 * p.scan - 6} y={-200} width={12} height={400} fill={C.teal} opacity={0.6} /> : null),
});
export const Couch = obj<P>("O31_couch", 440, 240);
export const Cookie = obj<P>("O20_cookie", 150, 150);
export const Chest = obj<P>("O21_treasure_chest", 340, 280);
export const FuelCan = obj<P & { pour?: number }>("O19_fuel_can", 260, 280, {
  over: (p) => (p.pour ? <path d={`M 90 -110 C 140 -120 170 -60 180 ${-60 + 160 * p.pour}`} fill="none" stroke={C.amber} strokeWidth={14} strokeLinecap="round" /> : null),
});
export const Briefcase = obj<P>("O23_briefcase", 230, 200);
export const GradCap = obj<P>("O24_graduation_cap", 250, 210);
export const Gears: React.FC<P & { t?: number }> = (p) => <G {...p} rot={(p.rot ?? 0) + Math.sin((p.t ?? 0) * 1.5) * 8}><Im n="O26_gears" w={260} h={230} /></G>;
export const Telescope = obj<P>("O27_telescope", 270, 270);
export const Folder = obj<P & { color?: string }>("O28_folders", 240, 200);
export const Keyboard = obj<P>("O29_keyboard", 320, 160);
export const Bulb = obj<P & { on?: number }>("O35_lightbulb", 220, 270);
export const Remote = obj<P>("O34_tv_remote", 120, 240);
export const Dumbbell = obj<P>("O32_dumbbell", 300, 150);
export const Book = obj<P>("O33_textbook", 200, 240);
export const TaxForm = obj<P>("O18_tax_form", 220, 280);
export const Pencils = obj<P>("O30_pencils", 220, 220);
export const Almond = obj<P>("O36_almond", 180, 150);
export const Flame: React.FC<P & { h?: number; t?: number }> = ({ h = 1, t = 0, ...p }) =>
  h <= 0.02 ? null : (
    <G {...p} s={(p.s ?? 1) * h}>
      <g transform={`scale(${1 + Math.sin(t * 12) * 0.04}, ${1 + Math.cos(t * 9) * 0.06})`}><Im n="O48_flame" w={240} h={280} cy={-30} filter={`drop-shadow(0 0 30px ${C.amber})`} /></g>
    </G>
  );
export const Weight = obj<P & { label?: string }>("O49_weight_guilt", 230, 230, { over: label(40, 30, C.coral) });
export const Knot: React.FC<P & { t?: number }> = (p) => <G {...p} rot={(p.rot ?? 0) + (p.t ?? 0) * 25}><Im n="O50_tangled_knot" w={220} h={220} /></G>;
export const PlayCard = obj<P>("O53_video_card", 260, 180);
/** O54 door; `open` swings it toward the hinge (left) revealing a dark doorway. */
export const Door: React.FC<P & { open?: number }> = ({ open = 0, ...p }) => (
  <G {...p}>
    {open > 0 && <rect x={-75} y={-140} width={150} height={280} fill="#020617" />}
    <foreignObject x={-90} y={-150} width={180} height={300} style={{ overflow: "visible" }}>
      <DoorImg open={open} />
    </foreignObject>
  </G>
);
const DoorImg: React.FC<{ open: number }> = ({ open }) => {
  const asset = useAsset();
  const has = useHas();
  if (!has.has("O54_door")) throw new Error('Missing Gemini asset "O54_door" (TASTE-35)');
  return <Img src={asset("O54_door.png")} style={{ width: "100%", height: "100%", objectFit: "contain", transform: `perspective(600px) rotateY(${-70 * open}deg)`, transformOrigin: "left center" }} />;
};
export const Moon = obj<P>("O55_moon", 200, 200);

/** O22 balance scale (900x692, w=560). Pans at (±174, 56); the whole scale tips by `tilt` (-1 left down .. 1 right down). */
export const Scale: React.FC<P & { tilt?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ tilt = 0, left, right, ...p }) => {
  const a = tilt * 7;
  const r = (a * Math.PI) / 180;
  const pan = (sx: number) => ({ x: sx * 174 * Math.cos(r), y: 56 + sx * 174 * Math.sin(r) - 20 });
  const L = pan(-1), R = pan(1);
  return (
    <G {...p}>
      <g transform={`rotate(${a} 0 -170)`}><Im n="O22_balance_scale" w={560} h={430} /></g>
      <g transform={`translate(${L.x} ${L.y - 40})`}>{left}</g>
      <g transform={`translate(${R.x} ${R.y - 40})`}>{right}</g>
    </G>
  );
};

export { Check, Cross, Puzzle };
