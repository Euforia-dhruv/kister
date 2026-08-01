"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { vignette } from "@/lib/motion";

/* ─── ACT 1: CRAFTED, NOT MANUFACTURED ──────────────────── */
/* Editorial magazine layout. Alternating image/typography     */
/* blocks. Real Kitser imagery. Premium editorial feel.        */

interface EditorialBlock {
  id: string;
  image: string;
  imageAlt: string;
  headline: string;
  body: string;
  align: "left" | "right";
  imagePosition: "top" | "bottom" | "side";
}

const BLOCKS: EditorialBlock[] = [
  {
    id: "kitchens",
    image: "/images/kitchens/scavolini-delinea-hero.jpg",
    imageAlt: "Scavolini DeLinea modular kitchen — handleless elegance",
    headline: "Crafted,\nNot Manufactured.",
    body: "Every Kitser kitchen begins with a conversation. Not a catalogue. Your space. Your habits. Your life. Then the design — drawn by hand, refined by decades of instinct.",
    align: "left",
    imagePosition: "side",
  },
  {
    id: "detail",
    image: "/images/kitchens/scavolini-poetica-hero.jpg",
    imageAlt: "Scavolini Poetica — where tradition meets contemporary",
    headline: "Precision\nYou Can Feel.",
    body: "The weight of a Blum drawer. The silence of a soft-close hinge. The warmth of walnut under your fingertips. These are the details that separate a kitchen from a Kitser kitchen.",
    align: "right",
    imagePosition: "side",
  },
  {
    id: "scavolini",
    image: "/images/kitchens/scavolini-carattere-hero.jpg",
    imageAlt: "Scavolini Carattere — bold Italian character",
    headline: "Italian Design.\nLocal Soul.",
    body: "Scavolini. Dekton. Le Creuset. Bosch. We bring the world's finest to Coimbatore — and build around you.",
    align: "left",
    imagePosition: "side",
  },
];

interface Act1Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act1Curiosity({ scrollProgress, actStart, actEnd }: Act1Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const containerOpacity = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Editorial header ── */}
      <EditorialHeader progress={progress} />

      {/* ── Editorial blocks ── */}
      {BLOCKS.map((block, i) => (
        <EditorialBlock key={block.id} block={block} index={i} progress={progress} />
      ))}

      {/* ── Bottom brand mark ── */}
      <motion.div
        className="absolute bottom-[clamp(24px,4vh,60px)] left-0 right-0 z-[30] flex flex-col items-center pointer-events-none"
        style={{ opacity: useTransform(progress, [0.85, 0.95, 1, 1], [0, 0.4, 0.4, 0]) }}
      >
        <span className="font-display text-[0.6rem] font-[100] tracking-[0.3em] text-linen/20">
          KITSER
        </span>
        <span className="font-body text-[0.42rem] font-[300] tracking-[0.15em] text-linen/10 mt-1">
          ALL ABOUT KITCHENS
        </span>
      </motion.div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[35] pointer-events-none"
        style={{ background: vignette(20, 0.5) }}
      />
    </motion.div>
  );
}

/* ─── EDITORIAL HEADER ──────────────────────────────────── */

function EditorialHeader({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.06, 0.18, 0.24], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.06], [30, 0]);
  const lineWidth = useTransform(progress, [0.02, 0.08], [0, 1]);

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 z-[25] flex flex-col items-center pt-[clamp(60px,12vh,140px)] pointer-events-none"
      style={{ opacity, y }}
    >
      <div className="text-center">
        <span className="font-body text-[0.5rem] font-[400] tracking-[0.25em] text-ember/50 block mb-4">
          EST. {1989}
        </span>
        <h1 className="font-display text-[clamp(2rem,6vw,5rem)] font-[100] tracking-[0.15em] text-linen/90">
          KITSER
        </h1>
        <motion.div
          className="mx-auto mt-4 h-[1px] bg-ember/40"
          style={{
            width: useTransform(lineWidth, (v) => `${v * 120}px`),
          }}
        />
        <p className="font-display text-[clamp(0.8rem,1.8vw,1.3rem)] font-[200] tracking-[0.04em] text-linen/50 mt-5">
          Crafted Kitchens. Designed Around Living.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── EDITORIAL BLOCK ───────────────────────────────────── */

function EditorialBlock({
  block,
  index,
  progress,
}: {
  block: EditorialBlock;
  index: number;
  progress: MotionValue<number>;
}) {
  const blockStart = 0.2 + index * 0.26;
  const blockPeak = blockStart + 0.12;
  const blockEnd = blockStart + 0.28;

  const opacity = useTransform(progress, (v) => {
    if (v < blockStart || v > blockEnd) return 0;
    if (v < blockPeak) return (v - blockStart) / (blockPeak - blockStart);
    return 1 - (v - blockPeak) / (blockEnd - blockPeak);
  });

  const imageScale = useTransform(progress, (v) => {
    const localP = Math.min(Math.max((v - blockStart) / (blockEnd - blockStart), 0), 1);
    return 1.05 + Math.sin(localP * Math.PI) * -0.05;
  });

  const textY = useTransform(progress, (v) => {
    const localP = Math.min(Math.max((v - blockStart) / 0.12, 0), 1);
    return (1 - localP) * 25;
  });

  const isRight = block.align === "right";

  return (
    <motion.div
      className="absolute inset-0 z-[20] flex items-center"
      style={{ opacity }}
    >
      <div className={`w-full h-full flex ${isRight ? "flex-row-reverse" : "flex-row"}`}>
        {/* ── Image side ── */}
        <motion.div
          className="relative w-1/2 h-full hidden md:block"
          style={{ scale: imageScale }}
        >
          <Image
            src={block.image}
            alt={block.imageAlt}
            fill
            className="object-cover"
            style={{
              filter: "saturate(0.8) contrast(1.05) brightness(0.75)",
            }}
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-void/30" />
          <div
            className="absolute inset-0"
            style={{
              background: isRight
                ? "linear-gradient(to right, rgba(10,10,10,0.6) 0%, transparent 50%)"
                : "linear-gradient(to left, rgba(10,10,10,0.6) 0%, transparent 50%)",
            }}
          />
        </motion.div>

        {/* ── Text side ── */}
        <div className="w-full md:w-1/2 h-full flex items-center">
          <motion.div
            className={`px-[clamp(32px,6vw,80px)] max-w-[560px] ${isRight ? "ml-auto mr-[clamp(32px,6vw,80px)]" : "ml-[clamp(32px,6vw,80px)]"}`}
            style={{ y: textY }}
          >
            <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-ember/50 block mb-4">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-[200] leading-[1.05] tracking-[-0.01em] text-linen whitespace-pre-line">
              {block.headline}
            </h2>
            <div className="mt-6 h-[1px] w-12 bg-ember/30" />
            <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] font-[300] leading-[1.8] text-smoke/40 mt-6 max-w-[380px]">
              {block.body}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden absolute inset-0 flex flex-col">
        <div className="relative w-full h-1/2">
          <Image
            src={block.image}
            alt={block.imageAlt}
            fill
            className="object-cover"
            style={{ filter: "saturate(0.8) contrast(1.05) brightness(0.75)" }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-void/40" />
        </div>
        <div className="w-full h-1/2 flex items-center bg-void">
          <div className="px-6 max-w-[480px]">
            <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-ember/50 block mb-3">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="font-display text-[clamp(1.5rem,6vw,2.5rem)] font-[200] leading-[1.05] tracking-[-0.01em] text-linen whitespace-pre-line">
              {block.headline}
            </h2>
            <div className="mt-4 h-[1px] w-10 bg-ember/30" />
            <p className="font-body text-[0.85rem] font-[300] leading-[1.8] text-smoke/40 mt-4">
              {block.body}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
