"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  },
  {
    name: "Bakeware",
    desc: "From stoneware to silicone. Built for heat, designed for table.",
    longDesc: "Le Creuset stoneware goes from oven to table. Borosil glass goes from freezer to microwave. Our bakeware isn't just functional — it's the kind of thing you'd serve from, not hide away.",
    image: "/images/cookware/bakeware-hero.jpg",
    brands: ["Le Creuset", "Borosil"],
    featured: "Le Creuset Stoneware Collection",
  },
  {
    name: "Barware",
    desc: "Crystal, steel, copper. The ritual of making drinks deserves precision.",
    longDesc: "Nachtmann crystal, Dubblin steel, hand-hammered copper. Our barware collection treats cocktail-making as the craft it is — with tools that feel as good as the drinks they create.",
    image: "/images/cookware/barware-hero.jpg",
    brands: ["Nachtmann", "Dubblin"],
    featured: "Nachtmann Heritage Crystal",
  },
  {
    name: "Kitchen Tools",
    desc: "Knives, peelers, graters. The instruments of daily craft.",
    longDesc: "Bergner and Meyer bring precision engineering to everyday tools. Our kitchen tools are the kind you reach for every day — built to last, designed to feel right in your hand.",
    image: "/images/hardware/05-detail.jpg",
    brands: ["Bergner", "Meyer"],
    featured: "Bergner Professional Series",
  },
  {
    name: "Sinks & Faucets",
    desc: "Granite, steel, brass. The unsung heroes of the kitchen.",
    longDesc: "BLANCO's SILGRANIT granite composite, Franke's stainless steel, Reginox's brass. The sink is where the kitchen works hardest — ours are built to outlast everything else in the room.",
    image: "/images/hardware/sinks-hero.jpg",
    brands: ["BLANCO", "Franke", "Reginox"],
    featured: "BLANCO SILGRANIT",
  },
  {
    name: "Storage",
    desc: "Hidden systems. Blum hinges. Kesseböhmer pull-outs. Everything in its place.",
    longDesc: "Blum's soft-close hinges, Hettich's drawer systems, Kesseböhmer's pull-out organizers. The best kitchen hardware is the kind you never see — but always feel.",
    image: "/images/hardware/storage-hero.jpg",
    brands: ["Blum", "Hettich", "Kesseböhmer"],
    featured: "Blum LEGRABOX",
  },
];

export default function CollectionsPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="py-[clamp(80px,12vh,160px)]">
        <div className="mx-auto max-w-[1400px] text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <span className="editorial-caption">COLLECTIONS</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="editorial-headline mt-6">
              Every material<br />has a story.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              Cookware, bakeware, barware, tools, sinks, and storage.
              Curated from 35+ brands across 12 countries.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured collection — asymmetric editorial split */}
      <section className="py-[clamp(40px,6vh,80px)]">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center cursor-pointer group"
            onClick={() => setExpandedCategory(expandedCategory === "Cookware" ? null : "Cookware")}
          >
            <Reveal className="md:col-span-7" scale>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/kitchens/scavolini-delinea-hero.jpg"
                  alt="Scavolini DeLinea kitchen — premium modular design"
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
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
                <div className="mt-8">
                  <span className="inline-flex items-center gap-2 font-body text-xs font-[300] tracking-wide-custom text-linen/45 group-hover:text-ember transition-colors duration-500">
                    EXPLORE COLLECTION
                    <span className="w-0 group-hover:w-5 h-[1px] bg-current transition-all duration-700" />
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining collections — asymmetric editorial grid */}
      <section className="py-[clamp(60px,10vh,120px)]">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-4">
            {/* Large card — 8 cols */}
            <Reveal className="md:col-span-8" delay={0}>
              <div
                className="group relative block overflow-hidden cursor-pointer"
                onClick={() => setExpandedCategory(expandedCategory === CATEGORIES[1].name ? null : CATEGORIES[1].name)}
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <Image src={CATEGORIES[1].image} alt="Le Creuset stoneware bakeware" fill
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                    sizes="(max-width: 768px) 100vw, 70vw" />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="editorial-caption">{CATEGORIES[1].brands[0].toUpperCase()}</span>
                    <h3 className="editorial-headline-sm mt-2">{CATEGORIES[1].name}</h3>
                    <p className="editorial-body mt-2 max-w-sm">{CATEGORIES[1].desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Small card — 4 cols */}
            <Reveal className="md:col-span-4" delay={100}>
              <div
                className="group relative block overflow-hidden cursor-pointer"
                onClick={() => setExpandedCategory(expandedCategory === CATEGORIES[2].name ? null : CATEGORIES[2].name)}
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <Image src={CATEGORIES[2].image} alt="Nachtmann crystal barware" fill
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                    sizes="(max-width: 768px) 100vw, 30vw" />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="editorial-caption">{CATEGORIES[2].brands[0].toUpperCase()}</span>
                    <h3 className="editorial-headline-sm mt-2">{CATEGORIES[2].name}</h3>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Row 2: three equal */}
            {CATEGORIES.slice(3).map((cat, i) => (
              <Reveal key={cat.name} className="md:col-span-4" delay={i * 80}>
                <div
                  className="group relative block overflow-hidden cursor-pointer"
                  onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                >
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <Image src={cat.image} alt={`${cat.name} collection`} fill
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                      sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 img-warm img-vignette" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8">
                      <span className="editorial-caption">{cat.brands[0].toUpperCase()}</span>
                      <h3 className="editorial-headline-sm mt-2">{cat.name}</h3>
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
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="scene scene-warm overflow-hidden"
          >
            <div className="py-[clamp(60px,10vh,120px)]">
              <div className="mx-auto max-w-[1000px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
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
                      <Link
                        href="/contact"
                        className="self-start mt-4 inline-flex items-center gap-2 font-body text-xs font-[400] tracking-wide-custom text-ember transition-colors duration-500 hover:text-flame"
                      >
                        INQUIRE ABOUT THIS COLLECTION
                        <span className="w-0 hover:w-4 h-[1px] bg-current transition-all duration-500" />
                      </Link>
                    </div>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image src={cat.image} alt={`${cat.name} collection detail`} fill className="object-cover img-grade"
                        sizes="(max-width: 768px) 100vw, 50vw" />
                      <div className="absolute inset-0 img-warm img-vignette" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Closing statement */}
      <section className="py-[clamp(80px,12vh,160px)]">
        <div className="mx-auto max-w-3xl text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
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
          <Reveal delay={400}>
            <div className="mt-10">
              <Link href="/brands" className="magnetic-btn">
                VIEW ALL BRANDS
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
