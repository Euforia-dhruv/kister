"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/site/Reveal";
import { MATERIALS } from "@/lib/brand";

/* ─── SECTION 2: MATERIALS ────────────────────────────────── */
/* Premium material cards. Large photography.                  */
/* Minimal labels. Beautiful hover animations.                 */

export default function Section2Materials() {
  return (
    <section className="relative bg-void py-[clamp(80px,12vh,160px)]">
      <div className="max-w-[1400px] mx-auto" style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
        {/* Header */}
        <Reveal>
          <span className="font-body text-[0.55rem] font-[400] tracking-[0.25em] text-ember/60 block mb-4">
            MATERIALS
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-[100] tracking-[0.06em] text-linen max-w-[500px]">
            Materials that<br />deserve the name.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] font-[300] leading-[1.8] text-smoke/40 max-w-[420px] mt-6">
            Each chosen for how it performs, how it ages, and how it makes you feel when you touch it.
          </p>
        </Reveal>

        {/* Material grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(12px,1.5vw,20px)]">
          {MATERIALS.map((mat, i) => (
            <Reveal key={mat.name} delay={i * 80}>
              <MaterialCard material={mat} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialCard({
  material,
  index,
}: {
  material: (typeof MATERIALS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden cursor-pointer"
      whileHover="hover"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={material.image}
          alt={`${material.name} — ${material.brand}`}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          style={{
            filter: "saturate(0.85) contrast(1.05) brightness(0.8)",
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-void/10 to-transparent" />

        {/* Hover reveal */}
        <motion.div
          className="absolute inset-0 bg-void/40"
          initial={{ opacity: 0 }}
          variants={{ hover: { opacity: 1 } }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-[clamp(16px,2vw,28px)]">
        <motion.div
          initial={{ y: 0 }}
          variants={{ hover: { y: -8 } }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-body text-[0.42rem] font-[400] tracking-[0.2em] text-ember/50 block mb-1">
            {material.brand.toUpperCase()}
          </span>
          <h3 className="font-display text-[clamp(1rem,1.6vw,1.3rem)] font-[200] tracking-[0.04em] text-linen">
            {material.name}
          </h3>
        </motion.div>

        {/* Hover detail */}
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          variants={{ hover: { height: "auto", opacity: 1 } }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-body text-[0.7rem] font-[300] leading-[1.7] text-smoke/50 mt-3 max-w-[280px]">
            {material.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {material.properties.map((prop) => (
              <span
                key={prop}
                className="font-body text-[0.4rem] font-[400] tracking-[0.12em] text-linen/30 border border-linen/10 px-2 py-0.5"
              >
                {prop.toUpperCase()}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Number */}
      <div className="absolute top-0 right-0 p-6">
        <span className="font-display text-[2.5rem] font-[100] text-linen/[0.04] leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}
