// Same API as icons.tsx, but each icon draws its Gemini illustration (public/brain/<ep>/<id>.png, cropped to the subject)
// when that asset exists (AssetCtx), keeping the vector version as fallback and for animated variants (`vec`).
import React from "react";
import { Img } from "remotion";
import { C, useAsset, useHas } from "./kit";
import * as V from "./icons";

type P = { x: number; y: number; s?: number; k?: number; rot?: number; op?: number };
const G = V.G;

/** Image inside SVG via foreignObject so Remotion's <Img> waits for the load (no blank frames). */
export const Im: React.FC<{ n: string; w: number; h: number; cx?: number; cy?: number }> = ({ n, w, h, cx = 0, cy = 0 }) => {
  const asset = useAsset();
  return (
  <foreignObject x={cx - w / 2} y={cy - h / 2} width={w} height={h} style={{ overflow: "visible" }}>
    <Img src={asset(`${n}.png`)} style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.35))" }} />
  </foreignObject>
  );
};

function imgFirst<T extends P>(
  n: string, w: number, h: number, Vec: React.FC<T>,
  opts: { over?: (p: T) => React.ReactNode; under?: (p: T) => React.ReactNode; useVec?: (p: T) => boolean } = {},
): React.FC<T & { vec?: boolean }> {
  const Comp: React.FC<T & { vec?: boolean }> = (props) => {
    const has = useHas();
    if (props.vec || !has.has(n) || opts.useVec?.(props)) return <Vec {...props} />;
    return (
      <G {...props}>
        {opts.under?.(props)}
        <Im n={n} w={w} h={h} />
        {opts.over?.(props)}
      </G>
    );
  };
  return Comp;
}
const label = (y: number, size: number, fill: string) => (p: { label?: string }) =>
  p.label ? <text x={0} y={y} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={size} fill={fill} stroke="#0B1120" strokeWidth={size / 7} paintOrder="stroke">{p.label}</text> : null;

export const Brain = imgFirst("O02_brain_glow", 280, 240, V.Brain, {
  useVec: (p) => !!p.deep || !!p.glitch,
  over: (p) => (p.front ? <ellipse cx={80} cy={-20} rx={60} ry={70} fill={C.amber} opacity={0.45 * p.front} /> : null),
});
export const Head = V.Head; // anatomy glows need the vector head
export const Ceo = imgFirst("C01_ceo", 280, 320, V.Ceo);
export const Amyg: React.FC<React.ComponentProps<typeof V.Amyg> & { vec?: boolean }> = (p) => {
  const has = useHas();
  if (p.vec || !has.has("C02_amygdala")) return <V.Amyg {...p} />;
  const sh = p.panic ? Math.sin((p.t ?? 0) * 40) * 4 * p.panic : 0;
  return (
    <G {...p} x={p.x + sh} s={(p.s ?? 1) * (1 + 0.08 * (p.panic ?? 0))}>
      {p.panic ? <circle r={150} fill={C.coral} opacity={0.25 * p.panic} /> : null}
      <Im n="C02_amygdala" w={260} h={260} />
    </G>
  );
};
export const Phone = imgFirst("O05_smartphone", 180, 290, V.Phone, {
  under: (p) => (p.glow ? <rect x={-100} y={-160} width={200} height={320} rx={60} fill={C.amber} opacity={0.15 * p.glow} /> : null),
});
export const Laptop = imgFirst("O04_laptop_blank", 380, 280, V.Laptop, { useVec: (p) => !!p.fill });
export const Clock = imgFirst("O06_wall_clock", 240, 240, V.Clock, {
  over: (p) => (
    <>
      <line x1={0} y1={0} x2={0} y2={-48} stroke="#0B1120" strokeWidth={9} strokeLinecap="round" transform={`rotate(${(p.h ?? 0) * 30})`} />
      <line x1={0} y1={0} x2={0} y2={-70} stroke={C.coral} strokeWidth={6} strokeLinecap="round" transform={`rotate(${(p.m ?? 0) * 6})`} />
      <circle r={8} fill="#0B1120" />
      {p.red ? <circle r={118} fill="none" stroke={C.coral} strokeWidth={6} opacity={0.8} /> : null}
    </>
  ),
});
export const Calendar = imgFirst("O25_calendar", 250, 250, V.Calendar, { useVec: (p) => !!p.label });
export const Papers: React.FC<React.ComponentProps<typeof V.Papers> & { vec?: boolean }> = (p) => {
  const has = useHas();
  if (p.vec || !has.has("O07_papers_stack")) return <V.Papers {...p} />;
  const n = p.n ?? 8;
  const h = Math.max(200, n * 18 + 60);
  return <G {...p}><Im n="O07_papers_stack" w={h * 0.8} h={h} cy={-h / 2 + 30} /></G>;
};
export const Sheet = imgFirst("O17_spreadsheet", 360, 260, V.Sheet, {
  under: (p) => (p.red ? <rect x={-190} y={-140} width={380} height={280} rx={24} fill={C.coral} opacity={0.45 * p.red} /> : null),
});
export const Boulder = imgFirst("O08_boulder", 300, 260, V.Boulder, { over: label(15, 34, "#F8FAFC") });
export const Pebble = imgFirst("O09_pebble", 170, 130, V.Pebble, { over: label(10, 30, "#F8FAFC") });
export const Lock: React.FC<React.ComponentProps<typeof V.Lock> & { vec?: boolean }> = (p) => {
  const has = useHas();
  const n = (p.open ?? 0) > 0.5 ? "O11_padlock_open" : "O10_padlock_closed";
  if (p.vec || !has.has(n)) return <V.Lock {...p} />;
  return <G {...p}><Im n={n} w={220} h={260} cy={-10} /></G>;
};
export const Heart = imgFirst("O12_heart", 260, 240, V.Heart, {
  under: (p) => (p.glow ? <circle r={160} fill={C.coral} opacity={0.22 * p.glow} /> : null),
});
export const Flask = imgFirst("O13_dopamine_flask", 260, 300, V.Flask, {
  under: () => <circle r={170} fill={C.amber} opacity={0.15} />,
});
export const Crt = imgFirst("O14_retro_computer", 420, 380, V.Crt);
export const Bell: React.FC<React.ComponentProps<typeof V.Bell> & { vec?: boolean }> = (p) => {
  const has = useHas();
  if (p.vec || !has.has("O15_bell")) return <V.Bell {...p} />;
  return <G {...p} rot={(p.rot ?? 0) + (p.ring ?? 0) * 15}><Im n="O15_bell" w={200} h={200} /></G>;
};
export const AlarmButton = imgFirst("O16_alarm_button", 280, 230, V.AlarmButton, {
  under: (p) => (p.flash ? <circle cy={-10} r={170} fill={C.coral} opacity={0.35 * p.flash} /> : null),
});
export const Scanner = imgFirst("O03_fmri", 520, 420, V.Scanner, {
  over: (p) => (p.scan ? <rect x={-260 + 520 * p.scan - 6} y={-200} width={12} height={400} fill={C.teal} opacity={0.6} /> : null),
});
export const Couch = imgFirst("O31_couch", 440, 240, V.Couch);
export const Cookie = imgFirst("O20_cookie", 150, 150, V.Cookie);
export const Chest = imgFirst("O21_treasure_chest", 340, 280, V.Chest);
export const FuelCan = imgFirst("O19_fuel_can", 260, 280, V.FuelCan, {
  over: (p) => (p.pour ? <path d={`M 90 -110 C 140 -120 170 -60 180 ${-60 + 160 * p.pour}`} fill="none" stroke={C.amber} strokeWidth={14} strokeLinecap="round" /> : null),
});
export const Briefcase = imgFirst("O23_briefcase", 230, 200, V.Briefcase);
export const GradCap = imgFirst("O24_graduation_cap", 250, 210, V.GradCap);
export const Gears = imgFirst("O26_gears", 260, 230, V.Gears);
export const Telescope = imgFirst("O27_telescope", 270, 270, V.Telescope);
export const Folder = imgFirst("O28_folders", 240, 200, V.Folder);
export const Keyboard = imgFirst("O29_keyboard", 320, 160, V.Keyboard);
export const Bulb = imgFirst("O35_lightbulb", 220, 270, V.Bulb);
export const Remote = imgFirst("O34_tv_remote", 120, 240, V.Remote);
export const Dumbbell = imgFirst("O32_dumbbell", 300, 150, V.Dumbbell);
export const Book = imgFirst("O33_textbook", 200, 240, V.Book);
export const Caveman: React.FC<React.ComponentProps<typeof V.Caveman> & { vec?: boolean }> = (p) => {
  const has = useHas();
  if (p.vec || !has.has("C03_caveman")) return <V.Caveman {...p} />;
  return <G {...p} y={p.y - Math.abs(Math.sin((p.t ?? 0) * 9)) * 18}><Im n="C03_caveman" w={240} h={320} /></G>;
};
export const Tiger: React.FC<React.ComponentProps<typeof V.Tiger> & { vec?: boolean }> = (p) => {
  const has = useHas();
  if (p.vec || !has.has("C04_sabertooth")) return <V.Tiger {...p} />;
  return <G {...p} y={p.y - Math.abs(Math.sin((p.t ?? 0) * 8 + 1)) * 16}><Im n="C04_sabertooth" w={440} h={300} cx={30} /></G>;
};
export const TaxForm: React.FC<P> = (p) => {
  const has = useHas();
  return has.has("O18_tax_form") ? <G {...p}><Im n="O18_tax_form" w={220} h={280} /></G> : <V.Papers {...p} n={3} />;
};
export const Pencils: React.FC<P> = (p) => {
  const has = useHas();
  return has.has("O30_pencils") ? <G {...p}><Im n="O30_pencils" w={220} h={220} /></G> : null;
};
export const Almond: React.FC<P> = (p) => {
  const has = useHas();
  return has.has("O36_almond") ? <G {...p}><Im n="O36_almond" w={180} h={150} /></G> : <G {...p}><ellipse rx={60} ry={36} fill="#C08552" stroke="#0B1120" strokeWidth={5} /></G>;
};

export const {
  Scale, Flame, Weight, Knot, Person, Fist, PlayCard, Door, Check, Cross, Puzzle,
} = V;
