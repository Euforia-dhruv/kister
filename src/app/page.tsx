"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import BrandsSection from "@/components/sections/BrandsSection";

const CanvasExperience = dynamic(() => import("@/components/canvas/CanvasExperience"), { ssr: false });

const COLLECTIONS = [
  { name: "Cookware", image: "/images/marble-veins.jpg", href: "/collections" },
  { name: "Bakeware", image: "/images/brass-detail.jpg", href: "/collections" },
  { name: "Barware", image: "/images/artisan-hands-v2.jpg", href: "/collections" },
  { name: "Kitchen Tools", image: "/images/dark-kitchen-v2.jpg", href: "/collections" },
];

export default function Home() {
  return (
    <main className="relative bg-void">
      {/* ─── CINEMATIC INTRO ──────────────────────────── */}
      <CanvasExperience />

      {/* ─── WEBSITE ──────────────────────────────────── */}
      <div className="relative bg-void">
        {/* Hero statement */}
        <section className="flex items-center justify-center px-6 py-32 md:py-40">
          <div className="max-w-4xl text-center">
            <Reveal blur>
              <h1 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-[100] leading-[1.08] tracking-[0.05em] text-linen text-balance">
                A kitchen is not furniture.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 font-body text-[clamp(0.9rem,1.4vw,1.15rem)] font-[300] leading-[1.9] text-smoke max-w-2xl mx-auto">
                It is where life happens. Kitser curates the world&apos;s finest
                materials, appliances, and cookware to create kitchens that honour this truth.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/collections"
                  className="group inline-flex items-center gap-3 border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
                >
                  EXPLORE COLLECTIONS
                  <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-body text-sm font-[300] tracking-wide-custom text-smoke transition-colors duration-300 hover:text-ember"
                >
                  BOOK A CONSULTATION
                  <span className="text-ember">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Collections preview */}
        <section className="px-6 py-24 md:py-32 md:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="flex items-end justify-between mb-16">
                <div>
                  <span className="font-body text-xs font-[500] tracking-ultra text-ember">COLLECTIONS</span>
                  <h2 className="mt-4 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-[100] tracking-[0.04em] text-linen">
                    Curated with intention.
                  </h2>
                </div>
                <Link
                  href="/collections"
                  className="hidden md:inline-flex items-center gap-2 font-body text-xs font-[400] tracking-wide-custom text-ember transition-colors hover:text-flame"
                >
                  VIEW ALL <span>→</span>
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {COLLECTIONS.map((col, i) => (
                <Reveal key={col.name} delay={i * 80}>
                  <Link href={col.href} className="group relative block aspect-[3/4] overflow-hidden">
                    <Image
                      src={col.image}
                      alt={col.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 img-grade"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                        <span className="font-display text-sm font-[300] tracking-wide-custom text-linen transition-colors group-hover:text-ember">
                          {col.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 md:hidden text-center">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 font-body text-xs font-[400] tracking-wide-custom text-ember"
              >
                VIEW ALL <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Brands */}
        <BrandsSection />

        {/* Showroom CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/dark-kitchen-v2.jpg"
              alt=""
              fill
              className="object-cover img-grade opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-void/70" />
          </div>
          <div className="relative flex items-center justify-center px-6 py-32 md:py-40">
            <div className="max-w-3xl text-center">
              <Reveal blur>
                <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-[100] tracking-[0.06em] text-linen">
                  Visit the showroom.
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 font-body text-[clamp(0.9rem,1.4vw,1.1rem)] font-[300] leading-relaxed text-smoke">
                  No. 1, Nava India Road, Coimbatore — 641028
                </p>
              </Reveal>
              <Reveal delay={400}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/showroom"
                    className="group inline-flex items-center gap-3 border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
                  >
                    GET DIRECTIONS
                    <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-body text-sm font-[300] tracking-wide-custom text-smoke transition-colors duration-300 hover:text-ember"
                  >
                    BOOK APPOINTMENT
                    <span className="text-ember">→</span>
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
