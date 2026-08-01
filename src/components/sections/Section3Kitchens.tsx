"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";

/* ─── SECTION 3: FEATURED KITCHENS ────────────────────────── */
/* Premium portfolio. Alternating left/right layout.            */

const KITCHENS = [
  {
    name: "Poetica",
    series: "Scavolini Poetica",
    location: "Coimbatore",
    description: "Where tradition meets contemporary. Handleless facades. Warm walnut internals. A kitchen that feels like home from the first touch.",
    image: "/images/kitchens/scavolini-poetica-island.jpg",
    style: "Contemporary Italian",
  },
  {
    name: "DeLinea",
    series: "Scavolini DeLinea",
    location: "Bangalore",
    description: "The art of disappearance. Push-to-open mechanisms. Seamless surfaces. Pure form reduced to its essence.",
    image: "/images/kitchens/scavolini-delinea-peninsula.jpg",
    style: "Minimalist Handleless",
  },
  {
    name: "Carattere",
    series: "Scavolini Carattere",
    location: "Chennai",
    description: "Bold lines, confident materials. A kitchen with personality — designed for those who know what they want.",
    image: "/images/kitchens/scavolini-carattere-hero.jpg",
    style: "Bold Italian",
  },
];

export default function Section3Kitchens() {
  return (
    <section className="relative bg-void py-[clamp(100px,14vh,180px)]">
      <div className="max-w-[1400px] mx-auto" style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
        {/* Header */}
        <Reveal>
          <span className="editorial-caption block mb-4">
            KITCHENS
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="editorial-headline">
            Featured collections.
          </h2>
        </Reveal>
      </div>

      {/* Kitchens */}
      <div className="mt-20">
        {KITCHENS.map((kitchen, i) => (
          <KitchenRow key={kitchen.name} kitchen={kitchen} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto mt-20" style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
        <Reveal>
          <Link
            href="/collections"
            className="magnetic-btn"
          >
            VIEW ALL KITCHENS
            <span className="btn-arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function KitchenRow({
  kitchen,
  index,
}: {
  kitchen: (typeof KITCHENS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="max-w-[1400px] mx-auto py-[clamp(40px,6vh,80px)]"
      style={{ padding: "clamp(40px,6vh,80px) clamp(1.5rem, 5vw, 6rem)" }}
    >
      <div
        className={`grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center`}
      >
        {/* Image */}
        <Reveal
          className={`${isReversed ? "md:col-span-7 md:order-2" : "md:col-span-7"}`}
          scale
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              <Image
                src={kitchen.image}
                alt={`${kitchen.name} — ${kitchen.series}`}
                fill
                className="object-cover"
                style={{
                  filter: "saturate(0.85) contrast(1.05) brightness(0.8)",
                }}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-void/30 to-transparent" />
          </div>
        </Reveal>

        {/* Content */}
        <div
          className={`${
            isReversed
              ? "md:col-span-4 md:order-1 md:mr-auto"
              : "md:col-span-4 md:col-start-9"
          }`}
        >
          <Reveal delay={200}>
            <span className="editorial-caption block mb-3">
              {kitchen.style.toUpperCase()}
            </span>
            <h3 className="editorial-headline-sm">
              {kitchen.name}
            </h3>
            <p className="font-body text-[0.72rem] font-[300] tracking-wide-custom text-smoke/30 mt-3">
              {kitchen.series} — {kitchen.location}
            </p>
            <div className="h-[1px] w-10 bg-ember/35 mt-6" />
            <p className="editorial-body mt-6 max-w-[340px]">
              {kitchen.description}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 font-body text-[0.72rem] font-[400] tracking-[0.15em] text-linen/40 transition-colors duration-500 hover:text-ember"
            >
              EXPLORE
              <span className="w-0 hover:w-4 h-[1px] bg-current transition-all duration-500" />
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
