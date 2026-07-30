"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

/* ─── SCENE DATA ────────────────────────────────────────── */

interface Scene {
  id: string;
  image: string;
  imageAlt: string;
  caption: string;
  headline: string;
  body: string;
  gradient: string;
  cta?: { label: string; href: string }[];
}

const SCENES: Scene[] = [
  {
    id: "drawer",
    image: "/images/hardware/02-drawer-system.jpg",
    imageAlt: "Blum LEGRABOX drawer system — precision engineered soft-close mechanism, silent operation",
    caption: "BLUM · PRECISION",
    headline: "The drawer that\ncloses itself.",
    body: "Soft-close at any position. Dynamic load capacity. Silent precision — every single time.",
    gradient: "linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.8) 100%)",
  },
  {
    id: "cabinet",
    image: "/images/cabinetry/02-handleless-design.jpg",
    imageAlt: "Scavolini handleless cabinetry — Italian precision, push-to-open mechanisms, seamless design",
    caption: "SCAVOLINI · ENGINEERING",
    headline: "Sixty years of\nItalian precision.",
    body: "Push-to-open mechanisms. Soft-close hinges. Handleless design that disappears into the architecture.",
    gradient: "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.85) 100%)",
  },
  {
    id: "materials",
    image: "/images/materials/01-marble-countertop.jpg",
    imageAlt: "Natural marble countertop — veined stone surface, tactile warmth, enduring beauty",
    caption: "MATERIALS · SELECTION",
    headline: "Materials that\ndeserve the name.",
    body: "Marble. Brass. Copper. Steel. Quartz. Every surface chosen for how it feels, how it ages, how it lasts.",
    gradient: "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.8) 100%)",
  },
  {
    id: "manufacturing",
    image: "/images/artisan-hands-v2.jpg",
    imageAlt: "Artisan hands crafting kitchen components — precision joinery, traditional techniques, modern engineering",
    caption: "MANUFACTURING · CRAFT",
    headline: "Built by hand.\nTested by time.",
    body: "Every joint, every finish, every detail — crafted by artisans who understand that a kitchen is more than a room.",
    gradient: "linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.85) 100%)",
  },
  {
    id: "projects",
    image: "/images/kitchens/scavolini-poetica-island.jpg",
    imageAlt: "Scavolini Poetica island kitchen — walnut cabinetry, stone countertop, integrated lighting, modern living",
    caption: "PROJECTS · PORTFOLIO",
    headline: "Kitchens we've\nbrought to life.",
    body: "From Coimbatore to Chennai. From compact apartments to expansive homes. Every kitchen, a one-of-one.",
    gradient: "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.85) 100%)",
  },
  {
    id: "reveal",
    image: "/images/kitchens/scavolini-delinea-brass.jpg",
    imageAlt: "Complete Scavolini DeLinea kitchen — brass hardware, premium cabinetry, warm materials, designed for living",
    caption: "COMPLETE · VISION",
    headline: "Your kitchen\nstarts here.",
    body: "No. 1, Nava India Road, Coimbatore — 641028",
    gradient: "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.7) 100%)",
    cta: [
      { label: "BOOK PRIVATE CONSULTATION", href: "/contact" },
      { label: "GET DIRECTIONS", href: "/showroom" },
    ],
  },
];

/* ─── SCENE TIMING ──────────────────────────────────────── */

const SCENE_DURATION = 0.18;
const SCENE_OVERLAP = 0.04;

function getSceneStart(index: number): number {
  if (index === 0) return 0;
  return index * (SCENE_DURATION - SCENE_OVERLAP);
}

function getSceneEnd(index: number): number {
  return getSceneStart(index) + SCENE_DURATION;
}

/* ─── EASING ────────────────────────────────────────────── */

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getSceneOpacity(progress: number, index: number): number {
  const start = getSceneStart(index);
  const end = getSceneEnd(index);
  const fadeIn = 0.06;
  const fadeOut = 0.06;

  if (progress < start || progress > end) return 0;

  const inOpacity = Math.min((progress - start) / fadeIn, 1);
  const outOpacity = Math.min((end - progress) / fadeOut, 1);

  return easeOutExpo(Math.min(inOpacity, outOpacity));
}

/* ─── GRAIN OVERLAY ─────────────────────────────────────── */

function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 z-[60] pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }}
    />
  );
}

/* ─── SINGLE SCENE ──────────────────────────────────────── */

function SceneLayer({
  scene,
  progress,
  index,
}: {
  scene: Scene;
  progress: number;
  index: number;
}) {
  const start = getSceneStart(index);
  const end = getSceneEnd(index);

  const opacity = getSceneOpacity(progress, index);

  if (opacity <= 0.001) return null;

  const localProgress = Math.min(Math.max((progress - start) / (end - start), 0), 1);
  const imageScale = 1 + easeInOutCubic(localProgress) * 0.06;
  const imageY = easeInOutCubic(localProgress) * -20;

  const textProgress = Math.min(Math.max((progress - start - 0.02) / 0.05, 0), 1);
  const textOpacity = textProgress;
  const textY = (1 - easeOutExpo(textProgress)) * 30;

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-[-8%] will-change-transform"
          style={{
            transform: `scale(${imageScale}) translateY(${imageY}px)`,
          }}
        >
          <Image
            src={scene.image}
            alt={scene.imageAlt}
            fill
            className="object-cover"
            style={{
              filter: "saturate(0.7) sepia(0.08) contrast(1.05) brightness(0.75)",
            }}
            sizes="100vw"
          />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[2]" style={{ background: scene.gradient }} />

      {/* Warm tint */}
      <div className="absolute inset-0 z-[3] bg-ember/[0.03]" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[4]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.5) 100%)",
        }}
      />

      {/* Typography */}
      <div
        className="absolute inset-0 z-[10] flex flex-col justify-end pointer-events-none"
        style={{
          padding: "clamp(60px, 10vh, 120px) clamp(24px, 5vw, 72px)",
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <span className="block font-body text-[0.6rem] font-[400] tracking-[0.2em] text-ember/70 mb-6">
          {scene.caption}
        </span>
        <h2 className="font-display text-[clamp(2rem,5.5vw,5rem)] font-[200] leading-[0.94] tracking-[-0.025em] text-linen max-w-[600px] whitespace-pre-line">
          {scene.headline}
        </h2>
        <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] font-[300] leading-[1.75] text-smoke/50 max-w-[420px] mt-8">
          {scene.body}
        </p>

        {/* CTA buttons for reveal scene */}
        {scene.cta && (
          <div className="mt-12 flex flex-wrap items-center gap-6 pointer-events-auto">
            {scene.cta.map((cta, i) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={`group inline-flex items-center gap-3 transition-all duration-700 ${
                  i === 0
                    ? "h-12 border border-linen/10 px-6 font-body text-[10px] font-[300] tracking-[0.12em] text-linen/70 hover:text-linen hover:border-ember/30"
                    : "font-body text-sm font-[300] tracking-wide-custom text-smoke/50 hover:text-ember"
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
    </div>
  );
}

/* ─── PROGRESS DOTS ─────────────────────────────────────── */

function ProgressDots({ progress }: { progress: number }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3">
      {SCENES.map((scene, i) => {
        const start = getSceneStart(i);
        const end = getSceneEnd(i);
        const isActive = progress >= start && progress <= end;
        const isPast = progress > end;

        return (
          <div
            key={scene.id}
            className={`w-1 h-1 rounded-full transition-all duration-700 ${
              isActive
                ? "bg-ember scale-150"
                : isPast
                  ? "bg-linen/20"
                  : "bg-linen/8"
            }`}
          />
        );
      })}
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────── */

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
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-void">
        {/* All scenes — each self-manages visibility via opacity */}
        {SCENES.map((scene, i) => (
          <SceneLayer key={scene.id} scene={scene} progress={progress} index={i} />
        ))}

        {/* Film grain */}
        <GrainOverlay />

        {/* Progress dots */}
        <ProgressDots progress={progress} />
      </div>
    </div>
  );
}
