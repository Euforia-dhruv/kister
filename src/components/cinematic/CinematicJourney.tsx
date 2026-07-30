"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "motion/react";

/* ─── TIMELINE ─────────────────────────────────────────── */

interface Beat {
  id: string;
  image: string;
  imageAlt: string;
  caption: string;
  headline: string;
  body: string;
  /** When this beat's background starts fading in [0–1] */
  in: number;
  /** When this beat's background is fully visible [0–1] */
  peak: number;
  /** When this beat starts fading out [0–1] */
  out: number;
  cta?: { label: string; href: string }[];
}

const BEATS: Beat[] = [
  {
    id: "precision",
    image: "/images/hardware/02-drawer-system.jpg",
    imageAlt: "Blum LEGRABOX drawer system — precision engineered soft-close mechanism",
    caption: "BLUM · PRECISION",
    headline: "The drawer that\ncloses itself.",
    body: "Soft-close at any position. Dynamic load capacity. Silent precision — every single time.",
    in: 0.0,
    peak: 0.08,
    out: 0.18,
  },
  {
    id: "engineering",
    image: "/images/cabinetry/02-handleless-design.jpg",
    imageAlt: "Scavolini handleless cabinetry — Italian precision, push-to-open mechanisms",
    caption: "SCAVOLINI · ENGINEERING",
    headline: "Sixty years of\nItalian precision.",
    body: "Push-to-open mechanisms. Soft-close hinges. Handleless design that disappears into the architecture.",
    in: 0.14,
    peak: 0.24,
    out: 0.36,
  },
  {
    id: "materials",
    image: "/images/materials/01-marble-countertop.jpg",
    imageAlt: "Natural marble countertop — veined stone surface, tactile warmth",
    caption: "MATERIALS · SELECTION",
    headline: "Materials that\ndeserve the name.",
    body: "Marble. Brass. Copper. Steel. Quartz. Every surface chosen for how it feels, how it ages, how it lasts.",
    in: 0.30,
    peak: 0.42,
    out: 0.54,
  },
  {
    id: "craft",
    image: "/images/artisan-hands-v2.jpg",
    imageAlt: "Artisan hands crafting kitchen components — precision joinery, traditional techniques",
    caption: "MANUFACTURING · CRAFT",
    headline: "Built by hand.\nTested by time.",
    body: "Every joint, every finish, every detail — crafted by artisans who understand that a kitchen is more than a room.",
    in: 0.48,
    peak: 0.58,
    out: 0.70,
  },
  {
    id: "portfolio",
    image: "/images/kitchens/scavolini-poetica-island.jpg",
    imageAlt: "Scavolini Poetica island kitchen — walnut cabinetry, stone countertop",
    caption: "PROJECTS · PORTFOLIO",
    headline: "Kitchens we've\nbrought to life.",
    body: "From Coimbatore to Chennai. From compact apartments to expansive homes. Every kitchen, a one-of-one.",
    in: 0.64,
    peak: 0.74,
    out: 0.86,
  },
  {
    id: "reveal",
    image: "/images/kitchens/scavolini-delinea-brass.jpg",
    imageAlt: "Complete Scavolini DeLinea kitchen — brass hardware, premium cabinetry",
    caption: "COMPLETE · VISION",
    headline: "Your kitchen\nstarts here.",
    body: "No. 1, Nava India Road, Coimbatore — 641028",
    in: 0.80,
    peak: 0.90,
    out: 1.01,
    cta: [
      { label: "BOOK PRIVATE CONSULTATION", href: "/contact" },
      { label: "GET DIRECTIONS", href: "/showroom" },
    ],
  },
];

/* ─── EASING ────────────────────────────────────────────── */

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

function getBeatOpacity(progress: number, beat: Beat): number {
  if (progress < beat.in || progress > beat.out) return 0;
  const fadeIn = smoothstep(beat.in, beat.peak, progress);
  const fadeOut = 1 - smoothstep(beat.peak, beat.out, progress);
  return Math.min(fadeIn, fadeOut);
}

function getContentOpacity(progress: number, beat: Beat): number {
  const contentIn = beat.peak - 0.02;
  const contentFadeOut = beat.out - 0.04;
  const contentEnd = beat.out;
  if (progress < contentIn || progress > contentEnd) return 0;
  const fadeIn = smoothstep(contentIn, contentIn + 0.06, progress);
  const fadeOut = smoothstep(contentFadeOut, contentEnd, progress);
  return Math.min(fadeIn, 1 - fadeOut);
}

/* ─── MAIN ──────────────────────────────────────────────── */

export default function CinematicJourney() {
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
    <div ref={containerRef} className="relative z-10" style={{ height: "540vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-void">

        {/* ── BACKGROUND LAYERS — cross-dissolve ── */}
        {BEATS.map((beat) => {
          const bgOpacity = getBeatOpacity(progress, beat);
          if (bgOpacity <= 0.001) return null;

          const localP = Math.min(
            Math.max((progress - beat.in) / (beat.out - beat.in), 0),
            1
          );
          const scale = 1 + localP * 0.06;
          const y = localP * -15;

          return (
            <div
              key={beat.id}
              className="absolute inset-0 overflow-hidden"
              style={{ opacity: bgOpacity }}
            >
              <div
                className="absolute inset-[-8%] will-change-transform"
                style={{ transform: `scale(${scale}) translateY(${y}px)` }}
              >
                <Image
                  src={beat.image}
                  alt={beat.imageAlt}
                  fill
                  className="object-cover"
                  style={{
                    filter:
                      "saturate(0.7) sepia(0.08) contrast(1.05) brightness(0.75)",
                  }}
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}

        {/* ── OVERLAYS — always present ── */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.8) 100%)",
          }}
        />
        <div className="absolute inset-0 z-[3] bg-ember/[0.03]" />
        <div
          className="absolute inset-0 z-[4]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.5) 100%)",
          }}
        />

        {/* ── CONTENT BLOCKS — fade in/out per beat ── */}
        {BEATS.map((beat) => {
          const contentOpacity = getContentOpacity(progress, beat);
          if (contentOpacity <= 0.001) return null;

          const contentIn = beat.peak - 0.02;
          const textLocal = Math.min(
            Math.max((progress - contentIn) / 0.06, 0),
            1
          );
          const textY = (1 - textLocal) * 25;

          return (
            <div
              key={`content-${beat.id}`}
              className="absolute inset-0 z-[10] flex flex-col justify-end pointer-events-none"
              style={{
                padding:
                  "clamp(60px, 10vh, 120px) clamp(24px, 5vw, 72px)",
                opacity: contentOpacity,
                transform: `translateY(${textY}px)`,
              }}
            >
              <span className="block font-body text-[0.6rem] font-[400] tracking-[0.2em] text-ember/70 mb-6">
                {beat.caption}
              </span>
              <h2 className="font-display text-[clamp(2rem,5.5vw,5rem)] font-[200] leading-[0.94] tracking-[-0.025em] text-linen max-w-[600px] whitespace-pre-line">
                {beat.headline}
              </h2>
              <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] font-[300] leading-[1.75] text-smoke/50 max-w-[420px] mt-8">
                {beat.body}
              </p>

              {beat.cta && (
                <div className="mt-12 flex flex-wrap items-center gap-6 pointer-events-auto">
                  {beat.cta.map((cta, i) => (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className={`group inline-flex items-center gap-3 transition-all duration-700 ${
                        i === 0
                          ? "h-12 border border-linen/10 px-6 font-body text-[10px] font-[300] tracking-[0.12em] text-linen/70 hover:text-linen hover:border-ember/30"
                          : "font-body text-sm font-[300] text-smoke/50 hover:text-ember"
                      }`}
                      data-cursor="VISIT"
                    >
                      {cta.label}
                      {i === 0 && (
                        <span className="w-0 group-hover:w-5 h-[1px] bg-current transition-all duration-700" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* ── FILM GRAIN ── */}
        <div
          className="absolute inset-0 z-[60] pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        {/* ── PROGRESS ── */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3">
          {BEATS.map((beat) => {
            const isCurrent =
              progress >= beat.peak - 0.04 && progress <= beat.out;
            const isPast = progress > beat.out;
            return (
              <div
                key={beat.id}
                className={`w-1 h-1 rounded-full transition-all duration-700 ${
                  isCurrent
                    ? "bg-ember scale-150"
                    : isPast
                      ? "bg-linen/20"
                      : "bg-linen/8"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
