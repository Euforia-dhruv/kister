"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { vignette, IMAGE_FILTERS } from "@/lib/motion";
import { MATERIALS } from "@/lib/brand";

/* ─── ACT 2: MATERIALS THAT LAST GENERATIONS ────────────── */
/* Premium material cards. Large photography. Craftsmanship    */
/* explanations. Each material tells a story.                  */

interface MaterialCard {
  id: string;
  name: string;
  image: string;
  brand: string;
  origin: string;
  story: string;
  quality: string;
}

const CARDS: MaterialCard[] = [
  {
    id: "marble",
    name: "MARBLES",
    image: "/images/materials/marble.jpg",
    brand: "Dekton / Natural Stone",
    origin: "Italy, Spain, India",
    story: "Each slab is unique — veined by millions of years of pressure. We hand-select every surface for its character, not its uniformity.",
    quality: "Heat-resistant. Scratch-proof. Timeless.",
  },
  {
    id: "copper",
    name: "COPPER",
    image: "/images/cookware/copper-pans.jpg",
    brand: "Mauviel, France",
    origin: "Villedieu-les-Poêles, Normandy",
    story: "Since 1830, Mauviel has forged copper in the same village. Every pan conducts heat with a precision that no aluminium can match.",
    quality: "2.5mm gauge. Hand-riveted. Lifetime guarantee.",
  },
  {
    id: "walnut",
    name: "AMERICAN WALNUT",
    image: "/images/cabinetry/04-front.jpg",
    brand: "Scavolini, Italy",
    origin: "North America, sustainably sourced",
    story: "Walnut ages like fine wine — deepening in colour, growing richer in grain. We choose it for kitchen fronts that warm with time.",
    quality: "Solid hardwood. Hand-oiled. Ages beautifully.",
  },
  {
    id: "brass",
    name: "BRASS",
    image: "/images/hardware/06-brass-detail.jpg",
    brand: "Various Artisans",
    origin: "England, Japan, India",
    story: "Unlacquered brass develops a living patina — a record of every hand that touches it. No two handles age the same way.",
    quality: "Living finish. Naturally antimicrobial.",
  },
  {
    id: "steel",
    name: "STAINLESS STEEL",
    image: "/images/materials/steel.jpg",
    brand: "Franke / Bosch",
    origin: "Switzerland, Germany",
    story: "304-grade surgical steel. Non-porous. Indestructible. The professional's choice, refined for the home kitchen.",
    quality: "18/10 grade. Corrosion-proof. Dishwasher safe.",
  },
  {
    id: "cast-iron",
    name: "CAST IRON",
    image: "/images/cookware/le-creuset.jpg",
    brand: "Le Creuset, France",
    origin: "Fresnoy-le-Grand, Picardy",
    story: "Since 1925, each Le Creuset piece is cast from a single mould, then hand-inspected. The enamel deepens with use — your kitchen's most loyal companion.",
    quality: "Lifetime warranty. Oven-safe to 260°C.",
  },
];

interface Act2Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act2Anatomy({ scrollProgress, actStart, actEnd }: Act2Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const containerOpacity = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Section header ── */}
      <SectionHeader progress={progress} />

      {/* ── Material cards ── */}
      <div className="absolute inset-0 z-[15]">
        {CARDS.map((card, i) => (
          <MaterialCardComponent key={card.id} card={card} index={i} progress={progress} />
        ))}
      </div>

      {/* ── Bottom craftsmanship note ── */}
      <motion.div
        className="absolute bottom-[clamp(24px,4vh,60px)] left-0 right-0 z-[30] flex flex-col items-center pointer-events-none"
        style={{ opacity: useTransform(progress, [0.85, 0.95, 1, 1], [0, 0.3, 0.3, 0]) }}
      >
        <span className="font-body text-[0.42rem] font-[300] tracking-[0.15em] text-linen/15">
          MATERIALS THAT LAST GENERATIONS
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
        02
      </span>
      <h2 className="font-display text-[clamp(1.8rem,4.5vw,3.8rem)] font-[100] tracking-[0.12em] text-linen/90 text-center">
        MATERIALS THAT<br />LAST GENERATIONS
      </h2>
      <motion.div
        className="mx-auto mt-4 h-[1px] bg-ember/30"
        style={{ width: useTransform(lineWidth, (v) => `${v * 80}px`) }}
      />
      <p className="font-body text-[clamp(0.7rem,1vw,0.9rem)] font-[300] tracking-[0.04em] text-smoke/35 mt-5 text-center max-w-[400px]">
        We choose materials that deserve the name.
      </p>
    </motion.div>
  );
}

/* ─── MATERIAL CARD ─────────────────────────────────────── */

function MaterialCardComponent({
  card,
  index,
  progress,
}: {
  card: MaterialCard;
  index: number;
  progress: MotionValue<number>;
}) {
  const cardStart = 0.14 + index * 0.14;
  const cardPeak = cardStart + 0.08;
  const cardEnd = cardStart + 0.16;

  const opacity = useTransform(progress, (v) => {
    if (v < cardStart || v > cardEnd) return 0;
    if (v < cardPeak) return (v - cardStart) / (cardPeak - cardStart);
    return 1 - (v - cardPeak) / (cardEnd - cardPeak);
  });

  const imageScale = useTransform(progress, (v) => {
    const localP = Math.min(Math.max((v - cardStart) / (cardEnd - cardStart), 0), 1);
    return 1.1 + Math.sin(localP * Math.PI) * -0.1;
  });

  const textX = useTransform(progress, (v) => {
    const localP = Math.min(Math.max((v - cardStart) / 0.08, 0), 1);
    return (1 - localP) * 30;
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="absolute inset-0 z-[20] flex items-center"
      style={{ opacity }}
    >
      <div className={`w-full h-full flex ${isEven ? "flex-row" : "flex-row-reverse"}`}>
        {/* ── Image ── */}
        <motion.div className="relative w-[55%] h-full hidden md:block" style={{ scale: imageScale }}>
          <Image
            src={card.image}
            alt={`${card.name} — ${card.brand}`}
            fill
            className="object-cover"
            style={{ filter: IMAGE_FILTERS.cinematic }}
            sizes="55vw"
          />
          <div className="absolute inset-0 bg-void/20" />
          <div
            className="absolute inset-0"
            style={{
              background: isEven
                ? "linear-gradient(to left, rgba(10,10,10,0.7) 0%, transparent 60%)"
                : "linear-gradient(to right, rgba(10,10,10,0.7) 0%, transparent 60%)",
            }}
          />
        </motion.div>

        {/* ── Content ── */}
        <div className="w-full md:w-[45%] h-full flex items-center">
          <motion.div
            className={`px-[clamp(32px,5vw,72px)] max-w-[500px] ${isEven ? "ml-auto mr-[clamp(32px,5vw,72px)]" : "ml-[clamp(32px,5vw,72px)]"}`}
            style={{ x: textX }}
          >
            <span className="font-body text-[0.45rem] font-[400] tracking-[0.2em] text-ember/40 block mb-3">
              {card.brand.toUpperCase()}
            </span>
            <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-[100] tracking-[0.08em] text-linen">
              {card.name}
            </h3>
            <div className="mt-4 h-[1px] w-10 bg-ember/25" />
            <p className="font-body text-[clamp(0.75rem,0.9vw,0.9rem)] font-[300] leading-[1.8] text-smoke/40 mt-5 max-w-[360px]">
              {card.story}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <span className="font-body text-[0.42rem] font-[400] tracking-[0.15em] text-smoke/25">
                {card.origin.toUpperCase()}
              </span>
              <span className="font-body text-[0.42rem] font-[300] tracking-[0.12em] text-ember/30">
                {card.quality}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden absolute inset-0 flex flex-col">
        <div className="relative w-full h-[45%]">
          <Image
            src={card.image}
            alt={`${card.name} — ${card.brand}`}
            fill
            className="object-cover"
            style={{ filter: IMAGE_FILTERS.cinematic }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-void/30" />
        </div>
        <div className="w-full h-[55%] flex items-center bg-void px-6">
          <div className="max-w-[420px]">
            <span className="font-body text-[0.45rem] font-[400] tracking-[0.2em] text-ember/40 block mb-2">
              {card.brand.toUpperCase()}
            </span>
            <h3 className="font-display text-[clamp(1.3rem,5vw,2rem)] font-[100] tracking-[0.08em] text-linen">
              {card.name}
            </h3>
            <div className="mt-3 h-[1px] w-8 bg-ember/25" />
            <p className="font-body text-[0.8rem] font-[300] leading-[1.8] text-smoke/40 mt-4">
              {card.story}
            </p>
            <div className="mt-4 flex flex-col gap-1.5">
              <span className="font-body text-[0.42rem] font-[400] tracking-[0.15em] text-smoke/25">
                {card.origin.toUpperCase()}
              </span>
              <span className="font-body text-[0.42rem] font-[300] tracking-[0.12em] text-ember/30">
                {card.quality}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
