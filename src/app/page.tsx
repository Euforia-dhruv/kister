"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import BrandsSection from "@/components/sections/BrandsSection";

const CanvasExperience = dynamic(() => import("@/components/canvas/CanvasExperience"), { ssr: false });

export default function Home() {
  return (
    <main className="relative bg-void">
      {/* ─── CINEMATIC INTRO ──────────────────────────── */}
      <CanvasExperience />

      {/* ─── WEBSITE ──────────────────────────────────── */}
      <div className="relative bg-void">

        {/* ─── HERO: Editorial split — image left, text right ─── */}
        <section className="editorial-section-lg">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center">
              {/* Large image — takes 7 cols */}
              <Reveal className="md:col-span-7" scale>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/kitchens/scavolini-poetica-island.jpg"
                    alt="Scavolini Poetica kitchen — Pecan Ash island composition"
                    fill
                    className="object-cover img-grade"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                </div>
              </Reveal>

              {/* Text — takes 5 cols, offset right */}
              <div className="md:col-span-4 md:col-start-9 flex flex-col justify-center">
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
                      className="group inline-flex items-center gap-3 border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
                    >
                      EXPLORE
                      <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
                    </Link>
                    <Link
                      href="/contact"
                      className="font-body text-sm font-[300] tracking-wide-custom text-smoke transition-colors duration-300 hover:text-ember"
                    >
                      BOOK A CONSULTATION
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COLLECTIONS: Editorial magazine — one large, two small ─── */}
        <section className="editorial-section-lg">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <span className="editorial-caption">COLLECTIONS</span>
              <h2 className="editorial-headline-md mt-4">
                Curated with<br />intention.
              </h2>
            </Reveal>

            {/* Magazine layout: large feature + two stacked supporting */}
            <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-4">
              {/* Large feature — 8 cols */}
              <Reveal className="md:col-span-8" delay={100}>
                <Link href="/collections" className="group relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/kitchens/scavolini-delinea-brass.jpg"
                    alt="Scavolini DeLinea kitchen — brass handle profiles"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 img-grade"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <span className="editorial-caption">COOKWARE</span>
                    <h3 className="editorial-headline-sm mt-3">
                      Materials that<br />endure.
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 font-body text-xs font-[300] tracking-wide-custom text-linen/60 transition-colors group-hover:text-ember">
                      VIEW COLLECTION <span className="w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {/* Two stacked supporting — 4 cols */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <Reveal delay={200}>
                  <Link href="/collections" className="group relative block aspect-[4/3] overflow-hidden">
                    <Image
                    src="/images/cookware/04-flatlay.jpg"
                    alt="Cookware flatlay arrangement"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 img-grade"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="editorial-caption">BAKEWARE</span>
                    </div>
                  </Link>
                </Reveal>
                <Reveal delay={300}>
                  <Link href="/collections" className="group relative block aspect-[4/3] overflow-hidden">
                    <Image
                    src="/images/materials/03-brass-detail.jpg"
                    alt="Brass material closeup"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 img-grade"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="editorial-caption">BARWARE</span>
                    </div>
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ─── BRANDS ──────────────────────────────────── */}
        <BrandsSection />

        {/* ─── SHOWROOM CTA: Full-bleed atmospheric ─── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/appliances/bosch-kitchen-hero.jpg"
              alt="Bosch kitchen lifestyle"
              fill
              className="object-cover img-atmospheric"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-void/60" />
          </div>
          <div className="relative editorial-section-lg">
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
                    className="group inline-flex items-center gap-3 border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
                  >
                    GET DIRECTIONS
                    <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
                  </Link>
                  <Link
                    href="/contact"
                    className="font-body text-sm font-[300] tracking-wide-custom text-smoke transition-colors duration-300 hover:text-ember"
                  >
                    BOOK APPOINTMENT
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
