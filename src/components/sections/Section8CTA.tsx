"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";

/* ─── SECTION 8: FINAL CTA ─────────────────────────────────── */
/* Huge full-screen kitchen image. Large serif heading.         */

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
          <h2 className="editorial-headline">
            Design your<br />dream kitchen.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="h-[1px] w-16 bg-ember/30 mx-auto mt-12" />
        </Reveal>

        <Reveal delay={300}>
          <p className="editorial-body mx-auto max-w-[440px] mt-8">
            Walk in, call, or begin online. However you reach us, we&apos;re ready to listen.
          </p>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              href="/contact"
              className="magnetic-btn border-ember hover:bg-ember hover:text-void"
            >
              BOOK CONSULTATION
              <span className="btn-arrow">→</span>
            </Link>
            <Link
              href="/showroom"
              className="magnetic-btn"
            >
              VISIT SHOWROOM
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
