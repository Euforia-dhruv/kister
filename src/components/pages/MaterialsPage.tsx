"use client";

import Image from "next/image";
import Reveal from "@/components/site/Reveal";

const MATERIALS = [
  {
    name: "Cast Iron",
    description: "Dense, heat-retaining, and virtually indestructible. Le Creuset enameled cast iron develops a patina that improves with every meal. The material of grandmothers.",
    image: "/images/marble-veins.jpg",
    properties: ["Heat retention", "Durability", "Naturally non-stick"],
    brands: ["Le Creuset", "Meyer"],
    detail: "Cast iron has been the preferred cooking material for centuries. Its thermal mass means it holds heat evenly and releases it slowly — perfect for searing, braising, and baking. Le Creuset's enamel coating adds a non-reactive surface that doesn't require seasoning.",
  },
  {
    name: "Copper",
    description: "The most responsive cooking material known. Copper heats evenly, cools instantly, and turns oxidation into art. A material that rewards care with beauty.",
    image: "/images/brass-detail.jpg",
    properties: ["Instant response", "Even heating", "Living patina"],
    brands: ["Mauviel", "de Buyer"],
    detail: "Copper conducts heat 25 times faster than stainless steel. The moment you adjust the flame, the pan responds. Over time, unlacquered copper develops a living patina — darkening, aging, telling the story of meals cooked.",
  },
  {
    name: "Granite Composite",
    description: "BLANCO SILGRANIT: 80% granite, 20% acrylic resin. Non-polarizing, scratch-resistant, and available in colors that make stone jealous.",
    image: "/images/dark-kitchen-v2.jpg",
    properties: ["Scratch resistant", "Heat resistant", "Stain proof"],
    brands: ["BLANCO"],
    detail: "SILGRANIT is 80% granite — one of the hardest natural materials on earth — bonded with 20% acrylic resin. The result is a sink surface that resists scratches, stains, and heat up to 280°C. It's also non-polarizing, meaning it won't absorb odors or discolor.",
  },
  {
    name: "Walnut",
    description: "American black walnut: dark, rich, and warm. Ages from chocolate to amber. Used in Scavolini cabinetry for handles, panels, and open shelving.",
    image: "/images/artisan-hands-v2.jpg",
    properties: ["Warmth", "Grain variation", "Ages beautifully"],
    brands: ["Scavolini"],
    detail: "American black walnut (Juglans nigra) is prized for its rich, dark heartwood. It ages from deep chocolate to warm amber over decades. Scavolini uses it for handles, panels, and open shelving — adding warmth to modern kitchen designs.",
  },
  {
    name: "Brass",
    description: "Unlacquered brass develops a living finish — darkening, aging, telling the story of hands that touch it. The opposite of disposable.",
    image: "/images/brass-detail.jpg",
    properties: ["Living finish", "Antimicrobial", "Timeless"],
    brands: ["Franke", "BLANCO"],
    detail: "Brass is an alloy of copper and zinc. Unlacquered brass develops a natural patina that's unique to each piece — darkening in high-touch areas, lightening in others. This living finish is the opposite of disposable: it improves with age.",
  },
  {
    name: "Stainless Steel",
    description: "German-engineered 18/10 stainless: mirror-polished, acid-resistant, and built for commercial kitchens. Miele and Bosch wrap their appliances in this permanence.",
    image: "/images/dark-kitchen-v2.jpg",
    properties: ["Hygienic", "Corrosion proof", "Professional grade"],
    brands: ["Miele", "Bosch", "Siemens"],
    detail: "18/10 stainless steel (18% chromium, 10% nickel) is the gold standard for kitchen surfaces. It's non-reactive, corrosion-resistant, and can be polished to a mirror finish. Miele and Bosch use it for appliances that look new after decades of use.",
  },
];

export default function MaterialsPage() {
  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="scene scene-dark flex items-center justify-center px-6 py-40">
        <div className="max-w-4xl text-center">
          <Reveal blur>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">MATERIALS</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-[100] leading-[1.05] tracking-[0.04em] text-linen">
              Materials that<br />deserve the name.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 font-body text-[clamp(0.9rem,1.5vw,1.1rem)] font-[300] leading-relaxed text-smoke max-w-2xl mx-auto">
              We don&apos;t sell products. We curate materials — each chosen for its integrity, its craft, and its ability to transform a kitchen into something permanent.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Materials */}
      <section className="scene scene-warm px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl flex flex-col gap-32">
          {MATERIALS.map((material, i) => (
            <Reveal key={material.name} delay={i * 50}>
              <div className={`grid grid-cols-1 gap-16 lg:grid-cols-2 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Image */}
                <div className={`relative aspect-[4/5] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover img-grade"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                </div>

                {/* Content */}
                <div className={`flex flex-col gap-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="font-body text-xs font-[500] tracking-ultra text-ember">
                    0{i + 1}
                  </span>
                  <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
                    {material.name}
                  </h2>
                  <p className="font-body text-[clamp(0.9rem,1.2vw,1rem)] font-[300] leading-[1.8] text-smoke">
                    {material.description}
                  </p>
                  <p className="font-body text-sm font-[300] leading-[1.8] text-smoke/80">
                    {material.detail}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {material.properties.map((prop) => (
                      <span
                        key={prop}
                        className="font-body text-[0.65rem] font-[400] tracking-wide-custom text-ember border border-ember/20 px-3 py-1"
                      >
                        {prop}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-body text-xs font-[300] text-smoke">Featured in:</span>
                    {material.brands.map((b, j) => (
                      <span key={b} className="font-body text-xs font-[400] text-linen/70">
                        {b}{j < material.brands.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
