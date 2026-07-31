"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import Act1Curiosity from "./Act1Curiosity";
import Act2Anatomy from "./Act2Anatomy";
import Act3Manufacturing from "./Act3Manufacturing";
import Act4Materials from "./Act4Materials";
import Act5Intelligence from "./Act5Intelligence";
import Act6BuildTimeline from "./Act6BuildTimeline";
import Act7BeforeAfter from "./Act7BeforeAfter";
import Act8FinalReveal from "./Act8FinalReveal";
import { MotionText } from "@/components/site/MotionText";

/* ─── ACT TIMING ───────────────────────────────────────── */

export const ACTS = [
  { id: "curiosity", start: 0, end: 0.125 },
  { id: "anatomy", start: 0.125, end: 0.3125 },
  { id: "manufacturing", start: 0.3125, end: 0.4375 },
  { id: "materials", start: 0.4375, end: 0.5625 },
  { id: "intelligence", start: 0.5625, end: 0.6875 },
  { id: "build", start: 0.6875, end: 0.8125 },
  { id: "beforeafter", start: 0.8125, end: 0.90625 },
  { id: "reveal", start: 0.90625, end: 1.0 },
];

const LABELS: Record<string, string> = {
  curiosity: "I · CURIOSITY",
  anatomy: "II · ANATOMY",
  manufacturing: "III · MANUFACTURING",
  materials: "IV · MATERIALS",
  intelligence: "V · INTELLIGENCE",
  build: "VI · BUILD",
  beforeafter: "VII · TRANSFORM",
  reveal: "VIII · REVEAL",
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

/* ─── FILM GRAIN ───────────────────────────────────────── */

function Grain() {
  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }}
    />
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
  materials: Act4Materials,
  intelligence: Act5Intelligence,
  build: Act6BuildTimeline,
  beforeafter: Act7BeforeAfter,
  reveal: Act8FinalReveal,
};

export default function ActOrchestrator() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative z-10" style={{ height: "680vh" }}>
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

      <Grain />
      <ProgressBar progress={scrollYProgress} />
      <ActIndicator progress={scrollYProgress} />
    </div>
  );
}
