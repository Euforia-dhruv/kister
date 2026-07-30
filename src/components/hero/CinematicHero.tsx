"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";

/* ─── FLOATING LABELS ─────────────────────────────────────── */

interface Label {
  id: string;
  name: string;
  detail: string;
  x: number;
  y: number;
}

const LABELS: Label[] = [
  { id: "cabinetry", name: "Cabinetry", detail: "Italian Systems", x: 25, y: 38 },
  { id: "stone", name: "Stone", detail: "Natural Quartz", x: 58, y: 45 },
  { id: "cooking", name: "Cooking", detail: "Bosch", x: 48, y: 34 },
  { id: "water", name: "Water", detail: "BLANCO", x: 70, y: 50 },
  { id: "storage", name: "Storage", detail: "Blum", x: 18, y: 55 },
  { id: "lighting", name: "Lighting", detail: "Hafele", x: 50, y: 16 },
];

function FloatingLabel({ label, mouseX, mouseY }: { label: Label; mouseX: number; mouseY: number }) {
  const dx = mouseX - label.x;
  const dy = mouseY - label.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const threshold = 18;
  const isActive = dist < threshold;

  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{ left: `${label.x}%`, top: `${label.y}%` }}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 6,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {/* Thin leader line from point to label */}
        <motion.div
          className="absolute left-1/2 top-full w-[1px] bg-linen/15"
          animate={{ height: isActive ? 24 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top" }}
        />
        <div className="mt-7 whitespace-nowrap text-center">
          <span className="block font-body text-[0.55rem] font-[400] tracking-[0.2em] text-linen/70 uppercase">
            {label.name}
          </span>
          <span className="block font-body text-[0.48rem] font-[300] tracking-[0.12em] text-copper/50 uppercase mt-0.5">
            {label.detail}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN HERO ───────────────────────────────────────────── */

export default function CinematicHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouseNorm, setMouseNorm] = useState({ x: 0.5, y: 0.5 });
  const [scrollCueVisible, setScrollCueVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Camera motion */
  const camScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const camX = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const camY = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.3]);

  /* Mouse tracking for light and labels */
  const mouseLightX = useMotionValue(50);
  const mouseLightY = useMotionValue(50);
  const lightX = useSpring(mouseLightX, { stiffness: 40, damping: 25 });
  const lightY = useSpring(mouseLightY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setScrollCueVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 100;
      const ny = (e.clientY / window.innerHeight) * 100;
      mouseLightX.set(nx);
      mouseLightY.set(ny);
      setMouseNorm({ x: nx, y: ny });
    },
    [mouseLightX, mouseLightY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <section ref={sectionRef} className="hero-cinematic">
      {/* ── Background photograph with camera motion ── */}
      <motion.div
        className="hero-cam"
        style={{ scale: camScale, x: camX, y: camY }}
      >
        <motion.div
          className="hero-cam-inner"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/kitchens/scavolini-poetica-hero.jpg"
            alt="Scavolini Poetica kitchen — walnut cabinetry, stone countertop, warm daylight"
            fill
            className="object-cover"
            style={{ filter: "saturate(0.78) sepia(0.08) contrast(1.06) brightness(0.86)" }}
            sizes="100vw"
            priority
          />
        </motion.div>
      </motion.div>

      {/* ── Cursor light — subtle reflection on cabinetry ── */}
      <motion.div
        className="hero-light"
        style={{
          background: useTransform(
            [lightX, lightY],
            ([x, y]) =>
              `radial-gradient(ellipse 40% 50% at ${x}% ${y}%, rgba(245,240,235,0.04) 0%, transparent 70%)`
          ),
        }}
      />

      {/* ── Natural vignette ── */}
      <div className="hero-vignette" />

      {/* ── Warm overlay ── */}
      <div className="hero-warm" />

      {/* ── Bottom gradient for scroll transition ── */}
      <motion.div className="hero-bottom-fade" style={{ opacity: overlayOpacity }} />

      {/* ── Floating labels ── */}
      <div className="hero-labels">
        {LABELS.map((l) => (
          <FloatingLabel
            key={l.id}
            label={l}
            mouseX={mouseNorm.x}
            mouseY={mouseNorm.y}
          />
        ))}
      </div>

      {/* ── Typography — left editorial column ── */}
      <motion.div className="hero-typography" style={{ opacity: textOpacity, y: textY }}>
        {/* Label */}
        <motion.span
          className="hero-kits"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          KITSER
        </motion.span>

        {/* Headline */}
        <div className="hero-h">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Kitchen
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            is where
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            life happens.
          </motion.span>
        </div>

        {/* Bold accent */}
        <motion.div
          className="hero-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Not furniture.
        </motion.div>

        {/* Body */}
        <motion.p
          className="hero-body"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          Premium kitchen curation crafted through timeless materials,
          world-class brands and thoughtful design.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/contact" className="hero-btn-p">
            Book Consultation
            <span className="hero-btn-a" />
          </Link>
          <Link href="/collections" className="hero-btn-s">
            Explore Collections
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Bottom stats ── */}
      <motion.div className="hero-stats" style={{ opacity: textOpacity }}>
        <motion.div
          className="hero-stat-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-stat">
            <span className="hero-stat-n">35+</span>
            <span className="hero-stat-l">Global Brands</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-n">30+</span>
            <span className="hero-stat-l">Years</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-n">1000+</span>
            <span className="hero-stat-l">Projects</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 0.9 }}
        style={{ opacity: scrollCueVisible ? scrollCueOpacity : 0 }}
      >
        <span className="hero-scroll-t">Scroll</span>
        <motion.div
          className="hero-scroll-l"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
