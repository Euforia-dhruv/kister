"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";

/* ─── DATA ────────────────────────────────────────────────── */

interface KitchenComponent {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  explodeX: number;
  explodeY: number;
  panel: {
    title: string;
    brand: string;
    items: string[];
    description: string;
  };
}

const COMPONENTS: KitchenComponent[] = [
  {
    id: "cabinet",
    label: "CABINET",
    x: 12, y: 20, w: 18, h: 40,
    explodeX: -40, explodeY: -15,
    panel: {
      title: "Cabinetry",
      brand: "Scavolini",
      items: ["DeLinea Handleless", "Poetica Modular", "Carattere Heritage"],
      description: "Italian-crafted cabinetry systems. Push-to-open mechanisms, soft-close hinges, handleless design.",
    },
  },
  {
    id: "appliance",
    label: "APPLIANCES",
    x: 35, y: 25, w: 14, h: 30,
    explodeX: -10, explodeY: -30,
    panel: {
      title: "Appliances",
      brand: "Miele / Bosch",
      items: ["Generation 7000 Oven", "FlexInduction Cooktop", "Steam Combi Microwave"],
      description: "Precision engineering. 20-year tested. Integrated seamlessly into cabinetry.",
    },
  },
  {
    id: "countertop",
    label: "STONE",
    x: 30, y: 48, w: 35, h: 8,
    explodeX: 0, explodeY: 15,
    panel: {
      title: "Countertop",
      brand: "Dekton",
      items: ["Kelya Ultra-Compact", "Trilium Carbon", "Sirma Natural"],
      description: "Scratch-proof. Stain-proof. UV-resistant. Zero porosity. The surface that outlasts everything.",
    },
  },
  {
    id: "sink",
    label: "SINK",
    x: 58, y: 46, w: 10, h: 10,
    explodeX: 20, explodeY: -15,
    panel: {
      title: "Sink Systems",
      brand: "BLANCO / Franke",
      items: ["SILGRANIT Composite", "Stainless Steel Undermount", "Quartz Composite"],
      description: "80% natural granite. Heat-resistant to 280°C. Scratch-proof. Colours that make stone jealous.",
    },
  },
  {
    id: "hardware",
    label: "HARDWARE",
    x: 14, y: 40, w: 6, h: 15,
    explodeX: -50, explodeY: 0,
    panel: {
      title: "Hardware",
      brand: "Blum",
      items: ["LEGRABOX Drawers", "AVENTOS Lift", "Clips top Blumotion"],
      description: "The invisible backbone. Soft-close at any position. Dynamic load capacity. Silent precision.",
    },
  },
  {
    id: "lighting",
    label: "LIGHTING",
    x: 25, y: 15, w: 40, h: 5,
    explodeX: 0, explodeY: -40,
    panel: {
      title: "Lighting",
      brand: "Hafele",
      items: ["LED Strip 3000K", "Under-Cabinet Task", "Display Illumination"],
      description: "CRI 95+ colour rendering. Dimmable warm white. Light that makes materials sing.",
    },
  },
  {
    id: "storage",
    label: "STORAGE",
    x: 8, y: 55, w: 12, h: 20,
    explodeX: -45, explodeY: 20,
    panel: {
      title: "Storage Systems",
      brand: "Blum / Kesseböhmer",
      items: ["Corner Optimizer", "Pull-Out Pantry", "Cutlery Dividers"],
      description: "Every centimetre used. Pull-out organizers, lazy susans, drawer systems. Nothing wasted.",
    },
  },
  {
    id: "accessories",
    label: "ACCESSORIES",
    x: 72, y: 30, w: 10, h: 15,
    explodeX: 35, explodeY: -10,
    panel: {
      title: "Accessories",
      brand: "Various",
      items: ["Brass Handles", "Open Shelving", "Bar Seating"],
      description: "The finishing touches. Unlacquered brass, floating walnut, leather bar stools.",
    },
  },
];

/* ─── DUST PARTICLES ──────────────────────────────────────── */

function DustParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      drift: 10 + Math.random() * 30,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-linen/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -p.drift, 0],
            x: [0, p.drift * 0.3, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ─── SUNLIGHT ANIMATION ──────────────────────────────────── */

function SunlightOverlay() {
  return (
    <motion.div
      className="absolute inset-0 z-[1] pointer-events-none"
      animate={{
        background: [
          "linear-gradient(105deg, rgba(255,240,220,0.0) 0%, rgba(255,240,220,0.0) 40%, rgba(255,240,220,0.0) 100%)",
          "linear-gradient(105deg, rgba(255,240,220,0.06) 0%, rgba(255,240,220,0.03) 30%, rgba(255,240,220,0.0) 60%)",
          "linear-gradient(105deg, rgba(255,240,220,0.0) 0%, rgba(255,240,220,0.06) 40%, rgba(255,240,220,0.02) 70%, rgba(255,240,220,0.0) 100%)",
          "linear-gradient(105deg, rgba(255,240,220,0.0) 0%, rgba(255,240,220,0.0) 40%, rgba(255,240,220,0.0) 100%)",
        ],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

/* ─── COMPONENT PANEL ─────────────────────────────────────── */

function ComponentPanel({
  component,
  onClose,
}: {
  component: KitchenComponent;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ x: -360, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -360, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 h-full w-[340px] max-w-[85vw] z-[30]"
      data-cursor="CLOSE"
    >
      <div className="h-full backdrop-blur-[16px] bg-void/60 border-r border-linen/6 overflow-y-auto">
        <div className="p-8 md:p-10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-7 h-7 border border-linen/8 flex items-center justify-center text-linen/30 hover:text-linen/60 hover:border-linen/15 transition-all duration-500"
          >
            <span className="text-[10px]">×</span>
          </button>

          <div className="mb-8">
            <span className="block font-body text-[9px] font-[400] tracking-[0.2em] text-[#B56A3B]/70 uppercase mb-2">
              {component.panel.brand}
            </span>
            <h3 className="font-display text-xl font-[200] tracking-[-0.02em] text-linen leading-[1.15]">
              {component.panel.title}
            </h3>
          </div>

          <p className="font-body text-[13px] font-[300] leading-[1.75] text-smoke/60 mb-8">
            {component.panel.description}
          </p>

          <div className="mb-8 pb-8 border-b border-linen/4">
            <span className="block font-body text-[8px] font-[400] tracking-[0.15em] text-smoke/35 uppercase mb-3">
              Available
            </span>
            <div className="flex flex-col gap-2">
              {component.panel.items.map((item) => (
                <span
                  key={item}
                  className="font-body text-[11px] font-[300] tracking-[0.04em] text-linen/50 flex items-center gap-2"
                >
                  <span className="w-1 h-px bg-[#B56A3B]/40" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/collections"
            onClick={onClose}
            className="group inline-flex items-center gap-2 font-body text-[10px] font-[300] tracking-[0.12em] text-[#B56A3B]/70 hover:text-[#B56A3B] transition-colors duration-500 uppercase"
          >
            Learn More
            <span className="w-0 group-hover:w-4 h-px bg-current transition-all duration-500" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN HERO ───────────────────────────────────────────── */

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"dark" | "reveal" | "explode">("dark");
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const camRotateX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const camRotateY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  /* Phase timing */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 800);
    const t2 = setTimeout(() => setPhase("explode"), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* Camera rotation from mouse */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 0.4;
      const ny = (e.clientY / window.innerHeight - 0.5) * 0.2;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const activeData = useMemo(
    () => COMPONENTS.find((c) => c.id === activeComponent) || null,
    [activeComponent]
  );

  const handleClick = useCallback((id: string) => {
    setActiveComponent(id);
    setPanelOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setPanelOpen(false);
    setTimeout(() => setActiveComponent(null), 500);
  }, []);

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const isExploded = phase === "explode";

  return (
    <div ref={containerRef} className="hero-pin">
      <section className="hero-scene">
        {/* ── Black screen → reveal ── */}
        <motion.div
          className="absolute inset-0 z-[40] bg-void pointer-events-none"
          animate={{ opacity: phase === "dark" ? 1 : 0 }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ── Kitchen image with camera ── */}
        <motion.div
          className="hero-cam"
          style={{
            rotateX: camRotateY,
            rotateY: camRotateX,
          }}
        >
          <motion.div
            className="hero-cam-inner"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: phase !== "dark" ? 1 : 0, scale: 1 }}
            transition={{ duration: 4.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/kitchens/scavolini-poetica-hero.jpg"
              alt="Scavolini Poetica kitchen — walnut cabinetry, stone countertop, natural daylight"
              fill
              className="object-cover"
              style={{ filter: "saturate(0.75) sepia(0.1) contrast(1.05) brightness(0.82)" }}
              sizes="100vw"
              priority
            />
          </motion.div>
        </motion.div>

        {/* ── Sunlight animation ── */}
        <SunlightOverlay />

        {/* ── Dust particles ── */}
        <DustParticles />

        {/* ── Depth layers ── */}
        <div className="hero-vignette" />
        <div className="hero-grain" />

        {/* ── Exploded view components ── */}
        <div className="absolute inset-0 z-[8]">
          {COMPONENTS.map((comp) => {
            const isActive = activeComponent === comp.id;
            const isHovered = hoveredComponent === comp.id;
            const tx = isExploded ? comp.explodeX : 0;
            const ty = isExploded ? comp.explodeY : 0;

            return (
              <motion.div
                key={comp.id}
                className="absolute"
                style={{
                  left: `${comp.x}%`,
                  top: `${comp.y}%`,
                  width: `${comp.w}%`,
                  height: `${comp.h}%`,
                }}
                animate={{
                  x: tx,
                  y: ty,
                }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredComponent(comp.id)}
                onMouseLeave={() => setHoveredComponent(null)}
                onClick={() => handleClick(comp.id)}
                data-cursor-label={comp.label}
              >
                {/* Component boundary — visible in exploded state */}
                <motion.div
                  className="absolute inset-0 border border-[#B56A3B]/0 transition-colors duration-700"
                  animate={{
                    borderColor: isExploded
                      ? isActive || isHovered
                        ? "rgba(181,106,59,0.35)"
                        : "rgba(181,106,59,0.08)"
                      : "rgba(181,106,59,0)",
                    backgroundColor: isHovered && isExploded
                      ? "rgba(181,106,59,0.04)"
                      : "rgba(181,106,59,0)",
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Hover highlight glow */}
                <AnimatePresence>
                  {isHovered && isExploded && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        background: "radial-gradient(ellipse at center, rgba(181,106,59,0.06) 0%, transparent 70%)",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Component label — appears on hover */}
                <AnimatePresence>
                  {isHovered && isExploded && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="font-body text-[9px] font-[400] tracking-[0.2em] text-[#B56A3B]/80 uppercase">
                        {comp.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Connection lines in exploded state */}
          <AnimatePresence>
            {isExploded && (
              <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none z-[7]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, delay: 0.5 }}
              >
                {COMPONENTS.map((comp) => {
                  const cx = comp.x + comp.w / 2;
                  const cy = comp.y + comp.h / 2;
                  const tx = cx + comp.explodeX * 0.5;
                  const ty = cy + comp.explodeY * 0.5;
                  return (
                    <motion.line
                      key={comp.id}
                      x1={`${cx}%`}
                      y1={`${cy}%`}
                      x2={`${tx}%`}
                      y2={`${ty}%`}
                      stroke="rgba(181,106,59,0.12)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                    />
                  );
                })}
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* ── Typography ── */}
        <div className="hero-content">
          {/* KITSER label */}
          <motion.span
            className="hero-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== "dark" ? 1 : 0 }}
            transition={{ delay: 2.0, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            KITSER
          </motion.span>

          {/* Headline */}
          <div className="hero-heading">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: phase !== "dark" ? 1 : 0, y: 0 }}
              transition={{ delay: 2.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Crafted Kitchens
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: phase !== "dark" ? 1 : 0, y: 0 }}
              transition={{ delay: 2.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              for Modern Living
            </motion.span>
          </div>

          {/* Body */}
          <motion.p
            className="hero-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase !== "dark" ? 1 : 0, y: 0 }}
            transition={{ delay: 3.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Thirty-five years of curated kitchens, materials and craftsmanship from
            the world&apos;s finest brands.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase !== "dark" ? 1 : 0, y: 0 }}
            transition={{ delay: 3.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/contact" className="hero-cta">
              Book Private Consultation
              <span className="hero-cta-arrow" />
            </Link>
          </motion.div>
        </div>

        {/* ── Component panel ── */}
        <AnimatePresence>
          {panelOpen && activeData && (
            <ComponentPanel component={activeData} onClose={handleClose} />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
