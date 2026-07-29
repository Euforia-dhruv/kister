"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/site/Reveal";

const MATERIALS = [
  {
    name: "Cast Iron",
    description: "Dense, heat-retaining, and virtually indestructible. Le Creuset enameled cast iron develops a patina that improves with every meal.",
    image: "/images/materials/01-marble-countertop.jpg",
    properties: ["Heat retention", "Durability", "Naturally non-stick"],
    brands: ["Le Creuset", "Meyer"],
    lighting: "warm",
  },
  {
    name: "Copper",
    description: "The most responsive cooking material known. Copper heats evenly, cools instantly, and turns oxidation into art.",
    image: "/images/materials/04-copper-patina.jpg",
    properties: ["Instant response", "Even heating", "Living patina"],
    brands: ["Mauviel", "de Buyer"],
    lighting: "warm",
  },
  {
    name: "Granite Composite",
    description: "BLANCO SILGRANIT: 80% granite, 20% acrylic resin. Non-polarizing, scratch-resistant, and available in colors that make stone jealous.",
    image: "/images/hardware/blanco-claron-700.webp",
    properties: ["Scratch resistant", "Heat resistant", "Stain proof"],
    brands: ["BLANCO"],
    lighting: "cold",
  },
  {
    name: "Walnut",
    description: "American black walnut: dark, rich, and warm. Ages from chocolate to amber. Used in Scavolini cabinetry.",
    image: "/images/cabinetry/02-handleless-design.jpg",
    properties: ["Warmth", "Grain variation", "Ages beautifully"],
    brands: ["Scavolini"],
    lighting: "soft",
  },
  {
    name: "Brass",
    description: "Unlacquered brass develops a living finish — darkening, aging, telling the story of hands that touch it.",
    image: "/images/materials/03-brass-detail.jpg",
    properties: ["Living finish", "Antimicrobial", "Timeless"],
    brands: ["Franke", "BLANCO"],
    lighting: "warm",
  },
  {
    name: "Stainless Steel",
    description: "German-engineered 18/10 stainless: mirror-polished, acid-resistant, and built for commercial kitchens.",
    image: "/images/materials/05-steel-finish.jpg",
    properties: ["Hygienic", "Corrosion proof", "Professional grade"],
    brands: ["Miele", "Bosch", "Siemens"],
    lighting: "cold",
  },
];

function MaterialChapter({ material, index }: { material: typeof MATERIALS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const isReversed = index % 2 === 1;

  // Lighting overlay based on material type
  const lightingOverlay = {
    warm: "radial-gradient(ellipse at 30% 50%, rgba(196,90,44,0.06) 0%, transparent 60%)",
    cold: "radial-gradient(ellipse at 70% 50%, rgba(100,120,140,0.06) 0%, transparent 60%)",
    soft: "radial-gradient(ellipse at 50% 50%, rgba(180,160,140,0.05) 0%, transparent 60%)",
  }[material.lighting];

  return (
    <div ref={ref} className="relative material-chapter">
      {/* Lighting atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: lightingOverlay }} />

      <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12">
        <div className={`grid grid-cols-1 gap-8 md:gap-12 items-center ${isReversed ? "" : ""}`}
          style={{ direction: isReversed ? "rtl" : "ltr" }}
        >
          {/* Image — cinematic with parallax */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden" style={{ direction: "ltr" }}>
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY, scale: imageScale }}
            >
              <Image
                src={material.image}
                alt={material.name}
                fill
                className="object-cover img-tactile"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </motion.div>
            <div className="absolute inset-0 img-warm img-vignette" />

            {/* Texture overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.4) 100%)",
            }} />

            {/* Number */}
            <div className="absolute top-6 left-6">
              <span className="font-display text-[0.6rem] font-[100] tracking-[0.3em] text-linen/30">
                0{index + 1}
              </span>
            </div>
          </div>

          {/* Text — editorial */}
          <motion.div
            className="flex flex-col gap-6 py-8"
            style={{ y: textY, direction: "ltr" }}
          >
            <Reveal>
              <span className="editorial-caption">MATERIAL</span>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="editorial-headline-sm">{material.name}</h3>
            </Reveal>
            <Reveal delay={200}>
              <p className="editorial-body max-w-md">{material.description}</p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-wrap gap-2 mt-2">
                {material.properties.map((prop) => (
                  <span key={prop} className="editorial-label border border-ember/15 px-3 py-1.5">
                    {prop}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="flex items-center gap-2 mt-4">
                <span className="font-body text-[0.6rem] font-[300] text-smoke/30 tracking-wide-custom">FEATURED IN</span>
                <div className="w-8 h-[1px] bg-linen/10" />
                {material.brands.map((b, j) => (
                  <span key={b} className="font-body text-[0.7rem] font-[400] text-linen/50">
                    {b}{j < material.brands.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function MaterialsSection() {
  return (
    <section className="relative">
      <div className="editorial-section border-t border-linen/5">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="mb-16">
              <span className="editorial-caption">MATERIALS</span>
              <h2 className="editorial-headline-md mt-4">
                Materials that deserve the name.
              </h2>
              <p className="editorial-body mt-6 max-w-md">
                We curate materials — each chosen for its integrity, its craft, and its ability to transform a kitchen into something permanent.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Material chapters — cinematic */}
      <div className="flex flex-col">
        {MATERIALS.map((material, i) => (
          <MaterialChapter key={material.name} material={material} index={i} />
        ))}
      </div>
    </section>
  );
}
