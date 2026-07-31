"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { fade, clamp, contentReveal, vignette } from "@/lib/motion";
import { MotionText } from "@/components/site/MotionText";

/* ─── ACT 8: FINAL REVEAL ───────────────────────────────── */

interface KitchenScene {
  id: string;
  image: string;
  label: string;
  depth: number;
  scale: number;
  x: number;
  y: number;
  in: number;
  peak: number;
  out: number;
}

const SCENES: KitchenScene[] = [
  { id: "entrance", image: "/images/showroom/01-interior.jpg", label: "ENTER", depth: 0, scale: 1.2, x: 50, y: 50, in: 0.0, peak: 0.1, out: 0.22 },
  { id: "cabinets", image: "/images/cabinetry/04-hero.jpg", label: "CABINETRY", depth: 1, scale: 1.0, x: 35, y: 45, in: 0.16, peak: 0.28, out: 0.40 },
  { id: "stone", image: "/images/materials/02-quartz-surface.jpg", label: "SURFACE", depth: 2, scale: 0.95, x: 60, y: 40, in: 0.34, peak: 0.46, out: 0.58 },
  { id: "hardware", image: "/images/hardware/01-blum-hinge.jpg", label: "HARDWARE", depth: 3, scale: 0.9, x: 40, y: 55, in: 0.52, peak: 0.64, out: 0.76 },
  { id: "light", image: "/images/kitchens/scavolini-delinea-brass.jpg", label: "DETAIL", depth: 4, scale: 0.85, x: 55, y: 45, in: 0.70, peak: 0.82, out: 0.94 },
  { id: "kitchen", image: "/images/kitchens/scavolini-poetica-island.jpg", label: "KITCHEN", depth: 5, scale: 1.0, x: 50, y: 50, in: 0.88, peak: 0.95, out: 1.02 },
];

const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  x: 10 + i * 12,
  phase: i * 0.5,
}));

interface Act8Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act8FinalReveal({ scrollProgress, actStart, actEnd }: Act8Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const containerOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);
  const contentOpacity = useTransform(progress, (v) => contentReveal(v, 0.05, 0.15));
  const isComplete = useTransform(progress, (v) => v > 0.95);

  // Current scene label
  const currentLabel = useTransform(progress, (v) => {
    const best = SCENES.reduce((b, s) => {
      const op = fade(v, s.in, s.peak, s.out);
      const bOp = fade(v, b.in, b.peak, b.out);
      return op > bOp ? s : b;
    }, SCENES[0]);
    return best.label;
  });

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Parallax kitchen scenes ── */}
      {SCENES.map((scene) => (
        <ParallaxScene key={scene.id} scene={scene} progress={progress} />
      ))}

      {/* ── Floating detail elements ── */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        <FloatingElements progress={progress} />
      </div>

      {/* ── Scene label ── */}
      <div className="absolute top-8 left-8 z-[20]">
        <motion.span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/20">
          {currentLabel}
        </motion.span>
      </div>

      {/* ── Progress dots ── */}
      <div className="absolute top-8 right-8 z-[20] flex items-center gap-2">
        {SCENES.map((scene) => (
          <SceneDot key={scene.id} scene={scene} progress={progress} />
        ))}
      </div>

      {/* ── Content ── */}
      <motion.div
        className="absolute inset-0 z-[20] flex flex-col justify-center items-center text-center pointer-events-none"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
          opacity: contentOpacity,
        }}
      >
        <ContentSection isComplete={isComplete} />
      </motion.div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[18] pointer-events-none"
        style={{ background: vignette(20, 0.6) }}
      />
    </motion.div>
  );
}

/* ─── PARALLAX SCENE ────────────────────────────────────── */

function ParallaxScene({ scene, progress }: { scene: KitchenScene; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (v) => fade(v, scene.in, scene.peak, scene.out));
  const localP = useTransform(progress, (v) => clamp((v - scene.in) / (scene.out - scene.in), 0, 1));
  const translateX = useTransform(localP, (lp) => (scene.x - 50) * lp * 5);
  const translateY = useTransform(localP, (lp) => (scene.y - 50) * lp * 3);
  const scale = useTransform(localP, (lp) => scene.scale + lp * 0.05);
  const translateZ = scene.depth * 20;

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-[-10%] will-change-transform"
        style={{
          x: translateX,
          y: translateY,
          scale,
          z: translateZ,
        }}
      >
        <Image
          src={scene.image}
          alt={scene.label}
          fill
          className="object-cover"
          style={{
            filter: `saturate(0.75) sepia(0.06) contrast(1.06) brightness(${0.6 + scene.depth * 0.04})`,
          }}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-void/40" />
    </motion.div>
  );
}

/* ─── FLOATING ELEMENTS ─────────────────────────────────── */

function FloatingElements({ progress }: { progress: MotionValue<number> }) {
  const visible = useTransform(progress, (v) => v > 0.2 && v < 0.9);
  const streakX = useTransform(progress, (v) => `${(v - 0.2) * 200 - 50}%`);

  return (
    <>
      <motion.div
        className="absolute top-1/4 left-0 right-0 h-[1px] opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(196,90,44,0.4), transparent)",
          x: streakX,
          display: useTransform(visible, (v): string => v ? "block" : "none"),
        }}
      />
      {PARTICLES.map((p) => (
        <Particle key={p.x} p={p} progress={progress} visible={visible} />
      ))}
    </>
  );
}

function Particle({ p, progress, visible }: {
  p: { x: number; phase: number };
  progress: MotionValue<number>;
  visible: MotionValue<boolean>;
}) {
  const y = useTransform(progress, (v) => 20 + Math.sin(v * Math.PI * 3 + p.x) * 15);
  const opacity = useTransform(progress, (v) => {
    const raw = Math.sin(v * Math.PI * 2 + p.phase) * 0.3 + 0.1;
    return Math.max(0, raw);
  });

  return (
    <motion.div
      className="absolute w-[2px] h-[2px] rounded-full bg-ember/40"
      style={{
        left: `${p.x}%`,
        y,
        opacity,
        display: useTransform(visible, (v) => v ? "block" : "none"),
      }}
    />
  );
}

/* ─── SCENE DOT ─────────────────────────────────────────── */

function SceneDot({ scene, progress }: { scene: KitchenScene; progress: MotionValue<number> }) {
  const isActive = useTransform(progress, (v) => {
    const op = fade(v, scene.in, scene.peak, scene.out);
    return op > 0.01;
  });
  const isPast = useTransform(progress, (v) => v > scene.peak);
  const isActiveN = useTransform(isActive, (v): number => v ? 1 : 0);
  const isPastN = useTransform(isPast, (v): number => v ? 1 : 0);

  return (
    <motion.div
      className="w-1 h-1 rounded-full transition-all duration-500"
      style={{
        backgroundColor: useTransform(
          [isActiveN, isPastN],
          ([active, past]): string =>
            active ? "#c45a2c" : past ? "rgba(245,240,235,0.2)" : "rgba(245,240,235,0.06)"
        ),
        scale: useTransform(isActive, (a): number => a ? 1.5 : 1),
      }}
    />
  );
}

/* ─── CONTENT SECTION ───────────────────────────────────── */

function ContentSection({ isComplete }: { isComplete: MotionValue<boolean> }) {
  return (
    <>
      <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60 mb-6">
        <MotionText value={useTransform(isComplete, (v) => v ? "YOUR KITCHEN AWAITS" : "REVEAL")} />
      </span>
      <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-[100] leading-[0.9] tracking-[-0.03em] text-linen max-w-[700px]">
        <MotionText
          value={useTransform(isComplete, (v) =>
            v ? "The kitchen\nis where life\nhappens." : "Walk through\nyour kitchen."
          )}
          style={{ whiteSpace: "pre-line" }}
        />
      </h2>
      <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[400px] mt-8">
        <MotionText value={useTransform(isComplete, (v) =>
          v ? "No. 1, Nava India Road, Coimbatore — 641028" : "Scroll to move through the space. Every detail, every material, every system — alive and waiting."
        )} />
      </p>
      <motion.div
        className="mt-12 flex flex-wrap items-center justify-center gap-6 pointer-events-auto"
        style={{
          opacity: useTransform(isComplete, (v): number => v ? 1 : 0),
          pointerEvents: useTransform(isComplete, (v): string => v ? "auto" : "none"),
        }}
      >
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 h-12 border border-linen/10 px-6 font-body text-[10px] font-[300] tracking-[0.12em] text-linen/70 hover:text-linen hover:border-ember/30 transition-all duration-700"
          data-cursor="VISIT"
        >
          BOOK PRIVATE CONSULTATION
          <span className="w-0 group-hover:w-5 h-[1px] bg-current transition-all duration-700" />
        </Link>
        <Link
          href="/showroom"
          className="font-body text-sm font-[300] text-smoke/50 hover:text-ember transition-colors duration-700"
        >
          GET DIRECTIONS
        </Link>
      </motion.div>
    </>
  );
}
