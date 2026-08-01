"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/site/Reveal";

/* ─── SECTION 1: ITALIAN DESIGN ──────────────────────────── */
/* Large typography over full-screen photography.              */
/* Slow zooms, parallax, elegant fades.                        */

const BLOCKS = [
  {
    headline: "ITALIAN DESIGN.\nCrafted for modern living.",
    body: "Every kitchen begins long before the first cabinet is installed. It begins with a conversation — about light, about space, about how you live.",
    image: "/images/kitchens/scavolini-poetica-hero.jpg",
    alt: "Scavolini Poetica kitchen — Italian design for modern living",
  },
  {
    headline: "MATERIALS THAT\nspeak for themselves.",
    body: "Cast iron that remembers your meals. Copper that ages with grace. Stone that holds the temperature of your intention. We choose materials that deserve the name.",
    image: "/images/kitchens/scavolini-delinea-hero.jpg",
    alt: "Scavolini DeLinea kitchen — premium materials and finishes",
  },
  {
    headline: "THREE DECADES\nof curated craft.",
    body: "Since 1989, one showroom in Coimbatore. One conviction: that premium kitchen essentials should be accessible to anyone willing to invest in quality.",
    image: "/images/kitchens/scavolini-carattere-hero.jpg",
    alt: "Scavolini Carattere kitchen — bold Italian character",
  },
];

export default function Section1Design() {
  return (
    <section className="relative bg-void">
      {BLOCKS.map((block, i) => (
        <DesignBlock key={i} block={block} index={i} />
      ))}
    </section>
  );
}

function DesignBlock({
  block,
  index,
}: {
  block: (typeof BLOCKS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.03]);
  const textY = useTransform(scrollYProgress, [0, 1], ["40px", "-20px"]);

  return (
    <div
      ref={ref}
      className="relative h-screen overflow-hidden flex items-center"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={block.image}
          alt={block.alt}
          fill
          className="object-cover"
          style={{
            filter: "saturate(0.8) contrast(1.05) brightness(0.65)",
          }}
          sizes="100vw"
          priority={index === 0}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-void/40 to-transparent" />

      {/* Typography */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto w-full"
        style={{
          padding: "clamp(2rem, 6vw, 6rem)",
          y: textY,
        }}
      >
        <Reveal>
          <span className="font-body text-[0.55rem] font-[400] tracking-[0.25em] text-ember/60 block mb-6">
            {String(index + 1).padStart(2, "0")}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-[100] leading-[1.05] tracking-[-0.01em] text-linen whitespace-pre-line max-w-[700px]">
            {block.headline}
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className="h-[1px] w-16 bg-ember/40 mt-8" />
        </Reveal>
        <Reveal delay={300}>
          <p className="font-body text-[clamp(0.85rem,1.1vw,1.05rem)] font-[300] leading-[1.8] text-smoke/50 max-w-[440px] mt-8">
            {block.body}
          </p>
        </Reveal>
      </motion.div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}
