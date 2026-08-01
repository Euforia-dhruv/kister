"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";

/* ─── SECTION 8: FINAL CTA ─────────────────────────────────── */
/* Huge full-screen kitchen image. Large heading.               */
/* Design your dream kitchen. Buttons.                          */

export default function Section8CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.02]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src="/images/kitchens/scavolini-poetica-hero.jpg"
          alt="Design your dream kitchen — Kitser premium kitchen design"
          fill
          className="object-cover"
          style={{
            filter: "saturate(0.8) contrast(1.05) brightness(0.5)",
          }}
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-void/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/60" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-[800px]" style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
        <Reveal blur>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-[100] tracking-[0.08em] text-linen leading-[1.05]">
            Design your<br />dream kitchen.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="h-[1px] w-16 bg-ember/40 mx-auto mt-10" />
        </Reveal>

        <Reveal delay={300}>
          <p className="font-body text-[clamp(0.85rem,1.1vw,1.05rem)] font-[300] leading-[1.8] text-smoke/50 max-w-[440px] mx-auto mt-8">
            Walk in, call, or begin online. However you reach us, we&apos;re ready to listen.
          </p>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-ember px-8 py-3 font-body text-sm font-[300] tracking-[0.08em] text-ember transition-all duration-500 hover:bg-ember hover:text-void"
            >
              BOOK CONSULTATION
              <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
            </Link>
            <Link
              href="/showroom"
              className="group inline-flex items-center gap-3 border border-linen/15 px-8 py-3 font-body text-sm font-[300] tracking-[0.08em] text-linen/60 transition-all duration-500 hover:border-linen/30 hover:text-linen"
            >
              VISIT SHOWROOM
              <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-linen/15 px-8 py-3 font-body text-sm font-[300] tracking-[0.08em] text-linen/60 transition-all duration-500 hover:border-linen/30 hover:text-linen"
            >
              GET QUOTE
              <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
