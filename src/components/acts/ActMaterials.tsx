"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

// ACT 4: MATERIALS
// Six floating monoliths. Each reacts differently to light.

const MONOLITHS = [
  { id: "quartz", name: "Quartz", subtitle: "Engineered Stone", color: "#d4cfc8", gradient: "linear-gradient(145deg, #e8e4de 0%, #c8c2b8 40%, #b8b2a8 100%)", lightReaction: "reflect", description: "93% natural quartz. Resin-bound. Consistent veining. Zero maintenance.", property: "Mohs 7" },
  { id: "granite", name: "Granite", subtitle: "Natural Stone", color: "#4a4540", gradient: "linear-gradient(145deg, #5a5550 0%, #3a3530 40%, #2a2520 100%)", lightReaction: "absorb", description: "Formed over millions of years. Unique grain. Each slab one-of-a-kind.", property: "Mohs 6" },
  { id: "laminate", name: "Laminate", subtitle: "High Pressure", color: "#8a7a6a", gradient: "linear-gradient(145deg, #9a8a7a 0%, #7a6a5a 40%, #6a5a4a 100%)", lightReaction: "diffuse", description: "HPL technology. 300+ designs. Stain-resistant. Budget-perfected.", property: "Nexis" },
  { id: "acrylic", name: "Acrylic", subtitle: "High Gloss", color: "#2a2a2a", gradient: "linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 40%, #0a0a0a 100%)", lightReaction: "mirror", description: "Mirror-finish surfaces. No joints. Seamless. Deep colour saturation.", property: "PMMA" },
  { id: "pu", name: "PU", subtitle: "Polyurethane", color: "#f5f0eb", gradient: "linear-gradient(145deg, #faf8f5 0%, #e8e2dc 40%, #d8d0c8 100%)", lightReaction: "soften", description: "Soft-touch finish. Anti-fingerprint. Warm to touch. Luxury defined.", property: "2K Paint" },
  { id: "glass", name: "Glass", subtitle: "Tempered", color: "rgba(160,190,200,0.2)", gradient: "linear-gradient(145deg, rgba(200,220,230,0.15) 0%, rgba(160,190,200,0.08) 50%, rgba(140,170,180,0.12) 100%)", lightReaction: "refract", description: "Back-painted tempered glass. Light-bending surfaces. Weightless elegance.", property: "6mm" },
];

function MaterialMonolith({
  mat,
  index,
  progress,
}: {
  mat: (typeof MONOLITHS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const delay = index * 0.04;
  const entryStart = 0.08 + delay;
  const entryEnd = 0.25 + delay;
  const opacity = useTransform(progress, [entryStart, entryEnd, 0.85, 0.95], [0, 1, 1, 0.3]);
  const y = useTransform(progress, [entryStart, entryEnd], [60, 0]);
  const rotateX = useTransform(progress, [0.1, 0.9], [8, -8]);
  const scale = useTransform(progress, [entryStart, entryEnd, 0.8, 0.95], [0.85, 1, 1, 0.95]);
  const lightPos = useTransform(progress, [0.2, 0.8], [-50, 150]);
  const descOpacity = useTransform(progress, [entryEnd, entryEnd + 0.05], [0, 1]);

  return (
    <motion.div className="relative flex flex-col items-center" style={{ opacity, y, rotateX, scale, perspective: 800 }}>
      <div
        className="relative w-[clamp(80px,12vw,140px)] h-[clamp(120px,18vw,200px)] rounded-sm overflow-hidden"
        style={{
          background: mat.gradient,
          boxShadow: mat.id === "glass" ? "0 20px 60px rgba(100,150,170,0.08), inset 0 1px 0 rgba(255,255,255,0.06)" : `0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
          border: mat.id === "glass" ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: useTransform(lightPos, (pos) => `linear-gradient(105deg, transparent ${pos - 30}%, rgba(255,255,255,0.08) ${pos}%, transparent ${pos + 30}%)`) }} />
        {mat.lightReaction === "reflect" && <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)" }} />}
        {mat.lightReaction === "mirror" && <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, transparent 20%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.02) 55%, transparent 80%)" }} />}
        {mat.lightReaction === "refract" && <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(200,220,230,0.06) 30%, rgba(160,190,200,0.04) 60%, rgba(255,255,255,0.02) 100%)" }} />}
        {mat.lightReaction === "absorb" && <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.03) 0%, transparent 60%)" }} />}
      </div>
      <div className="mt-5 text-center">
        <span className="editorial-caption text-[7px]">{mat.subtitle}</span>
        <h3 className="font-display text-sm font-[200] text-linen/70 mt-1 tracking-[0.04em]">{mat.name}</h3>
        <span className="block font-body text-[8px] font-[300] text-ember/40 mt-1.5">{mat.property}</span>
      </div>
      <motion.p className="font-body text-[9px] font-[300] leading-[1.6] text-smoke/35 max-w-[140px] text-center mt-3" style={{ opacity: descOpacity }}>
        {mat.description}
      </motion.p>
    </motion.div>
  );
}

export default function ActMaterials({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative w-full h-full bg-void">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(196,90,44,0.015) 0%, transparent 50%)" }} />
      <motion.div className="absolute top-8 left-8 md:left-12 z-[20]" style={{ opacity: useTransform(progress, [0.02, 0.1], [0, 1]) }}>
        <span className="editorial-caption">ACT IV</span>
        <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-[200] tracking-[-0.01em] text-linen/80 mt-2">Material DNA</h2>
        <p className="font-body text-[11px] font-[300] text-smoke/40 mt-2 max-w-xs">Six surfaces. Each reacts to light differently. Touch reveals physics.</p>
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 px-8 md:px-16 max-w-[1200px]">
          {MONOLITHS.map((mat, i) => (
            <MaterialMonolith key={mat.id} mat={mat} index={i} progress={progress} />
          ))}
        </div>
      </div>
      <motion.div className="absolute bottom-8 left-8 md:left-12 z-[20]" style={{ opacity: useTransform(progress, [0.4, 0.55], [0, 0.5]) }}>
        <div className="flex items-center gap-6">
          {["Reflect", "Absorb", "Refract", "Diffuse", "Mirror", "Soften"].map((reaction) => (
            <span key={reaction} className="font-body text-[7px] font-[300] tracking-[0.1em] text-smoke/25 uppercase hidden md:inline">{reaction}</span>
          ))}
        </div>
      </motion.div>
      <motion.div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 z-[1] pointer-events-none" style={{ opacity: useTransform(progress, [0.15, 0.3], [0, 0.03]) }}>
        <span className="font-display text-[clamp(3rem,10vw,8rem)] font-[100] text-linen leading-none select-none" style={{ writingMode: "vertical-rl" }}>MATERIALS</span>
      </motion.div>
    </div>
  );
}
