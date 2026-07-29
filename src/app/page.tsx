"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal, { TextReveal } from "@/components/site/Reveal";
import BrandsSection from "@/components/sections/BrandsSection";

const CanvasExperience = dynamic(() => import("@/components/canvas/CanvasExperience"), { ssr: false });

import dynamic from "next/dynamic";

export default function Home() {
  return (
    <main className="relative bg-void">
      {/* ─── CINEMATIC INTRO ──────────────────────────── */}
      <CanvasExperience />

      {/* ─── WEBSITE ──────────────────────────────────── */}
      <div className="relative bg-void">

        {/* ─── HERO: Editorial split — image left, text right ─── */}
        <HeroSection />

        {/* ─── SECTION DIVIDER ────────────────────────── */}
        <div className="section-divider" />

        {/* ─── COLLECTIONS: Editorial magazine ─── */}
        <CollectionsSection />

        {/* ─── SECTION DIVIDER ────────────────────────── */}
        <div className="section-divider" />

        {/* ─── BRANDS ──────────────────────────────────── */}
        <BrandsSection />

        {/* ─── SECTION DIVIDER ────────────────────────── */}
        <div className="section-divider" />

        {/* ─── MATERIALS TEASER ─── */}
        <MaterialsTeaser />

        {/* ─── SECTION DIVIDER ────────────────────────── */}
        <div className="section-divider" />

        {/* ─── SHOWROOM CTA: Full-bleed atmospheric ─── */}
        <ShowroomCTA />
      </div>
    </main>
  );
}

// ─── HERO SECTION ──────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.6]);

  return (
    <section ref={ref} className="editorial-section-lg relative overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center">
          {/* Large image — takes 7 cols with parallax */}
          <Reveal className="md:col-span-7" scale>
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
              >
                <Image
                  src="/images/kitchens/scavolini-poetica-island.jpg"
                  alt="Scavolini Poetica kitchen — Pecan Ash island composition"
                  fill
                  className="object-cover img-grade"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-void"
                style={{ opacity: overlayOpacity }}
              />
              <div className="absolute inset-0 img-warm img-vignette" />

              {/* Floating dust on hero image */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(circle at 30% 70%, rgba(196,90,44,0.05) 0%, transparent 50%)",
              }} />
            </div>
          </Reveal>

          {/* Text — takes 5 cols, offset right */}
          <motion.div
            className="md:col-span-4 md:col-start-9 flex flex-col justify-center"
            style={{ y: textY }}
          >
            <Reveal blur>
              <h1 className="editorial-headline">
                A kitchen<br />is not<br />furniture.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="editorial-body mt-8 max-w-sm">
                It is where life happens. Kitser curates the world&apos;s finest
                materials, appliances, and cookware to create kitchens that honour this truth.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <Link
                  href="/collections"
                  className="magnetic-btn"
                  data-cursor="EXPLORE"
                >
                  EXPLORE
                  <span className="btn-arrow h-[1px] bg-current" />
                </Link>
                <Link
                  href="/contact"
                  className="font-body text-sm font-[300] tracking-wide-custom text-smoke/60 transition-colors duration-500 hover:text-ember"
                >
                  BOOK A CONSULTATION
                </Link>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── COLLECTIONS SECTION ──────────────────────────────────
function CollectionsSection() {
  return (
    <section className="editorial-section-lg">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <span className="editorial-caption">COLLECTIONS</span>
          <h2 className="editorial-headline-md mt-4">
            Curated with<br />intention.
          </h2>
        </Reveal>

        {/* Magazine layout: large feature + two stacked supporting */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-4">
          {/* Large feature — 8 cols */}
          <Reveal className="md:col-span-8" delay={100}>
            <Link
              href="/collections"
              className="group relative block aspect-[16/10] overflow-hidden"
              data-cursor="VIEW"
              data-cursor-expand
            >
              <Image
                src="/images/kitchens/scavolini-delinea-brass.jpg"
                alt="Scavolini DeLinea kitchen — brass handle profiles"
                fill
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                sizes="(max-width: 768px) 100vw, 70vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-void/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <span className="editorial-caption">COOKWARE</span>
                <h3 className="editorial-headline-sm mt-3">
                  Materials that<br />endure.
                </h3>
                <motion.span
                  className="mt-5 inline-flex items-center gap-2 font-body text-xs font-[300] tracking-wide-custom text-linen/50 group-hover:text-ember transition-colors duration-500"
                >
                  VIEW COLLECTION
                  <span className="w-0 group-hover:w-5 h-[1px] bg-current transition-all duration-700" />
                </motion.span>
              </div>
            </Link>
          </Reveal>

          {/* Two stacked supporting — 4 cols */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Reveal delay={200}>
              <Link
                href="/collections"
                className="group relative block aspect-[4/3] overflow-hidden"
                data-cursor="VIEW"
              >
                <Image
                  src="/images/cookware/04-flatlay.jpg"
                  alt="Cookware flatlay arrangement"
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="editorial-caption">BAKEWARE</span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={300}>
              <Link
                href="/collections"
                className="group relative block aspect-[4/3] overflow-hidden"
                data-cursor="VIEW"
              >
                <Image
                  src="/images/materials/03-brass-detail.jpg"
                  alt="Brass material closeup"
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="editorial-caption">BARWARE</span>
                </div>
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
              <h2 className="editorial-headline-md mt-4">
                Materials that<br />deserve the name.
              </h2>
            </div>
            <Link
              href="/materials"
              className="mt-6 md:mt-0 magnetic-btn self-start md:self-auto"
              data-cursor="VIEW"
            >
              VIEW ALL
              <span className="btn-arrow h-[1px] bg-current" />
            </Link>
          </div>
        </Reveal>

        {/* Asymmetric grid — editorial layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {materials.map((material, i) => (
            <Reveal key={material.name} delay={i * 80}>
              <Link
                href="/materials"
                className="group relative block aspect-[3/4] overflow-hidden"
                data-cursor="EXPLORE"
              >
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.06] img-tactile"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-display text-sm font-[100] tracking-[0.08em] text-linen/80 group-hover:text-linen transition-colors duration-500">
                    {material.name}
                  </h3>
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/appliances/bosch-kitchen-hero.jpg"
          alt="Bosch kitchen lifestyle"
          fill
          className="object-cover img-atmospheric"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-void/65" />

      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(196,90,44,0.06) 0%, transparent 60%)",
      }} />

      <div className="relative editorial-section-lg w-full">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal blur>
            <h2 className="editorial-headline">
              Visit the<br />showroom.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              No. 1, Nava India Road, Coimbatore — 641028
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/showroom"
                className="magnetic-btn"
                data-cursor="VISIT"
              >
                GET DIRECTIONS
                <span className="btn-arrow h-[1px] bg-current" />
              </Link>
              <Link
                href="/contact"
                className="font-body text-sm font-[300] tracking-wide-custom text-smoke/60 transition-colors duration-500 hover:text-ember"
              >
                BOOK APPOINTMENT
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
