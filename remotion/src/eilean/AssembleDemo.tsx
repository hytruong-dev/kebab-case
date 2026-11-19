// The Eilean Mòr establishing frame rebuilt with the "build-up" technique: ~24 small paper pieces, fixed camera,
// arriving region by region (ground → big masses → mid details → small extras), each keeping a small idle motion.
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Assemble, type Piece } from "../paper/Assemble";
import { Backdrop, Beam, Cut, Island, Lighthouse, P, Person, Ship, Stars, flash2 } from "./kit";

export const ASSEMBLE_FPS = 15;
export const ASSEMBLE_DURATION_S = 9;

const wave = (w: number, h: number, c: string, amp: number) => (
  <svg width={w} height={h}>
    <path d={`M 0 ${h} L 0 ${amp} ${Array.from({ length: 13 }, (_, i) => `Q ${i * (w / 12) + w / 24} ${i % 2 ? 0 : amp * 2} ${(i + 1) * (w / 12)} ${amp}`).join(" ")} L ${w} ${h} Z`} fill={c} />
  </svg>
);
const cloud = (w: number) => (
  <svg width={w} height={w * 0.4}>
    <ellipse cx={w * 0.5} cy={w * 0.24} rx={w * 0.48} ry={w * 0.15} fill={P.cloud} />
    <ellipse cx={w * 0.35} cy={w * 0.16} rx={w * 0.22} ry={w * 0.13} fill={P.cloud} />
  </svg>
);
const rock = (w: number, c: string) => (
  <svg width={w} height={w * 0.6}>
    <path d={`M 0 ${w * 0.6} L ${w * 0.15} ${w * 0.2} L ${w * 0.5} 0 L ${w * 0.85} ${w * 0.25} L ${w} ${w * 0.6} Z`} fill={c} />
  </svg>
);
const gull = (
  <svg width={70} height={30}>
    <path d="M 0 20 Q 18 0 35 18 Q 52 0 70 20" stroke={P.paper} strokeWidth={6} fill="none" />
  </svg>
);
const cut = (seed: number, w: number, h: number, node: React.ReactNode, depth = 8) => (
  <Cut x={0} y={0} w={w} h={h} seed={seed} depth={depth}>
    {node}
  </Cut>
);

// order and timing: ground 0-1.2s, big masses 1.2-3.6s, mid details 3.6-6s, small extras 6-8.2s, hold, cut at 9s
const PIECES: Piece[] = [
  // 1. ground / background (full width, first)
  { id: "sea-back", at: 0.0, entry: "rise", x: -40, y: 640, z: 1, idle: { bob: 4, period: 3 }, node: cut(301, 2000, 460, wave(2000, 460, P.seaDeep, 18), 4) },
  { id: "sea-mid", at: 0.3, entry: "rise", x: -60, y: 760, z: 5, idle: { bob: 6, period: 2.6 }, node: cut(302, 2040, 360, wave(2040, 360, P.seaMid, 22), 8) },
  { id: "sea-front", at: 0.6, entry: "rise", x: -80, y: 880, z: 9, idle: { bob: 8, period: 2.2 }, node: cut(303, 2080, 260, wave(2080, 260, P.sea, 26), 12) },
  // 2. big masses
  { id: "island", at: 1.2, entry: "rise", x: 420, y: 440, z: 3, node: <Island x={0} y={0} s={1.05} /> },
  { id: "lighthouse", at: 1.8, entry: "unfold", x: 820, y: 60, z: 4, node: <Lighthouse x={0} y={0} s={0.9} lit={0} /> },
  { id: "cloud-1", at: 2.3, entry: "slideL", x: 80, y: 70, z: 2, idle: { drift: 6 }, node: cut(311, 520, 210, cloud(520), 4) },
  { id: "cloud-2", at: 2.6, entry: "slideR", x: 1280, y: 120, z: 2, idle: { drift: -5 }, node: cut(312, 600, 240, cloud(600), 4) },
  { id: "ship", at: 3.0, entry: "slideL", x: 60, y: 610, z: 6, idle: { bob: 6, sway: 1.5, period: 2.4 }, node: <Ship x={0} y={0} s={0.7} seed={313} name="HESPERUS" /> },
  // 3. mid details
  { id: "rock-l", at: 3.7, entry: "pop", x: 330, y: 760, z: 7, node: cut(321, 220, 132, rock(220, P.rockDark)) },
  { id: "rock-r", at: 3.9, entry: "pop", x: 1360, y: 770, z: 7, node: cut(322, 260, 156, rock(260, P.rock)) },
  { id: "keeper-1", at: 4.2, entry: "drop", x: 640, y: 300, z: 8, idle: { sway: 2 }, node: <Person who="ducat" x={0} y={0} s={0.42} seed={323} /> },
  { id: "keeper-2", at: 4.4, entry: "drop", x: 720, y: 300, z: 8, idle: { sway: 2 }, node: <Person who="marshall" x={0} y={0} s={0.42} seed={324} /> },
  { id: "keeper-3", at: 4.6, entry: "drop", x: 1120, y: 330, z: 8, idle: { sway: 2 }, node: <Person who="mcarthur" x={0} y={0} s={0.42} seed={325} /> },
  { id: "crate", at: 5.0, entry: "pop", x: 1240, y: 520, z: 8, node: cut(326, 90, 70, <svg width={90} height={70}><rect width={90} height={70} fill={P.wood} /></svg>, 10) },
  { id: "flag", at: 5.3, entry: "unfold", x: 560, y: 330, z: 8, idle: { sway: 6, period: 1.2 }, node: cut(327, 80, 140, <svg width={80} height={140}><rect x={4} width={8} height={140} fill={P.ink} /><path d="M 12 6 L 78 22 L 12 40 Z" fill={P.accent} /></svg>, 8) },
  // 4. small extras filling the edges (last)
  { id: "gull-1", at: 6.0, entry: "slideR", x: 1500, y: 300, z: 10, idle: { bob: 14, drift: -12, period: 1.4 }, node: gull },
  { id: "gull-2", at: 6.3, entry: "slideL", x: 300, y: 260, z: 10, idle: { bob: 12, drift: 10, period: 1.6 }, node: gull },
  { id: "foam-1", at: 6.6, entry: "pop", x: 560, y: 880, z: 11, idle: { bob: 5 }, node: cut(331, 160, 50, <svg width={160} height={50}><ellipse cx={80} cy={25} rx={78} ry={20} fill={P.foam} /></svg>, 6) },
  { id: "foam-2", at: 6.8, entry: "pop", x: 1180, y: 900, z: 11, idle: { bob: 5 }, node: cut(332, 200, 56, <svg width={200} height={56}><ellipse cx={100} cy={28} rx={98} ry={22} fill={P.foam} /></svg>, 6) },
  { id: "buoy", at: 7.1, entry: "pop", x: 1640, y: 820, z: 11, idle: { bob: 10, sway: 8, period: 1.8 }, node: cut(333, 70, 110, <svg width={70} height={110}><rect x={20} y={0} width={30} height={70} fill={P.accent} /><rect x={20} y={28} width={30} height={14} fill={P.paper} /><ellipse cx={35} cy={80} rx={34} ry={20} fill={P.accent} /></svg>, 8) },
  { id: "moon", at: 7.4, entry: "pop", x: 1660, y: 40, z: 1, node: cut(334, 150, 150, <svg width={150} height={150}><circle cx={75} cy={75} r={70} fill={P.beam} /><circle cx={100} cy={60} r={60} fill={P.night} /></svg>, 4) },
  { id: "rock-s", at: 7.7, entry: "pop", x: 120, y: 860, z: 11, node: cut(335, 140, 84, rock(140, P.rockDark)) },
];

export const AssembleDemo: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / ASSEMBLE_FPS;
  // the lamp is the last thing to "arrive": it switches on once the frame is complete (payoff)
  const lit = t > 8.0 ? flash2(t - 8.0, 2.2) : 0;
  return (
    <AbsoluteFill>
      <Backdrop color={P.night} seed={50} />
      <Stars f={f} n={30} />
      <Assemble pieces={PIECES} />
      <Beam cx={820 + 0.9 * 110} cy={60 + 0.9 * 100} angle={-20 + (t - 8) * 40} power={lit} />
    </AbsoluteFill>
  );
};
