"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { vignette, IMAGE_FILTERS } from "@/lib/motion";

/* ─── ACT 3: PROJECTS THAT FEEL LIKE HOME ────────────────── */
/* Masonry project gallery. Immersive hover effects.           */
/* Smooth scroll-driven reveals. Real Kitser project imagery.  */

interface Project {
  id: string;
  image: string;
  title: string;
  location: string;
  style: string;
  description: string;
  span: "tall" | "wide" | "normal";
}

const PROJECTS: Project[] = [
  {
    id: "poetica",
    image: "/images/kitchens/scavolini-poetica-hero.jpg",
    title: "Poetica",
    location: "Coimbatore",
    style: "Contemporary Italian",
    description: "Scavolini Poetica — where tradition meets contemporary. Handleless facades. Warm walnut internals.",
    span: "tall",
  },
  {
    id: "delinea",
    image: "/images/kitchens/scavolini-delinea-hero.jpg",
    title: "DeLinea",
    location: "Bangalore",
    style: "Minimalist Handleless",
    description: "Scavolini DeLinea — the art of disappearance. Push-to-open. Seamless surfaces. Pure form.",
    span: "wide",
  },
  {
    id: "carattere",
    image: "/images/kitchens/scavolini-carattere-hero.jpg",
    title: "Carattere",
    location: "Chennai",
    style: "Bold Italian",
    description: "Scavolini Carattere — bold lines, confident materials. A kitchen with personality.",
    span: "normal",
  },
  {
    id: "modular",
    image: "/images/kitchens/04-modular-hero.jpg",
    title: "Modular Kitchen",
    location: "Hyderabad",
    style: "Premium Modular",
    description: "Full modular system. Blum hardware throughout. Dekton countertops. Bosch appliances.",
    span: "tall",
  },
  {
    id: "freestanding",
    image: "/images/kitchens/06-freestanding-hero.jpg",
    title: "Freestanding",
    location: "Mumbai",
    style: "Industrial Heritage",
    description: "Freestanding units. Professional-grade surfaces. The kitchen as a room, not a corridor.",
    span: "wide",
  },
  {
    id: "flexspace",
    image: "/images/kitchens/03-flexspace-hero.jpg",
    title: "Flexspace",
    location: "Delhi NCR",
    style: "Adaptive Living",
    description: "Kitchen, dining, living — one continuous space. Designed for how you actually live.",
    span: "normal",
  },
];

interface Act3Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act3Manufacturing({ scrollProgress, actStart, actEnd }: Act3Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const containerOpacity = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Section header ── */}
      <SectionHeader progress={progress} />

      {/* ── Project grid ── */}
      <div className="absolute inset-0 z-[15] flex items-center justify-center">
        <div className="w-full max-w-[1400px] h-[70vh] px-[clamp(24px,4vw,60px)] grid grid-cols-3 grid-rows-2 gap-[clamp(8px,1.2vw,16px)]">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} progress={progress} />
          ))}
        </div>
      </div>

      {/* ── CTA at end ── */}
      <motion.div
        className="absolute bottom-[clamp(24px,4vh,60px)] left-0 right-0 z-[30] flex flex-col items-center pointer-events-none"
        style={{ opacity: useTransform(progress, [0.85, 0.95, 1, 1], [0, 0.5, 0.5, 0]) }}
      >
        <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-ember/40 mb-2">
          CONTINUE
        </span>
        <div className="w-[1px] h-8 bg-ember/20" />
      </motion.div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[35] pointer-events-none"
        style={{ background: vignette(25, 0.5) }}
      />
    </motion.div>
  );
}

/* ─── SECTION HEADER ────────────────────────────────────── */

function SectionHeader({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05, 0.15, 0.22], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.05], [25, 0]);
  const lineWidth = useTransform(progress, [0.02, 0.08], [0, 1]);

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 z-[25] flex flex-col items-center pt-[clamp(50px,10vh,120px)] pointer-events-none"
      style={{ opacity, y }}
    >
      <span className="font-body text-[0.5rem] font-[400] tracking-[0.25em] text-ember/50 mb-4">
        03
      </span>
      <h2 className="font-display text-[clamp(1.8rem,4.5vw,3.8rem)] font-[100] tracking-[0.12em] text-linen/90 text-center">
        PROJECTS THAT<br />FEEL LIKE HOME
      </h2>
      <motion.div
        className="mx-auto mt-4 h-[1px] bg-ember/30"
        style={{ width: useTransform(lineWidth, (v) => `${v * 80}px`) }}
      />
      <p className="font-body text-[clamp(0.7rem,1vw,0.9rem)] font-[300] tracking-[0.04em] text-smoke/35 mt-5 text-center max-w-[400px]">
        Every kitchen. Every home. Every story.
      </p>
    </motion.div>
  );
}

/* ─── PROJECT CARD ──────────────────────────────────────── */

function ProjectCard({
  project,
  index,
  progress,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
}) {
  const cardStart = 0.14 + index * 0.12;
  const cardPeak = cardStart + 0.08;
  const cardEnd = cardStart + 0.18;

  const opacity = useTransform(progress, (v) => {
    if (v < cardStart || v > cardEnd) return 0;
    if (v < cardPeak) return (v - cardStart) / (cardPeak - cardStart);
    return 1 - (v - cardPeak) / (cardEnd - cardPeak);
  });

  const scale = useTransform(progress, (v) => {
    const localP = Math.min(Math.max((v - cardStart) / (cardEnd - cardStart), 0), 1);
    return 0.92 + Math.sin(localP * Math.PI) * 0.08;
  });

  const spanClass =
    project.span === "tall"
      ? "row-span-2"
      : project.span === "wide"
      ? "col-span-2"
      : "";

  return (
    <motion.div
      className={`relative overflow-hidden group cursor-pointer ${spanClass}`}
      style={{ opacity, scale }}
    >
      <Image
        src={project.image}
        alt={`${project.title} — ${project.location}`}
        fill
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        style={{ filter: IMAGE_FILTERS.cinematic }}
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Default overlay */}
      <div className="absolute inset-0 bg-void/20 transition-opacity duration-700 group-hover:opacity-0" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-void/60 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      {/* Default: bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-[clamp(12px,2vw,24px)] transition-opacity duration-700 group-hover:opacity-0">
        <span className="font-body text-[0.42rem] font-[400] tracking-[0.2em] text-linen/40 block">
          {project.location.toUpperCase()}
        </span>
        <h3 className="font-display text-[clamp(0.9rem,1.8vw,1.4rem)] font-[200] tracking-[0.02em] text-linen mt-1">
          {project.title}
        </h3>
      </div>

      {/* Hover: full details */}
      <div className="absolute inset-0 flex flex-col justify-end p-[clamp(16px,2.5vw,32px)] opacity-0 transition-all duration-700 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
        <span className="font-body text-[0.42rem] font-[400] tracking-[0.2em] text-ember/60 block mb-2">
          {project.style.toUpperCase()}
        </span>
        <h3 className="font-display text-[clamp(1.1rem,2vw,1.6rem)] font-[200] tracking-[0.02em] text-linen">
          {project.title}
        </h3>
        <p className="font-body text-[clamp(0.7rem,0.85vw,0.85rem)] font-[300] leading-[1.7] text-smoke/50 mt-2 max-w-[320px]">
          {project.description}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-[1px] w-6 bg-ember/40" />
          <span className="font-body text-[0.42rem] font-[400] tracking-[0.15em] text-linen/30">
            {project.location.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
