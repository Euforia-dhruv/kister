"use client";

import { useMemo } from "react";
import Image from "next/image";
import { fade, smoothstep, vignette, IMAGE_FILTERS } from "@/lib/motion";

/* ─── ACT 3: MANUFACTURING ──────────────────────────────── */
/* Scroll-driven construction documentary.                    */
/* Steel → Laser → Bend → Coat → Assemble → Install.         */

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
    id: "steel",
    image: "/images/materials/05-steel-finish.jpg",
    title: "Raw Material",
    subtitle: "STEEL SELECTION",
    description: "Every kitchen begins as a sheet of steel. We source 18/10 German stainless — the same grade used in surgical instruments.",
    stat: "18/10",
    statLabel: "CHROME/NICKEL RATIO",
    in: 0.0, peak: 0.1, out: 0.22,
  },
  {
    id: "laser",
    image: "/images/hardware/05-detail.jpg",
    title: "Precision Cut",
    subtitle: "LASER TECHNOLOGY",
    description: "Fiber laser cutting at ±0.05mm tolerance. Every cabinet panel, every drawer front — cut with light.",
    stat: "±0.05",
    statLabel: "MILLIMETRE TOLERANCE",
    in: 0.18, peak: 0.28, out: 0.40,
  },
  {
    id: "bend",
    image: "/images/hardware/02-drawer-system.jpg",
    title: "Formation",
    subtitle: "CNC BENDING",
    description: "CNC press brakes fold each panel with mathematical precision. The same technique used in aerospace manufacturing.",
    stat: "0.1°",
    statLabel: "ANGLE PRECISION",
    in: 0.36, peak: 0.46, out: 0.58,
  },
  {
    id: "coat",
    image: "/images/cabinetry/06-finish.jpg",
    title: "Surface",
    subtitle: "POWDER COATING",
    description: "Electrostatic powder coating. 200°C cure. The finish that resists fingerprints, stains, and UV for decades.",
    stat: "200°C",
    statLabel: "CURE TEMPERATURE",
    in: 0.54, peak: 0.64, out: 0.76,
  },
  {
    id: "assemble",
    image: "/images/artisan-hands-v2.jpg",
    title: "Assembly",
    subtitle: "HAND ASSEMBLY",
    description: "Every joint checked by hand. Every hinge tested 80,000 times. Every drawer opened and closed before it leaves the workshop.",
    stat: "80K",
    statLabel: "CYCLE TESTS PER HINGE",
    in: 0.72, peak: 0.82, out: 0.94,
  },
  {
    id: "install",
    image: "/images/kitchens/scavolini-delinea-hero.jpg",
    title: "Installation",
    subtitle: "YOUR KITCHEN",
    description: "Our team installs your kitchen like furniture — not construction. Clean. Precise. Done in days, not weeks.",
    stat: "5-7",
    statLabel: "DAYS TO INSTALL",
    in: 0.88, peak: 0.95, out: 1.02,
  },
];

export default function Act3Manufacturing({ progress }: { progress: number }) {
  const currentStage = useMemo(() => {
    return STAGES.reduce((best, stage) => {
      const op = fade(progress, stage.in, stage.peak, stage.out);
      const bestOp = fade(progress, best.in, best.peak, best.out);
      return op > bestOp ? stage : best;
    }, STAGES[0]);
  }, [progress]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      {/* ── Background stages — cross-dissolve ── */}
      {STAGES.map((stage) => {
        const opacity = fade(progress, stage.in, stage.peak, stage.out);
        if (opacity <= 0.001) return null;

        const localP = Math.min(Math.max((progress - stage.in) / (stage.out - stage.in), 0), 1);
        const scale = 1 + localP * 0.05;

        return (
          <div
            key={stage.id}
            className="absolute inset-0"
            style={{ opacity }}
          >
            <div
              className="absolute inset-[-5%] will-change-transform"
              style={{ transform: `scale(${scale})` }}
            >
              <Image
                src={stage.image}
                alt={stage.title}
                fill
                className="object-cover"
                style={{ filter: IMAGE_FILTERS.cinematic }}
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-void/50" />
          </div>
        );
      })}

      {/* ── Manufacturing overlay — horizontal progress line ── */}
      <div className="absolute top-1/2 left-0 right-0 z-[15] -translate-y-1/2">
        <div className="relative mx-auto max-w-[1200px] px-8">
          {/* Progress line */}
          <div className="relative h-[1px] bg-linen/8">
            <div
              className="absolute top-0 left-0 h-full bg-ember/40 transition-none"
              style={{ width: `${progress * 100}%` }}
            />
            {/* Stage markers */}
            {STAGES.map((stage) => {
              const pos = (stage.peak) * 100;
              const isActive = stage.id === currentStage.id;
              return (
                <div
                  key={stage.id}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${pos}%` }}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      isActive
                        ? "bg-ember scale-150"
                        : progress > stage.out
                          ? "bg-linen/20"
                          : "bg-linen/8"
                    }`}
                  />
                </div>
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
        {STAGES.map((stage) => {
          const opacity = fade(progress, stage.in, stage.peak, stage.out);
          if (opacity <= 0.01) return null;

          const contentProgress = Math.min(
            Math.max((progress - stage.peak + 0.05) / 0.1, 0),
            1
          );
          const slideY = (1 - contentProgress) * 20;

          return (
            <div
              key={stage.id}
              className="absolute bottom-0 left-0"
              style={{
                padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
                opacity,
                transform: `translateY(${slideY}px)`,
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

                {/* Stat */}
                <div className="hidden md:block text-right shrink-0">
                  <span className="font-display text-[clamp(2rem,4vw,3.5rem)] font-[100] text-ember/40 leading-none">
                    {stage.stat}
                  </span>
                  <span className="block font-body text-[0.5rem] font-[400] tracking-[0.15em] text-smoke/25 mt-2">
                    {stage.statLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[25] pointer-events-none"
        style={{ background: vignette(25, 0.5) }}
      />
    </div>
  );
}
