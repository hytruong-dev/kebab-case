// CurioShift 9:16 YouTube Short (1080x1920, 60fps)
// Visual grammar inspired by @IfverseTales (top escalating status pill, huge expressive center visual,
// bold ALL-CAPS outlined 2-color kinetic captions above the 20% bottom safe zone, @CurioShiftMind watermark,
// and bottom funnel pill pointing to the Related Video) fused with CurioShift's flat-vector Gemini assets (TASTE-35).
import React from "react";
import { AbsoluteFill, Easing, Html5Audio, Img, Sequence, interpolate, random, spring, staticFile, useCurrentFrame } from "remotion";
import { C, FONT, FPS, pop, ramp } from "./kit";

export type ShortItem = {
  id: string;
  shot: string;
  show: string;
  start: number;
  dur: number;
};

export type BrainShortProps = {
  items: ShortItem[];
  total: number;
  tail: number;
  withAudio: boolean;
  ep?: string;
  audioDir?: string;
};

export function brainShortDuration(p: BrainShortProps): number {
  return Math.max(FPS * 3, Math.ceil((p.total + p.tail) * FPS));
}

const SW = 1080;
const SH = 1920;

const asset = (ep: string, file: string) => staticFile(`brain/${ep}/${file}`);

type PillSpec = {
  left: string;
  right?: string;
  strikeLeft?: boolean;
  accent: "amber" | "coral" | "cyan";
  bgImg: string;
};

const PILLS: Record<string, PillSpec> = {
  s01_hook:      { left: "LABEL:", right: "LAZY", strikeLeft: true, accent: "coral", bgImg: "H1_desk_hook.jpg" },
  s02_twist:     { left: "TIME PROBLEM?", right: "NO.", accent: "amber", bgImg: "H1_desk_hook.jpg" },
  s03_threat:    { left: "AMYGDALA", right: "THREAT 100%", accent: "coral", bgImg: "H2_brain_roommates.jpg" },
  s04_caveman:   { left: "SURVIVAL MODE", right: "ACTIVE", accent: "coral", bgImg: "H2_brain_roommates.jpg" },
  s05_flight:    { left: "FIGHT OR FLIGHT", right: "FLIGHT", accent: "amber", bgImg: "H4_doom_loop.jpg" },
  s06_phone:     { left: "DOPAMINE", right: "HIJACKED", accent: "coral", bgImg: "H4_doom_loop.jpg" },
  s07_loop:      { left: "RELIEF 5s", right: "GUILT 100%", accent: "coral", bgImg: "H3_present_future.jpg" },
  s08_willpower: { left: "WILLPOWER", right: "0% WIN RATE", accent: "coral", bgImg: "H4_doom_loop.jpg" },
  s09_hack:      { left: "TRICK #1", right: "5-MIN RULE", accent: "amber", bgImg: "H5_three_hacks.jpg" },
  s10_cta:       { left: "3 BRAIN TRICKS", right: "FULL VIDEO", accent: "amber", bgImg: "H5_three_hacks.jpg" },
};

const accentHex = (a: PillSpec["accent"]) => (a === "coral" ? C.coral : a === "cyan" ? "#38BDF8" : C.amber);

/** Full-bleed 9:16 atmospheric stage with blurred hero art, blueprint grid, spotlight & particles. */
const ShortStage: React.FC<{ bgImg: string; accent: PillSpec["accent"]; ep: string; t: number; d: number }> = ({
  bgImg, accent, ep, t, d,
}) => {
  const glow = accentHex(accent);
  const zoom = 1.08 + 0.08 * ramp(t, 0, Math.max(d, 0.5));
  const panX = Math.sin(t * 0.8) * 14;
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <Img
        src={asset(ep, bgImg)}
        style={{
          position: "absolute", inset: -40, width: "calc(100% + 80px)", height: "calc(100% + 80px)",
          objectFit: "cover",
          transform: `translateX(${panX}px) scale(${zoom})`,
          filter: "blur(18px) saturate(1.18) brightness(0.42)",
          opacity: 0.72,
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 920px 760px at 540px 840px, ${glow}30, rgba(11,17,32,0.58) 54%, rgba(7,11,20,0.92) 100%)`,
        }}
      />
      <svg viewBox={`0 0 ${SW} ${SH}`} width={SW} height={SH} style={{ position: "absolute", inset: 0, opacity: 0.09 }}>
        <defs>
          <pattern id="shortGrid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width={SW} height={SH} fill="url(#shortGrid)" />
      </svg>
      <svg viewBox={`0 0 ${SW} ${SH}`} width={SW} height={SH} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 24 }, (_, i) => {
          const bx = random(`sx-${i}`) * SW;
          const by = ((random(`sy-${i}`) * SH - t * (28 + random(`sv-${i}`) * 36)) % SH + SH) % SH;
          const r = 2 + random(`sr-${i}`) * 3.5;
          const op = 0.14 + random(`so-${i}`) * 0.28;
          return <circle key={i} cx={bx} cy={by} r={r} fill={i % 3 === 0 ? glow : "#E2E8F0"} opacity={op} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Signature @IfverseTales top escalating pill header (sits cleanly at y=140px inside top safe zone). */
const TopStatusPill: React.FC<{ spec: PillSpec; t: number }> = ({ spec, t }) => {
  const f = Math.round(t * FPS);
  const s = spring({ fps: FPS, frame: f, config: { damping: 14, stiffness: 220, mass: 0.7 } });
  const col = accentHex(spec.accent);
  const pulse = spec.accent === "coral" ? 0.82 + 0.18 * Math.sin(t * 10) : 1;
  const slashW = spec.strikeLeft ? ramp(t, 0.35, 0.25) : 0;

  return (
    <div
      style={{
        position: "absolute", top: 145, left: 48, right: 48,
        display: "flex", justifyContent: "center",
        transform: `scale(${0.86 + 0.14 * s}) translateY(${(1 - s) * -28}px)`,
        opacity: Math.min(1, s * 1.4),
      }}
    >
      <div
        style={{
          display: "inline-flex", alignItems: "center", gap: 20,
          background: "rgba(9, 14, 28, 0.92)",
          border: `3.5px solid ${col}`,
          boxShadow: `0 14px 40px rgba(0,0,0,0.65), 0 0 ${Math.round(28 * pulse)}px ${col}66`,
          borderRadius: 999,
          padding: "16px 38px",
          fontFamily: FONT, fontWeight: 900, fontSize: 40, letterSpacing: 1.2,
          color: "#F8FAFC",
          textTransform: "uppercase",
        }}
      >
        <span>{spec.left}</span>
        {spec.right && (
          <>
            <span style={{ color: col, opacity: 0.8 }}>•</span>
            <span style={{ position: "relative", color: col }}>
              {spec.right}
              {spec.strikeLeft && (
                <span
                  style={{
                    position: "absolute", left: -8, top: "50%",
                    height: 9, width: `${Math.round(slashW * 114)}%`,
                    background: C.coral, borderRadius: 6,
                    transform: "translateY(-50%) rotate(-5deg)",
                    boxShadow: "0 0 14px rgba(244,63,94,0.95)",
                  }}
                />
              )}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

/** Helper for placing a Gemini PNG inside the 9:16 stage with spring pop + continuous breathing motion. */
const Sprite: React.FC<{
  ep: string;
  file: string;
  x: number;
  y: number;
  w: number;
  h: number;
  t: number;
  delay?: number;
  rot?: number;
  floatAmp?: number;
  glow?: string;
  scale?: number;
}> = ({ ep, file, x, y, w, h, t, delay = 0, rot = 0, floatAmp = 8, glow, scale = 1 }) => {
  const k = pop(t, delay, 0.32);
  const dy = Math.sin((t - delay) * 3.1) * floatAmp;
  const sc = (0.72 + 0.28 * k) * scale;
  return (
    <div
      style={{
        position: "absolute",
        left: x - w / 2,
        top: y - h / 2 + dy,
        width: w,
        height: h,
        opacity: k,
        transform: `scale(${sc}) rotate(${rot}deg)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <Img
        src={asset(ep, file)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: glow
            ? `drop-shadow(0 0 28px ${glow}) drop-shadow(0 18px 26px rgba(0,0,0,0.55))`
            : "drop-shadow(0 18px 28px rgba(0,0,0,0.55))",
        }}
      />
    </div>
  );
};

/** Center 9:16 visual choreography for all 10 rapid-fire beats. */
const ShotVisual: React.FC<{ shot: string; ep: string; t: number; d: number }> = ({ shot, ep, t, d }) => {
  const p = ramp(t, 0, Math.max(d, 0.4));

  switch (shot) {
    case "s01_hook": {
      const shake = t < 0.45 ? Math.sin(t * 58) * (1 - t / 0.45) * 14 : 0;
      return (
        <AbsoluteFill style={{ transform: `translateX(${shake}px)` }}>
          <Sprite ep={ep} file="M03_shocked.png" x={540} y={820} w={840} h={840} t={t} delay={0} floatAmp={6} glow="rgba(244,63,94,0.52)" scale={1.0 + 0.08 * p} />
        </AbsoluteFill>
      );
    }

    case "s02_twist": {
      const cross = pop(t, 0.55, 0.25);
      const brainK = pop(t, 0.95, 0.32);
      return (
        <AbsoluteFill>
          <Sprite ep={ep} file="O44_timer_5min.png" x={310} y={760} w={420} h={420} t={t} delay={0} rot={-6} />
          {/* Coral X over the clock */}
          <svg viewBox={`0 0 ${SW} ${SH}`} width={SW} height={SH} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <g opacity={cross} transform={`translate(310 760) scale(${0.6 + 0.4 * cross})`}>
              <line x1={-150} y1={-150} x2={150} y2={150} stroke={C.coral} strokeWidth={28} strokeLinecap="round" />
              <line x1={150} y1={-150} x2={-150} y2={150} stroke={C.coral} strokeWidth={28} strokeLinecap="round" />
            </g>
          </svg>
          <Sprite ep={ep} file="O02_brain_glow.png" x={710} y={840} w={500} h={500} t={t} delay={0.65} glow="rgba(245,158,11,0.7)" scale={0.95 + 0.1 * brainK} />
        </AbsoluteFill>
      );
    }

    case "s03_threat": {
      const pulse = 1 + 0.16 * Math.sin(t * 11);
      return (
        <AbsoluteFill>
          {/* Pulsing alarm sonar rings behind head */}
          <svg viewBox={`0 0 ${SW} ${SH}`} width={SW} height={SH} style={{ position: "absolute", inset: 0 }}>
            {[0, 1, 2].map((i) => {
              const phase = (t * 1.15 + i * 0.33) % 1;
              return (
                <circle
                  key={i}
                  cx={540} cy={780}
                  r={170 + phase * 320}
                  fill="none" stroke={C.coral} strokeWidth={8 * (1 - phase)}
                  opacity={(1 - phase) * 0.72}
                />
              );
            })}
          </svg>
          <Sprite ep={ep} file="O01_head_section.png" x={470} y={810} w={680} h={740} t={t} delay={0} floatAmp={5} glow="rgba(244,63,94,0.45)" />
          <Sprite ep={ep} file="C02_amygdala.png" x={760} y={620} w={360} h={360} t={t} delay={0.5} scale={pulse * 0.92} glow="rgba(244,63,94,0.85)" />
          <Sprite ep={ep} file="O16_alarm_button.png" x={770} y={1020} w={290} h={290} t={t} delay={1.0} glow="rgba(244,63,94,0.75)" />
        </AbsoluteFill>
      );
    }

    case "s04_caveman": {
      const runX = -40 + p * 110;
      const chaseX = -90 + p * 135;
      return (
        <AbsoluteFill>
          {/* High-energy speed lines */}
          <svg viewBox={`0 0 ${SW} ${SH}`} width={SW} height={SH} style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
            {[460, 580, 710, 840, 970, 1100].map((y, i) => {
              const offset = ((t * 1400 + i * 210) % 1400) - 200;
              return <line key={i} x1={1200 - offset} y1={y} x2={1480 - offset} y2={y} stroke="#F59E0B" strokeWidth={5} strokeLinecap="round" />;
            })}
          </svg>
          <Sprite ep={ep} file="O48_flame.png" x={235 + chaseX} y={820} w={420} h={460} t={t} delay={0} floatAmp={12} glow="rgba(244,63,94,0.75)" />
          <Sprite ep={ep} file="C02_amygdala.png" x={335 + chaseX} y={850} w={390} h={390} t={t} delay={0.08} floatAmp={14} glow="rgba(244,63,94,0.65)" />
          <Sprite ep={ep} file="C03_caveman.png" x={750 + runX} y={830} w={470} h={470} t={t} delay={0.18} floatAmp={18} glow="rgba(245,158,11,0.5)" />
        </AbsoluteFill>
      );
    }

    case "s05_flight": {
      const sprint = ramp(t, 0.7, Math.max(d - 0.7, 0.5));
      return (
        <AbsoluteFill>
          <Sprite ep={ep} file="O17_spreadsheet.png" x={300} y={760} w={460} h={460} t={t} delay={0} rot={-5} glow="rgba(244,63,94,0.4)" />
          <Sprite ep={ep} file="M12_running.png" x={660 + sprint * 140} y={880} w={580} h={580} t={t} delay={0.45} floatAmp={15} glow="rgba(245,158,11,0.45)" />
        </AbsoluteFill>
      );
    }

    case "s06_phone": {
      const notif = pop(t, 0.55, 0.22);
      const notif2 = pop(t, 1.15, 0.22);
      return (
        <AbsoluteFill>
          <Sprite ep={ep} file="M06_distracted.png" x={370} y={870} w={620} h={620} t={t} delay={0} floatAmp={6} />
          <Sprite ep={ep} file="O05_smartphone.png" x={740} y={760} w={450} h={450} t={t} delay={0.25} rot={8} glow="rgba(245,158,11,0.75)" />
          {/* Floating red notification badges */}
          <div style={{ position: "absolute", left: 790, top: 470, opacity: notif, transform: `scale(${0.6 + 0.4 * notif})` }}>
            <div style={{ background: C.coral, color: "#FFF", fontFamily: FONT, fontWeight: 900, fontSize: 42, borderRadius: 999, padding: "10px 26px", boxShadow: "0 10px 26px rgba(244,63,94,0.7)" }}>
              +99
            </div>
          </div>
          <div style={{ position: "absolute", left: 590, top: 530, opacity: notif2, transform: `scale(${0.6 + 0.4 * notif2})` }}>
            <div style={{ background: C.amber, color: "#0B1120", fontFamily: FONT, fontWeight: 900, fontSize: 34, borderRadius: 999, padding: "8px 22px", boxShadow: "0 10px 26px rgba(245,158,11,0.7)" }}>
              DOPAMINE!
            </div>
          </div>
        </AbsoluteFill>
      );
    }

    case "s07_loop": {
      const splitShift = ramp(t, 1.35, 0.32);
      return (
        <AbsoluteFill>
          {/* Top calm half -> Bottom panic half */}
          <div style={{ position: "absolute", inset: 0, opacity: 1 - splitShift * 0.45, transform: `translateY(${-splitShift * 140}px)` }}>
            <Sprite ep={ep} file="M13_relaxing.png" x={540} y={620} w={500} h={500} t={t} delay={0} glow="rgba(56,189,248,0.5)" />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: splitShift, transform: `translateY(${(1 - splitShift) * 140}px)` }}>
            <Sprite ep={ep} file="M14_stressed_papers.png" x={480} y={960} w={580} h={580} t={t} delay={1.25} glow="rgba(244,63,94,0.65)" />
            <Sprite ep={ep} file="O49_weight_guilt.png" x={790} y={920} w={320} h={320} t={t} delay={1.45} glow="rgba(244,63,94,0.8)" />
          </div>
        </AbsoluteFill>
      );
    }

    case "s08_willpower": {
      const drain = Math.max(0.06, 1 - ramp(t, 0.15, Math.max(d - 0.5, 0.8)));
      const pct = Math.round(drain * 100);
      return (
        <AbsoluteFill>
          <Sprite ep={ep} file="M08_burnout.png" x={540} y={880} w={680} h={680} t={t} delay={0} floatAmp={5} glow="rgba(244,63,94,0.45)" />
          {/* Draining willpower bar */}
          <div style={{ position: "absolute", left: 160, right: 160, top: 370 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT, fontWeight: 900, fontSize: 34, color: "#F8FAFC", marginBottom: 12 }}>
              <span>WILLPOWER</span>
              <span style={{ color: C.coral }}>{pct}%</span>
            </div>
            <div style={{ height: 34, borderRadius: 999, background: "rgba(15,23,42,0.9)", border: "3px solid rgba(148,163,184,0.35)", overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${C.coral}, ${C.amber})`, borderRadius: 999 }} />
            </div>
          </div>
        </AbsoluteFill>
      );
    }

    case "s09_hack": {
      const shrink = ramp(t, 0.55, 0.65);
      return (
        <AbsoluteFill>
          {/* Giant boulder shrinks into tiny pebble */}
          <div style={{ opacity: 1 - shrink * 0.92, transform: `scale(${1 - shrink * 0.65})`, transformOrigin: "360px 760px" }}>
            <Sprite ep={ep} file="O08_boulder.png" x={360} y={760} w={560} h={560} t={t} delay={0} />
          </div>
          <div style={{ opacity: shrink }}>
            <Sprite ep={ep} file="O09_pebble.png" x={330} y={880} w={260} h={260} t={t} delay={0.7} glow="rgba(245,158,11,0.8)" />
          </div>
          <Sprite ep={ep} file="M07_eureka.png" x={710} y={820} w={580} h={580} t={t} delay={0.4} glow="rgba(245,158,11,0.65)" />
          {/* Bold 5:00 badge */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 365, textAlign: "center", opacity: pop(t, 0.85, 0.25) }}>
            <span style={{ display: "inline-block", fontFamily: FONT, fontWeight: 900, fontSize: 82, color: C.amber, background: "rgba(11,17,32,0.92)", border: `4px solid ${C.amber}`, borderRadius: 24, padding: "8px 42px", boxShadow: "0 14px 36px rgba(245,158,11,0.4)" }}>
              05:00
            </span>
          </div>
        </AbsoluteFill>
      );
    }

    case "s10_cta":
    default: {
      const bounce = Math.sin(t * 7) * 14;
      return (
        <AbsoluteFill>
          {/* 3 padlocks: #1 open (O14_retro_computer = open padlock per LESSON-43), #2 & #3 locked */}
          <Sprite ep={ep} file="O14_retro_computer.png" x={235} y={530} w={255} h={255} t={t} delay={0.1} glow="rgba(245,158,11,0.85)" />
          <Sprite ep={ep} file="O10_padlock_closed.png" x={540} y={530} w={250} h={250} t={t} delay={0.35} glow="rgba(244,63,94,0.55)" />
          <Sprite ep={ep} file="O10_padlock_closed.png" x={845} y={530} w={250} h={250} t={t} delay={0.6} glow="rgba(244,63,94,0.55)" />
          <Sprite ep={ep} file="M02_pointing.png" x={540} y={960} w={610} h={610} t={t} delay={0} glow="rgba(245,158,11,0.55)" />
          {/* Funnel CTA pill pointing directly down to YouTube Related Video button */}
          <div
            style={{
              position: "absolute", left: 70, right: 170, top: 1555 + bounce * 0.45,
              display: "flex", justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #F59E0B, #FBBF24)",
                color: "#0B1120",
                fontFamily: FONT, fontWeight: 900, fontSize: 34, letterSpacing: 0.8,
                padding: "16px 34px", borderRadius: 999,
                boxShadow: "0 14px 36px rgba(245,158,11,0.55)",
                textTransform: "uppercase",
              }}
            >
              FULL VIDEO ON THE CHANNEL ↓
            </div>
          </div>
        </AbsoluteFill>
      );
    }
  }
};

/** Bold ALL-CAPS @IfverseTales kinetic caption safely above the bottom 20% Shorts UI zone (y=1330..1490). */
const ShortCaption: React.FC<{ show: string; accent: PillSpec["accent"]; t: number }> = ({ show, accent, t }) => {
  const [line1, line2] = show.includes("|") ? show.split("|") : [show, ""];
  const k1 = pop(t, 0, 0.2);
  const k2 = pop(t, 0.16, 0.22);
  const hi = accentHex(accent);

  const textStyle = (color: string, size: number, k: number): React.CSSProperties => ({
    fontFamily: FONT,
    fontWeight: 900,
    fontSize: size,
    lineHeight: 1.06,
    color,
    textTransform: "uppercase",
    letterSpacing: -0.5,
    WebkitTextStroke: "5px #070B14",
    paintOrder: "stroke fill",
    textShadow: "0 10px 26px rgba(0,0,0,0.92)",
    transform: `scale(${0.82 + 0.18 * k}) translateY(${(1 - k) * 18}px)`,
    opacity: k,
    textAlign: "center",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        right: 165, // Respect right 15% YouTube Shorts UI buttons
        top: 1320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        pointerEvents: "none",
      }}
    >
      <div style={textStyle("#F8FAFC", 58, k1)}>{line1}</div>
      {line2 && <div style={textStyle(hi, 72, k2)}>{line2}</div>}
    </div>
  );
};

export const BrainShort: React.FC<BrainShortProps> = ({
  items,
  total,
  tail,
  withAudio,
  ep = "ep01",
  audioDir = "short01",
}) => {
  const frame = useCurrentFrame();
  const totalF = brainShortDuration({ items, total, tail, withAudio, ep, audioDir });
  const progress = Math.min(1, frame / Math.max(1, totalF));

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      {items.map((it, idx) => {
        const fromF = Math.round(it.start * FPS);
        const nextStart = idx < items.length - 1 ? items[idx + 1].start : total + tail;
        const durS = Math.max(0.4, nextStart - it.start);
        const durF = Math.max(1, Math.round(durS * FPS));
        const spec = PILLS[it.shot] ?? PILLS.s01_hook;

        return (
          <Sequence key={it.id} from={fromF} durationInFrames={durF}>
            <ShortBeat spec={spec} shot={it.shot} show={it.show} ep={ep} durS={durS} durF={durF} />
          </Sequence>
        );
      })}

      {/* Subtle @CurioShiftMind handle watermark cleanly above caption safe zone */}
      <div
        style={{
          position: "absolute", left: 48, top: 1265,
          fontFamily: FONT, fontWeight: 800, fontSize: 26,
          color: "rgba(248,250,252,0.72)",
          textShadow: "0 3px 10px rgba(0,0,0,0.9)",
          letterSpacing: 0.4,
          pointerEvents: "none",
        }}
      >
        @CurioShiftMind
      </div>

      {/* Top retention progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "rgba(255,255,255,0.12)" }}>
        <div
          style={{
            width: `${(progress * 100).toFixed(2)}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${C.amber}, ${C.coral})`,
            boxShadow: `0 0 16px ${C.amber}`,
          }}
        />
      </div>

      {withAudio && <Html5Audio src={staticFile(`brain/${audioDir}/master-audio.wav`)} />}
    </AbsoluteFill>
  );
};

const ShortBeat: React.FC<{
  spec: PillSpec;
  shot: string;
  show: string;
  ep: string;
  durS: number;
  durF: number;
}> = ({ spec, shot, show, ep, durS, durF }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const enter = interpolate(f, [0, 0.16 * FPS], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const exit = interpolate(f, [durF - 0.12 * FPS, durF], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, exit), transform: `scale(${1.03 - 0.03 * enter})` }}>
      <ShortStage bgImg={spec.bgImg} accent={spec.accent} ep={ep} t={t} d={durS} />
      <TopStatusPill spec={spec} t={t} />
      <ShotVisual shot={shot} ep={ep} t={t} d={durS} />
      <ShortCaption show={show} accent={spec.accent} t={t} />
    </AbsoluteFill>
  );
};
