"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/site/Reveal";
import { BRAND } from "@/lib/brand";

/* ─── SECTION 4: WHY KITSER ───────────────────────────────── */
/* Editorial blocks from scraped content.                       */
/* Animate each block individually.                             */

const REASONS = [
  {
    number: "01",
    title: `${BRAND.yearsOfExperience}+ Years`,
    subtitle: "EXPERIENCE",
    description: `Since ${BRAND.founded}, one showroom in ${BRAND.location.city}. One conviction: that premium kitchen essentials should be accessible to anyone willing to invest in quality.`,
  },
  {
    number: "02",
    title: `${BRAND.brandPartners}+`,
    subtitle: "ITALIAN PARTNERSHIPS",
    description: `${BRAND.countriesSourced} countries. Scavolini, Le Creuset, Bosch, Miele, Blum, BLANCO, Franke, Smeg. We don't chase brand names. We chase quality.`,
  },
  {
    number: "03",
    title: "PREMIUM",
    subtitle: "APPLIANCES",
    description: "Bosch induction. Miele ranges. Smeg statement pieces. Siemens smart integration. Every appliance chosen for performance that matches the cabinetry.",
  },
  {
    number: "04",
    title: "PROFESSIONAL",
    subtitle: "INSTALLATION",
    description: "Every joint checked by hand. Every hinge tested 80,000 times. Every drawer opened and closed before it leaves the workshop. The hands behind the kitchen.",
  },
  {
    number: "05",
    title: "LIFETIME",
    subtitle: "SUPPORT",
    description: "A kitchen is a relationship, not a transaction. We're here for the first meal, the ten-thousandth, and every one in between.",
  },
];

export default function Section4WhyKitser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative bg-void py-[clamp(80px,12vh,160px)]">
      <div className="max-w-[1400px] mx-auto" style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
        {/* Header */}
        <Reveal>
          <span className="font-body text-[0.55rem] font-[400] tracking-[0.25em] text-ember/60 block mb-4">
            WHY KITSER
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-[100] tracking-[0.06em] text-linen max-w-[500px]">
            Built on trust.<br />Backed by craft.
          </h2>
        </Reveal>

        {/* Reasons with timeline */}
        <div className="mt-20 relative">
          {/* Timeline line */}
          <div className="absolute left-[clamp(20px,3vw,40px)] top-0 bottom-0 w-[1px] bg-linen/8">
            <motion.div
              className="w-full bg-ember/30 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Reason blocks */}
          <div className="flex flex-col gap-[clamp(40px,6vh,80px)]">
            {REASONS.map((reason, i) => (
              <ReasonBlock key={reason.number} reason={reason} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonBlock({
  reason,
  index,
}: {
  reason: (typeof REASONS)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 100}>
      <div className="flex gap-[clamp(24px,4vw,60px)] pl-[clamp(40px,5vw,80px)]">
        {/* Number dot */}
        <div className="absolute left-[clamp(16px,2.7vw,36px)] mt-1">
          <div className="w-2 h-2 rounded-full bg-ember/50" />
        </div>

        {/* Content */}
        <div>
          <span className="font-body text-[0.45rem] font-[400] tracking-[0.2em] text-ember/40 block mb-2">
            {reason.subtitle}
          </span>
          <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.2rem)] font-[100] tracking-[0.04em] text-linen">
            {reason.title}
          </h3>
          <p className="font-body text-[clamp(0.8rem,0.95vw,0.9rem)] font-[300] leading-[1.8] text-smoke/40 max-w-[440px] mt-4">
            {reason.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
