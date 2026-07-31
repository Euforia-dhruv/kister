"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { fade, vignette, IMAGE_FILTERS } from "@/lib/motion";
import { MATERIALS } from "@/lib/brand";

/* ─── ACT 4: MATERIALS — KITSER MATERIALS ───────────────── */
/* Real product photography. Each material card crossfades    */
/* with its brand partner, philosophy quote, and properties.  */

interface MaterialCard {
  id: string;
  name: string;
  brand: string;
  image: string;
  philosophy: string;
  properties: readonly string[];
  in: number;
  peak: number;
  out: number;
}

const CARDS: MaterialCard[] = MATERIALS.map((m, i) => ({
  id: m.name.toLowerCase().replace(/\s/g, "-"),
  name: m.name,
  brand: m.brand,
  image: m.image,
  philosophy: m.philosophy,
  properties: m.properties,
  in: i * 0.14,
  peak: i * 0.14 + 0.1,
  out: i * 0.14 + 0.22,
}));

interface Act4Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act4Materials({ scrollProgress, actStart, actEnd }: Act4Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const containerOpacity = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
  const contentOpacity = useTransform(progress, (v) => Math.max(0, (v - 0.05) / 0.15));

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Background material cards — cross-dissolve ── */}
      {CARDS.map((card) => (
        <MaterialBackground key={card.id} card={card} progress={progress} />
      ))}

      {/* ── Material detail cards (bottom) ── */}
      <div className="absolute inset-0 z-[20] pointer-events-none">
        {CARDS.map((card, i) => (
          <MaterialDetail key={card.id} card={card} index={i} progress={progress} />
        ))}
      </div>

      {/* ── Content overlay ── */}
      <motion.div
        className="absolute inset-0 z-[20] flex flex-col justify-start pointer-events-none"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
          opacity: contentOpacity,
        }}
      >
        <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60">
          MATERIALS
        </span>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[200] leading-[0.94] tracking-[-0.02em] text-linen mt-3 max-w-[400px]">
          The truth of the material<br />is the luxury.
        </h2>
        <p className="font-body text-[clamp(0.75rem,0.9vw,0.9rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[360px] mt-6">
          Six materials. Each chosen for how it performs, how it ages,
          and how it makes you feel when you touch it.
        </p>
      </motion.div>

      {/* ── Material dots (bottom) ── */}
      <div className="absolute bottom-[clamp(24px,5vh,60px)] left-0 right-0 z-[25] flex justify-center gap-3 pointer-events-none">
        {CARDS.map((card, i) => (
          <MaterialDot key={card.id} card={card} index={i} progress={progress} />
        ))}
      </div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[18] pointer-events-none"
        style={{ background: vignette(25, 0.5) }}
      />
    </motion.div>
  );
}

/* ─── MATERIAL BACKGROUND ──────────────────────────────── */

function MaterialBackground({ card, progress }: { card: MaterialCard; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (v) => fade(v, card.in, card.peak, card.out));
  const scale = useTransform(progress, (v) => {
    const localP = Math.min(Math.max((v - card.in) / (card.out - card.in), 0), 1);
    return 1 + Math.sin(localP * Math.PI) * 0.03;
  });

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute inset-[-5%] will-change-transform" style={{ scale }}>
        <Image
          src={card.image}
          alt={`${card.name} — ${card.brand}`}
          fill
          className="object-cover"
          style={{ filter: IMAGE_FILTERS.cinematic }}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-void/45" />
    </motion.div>
  );
}

/* ─── MATERIAL DETAIL ──────────────────────────────────── */

function MaterialDetail({ card, index, progress }: { card: MaterialCard; index: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (v) => fade(v, card.in, card.peak, card.out));
  const slideY = useTransform(progress, (v) => {
    const contentProgress = Math.min(Math.max((v - card.peak + 0.05) / 0.1, 0), 1);
    return (1 - contentProgress) * 20;
  });
  const visible = useTransform(opacity, (v) => v > 0.01);

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0"
      style={{
        padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
        opacity,
        y: slideY,
        display: useTransform(visible, (v): string => (v ? "block" : "none")),
      }}
    >
      <div className="flex items-end justify-between gap-8">
        <div>
          <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60">
            {card.brand.toUpperCase()} — {card.name.toUpperCase()}
          </span>
          <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[380px] mt-4">
            {card.philosophy}
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0">
          {card.properties.map((prop) => (
            <span
              key={prop}
              className="font-body text-[0.45rem] font-[300] tracking-[0.15em] text-linen/25"
            >
              {prop}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MATERIAL DOT ─────────────────────────────────────── */

function MaterialDot({ card, index, progress }: { card: MaterialCard; index: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (v) => fade(v, card.in, card.peak, card.out));
  const isActive = useTransform(opacity, (v) => v > 0.5);

  const backgroundColor = useTransform(isActive, (active): string =>
    active ? "#c45a2c" : "rgba(245,240,235,0.15)"
  );
  const scale = useTransform(isActive, (v): number => (v ? 1.4 : 1));

  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor, scale }}
    />
  );
}
