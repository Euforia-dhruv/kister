"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { fade, vignette, IMAGE_FILTERS } from "@/lib/motion";
import { BRAND, TIMELINE } from "@/lib/brand";

/* ─── ACT 3: THE KITSER STANDARD ────────────────────────── */
/* Heritage → Curation → Material Truth → Craft → Space →     */
/* Destination. Tells Kitser's 36-year story.                 */

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
  {
    id: "heritage",
    image: "/images/lifestyle/hero.jpg",
    title: "Heritage",
    subtitle: "SINCE 1989",
    description: `${BRAND.yearsOfExperience} years. One showroom in Coimbatore. One conviction: that premium kitchen essentials should be accessible to anyone willing to invest in quality.`,
    stat: `${BRAND.yearsOfExperience}`,
    statLabel: "YEARS OF CURATION",
    in: 0.0,
    peak: 0.1,
    out: 0.20,
  },
  {
    id: "curation",
    image: "/images/kitchens/04-modular-hero.jpg",
    title: "Curation",
    subtitle: "ONE STANDARD",
    description: `${BRAND.brandPartners}+ brand partnerships. ${BRAND.countriesSourced} countries. We don't chase brand names. We chase quality. If a product doesn't meet our standard, it doesn't enter our showroom.`,
    stat: `${BRAND.brandPartners}+`,
    statLabel: "BRAND PARTNERS",
    in: 0.16,
    peak: 0.28,
    out: 0.38,
  },
  {
    id: "material-truth",
    image: "/images/cookware/04-flatlay.jpg",
    title: "Material Truth",
    subtitle: "THE SIX PILLARS",
    description: "Cast iron remembers your meals. Copper ages with grace. Stone holds the temperature of your intention. We choose materials that deserve the name.",
    stat: "6",
    statLabel: "PILLARS OF CRAFT",
    in: 0.34,
    peak: 0.46,
    out: 0.56,
  },
  {
    id: "hands",
    image: "/images/textures/artisan.jpg",
    title: "The Hands",
    subtitle: "CRAFTSMANSHIP",
    description: "Every joint checked by hand. Every hinge tested 80,000 times. Every drawer opened and closed before it leaves the workshop. The hands behind the kitchen.",
    stat: "80K",
    statLabel: "CYCLE TESTS PER HINGE",
    in: 0.52,
    peak: 0.64,
    out: 0.74,
  },
  {
    id: "space",
    image: "/images/showroom/miele-experience-center.jpg",
    title: "The Space",
    subtitle: "SHOWROOM",
    description: "3,000 sq ft. Twelve brands. One room designed to help you feel the difference before you commit. Cast iron in your hand. The weight of a Blum drawer. The warmth of walnut.",
    stat: "3,000",
    statLabel: "SQ FT OF EXPERIENCE",
    in: 0.70,
    peak: 0.82,
    out: 0.92,
  },
  {
    id: "destination",
    image: "/images/kitchens/scavolini-carattere-hero.jpg",
    title: "Your Kitchen",
    subtitle: BRAND.location.city.toUpperCase(),
    description: `${BRAND.location.full}. Walk in, call ${BRAND.contact.phone}, or begin online. However you reach us, we're ready to listen.`,
    stat: "1989",
    statLabel: "YEAR FOUNDED",
    in: 0.88,
    peak: 0.95,
    out: 1.02,
  },
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

      {/* ── Progress line with markers ── */}
      <div className="absolute top-1/2 left-0 right-0 z-[15] -translate-y-1/2">
        <div className="relative mx-auto max-w-[1200px] px-8">
          <div className="relative h-[1px] bg-linen/8">
            <motion.div
              className="absolute top-0 left-0 h-full bg-ember/40"
              style={{ width: useTransform(progress, (v) => `${v * 100}%`) }}
            />
            {STAGES.map((stage) => (
              <StageMarker key={stage.id} stage={stage} progress={progress} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Stage content ── */}
      <div className="absolute inset-0 z-[20] flex flex-col justify-end">
        {STAGES.map((stage) => (
          <StageContent key={stage.id} stage={stage} progress={progress} />
        ))}
      </div>

      {/* ── Timeline milestones (bottom right) ── */}
      <motion.div
        className="absolute bottom-[12%] right-[5%] z-[20] hidden lg:flex flex-col items-end gap-1"
        style={{ opacity: useTransform(progress, [0, 0.05, 0.95, 1], [0, 0.5, 0.5, 0]) }}
      >
        {TIMELINE.slice(0, 4).map((t, i) => (
          <span key={t.year} className="font-body text-[0.45rem] font-[300] tracking-[0.15em] text-smoke/20">
            {t.year} — {t.title}
          </span>
        ))}
      </motion.div>

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
  const opacity = useTransform(progress, (v) => fade(v, stage.in, stage.peak, stage.out));
  const scale = useTransform(progress, (v) => {
    const localP = Math.min(Math.max((v - stage.in) / (stage.out - stage.in), 0), 1);
    return 1 + Math.sin(localP * Math.PI) * 0.03;
  });

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute inset-[-5%] will-change-transform" style={{ scale }}>
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
  const opacity = useTransform(progress, (v) => fade(v, stage.in, stage.peak, stage.out));
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
  const backgroundColor = useTransform(isActive, (active): string =>
    active ? "#c45a2c" : "rgba(245,240,235,0.08)"
  );
  const scale = useTransform(isActive, (v): number => (v ? 1.5 : 1));

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
    const cleaned = raw.replace(/[±°CK%+]/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num)) return null;
    const hasK = raw.includes("K");
    return hasK ? num * 1000 : num;
  }, [stage.stat]);

  const prefix = useMemo(() => {
    const raw = stage.stat;
    if (raw.startsWith("±")) return "±";
    return "";
  }, [stage.stat]);

  const suffix = useMemo(() => {
    const raw = stage.stat;
    if (raw.endsWith("+")) return "+";
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
    if (suffix === "+") {
      return `${prefix}${current}+`;
    }
    if (stage.stat.includes("/")) return stage.stat;
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
  const opacity = useTransform(progress, (v) => fade(v, stage.in, stage.peak, stage.out));
  const slideY = useTransform(progress, (v) => {
    const contentProgress = Math.min(Math.max((v - stage.peak + 0.05) / 0.1, 0), 1);
    return (1 - contentProgress) * 20;
  });
  const visible = useTransform(opacity, (v) => v > 0.01);

  return (
    <motion.div
      className="absolute bottom-0 left-0"
      style={{
        padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
        opacity,
        y: slideY,
        display: useTransform(visible, (v): string => (v ? "block" : "none")),
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
          <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[420px] mt-6">
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
