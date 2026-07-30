"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Reveal from "@/components/site/Reveal";
import BrandsSection from "@/components/sections/BrandsSection";

const CanvasExperience = dynamic(() => import("@/components/canvas/CanvasExperience"), { ssr: false });

import dynamic from "next/dynamic";

export default function Home() {
  return (
    <main className="relative bg-void">
      <CanvasExperience />
      <div className="relative bg-void">
        <HeroSection />
        <CollectionsSection />
        <BrandsSection />
        <MaterialsTeaser />
        <ShowroomCTA />
      </div>
    </main>
  );
}

// ─── HERO — Perfect full-viewport editorial ──────────────────
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollCueVisible, setScrollCueVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 54]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setScrollCueVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="hero-container">
      {/* Image — full bleed */}
      <motion.div
        className="hero-image-wrapper"
        style={{ y: imageY, scale: imageScale }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/kitchens/scavolini-poetica-island.jpg"
            alt="Premium Scavolini kitchen with island cabinetry, natural light, and warm materials"
            fill
            className="object-cover"
            style={{ filter: "saturate(0.8) sepia(0.08) contrast(1.1) brightness(0.85)" }}
            sizes="120vw"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Cinematic gradient overlay — left dark, middle medium, right light */}
      <div className="hero-overlay-directional" />

      {/* Top vignette — very subtle */}
      <div className="hero-overlay-top" />

      {/* Bottom vignette */}
      <div className="hero-overlay-bottom" />

      {/* Warm overlay */}
      <div className="hero-overlay-warm" />

      {/* Grain */}
      <div className="hero-grain" />

      {/* Dust particles */}
      <HeroDust delay={1.5} />

      {/* Content — safe layout container */}
      <div className="hero-content">
        <div className="hero-content-inner">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-eyebrow">A</span>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-headline">Kitchen.</h1>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 25, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-headline-secondary">is not</span>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 25, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-headline-accent">furniture.</span>
            </motion.div>
          </motion.div>

          <motion.p
            className="hero-body"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            It is where life happens.<br />
            Kitser curates kitchens shaped by craft,<br />
            materials and time.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/contact" className="hero-btn-primary" data-cursor="BOOK">
              Book a Consultation
              <span className="hero-btn-arrow" />
            </Link>
            <Link href="/collections" className="hero-btn-secondary">
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <AnimatePresence>
        {scrollCueVisible && (
          <motion.div
            className="hero-scroll-cue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2.4, duration: 0.8 }}
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
        )}
      </AnimatePresence>
    </section>
  );
}

function HeroDust({ delay = 0 }: { delay?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    interface Particle { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; }
    const particles: Particle[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      size: Math.random() * 1.2 + 0.3,
      speedX: (Math.random() - 0.5) * 0.08, speedY: -Math.random() * 0.06 - 0.01,
      opacity: Math.random() * 0.15 + 0.04,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,90,44,${p.opacity})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = window.innerWidth; h = window.innerHeight; canvas.width = w; canvas.height = h; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [ready]);

  if (!ready) return null;
  return <canvas ref={canvasRef} className="hero-dust-canvas" />;
}

// ─── COLLECTIONS — Seamless transition from hero ───────────
function CollectionsSection() {
  return (
    <section className="collections-section">
      <div className="collections-fade" />

      <div className="relative z-[2] mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
        <Reveal>
          <span className="editorial-caption">COLLECTIONS</span>
          <h2 className="editorial-headline-md mt-4">
            Curated with<br />intention.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-4">
          <Reveal className="md:col-span-8" delay={100}>
            <Link href="/collections" className="group relative block aspect-[16/10] overflow-hidden" data-cursor="VIEW" data-cursor-expand>
              <Image
                src="/images/kitchens/scavolini-delinea-brass.jpg"
                alt="Scavolini DeLinea kitchen with brass hardware and premium cabinetry"
                fill
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                sizes="(max-width: 768px) 100vw, 70vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-void/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <span className="editorial-caption">COOKWARE</span>
                <h3 className="editorial-headline-sm mt-3">Materials that<br />endure.</h3>
                <motion.span className="mt-5 inline-flex items-center gap-2 font-body text-xs font-[300] tracking-wide-custom text-linen/50 group-hover:text-ember transition-colors duration-500">
                  VIEW COLLECTION
                  <span className="w-0 group-hover:w-5 h-[1px] bg-current transition-all duration-700" />
                </motion.span>
              </div>
            </Link>
          </Reveal>

          <div className="md:col-span-4 flex flex-col gap-4">
            <Reveal delay={200}>
              <Link href="/collections" className="group relative block aspect-[4/3] overflow-hidden" data-cursor="VIEW">
                <Image src="/images/cookware/04-flatlay.jpg" alt="Premium cookware collection — cast iron, copper, stainless steel" fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade" sizes="(max-width: 768px) 100vw, 30vw" />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6"><span className="editorial-caption">BAKEWARE</span></div>
              </Link>
            </Reveal>
            <Reveal delay={300}>
              <Link href="/collections" className="group relative block aspect-[4/3] overflow-hidden" data-cursor="VIEW">
                <Image src="/images/materials/03-brass-detail.jpg" alt="Unlacquered brass hardware detail — living finish" fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade" sizes="(max-width: 768px) 100vw, 30vw" />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6"><span className="editorial-caption">BARWARE</span></div>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MATERIALS TEASER ─────────────────────────────────────
function MaterialsTeaser() {
  const materials = [
    { name: "Cast Iron", image: "/images/materials/01-marble-countertop.jpg" },
    { name: "Copper", image: "/images/materials/04-copper-patina.jpg" },
    { name: "Walnut", image: "/images/cabinetry/02-handleless-design.jpg" },
    { name: "Brass", image: "/images/materials/03-brass-detail.jpg" },
  ];

  return (
    <section className="editorial-section-lg">
      <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <span className="editorial-caption">MATERIALS</span>
              <h2 className="editorial-headline-md mt-4">Materials that<br />deserve the name.</h2>
            </div>
            <Link href="/materials" className="mt-6 md:mt-0 magnetic-btn self-start md:self-auto" data-cursor="VIEW">
              VIEW ALL<span className="btn-arrow h-[1px] bg-current" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {materials.map((material, i) => (
            <Reveal key={material.name} delay={i * 80}>
              <Link href="/materials" className="group relative block aspect-[3/4] overflow-hidden" data-cursor="EXPLORE">
                <Image src={material.image} alt={material.name} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.06] img-tactile" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-display text-sm font-[100] tracking-[0.08em] text-linen/80 group-hover:text-linen transition-colors duration-500">{material.name}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SHOWROOM CTA ─────────────────────────────────────────
function ShowroomCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[60vh] flex items-center">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image src="/images/appliances/bosch-kitchen-hero.jpg" alt="Bosch premium kitchen — integrated appliances, clean lines" fill className="object-cover img-atmospheric" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-void/65" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(196,90,44,0.06) 0%, transparent 60%)" }} />

      <div className="relative editorial-section-lg w-full">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal blur>
            <h2 className="editorial-headline">Visit the<br />showroom.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">No. 1, Nava India Road, Coimbatore — 641028</p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Link href="/showroom" className="magnetic-btn" data-cursor="VISIT">
                GET DIRECTIONS<span className="btn-arrow h-[1px] bg-current" />
              </Link>
              <Link href="/contact" className="font-body text-sm font-[300] tracking-wide-custom text-smoke/60 transition-colors duration-500 hover:text-ember">
                BOOK APPOINTMENT
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
