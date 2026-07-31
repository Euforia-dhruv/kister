"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";
import { MotionText } from "@/components/site/MotionText";

/* ─── ACT 2: ANATOMY ────────────────────────────────────── */

interface Part {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  w: number;
  h: number;
  explodeX: number;
  explodeY: number;
  detail: string;
  brand: string;
}

const PARTS: Part[] = [
  { id: "cabinet-upper", label: "UPPER CABINETS", category: "CABINETRY", x: 8, y: 8, w: 25, h: 18, explodeX: -35, explodeY: -25, detail: "Scavolini DeLinea handleless system. Push-to-open mechanisms.", brand: "Scavolini" },
  { id: "cabinet-lower", label: "LOWER CABINETS", category: "CABINETRY", x: 8, y: 52, w: 25, h: 22, explodeX: -40, explodeY: 20, detail: "Soft-close hinges. Full-extension drawers.", brand: "Scavolini" },
  { id: "countertop", label: "COUNTERTOP", category: "SURFACE", x: 6, y: 42, w: 55, h: 8, explodeX: 0, explodeY: -30, detail: "Dekton ultra-compact surface. Scratch-proof. Stain-proof.", brand: "Dekton" },
  { id: "sink", label: "SINK", category: "WATER", x: 52, y: 38, w: 12, h: 12, explodeX: 25, explodeY: -20, detail: "BLANCO SILGRANIT. 80% natural granite.", brand: "BLANCO" },
  { id: "tap", label: "TAP", category: "WATER", x: 56, y: 28, w: 6, h: 14, explodeX: 30, explodeY: -30, detail: "BLANCO Culina. Dual spray. 360° rotation.", brand: "BLANCO" },
  { id: "oven", label: "OVEN", category: "APPLIANCE", x: 35, y: 18, w: 14, h: 20, explodeX: -15, explodeY: -35, detail: "Miele Generation 7000. Self-cleaning. Precision temperature.", brand: "Miele" },
  { id: "cooktop", label: "COOKTOP", category: "APPLIANCE", x: 35, y: 42, w: 18, h: 8, explodeX: 10, explodeY: -25, detail: "Bosch FlexInduction. Variable cooking zones.", brand: "Bosch" },
  { id: "hood", label: "EXHAUST HOOD", category: "VENTILATION", x: 35, y: 5, w: 18, h: 12, explodeX: 5, explodeY: -40, detail: "Integrated extractor. 650m³/h airflow.", brand: "Bosch" },
  { id: "drawer-1", label: "DRAWER SYSTEM", category: "HARDWARE", x: 10, y: 55, w: 10, h: 8, explodeX: -45, explodeY: 25, detail: "Blum LEGRABOX. Silent smooth-close. 40kg capacity.", brand: "Blum" },
  { id: "drawer-2", label: "CUTLERY DRAWER", category: "HARDWARE", x: 22, y: 55, w: 10, h: 8, explodeX: -35, explodeY: 30, detail: "Blum organizational system. Custom dividers.", brand: "Blum" },
  { id: "hinge-1", label: "HINGE SYSTEM", category: "HARDWARE", x: 7, y: 28, w: 4, h: 6, explodeX: -50, explodeY: 0, detail: "Blum Clips top Blumotion. Integrated soft-close.", brand: "Blum" },
  { id: "lighting-1", label: "TASK LIGHTING", category: "LIGHTING", x: 12, y: 26, w: 20, h: 3, explodeX: -20, explodeY: -35, detail: "LED strip 3000K. CRI 95+. Dimmable.", brand: "Hafele" },
  { id: "lighting-2", label: "DISPLAY LIGHTING", category: "LIGHTING", x: 60, y: 10, w: 15, h: 3, explodeX: 25, explodeY: -35, detail: "Recessed LED. Warm white. Accent illumination.", brand: "Hafele" },
  { id: "handle-1", label: "BRASS HANDLES", category: "FINISH", x: 14, y: 44, w: 3, h: 8, explodeX: -50, explodeY: 10, detail: "Unlacquered brass. Living finish. Natural patina.", brand: "Various" },
  { id: "shelf", label: "OPEN SHELVING", category: "STORAGE", x: 65, y: 15, w: 18, h: 10, explodeX: 30, explodeY: -20, detail: "American black walnut. Floating brackets.", brand: "Scavolini" },
  { id: "fridge", label: "REFRIGERATOR", category: "APPLIANCE", x: 75, y: 15, w: 16, h: 35, explodeX: 35, explodeY: -10, detail: "Integrated column refrigerator. Custom panel-ready.", brand: "Miele" },
  { id: "pantry", label: "PULL-OUT PANTRY", category: "STORAGE", x: 78, y: 52, w: 12, h: 20, explodeX: 35, explodeY: 20, detail: "Kesseböhmer LeMans. Corner optimizer. Full access.", brand: "Kesseböhmer" },
  { id: "splashback", label: "SPLASHBACK", category: "SURFACE", x: 8, y: 28, w: 50, h: 14, explodeX: -5, explodeY: -20, detail: "Dekton ultra-heat resistant. Seamless installation.", brand: "Dekton" },
];

const CATEGORIES = [...new Set(PARTS.map((p) => p.category))];

/* ─── DETAIL PANEL ──────────────────────────────────────── */

function DetailPanel({ part, onClose }: { part: Part; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -400, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 h-full w-[360px] max-w-[85vw] z-[50]"
    >
      <div className="h-full backdrop-blur-[20px] bg-void/70 border-r border-linen/6 overflow-y-auto">
        <div className="p-8 md:p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-7 h-7 border border-linen/8 flex items-center justify-center text-linen/30 hover:text-linen/60 transition-all duration-500"
          >
            <span className="text-[10px]">×</span>
          </button>
          <span className="block font-body text-[8px] font-[400] tracking-[0.2em] text-ember/60 uppercase mb-2">
            {part.brand}
          </span>
          <h3 className="font-display text-xl font-[200] tracking-[-0.02em] text-linen leading-[1.15]">
            {part.label}
          </h3>
          <p className="font-body text-[12px] font-[300] leading-[1.75] text-smoke/50 mt-6">
            {part.detail}
          </p>
          <div className="mt-8 pt-6 border-t border-linen/4">
            <span className="font-body text-[8px] font-[400] tracking-[0.2em] text-smoke/30 uppercase">
              Category
            </span>
            <p className="font-body text-[11px] font-[300] text-linen/50 mt-1">
              {part.category}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────── */

interface Act2Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act2Anatomy({ scrollProgress, actStart, actEnd }: Act2Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const explodeAmount = useTransform(progress, (v) => Math.min(v / 0.5, 1));
  const contentOpacity = useTransform(progress, (v) => Math.max(0, (v - 0.05) / 0.15));
  const labelOpacity = useTransform(progress, (v) => Math.max(0, (v - 0.3) / 0.15));
  const containerOpacity = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
  const headlineText = useTransform(explodeAmount, (v) =>
    v < 0.5 ? "Every kitchen\nhas a skeleton." : "Hover to isolate.\nClick to enter."
  );

  const handlePartHover = useCallback((id: string | null) => setHovered(id), []);
  const handlePartClick = useCallback((id: string) => { setActive(id); setPanelOpen(true); }, []);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = useCallback(() => {
    setPanelOpen(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActive(null), 500);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const activePart = active ? PARTS.find((p) => p.id === active) : null;

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Background kitchen image ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/kitchens/scavolini-poetica-hero.jpg"
          alt="Scavolini Poetica kitchen — full view"
          fill
          className="object-cover"
          style={{
            filter: "saturate(0.7) sepia(0.08) contrast(1.05) brightness(0.7)",
          }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/40" />
      </div>

      {/* ── Exploded parts ── */}
      <div className="absolute inset-0 z-[10]">
        {PARTS.map((part) => (
          <ExplodedPart
            key={part.id}
            part={part}
            explodeAmount={explodeAmount}
            hovered={hovered}
            active={active}
            onHover={handlePartHover}
            onClick={handlePartClick}
          />
        ))}

        {/* ── Connection lines ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
          {PARTS.map((part) => (
            <ConnectionLine key={`line-${part.id}`} part={part} explodeAmount={explodeAmount} />
          ))}
        </svg>
      </div>

      {/* ── Category legend ── */}
      <motion.div
        className="absolute top-8 right-8 z-[30] flex flex-col gap-2"
        style={{ opacity: labelOpacity }}
      >
        {CATEGORIES.map((cat) => (
          <span key={cat} className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/20">
            {cat}
          </span>
        ))}
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        className="absolute inset-0 z-[30] flex flex-col justify-end pointer-events-none"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
          opacity: contentOpacity,
        }}
      >
        <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60 mb-4">
          ANATOMY
        </span>
        <h2 className="font-display text-[clamp(1.8rem,4.5vw,3.5rem)] font-[200] leading-[0.94] tracking-[-0.02em] text-linen max-w-[500px]">
          <MotionText value={headlineText} style={{ whiteSpace: "pre-line" }} />
        </h2>
      </motion.div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[25] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 25%, rgba(5,5,5,0.5) 100%)" }}
      />

      {/* ── Detail panel ── */}
      <AnimatePresence>
        {panelOpen && activePart && (
          <DetailPanel part={activePart} onClose={handleClose} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── EXPLODED PART ─────────────────────────────────────── */

function ExplodedPart({ part, explodeAmount, hovered, active, onHover, onClick }: {
  part: Part;
  explodeAmount: MotionValue<number>;
  hovered: string | null;
  active: string | null;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}) {
  const tx = useTransform(explodeAmount, (v) => part.explodeX * v);
  const ty = useTransform(explodeAmount, (v) => part.explodeY * v);
  const isHovered = hovered === part.id;
  const isActive = active === part.id;
  const dimmed = hovered !== null && !isHovered;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${part.x}%`,
        top: `${part.y}%`,
        width: `${part.w}%`,
        height: `${part.h}%`,
        x: tx,
        y: ty,
        opacity: dimmed ? 0.15 : 1,
      }}
      tabIndex={0}
      role="button"
      onMouseEnter={() => onHover(part.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(part.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(part.id);
        }
      }}
    >
      <div
        className="absolute inset-0 border transition-all duration-500"
        style={{
          borderColor: isHovered || isActive ? "rgba(196,90,44,0.4)" : "rgba(255,255,255,0.04)",
          backgroundColor: isHovered ? "rgba(196,90,44,0.06)" : "transparent",
          boxShadow: isHovered ? "0 0 20px rgba(196,90,44,0.15), inset 0 0 20px rgba(196,90,44,0.05)" : "none",
        }}
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-body text-[8px] font-[400] tracking-[0.2em] text-ember/80 uppercase whitespace-nowrap">
              {part.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── CONNECTION LINE ───────────────────────────────────── */

function ConnectionLine({ part, explodeAmount }: { part: Part; explodeAmount: MotionValue<number> }) {
  const cx = part.x + part.w / 2;
  const cy = part.y + part.h / 2;
  const tx = useTransform(explodeAmount, (v) => cx + part.explodeX * v * 0.4);
  const ty = useTransform(explodeAmount, (v) => cy + part.explodeY * v * 0.4);
  const visible = useTransform(explodeAmount, (v) => v > 0.2);

  return (
    <motion.line
      x1={`${cx}%`}
      y1={`${cy}%`}
      x2={`${tx}%`}
      y2={`${ty}%`}
      stroke="rgba(196,90,44,0.08)"
      strokeWidth="0.5"
      strokeDasharray="4 4"
      style={{ display: useTransform(visible, (v): string => v ? "block" : "none") }}
    />
  );
}
