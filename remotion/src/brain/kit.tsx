// Kit for the "Brain & Psychology" explainer channel (owner plan: projects/brain-procrastination-ep01/PLAN_owner.md).
// Flat vector / Kurzgesagt-like look on deep navy #0F172A, amber = data & positive energy, coral = stress & alarm.
// Assets: Gemini (one chat per episode) keyed to remotion/public/brain/<ep>/<name>.png; <ep> comes from the episode props.
import React from "react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

export const { fontFamily: FONT } = loadFont("normal", { weights: ["600", "800", "900"], subsets: ["latin"] });
export const FPS = 60; // owner doc 7.2 step 3: 1920x1080 60fps
/** Every shot gets its own clock: t = seconds since the beat began, d = beat length. */
export type ShotProps = { t: number; d: number };
/** Names of the Gemini assets present in public/brain/<ep> (passed in props) — icons fall back to vector when missing. */
export const AssetCtx = React.createContext<Set<string>>(new Set());
export const useHas = () => React.useContext(AssetCtx);
/** Episode asset folder under public/brain/ (e.g. "ep01"). */
export const EpCtx = React.createContext("ep01");
export const useAsset = () => { const ep = React.useContext(EpCtx); return (file: string) => staticFile(`brain/${ep}/${file}`); };
export const C = {
  bg: "#0F172A", panel: "#1E293B", line: "#334155", text: "#F8FAFC", dim: "#94A3B8",
  amber: "#F59E0B", coral: "#F43F5E", teal: "#2DD4BF", sky: "#38BDF8", pink: "#F9A8D4",
};
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 -> 1 spring-like arrival with overshoot, starting at `at` s. */
export const pop = (t: number, at: number, dur = 0.45) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.7)) });
export const ramp = (t: number, at: number, dur = 0.6, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing: ease });
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** A keyed asset placed by centre. `float` adds a gentle idle bob (never fully still, plan: max 4 s static). */
export const Pic: React.FC<{
  n: string; cx: number; cy: number; size: number; k?: number; op?: number; rot?: number; flip?: boolean; t?: number; float?: number; glow?: string; filter?: string;
}> = ({ n, cx, cy, size, k = 1, op = 1, rot = 0, flip = false, t = 0, float = 0, glow, filter }) => {
  const asset = useAsset();
  if (k <= 0.01 || op <= 0.01) return null;
  const dy = float ? Math.sin(t * 1.6 + cx * 0.01) * float : 0;
  return (
    <Img
      src={asset(`${n}.png`)}
      style={{
        position: "absolute", left: cx - size / 2, top: cy - size / 2 + dy, width: size, height: size, opacity: op, objectFit: "contain",
        transform: `scale(${flip ? -k : k}, ${k}) rotate(${rot}deg)`,
        filter: filter ?? (glow ? `drop-shadow(0 0 24px ${glow})` : "drop-shadow(0 14px 18px rgba(0,0,0,0.35))"),
      }}
    />
  );
};

/** Full-frame hero illustration (16:9) with a slow Ken-Burns push. */
export const Hero: React.FC<{ n: string; t: number; d: number; from?: number; to?: number; ox?: number; oy?: number; op?: number }> = ({
  n, t, d, from = 1.0, to = 1.08, ox = 50, oy = 50, op = 1,
}) => {
  const asset = useAsset();
  return (
  <Img
    src={asset(`${n}.jpg`)}
    style={{
      position: "absolute", inset: 0, width: 1920, height: 1080, opacity: op,
      transform: `scale(${lerp(from, to, Math.min(1, t / Math.max(1, d)))})`, transformOrigin: `${ox}% ${oy}%`,
    }}
  />
  );
};

/** Big kinetic headline. */
export const Title: React.FC<{ x: number; y: number; text: string; k?: number; size?: number; color?: string; align?: "center" | "left"; w?: number }> = ({
  x, y, text, k = 1, size = 72, color = C.text, align = "center", w,
}) =>
  k <= 0.01 ? null : (
    <div
      style={{
        position: "absolute", left: x, top: y, width: w, transform: `translate(${align === "center" ? "-50%" : "0"}, -50%) scale(${k})`,
        transformOrigin: align === "center" ? "center" : "left center", opacity: Math.min(1, k * 1.5),
        fontFamily: FONT, fontWeight: 900, fontSize: size, lineHeight: 1.05, color, textAlign: align, letterSpacing: -0.5,
        whiteSpace: w ? "normal" : "nowrap", textShadow: "0 6px 24px rgba(0,0,0,0.45)",
      }}
    >
      {text}
    </div>
  );

/** Rounded pill tag. */
export const Tag: React.FC<{ x: number; y: number; text: string; k?: number; bg?: string; color?: string; size?: number }> = ({
  x, y, text, k = 1, bg = C.amber, color = C.bg, size = 34,
}) =>
  k <= 0.01 ? null : (
    <div
      style={{
        position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${k})`, background: bg, color,
        fontFamily: FONT, fontWeight: 800, fontSize: size, padding: `${size * 0.3}px ${size * 0.7}px`, borderRadius: 999,
        whiteSpace: "nowrap", boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
      }}
    >
      {text}
    </div>
  );

/** Glass card with a coloured left rule. */
export const Card: React.FC<{ x: number; y: number; w: number; h: number; k?: number; color?: string; children?: React.ReactNode }> = ({
  x, y, w, h, k = 1, color = C.amber, children,
}) =>
  k <= 0.01 ? null : (
    <div
      style={{
        position: "absolute", left: x, top: y, width: w, height: h, transform: `translateY(${(1 - k) * 40}px)`, opacity: k,
        background: "rgba(30,41,59,0.92)", borderLeft: `10px solid ${color}`, borderRadius: 18, padding: "22px 30px",
        boxSizing: "border-box", boxShadow: "0 20px 40px rgba(0,0,0,0.35)", fontFamily: FONT, color: C.text,
      }}
    >
      {children}
    </div>
  );

/** Counting number. */
export const Count: React.FC<{ x: number; y: number; to: number; t: number; at: number; dur?: number; suffix?: string; size?: number; color?: string }> = ({
  x, y, to, t, at, dur = 1.2, suffix = "", size = 160, color = C.amber,
}) => {
  if (t < at) return null;
  const v = Math.round(interpolate(t, [at, at + dur], [0, to], { ...clamp, easing: Easing.out(Easing.cubic) }));
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)", fontFamily: FONT, fontWeight: 900, fontSize: size, color, lineHeight: 1 }}>
      {v}
      {suffix}
    </div>
  );
};

/** Ring (donut) chart filling to p (0..1). */
export const Ring: React.FC<{ cx: number; cy: number; r: number; p: number; color: string; w?: number }> = ({ cx, cy, r, p, color, w = 28 }) => {
  const L = 2 * Math.PI * r;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.line} strokeWidth={w} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={`${L * p} ${L}`} transform={`rotate(-90 ${cx} ${cy})`} />
    </svg>
  );
};

/** Vertical bar with label underneath. */
export const Bar: React.FC<{ x: number; base: number; w: number; h: number; p: number; color: string; label: string; value?: string }> = ({ x, base, w, h, p, color, label, value }) => (
  <>
    <div style={{ position: "absolute", left: x - w / 2, top: base - h * p, width: w, height: h * p, background: color, borderRadius: "14px 14px 4px 4px", boxShadow: `0 0 30px ${color}55` }} />
    {value && p > 0.6 && (
      <div style={{ position: "absolute", left: x, top: base - h * p - 50, transform: "translateX(-50%)", fontFamily: FONT, fontWeight: 900, fontSize: 40, color }}>{value}</div>
    )}
    <div style={{ position: "absolute", left: x, top: base + 40, transform: "translate(-50%, -50%)", fontFamily: FONT, fontWeight: 800, fontSize: 30, color: C.text, whiteSpace: "nowrap" }}>{label}</div>
  </>
);

/** Horizontal meter (stress / progress / battery). */
export const Meter: React.FC<{ x: number; y: number; w: number; p: number; color: string; label?: string; h?: number }> = ({ x, y, w, p, color, label, h = 34 }) => (
  <>
    {label && <div style={{ position: "absolute", left: x, top: y - 46, fontFamily: FONT, fontWeight: 800, fontSize: 28, color: C.dim }}>{label}</div>}
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: h, background: C.panel, border: `3px solid ${C.line}` }} />
    <div style={{ position: "absolute", left: x + 4, top: y + 4, width: Math.max(0, (w - 8) * p), height: h - 8, borderRadius: h, background: color, boxShadow: `0 0 20px ${color}` }} />
  </>
);

/** SVG overlay. */
export const S: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>{children}</svg>
);

/** Straight arrow (svg). */
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; w?: number; p?: number; dash?: boolean }> = ({ x1, y1, x2, y2, color, w = 10, p = 1, dash }) => {
  if (p <= 0.01) return null;
  const ex = x1 + (x2 - x1) * p, ey = y1 + (y2 - y1) * p;
  const a = Math.atan2(ey - y1, ex - x1), L = w * 2.6;
  return (
    <g>
      <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash ? `${w * 2} ${w * 1.4}` : undefined} />
      <path d={`M ${ex + Math.cos(a) * L * 0.6} ${ey + Math.sin(a) * L * 0.6} L ${ex + Math.cos(a + 2.4) * L} ${ey + Math.sin(a + 2.4) * L} L ${ex + Math.cos(a - 2.4) * L} ${ey + Math.sin(a - 2.4) * L} Z`} fill={color} />
    </g>
  );
};

/** Soft radial glow blob. */
export const Glow: React.FC<{ cx: number; cy: number; r: number; color: string; op?: number }> = ({ cx, cy, r, color, op = 0.5 }) =>
  op <= 0.01 ? null : (
    <div style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: "50%", background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, opacity: op }} />
  );

/** Subtle star/particle field so the navy never reads as a dead flat frame. */
export const Particles: React.FC<{ t: number; n?: number; color?: string }> = ({ t, n = 40, color = C.line }) => (
  <S>
    {Array.from({ length: n }, (_, i) => {
      const sx = (i * 977) % 1920, sy = (i * 571) % 1080;
      const y = (sy - t * (8 + (i % 5) * 4) + 1080) % 1080;
      return <circle key={i} cx={sx} cy={y} r={1.5 + (i % 3)} fill={color} opacity={0.6} />;
    })}
  </S>
);
