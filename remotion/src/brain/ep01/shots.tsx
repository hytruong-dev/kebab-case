// Episode 01 "Why Your Brain Loves Procrastinating" — 72 shots, one per narration beat (owner doc v2, section 5 + research beats,
// 10-11 min episode, modular [BRIDGE_TRANSITION] + [SINGLE_OUTRO] ending).
// Picture changes every 3-5 s (plan 2.1): each shot builds in 2-3 stages on its own clock t (s since the beat began).
// Mascot = Gemini assets (M01..M15 in public/brain/ep01); everything else = vector icons (icons.tsx) + kinetic type.
import React from "react";
import { Easing, interpolate } from "remotion";
import { Arrow, Bar, C, Card, Count, FONT, Glow, Hero, Meter, Pic, Ring, S, Tag, Title, lerp, pop, ramp, useHas } from "../kit";
import {
  AlarmButton, Amyg, Bell, Book, Boulder, Brain, Briefcase, Calendar, Caveman, Ceo, Check, Chest, Clock, Cookie, Couch, Cross, Crt, Door,
  Dumbbell, Fist, Flame, Flask, Folder, FuelCan, Gears, GradCap, Head, Heart, Keyboard, Knot, Laptop, Lock, Pebble, Person, Phone, PlayCard,
  Puzzle, Remote, Scale, Scanner, Sheet, Telescope, Tiger, Weight, Papers, Couch as Sofa, Almond, Pencils, TaxForm,
  Im, Moon,
} from "../iconsImg";
import { G as Grp } from "../icons";

import type { ShotProps } from "../kit";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const M: React.FC<{ n: string; t: number; x?: number; y?: number; size?: number; at?: number; flip?: boolean }> = ({ n, t, x = 360, y = 640, size = 760, at = 0, flip }) => (
  <Pic n={n} cx={x} cy={y} size={size} k={pop(t, at, 0.5)} t={t} float={6} flip={flip} />
);
const Sub: React.FC<{ x: number; y: number; text: string; k: number; color?: string; size?: number; w?: number }> = ({ x, y, text, k, color = C.dim, size = 36, w }) =>
  k <= 0.01 ? null : (
    <div style={{ position: "absolute", left: x, top: y, width: w, transform: `translate(-50%, -50%) translateY(${(1 - k) * 20}px)`, opacity: k, fontFamily: FONT, fontWeight: 700, fontSize: size, color, textAlign: "center", lineHeight: 1.25 }}>
      {text}
    </div>
  );

/** Gemini hero illustration (plan section 5 prompt) as the beat's backdrop; falls back to the vector build if missing. */
/** Slow camera drift over the whole beat (push-in + lateral sway) — keeps long beats alive (doc 7.2: never static > 4 s). */
const Drift: React.FC<{ t: number; d: number; children: React.ReactNode; amt?: number }> = ({ t, d, children, amt = 0.07 }) => {
  const p = Math.min(1, t / Math.max(1, d));
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${1 + amt * p}) translate(${Math.sin(t * 0.35) * 14}px, ${Math.cos(t * 0.3) * 8}px)`, transformOrigin: "50% 45%" }}>
      {children}
    </div>
  );
};

/** Late-beat kickers so long beats keep changing: pills pop at 55% and 80% of the beat. */
const Kick: React.FC<{ t: number; d: number; a: string; b?: string; y?: number }> = ({ t, d, a, b, y = 960 }) => (
  <>
    <Tag x={b ? 700 : 960} y={y} text={a} bg={C.amber} k={pop(t, d * 0.55) * (0.94 + 0.06 * Math.sin(t * 4))} size={30} />
    {b && <Tag x={1240} y={y} text={b} bg={C.teal} k={pop(t, d * 0.8) * (0.94 + 0.06 * Math.sin(t * 4 + 1))} size={30} />}
  </>
);

/** Any published Gemini prop by id (cropped png), placed in SVG space, with fallback node when missing. */
const Obj: React.FC<{ n: string; x: number; y: number; w: number; h?: number; k?: number; rot?: number; fallback?: React.ReactNode }> = ({ n, x, y, w, h, k = 1, rot = 0, fallback = null }) => {
  const has = useHas();
  if (k <= 0.01) return null;
  if (!has.has(n)) return <>{fallback}</>;
  return <Grp x={x} y={y} k={k} rot={rot}><Im n={n} w={w} h={h ?? w} /></Grp>;
};

const HeroOr: React.FC<{ n: string; t: number; d?: number; dim?: number; children?: React.ReactNode; fallback: React.ReactNode }> = ({ n, t, d = 8, dim = 0, children, fallback }) => {
  const has = useHas();
  if (!has.has(n)) return <>{fallback}</>;
  return (
    <>
      <Hero n={n} t={t} d={d} from={1.0} to={1.1} />
      {dim > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(15,23,42,${dim})` }} />}
      {children}
    </>
  );
};

/* ================= c1 · Hook ================= */

export const hook_deadline: React.FC<ShotProps> = ({ t, d }) => (
  <HeroOr n="H1_desk_hook" t={t} d={d} fallback={<HookDeadlineVec t={t} d={d} />}>
    <Tag x={360} y={150} text="DEADLINE" bg={C.coral} color={C.text} k={pop(t, 1.0)} size={44} />
    <Title x={360} y={250} text="TOMORROW." color={C.text} size={80} k={pop(t, 2.0)} />
  </HeroOr>
);
const HookDeadlineVec: React.FC<ShotProps> = ({ t }) => (
  <>
    <Glow cx={1300} cy={480} r={520} color={C.coral} op={0.18 + 0.08 * Math.sin(t * 4)} />
    <S>
      <Calendar x={1320} y={470} s={1.6} k={pop(t, 0.3)} mark={ramp(t, 1.2, 0.8)} label="DEADLINE" />
      <Clock x={1700} y={200} s={0.8} k={pop(t, 1.6)} m={t * 40} h={11 + t * 0.6} red />
    </S>
    <M n="M01_explaining" t={t} x={420} />
    <Title x={1320} y={870} text="TOMORROW." color={C.coral} size={96} k={pop(t, 2.2)} />
  </>
);

export const hook_avoid: React.FC<ShotProps> = ({ t }) => {
  const items = [
    { at: 1.0, el: (k: number) => <Folder x={1120} y={330} s={1.1} k={k} rot={Math.sin(t * 3) * 6} />, label: "Reorganize folders" },
    { at: 3.3, el: (k: number) => <Keyboard x={1500} y={330} s={0.9} k={k} />, label: "Wipe the keyboard" },
    { at: 5.6, el: (k: number) => <PlayCard x={1310} y={640} s={1.0} k={k} />, label: "How pencils are made" },
  ];
  return (
    <>
      <M n="M11_polishing" t={t} x={380} />
      <S>{items.map((it, i) => <g key={i}>{it.el(pop(t, it.at))}</g>)}</S>
      {items.map((it, i) => (
        <Sub key={i} x={[1120, 1500, 1310][i]} y={[460, 460, 760][i]} text={it.label} k={pop(t, it.at + 0.2)} color={C.text} size={30} />
      ))}
      <S><Pencils x={1560} y={640} s={0.8} k={pop(t, 6.0)} rot={-15} /></S>
      <Count x={1310} y={900} to={45} t={t} at={0.2} dur={7.5} suffix=" min" size={86} color={C.amber} />
    </>
  );
};

export const hook_familiar: React.FC<ShotProps> = ({ t }) => {
  const stamp = pop(t, 3.2, 0.3);
  return (
    <>
      <M n="M08_burnout" t={t} x={600} y={620} size={720} />
      <Title x={1350} y={300} text="Sound familiar?" size={64} k={pop(t, 0.3)} />
      {stamp > 0.01 && (
        <div style={{ position: "absolute", left: 1350, top: 560, transform: `translate(-50%,-50%) rotate(-12deg) scale(${lerp(2.4, 1, stamp)})`, opacity: stamp, border: `10px solid ${C.coral}`, color: C.coral, fontFamily: FONT, fontWeight: 900, fontSize: 130, padding: "4px 36px", borderRadius: 18 }}>
          LAZY?
        </div>
      )}
      <Tag x={1350} y={820} text="Plot twist: neuroscience ↓" k={pop(t, 6.2)} bg={C.teal} />
    </>
  );
};

export const hook_twist: React.FC<ShotProps> = ({ t }) => {
  const row = (y: number, text: string, at: number, crossAt: number) => (
    <>
      <Title x={1240} y={y} text={text} size={66} k={pop(t, at)} color={C.text} />
      {t > crossAt && <div style={{ position: "absolute", left: 1240 - 380, top: y - 6, width: 760 * ramp(t, crossAt, 0.35), height: 14, background: C.coral, borderRadius: 7, transform: "rotate(-3deg)" }} />}
    </>
  );
  return (
    <>
      <M n="M03_shocked" t={t} x={380} />
      {row(380, "LAZINESS", 0.2, 1.8)}
      {row(620, "TIME MANAGEMENT", 2.6, 4.4)}
      <S><Cross x={1700} y={380} s={1.2} k={pop(t, 1.9)} /><Cross x={1700} y={620} s={1.2} k={pop(t, 4.5)} /></S>
    </>
  );
};

export const hook_stats: React.FC<ShotProps> = ({ t }) => (
  <>
    <Ring cx={600} cy={500} r={230} p={ramp(t, 0.4, 2.0) * 0.95} color={C.amber} w={44} />
    <Count x={600} y={490} to={95} t={t} at={0.4} dur={2.0} suffix="%" size={150} />
    <Sub x={600} y={830} text="of people procrastinate" k={pop(t, 1.2)} color={C.text} size={40} />
    <Ring cx={1320} cy={500} r={230} p={ramp(t, 3.6, 1.6) * 0.2} color={C.coral} w={44} />
    <Count x={1320} y={490} to={20} t={t} at={3.6} dur={1.6} suffix="%" size={150} color={C.coral} />
    <Sub x={1320} y={830} text="do it chronically" k={pop(t, 4.2)} color={C.text} size={40} />
    <Pic n="M03_shocked" cx={1720} cy={880} size={360} k={pop(t, 5.2)} t={t} float={4} />
  </>
);

export const hook_glitch: React.FC<ShotProps> = ({ t }) => {
  const g = t > 3 ? (Math.floor(t * 15) % 3 === 0 ? 1 : 0.3) : 0;
  return (
    <>
      <Glow cx={1100} cy={520} r={480} color={C.coral} op={g * 0.25} />
      <Meter x={180} y={300} w={520} p={Math.max(0.05, 1 - ramp(t, 0.6, 2.2))} color={C.amber} label="WILLPOWER" />
      <Sub x={440} y={420} text="Not the problem" k={pop(t, 2.4)} color={C.dim} size={32} />
      <S><Head x={1150} y={560} s={1.5} k={pop(t, 2.6)} glitch={g} deep={g} /></S>
      <Tag x={1150} y={150} text="⚠ BRAIN GLITCH" bg={C.coral} color={C.text} k={pop(t, 3.4)} size={44} />
    </>
  );
};

export const hook_promise: React.FC<ShotProps> = ({ t }) => {
  const zoom = ramp(t, 0.2, 2.5, Easing.inOut(Easing.cubic));
  return (
    <>
      <S><Head x={lerp(960, 960, zoom)} y={lerp(560, 700, zoom)} s={lerp(1.2, 3.2, zoom)} front={ramp(t, 2.6, 0.6)} deep={ramp(t, 2.6, 0.6)} /></S>
      <Tag x={460} y={260} text="7 MINUTES" bg={C.panel} color={C.amber} k={pop(t, 0.6)} size={40} />
      <Card x={1250} y={300} w={560} h={110} k={ramp(t, 4.4, 0.5)} color={C.coral}><div style={{ fontSize: 38, fontWeight: 800 }}>Why it sabotages you</div></Card>
      <Card x={1250} y={440} w={560} h={110} k={ramp(t, 6.0, 0.5)} color={C.teal}><div style={{ fontSize: 38, fontWeight: 800 }}>3 ways to rewire it</div></Card>
    </>
  );
};

/* ================= c2 · Two roommates ================= */

export const roommates_intro: React.FC<ShotProps> = ({ t, d }) => (
  <HeroOr n="H2_brain_roommates" t={t} d={d} fallback={<RoommatesVec t={t} d={d} />}>
    <Tag x={960} y={90} text="2 roommates in your head" bg={C.amber} k={pop(t, 0.6)} size={44} />
  </HeroOr>
);
const RoommatesVec: React.FC<ShotProps> = ({ t }) => (
  <>
    <S>
      <Head x={960} y={600} s={1.7} k={pop(t, 0.1)} />
      <Ceo x={1060} y={430} s={0.8} k={pop(t, 1.6)} />
      <Amyg x={900} y={560} s={0.6} k={pop(t, 2.4)} t={t} />
    </S>
    <Title x={960} y={130} text="2 roommates in your head" size={70} k={pop(t, 0.6)} />
  </>
);

export const pfc_ceo: React.FC<ShotProps> = ({ t }) => (
  <>
    <S>
      <Head x={560} y={620} s={1.4} k={1} front={ramp(t, 0.6, 0.6)} />
      <Arrow x1={760} y1={420} x2={1000} y2={420} color={C.amber} w={8} p={ramp(t, 2.2, 0.5)} />
      <Ceo x={1300} y={520} s={1.9} k={pop(t, 3.0)} wave={Math.sin(t * 2) * 0.5 + 0.5} />
    </S>
    <Tag x={560} y={200} text="PREFRONTAL CORTEX" k={pop(t, 0.8)} />
    <Sub x={560} y={260} text="right behind your forehead" k={pop(t, 1.4)} size={30} />
    <Title x={1300} y={880} text="the rational CEO" size={64} color={C.amber} k={pop(t, 4.2)} />
  </>
);

export const pfc_jobs: React.FC<ShotProps> = ({ t }) => {
  const jobs = [
    { at: 2.8, label: "Long-term planning", el: (k: number) => <Calendar x={1120} y={420} s={0.7} k={k} mark={1} /> },
    { at: 4.2, label: "Logic", el: (k: number) => <Gears x={1420} y={420} s={0.8} k={k} t={t} /> },
    { at: 5.6, label: "Imagining the future", el: (k: number) => <Telescope x={1720} y={420} s={0.8} k={k} /> },
  ];
  return (
    <>
      <S>
        <Ceo x={420} y={560} s={1.8} k={1} />
        {jobs.map((j, i) => <g key={i}>{j.el(pop(t, j.at))}</g>)}
      </S>
      <Tag x={420} y={220} text="NEWEST part of evolution" bg={C.teal} k={pop(t, 0.4)} size={30} />
      {jobs.map((j, i) => <Sub key={i} x={[1120, 1420, 1720][i]} y={600} text={j.label} k={pop(t, j.at + 0.2)} color={C.text} size={28} w={280} />)}
    </>
  );
};

export const amygdala_intro: React.FC<ShotProps> = ({ t }) => {
  const zoom = ramp(t, 0.4, 1.6);
  return (
    <>
      <S>
        <Head x={lerp(960, 1200, zoom)} y={lerp(580, 700, zoom)} s={lerp(1.4, 3.0, zoom)} deep={ramp(t, 2.4, 0.6)} />
        <Pebble x={420} y={720} s={0.01} k={0} />
      </S>
      <Tag x={430} y={280} text="LIMBIC SYSTEM" bg={C.coral} color={C.text} k={pop(t, 1.4)} />
      <Title x={430} y={420} text="the Amygdala" size={72} color={C.coral} k={pop(t, 3.2)} />
      <Sub x={430} y={520} text="tiny · almond-shaped" k={pop(t, 4.4)} size={34} />
      <S><Almond x={430} y={700} s={1.2} k={pop(t, 4.8)} /></S>
    </>
  );
};

export const amygdala_survival: React.FC<ShotProps> = ({ t }) => {
  const dont = [
    { at: 2.4, el: (k: number) => <Briefcase x={1150} y={430} s={0.9} k={k} />, label: "career" },
    { at: 3.6, el: (k: number) => <GradCap x={1450} y={430} s={0.9} k={k} />, label: "grades" },
    { at: 4.8, el: (k: number) => <Calendar x={1750} y={430} s={0.6} k={k} />, label: "5-year plan" },
  ];
  return (
    <>
      <S>
        <Amyg x={480} y={560} s={2.4} k={pop(t, 0.2)} t={t} />
        {dont.map((d, i) => <g key={i}>{d.el(pop(t, d.at))}<Cross x={[1150, 1450, 1750][i]} y={430} s={1.3} k={pop(t, d.at + 0.4)} /></g>)}
      </S>
      <Title x={480} y={170} text="Ancient survival center" size={56} color={C.coral} k={pop(t, 0.8)} />
      {dont.map((d, i) => <Sub key={i} x={[1150, 1450, 1750][i]} y={600} text={d.label} k={pop(t, d.at + 0.2)} color={C.text} size={30} />)}
      <Sub x={1450} y={760} text="doesn't care." k={pop(t, 5.6)} color={C.dim} size={40} />
    </>
  );
};

export const amygdala_two_things: React.FC<ShotProps> = ({ t }) => (
  <>
    <S>
      <Amyg x={960} y={560} s={1.6} k={1} t={t} whistle={false} />
      <Arrow x1={780} y1={560} x2={480} y2={560} color={C.coral} w={12} p={ramp(t, 1.8, 0.5)} />
      <Arrow x1={1140} y1={560} x2={1440} y2={560} color={C.amber} w={12} p={ramp(t, 3.4, 0.5)} />
      <Flame x={330} y={560} s={0.9} h={pop(t, 2.0)} t={t} />
      <Cookie x={1600} y={560} s={1.4} k={pop(t, 3.6)} />
    </S>
    <Title x={960} y={170} text="It only cares about 2 things" size={58} k={pop(t, 0.3)} />
    <Tag x={330} y={830} text="AVOID PAIN — NOW" bg={C.coral} color={C.text} k={pop(t, 2.3)} />
    <Tag x={1600} y={830} text="SEEK PLEASURE — NOW" k={pop(t, 3.9)} />
  </>
);

export const threat_task: React.FC<ShotProps> = ({ t }) => {
  const tasks = [
    { at: 1.0, label: "Boring", el: (k: number) => <Sheet x={520} y={480} s={1.1} k={k} /> },
    { at: 2.6, label: "Confusing", el: (k: number) => <Knot x={960} y={480} s={1.2} k={k} t={t} /> },
    { at: 4.0, label: "Overwhelming", el: (k: number) => <Papers x={1400} y={600} s={1.3} k={k} n={14} /> },
  ];
  return (
    <>
      <S>{tasks.map((x, i) => <g key={i}>{x.el(pop(t, x.at))}</g>)}</S>
      {tasks.map((x, i) => <Tag key={i} x={[520, 960, 1400][i]} y={720} text={x.label} bg={C.panel} color={C.text} k={pop(t, x.at + 0.2)} />)}
      <S><TaxForm x={1700} y={460} s={0.9} k={pop(t, 5.6)} rot={8} /></S>
      <Sub x={960} y={880} text="like filing taxes · writing a difficult report" k={pop(t, 6.0)} size={34} />
    </>
  );
};

export const threat_alarm: React.FC<ShotProps> = ({ t }) => {
  const red = ramp(t, 2.6, 0.5);
  const flash = t > 2.6 ? (Math.floor(t * 6) % 2 === 0 ? 1 : 0.3) : 0;
  return (
    <>
      <Glow cx={960} cy={540} r={700} color={C.coral} op={0.25 * flash} />
      <S>
        <Sheet x={1300} y={480} s={1.3} k={1} red={red} />
        <Amyg x={560} y={600} s={1.8} k={1} t={t} panic={red} />
      </S>
      <Sub x={1300} y={240} text="harmless piece of work?" k={pop(t, 0.3) * (1 - red)} size={36} color={C.text} />
      <Title x={1300} y={780} text="THREAT!" size={110} color={C.coral} k={pop(t, 2.8)} />
      <Sub x={1300} y={880} text="to your self-esteem & comfort" k={pop(t, 3.6)} size={34} />
    </>
  );
};

export const fight_flight: React.FC<ShotProps> = ({ t }) => (
  <>
    <Glow cx={960} cy={540} r={600} color={C.coral} op={0.2} />
    <S>
      <Fist x={560} y={500} s={1.3} k={pop(t, 0.3)} rot={Math.sin(t * 10) * 4} />
      <Arrow x1={1220} y1={500} x2={1600} y2={500} color={C.amber} w={22} p={ramp(t, 1.2, 0.5)} />
    </S>
    <Title x={560} y={800} text="FIGHT" size={110} color={C.coral} k={pop(t, 0.5)} />
    <Title x={1400} y={800} text="FLIGHT" size={110} color={C.amber} k={pop(t, 1.3)} />
    <Title x={960} y={500} text="or" size={70} color={C.dim} k={pop(t, 0.9)} />
  </>
);

export const flight_phone: React.FC<ShotProps> = ({ t }) => {
  const run = ramp(t, 3.4, 2.4, Easing.in(Easing.quad));
  return (
    <>
      <S>
        <Sheet x={420} y={420} s={1.0} k={1} />
        <Cross x={420} y={420} s={2} k={pop(t, 1.4)} />
        <Phone x={1620} y={520} s={1.4} k={pop(t, 3.0)} glow={0.6 + 0.4 * Math.sin(t * 5)} />
      </S>
      <Sub x={420} y={620} text="can't punch a spreadsheet" k={pop(t, 1.6)} size={32} color={C.text} />
      <Pic n="M12_running" cx={lerp(420, 1300, run)} cy={700} size={560} k={pop(t, 3.0)} t={t} />
      <Title x={1100} y={160} text="Brain chooses FLIGHT" size={64} color={C.amber} k={pop(t, 4.2)} />
    </>
  );
};

export const ancestor_modern: React.FC<ShotProps> = ({ t }) => {
  const x = (t * 160) % 300;
  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: 960, height: 1080, background: "#1B2438" }} />
      <S>
        <Tiger x={150 + x} y={640} s={0.9} k={pop(t, 0.2)} t={t} />
        <Caveman x={560 + x} y={600} s={1.3} k={pop(t, 0.2)} t={t} />
        <line x1={960} y1={80} x2={960} y2={1000} stroke={C.amber} strokeWidth={6} strokeDasharray="20 14" />
        <Sheet x={1200} y={480} s={0.9} k={pop(t, 2.6)} red={1} />
        <Phone x={1700} y={520} s={1.1} k={pop(t, 2.8)} />
      </S>
      <Pic n="M12_running" cx={1450} cy={700} size={500} k={pop(t, 2.6)} t={t} />
      <Tag x={480} y={160} text="THEN: a sabertooth tiger" bg={C.panel} color={C.text} k={pop(t, 0.4)} />
      <Tag x={1440} y={160} text="NOW: a blank spreadsheet" bg={C.coral} color={C.text} k={pop(t, 2.8)} />
    </>
  );
};

/* ================= c3 · Future You ================= */

export const present_bias: React.FC<ShotProps> = ({ t }) => (
  <>
    <Title x={960} y={360} text="TIME INCONSISTENCY" size={96} color={C.amber} k={pop(t, 0.3)} />
    <Title x={960} y={520} text="=" size={80} color={C.dim} k={pop(t, 1.6)} />
    <Title x={960} y={680} text="PRESENT BIAS" size={96} color={C.coral} k={pop(t, 2.4)} />
    <Pic n="M02_pointing" cx={250} cy={820} size={460} k={pop(t, 1.0)} t={t} float={4} />
  </>
);

export const small_now_big_later: React.FC<ShotProps> = ({ t }) => {
  const tilt = lerp(0, -1, ramp(t, 3.0, 1.0, Easing.out(Easing.back(1.4))));
  return (
    <>
      <S>
        <Scale x={960} y={560} s={1.5} k={pop(t, 0.2)} tilt={tilt}
          left={<Cookie x={0} y={-35} s={0.7} k={pop(t, 1.0)} />}
          right={<Chest x={0} y={-60} s={0.6} k={pop(t, 1.8)} />} />
      </S>
      <Tag x={590} y={200} text="small reward · NOW" k={pop(t, 1.2)} />
      <Tag x={1330} y={200} text="massive reward · TOMORROW" bg={C.panel} color={C.text} k={pop(t, 2.0)} />
      <Title x={960} y={950} text="Your brain picks NOW" size={56} color={C.amber} k={pop(t, 4.4)} />
    </>
  );
};

export const fmri_intro: React.FC<ShotProps> = ({ t }) => (
  <>
    <S><Scanner x={1000} y={520} s={1.9} k={pop(t, 0.3)} scan={(t * 0.5) % 1} /></S>
    <Tag x={1000} y={170} text="fMRI BRAIN SCAN" bg={C.teal} k={pop(t, 1.2)} size={44} />
    <Pic n="M03_shocked" cx={320} cy={760} size={520} k={pop(t, 4.0)} t={t} float={5} />
    <Title x={1100} y={920} text="…something wild" size={60} k={pop(t, 5.2)} />
  </>
);

export const fmri_present: React.FC<ShotProps> = ({ t }) => {
  const lit = ramp(t, 2.6, 0.8);
  return (
    <>
      <Pic n="M01_explaining" cx={420} cy={600} size={620} k={pop(t, 0.2)} t={t} float={4} />
      <Tag x={420} y={200} text="PRESENT YOU" k={pop(t, 0.6)} />
      <Glow cx={1300} cy={520} r={380} color={C.amber} op={0.45 * lit} />
      <S><Brain x={1300} y={520} s={2.4} k={pop(t, 1.2)} front={lit} tint={C.pink} /></S>
      <Tag x={1100} y={840} text="❤ empathy" bg={C.coral} color={C.text} k={pop(t, 3.4)} />
      <Tag x={1500} y={840} text="◆ identity" k={pop(t, 4.0)} />
    </>
  );
};

export const fmri_future: React.FC<ShotProps> = ({ t }) => (
  <>
    <S>
      <line x1={160} y1={760} x2={1760} y2={760} stroke={C.line} strokeWidth={8} />
      <Arrow x1={160} y1={760} x2={1760} y2={760} color={C.amber} w={8} p={ramp(t, 0.3, 1.2)} />
      <Calendar x={900} y={560} s={0.8} k={pop(t, 2.6)} mark={1} label="+2 DAYS" />
      <Calendar x={1500} y={560} s={0.8} k={pop(t, 1.6)} mark={1} label="+10 YRS" />
    </S>
    <Pic n="M01_explaining" cx={300} cy={560} size={440} k={pop(t, 0.2)} t={t} float={4} />
    <Tag x={300} y={850} text="today" bg={C.panel} color={C.text} k={pop(t, 0.6)} />
    <Pic n="M01_explaining" cx={1500} cy={330} size={0} k={0} />
    <Title x={1200} y={230} text="FUTURE YOU" size={86} color={C.sky} k={pop(t, 1.0)} />
  </>
);

export const fmri_stranger: React.FC<ShotProps> = ({ t }) => {
  const m = ramp(t, 1.4, 0.8);
  return (
    <>
      <Pic n="M01_explaining" cx={560} cy={560} size={560} op={1 - 0.6 * m} k={1} t={t} float={4} filter={`grayscale(${m}) brightness(${1 - 0.3 * m})`} />
      <S>
        <Person x={1360} y={560} s={1.7} k={pop(t, 1.0)} />
        <text x={960} y={590} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={140} fill={C.amber} opacity={pop(t, 2.0)}>≈</text>
      </S>
      <Tag x={560} y={880} text="Future You" bg={C.sky} k={pop(t, 0.4)} />
      <Tag x={1360} y={880} text="a complete STRANGER" bg={C.panel} color={C.text} k={pop(t, 1.4)} />
    </>
  );
};

export const someone_else: React.FC<ShotProps> = ({ t, d }) => (
  <HeroOr n="H3_present_future" t={t} d={d} dim={0.15} fallback={<SomeoneVec t={t} d={d} />}>
    <Tag x={960} y={90} text="Read that again." bg={C.panel} color={C.text} k={pop(t, 0.2)} size={40} />
    <Card x={560} y={830} w={800} h={110} k={ramp(t, 1.6, 0.5)} color={C.coral}>
      <div style={{ fontSize: 38, fontWeight: 900 }}>Future You = someone else's problem</div>
    </Card>
  </HeroOr>
);
const SomeoneVec: React.FC<ShotProps> = ({ t }) => (
  <>
    <Title x={960} y={200} text="Read that again." size={70} color={C.dim} k={pop(t, 0.2)} />
    <Title x={960} y={470} text="Your brain treats Future You" size={70} k={pop(t, 1.4)} />
    <Title x={960} y={600} text="like someone else's problem." size={78} color={C.coral} k={pop(t, 2.6)} />
    <S><Arrow x1={300} y1={850} x2={1620} y2={850} color={C.coral} w={10} p={ramp(t, 3.4, 1.2)} dash /></S>
  </>
);

export const dopamine_bars: React.FC<ShotProps> = ({ t }) => (
  <>
    <S>
      <Dumbbell x={260} y={260} s={0.7} k={pop(t, 0.2)} /><Cross x={260} y={260} s={1} k={pop(t, 0.7)} />
      <Book x={480} y={260} s={0.5} k={pop(t, 1.0)} /><Cross x={480} y={260} s={1} k={pop(t, 1.5)} />
      <Remote x={700} y={260} s={0.7} k={pop(t, 1.8)} />
      <Line />
    </S>
    <Bar x={1080} base={850} w={200} h={540} p={ramp(t, 4.0, 0.7, Easing.out(Easing.back(1.6)))} color={C.amber} label="Instant dopamine" value="NOW" />
    <Bar x={1520} base={850} w={200} h={540} p={ramp(t, 5.0, 1.6) * 0.25} color={C.sky} label="Delayed reward" value="later…" />
    <Pic n="M06_distracted" cx={440} cy={720} size={520} k={pop(t, 2.6)} t={t} float={4} />
  </>
);
const Line: React.FC = () => <line x1={880} y1={850} x2={1760} y2={850} stroke={C.line} strokeWidth={6} />;

export const toss_papers: React.FC<ShotProps> = ({ t }) => {
  const fly = ramp(t, 1.2, 1.6, Easing.inOut(Easing.quad));
  const px = lerp(620, 1340, fly), py = lerp(520, 520, fly) - Math.sin(fly * Math.PI) * 320;
  return (
    <>
      <S><line x1={960} y1={120} x2={960} y2={1000} stroke={C.amber} strokeWidth={6} strokeDasharray="22 14" /></S>
      <Pic n="M13_relaxing" cx={460} cy={640} size={640} k={pop(t, 0.1)} t={t} />
      <Pic n="M14_stressed_papers" cx={1460} cy={620} size={620} k={pop(t, 2.6)} t={t} />
      <S><Papers x={px} y={py} s={0.9} k={fly < 1 ? 1 : 0} n={8} /></S>
      <Tag x={460} y={180} text="PRESENT YOU · tonight" k={pop(t, 0.4)} />
      <Tag x={1460} y={180} text="FUTURE YOU · tomorrow" bg={C.coral} color={C.text} k={pop(t, 2.8)} />
    </>
  );
};

/* ================= c4 · Doom loop ================= */

export const guilt_bruteforce: React.FC<ShotProps> = ({ t }) => (
  <>
    <S><Weight x={1300} y={lerp(-200, 520, ramp(t, 0.8, 0.5, Easing.in(Easing.quad)))} s={2.2} k={1} label="GUILT" /></S>
    <Pic n="M05_panicked" cx={540} cy={620} size={680} k={pop(t, 0.2)} t={t} float={4} />
    <Title x={1300} y={880} text="brute-force guilt" size={64} color={C.coral} k={pop(t, 1.6)} />
  </>
);

export const midnight_vow: React.FC<ShotProps> = ({ t }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "#0A0F1E" }} />
    <S>
      <Clock x={1500} y={300} s={1.4} k={pop(t, 0.2)} m={0} h={0} red />
      <Moon x={270} y={180} s={0.9} k={1} />
    </S>
    <Pic n={useHas().has("M15_sleepless") ? "M15_sleepless" : "M08_burnout"} cx={560} cy={640} size={680} k={pop(t, 0.4)} t={t} float={3} />
    <Sub x={1500} y={540} text='"pathetic…"' k={pop(t, 2.0)} color={C.coral} size={48} />
    <Card x={1150} y={660} w={700} h={150} k={ramp(t, 3.8, 0.5)} color={C.amber}>
      <div style={{ fontSize: 30, color: C.dim, fontWeight: 700 }}>The vow</div>
      <div style={{ fontSize: 42, fontWeight: 900 }}>"I'll wake up at 5 AM!"</div>
    </Card>
  </>
);

export const guilt_fuel: React.FC<ShotProps> = ({ t }) => (
  <>
    <S>
      <FuelCan x={700} y={420} s={1.4} k={pop(t, 0.2)} rot={-35} pour={ramp(t, 1.4, 0.8)} />
      <Flame x={1250} y={640} s={1.8} h={lerp(0.5, 1.3, ramp(t, 1.8, 1.2))} t={t} />
    </S>
    <Tag x={700} y={760} text="GUILT" bg={C.coral} color={C.text} k={pop(t, 0.6)} size={44} />
    <Tag x={1250} y={900} text="PROCRASTINATION" k={pop(t, 1.0)} size={40} />
  </>
);

/** The 5-node doom loop; `lit` = how many nodes are lit (0..5), `spin` = rotation of the travelling dot. */
const LOOP = [
  { label: "1 · Hard task", color: C.sky },
  { label: "2 · Anxiety", color: C.coral },
  { label: "3 · Avoidance", color: C.amber },
  { label: "4 · Brief relief", color: C.teal },
  { label: "5 · Guilt & shame", color: C.coral },
];
const Loop: React.FC<{ t: number; lit: number; cx?: number; cy?: number; r?: number; dot?: boolean; stress?: number }> = ({ t, lit, cx = 960, cy = 560, r = 330, dot = true, stress = 0 }) => {
  const pos = (i: number) => ({ x: cx + Math.sin((i * 72 * Math.PI) / 180) * r, y: cy - Math.cos((i * 72 * Math.PI) / 180) * r });
  const a = (t * 70) % 360;
  return (
    <>
      <S>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.line} strokeWidth={10} strokeDasharray="4 18" strokeLinecap="round" />
        {dot && <circle cx={cx + Math.sin((a * Math.PI) / 180) * r} cy={cy - Math.cos((a * Math.PI) / 180) * r} r={16} fill={C.amber} />}
        {LOOP.map((n, i) => {
          const p = pos(i);
          const on = lit > i;
          return (
            <g key={i} opacity={on ? 1 : 0.25}>
              <circle cx={p.x} cy={p.y} r={78} fill={C.panel} stroke={n.color} strokeWidth={on ? 10 : 4} />
              {i === 0 && <Sheet x={p.x} y={p.y} s={0.28} />}
              {i === 1 && <Knot x={p.x} y={p.y} s={0.55} t={t} />}
              {i === 2 && <Phone x={p.x} y={p.y} s={0.42} />}
              {i === 3 && <Couch x={p.x} y={p.y + 8} s={0.28} />}
              {i === 4 && <Weight x={p.x} y={p.y} s={0.45} />}
            </g>
          );
        })}
      </S>
      {LOOP.map((n, i) => {
        const p = pos(i);
        const dx = i === 0 ? 0 : p.x > cx ? 210 : -210;
        const dy = i === 0 ? -115 : 0;
        return lit > i ? <Tag key={i} x={p.x + dx} y={p.y + dy} text={n.label} bg={n.color} color={C.bg} size={28} k={1} /> : null;
      })}
      {stress > 0 && <Meter x={cx - 200} y={cy - 18} w={400} p={stress} color={C.coral} label="STRESS" />}
    </>
  );
};

export const loop_intro: React.FC<ShotProps> = ({ t, d }) => (
  <HeroOr n="H4_doom_loop" t={t} d={d} fallback={<LoopIntroVec t={t} d={d} />}>
    <Tag x={960} y={540} text="THE DOOM LOOP" bg={C.coral} color={C.text} k={pop(t, 0.8)} size={48} />
  </HeroOr>
);
const LoopIntroVec: React.FC<ShotProps> = ({ t }) => (
  <>
    <Loop t={t} lit={5 * ramp(t, 0.6, 2.4)} />
    <Title x={960} y={560} text="DOOM LOOP" size={62} color={C.coral} k={pop(t, 1.0)} />
  </>
);
export const loop_1_2: React.FC<ShotProps> = ({ t }) => <Loop t={t} lit={1 + (t > 1.8 ? 1 : 0)} />;
export const loop_3_4: React.FC<ShotProps> = ({ t }) => <Loop t={t} lit={2 + (t > 1.6 ? 1 : 0) + (t > 3.4 ? 1 : 0)} />;
export const loop_5: React.FC<ShotProps> = ({ t }) => <Loop t={t} lit={4 + (t > 1.2 ? 1 : 0)} />;
export const loop_cortisol: React.FC<ShotProps> = ({ t }) => (
  <>
    <Loop t={t} lit={5} cx={600} />
    <Flask x={1500} y={560} s={1.6} k={pop(t, 0.6)} level={lerp(0.2, 0.9, ramp(t, 1.0, 2.0))} t={t} />
    <Tag x={1500} y={260} text="CORTISOL ↑" bg={C.coral} color={C.text} k={pop(t, 1.4)} size={44} />
    <Sub x={1500} y={850} text="the stress hormone" k={pop(t, 2.2)} size={34} />
  </>
);
export const loop_repeat: React.FC<ShotProps> = ({ t }) => (
  <>
    <Loop t={t * 2.5} lit={5} stress={Math.min(1, 0.3 + t * 0.13)} />
    <Pic n="M05_panicked" cx={1700} cy={830} size={380} k={pop(t, 2.0)} t={t} />
    <Title x={960} y={110} text="…another quick escape!" size={56} color={C.amber} k={pop(t, 3.4)} />
  </>
);

export const care_too_much: React.FC<ShotProps> = ({ t }) => (
  <>
    <Title x={1200} y={330} text="NOT because you don't care" size={56} color={C.dim} k={pop(t, 0.3)} />
    {t > 2.2 && <div style={{ position: "absolute", left: 790, top: 322, width: 820 * ramp(t, 2.2, 0.4), height: 12, background: C.coral, borderRadius: 6 }} />}
    <Title x={1200} y={500} text="you care TOO MUCH" size={84} color={C.coral} k={pop(t, 2.8)} />
    <S><Heart x={1200} y={760} s={0.9} k={pop(t, 3.6)} glow={0.6 + 0.4 * Math.sin(t * 4)} /></S>
    <Pic n="M04_overthinking" cx={360} cy={620} size={640} k={pop(t, 0.2)} t={t} float={5} />
  </>
);

/* ================= c5 · 3 hacks ================= */

export const hacks_intro: React.FC<ShotProps> = ({ t }) => (
  <>
    <Meter x={180} y={260} w={520} p={Math.max(0.03, 1 - ramp(t, 0.3, 1.2))} color={C.amber} label="WILLPOWER" />
    <S><Cross x={760} y={278} s={0.9} k={pop(t, 1.6)} /></S>
    <Pic n="M07_eureka" cx={480} cy={680} size={620} k={pop(t, 2.4)} t={t} float={5} />
    <S><Amyg x={1380} y={620} s={1.8} k={pop(t, 3.4)} t={t} whistle={false} /></S>
    <Card x={1060} y={180} w={660} h={150} k={ramp(t, 4.2, 0.5)} color={C.teal}>
      <div style={{ fontSize: 30, color: C.dim, fontWeight: 700 }}>The trick</div>
      <div style={{ fontSize: 40, fontWeight: 900 }}>Speak its language</div>
    </Card>
  </>
);

export const hacks_three: React.FC<ShotProps> = ({ t, d }) => (
  <HeroOr n="H5_three_hacks" t={t} d={d} fallback={<HacksThreeVec t={t} d={d} />}>
    {[0, 1, 2].map((i) => <Tag key={i} x={330 + i * 630} y={110} text={`#${i + 1}`} k={pop(t, 0.2 + i * 0.4)} size={52} />)}
  </HeroOr>
);
const HacksThreeVec: React.FC<ShotProps> = ({ t }) => (
  <>
    <S>{[0, 1, 2].map((i) => <Lock key={i} x={560 + i * 400} y={520} s={1.4} k={pop(t, 0.2 + i * 0.4)} />)}</S>
    {[0, 1, 2].map((i) => <Title key={i} x={560 + i * 400} y={820} text={`#${i + 1}`} size={70} color={C.amber} k={pop(t, 0.5 + i * 0.4)} />)}
  </>
);

export const hack1_boulder: React.FC<ShotProps> = ({ t }) => {
  const shrink = ramp(t, 5.4, 1.0, Easing.inOut(Easing.cubic));
  return (
    <>
      <Tag x={960} y={110} text="#1 · THE 5-MINUTE RULE" k={pop(t, 0.2)} size={44} />
      <S>
        <path d="M 120 880 L 820 880 Q 1100 880 1300 600 L 1500 600 Q 1700 880 1820 880" fill="none" stroke={C.line} strokeWidth={10} />
        {shrink < 0.5 ? <Boulder x={980} y={680} s={2.0 * (1 - shrink)} k={pop(t, 1.0)} label="3-HOUR TASK" /> : <Pebble x={980} y={820} s={1.0} k={1} label="5 MIN" />}
        <Lock x={1700} y={330} s={0.8} k={pop(t, 7.4)} open={ramp(t, 7.8, 0.4)} />
      </S>
      <Pic n="M05_panicked" cx={420} cy={660} size={520} k={pop(t, 2.4) * (1 - shrink)} t={t} />
      <Pic n="M10_victorious" cx={420} cy={660} size={520} op={shrink} k={1} t={t} />
      <Sub x={980} y={980} text="Activation energy ↓" k={pop(t, 6.4)} color={C.amber} size={38} />
    </>
  );
};

export const hack1_permission: React.FC<ShotProps> = ({ t }) => {
  const sec = Math.min(300, Math.floor(t * 40));
  const mm = String(Math.floor(sec / 60)).padStart(2, "0"), ss = String(sec % 60).padStart(2, "0");
  return (
    <>
      <Pic n="M07_eureka" cx={380} cy={640} size={640} k={pop(t, 0.1)} t={t} float={4} />
      <Card x={800} y={230} w={980} h={240} k={ramp(t, 0.4, 0.5)} color={C.amber}>
        <div style={{ fontSize: 30, color: C.dim, fontWeight: 700 }}>Tell your brain:</div>
        <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.2 }}>"Only 5 minutes. If I hate it, I'm allowed to stop."</div>
      </Card>
      <div style={{ position: "absolute", left: 1290, top: 680, transform: "translate(-50%,-50%)", fontFamily: FONT, fontWeight: 900, fontSize: 160, color: C.amber, opacity: pop(t, 2.0) }}>{mm}:{ss}</div>
      <S><Check x={1700} y={880} s={1.4} k={pop(t, 5.4)} /></S>
      <Sub x={1290} y={880} text="full permission to stop" k={pop(t, 4.8)} color={C.teal} size={36} />
    </>
  );
};

export const hack1_zeigarnik: React.FC<ShotProps> = ({ t, d }) => {
  const prog = Math.min(1, lerp(0.15, 1, ramp(t, 3.0, d - 4.5)));
  return (
    <>
      <S><AlarmButton x={420} y={360} s={1.0} k={pop(t, 0.2)} press={0} /><Cross x={420} y={330} s={1.2} k={pop(t, 1.2)} /></S>
      <Sub x={420} y={540} text="not scary → no alarm" k={pop(t, 1.4)} size={32} color={C.text} />
      <S><Puzzle x={1280} y={480} s={1.6} k={pop(t, 2.8)} p={prog} /></S>
      <Title x={1280} y={480} text={`${Math.round(prog * 100)}%`} size={90} color={C.teal} k={pop(t, 3.0)} />
      <Tag x={1280} y={160} text="ZEIGARNIK EFFECT" bg={C.teal} k={pop(t, 3.4)} size={44} />
      <Sub x={1280} y={820} text="Brains hate unfinished loops" k={pop(t, 5.0)} color={C.text} size={40} />
      <Pic n="M07_eureka" cx={420} cy={800} size={420} k={pop(t, 7.0)} t={t} float={4} />
    </>
  );
};

export const hack2_friction: React.FC<ShotProps> = ({ t }) => {
  const tilt = lerp(-1, 1, ramp(t, 2.6, 1.0, Easing.out(Easing.back(1.4))));
  return (
    <>
      <Tag x={960} y={110} text="#2 · FLIP THE FRICTION RATIO" k={pop(t, 0.2)} size={44} />
      <S>
        <Scale x={960} y={600} s={1.4} k={pop(t, 0.4)} tilt={tilt}
          left={<Phone x={0} y={-80} s={0.5} k={1} />}
          right={<Laptop x={0} y={-60} s={0.42} k={1} t={t} />} />
      </S>
      <Count x={1600} y={330} to={20} t={t} at={3.4} dur={1.4} suffix=" s" size={110} color={C.coral} />
      <Sub x={1600} y={420} text="extra effort to get distracted" k={pop(t, 3.8)} size={30} w={420} />
    </>
  );
};

export const hack2_setup: React.FC<ShotProps> = ({ t }) => (
  <>
    <div style={{ position: "absolute", left: 0, top: 0, width: 960, height: 1080, background: "#14203A" }} />
    <S>
      <Door x={420} y={560} s={1.6} k={1} open={ramp(t, 0.2, 0.6) - ramp(t, 1.8, 0.4)} />
      <Phone x={lerp(420, 560, ramp(t, 0.4, 1.2))} y={560} s={0.6} k={1 - ramp(t, 1.6, 0.3)} />
      <Lock x={420} y={860} s={0.6} k={pop(t, 2.2)} />
      <Laptop x={1440} y={520} s={1.6} k={pop(t, 2.8)} t={t} fill={ramp(t, 3.6, 2.4)} />
    </S>
    <Tag x={420} y={140} text="Phone → another room" bg={C.coral} color={C.text} k={pop(t, 0.6)} />
    <Tag x={1440} y={140} text="Work tools → open & ready" bg={C.teal} k={pop(t, 3.0)} />
  </>
);

export const hack3_compassion: React.FC<ShotProps> = ({ t }) => (
  <>
    <Tag x={960} y={110} text="#3 · SELF-COMPASSION" k={pop(t, 0.2)} size={44} />
    <S><Heart x={960} y={540} s={2.2} k={pop(t, 0.6)} glow={0.6 + 0.4 * Math.sin(t * 4)} /></S>
    <Title x={960} y={880} text="the most important one" size={52} color={C.coral} k={pop(t, 1.4)} />
  </>
);

export const hack3_study: React.FC<ShotProps> = ({ t }) => (
  <>
    <Tag x={960} y={110} text="Carleton University study" bg={C.panel} color={C.text} k={pop(t, 0.2)} size={40} />
    <S><GradCap x={380} y={420} s={1.2} k={pop(t, 0.6)} /><Heart x={380} y={720} s={0.8} k={pop(t, 3.6)} /></S>
    <Sub x={380} y={560} text="Exam 1: procrastinated" k={pop(t, 1.4)} color={C.text} size={30} />
    <Sub x={380} y={860} text="forgave themselves" k={pop(t, 3.8)} color={C.coral} size={30} />
    <S><line x1={800} y1={850} x2={1780} y2={850} stroke={C.line} strokeWidth={6} /></S>
    <Bar x={1040} base={850} w={210} h={520} p={ramp(t, 5.2, 1.0)} color={C.coral} label="Blamed themselves" value="more" />
    <Bar x={1520} base={850} w={210} h={520} p={ramp(t, 6.4, 1.0) * 0.55} color={C.teal} label="Forgave themselves" value="less" />
    <Sub x={1280} y={240} text="Procrastination on Exam 2" k={pop(t, 4.8)} size={36} color={C.dim} />
  </>
);

export const hack3_starve: React.FC<ShotProps> = ({ t }) => (
  <>
    <Loop t={t * (1 - ramp(t, 0.6, 2.0))} lit={5 * (1 - ramp(t, 1.0, 1.6))} cx={960} cy={560} dot={t < 2.2} />
    <S><Flame x={960} y={600} s={1.0} h={1 - ramp(t, 0.6, 1.6)} t={t} /></S>
    <Title x={960} y={560} text="LOOP STOPS" size={80} color={C.teal} k={pop(t, 2.2)} />
  </>
);

/* ================= c6 · Outro ================= */

export const outro_software: React.FC<ShotProps> = ({ t }) => (
  <>
    <S><Crt x={620} y={520} s={1.6} k={pop(t, 0.2)} lines={ramp(t, 0.6, 2.4)} t={t} /></S>
    <Tag x={620} y={140} text="Ancient survival software" bg={C.panel} color={C.text} k={pop(t, 1.0)} />
    <S>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 + t * 0.6;
        const k = pop(t, 3.8 + i * 0.25);
        const x = 1450 + Math.cos(a) * 280, y = 520 + Math.sin(a) * 280;
        return i % 3 === 0 ? <Phone key={i} x={x} y={y} s={0.35} k={k} /> : i % 3 === 1 ? <Bell key={i} x={x} y={y} s={0.5} k={k} ring={Math.sin(t * 12)} /> : <PlayCard key={i} x={x} y={y} s={0.45} k={k} />;
      })}
    </S>
    <Title x={1450} y={520} text="infinite distractions" size={40} color={C.amber} k={pop(t, 4.6)} />
  </>
);

export const outro_recap: React.FC<ShotProps> = ({ t, d }) => (
  <HeroOr n="H6_outro" t={t} d={d} dim={0.1} fallback={<OutroRecapVec t={t} d={d} />}>
    {["No guilt", "Start with 5 minutes", "Be kind to Future You"].map((x, i) => (
      <Tag key={i} x={[420, 960, 1500][i]} y={930} text={x} bg={[C.coral, C.amber, C.teal][i]} color={C.bg} k={pop(t, [0.4, 2.4, 4.2][i])} size={34} />
    ))}
  </HeroOr>
);
const OutroRecapVec: React.FC<ShotProps> = ({ t }) => {
  const items = [
    { at: 0.4, text: "Drop the guilt", color: C.coral, icon: (k: number) => <Weight x={360} y={480} s={0.9} k={k} label="" /> },
    { at: 2.4, text: "Start with 5 minutes", color: C.amber, icon: (k: number) => <Pebble x={960} y={480} s={1.4} k={k} label="5 MIN" /> },
    { at: 4.2, text: "Give Future You a break", color: C.teal, icon: (k: number) => <Heart x={1560} y={480} s={1.0} k={k} /> },
  ];
  return (
    <>
      <S>
        {items.map((it, i) => <g key={i}>{it.icon(pop(t, it.at))}</g>)}
        <Cross x={360} y={480} s={1.6} k={pop(t, 1.0)} />
      </S>
      {items.map((it, i) => <Tag key={i} x={[360, 960, 1560][i]} y={720} text={it.text} bg={it.color} color={C.bg} k={pop(t, it.at + 0.2)} size={32} />)}
    </>
  );
};

export const outro_teaser: React.FC<ShotProps> = ({ t }) => (
  <>
    <Glow cx={1250} cy={520} r={420} color={C.amber} op={0.35 + 0.1 * Math.sin(t * 3)} />
    <S>
      <Flask x={1250} y={520} s={1.9} k={pop(t, 0.6)} level={0.75} t={t} />
      <Phone x={700} y={420} s={0.7} k={pop(t, 4.4)} rot={-12} />
      <PlayCard x={520} y={700} s={0.8} k={pop(t, 5.2)} rot={8} />
      <Bell x={820} y={760} s={0.7} k={pop(t, 6.0)} ring={Math.sin(t * 14)} />
    </S>
    <Tag x={960} y={120} text="NEXT EPISODE" bg={C.teal} k={pop(t, 0.2)} size={40} />
    <Title x={1250} y={900} text="How apps hijack your dopamine" size={56} color={C.amber} k={pop(t, 7.0)} />
  </>
);

export const outro_end: React.FC<ShotProps> = ({ t }) => (
  <>
    <div style={{ position: "absolute", left: 980, top: 230, width: 800, height: 450, borderRadius: 24, border: `6px solid ${C.amber}`, background: C.panel, opacity: pop(t, 0.3), boxShadow: `0 0 60px ${C.amber}55` }} />
    <S><Flask x={1380} y={455} s={1.1} k={pop(t, 0.6)} level={0.75} t={t} /></S>
    <Title x={1380} y={760} text="Reset your dopamine in 7 days" size={44} color={C.text} k={pop(t, 1.2)} />
    <Pic n="M02_pointing" cx={480} cy={620} size={680} k={pop(t, 0.2)} t={t} float={4} />
    <S><Arrow x1={720} y1={500} x2={940} y2={460} color={C.amber} w={12} p={ramp(t, 1.4, 0.5) * (Math.floor(t * 3) % 2 === 0 ? 1 : 0.85)} /></S>
    <Pic n="M10_victorious" cx={480} cy={620} size={680} op={ramp(t, 5.6, 0.5)} k={1} t={t} />
    <Title x={960} y={960} text="Thanks for watching!" size={52} color={C.dim} k={pop(t, 5.8)} />
  </>
);


/* ================= v2 research beats (owner doc v2: 10-11 min) ================= */

export const hook_emotion: React.FC<ShotProps> = ({ t, d }) => {
  const tilt = lerp(0, 1, ramp(t, 3.0, 1.0, Easing.out(Easing.back(1.4)))) + 0.08 * Math.sin(t * 2.2) * ramp(t, 4, 1);
  return (
    <Drift t={t} d={d}>
      <S>
        <Scale x={960} y={560} s={1.4} k={pop(t, 0.2)} tilt={tilt}
          left={<Clock x={0} y={-60} s={0.5} k={1} m={t * 30} h={3} />}
          right={<Heart x={0} y={-60} s={0.55} k={1} glow={0.6} />} />
      </S>
      <Tag x={560} y={200} text="Time management" bg={C.panel} color={C.text} k={pop(t, 0.8)} />
      <Tag x={1360} y={200} text="Emotional regulation" bg={C.coral} color={C.text} k={pop(t, 1.6)} />
      <Sub x={960} y={940} text="Pychyl & Sirois: we delay to escape bad feelings" k={pop(t, 5.0)} color={C.text} size={34} />
      {["boredom", "anxiety", "self-doubt"].map((x, i) => <Tag key={x} x={1360 + (i - 1) * 190} y={300} text={x} bg={C.panel} color={C.coral} k={pop(t, 7.5 + i * 1.2)} size={24} />)}
      <Pic n="M04_overthinking" cx={220} cy={760} size={380} k={pop(t, 10.0)} t={t} float={5} />
    </Drift>
  );
};

export const hook_sources: React.FC<ShotProps> = ({ t, d }) => (
  <Drift t={t} d={d}>
    <Card x={180} y={230} w={740} h={300} k={ramp(t, 0.3, 0.5)} color={C.amber}>
      <div style={{ fontSize: 30, color: C.dim, fontWeight: 700 }}>Piers Steel · 2007 review</div>
      <div style={{ fontSize: 120, fontWeight: 900, color: C.amber, lineHeight: 1.1 }}>{Math.round(95 * ramp(t, 0.8, 1.6))}%</div>
      <div style={{ fontSize: 34, fontWeight: 800 }}>of college students</div>
    </Card>
    <Card x={1000} y={230} w={740} h={300} k={ramp(t, 4.6, 0.5)} color={C.coral}>
      <div style={{ fontSize: 30, color: C.dim, fontWeight: 700 }}>Joseph Ferrari</div>
      <div style={{ fontSize: 120, fontWeight: 900, color: C.coral, lineHeight: 1.1 }}>1 in 5</div>
      <div style={{ fontSize: 34, fontWeight: 800 }}>adults: chronic</div>
    </Card>
    <S>{Array.from({ length: 5 }, (_, i) => <Person key={i} x={1060 + i * 150} y={760} s={0.55} k={pop(t, 6.0 + i * 0.15)} color={i === 2 ? C.coral : "#475569"} />)}</S>
    <Pic n="M02_pointing" cx={420} cy={790} size={420} k={pop(t, 1.4)} t={t} float={4} />
    <Tag x={1430} y={950} text="CHRONIC" bg={C.coral} color={C.text} k={pop(t, 8.0) * (0.85 + 0.15 * Math.sin(t * 5))} size={30} />
    <Ring cx={600} cy={380} r={0} p={0} color={C.amber} />
  </Drift>
);

export const pfc_slow: React.FC<ShotProps> = ({ t, d }) => {
  const ages = [10, 15, 20, 25];
  const p = ramp(t, 1.0, 4.0);
  return (
    <Drift t={t} d={d}>
      <S>
        <line x1={300} y1={760} x2={1640} y2={760} stroke={C.line} strokeWidth={8} />
        {ages.map((a, i) => <circle key={a} cx={300 + i * 446} cy={760} r={16} fill={p * 3 >= i ? C.amber : C.line} />)}
        <Head x={300 + 1340 * p} y={520} s={0.7 + 0.4 * p} k={pop(t, 0.3)} front={p} />
      </S>
      {ages.map((a, i) => <Sub key={a} x={300 + i * 446} y={830} text={`${a}${i === 3 ? "+" : ""}`} k={pop(t, 0.6 + i * 0.3)} color={C.text} size={40} />)}
      <Tag x={960} y={150} text="Prefrontal Cortex: matures into your mid-20s" k={pop(t, 0.4)} size={36} />
      <Meter x={1180} y={940} w={520} p={0.4 + 0.5 * Math.abs(Math.sin(t * 1.4))} color={C.coral} label="SELF-CONTROL = EFFORT" h={26} />
    <Kick t={t} d={d} a="Self-control runs out" b="→ the CEO gets tired" />
    </Drift>
  );
};

export const amyg_fast: React.FC<ShotProps> = ({ t, d }) => {
  const lap = Math.max(0, t - 0.8) % Math.max(4, d / 2);
  const a = ramp(lap, 0, 0.9, Easing.out(Easing.cubic));
  const b = ramp(lap, 0, 4.5, Easing.inOut(Easing.quad));
  return (
    <>
      <Sub x={160} y={330} text="START" k={pop(t, 0.2)} color={C.dim} size={30} />
      <S>
        <line x1={260} y1={420} x2={1700} y2={420} stroke={C.line} strokeWidth={4} strokeDasharray="12 10" />
        <line x1={260} y1={720} x2={1700} y2={720} stroke={C.line} strokeWidth={4} strokeDasharray="12 10" />
        <line x1={1700} y1={300} x2={1700} y2={840} stroke={C.text} strokeWidth={6} />
        <Amyg x={260 + 1360 * a} y={420} s={0.8} k={pop(t, 0.3)} t={t} panic={a} whistle={false} />
        <Ceo x={260 + 1360 * b} y={720} s={0.75} k={pop(t, 0.3)} />
      </S>
      <Tag x={1100} y={250} text="⚡ a fraction of a second" bg={C.coral} color={C.text} k={pop(t, 1.8)} />
      <Sub x={1100} y={880} text="the CEO is still reading the situation…" k={pop(t, 3.0)} color={C.dim} size={32} />
    </>
  );
};

export const bochum_study: React.FC<ShotProps> = ({ t, d }) => (
  <Drift t={t} d={d}>
    <Tag x={960} y={110} text="Ruhr University Bochum · 2018 · 264 adults" bg={C.panel} color={C.text} k={pop(t, 0.2)} size={36} />
    <S>
      <Obj n="O46_brain_scan_split" x={600} y={540} w={560} k={pop(t, 0.8)} fallback={<Brain x={600} y={540} s={2.4} k={1} deep={1} />} />
      <circle cx={560} cy={580} r={60 + 12 * Math.sin(t * 5)} fill="none" stroke={C.coral} strokeWidth={6} opacity={ramp(t, 4.0, 0.4)} />
    </S>
    <Card x={1060} y={330} w={700} h={130} k={ramp(t, 5.0, 0.5)} color={C.coral}>
      <div style={{ fontSize: 38, fontWeight: 900 }}>Larger Amygdala</div>
    </Card>
    <Card x={1060} y={500} w={700} h={170} k={ramp(t, 8.5, 0.5)} color={C.sky}>
      <div style={{ fontSize: 38, fontWeight: 900 }}>Weaker link to the dorsal anterior cingulate cortex</div>
    </Card>
    <Sub x={1410} y={760} text="people who struggle to act on intentions" k={pop(t, 2.4)} color={C.dim} size={30} w={700} />
    <S><line x1={560} y1={580} x2={760} y2={430} stroke={C.sky} strokeWidth={5} strokeDasharray="8 18" strokeDashoffset={-t * 40} opacity={ramp(t, 9.0, 0.6) * (0.5 + 0.5 * Math.sin(t * 6))} /></S>
    <Pic n="M03_shocked" cx={1500} cy={900} size={300} k={pop(t, 12.5)} t={t} float={4} />
  </Drift>
);

export const bochum_meaning: React.FC<ShotProps> = ({ t }) => (
  <>
    <S>
      <AlarmButton x={520} y={520} s={1.4} k={pop(t, 0.2)} flash={Math.floor(t * 6) % 2 === 0 ? 1 : 0.3} />
      <line x1={760} y1={520} x2={1260} y2={520} stroke={C.sky} strokeWidth={6} strokeDasharray="6 26" opacity={0.6 + 0.4 * Math.sin(t * 9)} />
      <Ceo x={1460} y={540} s={1.6} k={pop(t, 2.4)} />
    </S>
    <Tag x={520} y={830} text="LOUDER alarm" bg={C.coral} color={C.text} k={pop(t, 0.8)} size={40} />
    <Tag x={1460} y={830} text="weaker line to the CEO" bg={C.sky} k={pop(t, 2.8)} size={40} />
  </>
);

const Money: React.FC<{ x: number; y: number; v: string; k: number; color: string }> = ({ x, y, v, k, color }) =>
  k <= 0.01 ? null : (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${k})`, width: 330, height: 200, borderRadius: 24, background: C.panel, border: `6px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontWeight: 900, fontSize: 96, color }}>{v}</div>
  );

export const discount_test: React.FC<ShotProps> = ({ t }) => (
  <>
    <Title x={960} y={170} text="Quick test:" size={60} color={C.dim} k={pop(t, 0.2)} />
    <Money x={600} y={500} v="$100" k={pop(t, 0.8)} color={C.amber} />
    <Money x={1320} y={500} v="$110" k={pop(t, 1.8)} color={C.sky} />
    <Tag x={600} y={680} text="TODAY" k={pop(t, 1.0)} />
    <Tag x={1320} y={680} text="NEXT WEEK" bg={C.panel} color={C.text} k={pop(t, 2.0)} />
    <Title x={960} y={500} text="or" size={56} color={C.dim} k={pop(t, 1.4)} />
    <S><Check x={600} y={360} s={1.4} k={pop(t, 4.2)} /></S>
    <Pic n="M06_distracted" cx={240} cy={840} size={360} k={pop(t, 4.4)} t={t} float={4} />
  </>
);

export const discount_flip: React.FC<ShotProps> = ({ t, d }) => (
  <Drift t={t} d={d}>
    <Money x={600} y={420} v="$100" k={pop(t, 0.2)} color={C.amber} />
    <Money x={1320} y={420} v="$110" k={pop(t, 0.6)} color={C.sky} />
    <Tag x={600} y={600} text="in 52 weeks" bg={C.panel} color={C.text} k={pop(t, 1.4)} />
    <Tag x={1320} y={600} text="in 53 weeks" bg={C.panel} color={C.text} k={pop(t, 2.0)} />
    <S><Check x={1320} y={280} s={1.4} k={pop(t, 5.2)} /></S>
    <Title x={960} y={820} text="Same 7 days. Different answer." size={60} color={C.amber} k={pop(t, 8.0)} />
    <S><Clock x={960} y={420} s={0.7} k={pop(t, 3.0)} m={t * 60} h={t * 5} /></S>
    <Pic n="M03_shocked" cx={1720} cy={880} size={320} k={pop(t, 10.5)} t={t} float={5} />
  </Drift>
);

export const avatar_mirror: React.FC<ShotProps> = ({ t, d }) => (
  <Drift t={t} d={d}>
    <Tag x={960} y={110} text="Hal Hershfield · UCLA" bg={C.panel} color={C.text} k={pop(t, 0.2)} size={40} />
    <Pic n="M01_explaining" cx={480} cy={620} size={640} k={pop(t, 0.4)} t={t} float={4} />
    <S>
      <Obj n="O38_aged_mirror" x={1360} y={560} w={560} h={640} k={pop(t, 2.0)} fallback={<Person x={1360} y={560} s={1.8} k={1} color="#94A3B8" />} />
      <Arrow x1={760} y1={560} x2={1060} y2={560} color={C.amber} w={8} p={ramp(t, 3.0, 0.6)} dash />
    </S>
    <Sub x={1360} y={940} text="your face, digitally aged" k={pop(t, 3.6)} color={C.text} size={34} />
  <Kick t={t} d={d} a="Future You = a real person" />
    </Drift>
);

export const avatar_result: React.FC<ShotProps> = ({ t, d }) => (
  <Drift t={t} d={d}>
    <S><line x1={700} y1={820} x2={1700} y2={820} stroke={C.line} strokeWidth={6} /></S>
    <Bar x={950} base={820} w={220} h={520} p={ramp(t, 0.8, 0.8) * 0.4} color={C.dim} label="Saw current self" />
    <Bar x={1450} base={820} w={220} h={520} p={ramp(t, 2.0, 1.2) * 0.9} color={C.amber} label="Met older self" value="> 2×" />
    <S><Obj n="O39_piggy_bank" x={380} y={540} w={420} k={pop(t, 0.4)} fallback={<Chest x={380} y={540} s={1.2} k={1} />} /></S>
    <Title x={380} y={820} text="Future You felt real" size={44} color={C.teal} k={pop(t, 5.6)} />
  <Kick t={t} d={d} a="Hershfield et al. 2011" b="> 2× for retirement" />
    </Drift>
);

export const dopamine_wanting: React.FC<ShotProps> = ({ t, d }) => {
  const pts = Array.from({ length: 60 }, (_, i) => {
    const x = 260 + i * 24;
    const spike = Math.exp(-Math.pow((i - 14) / 4, 2)) * 300 + Math.exp(-Math.pow((i - 32) / 4, 2)) * 260 + Math.exp(-Math.pow((i - 50) / 4, 2)) * 230;
    return `${x},${780 - spike}`;
  });
  const shown = Math.floor(60 * ramp(t, 1.0, d - 2.5));
  return (
    <Drift t={t} d={d} amt={0.05}>
      <Tag x={960} y={110} text="DOPAMINE = ANTICIPATION, not pleasure" k={pop(t, 0.2)} size={40} />
      <S>
        <line x1={260} y1={780} x2={1700} y2={780} stroke={C.line} strokeWidth={6} />
        {shown > 1 && <polyline points={pts.slice(0, shown).join(" ")} fill="none" stroke={C.amber} strokeWidth={10} strokeLinejoin="round" />}
        <Bell x={260 + 14 * 24} y={360} s={0.6} k={pop(t, 1.0 + (d - 3.5) * 14 / 60)} ring={Math.sin(t * 14)} />
        <Phone x={260 + 32 * 24} y={360} s={0.45} k={pop(t, 1.0 + (d - 3.5) * 32 / 60)} />
        <Phone x={260 + 50 * 24} y={360} s={0.45} k={pop(t, 1.0 + (d - 3.5) * 50 / 60)} />
      </S>
      <Sub x={596} y={860} text="expecting a reward" k={pop(t, 2.8)} color={C.text} size={30} />
      <Sub x={1150} y={860} text="'the next scroll might be good'" k={pop(t, 1.4 + (d - 3.5) * 32 / 60)} color={C.text} size={30} />
    </Drift>
  );
};

export const tice_early: React.FC<ShotProps> = ({ t, d }) => (
  <Drift t={t} d={d}>
    <Tag x={960} y={110} text="Tice & Baumeister · 1997" bg={C.panel} color={C.text} k={pop(t, 0.2)} size={40} />
    <S><Calendar x={480} y={480} s={1.2} k={pop(t, 0.6)} mark={1} label="WEEK 1" /></S>
    <Pic n="M13_relaxing" cx={1300} cy={560} size={640} k={pop(t, 2.0)} t={t} />
    <Meter x={1040} y={880} w={520} p={lerp(0.6, 0.2, ramp(t, 3.4, 1.4))} color={C.teal} label="STRESS (procrastinators)" />
    <Tag x={480} y={760} text="…felt LESS stressed" bg={C.teal} k={pop(t, 6.0)} size={34} />
    <Tag x={480} y={850} text="(for now)" bg={C.panel} color={C.dim} k={pop(t, 8.5)} size={28} />
  </Drift>
);

export const tice_late: React.FC<ShotProps> = ({ t }) => (
  <>
    <S><Calendar x={330} y={360} s={0.9} k={pop(t, 0.2)} mark={1} label="FINALS" /></S>
    {[{ l: "Stress", c: C.coral, at: 1.2 }, { l: "Illness", c: C.coral, at: 2.6 }, { l: "Grades", c: C.sky, at: 4.0 }].map((r, i) => (
      <React.Fragment key={r.l}>
        <Sub x={760} y={300 + i * 170} text={r.l} k={pop(t, r.at)} color={C.text} size={44} />
        <Title x={1000} y={300 + i * 170} text={i < 2 ? "↑" : "↓"} size={110} color={r.c} k={pop(t, r.at + 0.3)} />
      </React.Fragment>
    ))}
    <S>
      <Obj n="O42_thermometer" x={1300} y={470} w={260} k={pop(t, 2.8)} />
      <Obj n="O43_report_card" x={1300} y={640} w={240} k={pop(t, 4.2)} />
    </S>
    <Pic n="M08_burnout" cx={1640} cy={720} size={460} k={pop(t, 1.0)} t={t} float={3} />
    <Card x={300} y={840} w={1000} h={110} k={ramp(t, 6.4, 0.5)} color={C.amber}>
      <div style={{ fontSize: 36, fontWeight: 900 }}>The relief was borrowed — with interest.</div>
    </Card>
  </>
);

export const sirois_health: React.FC<ShotProps> = ({ t, d }) => (
  <Drift t={t} d={d}>
    <Tag x={960} y={110} text="Fuschia Sirois · health research" bg={C.panel} color={C.text} k={pop(t, 0.2)} size={40} />
    <Meter x={300} y={330} w={700} p={ramp(t, 1.0, 1.4) * 0.85} color={C.coral} label="STRESS" />
    <S>
      <Calendar x={1350} y={430} s={0.8} k={pop(t, 3.6)} mark={1} label="CHECK-UP" />
      <Dumbbell x={1350} y={720} s={0.9} k={pop(t, 5.0)} />
      <Cross x={1560} y={430} s={1} k={pop(t, 4.2)} />
      <Cross x={1560} y={720} s={1} k={pop(t, 5.6)} />
    </S>
    <Sub x={650} y={520} text="poorer health habits ↓" k={pop(t, 2.6)} color={C.text} size={38} />
    <Pic n="M15_sleepless" cx={650} cy={800} size={400} k={pop(t, 2.8)} t={t} float={3} />
  <Kick t={t} d={d} a="Skipped check-ups" b="Less exercise" />
    </Drift>
);

export const zeigarnik_waiters: React.FC<ShotProps> = ({ t, d }) => {
  const paid = ramp(t, 5.6, 0.6);
  return (
    <Drift t={t} d={d}>
      <Tag x={960} y={110} text="Bluma Zeigarnik · 1920s" bg={C.panel} color={C.text} k={pop(t, 0.2)} size={40} />
      <S><Obj n="O40_waiter" x={480} y={600} w={520} k={pop(t, 0.6)} fallback={<Person x={480} y={600} s={2} k={1} color="#F8FAFC" />} /></S>
      {["Soup · table 4", "Coffee ×2 · table 7", "Cake · table 2"].map((x, i) => (
        <Card key={x} x={1000} y={260 + i * 150} w={700} h={110} k={ramp(t, 1.4 + i * 0.8, 0.4)} color={paid > 0.5 ? C.line : C.amber}>
          <div style={{ fontSize: 36, fontWeight: 800, opacity: 1 - 0.7 * paid, textDecoration: paid > 0.5 ? "line-through" : "none" }}>{x}</div>
        </Card>
      ))}
      <Tag x={1350} y={790} text={paid > 0.5 ? "BILL PAID → forgotten" : "UNPAID → remembered"} bg={paid > 0.5 ? C.teal : C.amber} k={pop(t, 4.0)} size={38} />
    <Kick t={t} d={d} a="Open loops stick" b="Closed loops fade" />
    </Drift>
  );
};

export const hack1_tiny: React.FC<ShotProps> = ({ t }) => {
  const steps = [
    { l: "Open the document", at: 1.0, el: (k: number) => <Laptop x={420} y={460} s={0.8} k={k} t={t} /> },
    { l: "Write one ugly sentence", at: 2.4, el: (k: number) => <Laptop x={960} y={460} s={0.8} k={k} t={t} fill={0.18} /> },
    { l: "Set a 5-minute timer", at: 3.8, el: (k: number) => <Obj n="O44_timer_5min" x={1500} y={460} w={260} k={k} fallback={<Clock x={1500} y={460} s={1} k={1} m={t * 6} />} /> },
  ];
  return (
    <>
      <S>{steps.map((s, i) => <g key={i}>{s.el(pop(t, s.at))}</g>)}</S>
      {steps.map((s, i) => <Tag key={i} x={[420, 960, 1500][i]} y={690} text={s.l} bg={C.panel} color={C.text} k={pop(t, s.at + 0.2)} size={30} />)}
      <Title x={700} y={880} text="Starting = hard" size={56} color={C.coral} k={pop(t, 6.0)} />
      <Title x={1300} y={880} text="Continuing = easy" size={56} color={C.teal} k={pop(t, 7.0)} />
    </>
  );
};

export const achor_guitar: React.FC<ShotProps> = ({ t, d }) => {
  const move = ramp(t, 5.0, 1.6, Easing.inOut(Easing.cubic));
  return (
    <Drift t={t} d={d}>
      <Tag x={960} y={110} text="Shawn Achor · the 20-second rule" k={pop(t, 0.2)} size={40} />
      <S>
        <Door x={380} y={560} s={1.5} k={pop(t, 0.6)} open={ramp(t, 4.4, 0.5)} />
        <Obj n="O41_guitar_stand" x={lerp(380, 1100, move)} y={lerp(560, 600, move)} w={lerp(180, 420, move)} k={pop(t, 4.6)} />
        <Couch x={1550} y={720} s={0.8} k={pop(t, 2.0)} />
      </S>
      <Sub x={380} y={880} text="closet: 20 s away" k={pop(t, 1.2)} color={C.dim} size={32} />
      <Tag x={1100} y={880} text="20 s closer → habit stuck" bg={C.teal} k={pop(t, 8.0)} size={34} />
      <Count x={960} y={300} to={20} t={t} at={2.6} dur={1.2} suffix=" s" size={100} color={C.amber} />
    <Kick t={t} d={d} a="Make the good habit easy" b="Make the bad one harder" />
    </Drift>
  );
};

export const hack2_barriers: React.FC<ShotProps> = ({ t }) => {
  const items = [
    { l: "Delete the app from home screen", at: 0.6, el: (k: number) => <Phone x={380} y={460} s={0.8} k={k} badge={false} /> },
    { l: "Sign out", at: 2.0, el: (k: number) => <Lock x={960} y={460} s={1} k={k} /> },
    { l: "Phone in a drawer", at: 3.4, el: (k: number) => <Obj n="O45_drawer_phone" x={1540} y={460} w={360} k={k} fallback={<Phone x={1540} y={460} s={0.6} k={1} glow={0} />} /> },
  ];
  return (
    <>
      <S>{items.map((s, i) => <g key={i}>{s.el(pop(t, s.at))}</g>)}</S>
      {items.map((s, i) => <Tag key={i} x={[380, 960, 1540][i]} y={690} text={s.l} bg={C.panel} color={C.text} k={pop(t, s.at + 0.2)} size={28} />)}
      <Meter x={560} y={860} w={800} p={ramp(t, 5.0, 2.0)} color={C.teal} label="SECONDS FOR THE CEO TO CATCH UP" />
      <S><Ceo x={1460} y={860} s={0.6} k={pop(t, 6.6)} /></S>
    </>
  );
};

export const selfcomp_why: React.FC<ShotProps> = ({ t, d }) => {
  const kind = ramp(t, 6.0, 0.8);
  return (
    <Drift t={t} d={d}>
      <S>
        <Amyg x={960} y={560} s={2.0} k={pop(t, 0.3)} t={t} panic={1 - kind} whistle={false} />
        <Weight x={500} y={lerp(-200, 520, ramp(t, 1.2, 0.5, Easing.in(Easing.quad)))} s={1.3} k={1 - kind} label="CRITICISM" />
        <Heart x={1420} y={520} s={1.0} k={pop(t, 5.6)} glow={0.8} />
      </S>
      <Tag x={500} y={840} text="self-criticism = another threat" bg={C.coral} color={C.text} k={pop(t, 2.2) * (1 - kind)} size={32} />
      <Tag x={1420} y={840} text="self-compassion = alarm OFF" bg={C.teal} k={pop(t, 6.2)} size={32} />
      <Meter x={710} y={960} w={500} p={lerp(0.95, 0.15, ramp(t, 6.4, d - 8))} color={kind > 0.5 ? C.teal : C.coral} label="AMYGDALA ALARM" h={26} />
    <Kick t={t} d={d} a="Kindness ≠ excuses" b="Kindness = restart" />
    </Drift>
  );
};

export const selfcomp_try: React.FC<ShotProps> = ({ t }) => (
  <>
    <Pic n="M01_explaining" cx={420} cy={640} size={660} k={pop(t, 0.2)} t={t} float={4} />
    {["“That was frustrating.”", "“It's normal.”", "“Let's do 5 minutes now.”"].map((x, i) => (
      <Card key={x} x={900} y={220 + i * 200} w={860} h={140} k={ramp(t, 1.4 + i * 1.6, 0.5)} color={[C.coral, C.amber, C.teal][i]}>
        <div style={{ fontSize: 46, fontWeight: 900 }}>{x}</div>
      </Card>
    ))}
  </>
);

export const bridge_step_one: React.FC<ShotProps> = ({ t, d }) => (
  <HeroOr n="H7_bridge_handshake" t={t} d={d} dim={0.1} fallback={<><S><Ceo x={760} y={560} s={1.6} k={1} /><Amyg x={1160} y={580} s={1.4} k={1} t={t} whistle={false} /></S></>}>
    <Tag x={960} y={110} text="STEP 1 ✓ Why the Amygdala triggers procrastination" k={pop(t, 0.6)} size={36} />
  </HeroOr>
);

export const bridge_dopamine: React.FC<ShotProps> = ({ t }) => {
  const z = ramp(t, 0.2, 2.0, Easing.inOut(Easing.cubic));
  return (
    <>
      <Glow cx={960} cy={520} r={520} color={C.coral} op={0.3 + 0.1 * Math.sin(t * 3)} />
      <S>
        <Obj n="O47_dopamine_leak" x={960} y={520} w={lerp(300, 560, z)} k={pop(t, 0.2)} fallback={<Flask x={960} y={520} s={2} k={1} t={t} />} />
        <Phone x={420} y={420} s={0.6} k={pop(t, 2.0)} rot={-12} />
        <PlayCard x={330} y={720} s={0.7} k={pop(t, 2.8)} rot={8} />
        <Bell x={1560} y={480} s={0.7} k={pop(t, 3.6)} ring={Math.sin(t * 14)} />
      </S>
      <Title x={960} y={900} text="NEXT: CHEAP DOPAMINE" size={72} color={C.coral} k={pop(t, 5.0)} />
    </>
  );
};

export const SHOTS: Record<string, React.FC<ShotProps>> = {
  hook_emotion, hook_sources, pfc_slow, amyg_fast, bochum_study, bochum_meaning, discount_test, discount_flip, avatar_mirror, avatar_result,
  dopamine_wanting, tice_early, tice_late, sirois_health, zeigarnik_waiters, hack1_tiny, achor_guitar, hack2_barriers, selfcomp_why, selfcomp_try,
  bridge_step_one, bridge_dopamine,
  hook_deadline, hook_avoid, hook_familiar, hook_twist, hook_stats, hook_glitch, hook_promise,
  roommates_intro, pfc_ceo, pfc_jobs, amygdala_intro, amygdala_survival, amygdala_two_things, threat_task, threat_alarm, fight_flight, flight_phone, ancestor_modern,
  present_bias, small_now_big_later, fmri_intro, fmri_present, fmri_future, fmri_stranger, someone_else, dopamine_bars, toss_papers,
  guilt_bruteforce, midnight_vow, guilt_fuel, loop_intro, loop_1_2, loop_3_4, loop_5, loop_cortisol, loop_repeat, care_too_much,
  hacks_intro, hacks_three, hack1_boulder, hack1_permission, hack1_zeigarnik, hack2_friction, hack2_setup, hack3_compassion, hack3_study, hack3_starve,
  outro_software, outro_recap, outro_teaser, outro_end,
};
void interpolate; void clamp; void Sofa;
