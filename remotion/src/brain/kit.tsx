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

/** Frosted glass card with coloured left accent rule & subtle specular edge (upgraded globally). */
export const Card: React.FC<{ x: number; y: number; w: number; h: number; k?: number; color?: string; children?: React.ReactNode }> = ({
  x, y, w, h, k = 1, color = C.amber, children,
}) =>
  k <= 0.01 ? null : (
    <div
      style={{
        position: "absolute", left: x, top: y, width: w, height: h,
        transform: `translateY(${(1 - k) * 32}px) scale(${0.97 + 0.03 * k})`, opacity: Math.min(1, k * 1.25),
        background: "linear-gradient(160deg, rgba(30,41,59,0.88) 0%, rgba(15,23,42,0.92) 100%)",
        border: "1px solid rgba(148,163,184,0.2)",
        borderTop: "1px solid rgba(255,255,255,0.22)",
        borderLeft: `8px solid ${color}`, borderRadius: 20, padding: "22px 30px",
        boxSizing: "border-box", boxShadow: `0 22px 44px rgba(2,6,23,0.52), 0 0 26px ${color}1A`,
        fontFamily: FONT, color: C.text,
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

/** Ring (donut) chart filling to p (0..1) with soft outer glow. */
export const Ring: React.FC<{ cx: number; cy: number; r: number; p: number; color: string; w?: number }> = ({ cx, cy, r, p, color, w = 28 }) => {
  const L = 2 * Math.PI * r;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(51,65,85,0.55)" strokeWidth={w} />
      <circle
        cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round"
        strokeDasharray={`${L * p} ${L}`} transform={`rotate(-90 ${cx} ${cy})`}
        style={{ filter: `drop-shadow(0 0 18px ${color}88)` }}
      />
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

export type StageMood = "desk" | "lab" | "alert" | "data" | "mind" | "warm";

const MOOD_CFG: Record<StageMood, { top: string; mid: string; bot: string; key: string; rim: string; grid: number; bgImg?: string }> = {
  desk:  { top: "#15223E", mid: "#0E1830", bot: "#0B1326", key: "#F59E0B", rim: "#38BDF8", grid: 0.055, bgImg: "H1_desk_hook.jpg" },
  lab:   { top: "#10273D", mid: "#0C1D30", bot: "#091526", key: "#2DD4BF", rim: "#F43F5E", grid: 0.075, bgImg: "H5_three_hacks.jpg" },
  alert: { top: "#281326", mid: "#171024", bot: "#0D0D1E", key: "#F43F5E", rim: "#F59E0B", grid: 0.06,  bgImg: "H4_doom_loop.jpg" },
  data:  { top: "#11223E", mid: "#0C182E", bot: "#091224", key: "#38BDF8", rim: "#F59E0B", grid: 0.085, bgImg: "H5_three_hacks.jpg" },
  mind:  { top: "#181E42", mid: "#101633", bot: "#0B1026", key: "#F59E0B", rim: "#2DD4BF", grid: 0.065, bgImg: "H2_brain_roommates.jpg" },
  warm:  { top: "#241B33", mid: "#151329", bot: "#0D0F22", key: "#F59E0B", rim: "#F9A8D4", grid: 0.055, bgImg: "H6_outro.jpg" },
};

/**
 * Full-bleed 1920x1080 studio stage (TASTE-36 + TASTE-37):
 * Fills 100% of the screen edge-to-edge with a softly blurred illustrated environment backdrop,
 * atmospheric dual spotlights, parallax blueprint grid, drifting ambient bokeh, and subtle vignette.
 * ZERO empty dark strip at the bottom.
 */
export const Stage: React.FC<{
  mood?: StageMood;
  t: number;
  d?: number;
  spotX?: number;
  spotY?: number;
  bgImg?: string;
  children: React.ReactNode;
}> = ({ mood = "mind", t, d = 8, spotX = 520, spotY = 540, bgImg, children }) => {
  const m = MOOD_CFG[mood];
  const asset = useAsset();
  const imgFile = bgImg ?? m.bgImg;
  const driftX = Math.sin(t * 0.35) * 14;
  const driftY = Math.cos(t * 0.28) * 8;
  const gridShift = (t * 14) % 80;
  const p = Math.min(1, t / Math.max(1, d));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: `linear-gradient(165deg, ${m.top} 0%, ${m.mid} 52%, ${m.bot} 100%)` }}>
      {/* Full-bleed illustrated ambient environment (1920x1080 edge-to-edge, soft focus) */}
      {imgFile && (
        <Img
          src={asset(imgFile)}
          style={{
            position: "absolute", inset: 0, width: 1920, height: 1080, objectFit: "cover",
            opacity: 0.22, filter: "blur(10px) saturate(1.25)",
            transform: `scale(${1.08 + 0.04 * p}) translate(${driftX * 0.6}px, ${driftY * 0.6}px)`,
            transformOrigin: "50% 50%",
          }}
        />
      )}

      {/* Full-screen architectural blueprint grid from top (0) to bottom (1080) */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: m.grid }}>
        <defs>
          <pattern id={`bg-grid-${mood}`} width="80" height="80" patternUnits="userSpaceOnUse" patternTransform={`translate(${gridShift} ${gridShift * 0.5})`}>
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#CBD5E1" />
          </pattern>
        </defs>
        <rect width={1920} height={1080} fill={`url(#bg-grid-${mood})`} />
      </svg>

      {/* Atmospheric Key & Rim Spotlights covering full 1080p height */}
      <div style={{ position: "absolute", left: spotX - 580 + driftX, top: spotY - 580 + driftY, width: 1160, height: 1160, borderRadius: "50%", background: `radial-gradient(circle, ${m.key}30 0%, transparent 68%)` }} />
      <div style={{ position: "absolute", left: 1920 - spotX - 520 - driftX, top: 820 - 520 - driftY, width: 1040, height: 1040, borderRadius: "50%", background: `radial-gradient(circle, ${m.rim}24 0%, transparent 70%)` }} />

      {/* Soft diagonal studio light shaft spanning full height */}
      <div
        style={{
          position: "absolute", left: -180 + p * 70, top: -300, width: 760, height: 1800,
          background: `linear-gradient(115deg, transparent 0%, ${m.key}14 45%, transparent 100%)`,
          transform: "rotate(18deg)", pointerEvents: "none",
        }}
      />

      {/* Ambient floating bokeh particles across full 1920x1080 */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 18 }, (_, i) => {
          const bx = (i * 317 + 80) % 1920;
          const by = ((i * 223 + 120) - t * (10 + (i % 4) * 5) + 1080) % 1080;
          const r = 3 + (i % 4) * 2.5;
          return <circle key={i} cx={bx} cy={by} r={r} fill={i % 2 === 0 ? m.key : m.rim} opacity={0.16} />;
        })}
      </svg>

      {/* Scene content with gentle living drift */}
      <div style={{ position: "absolute", inset: 0, transform: `scale(${1 + 0.025 * p})`, transformOrigin: "50% 50%" }}>
        {children}
      </div>

      {/* Subtle cinematic edge vignette (keeps full-screen depth without blackening the bottom) */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, transparent 62%, rgba(4,8,20,0.48) 100%)", pointerEvents: "none" }} />
    </div>
  );
};

/**
 * Half-body mascot anchored FLUSH to the bottom edge (y = 1080, TASTE-37)
 * so the horizontal waist cut NEVER floats in mid-air with an empty gap underneath.
 */
export const BottomMascot: React.FC<{
  n: string; x: number; size?: number; t: number; at?: number; flip?: boolean; glow?: string;
}> = ({ n, x, size = 760, t, at = 0, flip = false, glow }) => {
  const asset = useAsset();
  const k = pop(t, at, 0.5);
  if (k <= 0.01) return null;
  const dy = (1 - k) * 90 + Math.sin(t * 1.5) * 4;
  // Offset transparent bottom padding inside mascot PNGs so the torso sits 100% flush to y = 1080
  const padOffset = Math.round(size * 0.13);
  return (
    <Img
      src={asset(`${n}.png`)}
      style={{
        position: "absolute", left: x - size / 2, bottom: -padOffset - dy, width: size, height: size,
        objectFit: "contain", objectPosition: "bottom center", opacity: Math.min(1, k * 1.4),
        transform: `scaleX(${flip ? -1 : 1})`,
        filter: glow ? `drop-shadow(0 0 28px ${glow})` : "drop-shadow(0 12px 24px rgba(0,0,0,0.45))",
      }}
    />
  );
};

/** Ground contact shadow under a character or prop so it sits with real weight. */
export const GroundShadow: React.FC<{ cx: number; cy: number; rx?: number; ry?: number; k?: number; op?: number }> = ({
  cx, cy, rx = 180, ry = 26, k = 1, op = 0.55,
}) =>
  k <= 0.01 ? null : (
    <div
      style={{
        position: "absolute", left: cx - rx * k, top: cy - ry * k, width: rx * 2 * k, height: ry * 2 * k,
        borderRadius: "50%", background: "radial-gradient(ellipse, rgba(2,6,23,0.85) 0%, transparent 72%)", opacity: op * k,
      }}
    />
  );

/** Upgraded frosted glass panel with top specular highlight and subtle glow border. */
export const GlassCard: React.FC<{
  x: number; y: number; w: number; h: number; k?: number; accent?: string; children?: React.ReactNode;
}> = ({ x, y, w, h, k = 1, accent = C.amber, children }) =>
  k <= 0.01 ? null : (
    <div
      style={{
        position: "absolute", left: x, top: y, width: w, height: h,
        transform: `translateY(${(1 - k) * 32}px) scale(${0.96 + 0.04 * k})`, opacity: Math.min(1, k * 1.25),
        background: "linear-gradient(160deg, rgba(30,41,59,0.88) 0%, rgba(15,23,42,0.92) 100%)",
        border: "1px solid rgba(148,163,184,0.2)",
        borderTop: "1px solid rgba(255,255,255,0.22)",
        borderLeft: `7px solid ${accent}`,
        borderRadius: 20, padding: "22px 28px", boxSizing: "border-box",
        boxShadow: `0 22px 44px rgba(2,6,23,0.55), 0 0 28px ${accent}1A`,
        fontFamily: FONT, color: C.text,
      }}
    >
      {children}
    </div>
  );
