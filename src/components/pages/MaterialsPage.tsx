"use client";

import Image from "next/image";
import Reveal from "@/components/site/Reveal";

const MATERIALS = [
  {
    name: "Cast Iron",
    description: "Dense, heat-retaining, and virtually indestructible. Le Creuset enameled cast iron develops a patina that improves with every meal. The material of grandmothers.",
    detail: "Cast iron has been the preferred cooking material for centuries. Its thermal mass means it holds heat evenly and releases it slowly — perfect for searing, braising, and baking.",
    image: "/images/cookware/04-hero.jpg",
    properties: ["Heat retention", "Durability", "Naturally non-stick"],
    brands: ["Le Creuset", "Meyer"],
  },
  {
    name: "Copper",
    description: "The most responsive cooking material known. Copper heats evenly, cools instantly, and turns oxidation into art. A material that rewards care with beauty.",
    detail: "Copper conducts heat 25 times faster than stainless steel. The moment you adjust the flame, the pan responds. Over time, unlacquered copper develops a living patina.",
    image: "/images/materials/04-copper-patina.jpg",
    properties: ["Instant response", "Even heating", "Living patina"],
    brands: ["Mauviel", "de Buyer"],
  },
  {
    name: "Granite Composite",
    description: "BLANCO SILGRANIT: 80% granite, 20% acrylic resin. Non-polarizing, scratch-resistant, and available in colors that make stone jealous.",
    detail: "SILGRANIT is 80% granite — one of the hardest natural materials on earth — bonded with 20% acrylic resin. The result resists scratches, stains, and heat up to 280°C.",
    image: "/images/hardware/blanco-claron-700.webp",
    properties: ["Scratch resistant", "Heat resistant", "Stain proof"],
    brands: ["BLANCO"],
  },
  {
    name: "Walnut",
    description: "American black walnut: dark, rich, and warm. Ages from chocolate to amber. Used in Scavolini cabinetry for handles, panels, and open shelving.",
    detail: "American black walnut is prized for its rich, dark heartwood. It ages from deep chocolate to warm amber over decades. Scavolini uses it for handles, panels, and open shelving.",
    image: "/images/cabinetry/02-handleless-design.jpg",
    properties: ["Warmth", "Grain variation", "Ages beautifully"],
    brands: ["Scavolini"],
  },
  {
    name: "Brass",
    description: "Unlacquered brass develops a living finish — darkening, aging, telling the story of hands that touch it. The opposite of disposable.",
    detail: "Brass is an alloy of copper and zinc. Unlacquered brass develops a natural patina unique to each piece — darkening in high-touch areas, lightening in others.",
    image: "/images/materials/03-brass-detail.jpg",
    properties: ["Living finish", "Antimicrobial", "Timeless"],
    brands: ["Franke", "BLANCO"],
  },
  {
    name: "Stainless Steel",
    description: "German-engineered 18/10 stainless: mirror-polished, acid-resistant, and built for commercial kitchens. Miele and Bosch wrap their appliances in this permanence.",
    detail: "18/10 stainless steel is the gold standard for kitchen surfaces. Non-reactive, corrosion-resistant, and can be polished to a mirror finish. It looks new after decades.",
    image: "/images/materials/05-steel-finish.jpg",
    properties: ["Hygienic", "Corrosion proof", "Professional grade"],
    brands: ["Miele", "Bosch", "Siemens"],
  },
];

export default function MaterialsPage() {
  return (
    <main className="relative bg-void">
      {/* Hero — full viewport */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-[1400px] text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <span className="editorial-caption">MATERIALS</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="editorial-headline mt-6">
              Materials that<br />deserve the name.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              Six materials. Each chosen for how it performs, how it ages,
              and how it makes you feel when you touch it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Materials — editorial splits, alternating, with per-material atmosphere */}
      {MATERIALS.map((material, i) => {
        const isReversed = i % 2 === 1;
        return (
          <section key={material.name} className="editorial-section">
            <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center">
                <Reveal
                  className={`${isReversed ? "md:col-span-5 md:order-2" : "md:col-span-7"}`}
                  scale
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={material.image}
                      alt={`${material.name} material detail showing texture and finish`}
                      fill
                      className="object-cover img-tactile"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />
                    {/* Material number overlay */}
                    <div className="absolute top-0 right-0 p-8">
                      <span className="font-display text-[4rem] md:text-[6rem] font-[100] text-linen/[0.04] leading-none">
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                </Reveal>

                <div
                  className={`${
                    isReversed
                      ? "md:col-span-6 md:order-1"
                      : "md:col-span-4 md:col-start-9"
                  } flex flex-col justify-center`}
                >
                  <Reveal delay={200}>
                    <span className="editorial-caption">0{i + 1}</span>
                    <h2 className="editorial-headline-md mt-4">{material.name}</h2>
                    <p className="editorial-body mt-6 max-w-sm">
                      {material.description}
                    </p>
                    <p className="font-body text-sm font-[300] leading-[1.8] text-smoke/60 mt-4 max-w-sm">
                      {material.detail}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-8">
                      {material.properties.map((prop) => (
                        <span
                          key={prop}
                          className="editorial-label border border-ember/20 px-3 py-1.5"
                        >
                          {prop}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <span className="font-body text-xs font-[300] text-smoke/40">Featured in:</span>
                      {material.brands.map((b, j) => (
                        <span key={b} className="font-body text-xs font-[400] text-linen/50">
                          {b}{j < material.brands.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing statement */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-3xl text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <h2 className="editorial-headline-md">
              Good materials<br />don&apos;t need explanation.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-lg">
              You feel the difference the moment you touch them. That&apos;s how
              you know a material deserves its name.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
