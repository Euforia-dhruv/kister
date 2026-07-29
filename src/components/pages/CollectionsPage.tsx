"use client";

import Reveal from "@/components/site/Reveal";

const CATEGORIES = [
  {
    name: "Cookware",
    desc: "Cast iron, copper, stainless steel. Materials that improve with age.",
    image: "/images/marble-veins.jpg",
    brands: ["Le Creuset", "Meyer", "Bergner"],
  },
  {
    name: "Bakeware",
    desc: "From stoneware to silicone. Built for heat, designed for table.",
    image: "/images/brass-detail.jpg",
    brands: ["Le Creuset", "Borosil"],
  },
  {
    name: "Barware",
    desc: "Crystal, steel, copper. The ritual of making drinks deserves precision.",
    image: "/images/artisan-hands-v2.jpg",
    brands: ["Nachtmann", "Dubblin"],
  },
  {
    name: "Kitchen Tools",
    desc: "Knives, peelers, graters. The instruments of daily craft.",
    image: "/images/dark-kitchen-v2.jpg",
    brands: ["Bosch", "Futura"],
  },
  {
    name: "Sinks & Faucets",
    desc: "Granite, steel, brass. The unsung heroes of the kitchen.",
    image: "/images/marble-veins.jpg",
    brands: ["BLANCO", "Franke", "Reginox"],
  },
  {
    name: "Storage",
    desc: "Hidden systems. Blum hinges. Kesseböhmer pull-outs. Everything in its place.",
    image: "/images/brass-detail.jpg",
    brands: ["Blum", "Hettich", "Kesseböhmer"],
  },
];

export default function CollectionsPage() {
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

      {/* Categories */}
      <section className="scene scene-dark px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 100}>
                <div className="group relative block aspect-[4/5] overflow-hidden cursor-pointer">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 img-grade"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="font-display text-xl font-[300] tracking-[0.06em] text-linen">
                      {cat.name}
                    </h3>
                    <p className="mt-2 font-body text-sm font-[300] leading-[1.6] text-linen/70 max-w-xs">
                      {cat.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cat.brands.map((b) => (
                        <span key={b} className="font-body text-[0.65rem] font-[400] tracking-wide-custom text-ember/80">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="scene scene-warm flex items-center justify-center px-6 py-32">
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
