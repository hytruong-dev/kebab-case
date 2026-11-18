import { dropShadow } from "@remotion/effects/drop-shadow";
import { paper } from "@remotion/effects/paper";
import { roughenEdges } from "@remotion/effects/roughen-edges";
import { HtmlInCanvas } from "remotion";

type Props = {
  readonly width: number;
  readonly height: number;
  readonly seed: number;
  /** Shadow depth in px: back layers ~4, front layers ~14. */
  readonly depth?: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
};

// A sheet of cut paper. Any DOM inside is drawn into a canvas (HTML-in-canvas),
// then three effects make it read as paper:
//   paper()        fibre, folds and crumples. It MULTIPLIES the source colour,
//                  so the paper tone stays near-white to keep the palette true.
//   roughenEdges() a torn / scissor-cut alpha edge.
//   dropShadow()   the layer floats above the one behind it.
export const PaperLayer: React.FC<Props> = ({ width, height, seed, depth = 8, style, children }) => {
  // Both effects validate seed to [0, 1000]; fold any caller seed into range.
  const s = Math.abs(seed) % 1000;
  return (
    <HtmlInCanvas
      width={width}
      height={height}
      style={style}
      effects={[
        paper({ colorFront: "#ffffff", colorBack: "#eadfc8", amount: 0.9, seed: s, folds: 0.35, crumples: 0.25 }),
        roughenEdges({ border: 6, seed: (s * 7) % 1000, scale: 0.12 }),
        dropShadow({ offsetX: depth * 0.4, offsetY: depth, radius: depth * 1.2, opacity: 0.38, color: "#2a211b" }),
      ]}
    >
      {children}
    </HtmlInCanvas>
  );
};
