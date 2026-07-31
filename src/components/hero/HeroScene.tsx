"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { smoothstep, vignette, IMAGE_FILTERS } from "@/lib/motion";
import { BRAND } from "@/lib/brand";

/* ─── HERO SCENE 01 — "ENTER THE WORLD OF KITSER" ──────── */
/* A cinematic parallax hero that sits before the sticky     */
/* 680vh experience. Uses real kitser.in photography with    */
/* layered depth, editorial typography, and scroll-driven    */
/* reveal. 120vh scroll distance.                            */

const HERO_HEIGHT = "120vh";

interface HeroLayer {
  id: string;
  src: string;
  alt: string;
  /** Scroll progress range [start, end] where this layer is visible */
  range: [number, number];
  /** Parallax strength (0 = static, 1 = full parallax) */
  parallaxStrength: number;
  /** Scale range [start, end] */
  scaleRange: [number, number];
  /** Z-index */
  zIndex: number;
}

const LAYERS: HeroLayer[] = [
  {
    id: "kitchen-primary",
    src: "/images/hero/modular-kitchen-banner.jpg",
    alt: "Kitser curated kitchen — Scavolini modular design",
    range: [0.0, 0.45],
    parallaxStrength: 0.15,
    scaleRange: [1.15, 1.0],
    zIndex: 1,
  },
  {
    id: "cookware-secondary",
    src: "/images/hero/cookware-banner.jpg",
    alt: "Kitser cookware — curated collection",
    range: [0.25, 0.7],
    parallaxStrength: 0.25,
    scaleRange: [1.1, 1.0],
    zIndex: 2,
  },
  {
    id: "tools-tertiary",
    src: "/images/hero/cooking-tools-banner.jpg",
    alt: "Kitser cooking tools — precision instruments",
    range: [0.5, 0.95],
    parallaxStrength: 0.3,
    scaleRange: [1.1, 1.0],
    zIndex: 3,
  },
];

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Global fade ── */
  const heroOpacity = useTransform(scrollYProgress, [0, 0.02, 0.92, 1], [1, 1, 1, 0]);

  /* ── Title animations ── */
  const titleOpacity = useTransform(scrollYProgress, [0.03, 0.08, 0.35, 0.42], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.03, 0.08], [40, 0]);
  const titleScale = useTransform(scrollYProgress, [0.03, 0.08, 0.35, 0.42], [0.95, 1, 1, 1.02]);

  /* ── Tagline animations ── */
  const taglineOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.35, 0.42], [0, 1, 1, 0]);
  const taglineY = useTransform(scrollYProgress, [0.08, 0.14], [20, 0]);

  /* ── Subtitle (voice quote) ── */
  const subtitleOpacity = useTransform(scrollYProgress, [0.15, 0.22, 0.55, 0.62], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.15, 0.22], [15, 0]);

  /* ── Category pills ── */
  const pillsOpacity = useTransform(scrollYProgress, [0.3, 0.38, 0.65, 0.72], [0, 1, 1, 0]);
  const pillsY = useTransform(scrollYProgress, [0.3, 0.38], [20, 0]);

  /* ── Scroll indicator ── */
  const indicatorOpacity = useTransform(scrollYProgress, [0.0, 0.05, 0.25, 0.35], [0, 0.6, 0.6, 0]);
  const indicatorY = useTransform(scrollYProgress, [0.0, 0.3], [0, -15]);
  const indicatorPulse = useTransform(scrollYProgress, [0.0, 0.1, 0.2, 0.3], [0.4, 0.8, 0.4, 0.8]);

  /* ── Grain overlay opacity ── */
  const grainOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.03, 0.03, 0]);

  /* ── Bottom vignette fade to black (transition to Act 1) ── */
  const bottomFadeOpacity = useTransform(scrollYProgress, [0.85, 1.0], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative bg-void"
      style={{ height: HERO_HEIGHT }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity }}
        >
          {/* ── Background layers (parallax images) ── */}
          {LAYERS.map((layer) => (
            <HeroImageLayer
              key={layer.id}
              layer={layer}
              scrollProgress={scrollYProgress}
            />
          ))}

          {/* ── Dark atmospheric base ── */}
          <div
            className="absolute inset-0 z-[4]"
            style={{
              background: "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.5) 100%)",
            }}
          />

          {/* ── Content ── */}
          <div className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none">
            {/* Brand name */}
            <motion.div
              className="text-center"
              style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
            >
              <h1
                className="font-display text-[clamp(3rem,10vw,8rem)] font-[100] tracking-[0.25em] text-linen"
                style={{ letterSpacing: "0.25em" }}
              >
                {BRAND.name.toUpperCase()}
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="mt-4 text-center"
              style={{ opacity: taglineOpacity, y: taglineY }}
            >
              <span className="font-body text-[clamp(0.6rem,1.2vw,0.9rem)] font-[300] tracking-[0.3em] text-ember/70">
                {BRAND.tagline.toUpperCase()}
              </span>
            </motion.div>

            {/* Voice quote */}
            <motion.div
              className="mt-12 max-w-[480px] px-8 text-center"
              style={{ opacity: subtitleOpacity, y: subtitleY }}
            >
              <p className="font-body text-[clamp(0.85rem,1.6vw,1.15rem)] font-[300] leading-[1.9] text-linen/60">
                Some things <em className="text-ember/80 not-italic font-[400]">cannot be rushed</em>.
                A knife learns your hand. Iron remembers your meals.
              </p>
            </motion.div>

            {/* Category pills */}
            <motion.div
              className="mt-16 flex flex-wrap justify-center gap-4 md:gap-6"
              style={{ opacity: pillsOpacity, y: pillsY }}
            >
              {["Modular Kitchens", "Cook & Bakeware", "Kitchen Tools", "Barware"].map(
                (cat) => (
                  <span
                    key={cat}
                    className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-linen/30 border border-linen/10 rounded-full px-5 py-2"
                  >
                    {cat.toUpperCase()}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* ── Scroll indicator ── */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center pointer-events-none"
            style={{ opacity: indicatorOpacity, y: indicatorY }}
          >
            <span className="font-body text-[0.5rem] font-[300] tracking-[0.25em] text-linen/40 mb-3">
              SCROLL
            </span>
            <motion.div
              className="w-[1px] h-8 bg-gradient-to-b from-ember/50 to-transparent"
              style={{ opacity: indicatorPulse }}
            />
          </motion.div>

          {/* ── Vignette ── */}
          <div
            className="absolute inset-0 z-[20] pointer-events-none"
            style={{ background: vignette(35, 0.55) }}
          />

          {/* ── Film grain ── */}
          <motion.div
            className="fixed inset-0 z-[21] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "256px 256px",
              opacity: grainOpacity,
            }}
          />

          {/* ── Bottom fade to black (transition to Act 1) ── */}
          <motion.div
            className="absolute inset-0 z-[25] pointer-events-none bg-void"
            style={{ opacity: bottomFadeOpacity }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── HERO IMAGE LAYER (parallax) ──────────────────────── */

function HeroImageLayer({
  layer,
  scrollProgress,
}: {
  layer: HeroLayer;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [start, end] = layer.range;

  /* Layer visibility */
  const layerOpacity = useTransform(
    scrollProgress,
    [start, start + 0.08, end - 0.08, end],
    [0, 1, 1, 0]
  );

  /* Parallax Y offset — moves up as you scroll */
  const parallaxY = useTransform(
    scrollProgress,
    [start, end],
    [layer.parallaxStrength * 80, -layer.parallaxStrength * 80]
  );

  /* Ken Burns scale */
  const layerScale = useTransform(
    scrollProgress,
    [start, end],
    layer.scaleRange
  );

  /* Combine transforms */
  const transform = useTransform(
    [parallaxY, layerScale],
    (values: number[]) => {
      const [y, s] = values;
      return `translateY(${y}px) scale(${s})`;
    }
  );

  return (
    <motion.div
      className="absolute inset-0 z-[1]"
      style={{
        opacity: layerOpacity,
        transform,
        willChange: "transform, opacity",
      }}
    >
      <Image
        src={layer.src}
        alt={layer.alt}
        fill
        className="object-cover"
        style={{
          filter: IMAGE_FILTERS.cinematic,
        }}
        sizes="100vw"
        priority={layer.zIndex <= 2}
      />
    </motion.div>
  );
}
