// Brain & Psychology channel — episode film. Shots laid on the narration timeline (projects/<slug>/audio/timeline.json,
// passed as props by scripts/brain/render.mjs). Chapter cards between chapters, burned-in captions,
// a thin chapter progress bar (retention), navy particle field so the frame never reads as dead.
// Modular ending (owner doc 7.3): chapter titled "[SINGLE_OUTRO]" gets no PART card and is the block to cut for the Mega-Video.
import React from "react";
import { AbsoluteFill, Easing, Html5Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { AssetCtx, C, EpCtx, FONT, FPS, Particles, Stage } from "./kit";
import type { ShotProps, StageMood } from "./kit";
import { SHOTS as EP01 } from "./ep01/shots";

/** Episode registry: add `epNN: SHOTS` when a new episode gets its own shots file (src/brain/epNN/shots.tsx). */
const EPISODES: Record<string, Record<string, React.FC<ShotProps>>> = { ep01: EP01 };

export type BItem = { id: string; chapter: string; chapterTitle: string; first: boolean; shot: string; show: string; start: number; dur: number };
export type BrainEpisodeProps = { items: BItem[]; total: number; tail: number; withAudio: boolean; assets?: string[]; ep?: string };

type TransitionKind = "push" | "whip-left" | "whip-up" | "zoom-in";
const TRANS_CYCLE: TransitionKind[] = ["push", "whip-left", "whip-up", "zoom-in"];
const SHOT_TRANSITIONS: Record<string, TransitionKind> = {
  hook_avoid: "whip-left",
  hook_familiar: "push",
  hook_twist: "whip-left",
  hook_emotion: "whip-up",
  hook_stats: "whip-up",
  hook_sources: "whip-left",
  hook_glitch: "zoom-in",
  hook_promise: "zoom-in",
  roommates_intro: "zoom-in",
  pfc_ceo: "whip-left",
};
const SELF_STAGED = new Set([
  "hook_deadline", "hook_avoid", "hook_familiar", "hook_twist", "hook_emotion",
  "hook_stats", "hook_sources", "hook_glitch", "hook_promise", "roommates_intro", "pfc_ceo",
]);
const CHAPTER_STAGE: Record<string, { mood: StageMood; bgImg: string }> = {
  c1: { mood: "alert", bgImg: "H1_desk_hook.jpg" },
  c2: { mood: "mind",  bgImg: "H2_brain_roommates.jpg" },
  c3: { mood: "desk",  bgImg: "H3_present_future.jpg" },
  c4: { mood: "alert", bgImg: "H4_doom_loop.jpg" },
  c5: { mood: "lab",   bgImg: "H5_three_hacks.jpg" },
  c6: { mood: "warm",  bgImg: "H6_outro.jpg" },
  c7: { mood: "warm",  bgImg: "H7_bridge_handshake.jpg" },
};

const ShotPlayer: React.FC<{ shots: Record<string, React.FC<ShotProps>>; shot: string; chapter: string; idx: number; d: number; durF: number }> = ({ shots, shot, chapter, idx, d, durF }) => {
  const f = useCurrentFrame();
  const Fn = shots[shot];
  if (!Fn) throw new Error(`Unknown shot ${shot}`);
  const kind: TransitionKind = SHOT_TRANSITIONS[shot] ?? TRANS_CYCLE[idx % TRANS_CYCLE.length];
  const enter = interpolate(f, [0, 0.28 * FPS], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const exit = interpolate(f, [durF - 0.18 * FPS, durF], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const transform =
    kind === "whip-left" ? `translateX(${(1 - enter) * 120}px)` :
    kind === "whip-up" ? `translateY(${(1 - enter) * 80}px)` :
    kind === "zoom-in" ? `scale(${0.93 + 0.07 * enter})` :
    `scale(${1.03 - 0.03 * enter})`;
  const t = f / FPS;
  const st = CHAPTER_STAGE[chapter] ?? { mood: "mind" as StageMood, bgImg: "H2_brain_roommates.jpg" };
  const body = <Fn t={t} d={d} />;
  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, exit), transform }}>
      {SELF_STAGED.has(shot) ? body : (
        <Stage mood={st.mood} bgImg={st.bgImg} t={t} d={d} spotX={idx % 2 === 0 ? 520 : 1380} spotY={520}>
          {body}
        </Stage>
      )}
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ text: string; durF: number }> = ({ text, durF }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 0.16 * FPS, durF - 0.16 * FPS, durF], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 32, display: "flex", justifyContent: "center", opacity: o, pointerEvents: "none" }}>
      <div
        style={{
          background: "rgba(7,12,26,0.82)", color: C.text, fontFamily: FONT, fontWeight: 800, fontSize: 32,
          padding: "9px 28px", borderRadius: 14,
          border: "1px solid rgba(148,163,184,0.22)",
          borderBottom: `3px solid ${C.amber}`,
          boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
          letterSpacing: 0.2,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const Progress: React.FC<{ items: BItem[]; end: number }> = ({ items, end }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const marks = items.filter((i) => i.first && !i.chapterTitle.startsWith("[")).map((i) => i.start / end);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6, background: "rgba(51,65,85,0.6)" }}>
      <div style={{ width: `${(t / end) * 100}%`, height: 6, background: C.amber }} />
      {marks.map((m, i) => <div key={i} style={{ position: "absolute", left: `${m * 100}%`, top: 0, width: 4, height: 6, background: C.bg }} />)}
    </div>
  );
};

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #16213A 0%, ${C.bg} 70%)` }}>
      <Particles t={f / FPS} />
    </AbsoluteFill>
  );
};

export const BrainEpisode: React.FC<BrainEpisodeProps> = ({ items, total, tail, withAudio, assets = [], ep = "ep01" }) => {
  const shots = EPISODES[ep];
  if (!shots) throw new Error(`No shots registered for episode ${ep}`);
  const has = React.useMemo(() => new Set(assets), [assets]);
  const end = total + tail;
  return (
    <EpCtx.Provider value={ep}>
    <AssetCtx.Provider value={has}>
    <AbsoluteFill style={{ background: C.bg }}>
      <Bg />
      {items.map((it, i) => {
        const next = items[i + 1];
        // Continuous flow without PART chapter cards (TASTE-38)
        const nextStart = next ? next.start : end;
        const from = Math.round((i === 0 ? 0 : it.start) * FPS);
        const durF = Math.max(1, Math.round(nextStart * FPS) - from);
        const capDur = Math.round((it.dur + 0.2) * FPS);
        return (
          <React.Fragment key={it.id}>
            <Sequence from={from} durationInFrames={durF} name={it.shot}>
              <ShotPlayer shots={shots} shot={it.shot} chapter={it.chapter} idx={i} d={durF / FPS} durF={durF} />
            </Sequence>
            <Sequence from={Math.round(it.start * FPS)} durationInFrames={capDur} name={`cap ${it.id}`}>
              <Caption text={it.show} durF={capDur} />
            </Sequence>
          </React.Fragment>
        );
      })}
      <Progress items={items} end={end} />
      {withAudio && <Html5Audio src={staticFile(`brain/${ep}/master-audio.wav`)} />}
    </AbsoluteFill>
    </AssetCtx.Provider>
    </EpCtx.Provider>
  );
};
export const brainEpisodeDuration = (p: BrainEpisodeProps) => Math.round((p.total + p.tail) * FPS);
