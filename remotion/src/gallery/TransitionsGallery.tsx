import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import type { TransitionPresentation } from "@remotion/transitions";
import { blurSlide } from "@remotion/transitions/blur-slide";
import { bookFlip } from "@remotion/transitions/book-flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { crossZoom } from "@remotion/transitions/cross-zoom";
import { crosswarp } from "@remotion/transitions/crosswarp";
import { cube } from "@remotion/transitions/cube";
import { dissolve } from "@remotion/transitions/dissolve";
import { dreamyZoom } from "@remotion/transitions/dreamy-zoom";
import { fade } from "@remotion/transitions/fade";
import { filmBurn } from "@remotion/transitions/film-burn";
import { flip } from "@remotion/transitions/flip";
import { iris } from "@remotion/transitions/iris";
import { linearBlur } from "@remotion/transitions/linear-blur";
import { none } from "@remotion/transitions/none";
import { pushCut } from "@remotion/transitions/push-cut";
import { ripple } from "@remotion/transitions/ripple";
import { slide } from "@remotion/transitions/slide";
import { swap } from "@remotion/transitions/swap";
import { wipe } from "@remotion/transitions/wipe";
import { zoomBlur } from "@remotion/transitions/zoom-blur";
import { zoomInOut } from "@remotion/transitions/zoom-in-out";
import { AbsoluteFill } from "remotion";
import { TITLE_FONT } from "../paper/font";
import { DAY as P } from "../paper/palette";

const W = 1920;
const H = 1080;
const SCENE = 45;
const T = 24;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPresentation = TransitionPresentation<any>;

export const TRANSITIONS: { name: string; make: () => AnyPresentation; spring?: boolean }[] = [
  { name: "bookFlip", make: () => bookFlip({ direction: "from-right" }) },
  { name: "slide", make: () => slide({ direction: "from-right" }) },
  { name: "wipe", make: () => wipe({ direction: "from-left" }) },
  { name: "flip", make: () => flip({ direction: "from-right" }), spring: true },
  { name: "cube", make: () => cube({ direction: "from-right" }) },
  { name: "clockWipe", make: () => clockWipe({ width: W, height: H }) },
  { name: "iris", make: () => iris({ width: W, height: H }) },
  { name: "fade", make: () => fade() },
  { name: "pushCut", make: () => pushCut() },
  { name: "blurSlide", make: () => blurSlide({ direction: "from-left" }) },
  { name: "dissolve", make: () => dissolve({}) },
  { name: "filmBurn", make: () => filmBurn({ seed: 3 }) },
  { name: "crosswarp", make: () => crosswarp({}) },
  { name: "crossZoom", make: () => crossZoom({}) },
  { name: "dreamyZoom", make: () => dreamyZoom({}) },
  { name: "linearBlur", make: () => linearBlur({}) },
  { name: "ripple", make: () => ripple({}) },
  { name: "swap", make: () => swap({}) },
  { name: "zoomBlur", make: () => zoomBlur({}) },
  { name: "zoomInOut", make: () => zoomInOut({}) },
  { name: "none", make: () => none() },
];

export const transitionsGalleryDuration = () => (TRANSITIONS.length + 1) * SCENE - TRANSITIONS.length * T;

const SCENE_COLORS = [P.hillBack, P.accent, P.hillFront, P.sun, P.hillMid, P.skyDeep];

const Card: React.FC<{ index: number; label: string }> = ({ index, label }) => {
  const bg = SCENE_COLORS[index % SCENE_COLORS.length];
  return (
    <AbsoluteFill style={{ backgroundColor: bg, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          backgroundColor: P.paper,
          padding: "40px 80px",
          borderRadius: 18,
          rotate: `${index % 2 ? 2 : -2}deg`,
          boxShadow: "8px 14px 0 rgba(42,33,27,0.35)",
          fontFamily: TITLE_FONT,
          textAlign: "center",
          color: P.ink,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, color: P.accent }}>{index === 0 ? "start" : `#${index}`}</div>
        <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1.05 }}>{label}</div>
      </div>
    </AbsoluteFill>
  );
};

export const TransitionsGallery: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="start" durationInFrames={SCENE}>
        <Card index={0} label="@remotion/transitions" />
      </TransitionSeries.Sequence>
      {TRANSITIONS.flatMap((t, i) => [
        <TransitionSeries.Transition
          key={`t-${t.name}`}
          presentation={t.make()}
          timing={
            t.spring
              ? springTiming({ config: { damping: 200 }, durationInFrames: T })
              : linearTiming({ durationInFrames: T })
          }
        />,
        <TransitionSeries.Sequence key={`s-${t.name}`} name={t.name} durationInFrames={SCENE}>
          <Card index={i + 1} label={t.name} />
        </TransitionSeries.Sequence>,
      ])}
    </TransitionSeries>
  );
};
