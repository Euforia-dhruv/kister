"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { fade, vignette, IMAGE_FILTERS } from "@/lib/motion";

/* ─── ACT 3: MANUFACTURING ──────────────────────────────── */

interface Stage {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  stat: string;
  statLabel: string;
  in: number;
  peak: number;
  out: number;
}

const STAGES: Stage[] = [
  { id: "steel", image: "/images/materials/05-steel-finish.jpg", title: "Raw Material", subtitle: "STEEL SELECTION", description: "Every kitchen begins as a sheet of steel. We source 18/10 German stainless — the same grade used in surgical instruments.", stat: "18/10", statLabel: "CHROME/NICKEL RATIO", in: 0.0, peak: 0.1, out: 0.18 },
  { id: "laser", image: "/images/hardware/05-detail.jpg", title: "Precision Cut", subtitle: "LASER TECHNOLOGY", description: "Fiber laser cutting at ±0.05mm tolerance. Every cabinet panel, every drawer front — cut with light.", stat: "±0.05", statLabel: "MILLIMETRE TOLERANCE", in: 0.16, peak: 0.28, out: 0.36 },
  { id: "bend", image: "/images/hardware/02-drawer-system.jpg", title: "Formation", subtitle: "CNC BENDING", description: "CNC press brakes fold each panel with mathematical precision. The same technique used in aerospace manufacturing.", stat: "0.1°", statLabel: "ANGLE PRECISION", in: 0.34, peak: 0.46, out: 0.54 },
  { id: "coat", image: "/images/cabinetry/06-finish.jpg", title: "Surface", subtitle: "POWDER COATING", description: "Electrostatic powder coating. 200°C cure. The finish that resists fingerprints, stains, and UV for decades.", stat: "200°C", statLabel: "CURE TEMPERATURE", in: 0.52, peak: 0.64, out: 0.72 },
  { id: "assemble", image: "/images/artisan-hands-v2.jpg", title: "Assembly", subtitle: "HAND ASSEMBLY", description: "Every joint checked by hand. Every hinge tested 80,000 times. Every drawer opened and closed before it leaves the workshop.", stat: "80K", statLabel: "CYCLE TESTS PER HINGE", in: 0.70, peak: 0.82, out: 0.90 },
  { id: "install", image: "/images/kitchens/scavolini-delinea-hero.jpg", title: "Installation", subtitle: "YOUR KITCHEN", description: "Our team installs your kitchen like furniture — not construction. Clean. Precise. Done in days, not weeks.", stat: "5-7", statLabel: "DAYS TO INSTALL", in: 0.86, peak: 0.95, out: 1.02 },
];

interface Act3Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act3Manufacturing({ scrollProgress, actStart, actEnd }: Act3Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const containerOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Background stages — cross-dissolve ── */}
      {STAGES.map((stage) => (
        <StageBackground key={stage.id} stage={stage} progress={progress} />
      ))}

      {/* ── Manufacturing overlay — horizontal progress line ── */}
      <div className="absolute top-1/2 left-0 right-0 z-[15] -translate-y-1/2">
        <div className="relative mx-auto max-w-[1200px] px-8">
          <div className="relative h-[1px] bg-linen/8">
            <motion.div
              className="absolute top-0 left-0 h-full bg-ember/40"
              style={{ width: useTransform(progress, (v) => `${v * 100}%`) }}
            />
            {STAGES.map((stage) => {
              return (
                <StageMarker key={stage.id} stage={stage} progress={progress} />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Stage content ── */}
      <div
        className="absolute inset-0 z-[20] flex flex-col justify-end"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
        }}
      >
        {STAGES.map((stage) => (
          <StageContent key={stage.id} stage={stage} progress={progress} />
        ))}
      </div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[25] pointer-events-none"
        style={{ background: vignette(25, 0.5) }}
      />
    </motion.div>
  );
}

/* ─── STAGE BACKGROUND ─────────────────────────────────── */

function StageBackground({ stage, progress }: { stage: Stage; progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    (v) => fade(v, stage.in, stage.peak, stage.out)
  );
  const scale = useTransform(
    progress,
    (v) => {
      const localP = Math.min(Math.max((v - stage.in) / (stage.out - stage.in), 0), 1);
      return 1 + Math.sin(localP * Math.PI) * 0.03;
    }
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-[-5%] will-change-transform"
        style={{ scale }}
      >
        <Image
          src={stage.image}
          alt={stage.title}
          fill
          className="object-cover"
          style={{ filter: IMAGE_FILTERS.cinematic }}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-void/50" />
    </motion.div>
  );
}

/* ─── STAGE MARKER ─────────────────────────────────────── */

function StageMarker({ stage, progress }: { stage: Stage; progress: MotionValue<number> }) {
  const isPast = useTransform(progress, (v) => v > stage.peak);
  const opacity = useTransform(
    progress,
    (v) => fade(v, stage.in, stage.peak, stage.out)
  );
  const isActive = useTransform(opacity, (v) => v > 0.01);

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={{ left: `${stage.peak * 100}%` }}
    >
      <StageMarkerDot isActive={isActive} isPast={isPast} />
    </div>
  );
}

function StageMarkerDot({ isActive, isPast }: { isActive: MotionValue<boolean>; isPast: MotionValue<boolean> }) {
  const backgroundColor = useTransform(
    isActive,
    (active): string => active ? "#c45a2c" : "rgba(245,240,235,0.08)"
  );
  const scale = useTransform(isActive, (v): number => v ? 1.5 : 1);

  return (
    <motion.div
      className="w-2 h-2 rounded-full transition-all duration-500"
      style={{ backgroundColor, scale }}
    />
  );
}

/* ─── ANIMATED STAT ────────────────────────────────────── */

function AnimatedStat({ stage, progress }: { stage: Stage; progress: MotionValue<number> }) {
  const numericValue = useMemo(() => {
    const raw = stage.stat;
    const cleaned = raw.replace(/[±°CK%]/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num)) return null;
    const hasK = raw.includes("K");
    return hasK ? num * 1000 : num;
  }, [stage.stat]);

  const prefix = useMemo(() => {
    const raw = stage.stat;
    if (raw.startsWith("±")) return "±";
    if (raw.startsWith("0.") && !raw.startsWith("0.0")) return "";
    return "";
  }, [stage.stat]);

  const suffix = useMemo(() => {
    const raw = stage.stat;
    if (raw.endsWith("°C")) return "°C";
    if (raw.endsWith("°")) return "°";
    if (raw.endsWith("K")) return "K";
    return "";
  }, [stage.stat]);

  const displayValue = useTransform(progress, (v) => {
    const localP = Math.min(Math.max((v - stage.in) / (stage.peak - stage.in), 0), 1);
    if (numericValue === null) return stage.stat;
    const current = Math.round(localP * numericValue);
    if (suffix === "K") {
      const display = Math.round(localP * (numericValue / 1000));
      return `${prefix}${display}K`;
    }
    if (stage.stat.includes("/")) {
      return stage.stat;
    }
    if (stage.stat === "5-7") {
      return `${prefix}${Math.round(localP * 5)}-${Math.round(localP * 7)}`;
    }
    if (suffix === "°C") {
      return `${prefix}${Math.round(localP * numericValue)}°C`;
    }
    if (suffix === "°") {
      return `${prefix}${localP * numericValue}${suffix}`;
    }
    return `${prefix}${current}`;
  });

  return (
    <span className="font-display text-[clamp(2rem,4vw,3.5rem)] font-[100] text-ember/40 leading-none">
      <motion.span>{displayValue}</motion.span>
    </span>
  );
}

/* ─── STAGE CONTENT ────────────────────────────────────── */

function StageContent({ stage, progress }: { stage: Stage; progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    (v) => fade(v, stage.in, stage.peak, stage.out)
  );
  const slideY = useTransform(
    progress,
    (v) => {
      const contentProgress = Math.min(Math.max((v - stage.peak + 0.05) / 0.1, 0), 1);
      return (1 - contentProgress) * 20;
    }
  );
  const visible = useTransform(opacity, (v) => v > 0.01);

  return (
    <motion.div
      className="absolute bottom-0 left-0"
      style={{
        padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
        opacity,
        y: slideY,
        display: useTransform(visible, (v): string => v ? "block" : "none"),
      }}
    >
      <div className="flex items-end gap-12">
        <div>
          <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60">
            {stage.subtitle}
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-[200] leading-[0.94] tracking-[-0.02em] text-linen mt-3">
            {stage.title}
          </h2>
          <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] font-[300] leading-[1.75] text-smoke/50 max-w-[420px] mt-6">
            {stage.description}
          </p>
        </div>
        <div className="hidden md:block text-right shrink-0">
          <AnimatedStat stage={stage} progress={progress} />
          <span className="block font-body text-[0.5rem] font-[400] tracking-[0.15em] text-smoke/25 mt-2">
            {stage.statLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
