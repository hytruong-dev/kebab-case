// "Build-up" assembly: a full, detailed frame is constructed from many small paper pieces that arrive one after
// another in a fixed order (learned from the reference clip "Video Project 2", 2026-11-19):
//   - the camera does NOT move; all motion is pieces arriving + pieces that keep moving in place after landing
//   - order = ground/background first (full width), then big masses, then mid details, then the small extras
//     that fill the frame edges; the finished frame is shown, then the shot cuts
//   - arrivals overlap: the next piece starts while the previous one is still settling (constant motion, no gaps)
import { Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type Entry = "drop" | "rise" | "slideL" | "slideR" | "pop" | "unfold";
export type Piece = {
  id: string;
  at: number; // seconds: when the piece starts arriving
  entry: Entry;
  x: number;
  y: number;
  z?: number;
  /** keep moving after landing: bob (float), sway (rotate), drift (x) — amplitude in px/deg */
  idle?: { bob?: number; sway?: number; drift?: number; period?: number };
  node: React.ReactNode;
};

const OFF = 1200;

export const Assemble: React.FC<{ pieces: Piece[] }> = ({ pieces }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      {[...pieces]
        .sort((a, b) => (a.z ?? 0) - (b.z ?? 0))
        .map((p) => {
          const local = f - Math.round(p.at * fps);
          if (local < 0) return null;
          // paper lands with a slight overshoot (damping ~0.7 reads "premium", TASTE-06)
          const k = spring({ frame: local, fps, config: { damping: 13, stiffness: 120, mass: 0.7 } });
          const t = local / fps;
          let dx = 0;
          let dy = 0;
          let sc = 1;
          let rot = 0;
          let sy = 1;
          switch (p.entry) {
            case "drop":
              dy = interpolate(k, [0, 1], [-OFF, 0]);
              rot = interpolate(k, [0, 1], [-8, 0]);
              break;
            case "rise":
              dy = interpolate(k, [0, 1], [OFF, 0]);
              break;
            case "slideL":
              dx = interpolate(k, [0, 1], [-OFF * 1.6, 0]);
              break;
            case "slideR":
              dx = interpolate(k, [0, 1], [OFF * 1.6, 0]);
              break;
            case "pop":
              sc = interpolate(k, [0, 1], [0, 1]);
              rot = interpolate(k, [0, 1], [-20, 0]);
              break;
            case "unfold":
              sy = interpolate(Math.min(1, local / (0.5 * fps)), [0, 1], [0, 1], { easing: Easing.out(Easing.back(1.6)) });
              break;
          }
          const per = p.idle?.period ?? 2.4;
          const ph = random(p.id) * Math.PI * 2;
          const settled = interpolate(k, [0.8, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const bob = (p.idle?.bob ?? 0) * Math.sin((t / per) * Math.PI * 2 + ph) * settled;
          const sway = (p.idle?.sway ?? 0) * Math.sin((t / per) * Math.PI * 2 + ph) * settled;
          const drift = (p.idle?.drift ?? 0) * t * settled;
          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: p.x + dx + drift,
                top: p.y + dy + bob,
                rotate: `${rot + sway}deg`,
                scale: `${sc} ${sc * sy}`,
                transformOrigin: p.entry === "unfold" ? "50% 100%" : "50% 50%",
              }}
            >
              {p.node}
            </div>
          );
        })}
    </>
  );
};
