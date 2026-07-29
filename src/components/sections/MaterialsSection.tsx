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
  },
  {
    name: "Copper",
    description: "The most responsive cooking material known. Copper heats evenly, cools instantly, and turns oxidation into art. A material that rewards care with beauty.",
    image: "/images/brass-detail.jpg",
    properties: ["Instant response", "Even heating", "Living patina"],
    brands: ["Mauviel", "de Buyer"],
  },
  {
    name: "Granite Composite",
    description: "BLANCO SILGRANIT: 80% granite, 20% acrylic resin. Non-polarizing, scratch-resistant, and available in colors that make stone jealous.",
    image: "/images/dark-kitchen-v2.jpg",
    properties: ["Scratch resistant", "Heat resistant", "Stain proof"],
    brands: ["BLANCO"],
  },
  {
    name: "Walnut",
    description: "American black walnut: dark, rich, and warm. Ages from chocolate to amber. Used in Scavolini cabinetry for handles, panels, and open shelving.",
    image: "/images/artisan-hands-v2.jpg",
    properties: ["Warmth", "Grain variation", "Ages beautifully"],
    brands: ["Scavolini"],
  },
  {
    name: "Brass",
    description: "Unlacquered brass develops a living finish — darkening, aging, telling the story of hands that touch it. The opposite of disposable.",
    image: "/images/brass-detail.jpg",
    properties: ["Living finish", "Antimicrobial", "Timeless"],
    brands: ["Franke", "BLANCO"],
  },
  {
    name: "Stainless Steel",
    description: "German-engineered 18/10 stainless: mirror-polished, acid-resistant, and built for commercial kitchens. Miele and Bosch wrap their appliances in this permanence.",
    image: "/images/dark-kitchen-v2.jpg",
    properties: ["Hygienic", "Corrosion proof", "Professional grade"],
    brands: ["Miele", "Bosch", "Siemens"],
  },
];

export default function MaterialsSection() {
  return (
    <section className="scene scene-warm px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-20">
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">MATERIALS</span>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
              Materials that deserve the name.
            </h2>
            <p className="mt-6 font-body text-[clamp(0.9rem,1.3vw,1.05rem)] font-[300] leading-[1.8] text-smoke max-w-2xl mx-auto">
              We don&apos;t sell products. We curate materials — each chosen for its integrity, its craft, and its ability to transform a kitchen into something permanent.
            </p>
          </div>
        </Reveal>

        {/* Materials grid */}
        <div className="flex flex-col gap-20">
          {MATERIALS.map((material, i) => (
            <Reveal key={material.name} delay={i * 50}>
              <div className={`grid grid-cols-1 gap-12 md:grid-cols-2 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* Image */}
                <div className={`relative aspect-[4/5] overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover img-grade"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                </div>

                {/* Content */}
                <div className={`flex flex-col gap-6 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <span className="font-body text-xs font-[500] tracking-ultra text-ember">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
                    {material.name}
                  </h3>
                  <p className="font-body text-[clamp(0.9rem,1.3vw,1.05rem)] font-[300] leading-[1.8] text-smoke">
                    {material.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
