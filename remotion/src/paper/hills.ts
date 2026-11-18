import { noise2D } from "@remotion/noise";

// A closed ridge-line path: a seeded noise skyline filled down to the bottom edge.
// Deterministic (seeded), so every render and every frame gets the same silhouette.
export const ridgePath = ({
  width,
  height,
  baseY,
  amplitude,
  frequency,
  seed,
}: {
  width: number;
  height: number;
  baseY: number;
  amplitude: number;
  frequency: number;
  seed: string;
}): string => {
  const step = 24;
  let d = `M 0 ${height} L 0 ${baseY}`;
  for (let x = 0; x <= width; x += step) {
    const n = noise2D(seed, x * frequency, 0) * 0.75 + noise2D(seed + "b", x * frequency * 3, 0) * 0.25;
    d += ` L ${x} ${(baseY + n * amplitude).toFixed(1)}`;
  }
  d += ` L ${width} ${height} Z`;
  return d;
};
