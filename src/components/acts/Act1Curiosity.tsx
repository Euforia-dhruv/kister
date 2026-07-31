"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { easeInOutCubic, stagger, vignette } from "@/lib/motion";

/* ─── ACT 1: CURIOSITY ──────────────────────────────────── */
/* A stainless steel panel slowly separates, revealing         */
/* floating materials — wood, stone, glass, hardware.         */

interface FloatingMaterial {
  id: string;
  image: string;
  label: string;
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  scale: number;
}

const MATERIALS: FloatingMaterial[] = [
  { id: "walnut", image: "/images/cabinetry/02-handleless-design.jpg", label: "WALNUT", x: 15, y: 25, z: 80, rotateX: 12, rotateY: -8, scale: 0.9 },
  { id: "marble", image: "/images/materials/01-marble-countertop.jpg", label: "MARBLE", x: 72, y: 20, z: 120, rotateX: -5, rotateY: 15, scale: 1.1 },
  { id: "brass", image: "/images/materials/03-brass-detail.jpg", label: "BRASS", x: 28, y: 65, z: 60, rotateX: 8, rotateY: 12, scale: 0.75 },
  { id: "glass", image: "/images/materials/06-natural-finish.jpg", label: "GLASS", x: 78, y: 60, z: 100, rotateX: -10, rotateY: -5, scale: 0.85 },
  { id: "steel", image: "/images/materials/05-steel-finish.jpg", label: "STEEL", x: 50, y: 40, z: 140, rotateX: 3, rotateY: -12, scale: 1.0 },
  { id: "copper", image: "/images/materials/04-copper-patina.jpg", label: "COPPER", x: 40, y: 75, z: 70, rotateX: -8, rotateY: 6, scale: 0.8 },
];

interface Act1Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act1Curiosity({ scrollProgress, actStart, actEnd }: Act1Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);

  // Derived values — all MotionValues, no React re-renders
  const panelOffset = useTransform(progress, (v) => Math.min(Math.max((v - 0.05) / 0.55, 0), 1));
  const eased = useTransform(panelOffset, (v) => easeInOutCubic(v));
  const materialsOpacity = useTransform(progress, (v) => Math.max(0, (v - 0.3) / 0.4));
  const contentOpacity = useTransform(progress, (v) => Math.max(0, (v - 0.15) / 0.2));

  // Panel transforms
  const topPanelY = useTransform(eased, (v) => `translateY(${-v * 55}%)`);
  const bottomPanelY = useTransform(eased, (v) => `translateY(${v * 55}%)`);

  // Materials visibility
  const containerOpacity = useTransform(progress, (v) => Math.max(0, (v - 0.3) / 0.4));

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]) }}
    >
      {/* ── Floating materials (revealed as panel opens) ── */}
      <div
        className="absolute inset-0"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {MATERIALS.map((mat, i) => {
          return (
            <FloatingMaterialCard
              key={mat.id}
              mat={mat}
              index={i}
              progress={progress}
              eased={eased}
            />
          );
        })}
      </div>

      {/* ── Steel panels (separate on scroll) ── */}
      <div
        className="absolute inset-0 z-[20] pointer-events-none"
        style={{ perspective: "800px" }}
      >
        {/* Top panel */}
        <motion.div
          className="absolute top-0 left-0 right-0 overflow-hidden"
          style={{
            height: "50%",
            transformOrigin: "center bottom",
            y: useTransform(eased, (v) => -v * 55),
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #1a1a1a 0%, #222 40%, #1e1e1e 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 50%, transparent 90%)",
            }}
          />
        </motion.div>

        {/* Bottom panel */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{
            height: "50%",
            transformOrigin: "center top",
            y: useTransform(eased, (v) => v * 55),
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, #1a1a1a 0%, #222 40%, #1e1e1e 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)`,
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 50%, transparent 90%)",
            }}
          />
        </motion.div>
      </div>

      {/* ── Content overlay ── */}
      <motion.div
        className="absolute inset-0 z-[30] flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <span className="font-body text-[0.55rem] font-[400] tracking-[0.25em] text-ember/50 mb-6">
          WHAT LIES BENEATH
        </span>
        <h1 className="font-display text-[clamp(2rem,6vw,5rem)] font-[100] leading-[0.9] tracking-[-0.03em] text-linen text-center max-w-[600px]">
          <StaggeredReveal text="Every kitchen starts with a material." progress={progress} />
        </h1>
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[25] pointer-events-none"
        style={{ background: vignette(30, 0.6) }}
      />
    </motion.div>
  );
}

/* ─── STAGGERED TEXT REVEAL ────────────────────────────── */

function StaggeredReveal({ text, progress }: { text: string; progress: MotionValue<number> }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const wordOpacity = useTransform(progress, (v: number) => {
          const delay = stagger(i, words.length, 0.12);
          return Math.min(Math.max((v - (0.15 + delay)) / 0.1, 0), 1);
        });
        const wordY = useTransform(progress, (v: number) => {
          const delay = stagger(i, words.length, 0.12);
          const t = Math.min(Math.max((v - (0.15 + delay)) / 0.1, 0), 1);
          return (1 - t) * 12;
        });
        return (
          <span key={i} className="inline-block">
            <motion.span style={{ opacity: wordOpacity, y: wordY }} className="inline-block">
              {word}
            </motion.span>
            {i === 1 ? <br /> : i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

/* ─── FLOATING MATERIAL CARD ───────────────────────────── */

function FloatingMaterialCard({
  mat,
  index,
  progress,
  eased,
}: {
  mat: FloatingMaterial;
  index: number;
  progress: MotionValue<number>;
  eased: MotionValue<number>;
}) {
  const matProgress = useTransform(
    progress,
    (v) => Math.max(0, (v - 0.3 - index * 0.08) / 0.35)
  );
  const matOpacity = useTransform(matProgress, (v) => Math.min(v * 2, 1));
  const floatY = useTransform(
    progress,
    (v) => Math.sin(v * Math.PI * 2 + index) * 8
  );

  // Combine transforms
  const transform = useTransform(
    [eased, floatY],
    (values: number[]) => {
      const [e, fy] = values;
      return `translateZ(${mat.z * e}px) rotateX(${mat.rotateX * e}deg) rotateY(${mat.rotateY * e}deg) scale(${mat.scale}) translateY(${fy}px)`;
    }
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${mat.x}%`,
        top: `${mat.y}%`,
        width: "clamp(100px, 14vw, 180px)",
        height: "clamp(100px, 14vw, 180px)",
        transform,
        opacity: matOpacity,
        filter: `blur(${Math.min(mat.z * 0.003, 2)}px)`,
        willChange: "transform, opacity",
      }}
    >
      <div className="relative w-full h-full overflow-hidden group">
        <Image
          src={mat.image}
          alt={mat.label}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          style={{
            filter: "saturate(0.8) contrast(1.1) brightness(0.85)",
          }}
          sizes="200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/40">
            {mat.label}
          </span>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${135 + mat.rotateY}deg, rgba(255,255,255,0.08) 0%, transparent 50%)`,
          }}
        />
      </div>
    </motion.div>
  );
}
