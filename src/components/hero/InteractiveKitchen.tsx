"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";

/* ─── HOTSPOT DATA ────────────────────────────────────────── */

interface Hotspot {
  id: string;
  label: string;
  brand: string;
  x: number;
  y: number;
  description: string;
  finishes: string[];
  collection: string;
  section: string;
  explodeX: number;
  explodeY: number;
}

const HOTSPOTS: Hotspot[] = [
  { id: "sink", label: "SINK", brand: "BLANCO", x: 72, y: 48, description: "BLANCO SILGRANIT granite composite sink — 80% natural granite, scratch-resistant, heat-resistant up to 280°C.", finishes: ["Almond", "Cinder", "Concrete Grey", "White"], collection: "Sinks & Faucets", section: "/collections#sinks", explodeX: 30, explodeY: -20 },
  { id: "faucet", label: "FAUCET", brand: "BLANCO", x: 74, y: 38, description: "BLANCO CULINA-S semi-professional pull-out faucet — dual spray, swivel spout, chrome finish.", finishes: ["Chrome", "Steel Look", "PVD Stainless"], collection: "Sinks & Faucets", section: "/collections#sinks", explodeX: 35, explodeY: -40 },
  { id: "cooktop", label: "COOKTOP", brand: "Bosch", x: 50, y: 36, description: "Bosch FlexInduction cooktop — perfect heat distribution, timer function, child lock.", finishes: ["Black", "Stainless Steel"], collection: "Cooking Appliances", section: "/collections#cookware", explodeX: 0, explodeY: -35 },
  { id: "oven", label: "OVEN", brand: "Miele", x: 42, y: 55, description: "Miele Generation 7000 built-in oven — PerfectBake, FoodView camera, self-cleaning.", finishes: ["Obsidian Black", "Pearl White"], collection: "Cooking Appliances", section: "/collections#cookware", explodeX: -25, explodeY: 15 },
  { id: "microwave", label: "MICROWAVE", brand: "Miele", x: 42, y: 42, description: "Miele Steam Combi microwave — combination steam and convection, 20+ automatic programs.", finishes: ["Obsidian Black", "Pearl White"], collection: "Cooking Appliances", section: "/collections#cookware", explodeX: -35, explodeY: -10 },
  { id: "countertop", label: "COUNTERTOP", brand: "Dekton", x: 60, y: 44, description: "Dekton ultra-compact surface — resistant to scratches, stains, UV rays, and heat.", finishes: ["Kelya", "Trilium", "Sirma", "Taga"], collection: "Materials", section: "/materials", explodeX: 15, explodeY: -10 },
  { id: "island", label: "ISLAND", brand: "Scavolini", x: 58, y: 62, description: "Scavolini Poetica island — modular design, integrated storage, breakfast bar.", finishes: ["Matte Charcoal", "Heritage Walnut", "Lacquered White"], collection: "Cabinet Collections", section: "/collections#storage", explodeX: 10, explodeY: 25 },
  { id: "cabinet", label: "CABINET", brand: "Scavolini", x: 28, y: 35, description: "Scavolini DeLinea handleless cabinet — push-to-open mechanism, soft-close hinges.", finishes: ["Matte Charcoal", "Heritage Walnut", "Lacquered White"], collection: "Cabinet Collections", section: "/collections#storage", explodeX: -40, explodeY: -15 },
  { id: "storage", label: "STORAGE", brand: "Blum", x: 22, y: 52, description: "Blum LEGRABOX drawer system — ultra-smooth, Blumotion soft-close, dynamic load capacity.", finishes: ["Silver Metallic", "White", "Graphite Black"], collection: "Storage Systems", section: "/collections#storage", explodeX: -50, explodeY: 10 },
  { id: "lighting", label: "LIGHTING", brand: "Hafele", x: 50, y: 15, description: "Hafele LED strip lighting — dimmable, warm white 3000K, CRI 95+ for accurate colour rendering.", finishes: ["Warm White", "Day White", "RGB"], collection: "Lighting Collection", section: "/materials", explodeX: 0, explodeY: -50 },
  { id: "backsplash", label: "BACKSPLASH", brand: "Dekton", x: 50, y: 25, description: "Dekton full-height backsplash — seamless, zero porosity, easy to clean.", finishes: ["Kelya", "Trilium", "Sirma"], collection: "Materials", section: "/materials", explodeX: 0, explodeY: -30 },
  { id: "drawers", label: "DRAWERS", brand: "Blum", x: 32, y: 65, description: "Blum AVENTOS lift system — stays open at any position, integrated Tip-On.", finishes: ["Silver Metallic", "White", "Graphite Black"], collection: "Storage Systems", section: "/collections#storage", explodeX: -30, explodeY: 30 },
  { id: "handles", label: "HANDLE", brand: "Scavolini", x: 30, y: 44, description: "Scavolini custom brass handles — unlacquered, develops living patina.", finishes: ["Unlacquered Brass", "Brushed Nickel", "Matte Black"], collection: "Cabinet Collections", section: "/collections#storage", explodeX: -45, explodeY: -5 },
  { id: "shelving", label: "SHELVING", brand: "Scavolini", x: 78, y: 28, description: "Scavolini open shelving — floating walnut, adjustable brackets.", finishes: ["American Walnut", "Oak", "Ash"], collection: "Cabinet Collections", section: "/collections#storage", explodeX: 45, explodeY: -25 },
  { id: "chairs", label: "CHAIRS", brand: "Scavolini", x: 65, y: 75, description: "Scavolini bar stools — brass legs, leather seats, adjustable height.", finishes: ["Cognac Leather", "Black Leather", "Wool"], collection: "Cabinet Collections", section: "/collections#storage", explodeX: 20, explodeY: 35 },
];

/* ─── FLOATING PANEL ───────────────────────────────────────── */

function FloatingPanel({ hotspot, onClose }: { hotspot: Hotspot; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 right-0 h-full w-full md:w-[380px] max-w-[90vw] z-30 pointer-events-auto"
      data-cursor="CLOSE"
    >
      <div className="h-full backdrop-blur-[20px] bg-void/70 border-l border-linen/8 overflow-y-auto">
        <div className="p-8 md:p-10">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 border border-linen/10 flex items-center justify-center text-linen/40 hover:text-linen/80 hover:border-linen/25 transition-all duration-300"
          >
            <span className="text-xs">×</span>
          </button>

          {/* Header */}
          <div className="mb-8">
            <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-copper/70 uppercase">
              {hotspot.brand}
            </span>
            <h3 className="font-display text-2xl font-[200] tracking-[-0.02em] text-linen mt-3 leading-[1.1]">
              {hotspot.label.charAt(0) + hotspot.label.slice(1).toLowerCase()}
            </h3>
          </div>

          {/* Description */}
          <p className="font-body text-[0.8rem] font-[300] leading-[1.8] text-smoke/70 mb-8">
            {hotspot.description}
          </p>

          {/* Finishes */}
          <div className="mb-8">
            <span className="font-body text-[0.5rem] font-[400] tracking-[0.15em] text-smoke/40 uppercase block mb-3">
              Available Finishes
            </span>
            <div className="flex flex-wrap gap-2">
              {hotspot.finishes.map((finish) => (
                <span
                  key={finish}
                  className="font-body text-[0.6rem] font-[300] tracking-[0.06em] text-linen/50 border border-linen/8 px-3 py-1.5 hover:border-copper/30 hover:text-copper/70 transition-all duration-500 cursor-pointer"
                >
                  {finish}
                </span>
              ))}
            </div>
          </div>

          {/* Collection */}
          <div className="mb-8 pb-8 border-b border-linen/5">
            <span className="font-body text-[0.5rem] font-[400] tracking-[0.15em] text-smoke/40 uppercase block mb-2">
              Collection
            </span>
            <span className="font-body text-sm font-[300] text-linen/70">
              {hotspot.collection}
            </span>
          </div>

          {/* CTA */}
          <Link
            href={hotspot.section}
            onClick={onClose}
            className="group inline-flex items-center gap-2 font-body text-[0.65rem] font-[300] tracking-[0.12em] text-copper/80 hover:text-copper transition-colors duration-500"
          >
            EXPLORE COLLECTION
            <span className="w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── HOTSPOT DOT ─────────────────────────────────────────── */

function HotspotDot({
  hotspot,
  isActive,
  isHovered,
  isExploded,
  onHover,
  onLeave,
  onClick,
}: {
  hotspot: Hotspot;
  isActive: boolean;
  isHovered: boolean;
  isExploded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const dotX = isExploded ? `${hotspot.x + hotspot.explodeX * 0.3}%` : `${hotspot.x}%`;
  const dotY = isExploded ? `${hotspot.y + hotspot.explodeY * 0.3}%` : `${hotspot.y}%`;

  return (
    <motion.div
      className="absolute pointer-events-auto z-20"
      style={{ left: dotX, top: dotY }}
      animate={{ left: dotX, top: dotY }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor="EXPLORE"
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute -inset-2 rounded-full border border-copper/20"
        animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Outer ring */}
      <motion.div
        className="relative w-3 h-3 rounded-full border border-copper/60 bg-void/40 backdrop-blur-sm flex items-center justify-center"
        animate={{
          scale: isHovered || isActive ? 1.5 : 1,
          borderColor: isHovered || isActive ? "rgba(196,90,44,0.8)" : "rgba(184,115,51,0.6)",
          backgroundColor: isHovered || isActive ? "rgba(196,90,44,0.1)" : "rgba(10,10,10,0.4)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Center dot */}
        <motion.div
          className="w-[3px] h-[3px] rounded-full bg-linen/80"
          animate={{ scale: isHovered ? 1.3 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Leader line + label on hover */}
      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute pointer-events-none"
            style={{ left: "50%", top: "50%" }}
          >
            {/* Leader line */}
            <svg
              className="absolute"
              style={{ left: -1, top: -1, overflow: "visible" }}
              width="2"
              height="60"
            >
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="60"
                stroke="rgba(184,115,51,0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            {/* Label */}
            <motion.div
              className="absolute left-[-20px] top-[64px] whitespace-nowrap"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/80 uppercase block">
                {hotspot.label}
              </span>
              <span className="font-body text-[0.45rem] font-[300] tracking-[0.12em] text-copper/60 uppercase">
                {hotspot.brand}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── EXPLODED VIEW OVERLAY ───────────────────────────────── */

function ExplodedOverlay({ hotspots, activeHotspot }: { hotspots: Hotspot[]; activeHotspot: string | null }) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {hotspots.map((h) => {
        const tx = h.explodeX * 0.3;
        const ty = h.explodeY * 0.3;
        const isActive = activeHotspot === h.id;

        return (
          <motion.div
            key={h.id}
            className="absolute"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: tx * 2, y: ty * 2, opacity: isActive ? 0.6 : 0.15 }}
            exit={{ x: 0, y: 0, opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Component ghost outline */}
            <div className="relative">
              <div
                className={`border ${isActive ? "border-copper/40" : "border-copper/10"} transition-colors duration-500`}
                style={{ width: 80, height: 50 }}
              />
              {/* Connection line back to origin */}
              <svg
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  overflow: "visible",
                  transform: "translate(-50%, -50%)",
                }}
                width={Math.abs(tx * 2) + 20}
                height={Math.abs(ty * 2) + 20}
              >
                <motion.line
                  x1={tx > 0 ? 0 : Math.abs(tx * 2) + 20}
                  y1={ty > 0 ? 0 : Math.abs(ty * 2) + 20}
                  x2={tx > 0 ? Math.abs(tx * 2) + 20 : 0}
                  y2={ty > 0 ? Math.abs(ty * 2) + 20 : 0}
                  stroke="rgba(184,115,51,0.15)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── MAIN HERO COMPONENT ─────────────────────────────────── */

export default function InteractiveKitchen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [scrollCueVisible, setScrollCueVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const hotspotOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setScrollCueVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeData = useMemo(() => {
    if (!activeHotspot) return null;
    return HOTSPOTS.find((h) => h.id === activeHotspot) || null;
  }, [activeHotspot]);

  const handleHotspotClick = useCallback((id: string) => {
    setActiveHotspot(id);
    setPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setPanelOpen(false);
    setTimeout(() => setActiveHotspot(null), 400);
  }, []);

  // Close panel on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClosePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClosePanel]);

  return (
    <section ref={sectionRef} className="hero-split">
      {/* LEFT — Typography (38%) */}
      <div className="hero-split-left">
        <div className="hero-split-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-label">KITSER</span>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-headline">
                Kitchen<br />
                is where<br />
                life happens.
              </h1>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-headline-accent">Not furniture.</span>
            </motion.div>
          </motion.div>

          <motion.p
            className="hero-body"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Premium kitchen curation crafted through timeless materials,
            world-class brands and thoughtful design.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/contact" className="hero-btn-primary">
              Book Consultation
              <span className="hero-btn-arrow" />
            </Link>
            <Link href="/collections" className="hero-btn-secondary">
              Explore Collections
            </Link>
          </motion.div>
        </div>

        {/* Bottom left — scroll indicator */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          style={{ opacity: scrollCueVisible ? scrollCueOpacity : 0 }}
        >
          <span className="hero-scroll-text">Scroll</span>
          <motion.div
            className="hero-scroll-line"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-stat">
            <span className="hero-stat-number">35+</span>
            <span className="hero-stat-label">Global Brands</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">30+</span>
            <span className="hero-stat-label">Years</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">1000+</span>
            <span className="hero-stat-label">Projects</span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — Interactive Kitchen Image (62%) */}
      <div className="hero-split-right">
        {/* Kitchen image with slow cinematic motion */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale }}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/kitchens/scavolini-poetica-island.jpg"
              alt="Scavolini Poetica modular kitchen — walnut cabinetry, stone island, natural light"
              fill
              className="object-cover"
              style={{ filter: "saturate(0.82) sepia(0.06) contrast(1.08) brightness(0.88)" }}
              sizes="62vw"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Darkening overlay when panel is open */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              className="absolute inset-0 bg-void/40 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleClosePanel}
            />
          )}
        </AnimatePresence>

        {/* Exploded view overlay */}
        <AnimatePresence>
          {isExploded && (
            <ExplodedOverlay hotspots={HOTSPOTS} activeHotspot={activeHotspot} />
          )}
        </AnimatePresence>

        {/* Hotspots — hidden on mobile */}
        {!isMobile && (
          <motion.div className="absolute inset-0 z-20" style={{ opacity: hotspotOpacity }}>
            {HOTSPOTS.map((h) => (
              <HotspotDot
                key={h.id}
                hotspot={h}
                isActive={activeHotspot === h.id}
                isHovered={hoveredHotspot === h.id}
                isExploded={isExploded}
                onHover={() => setHoveredHotspot(h.id)}
                onLeave={() => setHoveredHotspot(null)}
                onClick={() => handleHotspotClick(h.id)}
              />
            ))}
          </motion.div>
        )}

        {/* Mobile — Tap to Explore overlay */}
        {isMobile && !mobileExplorerOpen && (
          <motion.button
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto"
            onClick={() => setMobileExplorerOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            data-cursor="EXPLORE"
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-full border border-copper/40 bg-void/40 backdrop-blur-sm flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-copper/70" />
              </motion.div>
              <span className="font-body text-[0.6rem] font-[300] tracking-[0.2em] text-linen/60 uppercase">
                Tap to Explore
              </span>
            </div>
          </motion.button>
        )}

        {/* Mobile — Component explorer list */}
        <AnimatePresence>
          {isMobile && mobileExplorerOpen && (
            <motion.div
              className="absolute inset-0 z-25 bg-void/85 backdrop-blur-md overflow-y-auto pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-6 pt-20">
                <button
                  onClick={() => setMobileExplorerOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 border border-linen/10 flex items-center justify-center text-linen/40"
                >
                  ×
                </button>
                <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-copper/70 uppercase block mb-2">
                  KITCHEN COMPONENTS
                </span>
                <h3 className="font-display text-lg font-[200] tracking-[-0.02em] text-linen mb-6">
                  Tap any component to explore.
                </h3>
                <div className="flex flex-col gap-2">
                  {HOTSPOTS.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => {
                        setMobileExplorerOpen(false);
                        handleHotspotClick(h.id);
                      }}
                      className="flex items-center justify-between py-3 border-b border-linen/5 text-left"
                    >
                      <div>
                        <span className="font-body text-sm font-[300] text-linen/80 block">{h.label.charAt(0) + h.label.slice(1).toLowerCase()}</span>
                        <span className="font-body text-[0.55rem] font-[300] text-copper/60">{h.brand}</span>
                      </div>
                      <span className="text-linen/20 text-xs">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exploded view toggle — top right (hidden on mobile) */}
        {!isMobile && (
          <motion.div
            className="absolute top-6 right-6 z-30 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.9 }}
          >
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`flex items-center gap-0 border transition-all duration-600 ${
              isExploded
                ? "border-copper/40 bg-copper/8"
                : "border-linen/10 bg-void/30 backdrop-blur-sm hover:border-linen/20"
            }`}
            data-cursor="OPEN"
          >
            <span
              className={`px-4 py-2.5 font-body text-[0.55rem] font-[300] tracking-[0.12em] uppercase transition-colors duration-500 ${
                !isExploded ? "text-linen/70" : "text-linen/30"
              }`}
            >
              Normal
            </span>
            <span
              className={`px-4 py-2.5 font-body text-[0.55rem] font-[300] tracking-[0.12em] uppercase transition-colors duration-500 ${
                isExploded ? "text-copper/80" : "text-linen/30"
              }`}
            >
              Exploded
            </span>
          </button>
        </motion.div>
        )}

        {/* Left gradient — text legibility */}
        <div className="hero-image-gradient-left" />

        {/* Bottom vignette */}
        <div className="hero-image-gradient-bottom" />

        {/* Soft noise */}
        <div className="hero-image-noise" />
      </div>

      {/* Floating Panel */}
      <AnimatePresence>
        {panelOpen && activeData && (
          <FloatingPanel hotspot={activeData} onClose={handleClosePanel} />
        )}
      </AnimatePresence>
    </section>
  );
}
