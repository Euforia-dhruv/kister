"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { stagger, vignette } from "@/lib/motion";
import { BRAND, MATERIALS } from "@/lib/brand";

/* ─── ACT 1: CURIOSITY — THE KITSER OPENING ─────────────── */
/* Darkness. A line of light. The brand name. Then six real   */
/* Kitser materials emerge — cast iron, copper, stone, wood,  */
/* brass, steel — each from Kitser's actual product range.    */

interface FloatingMaterial {
  id: string;
  image: string;
  label: string;
  brand: string;
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  scale: number;
}

const FLOATING_MATERIALS: FloatingMaterial[] = [
  { id: "cast-iron", image: MATERIALS[0].image, label: "CAST IRON", brand: MATERIALS[0].brand, x: 12, y: 22, z: 80, rotateX: 12, rotateY: -8, scale: 0.9 },
  { id: "copper", image: MATERIALS[1].image, label: "COPPER", brand: MATERIALS[1].brand, x: 75, y: 18, z: 120, rotateX: -5, rotateY: 15, scale: 1.1 },
  { id: "stone", image: MATERIALS[2].image, label: "STONE", brand: MATERIALS[2].brand, x: 25, y: 62, z: 60, rotateX: 8, rotateY: 12, scale: 0.75 },
  { id: "walnut", image: MATERIALS[3].image, label: "WALNUT", brand: MATERIALS[3].brand, x: 80, y: 58, z: 100, rotateX: -10, rotateY: -5, scale: 0.85 },
  { id: "brass", image: MATERIALS[4].image, label: "BRASS", brand: MATERIALS[4].brand, x: 50, y: 38, z: 140, rotateX: 3, rotateY: -12, scale: 1.0 },
  { id: "steel", image: MATERIALS[5].image, label: "STEEL", brand: MATERIALS[5].brand, x: 38, y: 75, z: 70, rotateX: -8, rotateY: 6, scale: 0.8 },
];

interface Act1Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act1Curiosity({ scrollProgress, actStart, actEnd }: Act1Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);

  /* ── Timing phases ── */
  // 0.00–0.05: Darkness, light slit appears
  // 0.05–0.15: Brand name reveals
  // 0.15–0.25: Brand voice quote
  // 0.25–1.00: Material cards float in

  const lightLineOpacity = useTransform(progress, [0, 0.02, 0.05, 0.12], [0, 0, 1, 0.6]);
  const lightLineScaleX = useTransform(progress, [0, 0.05], [0, 1]);
  const lightLineScaleY = useTransform(progress, [0.05, 0.1], [1, 40]);

  const brandOpacity = useTransform(progress, [0.06, 0.1, 0.18, 0.22], [0, 1, 1, 0]);
  const brandY = useTransform(progress, [0.06, 0.1], [20, 0]);

  const quoteOpacity = useTransform(progress, [0.14, 0.18, 0.28, 0.32], [0, 1, 1, 0]);
  const quoteY = useTransform(progress, [0.14, 0.18], [15, 0]);

  const materialsContainerOpacity = useTransform(progress, (v) => Math.max(0, (v - 0.28) / 0.12));

  const containerOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Light slit (Threshold) ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-[10] pointer-events-none"
        style={{
          width: "60vw",
          height: "1px",
          marginLeft: "-30vw",
          marginTop: "-0.5px",
          opacity: lightLineOpacity,
          scaleX: lightLineScaleX,
          scaleY: lightLineScaleY,
          background: "linear-gradient(90deg, transparent 0%, rgba(196,90,44,0.6) 30%, rgba(196,90,44,0.8) 50%, rgba(196,90,44,0.6) 70%, transparent 100%)",
          boxShadow: "0 0 30px rgba(196,90,44,0.3), 0 0 60px rgba(196,90,44,0.15)",
        }}
      />

      {/* ── Brand name reveal ── */}
      <motion.div
        className="absolute inset-0 z-[20] flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: brandOpacity, y: brandY }}
      >
        <h1
          className="font-display text-[clamp(2.5rem,8vw,6rem)] font-[100] tracking-[0.2em] text-linen"
          style={{ letterSpacing: "0.2em" }}
        >
          {BRAND.name.toUpperCase()}
        </h1>
        <span className="font-body text-[0.6rem] font-[300] tracking-[0.25em] text-ember/70 mt-4">
          {BRAND.tagline.toUpperCase()}
        </span>
      </motion.div>

      {/* ── Brand voice quote ── */}
      <motion.div
        className="absolute inset-0 z-[20] flex flex-col items-center justify-center pointer-events-none px-8"
        style={{ opacity: quoteOpacity, y: quoteY }}
      >
        <p className="font-body text-[clamp(0.9rem,2vw,1.4rem)] font-[300] leading-[1.8] text-linen/70 text-center max-w-[520px]">
          Some things <em className="text-ember/90 not-italic font-[400]">cannot be rushed</em>. A knife learns your hand.
          Iron remembers your meals. Stone holds the temperature of your intention.
        </p>
      </motion.div>

      {/* ── Floating material cards ── */}
      <motion.div
        className="absolute inset-0 z-[15]"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          opacity: materialsContainerOpacity,
        }}
      >
        {FLOATING_MATERIALS.map((mat, i) => (
          <FloatingMaterialCard
            key={mat.id}
            mat={mat}
            index={i}
            progress={progress}
          />
        ))}
      </motion.div>

      {/* ── Brand logos showcase ── */}
      <motion.div
        className="absolute bottom-[clamp(60px,12vh,140px)] left-0 right-0 z-[25] flex flex-col items-center pointer-events-none"
        style={{ opacity: useTransform(progress, [0.65, 0.75, 0.92, 1], [0, 0.6, 0.6, 0]) }}
      >
        <div className="flex items-center gap-8 md:gap-12">
          {["Scavolini", "Le Creuset", "Bosch", "Miele", "Blum", "BLANCO"].map((name, i) => (
            <BrandLogo key={name} name={name} index={i} progress={progress} />
          ))}
        </div>
        <span className="font-body text-[0.45rem] font-[300] tracking-[0.2em] text-smoke/20 mt-6">
          35+ BRANDS. 12 COUNTRIES. ONE STANDARD.
        </span>
      </motion.div>

      {/* ── Kitser pillars (bottom) ── */}
      <motion.div
        className="absolute bottom-[clamp(16px,3vh,40px)] left-0 right-0 z-[25] flex justify-center gap-8 pointer-events-none"
        style={{ opacity: useTransform(progress, [0.75, 0.85, 0.95, 1], [0, 0.4, 0.4, 0]) }}
      >
        {["CRAFT", "MATERIAL", "LIGHT", "PRECISION", "RITUAL", "WARMTH"].map((pillar) => (
          <span key={pillar} className="font-body text-[0.4rem] font-[300] tracking-[0.2em] text-linen/15">
            {pillar}
          </span>
        ))}
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[22] pointer-events-none"
        style={{ background: vignette(30, 0.6) }}
      />
    </motion.div>
  );
}

/* ─── FLOATING MATERIAL CARD ───────────────────────────── */

function FloatingMaterialCard({
  mat,
  index,
  progress,
}: {
  mat: FloatingMaterial;
  index: number;
  progress: MotionValue<number>;
}) {
  const matProgress = useTransform(
    progress,
    (v) => Math.max(0, (v - 0.3 - index * 0.06) / 0.3)
  );
  const matOpacity = useTransform(matProgress, (v) => Math.min(v * 2, 1));
  const matScale = useTransform(matProgress, (v) => 0.8 + Math.min(v, 1) * 0.2);
  const floatY = useTransform(
    progress,
    (v) => Math.sin(v * Math.PI * 2 + index) * 8
  );

  const transform = useTransform(
    [matProgress, floatY, matScale],
    (values: number[]) => {
      const [p, fy, s] = values;
      const e = Math.min(p, 1);
      return `translateZ(${mat.z * e}px) rotateX(${mat.rotateX * e}deg) rotateY(${mat.rotateY * e}deg) scale(${s}) translateY(${fy}px)`;
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
          alt={`${mat.label} — ${mat.brand}`}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          style={{
            filter: "saturate(0.85) contrast(1.1) brightness(0.85)",
          }}
          sizes="200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/50 block">
            {mat.label}
          </span>
          <span className="font-body text-[0.45rem] font-[300] tracking-[0.15em] text-ember/50 block mt-0.5">
            {mat.brand}
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

/* ─── BRAND LOGO (text-based, treated as art) ────────────── */

function BrandLogo({ name, index, progress }: { name: string; index: number; progress: MotionValue<number> }) {
  const delay = index * 0.04;
  const opacity = useTransform(progress, (v) => {
    const t = Math.min(Math.max((v - 0.72 - delay) / 0.1, 0), 1);
    return Math.min(t * 2, 1) * 0.5;
  });

  return (
    <motion.span
      className="font-display text-[clamp(0.55rem,0.9vw,0.8rem)] font-[200] tracking-[0.15em] text-linen/30"
      style={{ opacity }}
    >
      {name}
    </motion.span>
  );
}
