"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { fade, vignette } from "@/lib/motion";
import { MotionText } from "@/components/site/MotionText";

/* ─── ACT 6: BUILD TIMELINE ─────────────────────────────── */

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

interface Act6Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act6BuildTimeline({ scrollProgress, actStart, actEnd }: Act6Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const containerOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  // Active layer index
  const activeLayerIndex = useTransform(progress, (v) => {
    let bestIdx = 0;
    let bestOp = 0;
    LAYERS.forEach((layer, i) => {
      const op = fade(v, layer.in, layer.peak, layer.out);
      if (op > bestOp) { bestOp = op; bestIdx = i; }
    });
    return bestIdx;
  });

  const buildComplete = useTransform(progress, (v) => v > 0.95);
  const activeLabel = useTransform(activeLayerIndex, (i) => LAYERS[i].label);
  const activeDescription = useTransform(activeLayerIndex, (i) => LAYERS[i].description);
  const layerCount = useTransform(activeLayerIndex, (i) => `Layer ${i + 1} of ${LAYERS.length}`);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Building layers — stacked with depth ── */}
      <div
        className="absolute inset-0"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
      >
        {LAYERS.map((layer, i) => (
          <BuildLayerCard key={layer.id} layer={layer} index={i} progress={progress} activeLayerIndex={activeLayerIndex} />
        ))}
      </div>

      {/* ── Build progress indicator — vertical stack ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[20] flex flex-col gap-3">
        {LAYERS.map((layer, i) => (
          <LayerIndicator key={layer.id} layer={layer} index={i} progress={progress} activeLayerIndex={activeLayerIndex} />
        ))}
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
          <MotionText value={useTransform(buildComplete, (v) => v ? "Your kitchen,\nassembled." : layerCount.get())} />
        </h2>
        <p className="font-body text-[clamp(0.75rem,0.9vw,0.9rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[360px] mt-6">
          <MotionText value={activeDescription} />
        </p>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ background: vignette(25, 0.5) }}
      />
    </motion.div>
  );
}

/* ─── BUILD LAYER CARD ──────────────────────────────────── */

function BuildLayerCard({ layer, index, progress, activeLayerIndex }: {
  layer: BuildLayer;
  index: number;
  progress: MotionValue<number>;
  activeLayerIndex: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (v) => fade(v, layer.in, layer.peak, layer.out));
  const isActive = useTransform(activeLayerIndex, (i) => i === index);
  const depth = layer.z * 15;
  const translateZ = useTransform(isActive, (a) => `translateZ(${depth * (a ? 1.1 : 0.9)}px)`);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity,
        transform: translateZ,
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
        <motion.div
          className="absolute inset-0 border border-linen/[0.04]"
          style={{
            boxShadow: useTransform(isActive, (a): string =>
              a ? "0 0 30px rgba(196,90,44,0.08), inset 0 0 30px rgba(196,90,44,0.03)" : "none"
            ),
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── LAYER INDICATOR ───────────────────────────────────── */

function LayerIndicator({ layer, index, progress, activeLayerIndex }: {
  layer: BuildLayer;
  index: number;
  progress: MotionValue<number>;
  activeLayerIndex: MotionValue<number>;
}) {
  const isPast = useTransform(progress, (v) => v > layer.peak);
  const isActive = useTransform(activeLayerIndex, (i) => i === index);
  const isActiveN = useTransform(isActive, (v): number => v ? 1 : 0);
  const isPastN = useTransform(isPast, (v): number => v ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-1.5 h-1.5 rounded-full transition-all duration-500"
        style={{
          backgroundColor: useTransform(
            [isActiveN, isPastN],
            ([active, past]): string =>
              active ? "#c45a2c" : past ? "rgba(245,240,235,0.2)" : "rgba(245,240,235,0.06)"
          ),
          scale: useTransform(isActive, (a): number => a ? 1.5 : 1),
        }}
      />
      <motion.span
        className="font-body text-[0.4rem] font-[400] tracking-[0.12em] transition-all duration-500"
        style={{
          color: useTransform(
            [isActiveN, isPastN],
            ([active, past]): string =>
              active ? "#c45a2c" : past ? "rgba(245,240,235,0.15)" : "rgba(245,240,235,0.06)"
          ),
        }}
      >
        {layer.label}
      </motion.span>
    </div>
  );
}
