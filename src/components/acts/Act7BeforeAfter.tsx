"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { clamp, easeInOutCubic, contentReveal, vignette } from "@/lib/motion";

/* ─── ACT 7: BEFORE / AFTER ─────────────────────────────── */

interface Act7Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act7BeforeAfter({ scrollProgress, actStart, actEnd }: Act7Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const containerOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  const wipeProgress = useTransform(progress, (v) => clamp(v, 0, 1));
  const eased = useTransform(wipeProgress, (v) => easeInOutCubic(v));
  const contentOpacity = useTransform(progress, (v) => contentReveal(v, 0.05, 0.15));
  const labelOpacity = useTransform(progress, (v) => contentReveal(v, 0.1, 0.1) * contentReveal(1 - v, 0.1, 0.1));

  // Wipe clip-path
  const clipPath = useTransform(eased, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);
  const wipeLeft = useTransform(eased, (v) => `${v * 100}%`);
  const percentText = useTransform(eased, (v) => `${Math.round(v * 100)}%`);

  // Label visibility
  const beforeOpacity = useTransform(eased, (v): number => v < 0.4 ? 1 : 0);
  const afterOpacity = useTransform(eased, (v): number => v > 0.6 ? 1 : 0);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
      role="img"
      aria-label="Before and after comparison: scroll to reveal the transformation"
    >
      {/* ── Before image (full) ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/dark-kitchen-v2.jpg"
          alt="Kitchen before renovation"
          fill
          className="object-cover"
          style={{ filter: "saturate(0.4) contrast(0.9) brightness(0.5)" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/30" />
      </div>

      {/* ── After image (revealed via clip-path wipe) ── */}
      <motion.div
        className="absolute inset-0"
        style={{ clipPath }}
      >
        <Image
          src="/images/kitchens/scavolini-poetica-island.jpg"
          alt="Kitchen after renovation — Scavolini Poetica"
          fill
          className="object-cover"
          style={{ filter: "saturate(0.85) sepia(0.05) contrast(1.08) brightness(0.85)" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/10" />
      </motion.div>

      {/* ── Wipe line ── */}
      <div
        className="absolute top-0 bottom-0 w-[2px] z-[10] pointer-events-none"
        style={{
          left: `${wipeLeft.get()}%`,
          background: "linear-gradient(180deg, transparent 10%, rgba(196,90,44,0.6) 50%, transparent 90%)",
          boxShadow: "0 0 30px rgba(196,90,44,0.4), 0 0 80px rgba(196,90,44,0.15), inset 0 0 20px rgba(196,90,44,0.1)",
        }}
      />

      {/* ── Before/After labels ── */}
      <motion.div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ opacity: labelOpacity }}
      >
        <motion.div
          className="absolute top-8 left-8 transition-opacity duration-500"
          style={{ opacity: beforeOpacity }}
        >
          <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/30">
            BEFORE
          </span>
        </motion.div>
        <motion.div
          className="absolute top-8 right-8 transition-opacity duration-500"
          style={{ opacity: afterOpacity }}
        >
          <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-ember/60">
            AFTER
          </span>
        </motion.div>
      </motion.div>

      {/* ── Progress percentage ── */}
      <div className="absolute bottom-8 right-8 z-[15]">
        <motion.span className="font-display text-[clamp(2rem,5vw,4rem)] font-[100] text-linen/10 leading-none">
          {percentText}
        </motion.span>
      </div>

      {/* ── Content ── */}
      <motion.div
        className="absolute inset-0 z-[20] flex flex-col justify-end pointer-events-none"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
          opacity: contentOpacity,
        }}
      >
        <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60">
          TRANSFORM
        </span>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[200] leading-[0.94] tracking-[-0.02em] text-linen mt-3">
          Scroll to reveal<br />the transformation.
        </h2>
        <p className="font-body text-[clamp(0.75rem,0.9vw,0.9rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[360px] mt-6">
          Scroll to witness the metamorphosis. Every surface replaced.
          Every system upgraded. The same space, reborn.
        </p>
      </motion.div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[12] pointer-events-none"
        style={{ background: vignette(30, 0.5) }}
      />
    </motion.div>
  );
}
