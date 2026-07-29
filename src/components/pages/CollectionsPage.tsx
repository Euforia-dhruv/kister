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
    image: "/images/marble-veins.jpg",
    brands: ["Le Creuset", "Meyer", "Bergner", "Mauviel"],
    tag: "materials",
    count: 4,
    featured: "Le Creuset Signature Dutch Oven",
  },
  {
    name: "Bakeware",
    desc: "From stoneware to silicone. Built for heat, designed for table.",
    longDesc: "Le Creuset stoneware goes from oven to table. Borosil glass goes from freezer to microwave. Our bakeware isn't just functional — it's the kind of thing you'd serve from, not hide away.",
    image: "/images/brass-detail.jpg",
    brands: ["Le Creuset", "Borosil"],
    tag: "materials",
    count: 2,
    featured: "Le Creuset Stoneware Collection",
  },
  {
    name: "Barware",
    desc: "Crystal, steel, copper. The ritual of making drinks deserves precision.",
    longDesc: "Nachtmann crystal, Dubblin steel, hand-hammered copper. Our barware collection treats cocktail-making as the craft it is — with tools that feel as good as the drinks they create.",
    image: "/images/artisan-hands-v2.jpg",
    brands: ["Nachtmann", "Dubblin"],
    tag: "lifestyle",
    count: 2,
    featured: "Nachtmann Heritage Crystal",
  },
  {
    name: "Kitchen Tools",
    desc: "Knives, peelers, graters. The instruments of daily craft.",
    longDesc: "Bosch precision engineering meets Futura's Indian craftsmanship. Our kitchen tools are the kind you reach for every day — built to last, designed to feel right in your hand.",
    image: "/images/dark-kitchen-v2.jpg",
    brands: ["Bosch", "Futura"],
    tag: "appliances",
    count: 2,
    featured: "Bosch Professional Series",
  },
  {
    name: "Sinks & Faucets",
    desc: "Granite, steel, brass. The unsung heroes of the kitchen.",
    longDesc: "BLANCO's SILGRANIT granite composite, Franke's stainless steel, Reginox's brass. The sink is where the kitchen works hardest — ours are built to outlast everything else in the room.",
    image: "/images/marble-veins.jpg",
    brands: ["BLANCO", "Franke", "Reginox"],
    tag: "materials",
    count: 3,
    featured: "BLANCO SILGRANIT",
  },
  {
    name: "Storage",
    desc: "Hidden systems. Blum hinges. Kesseböhmer pull-outs. Everything in its place.",
    longDesc: "Blum's soft-close hinges, Hettich's drawer systems, Kesseböhmer's pull-out organizers. The best kitchen hardware is the kind you never see — but always feel.",
    image: "/images/brass-detail.jpg",
    brands: ["Blum", "Hettich", "Kesseböhmer"],
    tag: "appliances",
    count: 3,
    featured: "Blum LEGRABOX",
  },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Materials", value: "materials" },
  { label: "Appliances", value: "appliances" },
  { label: "Lifestyle", value: "lifestyle" },
];

export default function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filtered = activeFilter === "all"
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.tag === activeFilter);

  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="scene scene-dark flex items-center justify-center px-6 py-40">
        <div className="max-w-4xl text-center">
          <Reveal blur>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">COLLECTIONS</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-[100] leading-[1.05] tracking-[0.04em] text-linen">
              Every material<br />has a story.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 font-body text-[clamp(0.9rem,1.5vw,1.1rem)] font-[300] leading-relaxed text-smoke max-w-2xl mx-auto">
              We don&apos;t sell products. We curate collections from the world&apos;s finest makers —
              each chosen for its integrity, its craft, and its ability to transform a kitchen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="scene scene-dark px-6 pt-12 pb-0 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap gap-4 justify-center">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`font-body text-xs font-[400] tracking-wide-custom px-5 py-2 border transition-all duration-500 ${
                    activeFilter === f.value
                      ? "border-ember text-ember"
                      : "border-linen/10 text-smoke hover:border-linen/30 hover:text-linen"
                  }`}
                >
                  {f.label.toUpperCase()}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="scene scene-dark px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Reveal delay={i * 80}>
                    <div
                      className="group relative block aspect-[4/5] overflow-hidden cursor-pointer"
                      onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                    >
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 img-grade"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 img-warm img-vignette" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-void/0 group-hover:bg-void/40 transition-all duration-500" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-body text-[0.6rem] font-[400] tracking-ultra text-ember">
                              {cat.count} BRAND{cat.count > 1 ? "S" : ""}
                            </span>
                          </div>
                          <h3 className="font-display text-xl font-[300] tracking-[0.06em] text-linen">
                            {cat.name}
                          </h3>
                          <p className="mt-2 font-body text-sm font-[300] leading-[1.6] text-linen/70 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {cat.desc}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {cat.brands.map((b) => (
                              <span key={b} className="font-body text-[0.65rem] font-[400] tracking-wide-custom text-ember/80">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
            <div className="px-6 py-24 md:px-12">
              <div className="mx-auto max-w-5xl">
                {CATEGORIES.filter((c) => c.name === expandedCategory).map((cat) => (
                  <div key={cat.name} className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div className="flex flex-col gap-6">
                      <span className="font-body text-xs font-[500] tracking-ultra text-ember">
                        COLLECTION DETAIL
                      </span>
                      <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
                        {cat.name}
                      </h3>
                      <p className="font-body text-[clamp(0.9rem,1.3vw,1.05rem)] font-[300] leading-[1.8] text-smoke">
                        {cat.longDesc}
                      </p>
                      <div className="flex flex-col gap-3 mt-4">
                        <span className="font-body text-xs font-[500] tracking-ultra text-ember">FEATURED</span>
                        <span className="font-body text-sm font-[300] text-linen">{cat.featured}</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <span className="font-body text-xs font-[500] tracking-ultra text-ember">BRANDS</span>
                        <div className="flex flex-wrap gap-3">
                          {cat.brands.map((b) => (
                            <span
                              key={b}
                              className="font-body text-sm font-[300] text-linen border border-linen/10 px-4 py-2"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
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
      <section className="scene scene-dark flex items-center justify-center px-6 py-32">
        <div className="max-w-3xl text-center">
          <Reveal blur>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
              35+ brands. One standard.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 font-body text-[clamp(0.9rem,1.3vw,1.05rem)] font-[300] leading-[1.8] text-smoke">
              We represent Scavolini, Bosch, Le Creuset, Dyson, Miele, Blum, BLANCO, Franke,
              Smeg, Siemens, and more. But we don&apos;t chase brand names. We chase quality.
              If a product doesn&apos;t meet our standard, it doesn&apos;t enter our showroom.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
