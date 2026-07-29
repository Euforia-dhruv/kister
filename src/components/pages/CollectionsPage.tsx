"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/site/Reveal";

const CATEGORIES = [
  {
    name: "Cookware",
    desc: "Cast iron, copper, stainless steel. Materials that improve with age.",
    longDesc: "From Le Creuset's enameled cast iron to Meyer's tri-ply stainless, our cookware collection spans three centuries of culinary craft. Every piece is chosen for heat retention, durability, and the kind of beauty that only improves with use.",
    image: "/images/cookware/01-cast-iron.jpg",
    brands: ["Le Creuset", "Meyer", "Bergner", "Mauviel"],
    featured: "Le Creuset Signature Dutch Oven",
    layout: "large" as const,
  },
  {
    name: "Bakeware",
    desc: "From stoneware to silicone. Built for heat, designed for table.",
    longDesc: "Le Creuset stoneware goes from oven to table. Borosil glass goes from freezer to microwave. Our bakeware isn't just functional — it's the kind of thing you'd serve from, not hide away.",
    image: "/images/cookware/bakeware-hero.jpg",
    brands: ["Le Creuset", "Borosil"],
    featured: "Le Creuset Stoneware Collection",
    layout: "small" as const,
  },
  {
    name: "Barware",
    desc: "Crystal, steel, copper. The ritual of making drinks deserves precision.",
    longDesc: "Nachtmann crystal, Dubblin steel, hand-hammered copper. Our barware collection treats cocktail-making as the craft it is — with tools that feel as good as the drinks they create.",
    image: "/images/cookware/barware-hero.jpg",
    brands: ["Nachtmann", "Dubblin"],
    featured: "Nachtmann Heritage Crystal",
    layout: "small" as const,
  },
  {
    name: "Kitchen Tools",
    desc: "Knives, peelers, graters. The instruments of daily craft.",
    longDesc: "Bosch precision engineering meets Futura's Indian craftsmanship. Our kitchen tools are the kind you reach for every day — built to last, designed to feel right in your hand.",
    image: "/images/kitchens/scavolini-poetica-ushaped.jpg",
    brands: ["Bosch", "Futura"],
    featured: "Bosch Professional Series",
    layout: "large" as const,
  },
  {
    name: "Sinks & Faucets",
    desc: "Granite, steel, brass. The unsung heroes of the kitchen.",
    longDesc: "BLANCO's SILGRANIT granite composite, Franke's stainless steel, Reginox's brass. The sink is where the kitchen works hardest — ours are built to outlast everything else in the room.",
    image: "/images/cookware/01-cast-iron.jpg",
    brands: ["BLANCO", "Franke", "Reginox"],
    featured: "BLANCO SILGRANIT",
    layout: "small" as const,
  },
  {
    name: "Storage",
    desc: "Hidden systems. Blum hinges. Kesseböhmer pull-outs. Everything in its place.",
    longDesc: "Blum's soft-close hinges, Hettich's drawer systems, Kesseböhmer's pull-out organizers. The best kitchen hardware is the kind you never see — but always feel.",
    image: "/images/cookware/bakeware-hero.jpg",
    brands: ["Blum", "Hettich", "Kesseböhmer"],
    featured: "Blum LEGRABOX",
    layout: "small" as const,
  },
];

export default function CollectionsPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-[1400px] text-center">
          <Reveal blur>
            <span className="editorial-caption">COLLECTIONS</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="editorial-headline mt-6">
              Every material<br />has a story.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Featured collection — full editorial split */}
      <section className="editorial-section-sm">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center cursor-pointer"
            onClick={() => setExpandedCategory(expandedCategory === "Cookware" ? null : "Cookware")}
          >
            <Reveal className="md:col-span-7" scale>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={CATEGORIES[0].image}
                  alt={CATEGORIES[0].name}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105 img-grade"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
              </div>
            </Reveal>

            <div className="md:col-span-4 md:col-start-9 flex flex-col justify-center">
              <Reveal delay={200}>
                <span className="editorial-caption">{CATEGORIES[0].brands[0].toUpperCase()}</span>
                <h2 className="editorial-headline-md mt-4">
                  {CATEGORIES[0].name}
                </h2>
                <p className="editorial-body mt-6 max-w-sm">
                  {CATEGORIES[0].desc}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {CATEGORIES[0].brands.map((b) => (
                    <span key={b} className="editorial-label border border-linen/10 px-3 py-1.5">
                      {b}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining collections — editorial grid */}
      <section className="editorial-section">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {CATEGORIES.slice(1).map((cat, i) => (
              <Reveal key={cat.name} delay={i * 100}>
                <div
                  className="group relative block overflow-hidden cursor-pointer"
                  onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                >
                  <div className={`relative overflow-hidden ${i % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 img-grade"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <span className="editorial-caption">{cat.brands[0].toUpperCase()}</span>
                      <h3 className="editorial-headline-sm mt-2">{cat.name}</h3>
                      <p className="editorial-body mt-2 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded category detail */}
      <AnimatePresence>
        {expandedCategory && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="scene scene-warm overflow-hidden"
          >
            <div className="editorial-section">
              <div className="mx-auto max-w-[1000px]">
                {CATEGORIES.filter((c) => c.name === expandedCategory).map((cat) => (
                  <div key={cat.name} className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div className="flex flex-col gap-6">
                      <span className="editorial-caption">COLLECTION DETAIL</span>
                      <h3 className="editorial-headline-sm">{cat.name}</h3>
                      <p className="editorial-body">{cat.longDesc}</p>
                      <div className="mt-4">
                        <span className="editorial-caption">FEATURED</span>
                        <p className="font-body text-sm font-[300] text-linen mt-2">{cat.featured}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-4">
                        {cat.brands.map((b) => (
                          <span key={b} className="editorial-label border border-linen/10 px-4 py-2">{b}</span>
                        ))}
                      </div>
                      <motion.button
                        whileHover={{ x: 4 }}
                        className="self-start mt-4 font-body text-xs font-[400] tracking-wide-custom text-ember transition-colors hover:text-flame"
                      >
                        INQUIRE ABOUT THIS COLLECTION →
                      </motion.button>
                    </div>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover img-grade"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 img-warm img-vignette" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Brand statement */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal blur>
            <h2 className="editorial-headline-md">
              35+ brands.<br />One standard.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-lg">
              We represent Scavolini, Bosch, Le Creuset, Dyson, Miele, Blum, BLANCO, Franke,
              Smeg, Siemens, and more. But we don&apos;t chase brand names. We chase quality.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
