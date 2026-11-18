// One function per shot id in projects/eilean-mor/script.json. Each receives the local plate frame f and the
// shot duration d (seconds) and returns paper-cut layers. Shots are built from kit.tsx pieces only.
import { AbsoluteFill, interpolate } from "remotion";
import { TITLE_FONT } from "../paper/font";
import {
  Backdrop,
  Beam,
  Cut,
  H,
  Island,
  Lighthouse,
  Note,
  P,
  Person,
  Sea,
  Ship,
  Stamp,
  Stars,
  Tag,
  W,
  boil,
  flash2,
  land,
  ramp,
  sec,
} from "./kit";

type ShotFn = (f: number, d: number) => React.ReactNode;
const t = (f: number) => f / 15;
// slow camera push applied to a whole shot: wrapper scale/translate (TASTE-06: camera moves ease both ways)
const Push: React.FC<{ f: number; d: number; from?: number; to?: number; ox?: string; children: React.ReactNode }> = ({ f, d, from = 1, to = 1.06, ox = "50% 50%", children }) => (
  <AbsoluteFill style={{ scale: `${interpolate(ramp(f, 0, d), [0, 1], [from, to])}`, transformOrigin: ox }}>{children}</AbsoluteFill>
);
const Txt: React.FC<{ x: number; y: number; size: number; color?: string; children: React.ReactNode; w?: number; align?: "left" | "center" }> = ({
  x,
  y,
  size,
  color = P.ink,
  children,
  w = 600,
  align = "left",
}) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: align, fontFamily: TITLE_FONT, fontWeight: 800, fontSize: size, color, lineHeight: 1.05 }}>
    {children}
  </div>
);

const nightSea = (f: number, rough = 1.4, seaTop = 780) => (
  <>
    <Backdrop color={P.night} seed={5} />
    <Stars f={f} />
    <Sea f={f} top={seaTop} rough={rough} />
  </>
);

export const SHOTS: Record<string, ShotFn> = {
  // ---------------- c1 ----------------
  "storm-sea": (f, d) => (
    <Push f={f} d={d}>
      <Backdrop color={P.nightDeep} seed={4} rain={t(f)} />
      {[0, 1, 2].map((i) => (
        <Cut key={i} x={-200 + i * 700 + ((f * (2 + i)) % 300)} y={60 + i * 50} w={700} h={160} seed={90 + i} depth={4}>
          <svg width={700} height={160}>
            <ellipse cx={350} cy={90} rx={340} ry={70} fill={P.cloud} />
          </svg>
        </Cut>
      ))}
      <Sea f={f} top={560} rough={2.2} />
      <Txt x={110} y={330} size={120} color={P.paper}>
        15/12/1900
      </Txt>
    </Push>
  ),
  "ship-passing": (f, d) => (
    <AbsoluteFill>
      {nightSea(f, 1.3)}
      <Island x={1250} y={520} s={0.6} />
      <Lighthouse x={1500} y={330} s={0.5} lit={0} />
      <Ship x={interpolate(ramp(f, 0, d, (x) => x), [0, 1], [-560, 700])} y={600 + boil(f, "sp", 6)} s={0.9} f={f} name="ARCHTOR" />
      <Tag x={120} y={110} big="Archtor" small="tàu hơi nước" seed={101} />
    </AbsoluteFill>
  ),
  "lighthouse-dark": (f, d) => (
    <Push f={f} d={d} from={1} to={1.18} ox="62% 40%">
      {nightSea(f, 1.2)}
      <Island x={700} y={560} s={1} />
      <Lighthouse x={1040} y={120} s={0.95} lit={0} />
      <Txt x={1340} y={170} size={140} color={P.paper} w={300}>
        ?
      </Txt>
    </Push>
  ),
  "three-keepers-fade": (f, d) => (
    <AbsoluteFill>
      <Backdrop color={P.night} seed={6} />
      {(["ducat", "marshall", "mcarthur"] as const).map((k, i) => {
        const fade = 1 - ramp(f, d * 0.45 + i * 0.35, d * 0.75 + i * 0.35);
        return <Person key={k} who={k} x={560 + i * 300} y={300 + boil(f, k, 3)} s={1.5} seed={110 + i} opacity={Math.max(0, fade)} />;
      })}
      <Tag x={760} y={110} big="3" small="người gác đèn" seed={113} w={400} />
    </AbsoluteFill>
  ),
  "lamp-ready": (f, d) => (
    <Push f={f} d={d} from={1.05} to={1.15}>
      <Backdrop color={P.nightDeep} seed={7} />
      <Cut x={610} y={150} w={700} h={760} seed={120} depth={12}>
        <svg width={700} height={760}>
          <rect x={120} y={40} width={460} height={620} fill="#253052" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={140 + i * 110} y={60} width={90} height={580} fill="#33406a" />
          ))}
          <ellipse cx={350} cy={380} rx={150} ry={210} fill={P.lamp} opacity={0.25 + 0.15 * Math.sin(f / 4)} />
          <rect x={300} y={440} width={100} height={170} fill="#c98b2e" />
          <rect x={280} y={600} width={140} height={40} fill={P.ink} />
        </svg>
      </Cut>
      <Tag x={1320} y={700} big="đầy dầu" seed={121} w={380} />
    </Push>
  ),
  "title-card": (f) => {
    const k = land(f, 0.2, 12);
    return (
      <AbsoluteFill>
        {nightSea(f, 1)}
        <Island x={1100} y={600} s={0.7} />
        <Lighthouse x={1380} y={380} s={0.55} lit={flash2(t(f))} />
        <Beam cx={1380 + 0.55 * 110} cy={380 + 0.55 * 100} angle={t(f) * 24} power={flash2(t(f))} />
        <Note x={140} y={interpolate(k, [0, 1], [1200, 250])} w={980} h={420} seed={130} rot={-2}>
          <div style={{ fontSize: 46, fontWeight: 700, color: P.accent }}>Bí ẩn có thật · 1900</div>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 1, marginTop: 12 }}>Ngọn hải đăng</div>
          <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 1 }}>Eilean Mòr</div>
          <div style={{ fontSize: 40, fontWeight: 700, marginTop: 16 }}>3 người gác đèn biến mất giữa đại dương</div>
        </Note>
      </AbsoluteFill>
    );
  },

  // ---------------- c2 ----------------
  map: (f, d) => {
    const draw = ramp(f, 0.6, Math.min(d - 0.6, 3.2));
    return (
      <AbsoluteFill>
        <Backdrop color="#9fc0cf" seed={8} />
        <Cut x={1180} y={140} w={520} h={820} seed={140} depth={8}>
          <svg width={520} height={820} viewBox="0 0 520 820">
            <path d="M 160 20 L 330 60 L 420 200 L 380 330 L 470 470 L 400 640 L 260 800 L 120 760 L 60 560 L 120 420 L 40 260 L 90 120 Z" fill={P.grass} />
          </svg>
        </Cut>
        <Txt x={1300} y={500} size={64} color={P.paper}>
          Lewis
        </Txt>
        <Cut x={260} y={380} w={210} h={120} seed={141} depth={8}>
          <svg width={210} height={120}>
            <path d="M 20 100 L 40 40 L 100 20 L 170 40 L 190 100 Z" fill={P.rock} />
          </svg>
        </Cut>
        <Txt x={200} y={520} size={56} w={400}>
          Eilean Mòr
        </Txt>
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          <line x1={480} y1={440} x2={1180} y2={440} stroke={P.accent} strokeWidth={10} strokeDasharray="30 20" strokeDashoffset={(1 - draw) * 700} pathLength={700} />
        </svg>
        <Tag x={680} y={260} big="32 km" seed={142} w={300} />
      </AbsoluteFill>
    );
  },
  "cliff-height": (f, d) => (
    <Push f={f} d={d} from={1} to={1.05} ox="50% 100%">
      <Backdrop color="#c9d6dd" seed={9} />
      <Sea f={f} top={860} rough={1.8} night={false} />
      <Cut x={300} y={160} w={900} h={880} seed={150} depth={10}>
        <svg width={900} height={880}>
          <path d="M 0 880 L 0 60 L 180 20 L 520 0 L 720 40 L 760 300 L 700 600 L 740 880 Z" fill={P.rock} />
          <path d="M 0 60 L 180 20 L 520 0 L 720 40 L 700 70 L 520 34 L 180 50 Z" fill={P.grass} />
        </svg>
      </Cut>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <line x1={1120} y1={170} x2={1120} y2={ramp(f, 0.4, 2) * 690 + 170} stroke={P.accent} strokeWidth={10} />
        <line x1={1090} y1={170} x2={1150} y2={170} stroke={P.accent} strokeWidth={10} />
      </svg>
      <Tag x={1220} y={420} big="45 m" small="vách đá" seed={151} w={320} />
    </Push>
  ),
  hauling: (f, d) => {
    const up = ramp(f, 0, d);
    return (
      <AbsoluteFill>
        <Backdrop color="#c9d6dd" seed={10} />
        <Sea f={f} top={900} rough={1} night={false} />
        <Cut x={500} y={120} w={900} h={940} seed={160} depth={8}>
          <svg width={900} height={940}>
            <path d="M 0 940 L 60 80 L 840 60 L 900 940 Z" fill={P.rock} />
          </svg>
        </Cut>
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          <line x1={960} y1={150} x2={960} y2={960} stroke={P.ink} strokeWidth={6} />
        </svg>
        <Cut x={890} y={interpolate(up, [0, 1], [860, 200])} w={140} h={150} seed={161} depth={12}>
          <svg width={140} height={150}>
            <rect x={10} y={10} width={120} height={130} fill={P.wood} />
            <line x1={10} y1={50} x2={130} y2={50} stroke={P.ink} strokeWidth={6} />
            <line x1={10} y1={100} x2={130} y2={100} stroke={P.ink} strokeWidth={6} />
          </svg>
        </Cut>
        <Person who={{ coat: P.wood, cap: true }} x={780} y={-30} s={0.8} seed={162} arm={20 + boil(f, "hl", 14)} />
        <Person who={{ coat: "#3d5a4a", cap: true }} x={1060} y={-30} s={0.8} seed={163} arm={-20 + boil(f, "hr", 14)} />
      </AbsoluteFill>
    );
  },
  "tower-first-light": (f) => {
    const lit = ramp(f, 1.2, 2.2);
    return (
      <AbsoluteFill>
        <Backdrop color={P.night} seed={11} />
        <Stars f={f} />
        <Island x={500} y={650} s={1} />
        <Lighthouse x={780} y={180} s={0.95} lit={lit} />
        <Beam cx={780 + 0.95 * 110} cy={180 + 0.95 * 100} angle={-10 + t(f) * 10} power={lit} />
        <Tag x={1250} y={160} big="23 m" seed={171} w={280} />
        <Tag x={1210} y={360} big="7/12/1899" small="lần đầu thắp sáng" seed={172} w={480} rot={2} />
      </AbsoluteFill>
    );
  },
  "beam-ships": (f, d) => {
    const end = ramp(f, d * 0.65, d - 0.2);
    return (
      <AbsoluteFill>
        {nightSea(f, 1)}
        <Island x={-80} y={600} s={0.7} />
        <Lighthouse x={200} y={380} s={0.55} lit={1} />
        <Beam cx={200 + 60} cy={380 + 55} angle={-8} power={1 - end} />
        <Ship x={interpolate(ramp(f, 0, d, (x) => x), [0, 1], [700, 1500])} y={640} s={0.6} seed={182} f={f} />
        <Ship x={interpolate(ramp(f, 0, d, (x) => x), [0, 1], [1300, 1900])} y={700} s={0.45} seed={183} f={f + 7} />
        <Stamp x={1180} y={180} text="1 năm" f={f} at={d * 0.55} />
      </AbsoluteFill>
    );
  },
  "keeper-ducat": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.kraft} seed={12} />
      <Person who="ducat" x={300} y={250 + boil(f, "kd", 3)} s={2.2} seed={190} />
      <Note x={820} y={200} w={860} h={300} seed={191} rot={2}>
        <div style={{ fontSize: 40, color: P.accent, fontWeight: 700 }}>Trưởng trạm</div>
        <div style={{ fontSize: 96, fontWeight: 800 }}>James Ducat</div>
      </Note>
      {[0, 1, 2, 3, 4].map((i) => (
        <Person key={i} who={{ coat: i === 0 ? "#a0566a" : "#6a7fa0" }} x={900 + i * 150} y={620 - (i === 0 ? 30 : 0)} s={i === 0 ? 0.85 : 0.6} seed={192 + i} opacity={ramp(f, 0.8 + i * 0.2, 1.1 + i * 0.2)} />
      ))}
    </AbsoluteFill>
  ),
  "keeper-marshall": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.kraft} seed={13} />
      <Person who="marshall" x={300} y={250 + boil(f, "km", 3)} s={2.2} seed={200} />
      <Note x={820} y={300} w={860} h={300} seed={201} rot={-2}>
        <div style={{ fontSize: 40, color: P.accent, fontWeight: 700 }}>Phụ tá thứ hai</div>
        <div style={{ fontSize: 96, fontWeight: 800 }}>Thomas Marshall</div>
      </Note>
    </AbsoluteFill>
  ),
  "keeper-mcarthur": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.kraft} seed={14} />
      <Person who="mcarthur" x={300} y={250 + boil(f, "kmc", 3)} s={2.2} seed={210} />
      <Note x={820} y={240} w={900} h={340} seed={211} rot={1}>
        <div style={{ fontSize: 40, color: P.accent, fontWeight: 700 }}>Thủy thủ · gác thay tạm thời</div>
        <div style={{ fontSize: 96, fontWeight: 800 }}>Donald McArthur</div>
      </Note>
      <Cut x={1300} y={680} w={260} h={200} seed={212} depth={10}>
        <svg width={260} height={200}>
          <circle cx={130} cy={100} r={80} fill="none" stroke={P.ink} strokeWidth={16} />
          <line x1={130} y1={20} x2={130} y2={190} stroke={P.ink} strokeWidth={14} />
          <line x1={60} y1={60} x2={200} y2={60} stroke={P.ink} strokeWidth={12} />
        </svg>
      </Cut>
    </AbsoluteFill>
  ),

  // ---------------- c3 ----------------
  "hesperus-schedule": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.kraft} seed={15} />
      <Note x={260} y={140} w={760} h={800} seed={220} rot={-2}>
        <div style={{ fontSize: 54, fontWeight: 800, textAlign: "center" }}>THÁNG 12 · 1900</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, marginTop: 24 }}>
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i}
              style={{
                fontSize: 36,
                fontWeight: 700,
                textAlign: "center",
                padding: 8,
                borderRadius: 40,
                border: i === 19 && f > sec(0.8) ? `6px solid ${P.accent}` : "6px solid transparent",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </Note>
      <Ship x={1080} y={480} s={1.1} seed={221} f={f} name="HESPERUS" />
    </AbsoluteFill>
  ),
  "harbour-storm": (f) => (
    <AbsoluteFill>
      <Backdrop color="#5d6b7d" seed={16} rain={t(f)} />
      <Sea f={f} top={760} rough={2.4} night={false} />
      <Cut x={-40} y={560} w={760} h={560} seed={230} depth={8}>
        <svg width={760} height={560}>
          <rect x={0} y={120} width={760} height={440} fill={P.rock} />
          <rect x={0} y={80} width={700} height={50} fill={P.wood} />
        </svg>
      </Cut>
      <Ship x={560} y={520 + boil(f, "hs", 12)} s={1} seed={231} f={f} name="HESPERUS" />
      <Tag x={1350} y={160} big="6 ngày" small="bão giữ chân" seed={232} w={380} />
    </AbsoluteFill>
  ),
  "hesperus-arrives": (f, d) => (
    <AbsoluteFill>
      <Backdrop color="#b9c6cf" seed={17} />
      <Sea f={f} top={760} rough={1.2} night={false} />
      <Island x={980} y={420} s={1} night={false} />
      <Lighthouse x={1380} y={110} s={0.75} lit={0} night={false} />
      <Ship x={interpolate(ramp(f, 0, d * 0.8), [0, 1], [-560, 260])} y={620} s={0.9} seed={241} f={f} name="HESPERUS" />
      <Tag x={120} y={110} big="26/12" small="trưa, sau Giáng Sinh" seed={242} w={460} />
    </AbsoluteFill>
  ),
  "empty-landing": (f) => (
    <AbsoluteFill>
      <Backdrop color="#b9c6cf" seed={18} />
      <Sea f={f} top={860} rough={1} night={false} />
      <Cut x={200} y={520} w={1500} h={420} seed={250} depth={8}>
        <svg width={1500} height={420}>
          <path d="M 0 420 L 0 160 L 700 120 L 1500 160 L 1500 420 Z" fill={P.rock} />
          <rect x={300} y={110} width={700} height={40} fill="#8f8a84" />
        </svg>
      </Cut>
      <Cut x={430} y={120} w={60} h={460} seed={251} depth={10}>
        <svg width={60} height={460}>
          <rect x={22} y={0} width={16} height={460} fill={P.ink} />
          <circle cx={30} cy={8} r={12} fill={P.ink} />
        </svg>
      </Cut>
      {f > sec(0.8) ? <Stamp x={330} y={160} text="Không cờ" f={f} at={0.8} rot={-6} /> : null}
      {f > sec(1.6) ? <Stamp x={760} y={420} text="Không hàng" f={f} at={1.6} rot={4} /> : null}
      {f > sec(2.4) ? <Stamp x={1180} y={240} text="Không ai" f={f} at={2.4} rot={-8} /> : null}
    </AbsoluteFill>
  ),
  flare: (f, d) => {
    const rise = ramp(f, d * 0.35, d * 0.75);
    return (
      <AbsoluteFill>
        {nightSea(f, 1)}
        <Island x={900} y={520} s={1} />
        <Lighthouse x={1290} y={210} s={0.7} lit={0} />
        <Ship x={60} y={640} s={0.9} seed={261} f={f} name="HESPERUS" />
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          {rise > 0 ? (
            <>
              <line x1={390} y1={640} x2={390 + rise * 160} y2={640 - rise * 520} stroke={P.lamp} strokeWidth={6} strokeDasharray="14 12" />
              <circle cx={390 + rise * 160} cy={640 - rise * 520} r={20 + rise * 40} fill={P.accent} opacity={0.9} />
            </>
          ) : null}
          {[0, 1, 2].map((i) =>
            f > sec(0.3 + i * 0.3) && f < sec(1.8) ? (
              <path key={i} d={`M 420 580 Q ${470 + i * 40} ${540 - i * 30} ${520 + i * 60} 580`} fill="none" stroke={P.paper} strokeWidth={6} />
            ) : null,
          )}
        </svg>
      </AbsoluteFill>
    );
  },

  // ---------------- c4 ----------------
  "moore-climb": (f, d) => {
    const k = ramp(f, 0, d, (x) => x);
    return (
      <AbsoluteFill>
        <Backdrop color="#aeb9c2" seed={19} />
        <Cut x={-40} y={300} w={2000} h={820} seed={270} depth={8}>
          <svg width={2000} height={820}>
            <path d="M 0 820 L 0 700 L 1600 120 L 2000 100 L 2000 820 Z" fill={P.grass} />
            <path d="M 0 720 L 1600 140" stroke="#8f8a84" strokeWidth={30} />
          </svg>
        </Cut>
        <Lighthouse x={1560} y={0} s={0.85} lit={0} night={false} />
        <Person who="moore" x={interpolate(k, [0, 1], [120, 1180])} y={interpolate(k, [0, 1], [700, 280])} s={0.9} seed={271} arm={boil(f, "mc", 10)} rot={-8} />
      </AbsoluteFill>
    );
  },
  "closed-door": (f) => (
    <Push f={f} d={3} from={1} to={1.04}>
      <Backdrop color="#aeb9c2" seed={20} />
      <Cut x={460} y={160} w={1000} h={820} seed={280} depth={10}>
        <svg width={1000} height={820}>
          <rect x={0} y={120} width={1000} height={700} fill={P.wall} />
          <polygon points="-20,130 500,0 1020,130" fill={P.rockDark} />
          <rect x={390} y={380} width={220} height={440} fill={P.wood} />
          <circle cx={580} cy={600} r={14} fill={P.lamp} />
        </svg>
      </Cut>
      <Cut x={240} y={720} w={1440} h={300} seed={281} depth={12}>
        <svg width={1440} height={300}>
          {Array.from({ length: 24 }, (_, i) => (
            <rect key={i} x={i * 60} y={20} width={16} height={280} fill={P.ink} />
          ))}
          <rect x={0} y={60} width={1440} height={14} fill={P.ink} />
        </svg>
      </Cut>
      <Stamp x={640} y={60} text="ĐÓNG" f={f} at={0.6} rot={-4} />
    </Push>
  ),
  "bed-clock": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.wall} seed={21} />
      <Cut x={160} y={520} w={900} h={420} seed={290} depth={10}>
        <svg width={900} height={420}>
          <rect x={0} y={180} width={900} height={200} fill={P.wood} />
          <path d="M 40 180 Q 200 100 380 170 Q 560 90 860 160 L 860 220 L 40 220 Z" fill="#c9b7d6" />
          <rect x={30} y={120} width={180} height={80} rx={30} fill="#ffffff" />
        </svg>
      </Cut>
      <Cut x={1240} y={180} w={420} h={420} seed={291} depth={10}>
        <svg width={420} height={420}>
          <circle cx={210} cy={210} r={200} fill={P.paper} stroke={P.ink} strokeWidth={14} />
          <line x1={210} y1={210} x2={210} y2={70} stroke={P.ink} strokeWidth={14} />
          <line x1={210} y1={210} x2={310} y2={250} stroke={P.ink} strokeWidth={14} />
        </svg>
      </Cut>
      <Stamp x={1280} y={640} text="Đã dừng" f={f} at={1.2} rot={6} />
    </AbsoluteFill>
  ),
  "clean-kitchen": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.wall} seed={22} />
      <Cut x={240} y={560} w={1440} h={380} seed={300} depth={10}>
        <svg width={1440} height={380}>
          <rect x={0} y={0} width={1440} height={60} fill={P.wood} />
          <rect x={60} y={60} width={40} height={320} fill={P.wood} />
          <rect x={1340} y={60} width={40} height={320} fill={P.wood} />
        </svg>
      </Cut>
      {[0, 1, 2].map((i) => (
        <Cut key={i} x={560 + i * 280} y={430 - i * 18} w={220} h={160} seed={301 + i} depth={10}>
          <svg width={220} height={160}>
            <ellipse cx={110} cy={110} rx={105} ry={42} fill="#ffffff" stroke="#b8c4cf" strokeWidth={8} />
          </svg>
        </Cut>
      ))}
      {[0, 1, 2, 3].map((i) =>
        Math.floor(f / 3 + i) % 4 === 0 ? (
          <div key={i} style={{ position: "absolute", left: 600 + i * 230, top: 370, fontSize: 70, color: P.lamp, fontFamily: TITLE_FONT }}>
            ✦
          </div>
        ) : null,
      )}
      <Tag x={760} y={140} big="sạch bóng" seed={305} w={420} />
    </AbsoluteFill>
  ),
  "lantern-room": (f, d) => (
    <Push f={f} d={d} from={1} to={1.1}>
      <Backdrop color="#cfd6dc" seed={23} />
      <Cut x={560} y={120} w={800} h={840} seed={310} depth={10}>
        <svg width={800} height={840}>
          <rect x={80} y={80} width={640} height={700} fill="#3b4a6b" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={100 + i * 124} y={100} width={100} height={660} fill="#e3eaf0" opacity={0.45} />
          ))}
          <rect x={330} y={420} width={140} height={260} fill="#c98b2e" />
          <ellipse cx={400} cy={360} rx={120} ry={150} fill="#ffffff" opacity={0.65} />
        </svg>
      </Cut>
      <Tag x={1360} y={240} big="đã lau" seed={311} w={320} rot={4} />
      <Tag x={1360} y={460} big="đầy dầu" seed={312} w={320} rot={-3} />
    </Push>
  ),
  "oilskin-peg": (f, d) => (
    <Push f={f} d={d} from={1} to={1.12} ox="50% 40%">
      <Backdrop color={P.wall} seed={24} />
      <Cut x={360} y={180} w={1200} h={70} seed={320} depth={8}>
        <svg width={1200} height={70}>
          <rect x={0} y={10} width={1200} height={50} fill={P.wood} />
        </svg>
      </Cut>
      {[0, 1, 2].map((i) => (
        <Cut key={i} x={540 + i * 330} y={230} w={60} h={70} seed={321 + i} depth={8}>
          <svg width={60} height={70}>
            <rect x={22} y={0} width={16} height={60} fill={P.ink} />
          </svg>
        </Cut>
      ))}
      <Cut x={790} y={270} w={340} h={600} seed={325} depth={14} rot={boil(f, "os", 1.2)}>
        <svg width={340} height={600}>
          <path d="M 120 0 L 220 0 L 330 120 L 300 600 L 40 600 L 10 120 Z" fill={P.oilskin} />
          <path d="M 120 0 Q 170 60 220 0" fill="#c99a1c" />
          <line x1={170} y1={60} x2={170} y2={600} stroke="#c99a1c" strokeWidth={6} />
        </svg>
      </Cut>
      <Txt x={1300} y={420} size={160} color={P.accent} w={300}>
        ?
      </Txt>
    </Push>
  ),
  "open-door-wind": (f) => (
    <AbsoluteFill>
      <Backdrop color="#5d6b7d" seed={25} rain={t(f) + 2} />
      <Cut x={240} y={140} w={600} h={860} seed={330} depth={8}>
        <svg width={600} height={860}>
          <rect x={0} y={0} width={600} height={860} fill={P.wall} />
          <rect x={150} y={200} width={300} height={660} fill={P.nightDeep} />
        </svg>
      </Cut>
      <Person who="mcarthur" x={interpolate(ramp(f, 0.2, 2.4), [0, 1], [320, 1180])} y={540} s={1.4} seed={331} arm={30 + boil(f, "od", 20)} rot={12} />
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M ${900 + ((f * 18 + i * 200) % 900)} ${200 + i * 160} q 80 -40 160 0`} stroke={P.paper} strokeWidth={6} fill="none" opacity={0.7} />
        ))}
      </svg>
      <Tag x={1300} y={160} big="áo sơ mi" seed={332} w={380} rot={3} />
    </AbsoluteFill>
  ),
  "search-party": (f, d) => {
    const k = ramp(f, 0, d, (x) => x);
    return (
      <AbsoluteFill>
        <Backdrop color="#aeb9c2" seed={26} />
        <Sea f={f} top={900} rough={1.2} night={false} />
        <Island x={220} y={330} s={1.6} night={false} />
        {[0, 1, 2, 3].map((i) => (
          <Person key={i} who={i === 0 ? "moore" : { coat: "#2c3e63", cap: true }} x={420 + i * 280 + Math.sin(k * 6 + i) * 120} y={290 + (i % 2) * 40} s={0.55} seed={340 + i} arm={boil(f, `sp${i}`, 18)} />
        ))}
        <Tag x={1380} y={120} big="0" small="dấu vết" seed={345} w={300} />
      </AbsoluteFill>
    );
  },

  // ---------------- c5 ----------------
  "east-west": (f) => (
    <AbsoluteFill>
      <Backdrop color="#b9c6cf" seed={27} />
      <Cut x={60} y={160} w={860} h={760} seed={350} depth={10}>
        <svg width={860} height={760}>
          <rect x={0} y={0} width={860} height={760} fill="#d9e4ea" />
          <rect x={0} y={520} width={860} height={240} fill="#5f8fb0" />
          <path d="M 0 520 L 0 300 L 500 260 L 860 300 L 860 520 Z" fill={P.rock} />
          <rect x={240} y={230} width={360} height={40} fill="#8f8a84" />
        </svg>
      </Cut>
      <Cut x={1000} y={160} w={860} h={760} seed={351} depth={10} rot={boil(f, "ew", 0.8)}>
        <svg width={860} height={760}>
          <rect x={0} y={0} width={860} height={760} fill="#8796a5" />
          <rect x={0} y={480} width={860} height={280} fill="#2d5578" />
          <path d="M 0 480 L 0 300 L 380 240 L 520 330 L 860 280 L 860 480 Z" fill={P.rockDark} />
          <path d="M 160 250 L 260 330 L 360 220 L 470 340" stroke={P.ink} strokeWidth={14} fill="none" />
          <ellipse cx={540} cy={560} rx={320} ry={60} fill={P.foam} opacity={0.8} />
        </svg>
      </Cut>
      <Txt x={60} y={60} size={70} w={860} align="center">
        Bến ĐÔNG ✓
      </Txt>
      <Txt x={1000} y={60} size={70} color={P.accent} w={860} align="center">
        Bến TÂY ✗
      </Txt>
    </AbsoluteFill>
  ),
  "smashed-box": (f) => (
    <AbsoluteFill>
      <Backdrop color="#8796a5" seed={28} />
      <Sea f={f} top={880} rough={1.6} night={false} />
      <Cut x={200} y={300} w={1500} h={700} seed={360} depth={8}>
        <svg width={1500} height={700}>
          <path d="M 0 700 L 0 200 L 600 140 L 1500 220 L 1500 700 Z" fill={P.rockDark} />
        </svg>
      </Cut>
      {[
        [700, 300, -24],
        [860, 260, 18],
        [1020, 330, 40],
        [800, 400, -10],
      ].map(([x, y, r], i) => (
        <Cut key={i} x={x + boil(f, `sb${i}`, 4)} y={y} w={160} h={70} seed={361 + i} depth={12} rot={r}>
          <svg width={160} height={70}>
            <rect x={0} y={10} width={160} height={50} fill={P.wood} />
          </svg>
        </Cut>
      ))}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <path d="M 600 470 C 700 520 900 420 1100 500 S 1300 560 1400 480" stroke={P.oilskin} strokeWidth={14} fill="none" />
      </svg>
      <Tag x={180} y={110} big="33 m" small="trên mặt biển" seed={365} w={380} />
    </AbsoluteFill>
  ),
  "bent-rails": (f) => {
    const bend = ramp(f, 0.4, 1.4);
    return (
      <AbsoluteFill>
        <Backdrop color="#8796a5" seed={29} />
        <Cut x={160} y={560} w={1600} h={440} seed={370} depth={8}>
          <svg width={1600} height={440}>
            <rect x={0} y={160} width={1600} height={280} fill="#9b958c" />
          </svg>
        </Cut>
        <Cut x={200} y={300} w={760} h={320} seed={371} depth={12}>
          <svg width={760} height={320}>
            {Array.from({ length: 7 }, (_, i) => (
              <line key={i} x1={40 + i * 110} y1={300} x2={40 + i * 110 + bend * i * 18} y2={60 + bend * i * 14} stroke={P.ink} strokeWidth={14} />
            ))}
            <path d={`M 40 70 Q 380 ${70 + bend * 160} 720 ${70 + bend * 120}`} stroke={P.ink} strokeWidth={16} fill="none" />
          </svg>
        </Cut>
        <Cut x={1040} y={440} w={720} h={300} seed={372} depth={12} rot={-bend * 10}>
          <svg width={720} height={300}>
            <line x1={0} y1={120} x2={720} y2={120 - bend * 90} stroke="#6b6b6b" strokeWidth={18} />
            <line x1={0} y1={200} x2={720} y2={200 - bend * 60} stroke="#6b6b6b" strokeWidth={18} />
            {[100, 260, 420, 580].map((x) => (
              <rect key={x} x={x} y={100} width={30} height={120} fill={P.wood} />
            ))}
          </svg>
        </Cut>
      </AbsoluteFill>
    );
  },
  "big-rock": (f) => {
    const k = land(f, 0.5, 10);
    return (
      <AbsoluteFill>
        <Backdrop color="#8796a5" seed={30} />
        <Cut x={0} y={720} w={1920} h={360} seed={380} depth={6}>
          <svg width={1920} height={360}>
            <rect x={0} y={0} width={1920} height={360} fill={P.rockDark} />
          </svg>
        </Cut>
        <Cut x={560} y={560} w={420} h={200} seed={381} depth={4} opacity={0.5}>
          <svg width={420} height={200}>
            <ellipse cx={210} cy={120} rx={200} ry={70} fill="none" stroke={P.paper} strokeWidth={8} strokeDasharray="20 16" />
          </svg>
        </Cut>
        <Cut x={interpolate(k, [0, 1], [560, 1080])} y={420} w={440} h={340} seed={382} depth={14} rot={interpolate(k, [0, 1], [0, 18])}>
          <svg width={440} height={340}>
            <path d="M 30 300 L 0 160 L 90 40 L 260 0 L 410 80 L 440 260 L 330 340 Z" fill={P.rock} />
          </svg>
        </Cut>
        <Tag x={1380} y={140} big="> 1 tấn" seed={383} w={340} />
      </AbsoluteFill>
    );
  },
  "turf-ripped": (f) => {
    const rip = ramp(f, 0.4, 2);
    return (
      <AbsoluteFill>
        <Backdrop color="#8796a5" seed={31} />
        <Sea f={f} top={940} rough={1.4} night={false} />
        <Cut x={240} y={320} w={1440} h={760} seed={390} depth={8}>
          <svg width={1440} height={760}>
            <path d="M 0 760 L 0 120 L 1440 100 L 1440 760 Z" fill={P.rock} />
            <rect x={0} y={60} width={1440 - rip * 600} height={70} fill={P.grass} />
          </svg>
        </Cut>
        {Array.from({ length: 6 }, (_, i) => (
          <Cut key={i} x={1100 + i * 90 + rip * 120} y={300 - rip * (120 + i * 30)} w={110} h={50} seed={391 + i} depth={12} rot={rip * (i * 40 - 90)} opacity={rip}>
            <svg width={110} height={50}>
              <rect x={0} y={0} width={110} height={50} fill={P.grass} />
            </svg>
          </Cut>
        ))}
        <Tag x={300} y={120} big="60 m" small="độ cao" seed={398} w={300} />
        <Tag x={700} y={110} big="10 m" small="cỏ bị lột" seed={399} w={300} rot={3} />
      </AbsoluteFill>
    );
  },
  question: (f, d) => (
    <Push f={f} d={d} from={1} to={1.08}>
      <Backdrop color={P.nightDeep} seed={32} />
      <Txt x={0} y={260} size={420} color={P.accent} w={W} align="center">
        ?
      </Txt>
    </Push>
  ),

  // ---------------- c6 ----------------
  newspapers: (f) => (
    <AbsoluteFill>
      <Backdrop color={P.kraft} seed={33} />
      {["MẤT TÍCH!", "BÍ ẨN ĐẢO FLANNAN", "3 NGƯỜI GÁC ĐÈN"].map((h, i) => {
        const k = land(f, 0.2 + i * 0.45, 12);
        return (
          <Note key={h} x={180 + i * 520} y={interpolate(k, [0, 1], [1200, 200 + (i % 2) * 120])} w={560} h={620} seed={400 + i} rot={[-6, 3, -2][i]} bg="#f4efe2">
            <div style={{ fontSize: 26, fontWeight: 700, borderBottom: `4px solid ${P.ink}` }}>THE DAILY · 1901</div>
            <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1, marginTop: 16 }}>{h}</div>
            {Array.from({ length: 7 }, (_, j) => (
              <div key={j} style={{ height: 14, background: "#cfc6b4", marginTop: 16, width: `${90 - (j % 3) * 15}%` }} />
            ))}
          </Note>
        );
      })}
    </AbsoluteFill>
  ),
  "sea-serpent": (f) => (
    <AbsoluteFill>
      {nightSea(f, 1.6, 700)}
      <Cut x={300 + boil(f, "ss", 10)} y={340} w={1300} h={460} seed={410} depth={10}>
        <svg width={1300} height={460}>
          <path d="M 0 420 C 160 120 300 120 380 360 C 460 120 620 120 700 360 C 780 160 900 80 1040 160 L 1180 120 L 1120 220 C 1000 200 920 260 880 400" stroke="#3f6b55" strokeWidth={70} fill="none" strokeLinecap="round" />
          <circle cx={1090} cy={150} r={12} fill={P.lamp} />
        </svg>
      </Cut>
      <Stamp x={1340} y={110} text="Truyền thuyết" f={f} at={0.6} rot={8} />
    </AbsoluteFill>
  ),
  "mystery-ship": (f, d) => (
    <AbsoluteFill>
      {nightSea(f, 1)}
      <Island x={-120} y={560} s={0.8} />
      <Ship x={interpolate(ramp(f, 0, d), [0, 1], [900, 1400])} y={560} s={0.9} seed={421} f={f} />
      {[0, 1, 2].map((i) => (
        <Person key={i} who={{ coat: "#2a2a2a", hat: true }} x={480 + i * 120} y={560} s={0.6} seed={422 + i} opacity={0.85} />
      ))}
      <Stamp x={1340} y={110} text="Truyền thuyết" f={f} at={0.6} rot={8} />
    </AbsoluteFill>
  ),
  "ghost-boat": (f) => (
    <AbsoluteFill>
      {nightSea(f, 0.8)}
      <Cut x={520} y={300 + Math.sin(f / 5) * 14} w={880} h={420} seed={430} depth={6} opacity={0.55}>
        <svg width={880} height={420}>
          <path d="M 40 300 L 840 300 L 760 410 L 120 410 Z" fill="#dfe8ee" />
          <rect x={420} y={20} width={14} height={280} fill="#dfe8ee" />
          <path d="M 434 30 L 700 260 L 434 260 Z" fill="#dfe8ee" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} cx={160 + i * 90} cy={270} r={26} fill="#dfe8ee" />
          ))}
        </svg>
      </Cut>
      <Tag x={120} y={110} big="7 Thợ Săn" small="bóng ma vùng biển" seed={431} w={480} />
    </AbsoluteFill>
  ),
  "poem-chair": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.wall} seed={34} />
      <Note x={120} y={140} w={620} h={760} seed={440} rot={-3} bg="#f4efe2">
        <div style={{ fontSize: 44, fontWeight: 800 }}>Flannan Isle</div>
        <div style={{ fontSize: 30, fontWeight: 700, color: P.accent }}>bài thơ · 1912</div>
        {Array.from({ length: 10 }, (_, j) => (
          <div key={j} style={{ height: 12, background: "#cfc6b4", marginTop: 22, width: `${85 - (j % 4) * 12}%` }} />
        ))}
      </Note>
      <Cut x={900} y={620} w={860} h={60} seed={441} depth={8}>
        <svg width={860} height={60}>
          <rect x={0} y={0} width={860} height={60} fill={P.wood} />
        </svg>
      </Cut>
      <Cut x={1080} y={520} w={220} h={120} seed={442} depth={10}>
        <svg width={220} height={120}>
          <ellipse cx={110} cy={80} rx={105} ry={36} fill="#ffffff" />
          <circle cx={90} cy={60} r={30} fill="#c0743a" />
          <rect x={120} y={46} width={70} height={30} fill={P.oilskin} />
        </svg>
      </Cut>
      <Cut x={1460} y={700} w={260} h={300} seed={443} depth={12} rot={interpolate(ramp(f, 0.6, 1.4), [0, 1], [0, -78])}>
        <svg width={260} height={300}>
          <rect x={30} y={0} width={30} height={300} fill={P.wood} />
          <rect x={30} y={140} width={200} height={30} fill={P.wood} />
          <rect x={200} y={140} width={30} height={160} fill={P.wood} />
        </svg>
      </Cut>
    </AbsoluteFill>
  ),
  "moore-debunk": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.wall} seed={35} />
      <Person who="moore" x={160} y={260} s={2} seed={450} />
      <Cut x={900} y={560} w={860} h={60} seed={451} depth={8}>
        <svg width={860} height={60}>
          <rect x={0} y={0} width={860} height={60} fill={P.wood} />
        </svg>
      </Cut>
      <Cut x={1000} y={460} w={600} h={120} seed={452} depth={10}>
        <svg width={600} height={120}>
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={100 + i * 200} cy={80} rx={90} ry={32} fill="#ffffff" stroke="#b8c4cf" strokeWidth={6} />
          ))}
        </svg>
      </Cut>
      <Stamp x={1000} y={170} text="Chỉ có trong thơ" f={f} at={2} rot={-5} />
    </AbsoluteFill>
  ),
  "fake-logbook": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.kraft} seed={36} />
      <Note x={420} y={130} w={1080} h={800} seed={460} rot={-1} bg="#f4efe2">
        <div style={{ fontSize: 44, fontWeight: 800 }}>Nhật ký · 12-15/12</div>
        {["… gió dữ chưa từng thấy …", "… McArthur khóc …", "… cả ba cầu nguyện …", "… Bão tan, biển lặng …"].map((l, i) => (
          <div key={i} style={{ fontSize: 46, fontWeight: 700, marginTop: 36, fontStyle: "italic", color: "#5b4a3a" }}>
            {l}
          </div>
        ))}
      </Note>
      <Stamp x={700} y={420} text="BỊA ĐẶT" f={f} at={2.4} rot={-14} />
    </AbsoluteFill>
  ),

  // ---------------- c7 ----------------
  muirhead: (f) => (
    <AbsoluteFill>
      <Backdrop color={P.kraft} seed={37} />
      <Person who="muirhead" x={260} y={230 + boil(f, "mh", 3)} s={2.2} seed={470} />
      <Note x={820} y={200} w={900} h={340} seed={471} rot={2}>
        <div style={{ fontSize: 40, color: P.accent, fontWeight: 700 }}>Giám sát viên · NLB</div>
        <div style={{ fontSize: 96, fontWeight: 800 }}>Robert Muirhead</div>
      </Note>
      <Tag x={1100} y={640} big="29/12/1900" small="ra đảo điều tra" seed={472} w={460} />
    </AbsoluteFill>
  ),
  "two-go-down": (f, d) => {
    const k = ramp(f, 0, d, (x) => x);
    return (
      <AbsoluteFill>
        <Backdrop color="#8796a5" seed={38} rain={t(f)} />
        <Sea f={f} top={900} rough={2} night={false} />
        <Cut x={-40} y={140} w={2000} h={940} seed={480} depth={8}>
          <svg width={2000} height={940}>
            <path d="M 0 0 L 600 0 L 1700 760 L 2000 760 L 2000 940 L 0 940 Z" fill={P.rock} />
            <path d="M 300 60 L 1600 760" stroke="#8f8a84" strokeWidth={26} />
          </svg>
        </Cut>
        <Cut x={1540} y={790} w={160} h={80} seed={481} depth={12}>
          <svg width={160} height={80}>
            <rect x={0} y={10} width={160} height={60} fill={P.wood} />
          </svg>
        </Cut>
        <Person who="ducat" x={interpolate(k, [0, 1], [380, 1280])} y={interpolate(k, [0, 1], [-60, 420])} s={0.8} seed={482} rot={10} arm={boil(f, "gd", 12)} />
        <Person who="marshall" x={interpolate(k, [0, 1], [260, 1140])} y={interpolate(k, [0, 1], [-120, 360])} s={0.8} seed={483} rot={10} arm={boil(f, "gm", 12)} />
        <Tag x={120} y={700} big="15/12" small="thứ Bảy, buổi chiều" seed={484} w={420} />
      </AbsoluteFill>
    );
  },
  fine: (f) => (
    <AbsoluteFill>
      <Backdrop color={P.kraft} seed={39} />
      <Person who="marshall" x={240} y={280} s={2} seed={490} arm={-14} />
      <Note x={820} y={180} w={860} h={520} seed={491} rot={-2} bg="#f4efe2">
        <div style={{ fontSize: 44, fontWeight: 800 }}>PHIẾU PHẠT</div>
        <div style={{ fontSize: 34, fontWeight: 700, marginTop: 20 }}>Thomas Marshall</div>
        <div style={{ fontSize: 34, fontWeight: 700 }}>Lý do: để bão cuốn mất đồ nghề</div>
        <div style={{ fontSize: 120, fontWeight: 800, color: P.accent, marginTop: 30 }}>5 shilling</div>
      </Note>
      <Stamp x={1180} y={620} text="ĐÃ PHẠT" f={f} at={1.4} rot={-10} />
    </AbsoluteFill>
  ),
  "geo-cave": (f, d) => {
    const jet = ramp(f, d * 0.45, d * 0.75, (x) => 1 - Math.pow(1 - x, 3));
    return (
      <AbsoluteFill>
        <Backdrop color="#8796a5" seed={40} />
        <Cut x={0} y={160} w={760} h={920} seed={500} depth={10}>
          <svg width={760} height={920}>
            <path d="M 0 0 L 640 0 L 700 920 L 0 920 Z" fill={P.rockDark} />
          </svg>
        </Cut>
        <Cut x={1160} y={160} w={760} h={920} seed={501} depth={10}>
          <svg width={760} height={920}>
            <path d="M 120 0 L 760 0 L 760 920 L 60 920 Z" fill={P.rockDark} />
          </svg>
        </Cut>
        <Cut x={700} y={interpolate(jet, [0, 1], [900, 120])} w={520} h={960} seed={502} depth={14}>
          <svg width={520} height={960}>
            <path d="M 60 960 C 40 500 120 160 260 40 C 400 160 480 500 460 960 Z" fill={P.foam} />
            <path d="M 160 960 C 150 600 200 300 260 160 C 320 300 370 600 360 960 Z" fill="#9fc0cf" />
          </svg>
        </Cut>
        <Sea f={f} top={940} rough={2.4} night={false} />
        <Tag x={760} y={60} big="khe đá" small="geo · hang ngầm" seed={503} w={400} />
      </AbsoluteFill>
    );
  },
  "giant-wave": (f, d) => {
    const k = ramp(f, 0, d * 0.8, (x) => x * x);
    return (
      <AbsoluteFill>
        <Backdrop color="#5d6b7d" seed={41} rain={t(f)} />
        <Cut x={-40} y={520} w={1100} h={560} seed={510} depth={8}>
          <svg width={1100} height={560}>
            <path d="M 0 560 L 0 160 L 1100 240 L 1100 560 Z" fill={P.rockDark} />
          </svg>
        </Cut>
        <Person who="ducat" x={480} y={360} s={0.8} seed={511} arm={40} opacity={1 - ramp(f, d * 0.7, d)} />
        <Person who="marshall" x={640} y={360} s={0.8} seed={512} arm={-40} opacity={1 - ramp(f, d * 0.7, d)} />
        <Cut x={interpolate(k, [0, 1], [1500, 220])} y={interpolate(k, [0, 1], [40, 100])} w={1500} h={1000} seed={513} depth={16}>
          <svg width={1500} height={1000}>
            <path d="M 1500 1000 L 1500 300 C 1200 0 700 0 420 200 C 260 320 300 470 470 460 C 380 400 420 290 560 280 C 760 260 900 600 900 1000 Z" fill={P.sea} />
            <path d="M 420 200 C 260 320 300 470 470 460 C 380 400 420 290 560 280" stroke={P.foam} strokeWidth={30} fill="none" />
          </svg>
        </Cut>
      </AbsoluteFill>
    );
  },
  "mcarthur-runs": (f, d) => {
    const k = ramp(f, 0, d, (x) => x);
    return (
      <AbsoluteFill>
        <Backdrop color="#5d6b7d" seed={42} rain={t(f) + 1} />
        <Cut x={-40} y={200} w={2000} h={880} seed={520} depth={8}>
          <svg width={2000} height={880}>
            <path d="M 0 0 L 500 0 L 1500 700 L 2000 700 L 2000 880 L 0 880 Z" fill={P.grass} />
          </svg>
        </Cut>
        <Lighthouse x={40} y={-80} s={0.7} lit={0} night={false} />
        <Person who="mcarthur" x={interpolate(k, [0, 1], [320, 1300])} y={interpolate(k, [0, 1], [80, 560])} s={0.9} seed={521} rot={14} arm={35 + boil(f, "mr", 25)} />
        <Cut x={1560} y={560} w={420} h={420} seed={522} depth={14}>
          <svg width={420} height={420}>
            <path d="M 0 420 C 60 120 260 40 420 120 L 420 420 Z" fill={P.sea} />
            <path d="M 60 220 C 160 120 280 100 420 140" stroke={P.foam} strokeWidth={22} fill="none" />
          </svg>
        </Cut>
      </AbsoluteFill>
    );
  },
  "empty-path": (f, d) => (
    <Push f={f} d={d} from={1} to={1.06}>
      <Backdrop color="#8796a5" seed={43} />
      <Sea f={f} top={900} rough={0.9} night={false} />
      <Cut x={-40} y={200} w={2000} h={880} seed={530} depth={8}>
        <svg width={2000} height={880}>
          <path d="M 0 0 L 500 0 L 1500 700 L 2000 700 L 2000 880 L 0 880 Z" fill={P.grass} />
          <path d="M 300 20 L 1500 700" stroke="#8f8a84" strokeWidth={26} />
        </svg>
      </Cut>
      <Lighthouse x={40} y={-80} s={0.7} lit={0} night={false} />
    </Push>
  ),
  families: (f) => (
    <AbsoluteFill>
      <Backdrop color={P.kraft} seed={44} />
      <Note x={160} y={180} w={760} h={680} seed={540} rot={-2}>
        <div style={{ fontSize: 60, fontWeight: 800 }}>Gia đình Ducat</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: P.accent }}>vợ và 4 con</div>
      </Note>
      <Note x={1000} y={220} w={760} h={640} seed={541} rot={2}>
        <div style={{ fontSize: 60, fontWeight: 800 }}>Gia đình McArthur</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: P.accent }}>vợ và 2 con</div>
      </Note>
      {[0, 1, 2, 3, 4].map((i) => (
        <Person key={`d${i}`} who={{ coat: i === 0 ? "#a0566a" : "#6a7fa0" }} x={220 + i * 130} y={500 + (i === 0 ? -40 : 0)} s={i === 0 ? 0.95 : 0.7} seed={542 + i} opacity={ramp(f, 0.3 + i * 0.15, 0.6 + i * 0.15)} />
      ))}
      {[0, 1, 2].map((i) => (
        <Person key={`m${i}`} who={{ coat: i === 0 ? "#7a5a8a" : "#8a9a6a" }} x={1180 + i * 150} y={520 + (i === 0 ? -40 : 0)} s={i === 0 ? 0.95 : 0.7} seed={548 + i} opacity={ramp(f, 1 + i * 0.15, 1.3 + i * 0.15)} />
      ))}
    </AbsoluteFill>
  ),
  automated: (f) => (
    <AbsoluteFill>
      <Backdrop color="#b9c6cf" seed={45} />
      <Sea f={f} top={820} rough={1} night={false} />
      <Island x={420} y={520} s={1.1} night={false} />
      <Lighthouse x={820} y={140} s={0.85} lit={0.8} night={false} />
      <Cut x={1280} y={560} w={300} h={120} seed={551} depth={10}>
        <svg width={300} height={120}>
          <ellipse cx={150} cy={70} rx={140} ry={44} fill="#9b958c" />
          <text x={150} y={86} textAnchor="middle" fontFamily={TITLE_FONT} fontWeight={800} fontSize={54} fill={P.paper}>
            H
          </text>
        </svg>
      </Cut>
      <Tag x={120} y={110} big="1971" small="tự động hóa" seed={552} w={380} />
    </AbsoluteFill>
  ),
  "flash-today": (f, d) => {
    const fl = flash2(t(f));
    return (
      <Push f={f} d={d} from={1.05} to={1}>
        {nightSea(f, 0.8)}
        <Island x={500} y={600} s={1} />
        <Lighthouse x={800} y={190} s={0.9} lit={fl} />
        <Beam cx={800 + 0.9 * 110} cy={190 + 0.9 * 100} angle={t(f) * 30} power={fl} />
        <Tag x={1350} y={140} big="2 chớp" small="mỗi 30 giây" seed={561} w={380} />
      </Push>
    );
  },
  "ask-viewer": (f) => (
    <AbsoluteFill>
      <Backdrop color={P.night} seed={46} />
      <Stars f={f} />
      <Note x={160} y={240} w={720} h={520} seed={570} rot={-3} bg="#dfe8ee">
        <div style={{ fontSize: 64, fontWeight: 800 }}>Con sóng khổng lồ</div>
        <div style={{ fontSize: 34, fontWeight: 700, color: P.seaMid, marginTop: 12 }}>giả thuyết của Muirhead</div>
      </Note>
      <Note x={1040} y={240} w={720} h={520} seed={571} rot={3} bg="#f4efe2">
        <div style={{ fontSize: 64, fontWeight: 800 }}>Điều chưa được kể?</div>
        <div style={{ fontSize: 34, fontWeight: 700, color: P.accent, marginTop: 12 }}>bạn nghĩ sao?</div>
      </Note>
      <Txt x={0} y={420} size={110} color={P.lamp} w={W} align="center">
        hay
      </Txt>
    </AbsoluteFill>
  ),
};
