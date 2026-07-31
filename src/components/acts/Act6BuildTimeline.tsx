"use client";

import { useMemo } from "react";
import Image from "next/image";
import { fade, vignette, IMAGE_FILTERS } from "@/lib/motion";

/* ─── ACT 6: BUILD TIMELINE ─────────────────────────────── */
/* The kitchen slowly builds itself on scroll.                */

interface BuildLayer {
  id: string;
  label: string;
  image: string;
  description: string;
  z: number;
  in: number;
  peak: number;
  out: number;
}

const LAYERS: BuildLayer[] = [
  { id: "floor", label: "FLOOR", image: "/images/materials/06-natural-finish.jpg", description: "Every kitchen starts with the foundation.", z: 0, in: 0.0, peak: 0.08, out: 0.18 },
  { id: "framework", label: "FRAMEWORK", image: "/images/cabinetry/01-scavolini-modular.jpg", description: "The skeleton that holds everything.", z: 1, in: 0.12, peak: 0.22, out: 0.32 },
  { id: "electrical", label: "ELECTRICAL", image: "/images/hardware/04-hero.jpg", description: "Power where you need it. Hidden where you don't.", z: 2, in: 0.26, peak: 0.36, out: 0.46 },
  { id: "plumbing", label: "PLUMBING", image: "/images/hardware/sinks-hero.jpg", description: "Water in. Waste out. Precision matters.", z: 3, in: 0.40, peak: 0.50, out: 0.60 },
  { id: "cabinets", label: "CABINETS", image: "/images/cabinetry/02-handleless-design.jpg", description: "Scavolini. Italian engineering. Decades of use.", z: 4, in: 0.54, peak: 0.64, out: 0.74 },
  { id: "countertop", label: "COUNTERTOP", image: "/images/materials/01-marble-countertop.jpg", description: "Dekton. The surface that outlasts everything.", z: 5, in: 0.68, peak: 0.78, out: 0.88 },
  { id: "accessories", label: "ACCESSORIES", image: "/images/hardware/01-blum-hinge.jpg", description: "Blum hardware. The invisible backbone.", z: 6, in: 0.80, peak: 0.88, out: 0.96 },
  { id: "lighting", label: "LIGHTING", image: "/images/kitchens/scavolini-poetica-hero.jpg", description: "Light that makes materials sing.", z: 7, in: 0.90, peak: 0.96, out: 1.02 },
];

export default function Act6BuildTimeline({ progress }: { progress: number }) {
  const activeLayer = useMemo(() => {
    return LAYERS.reduce((best, layer) => {
      const op = fade(progress, layer.in, layer.peak, layer.out);
      const bestOp = fade(progress, best.in, best.peak, best.out);
      return op > bestOp ? layer : best;
    }, LAYERS[0]);
  }, [progress]);

  const buildComplete = progress > 0.95;

  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      {/* ── Building layers — stacked with depth ── */}
      <div
        className="absolute inset-0"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
      >
        {LAYERS.map((layer) => {
          const opacity = fade(progress, layer.in, layer.peak, layer.out);
          if (opacity <= 0.001) return null;

          const depth = layer.z * 15;
          const isActive = layer.id === activeLayer.id;

          return (
            <div
              key={layer.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity,
                transform: `translateZ(${depth * (isActive ? 1.1 : 0.9)}px)`,
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: `${65 - layer.z * 3}%`,
                  height: `${55 - layer.z * 2}%`,
                }}
              >
                <Image
                  src={layer.image}
                  alt={layer.label}
                  fill
                  className="object-cover"
                  style={{
                    filter: `saturate(0.75) sepia(0.06) contrast(1.06) brightness(${0.65 + layer.z * 0.03})`,
                  }}
                  sizes="80vw"
                />
                <div className="absolute inset-0 bg-void/30" />

                {/* Layer edge highlight */}
                <div
                  className="absolute inset-0 border border-linen/[0.04]"
                  style={{
                    boxShadow: isActive
                      ? "0 0 30px rgba(196,90,44,0.08), inset 0 0 30px rgba(196,90,44,0.03)"
                      : "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Build progress indicator — vertical stack ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[20] flex flex-col gap-3">
        {LAYERS.map((layer) => {
          const isPast = progress > layer.peak;
          const isActive = layer.id === activeLayer.id;
          return (
            <div key={layer.id} className="flex items-center gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-ember scale-150"
                    : isPast
                      ? "bg-linen/20"
                      : "bg-linen/6"
                }`}
              />
              <span
                className={`font-body text-[0.4rem] font-[400] tracking-[0.12em] transition-all duration-500 ${
                  isActive ? "text-ember" : isPast ? "text-linen/15" : "text-linen/6"
                }`}
              >
                {layer.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Content ── */}
      <div
        className="absolute inset-0 z-[20] flex flex-col justify-end pointer-events-none"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
        }}
      >
        <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60">
          BUILD
        </span>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[200] leading-[0.94] tracking-[-0.02em] text-linen mt-3">
          {buildComplete
            ? "Your kitchen,\nassembled."
            : `Layer ${activeLayer.z + 1} of ${LAYERS.length}`}
        </h2>
        <p className="font-body text-[clamp(0.75rem,0.9vw,0.9rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[360px] mt-6">
          {activeLayer.description}
        </p>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ background: vignette(25, 0.5) }}
      />
    </div>
  );
}
