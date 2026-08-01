"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import Act1Curiosity from "./Act1Curiosity";
import Act2Anatomy from "./Act2Anatomy";
import Act3Manufacturing from "./Act3Manufacturing";
import { MotionText } from "@/components/site/MotionText";

/* ─── ACT TIMING — 3 ACTS ─────────────────────────────── */

export const ACTS = [
  { id: "curiosity", start: 0, end: 0.35 },
  { id: "anatomy", start: 0.35, end: 0.68 },
  { id: "manufacturing", start: 0.68, end: 1.0 },
];

const LABELS: Record<string, string> = {
  curiosity: "I · CRAFT",
  anatomy: "II · MATERIAL",
  manufacturing: "III · HOME",
};

/* ─── HOOK: USE ACT PROGRESS ───────────────────────────── */

export function useActProgress(
  scrollProgress: MotionValue<number>,
  actStart: number,
  actEnd: number
): MotionValue<number> {
  return useTransform(
    scrollProgress,
    [actStart, actEnd],
    [0, 1],
    { clamp: true }
  );
}

/* ─── PROGRESS BAR (MotionValue-driven) ────────────────── */

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, (v) => `${v * 100}%`);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-linen/5">
      <motion.div
        className="h-full bg-ember/60"
        style={{ width }}
      />
    </div>
  );
}

/* ─── ACT INDICATOR ────────────────────────────────────── */

function ActIndicator({ progress }: { progress: MotionValue<number> }) {
  const label = useTransform(progress, (v) => {
    const current = ACTS.find((a) => v >= a.start && v <= a.end);
    return current ? LABELS[current.id] : "";
  });
  return (
    <div className="fixed bottom-8 left-8 z-[9999]">
      <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-linen/20">
        <MotionText value={label} />
      </span>
    </div>
  );
}

/* ─── ORCHESTRATOR ─────────────────────────────────────── */

const ACT_COMPONENTS = {
  curiosity: Act1Curiosity,
  anatomy: Act2Anatomy,
  manufacturing: Act3Manufacturing,
};

export default function ActOrchestrator() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative z-10" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-void">
        {ACTS.map((act) => {
          const ActComponent = ACT_COMPONENTS[act.id as keyof typeof ACT_COMPONENTS];
          return (
            <ActComponent
              key={act.id}
              scrollProgress={scrollYProgress}
              actStart={act.start}
              actEnd={act.end}
            />
          );
        })}
      </div>

      <ProgressBar progress={scrollYProgress} />
      <ActIndicator progress={scrollYProgress} />
    </div>
  );
}
