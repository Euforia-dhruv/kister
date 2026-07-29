"use client";

import Image from "next/image";
import Reveal from "@/components/site/Reveal";

const MATERIALS = [
  {
    name: "Cast Iron",
    description: "Dense, heat-retaining, and virtually indestructible. Le Creuset enameled cast iron develops a patina that improves with every meal.",
    image: "/images/materials/01-marble-countertop.jpg",
    properties: ["Heat retention", "Durability", "Naturally non-stick"],
    brands: ["Le Creuset", "Meyer"],
  },
  {
    name: "Copper",
    description: "The most responsive cooking material known. Copper heats evenly, cools instantly, and turns oxidation into art.",
    image: "/images/materials/04-copper-patina.jpg",
    properties: ["Instant response", "Even heating", "Living patina"],
    brands: ["Mauviel", "de Buyer"],
  },
  {
    name: "Granite Composite",
    description: "BLANCO SILGRANIT: 80% granite, 20% acrylic resin. Non-polarizing, scratch-resistant, and available in colors that make stone jealous.",
    image: "/images/hardware/blanco-claron-700.webp",
    properties: ["Scratch resistant", "Heat resistant", "Stain proof"],
    brands: ["BLANCO"],
  },
  {
    name: "Walnut",
    description: "American black walnut: dark, rich, and warm. Ages from chocolate to amber. Used in Scavolini cabinetry.",
    image: "/images/cabinetry/02-handleless-design.jpg",
    properties: ["Warmth", "Grain variation", "Ages beautifully"],
    brands: ["Scavolini"],
  },
  {
    name: "Brass",
    description: "Unlacquered brass develops a living finish — darkening, aging, telling the story of hands that touch it.",
    image: "/images/materials/03-brass-detail.jpg",
    properties: ["Living finish", "Antimicrobial", "Timeless"],
    brands: ["Franke", "BLANCO"],
  },
  {
    name: "Stainless Steel",
    description: "German-engineered 18/10 stainless: mirror-polished, acid-resistant, and built for commercial kitchens.",
    image: "/images/materials/05-steel-finish.jpg",
    properties: ["Hygienic", "Corrosion proof", "Professional grade"],
    brands: ["Miele", "Bosch", "Siemens"],
  },
];

export default function MaterialsSection() {
  return (
    <section className="editorial-section border-t border-linen/5">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center mb-20">
            <span className="editorial-caption">MATERIALS</span>
            <h2 className="editorial-headline-md mt-4">
              Materials that deserve the name.
            </h2>
            <p className="editorial-body mt-6 mx-auto max-w-md">
              We curate materials — each chosen for its integrity, its craft, and its ability to transform a kitchen into something permanent.
            </p>
          </div>
        </Reveal>

        {/* Materials — editorial splits */}
        <div className="flex flex-col gap-24">
          {MATERIALS.map((material, i) => {
            const isReversed = i % 2 === 1;
            return (
              <Reveal key={material.name} delay={i * 50}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center">
                  <div className={`relative aspect-[4/5] overflow-hidden ${isReversed ? "md:col-span-5 md:order-2" : "md:col-span-7"}`}>
                    <Image
                      src={material.image}
                      alt={material.name}
                      fill
                      className="object-cover img-tactile"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />
                  </div>
                  <div className={`flex flex-col gap-6 ${isReversed ? "md:col-span-6 md:order-1" : "md:col-span-4 md:col-start-9"}`}>
                    <span className="editorial-caption">0{i + 1}</span>
                    <h3 className="editorial-headline-sm">{material.name}</h3>
                    <p className="editorial-body">{material.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {material.properties.map((prop) => (
                        <span key={prop} className="editorial-label border border-ember/20 px-3 py-1.5">{prop}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-body text-xs font-[300] text-smoke/40">Featured in:</span>
                      {material.brands.map((b, j) => (
                        <span key={b} className="font-body text-xs font-[400] text-linen/50">
                          {b}{j < material.brands.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
