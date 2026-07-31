"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { vignette, IMAGE_FILTERS } from "@/lib/motion";
import { BRAND } from "@/lib/brand";

/* ─── HERO SCENE 01 — "ENTER THE WORLD OF KITSER" ──────── */
/* A cinematic parallax hero before the sticky 680vh.        */
/* Uses portrait Scavolini photography for full-viewport     */
/* backgrounds. 5-stage scroll sequence:                     */
/*   1. Darkness → Poetica kitchen reveal (Ken Burns zoom)   */
/*   2. Crossfade → Delinea dark kitchen + brand name        */
/*   3. Horizontal product strip slides across               */
/*   4. Artisan hands + voice quote                          */
/*   5. Fade to black → Act 1                                */

const HERO_HEIGHT = "150vh";

/* ─── BACKGROUND LAYERS ────────────────────────────────── */

interface BGLayer {
  id: string;
  src: string;
  alt: string;
  /** [enter, full, exit] in scroll progress */
  visibility: [number, number, number];
  /** Ken Burns: [startScale, endScale] */
  kenBurns: [number, number];
}

const BG_LAYERS: BGLayer[] = [
  {
    id: "poetica",
    src: "/images/kitchens/scavolini-poetica-hero.jpg",
    alt: "Scavolini Poetica — warm wood and brass kitchen",
    visibility: [0.0, 0.15, 0.42],
    kenBurns: [1.08, 1.0],
  },
  {
    id: "delinea",
    src: "/images/kitchens/scavolini-delinea-hero.jpg",
    alt: "Scavolini Delinea — dark marble luxury kitchen",
    visibility: [0.3, 0.48, 0.72],
    kenBurns: [1.05, 1.0],
  },
  {
    id: "carattere",
    src: "/images/kitchens/scavolini-carattere-hero.jpg",
    alt: "Scavolini Carattere — bright traditional kitchen",
    visibility: [0.6, 0.78, 1.0],
    kenBurns: [1.06, 1.0],
  },
];

/* ─── PRODUCT STRIP (horizontal scroll) ────────────────── */

const STRIP_ITEMS = [
  { src: "/images/cookware/01-cast-iron.jpg", label: "Cast Iron" },
  { src: "/images/cookware/03-copper.jpg", label: "Copper" },
  { src: "/images/materials/01-marble-countertop.jpg", label: "Stone" },
  { src: "/images/materials/03-brass-detail.jpg", label: "Brass" },
  { src: "/images/materials/05-steel-finish.jpg", label: "Steel" },
  { src: "/images/textures/artisan.jpg", label: "Craft" },
];

/* ─── MAIN COMPONENT ───────────────────────────────────── */

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Global fade ── */
  const heroOpacity = useTransform(scrollYProgress, [0, 0.01, 0.94, 1], [1, 1, 1, 0]);

  /* ── Stage 1: Brand name (over Delinea) ── */
  const brandOpacity = useTransform(scrollYProgress, [0.35, 0.42, 0.62, 0.7], [0, 1, 1, 0]);
  const brandY = useTransform(scrollYProgress, [0.35, 0.42], [30, 0]);
  const brandScale = useTransform(scrollYProgress, [0.35, 0.42, 0.62, 0.7], [0.92, 1, 1, 1.03]);

  /* ── Stage 2: Tagline ── */
  const taglineOpacity = useTransform(scrollYProgress, [0.42, 0.48, 0.62, 0.7], [0, 1, 1, 0]);
  const taglineY = useTransform(scrollYProgress, [0.42, 0.48], [15, 0]);

  /* ── Stage 3: Product strip ── */
  const stripOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const stripX = useTransform(scrollYProgress, [0.45, 0.75], ["8%", "-35%"]);

  /* ── Stage 4: Voice quote (over Carattere) ── */
  const quoteOpacity = useTransform(scrollYProgress, [0.68, 0.76, 0.88, 0.94], [0, 1, 1, 0]);
  const quoteY = useTransform(scrollYProgress, [0.68, 0.76], [20, 0]);

  /* ── Scroll indicator ── */
  const indicatorOpacity = useTransform(scrollYProgress, [0.0, 0.04, 0.2, 0.3], [0, 0.5, 0.5, 0]);
  const indicatorY = useTransform(scrollYProgress, [0.0, 0.25], [0, -12]);

  /* ── Category pills ── */
  const pillsOpacity = useTransform(scrollYProgress, [0.82, 0.88, 0.94, 1], [0, 0.7, 0.7, 0]);
  const pillsY = useTransform(scrollYProgress, [0.82, 0.88], [15, 0]);

  /* ── Fade to black (transition to Act 1) ── */
  const fadeOut = useTransform(scrollYProgress, [0.92, 1.0], [0, 1]);

  /* ── Grain ── */
  const grainOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 0.025, 0.025, 0]);

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
          {/* ── Background layers ── */}
          {BG_LAYERS.map((layer) => (
            <BGLayerImage
              key={layer.id}
              layer={layer}
              scrollProgress={scrollYProgress}
            />
          ))}

          {/* ── Atmospheric overlay ── */}
          <div
            className="absolute inset-0 z-[4]"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.05) 35%, rgba(10,10,10,0.05) 65%, rgba(10,10,10,0.55) 100%)",
            }}
          />

          {/* ── Brand name (over Delinea layer) ── */}
          <motion.div
            className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: brandOpacity, y: brandY, scale: brandScale }}
          >
            <h1
              className="font-display text-[clamp(3rem,10vw,8rem)] font-[100] tracking-[0.25em] text-linen"
              style={{ letterSpacing: "0.25em" }}
            >
              {BRAND.name.toUpperCase()}
            </h1>
            <motion.span
              className="font-body text-[clamp(0.55rem,1vw,0.8rem)] font-[300] tracking-[0.3em] text-ember/60 mt-3"
              style={{ opacity: taglineOpacity, y: taglineY }}
            >
              {BRAND.tagline.toUpperCase()}
            </motion.span>
          </motion.div>

          {/* ── Product strip (horizontal scroll) ── */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-[12] flex gap-5 pointer-events-none"
            style={{ opacity: stripOpacity, x: stripX }}
          >
            {STRIP_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className="relative flex-shrink-0 w-[clamp(140px,18vw,220px)] h-[clamp(100px,14vw,170px)] overflow-hidden rounded-sm"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover"
                  style={{ filter: IMAGE_FILTERS.tactile }}
                  sizes="220px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-void/20" />
                <span className="absolute bottom-2 left-3 font-body text-[0.5rem] font-[400] tracking-[0.15em] text-linen/50">
                  {item.label.toUpperCase()}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ── Voice quote (over Carattere layer) ── */}
          <motion.div
            className="absolute inset-0 z-[10] flex flex-col items-center justify-center pointer-events-none px-8"
            style={{ opacity: quoteOpacity, y: quoteY }}
          >
            <p className="font-body text-[clamp(0.85rem,1.6vw,1.2rem)] font-[300] leading-[1.9] text-linen/60 text-center max-w-[500px]">
              Some things <em className="text-ember/80 not-italic font-[400]">cannot be rushed</em>.
              A knife learns your hand. Iron remembers your meals.
              Stone holds the temperature of your intention.
            </p>
          </motion.div>

          {/* ── Category pills (late scroll) ── */}
          <motion.div
            className="absolute bottom-[clamp(60px,10vh,120px)] left-0 right-0 z-[14] flex flex-wrap justify-center gap-3 md:gap-5 pointer-events-none"
            style={{ opacity: pillsOpacity, y: pillsY }}
          >
            {["Modular Kitchens", "Cook & Bakeware", "Kitchen Tools", "Barware"].map(
              (cat) => (
                <span
                  key={cat}
                  className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/25 border border-linen/8 rounded-full px-4 py-1.5"
                >
                  {cat.toUpperCase()}
                </span>
              )
            )}
          </motion.div>

          {/* ── Scroll indicator ── */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center pointer-events-none"
            style={{ opacity: indicatorOpacity, y: indicatorY }}
          >
            <span className="font-body text-[0.45rem] font-[300] tracking-[0.25em] text-linen/35 mb-2">
              SCROLL
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-ember/40 to-transparent" />
          </motion.div>

          {/* ── Vignette ── */}
          <div
            className="absolute inset-0 z-[20] pointer-events-none"
            style={{ background: vignette(30, 0.5) }}
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

          {/* ── Fade to black → Act 1 ── */}
          <motion.div
            className="absolute inset-0 z-[25] pointer-events-none bg-void"
            style={{ opacity: fadeOut }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── BACKGROUND LAYER IMAGE ───────────────────────────── */

function BGLayerImage({
  layer,
  scrollProgress,
}: {
  layer: BGLayer;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [enter, peak, exit] = layer.visibility;

  /* Visibility: fade in → hold → fade out */
  const layerOpacity = useTransform(
    scrollProgress,
    [enter, enter + 0.08, exit - 0.08, exit],
    [0, 1, 1, 0]
  );

  /* Ken Burns: slow zoom */
  const layerScale = useTransform(
    scrollProgress,
    [enter, exit],
    layer.kenBurns
  );

  /* Subtle parallax (each layer drifts at different speed) */
  const layerY = useTransform(
    scrollProgress,
    [enter, exit],
    [15, -15]
  );

  const transform = useTransform(
    [layerY, layerScale],
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
        style={{ filter: IMAGE_FILTERS.cinematic }}
        sizes="100vw"
        priority
      />
    </motion.div>
  );
}
