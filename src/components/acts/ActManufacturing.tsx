"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

// ACT 3: MANUFACTURING
// Steel sheet → Laser cut → Bending → Powder coating → Assembly → Installation

const STEPS = [
  { id: "raw", label: "RAW MATERIAL", title: "Steel Sheet", description: "Cold-rolled stainless steel. 304 grade. The beginning of everything.", icon: "▬", stat: "1.2mm", statLabel: "Gauge" },
  { id: "laser", label: "PRECISION", title: "Laser Cut", description: "Fiber laser. 0.1mm tolerance. Every cut calculated. Nothing wasted.", icon: "◇", stat: "0.1mm", statLabel: "Tolerance" },
  { id: "bend", label: "FORMATION", title: "CNC Bending", description: "Press brake forming. 160-ton force. Geometry becomes structure.", icon: "⊿", stat: "160T", statLabel: "Force" },
  { id: "coat", label: "PROTECTION", title: "Powder Coating", description: "Electrostatic application. 200°C cure. Colour that doesn't fade.", icon: "◎", stat: "200°C", statLabel: "Cure Temp" },
  { id: "assemble", label: "INTEGRATION", title: "Assembly", description: "Hand-assembled. Every hinge tested 80,000 cycles. Zero defects.", icon: "⬡", stat: "80K", statLabel: "Hinge Cycles" },
  { id: "install", title: "Installation", label: "PLACEMENT", description: "Millimetre-precise placement. Levelled. Aligned. Perfected.", icon: "⊞", stat: "±0.5mm", statLabel: "Precision" },
];

function ManufacturingStep({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const stepStart = 0.08 + index * 0.13;
  const stepMid = stepStart + 0.06;
  const stepEnd = stepStart + 0.13;
  const stepOpacity = useTransform(progress, [stepStart, stepMid, stepEnd, stepEnd + 0.05], [0, 1, 1, 0.4]);
  const stepScale = useTransform(progress, [stepStart, stepMid], [0.85, 1]);
  const stepY = useTransform(progress, [stepStart, stepMid], [30, 0]);
  const isActive = useTransform(progress, [stepStart, stepEnd], [0, 1]);
  const descOpacity = useTransform(progress, [stepMid - 0.02, stepMid, stepEnd - 0.02, stepEnd], [0, 1, 1, 0]);

  return (
    <motion.div
      className="flex flex-col items-center text-center relative"
      style={{ opacity: stepOpacity, scale: stepScale, y: stepY }}
    >
      <motion.div
        className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-linen/10 flex items-center justify-center mb-4 relative"
        style={{
          borderColor: useTransform(isActive, [0, 1], ["rgba(245,240,235,0.08)", "rgba(196,90,44,0.4)"]),
          boxShadow: useTransform(isActive, [0, 1], ["none", "0 0 30px rgba(196,90,44,0.1)"]),
        }}
      >
        <span className="text-sm md:text-lg text-linen/50">{step.icon}</span>
        <motion.div
          className="absolute inset-0 rounded-full border border-ember/20"
          style={{
            scale: useTransform(isActive, [0, 1], [1, 1.6]),
            opacity: useTransform(isActive, [0, 0.5, 1], [0, 0.3, 0]),
          }}
        />
      </motion.div>
      <motion.span
        className="font-display text-[clamp(1rem,2vw,1.6rem)] font-[100] text-ember/70 mb-1"
        style={{ opacity: useTransform(progress, [stepMid, stepEnd], [1, 0.3]) }}
      >
        {step.stat}
      </motion.span>
      <span className="font-body text-[7px] font-[300] tracking-[0.12em] text-smoke/30 uppercase mb-3">{step.statLabel}</span>
      <span className="font-body text-[7px] font-[400] tracking-[0.18em] text-ember/50 uppercase mb-1">{step.label}</span>
      <span className="font-display text-[10px] md:text-xs font-[200] text-linen/60 mb-2">{step.title}</span>
      <motion.p
        className="font-body text-[9px] font-[300] leading-[1.6] text-smoke/35 max-w-[120px] hidden md:block"
        style={{ opacity: descOpacity }}
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
}

export default function ActManufacturing({ progress }: { progress: MotionValue<number> }) {
  const titleOpacity = useTransform(progress, [0.02, 0.1], [0, 1]);
  const lineWidth = useTransform(progress, [0.1, 0.85], ["0%", "100%"]);
  const progressWidth = useTransform(progress, [0.05, 0.9], ["0%", "100%"]);

  return (
    <div className="relative w-full h-full bg-void">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(196,90,44,0.02) 0%, transparent 50%)" }}
      />

      <motion.div className="absolute top-8 left-8 md:left-12 z-[20]" style={{ opacity: titleOpacity }}>
        <span className="editorial-caption">ACT III</span>
        <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-[200] tracking-[-0.01em] text-linen/80 mt-2">How It&apos;s Made</h2>
      </motion.div>

      <div className="absolute inset-0 flex items-center z-[10]">
        <div className="w-full px-8 md:px-16">
          <div className="absolute top-1/2 left-16 right-16 h-[1px] -translate-y-1/2 bg-linen/[0.04]">
            <motion.div className="absolute left-0 top-0 h-full bg-gradient-to-r from-ember/40 to-ember/10" style={{ width: lineWidth }} />
          </div>
          <div className="grid grid-cols-6 gap-4 md:gap-6 relative">
            {STEPS.map((step, i) => (
              <ManufacturingStep key={step.id} step={step} index={i} progress={progress} />
            ))}
          </div>
        </div>
      </div>

      <motion.div className="absolute bottom-8 right-8 md:right-12 z-[5] pointer-events-none" style={{ opacity: useTransform(progress, [0.1, 0.3], [0, 0.04]) }}>
        <span className="font-display text-[clamp(4rem,12vw,10rem)] font-[100] text-linen leading-none select-none">PROCESS</span>
      </motion.div>

      <motion.div className="absolute bottom-8 left-8 md:left-12 z-[20] flex items-center gap-3" style={{ opacity: useTransform(progress, [0.05, 0.15, 0.9, 1], [0, 0.6, 0.6, 0]) }}>
        <div className="w-20 h-[1px] bg-linen/10 relative overflow-hidden">
          <motion.div className="absolute left-0 top-0 h-full bg-ember/50" style={{ width: progressWidth }} />
        </div>
        <span className="font-body text-[8px] font-[300] tracking-[0.12em] text-smoke/30">FABRICATION</span>
      </motion.div>
    </div>
  );
}
