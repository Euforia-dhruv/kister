"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";

const CanvasExperience = dynamic(() => import("@/components/canvas/CanvasExperience"), { ssr: false });

const COLLECTIONS = [
  { name: "Cookware", image: "/images/marble-veins.jpg", href: "/collections" },
  { name: "Bakeware", image: "/images/brass-detail.jpg", href: "/collections" },
  { name: "Barware", image: "/images/artisan-hands-v2.jpg", href: "/collections" },
  { name: "Kitchen Tools", image: "/images/dark-kitchen-v2.jpg", href: "/collections" },
];

const BRANDS = [
  "Scavolini", "Bosch", "Le Creuset", "Dyson", "Miele",
  "Blum", "BLANCO", "Franke", "Smeg", "Siemens",
];

export default function Home() {
  return (
    <main className="relative bg-void">
      {/* ─── CINEMATIC INTRO ──────────────────────────── */}
      <CanvasExperience />

      {/* ─── TRANSITION: INTRO → WEBSITE ──────────────── */}
      <div className="relative bg-void">
        {/* Hero statement */}
        <section className="scene scene-dark flex items-center justify-center px-6 py-32">
          <div className="max-w-4xl text-center">
            <Reveal blur>
              <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-[100] leading-[1.1] tracking-[0.06em] text-linen">
                A kitchen is not furniture.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 font-body text-[clamp(0.9rem,1.5vw,1.2rem)] font-[300] leading-relaxed text-smoke">
                It is where life happens. Where meals are made. Where conversations begin.
                Where families gather. Kitser curates the finest materials, appliances, and
                cookware to create kitchens that honour this truth.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <Link
                href="/collections"
                className="mt-12 inline-block border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
              >
                EXPLORE COLLECTIONS
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Philosophy */}
        <section className="scene scene-dark flex items-center px-6 py-32 md:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2">
            <Reveal>
              <div className="flex flex-col gap-6">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">PHILOSOPHY</span>
                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] leading-[1.15] tracking-[0.04em] text-linen text-balance">
                  Heritage meets innovation.
                </h2>
                <p className="font-body text-[clamp(0.85rem,1.2vw,1rem)] font-[300] leading-[1.8] text-smoke">
                  For over three decades, Kitser has curated the world&apos;s finest kitchen
                  essentials. From the cast-iron heritage of Le Creuset to the precision
                  engineering of Bosch, we bring together materials and makers who share
                  our obsession with craft.
                </p>
                <p className="font-body text-[clamp(0.85rem,1.2vw,1rem)] font-[300] leading-[1.8] text-smoke">
                  Every product in our collection has been chosen not for its price point,
                  but for its integrity. We believe a kitchen should be built from materials
                  that last generations — not seasons.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200} scale>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="/images/dark-kitchen-v2.jpg"
                  alt="Kitser showroom"
                  className="h-full w-full object-cover img-grade"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Collections preview */}
        <section className="scene scene-dark px-6 py-32 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-16">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">COLLECTIONS</span>
                <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
                  Curated with intention.
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {COLLECTIONS.map((col, i) => (
                <Reveal key={col.name} delay={i * 100}>
                  <Link href={col.href} className="group relative block aspect-[3/4] overflow-hidden">
                    <img
                      src={col.image}
                      alt={col.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 img-grade"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <span className="font-display text-sm font-[300] tracking-wide-custom text-linen transition-colors group-hover:text-ember">
                        {col.name}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="scene scene-warm px-6 py-32 md:px-12">
          <div className="mx-auto max-w-7xl text-center">
            <Reveal>
              <span className="font-body text-xs font-[500] tracking-ultra text-ember">PARTNERS</span>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
                The world&apos;s finest makers.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                {BRANDS.map((brand) => (
                  <span
                    key={brand}
                    className="font-body text-sm font-[300] tracking-wide-custom text-smoke/60 transition-colors hover:text-linen"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Showroom CTA */}
        <section className="scene scene-dark flex items-center justify-center px-6 py-32">
          <div className="max-w-3xl text-center">
            <Reveal blur>
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-[100] tracking-[0.06em] text-linen">
                Visit the showroom.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 font-body text-[clamp(0.9rem,1.5vw,1.1rem)] font-[300] leading-relaxed text-smoke">
                No. 1, Nava India Road, Coimbatore — 641028
              </p>
            </Reveal>
            <Reveal delay={400}>
              <Link
                href="/showroom"
                className="mt-10 inline-block border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
              >
                DIRECTIONS
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
