"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/site/Reveal";
import InteractiveKitchen from "@/components/hero/InteractiveKitchen";
import BrandsSection from "@/components/sections/BrandsSection";

export default function Home() {
  return (
    <main className="relative bg-void">
      <InteractiveKitchen />
      <CollectionsSection />
      <BrandsSection />
      <MaterialsTeaser />
      <ShowroomCTA />
    </main>
  );
}

// ─── COLLECTIONS ──────────────────────────────────────────────
function CollectionsSection() {
  return (
    <section className="editorial-section-lg">
      <div className="mx-auto max-w-[1400px] site-padding">
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
                alt="Scavolini DeLinea kitchen — brass hardware, premium cabinetry, warm materials"
                fill
                className="object-cover transition-transform duration-[1.6s] group-hover:scale-[1.03] img-grade"
                sizes="(max-width: 768px) 100vw, 70vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-void/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <span className="editorial-caption">COOKWARE</span>
                <h3 className="editorial-headline-sm mt-3">Materials that<br />endure.</h3>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-xs font-[300] tracking-wide-custom text-linen/50 group-hover:text-ember transition-colors duration-700">
                  VIEW COLLECTION
                  <span className="w-0 group-hover:w-5 h-[1px] bg-current transition-all duration-700" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="md:col-span-4 flex flex-col gap-4">
            <Reveal delay={200}>
              <Link href="/collections" className="group relative block aspect-[4/3] overflow-hidden" data-cursor="VIEW">
                <Image src="/images/cookware/04-flatlay.jpg" alt="Premium cookware collection — cast iron, copper, stainless steel on dark surface" fill className="object-cover transition-transform duration-[1.6s] group-hover:scale-[1.03] img-grade" sizes="(max-width: 768px) 100vw, 30vw" />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6"><span className="editorial-caption">BAKEWARE</span></div>
              </Link>
            </Reveal>
            <Reveal delay={300}>
              <Link href="/collections" className="group relative block aspect-[4/3] overflow-hidden" data-cursor="VIEW">
                <Image src="/images/materials/03-brass-detail.jpg" alt="Unlacquered brass hardware — living finish, natural patina development" fill className="object-cover transition-transform duration-[1.6s] group-hover:scale-[1.03] img-grade" sizes="(max-width: 768px) 100vw, 30vw" />
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

// ─── MATERIALS TEASER ──────────────────────────────────────────
function MaterialsTeaser() {
  const materials = [
    { name: "Cast Iron", image: "/images/materials/01-marble-countertop.jpg" },
    { name: "Copper", image: "/images/materials/04-copper-patina.jpg" },
    { name: "Walnut", image: "/images/cabinetry/02-handleless-design.jpg" },
    { name: "Brass", image: "/images/materials/03-brass-detail.jpg" },
  ];

  return (
    <section className="editorial-section">
      <div className="mx-auto max-w-[1400px] site-padding">
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
                <Image src={material.image} alt={material.name} fill className="object-cover transition-transform duration-[1.6s] group-hover:scale-[1.04] img-tactile" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-display text-sm font-[200] tracking-[0.08em] text-linen/80 group-hover:text-linen transition-colors duration-700">{material.name}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SHOWROOM CTA ──────────────────────────────────────────────
function ShowroomCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[55vh] flex items-center">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image src="/images/appliances/bosch-kitchen-hero.jpg" alt="Bosch premium kitchen — integrated appliances, clean architectural lines" fill className="object-cover img-atmospheric" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-void/60" />

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
              <Link href="/contact" className="font-body text-sm font-[300] tracking-wide-custom text-smoke/60 transition-colors duration-700 hover:text-ember">
                BOOK APPOINTMENT
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
