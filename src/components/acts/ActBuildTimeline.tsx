"use client";

import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "motion/react";

// ACT 6: BUILD TIMELINE
// Construction Time Machine. The kitchen slowly builds itself.

const LAYERS = [
  { id: "floor", label: "FLOOR", height: 8, color: "#2a2520", description: "Subfloor preparation, waterproofing membrane" },
  { id: "framework", label: "FRAMEWORK", height: 12, color: "#3d3530", description: "Steel framework, wall reinforcement" },
  { id: "electrical", label: "ELECTRICAL", height: 6, color: "#4a3828", description: "Conduit routing, junction boxes, dedicated circuits" },
  { id: "plumbing", label: "PLUMBING", height: 6, color: "#3a4a4a", description: "Water supply, drainage, gas line" },
  { id: "cabinets", label: "CABINETS", height: 25, color: "#4a3825", description: "Scavolini modular system, wall & base units" },
  { id: "countertop", label: "COUNTERTOP", height: 5, color: "#8a8278", description: "Template, fabricate, install Dekton surface" },
  { id: "splash", label: "SPLASHBACK", height: 8, color: "#6a6258", description: "Matching or contrasting material, silicone sealed" },
  { id: "accessories", label: "ACCESSORIES", height: 8, color: "#b87333", description: "Handles, hooks, rails, open shelving" },
  { id: "lighting", label: "LIGHTING", height: 5, color: "#d4a574", description: "Under-cabinet LED, ceiling spots, dimmer" },
  { id: "finished", label: "FINISHED", height: 17, color: "#c45a2c", description: "Final clean, inspection, client handover" },
];

function BuildLayer({
  layer,
  index,
  progress,
  bottomOffset,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
  progress: MotionValue<number>;
  bottomOffset: number;
}) {
  const layerStart = 0.08 + index * 0.085;
  const layerMid = layerStart + 0.04;
  const layerEnd = layerStart + 0.085;
  const layerOpacity = useTransform(progress, [layerStart, layerMid, 0.95, 1], [0, 1, 1, 0.7]);
  const layerY = useTransform(progress, [layerStart, layerMid], [40, 0]);
  const layerScaleX = useTransform(progress, [layerStart, layerMid], [0.95, 1]);
  const labelOpacity = useTransform(progress, [layerMid, layerMid + 0.03, 0.9, 0.95], [0, 1, 1, 0]);
  const glowShadow = useTransform(progress, [layerStart, layerMid, layerEnd], [
    "inset 0 0 0 rgba(196,90,44,0)",
    "inset 0 0 20px rgba(196,90,44,0.08)",
    "inset 0 0 0 rgba(196,90,44,0)",
  ]);

  return (
    <motion.div
      className="absolute left-0 right-0"
      style={{ bottom: `${bottomOffset}%`, height: `${layer.height}%`, opacity: layerOpacity, y: layerY, scaleX: layerScaleX }}
    >
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          background: `linear-gradient(180deg, ${layer.color}cc 0%, ${layer.color}99 100%)`,
          boxShadow: "0 -1px 0 rgba(255,255,255,0.03), 0 4px 20px rgba(0,0,0,0.3)",
        }}
      />
      <motion.div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap hidden md:flex items-center gap-3" style={{ opacity: labelOpacity }}>
        <div className="w-6 h-[1px] bg-linen/15" />
        <div>
          <span className="font-body text-[7px] font-[400] tracking-[0.15em] text-ember/60 uppercase block">{layer.label}</span>
          <span className="font-body text-[8px] font-[300] text-smoke/30 block mt-0.5 max-w-[180px]">{layer.description}</span>
        </div>
      </motion.div>
      <motion.div className="absolute inset-0 pointer-events-none rounded-sm" style={{ boxShadow: glowShadow }} />
    </motion.div>
  );
}

function ProgressDot({
  layer,
  index,
  progress,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const dotActive = useTransform(progress, [0.08 + index * 0.085, 0.12 + index * 0.085], [0, 1]);

  return (
    <div className="flex items-center gap-2">
      <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: useTransform(dotActive, [0, 1], ["rgba(245,240,235,0.1)", "rgba(196,90,44,0.6)"]) }} />
      <motion.span className="font-body text-[7px] font-[300] tracking-[0.1em] uppercase" style={{ color: useTransform(dotActive, [0, 1], ["rgba(138,138,138,0.2)", "rgba(138,138,138,0.5)"]) }}>
        {layer.label}
      </motion.span>
    </div>
  );
}

export default function ActBuildTimeline({ progress }: { progress: MotionValue<number> }) {
  const [day, setDay] = useState(1);
  const titleOpacity = useTransform(progress, [0.02, 0.1], [0, 1]);

  useMotionValueEvent(progress, "change", (latest) => {
    setDay(Math.round(1 + latest * 44));
  });

  const bottomOffsets = LAYERS.reduce<number[]>((acc, _layer, i) => {
    const lastOffset = i > 0 ? acc[i - 1] + LAYERS[i - 1].height : 0;
    acc.push(lastOffset);
    return acc;
  }, []);

  return (
    <div className="relative w-full h-full bg-void">
      <motion.div className="absolute top-8 left-8 md:left-12 z-[25]" style={{ opacity: titleOpacity }}>
        <span className="editorial-caption">ACT VI</span>
        <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-[200] tracking-[-0.01em] text-linen/80 mt-2">Construction Time Machine</h2>
        <p className="font-body text-[11px] font-[300] text-smoke/40 mt-2 max-w-xs">Watch the kitchen build itself. Layer by layer. From floor to finish.</p>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <div className="relative w-[min(70vw,600px)] h-[min(65vh,500px)]">
          {LAYERS.map((layer, i) => (
            <BuildLayer key={layer.id} layer={layer} index={i} progress={progress} bottomOffset={bottomOffsets[i]} />
          ))}
          <motion.div className="absolute -left-3 top-0 bottom-0 w-[1px]" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(245,240,235,0.06) 20%, rgba(245,240,235,0.06) 80%, transparent 100%)", opacity: useTransform(progress, [0.1, 0.2], [0, 1]) }} />
          <motion.div className="absolute -right-3 top-0 bottom-0 w-[1px]" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(245,240,235,0.06) 20%, rgba(245,240,235,0.06) 80%, transparent 100%)", opacity: useTransform(progress, [0.1, 0.2], [0, 1]) }} />
        </div>
      </div>

      <motion.div className="absolute bottom-8 right-8 md:right-12 z-[20]" style={{ opacity: useTransform(progress, [0.1, 0.25, 0.9, 1], [0, 0.6, 0.6, 0]) }}>
        <motion.span className="font-display text-[clamp(2rem,5vw,3.5rem)] font-[100] text-ember/40 block text-right">
          DAY {String(day).padStart(2, "0")}
        </motion.span>
        <span className="font-body text-[8px] font-[300] tracking-[0.12em] text-smoke/25 uppercase block text-right mt-1">INSTALLATION</span>
      </motion.div>

      <motion.div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-[15] hidden md:flex flex-col gap-1" style={{ opacity: useTransform(progress, [0.1, 0.2], [0, 0.4]) }}>
        {LAYERS.map((layer, i) => (
          <ProgressDot key={layer.id} layer={layer} index={i} progress={progress} />
        ))}
      </motion.div>
    </div>
  );
}
