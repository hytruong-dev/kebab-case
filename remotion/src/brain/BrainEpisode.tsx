// Brain & Psychology channel — episode film. Shots laid on the narration timeline (projects/<slug>/audio/timeline.json,
// passed as props by scripts/brain/render.mjs). Chapter cards between chapters, burned-in captions,
// a thin chapter progress bar (retention), navy particle field so the frame never reads as dead.
// Modular ending (owner doc 7.3): chapter titled "[SINGLE_OUTRO]" gets no PART card and is the block to cut for the Mega-Video.
import React from "react";
import { AbsoluteFill, Easing, Html5Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { AssetCtx, C, EpCtx, FONT, FPS, Particles, Title, pop } from "./kit";
import type { ShotProps } from "./kit";
import { SHOTS as EP01 } from "./ep01/shots";

/** Episode registry: add `epNN: SHOTS` when a new episode gets its own shots file (src/brain/epNN/shots.tsx). */
const EPISODES: Record<string, Record<string, React.FC<ShotProps>>> = { ep01: EP01 };

export type BItem = { id: string; chapter: string; chapterTitle: string; first: boolean; shot: string; show: string; start: number; dur: number };
export type BrainEpisodeProps = { items: BItem[]; total: number; tail: number; withAudio: boolean; assets?: string[]; ep?: string };
const CARD = 1.6;

const ShotPlayer: React.FC<{ shots: Record<string, React.FC<ShotProps>>; shot: string; d: number; durF: number }> = ({ shots, shot, d, durF }) => {
  const f = useCurrentFrame();
  const Fn = shots[shot];
  if (!Fn) throw new Error(`Unknown shot ${shot}`);
  // smooth editorial push-in / fade at the cut (vector style -> smooth, not stop-motion)
  const enter = interpolate(f, [0, 0.27 * FPS], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const exit = interpolate(f, [durF - 0.2 * FPS, durF], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, exit), transform: `scale(${1.03 - 0.03 * enter})` }}>
      <Fn t={f / FPS} d={d} />
    </AbsoluteFill>
  );
};

const ChapterCard: React.FC<{ n: number; title: string }> = ({ n, title }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const out = interpolate(f, [CARD * FPS - 0.2 * FPS, CARD * FPS], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: C.bg, opacity: out }}>
      <div style={{ position: "absolute", left: 960 - 300 * pop(t, 0.05), top: 470, width: 600 * pop(t, 0.05), height: 6, background: C.amber, borderRadius: 3 }} />
      <Title x={960} y={400} text={`PART ${n}`} size={40} color={C.amber} k={pop(t, 0.1)} />
      <Title x={960} y={560} text={title} size={84} k={pop(t, 0.3)} />
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ text: string; durF: number }> = ({ text, durF }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 0.17 * FPS, durF - 0.17 * FPS, durF], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, display: "flex", justifyContent: "center", opacity: o }}>
      <div style={{ background: "rgba(2,6,23,0.78)", color: C.text, fontFamily: FONT, fontWeight: 800, fontSize: 34, padding: "8px 26px", borderRadius: 12, borderBottom: `4px solid ${C.amber}` }}>{text}</div>
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
  const chapters: string[] = [];
  items.forEach((it) => { if (!chapters.includes(it.chapter)) chapters.push(it.chapter); });
  return (
    <EpCtx.Provider value={ep}>
    <AssetCtx.Provider value={has}>
    <AbsoluteFill style={{ background: C.bg }}>
      <Bg />
      {items.map((it, i) => {
        const ci = chapters.indexOf(it.chapter);
        const next = items[i + 1];
        const card = (x: BItem) => x.first && !x.chapterTitle.startsWith("[");
        const nextStart = next ? (card(next) ? next.start - CARD : next.start) : end;
        const from = Math.round((i === 0 ? 0 : it.start) * FPS);
        const durF = Math.max(1, Math.round(nextStart * FPS) - from);
        const capDur = Math.round((it.dur + 0.2) * FPS);
        return (
          <React.Fragment key={it.id}>
            {card(it) && ci > 0 && (
              <Sequence from={Math.round((it.start - CARD) * FPS)} durationInFrames={Math.round(CARD * FPS)} name={`chapter ${ci + 1}`}>
                <ChapterCard n={ci + 1} title={it.chapterTitle} />
              </Sequence>
            )}
            <Sequence from={from} durationInFrames={durF} name={it.shot}>
              <ShotPlayer shots={shots} shot={it.shot} d={durF / FPS} durF={durF} />
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
