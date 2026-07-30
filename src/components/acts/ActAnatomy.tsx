"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useTransform, type MotionValue } from "motion/react";

// ACT 2: ANATOMY
// Kitchen exploded into parts. Scroll drives the explosion.
// Hover isolates. Click flies camera in.

interface KitchenPart {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  explodeX: number;
  explodeY: number;
  image: string;
  detail: {
    title: string;
    brand: string;
    description: string;
    specs: string[];
  };
}

const PARTS: KitchenPart[] = [
  {
    id: "cabinets", label: "CABINETS",
    x: 8, y: 15, w: 22, h: 45,
    explodeX: -30, explodeY: -20,
    image: "/images/cabinetry/02-handleless-design.jpg",
    detail: {
      title: "Cabinetry System",
      brand: "Scavolini",
      description: "Italian-engineered modular cabinetry. Push-to-open, soft-close, handleless design.",
      specs: ["18mm marine ply", "PU lacquer finish", "Blumotion hinges", "10-year warranty"],
    },
  },
  {
    id: "appliances", label: "APPLIANCES",
    x: 35, y: 20, w: 16, h: 35,
    explodeX: 5, explodeY: -30,
    image: "/images/appliances/miele-gen7000-lifestyle.jpg",
    detail: {
      title: "Appliance Suite",
      brand: "Miele / Bosch",
      description: "Precision German engineering. 20-year tested. Seamlessly integrated.",
      specs: ["Generation 7000", "FlexInduction", "Steam Combi", "Pyrolytic self-clean"],
    },
  },
  {
    id: "countertop", label: "COUNTERTOP",
    x: 25, y: 48, w: 40, h: 10,
    explodeX: 0, explodeY: 18,
    image: "/images/materials/01-marble-countertop.jpg",
    detail: {
      title: "Work Surface",
      brand: "Dekton / Caesarstone",
      description: "Ultra-compact surface. Scratch-proof. Stain-proof. UV-resistant.",
      specs: ["Zero porosity", "Heat resistant", "UV stable", "20mm thickness"],
    },
  },
  {
    id: "sink", label: "SINK",
    x: 58, y: 44, w: 12, h: 14,
    explodeX: 22, explodeY: -18,
    image: "/images/hardware/sinks-hero.jpg",
    detail: {
      title: "Sink System",
      brand: "BLANCO / Franke",
      description: "80% natural granite composite. Heat-resistant to 280°C.",
      specs: ["SILGRANIT", "Undermount", "280°C heat-proof", "Anti-bacterial"],
    },
  },
  {
    id: "hardware", label: "HARDWARE",
    x: 10, y: 38, w: 8, h: 18,
    explodeX: -45, explodeY: 5,
    image: "/images/hardware/02-drawer-system.jpg",
    detail: {
      title: "Hardware System",
      brand: "Blum",
      description: "The invisible backbone. Soft-close at any position. Silent precision.",
      specs: ["LEGRABOX", "Dynamic load 70kg", "Tip-on Blumotion", "3D adjustment"],
    },
  },
  {
    id: "lighting", label: "LIGHTING",
    x: 20, y: 10, w: 50, h: 7,
    explodeX: 0, explodeY: -35,
    image: "/images/hardware/04-hero.jpg",
    detail: {
      title: "Lighting System",
      brand: "Hafele",
      description: "CRI 95+ colour rendering. Dimmable warm white. Light that makes materials sing.",
      specs: ["3000K warm white", "CRI 95+", "Dimmable", "LED strip + spot"],
    },
  },
  {
    id: "storage", label: "STORAGE",
    x: 5, y: 55, w: 15, h: 25,
    explodeX: -40, explodeY: 22,
    image: "/images/hardware/storage-hero.jpg",
    detail: {
      title: "Storage Solutions",
      brand: "Kesseböhmer",
      description: "Every centimetre used. Nothing wasted.",
      specs: ["Corner optimizer", "Pull-out pantry", "Cutlery dividers", "Lazy susan"],
    },
  },
  {
    id: "accessories", label: "FINISHING",
    x: 75, y: 28, w: 14, h: 18,
    explodeX: 35, explodeY: -12,
    image: "/images/materials/03-brass-detail.jpg",
    detail: {
      title: "Finishing Touches",
      brand: "Various",
      description: "Unlacquered brass. Floating walnut. Leather bar stools.",
      specs: ["Brass handles", "Open shelving", "Bar seating", "Custom knobs"],
    },
  },
];

function ExplodedPart({
  part,
  index,
  progress,
  explosionProgress,
  hovered,
  selected,
  onHover,
  onLeave,
  onClick,
}: {
  part: KitchenPart;
  index: number;
  progress: MotionValue<number>;
  explosionProgress: MotionValue<number>;
  hovered: string | null;
  selected: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
  onClick: (id: string) => void;
}) {
  const delay = index * 0.03;
  const tx = useTransform(explosionProgress, [0, 1], [0, part.explodeX]);
  const ty = useTransform(explosionProgress, [0, 1], [0, part.explodeY]);
  const partOpacity = useTransform(progress, [0.05 + delay, 0.15 + delay], [0, 1]);
  const isHovered = hovered === part.id;
  const isSelected = selected === part.id;
  const isFaded = hovered !== null && !isHovered && !isSelected;

  return (
    <motion.div
      className="absolute z-[10] cursor-pointer"
      style={{
        left: `${part.x}%`,
        top: `${part.y}%`,
        width: `${part.w}%`,
        height: `${part.h}%`,
        x: tx,
        y: ty,
        opacity: partOpacity,
      }}
      onMouseEnter={() => onHover(part.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(part.id)}
      data-cursor-label={part.label}
    >
      <motion.div
        className="absolute inset-0 transition-all duration-500"
        style={{
          border: `1px solid rgba(196,90,44,${isHovered || isSelected ? 0.4 : 0.08})`,
          backgroundColor: isHovered ? "rgba(196,90,44,0.04)" : "rgba(196,90,44,0)",
          opacity: isFaded ? 0.3 : 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <span className="font-body text-[8px] font-[400] tracking-[0.2em] text-ember/80 uppercase">
          {part.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function ActAnatomy({ progress }: { progress: MotionValue<number> }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const explosionProgress = useTransform(progress, [0.1, 0.5], [0, 1]);
  const bgOpacity = useTransform(progress, [0, 0.1], [0, 1]);
  const labelOpacity = useTransform(progress, [0.3, 0.45], [0, 1]);

  const selectedPart = useMemo(() => PARTS.find(p => p.id === selected) || null, [selected]);

  const handleClick = useCallback((id: string) => {
    setSelected(prev => prev === id ? null : id);
  }, []);

  return (
    <div className="relative w-full h-full bg-void">
      <motion.div className="absolute inset-0 z-[1]" style={{ opacity: bgOpacity }}>
        <Image
          src="/images/kitchens/scavolini-poetica-hero.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "saturate(0.6) brightness(0.3) contrast(1.1)" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/40" />
      </motion.div>

      <motion.div className="absolute top-8 left-8 md:left-12 z-[25]" style={{ opacity: labelOpacity }}>
        <span className="editorial-caption">ACT II</span>
        <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-[200] tracking-[-0.01em] text-linen/80 mt-2">
          Anatomy of a Kitchen
        </h2>
        <p className="font-body text-[11px] font-[300] text-smoke/40 mt-2 max-w-xs">
          Eight systems. One machine. Hover to isolate. Click to explore.
        </p>
      </motion.div>

      {PARTS.map((part, i) => (
        <ExplodedPart
          key={part.id}
          part={part}
          index={i}
          progress={progress}
          explosionProgress={explosionProgress}
          hovered={hovered}
          selected={selected}
          onHover={setHovered}
          onLeave={() => setHovered(null)}
          onClick={handleClick}
        />
      ))}

      <AnimatePresence>
        {selectedPart && (
          <motion.div
            key={selectedPart.id}
            initial={{ x: -380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -380, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 h-full w-[360px] max-w-[85vw] z-[30]"
          >
            <div className="h-full backdrop-blur-[20px] bg-void/70 border-r border-linen/6 overflow-y-auto">
              <div className="p-8 md:p-10">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 w-7 h-7 border border-linen/8 flex items-center justify-center text-linen/30 hover:text-linen/60 hover:border-linen/15 transition-all duration-500"
                >
                  <span className="text-[10px]">×</span>
                </button>
                <div className="relative aspect-[4/3] overflow-hidden mb-6 -mx-2 md:-mx-4">
                  <Image src={selectedPart.image} alt={selectedPart.detail.title} fill className="object-cover img-grade" sizes="360px" />
                  <div className="absolute inset-0 img-warm img-vignette" />
                </div>
                <div className="mb-6">
                  <span className="editorial-caption">{selectedPart.detail.brand}</span>
                  <h3 className="font-display text-xl font-[200] tracking-[-0.02em] text-linen leading-[1.15] mt-2">{selectedPart.detail.title}</h3>
                </div>
                <p className="font-body text-[12px] font-[300] leading-[1.8] text-smoke/50 mb-6">{selectedPart.detail.description}</p>
                <div className="border-t border-linen/4 pt-5">
                  <span className="editorial-label text-[7px] mb-3 block">SPECIFICATIONS</span>
                  <div className="flex flex-col gap-2.5">
                    {selectedPart.detail.specs.map((spec) => (
                      <span key={spec} className="font-body text-[11px] font-[300] text-linen/45 flex items-center gap-2">
                        <span className="w-1 h-px bg-ember/40" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="absolute bottom-8 right-8 md:right-12 z-[20]" style={{ opacity: labelOpacity }}>
        <span className="font-display text-[clamp(2rem,5vw,3.5rem)] font-[100] text-ember/30">8</span>
        <span className="block font-body text-[8px] font-[300] tracking-[0.15em] text-smoke/30 uppercase mt-1">Systems</span>
      </motion.div>
    </div>
  );
}
