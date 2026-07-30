"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

import Act1Curiosity from "./Act1Curiosity";
import Act2Anatomy from "./Act2Anatomy";
import Act3Manufacturing from "./Act3Manufacturing";
import Act4Materials from "./Act4Materials";
import Act5Intelligence from "./Act5Intelligence";
import Act6BuildTimeline from "./Act6BuildTimeline";
import Act7BeforeAfter from "./Act7BeforeAfter";
import Act8FinalReveal from "./Act8FinalReveal";

/* ─── ACT TIMING ───────────────────────────────────────── */

const ACTS = [
  { id: "curiosity", component: Act1Curiosity, start: 0, end: 0.125 },
  { id: "anatomy", component: Act2Anatomy, start: 0.125, end: 0.3125 },
  { id: "manufacturing", component: Act3Manufacturing, start: 0.3125, end: 0.4375 },
  { id: "materials", component: Act4Materials, start: 0.4375, end: 0.5625 },
  { id: "intelligence", component: Act5Intelligence, start: 0.5625, end: 0.6875 },
  { id: "build", component: Act6BuildTimeline, start: 0.6875, end: 0.8125 },
  { id: "beforeafter", component: Act7BeforeAfter, start: 0.8125, end: 0.90625 },
  { id: "reveal", component: Act8FinalReveal, start: 0.90625, end: 1.0 },
];

function getActProgress(globalProgress: number, act: typeof ACTS[number]): number {
  if (globalProgress < act.start || globalProgress > act.end) return -1;
  return (globalProgress - act.start) / (act.end - act.start);
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

/* ─── PROGRESS BAR ─────────────────────────────────────── */

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-linen/5">
      <div
        className="h-full bg-ember/60 transition-none"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

/* ─── ACT INDICATOR ────────────────────────────────────── */

function ActIndicator({ progress }: { progress: number }) {
  const current = ACTS.find((a) => progress >= a.start && progress <= a.end);
  if (!current) return null;

  const labels: Record<string, string> = {
    curiosity: "I · CURIOSITY",
    anatomy: "II · ANATOMY",
    manufacturing: "III · MANUFACTURING",
    materials: "IV · MATERIALS",
    intelligence: "V · INTELLIGENCE",
    build: "VI · BUILD",
    beforeafter: "VII · TRANSFORM",
    reveal: "VIII · REVEAL",
  };

  return (
    <div className="fixed bottom-8 left-8 z-[9999]">
      <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-linen/20">
        {labels[current.id]}
      </span>
    </div>
  );
}

/* ─── ORCHESTRATOR ─────────────────────────────────────── */

export default function ActOrchestrator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
  });

  return (
    <div ref={containerRef} className="relative z-10" style={{ height: "680vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-void">
        {ACTS.map((act) => {
          const actProgress = getActProgress(progress, act);
          if (actProgress < 0) return null;
          const ActComponent = act.component;
          return <ActComponent key={act.id} progress={actProgress} />;
        })}
      </div>

      <Grain />
      <ProgressBar progress={progress} />
      <ActIndicator progress={progress} />
    </div>
  );
}
