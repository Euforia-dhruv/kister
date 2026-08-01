"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/site/Reveal";
import { BRAND } from "@/lib/brand";

/* ─── SECTION 4: WHY KITSER ───────────────────────────────── */
/* Editorial blocks with animated timeline.                     */

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
    subtitle: "BRAND PARTNERSHIPS",
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
    <section ref={sectionRef} className="relative bg-void py-[clamp(100px,14vh,180px)]">
      <div className="max-w-[1400px] mx-auto" style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
        {/* Header */}
        <Reveal>
          <span className="editorial-caption block mb-4">
            WHY KITSER
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="editorial-headline max-w-[500px]">
            Built on trust.<br />Backed by craft.
          </h2>
        </Reveal>

        {/* Reasons with timeline */}
        <div className="mt-24 relative">
          {/* Timeline line */}
          <div className="absolute left-[clamp(20px,3vw,40px)] top-0 bottom-0 w-[1px] bg-linen/8">
            <motion.div
              className="w-full bg-ember/30 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Reason blocks */}
          <div className="flex flex-col gap-[clamp(48px,7vh,90px)]">
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
          <div className="w-2.5 h-2.5 rounded-full bg-ember/50" />
        </div>

        {/* Content */}
        <div>
          <span className="editorial-caption block mb-3">
            {reason.subtitle}
          </span>
          <h3 className="editorial-headline-sm">
            {reason.title}
          </h3>
          <p className="editorial-body max-w-[440px] mt-5">
            {reason.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
