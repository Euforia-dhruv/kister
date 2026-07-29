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

// ─── HERO — Full-viewport cinematic editorial ──────────────
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollCueVisible, setScrollCueVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setScrollCueVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-void">
      {/* Background light leak */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 2 }}
        style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(196,90,44,0.06) 0%, transparent 55%)" }}
      />

      {/* Grain */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }} />

      {/* Image — full bleed, bleeds off edges */}
      <motion.div
        className="absolute z-[3]"
        style={{ top: "-5%", left: "-5%", right: "-15%", bottom: "-10%", y: imageY, scale: imageScale }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/kitchens/scavolini-poetica-island.jpg"
            alt="Scavolini Poetica kitchen"
            fill
            className="object-cover"
            style={{ filter: "saturate(0.8) sepia(0.08) contrast(1.1) brightness(0.88)" }}
            sizes="120vw"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 z-[4] pointer-events-none" style={{
        background: "radial-gradient(ellipse at 60% 45%, transparent 30%, rgba(10,10,10,0.55) 100%)",
      }} />

      {/* Warm overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none" style={{
        background: "rgba(196,90,44,0.04)", mixBlendMode: "overlay",
      }} />

      {/* Directional gradient for text legibility */}
      <div className="absolute inset-0 z-[6] pointer-events-none" style={{
        background: "linear-gradient(135deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.2) 40%, transparent 70%)",
      }} />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] z-[6] pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 100%)",
      }} />

      {/* Dust */}
      <HeroDust delay={1.5} />

      {/* Typography */}
      <div className="absolute inset-0 z-[10] flex flex-col justify-end pointer-events-none">
        <div className="px-6 pb-24 md:px-12 md:pb-20 lg:px-20 lg:pb-24 max-w-[900px]">
          <div className="pointer-events-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block font-display text-[0.85rem] md:text-[1rem] font-[300] tracking-[0.3em] text-ember/80 mb-3">A</span>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block font-display font-[100] text-linen" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>Kitchen</span>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 25, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block font-display font-[100] text-linen/50 mt-2 md:mt-3" style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", letterSpacing: "0.04em" }}>is not</span>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 25, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block font-display font-[900] text-linen mt-1" style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", lineHeight: 1.0, letterSpacing: "-0.01em" }}>furniture.</span>
              </motion.div>
            </motion.div>
          </div>

          <motion.p
            className="font-body text-[0.8rem] md:text-[0.85rem] font-[300] leading-[1.7] text-linen/40 mt-8 md:mt-10 max-w-[380px] pointer-events-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            It is where life happens.<br />
            Kitser curates kitchens shaped by craft,<br />
            materials and time.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-8 mt-10 md:mt-12 pointer-events-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/contact" className="magnetic-btn" data-cursor="BOOK">
              Book a Consultation
              <span className="btn-arrow h-[1px] bg-current" />
            </Link>
            <Link href="/collections" className="group inline-flex items-center gap-2 font-body text-[0.7rem] font-[300] tracking-[0.12em] text-linen/35 transition-colors duration-500 hover:text-ember/80">
              Explore Collection
              <span className="w-0 group-hover:w-5 h-[1px] bg-current transition-all duration-700" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <AnimatePresence>
        {scrollCueVisible && (
          <motion.div
            className="absolute bottom-8 left-1/2 z-[15] -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            style={{ opacity: scrollCueVisible ? scrollCueOpacity : 0 }}
          >
            <span className="font-body text-[0.5rem] font-[300] tracking-[0.3em] uppercase text-linen/20">Scroll</span>
            <motion.div
              className="w-[1px] h-8 bg-gradient-to-b from-linen/20 to-transparent"
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
    const particles: Particle[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      size: Math.random() * 1.2 + 0.3,
      speedX: (Math.random() - 0.5) * 0.1, speedY: -Math.random() * 0.08 - 0.01,
      opacity: Math.random() * 0.2 + 0.05,
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
  return <canvas ref={canvasRef} className="absolute inset-0 z-[8] pointer-events-none" />;
}

// ─── COLLECTIONS — Seamless transition from hero ───────────
function CollectionsSection() {
  return (
    <section className="relative -mt-16 pt-16 editorial-section-lg">
      {/* Fade from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-void/80 to-transparent pointer-events-none z-[1]" />

      <div className="relative z-[2] mx-auto max-w-[1400px]">
        <Reveal>
          <span className="editorial-caption">COLLECTIONS</span>
          <h2 className="editorial-headline-md mt-4">
            Curated with<br />intention.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-4">
          <Reveal className="md:col-span-8" delay={100}>
            <Link href="/collections" className="group relative block aspect-[16/10] overflow-hidden" data-cursor="VIEW" data-cursor-expand>
              <Image
                src="/images/kitchens/scavolini-delinea-brass.jpg"
                alt="Scavolini DeLinea kitchen"
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
                <Image src="/images/cookware/04-flatlay.jpg" alt="Cookware flatlay" fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade" sizes="(max-width: 768px) 100vw, 30vw" />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6"><span className="editorial-caption">BAKEWARE</span></div>
              </Link>
            </Reveal>
            <Reveal delay={300}>
              <Link href="/collections" className="group relative block aspect-[4/3] overflow-hidden" data-cursor="VIEW">
                <Image src="/images/materials/03-brass-detail.jpg" alt="Brass material" fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade" sizes="(max-width: 768px) 100vw, 30vw" />
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
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
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
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[70vh] flex items-center">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image src="/images/appliances/bosch-kitchen-hero.jpg" alt="Bosch kitchen" fill className="object-cover img-atmospheric" sizes="100vw" />
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
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
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
