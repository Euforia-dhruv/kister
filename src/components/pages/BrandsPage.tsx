"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/site/Reveal";

const BRANDS = [
  {
    name: "Scavolini",
    category: "Cabinetry",
    origin: "Italy",
    year: 1961,
    desc: "Italian kitchen design since 1961. Handcrafted cabinetry that transforms kitchens into living spaces.",
    story: "For over sixty years, Scavolini has defined what an Italian kitchen means. Not just a place to cook — a place to live. Every cabinet is a statement of intent: that design and function are inseparable.",
    image: "/images/kitchens/scavolini-poetica-hero.jpg",
  },
  {
    name: "Bosch",
    category: "Appliances",
    origin: "Germany",
    year: 1886,
    desc: "German engineering excellence. Quiet, efficient, built to outlast trends.",
    story: "Bosch doesn't make noise. Their appliances disappear into the kitchen — working silently, efficiently, reliably. That's the point. Technology should serve, not announce itself.",
    image: "/images/appliances/bosch-kitchen-lifestyle.jpg",
  },
  {
    name: "Le Creuset",
    category: "Cookware",
    origin: "France",
    year: 1925,
    desc: "Enameled cast iron since 1925. Each piece is hand-finished in Fresnoy-le-Grand, France.",
    story: "In 1925, two Belgian iron founders and a French metal specialist created something extraordinary. Nearly a century later, each piece is still hand-finished in the same French foundry. The colors, the weight, the heat — there is no substitute.",
    image: "/images/cookware/06-hero.jpg",
  },
  {
    name: "Miele",
    category: "Appliances",
    origin: "Germany",
    year: 1899,
    desc: "Immer besser — always better. Built to last 20 years.",
    story: "Miele tests every appliance for the equivalent of 20 years of use. Their standard isn't market expectations — it's engineering integrity. When a Miele dishwasher outlasts your kitchen renovation, that's not an accident.",
    image: "/images/appliances/miele-gen7000-lifestyle.jpg",
  },
  {
    name: "Blum",
    category: "Hardware",
    origin: "Austria",
    year: 1952,
    desc: "The invisible backbone of every premium kitchen. Soft-close hinges and drawer systems.",
    story: "You never see Blum hardware. You feel it. The silent close of a drawer. The perfect alignment of a door. That's the result of seven decades of obsession with the things most people never think about.",
    image: "/images/hardware/04-hero.jpg",
  },
  {
    name: "BLANCO",
    category: "Sinks",
    origin: "Germany",
    year: 1925,
    desc: "SILGRANIT granite composite. 80% granite, 20% acrylic. Non-polarizing, scratch-resistant.",
    story: "BLANCO's SILGRANIT is 80% natural granite — one of the hardest materials on earth. The result is a sink that resists scratches, stains, and heat up to 280°C. It also comes in colors that make stone jealous.",
    image: "/images/hardware/sinks-hero.jpg",
  },
  {
    name: "Smeg",
    category: "Appliances",
    origin: "Italy",
    year: 1948,
    desc: "Where technology meets style. Retro and contemporary appliances that make statements.",
    story: "Smeg proves that appliances don't have to be invisible. Their retro refrigerators are icons. Their contemporary lines are sculpture. Technology and beauty — not one or the other.",
    image: "/images/appliances/smeg-musa-lifestyle.jpg",
  },
];

const FEATURED_INDICES = [0, 2, 4];

export default function BrandsPage() {
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);

  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="py-[clamp(80px,12vh,160px)]">
        <div className="mx-auto max-w-[1400px] text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <span className="editorial-caption">PARTNERS</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="editorial-headline mt-6">
              The world&apos;s finest<br />makers.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              35+ brand partnerships. 12 countries. One philosophy: every product must earn its place through craft, integrity, and materials that endure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured brands — editorial splits */}
      {FEATURED_INDICES.map((idx, i) => {
        const brand = BRANDS[idx];
        const isReversed = i % 2 === 1;
        return (
          <section key={brand.name} className="py-[clamp(40px,6vh,80px)]">
            <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center">
                <Reveal className={`${isReversed ? "md:col-span-5 md:order-2" : "md:col-span-7"}`} scale>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={brand.image}
                      alt={`${brand.name} ${brand.category.toLowerCase()} displayed in modern kitchen setting`}
                      fill
                      className="object-cover img-grade"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />
                  </div>
                </Reveal>
                <div className={`${isReversed ? "md:col-span-6 md:order-1" : "md:col-span-4 md:col-start-9"} flex flex-col justify-center`}>
                  <Reveal delay={200}>
                    <span className="editorial-caption">{brand.category.toUpperCase()}</span>
                    <h2 className="editorial-headline-md mt-4">{brand.name}</h2>
                    <p className="font-body text-xs font-[300] tracking-wide-custom text-smoke/40 mt-3">
                      {brand.origin} · Est. {brand.year}
                    </p>
                    <p className="editorial-body mt-6 max-w-sm">{brand.story}</p>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* All brands — editorial list */}
      <section className="py-[clamp(80px,12vh,160px)]">
        <div className="mx-auto max-w-[1000px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal>
            <span className="editorial-caption">ALL PARTNERS</span>
          </Reveal>
          <div className="mt-16">
            {BRANDS.map((brand, i) => (
              <Reveal key={brand.name} delay={i * 40}>
                <div
                  className="group border-b border-linen/5 py-8 cursor-pointer"
                  onClick={() => setExpandedBrand(expandedBrand === brand.name ? null : brand.name)}
                >
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-6">
                      <span className="font-body text-[0.6rem] font-[400] tracking-ultra text-ember/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl text-linen/65 group-hover:text-linen transition-colors duration-500">
                        {brand.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden sm:inline font-body text-[0.6rem] font-[400] tracking-wide-custom text-smoke/35">
                        {brand.category.toUpperCase()} · {brand.origin}
                      </span>
                      <motion.span
                        animate={{ rotate: expandedBrand === brand.name ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-ember/35 text-lg"
                      >
                        +
                      </motion.span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedBrand === brand.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 pl-12 max-w-2xl">
                          <p className="editorial-body">{brand.story}</p>
                          <div className="mt-4 flex items-center gap-2">
                            <span className="font-body text-[0.6rem] font-[400] tracking-wide-custom text-ember/70">
                              Est. {brand.year}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[clamp(80px,12vh,160px)]">
        <div className="mx-auto max-w-3xl text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <h2 className="editorial-headline-md">
              35+ brands.<br />One standard.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              If a product doesn&apos;t meet our standard, it doesn&apos;t enter our showroom.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="magnetic-btn"
              >
                DISCUSS YOUR PROJECT
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
