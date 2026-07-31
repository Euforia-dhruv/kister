"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { fade, vignette } from "@/lib/motion";
import { MotionText } from "@/components/site/MotionText";
import { BUILD_LAYERS } from "@/lib/brand";

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

const LAYERS: BuildLayer[] = BUILD_LAYERS.map((layer, i) => ({
  id: layer.id,
  label: layer.label,
  image: layer.image,
  description: layer.description,
  z: i,
  in: i * 0.12,
  peak: i * 0.12 + 0.08,
  out: i * 0.12 + 0.18,
}));

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

      {/* Completion glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[16] pointer-events-none h-[40%]"
        style={{
          opacity: useTransform(buildComplete, (v) => v ? 1 : 0),
          boxShadow: "0 -40px 80px rgba(196,90,44,0.1)",
        }}
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
            filter: `saturate(0.75) sepia(0.06) contrast(1.06) brightness(${0.65 + layer.z * 0.03}) blur(${Math.min(layer.z * 0.3, 2)}px)`,
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
