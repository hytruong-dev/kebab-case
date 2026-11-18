// One plate per chapter. Shots are laid on the narration timeline (projects/eilean-mor/audio/timeline.json,
// passed as props by scripts/build-eilean.mjs). Between shots a short paper "flip" (scale-squash + shadow) hides the cut.
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { FPS } from "./kit";
import { SHOTS } from "./shots";

export type ShotSpan = { shot: string; start: number; dur: number };
export type EileanChapterProps = { shots: ShotSpan[]; total: number };

const Swap: React.FC<{ children: React.ReactNode; durF: number }> = ({ children, durF }) => {
  const f = useCurrentFrame();
  // enter: a sheet slapped down (overshoots 3% then settles), exit: lifted away in the last 4 frames
  const enter = interpolate(f, [0, 3, 5], [1.06, 0.985, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(f, [durF - 3, durF], [1, 1.03], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ scale: `${enter * exit}` }}>{children}</AbsoluteFill>;
};

const ShotPlayer: React.FC<{ shot: string; d: number }> = ({ shot, d }) => {
  const f = useCurrentFrame();
  const fn = SHOTS[shot];
  if (!fn) throw new Error(`Unknown shot "${shot}" — add it to remotion/src/eilean/shots.tsx`);
  return <>{fn(f, d)}</>;
};

export const EileanChapter: React.FC<EileanChapterProps> = ({ shots, total }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#121729" }}>
      {shots.map((s, i) => {
        const from = Math.round(s.start * FPS);
        const end = i + 1 < shots.length ? Math.round(shots[i + 1].start * FPS) : Math.round(total * FPS);
        const durF = Math.max(1, end - from);
        return (
          <Sequence key={`${s.shot}-${i}`} from={from} durationInFrames={durF} name={s.shot}>
            <Swap durF={durF}>
              <ShotPlayer shot={s.shot} d={durF / FPS} />
            </Swap>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
