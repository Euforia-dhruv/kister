"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/site/Reveal";

/* ─── SECTION 5: BRANDS MARQUEE ────────────────────────────── */
/* Infinite marquee. Slow. Elegant.                             */

const BRAND_LOGOS = [
  { name: "Scavolini", file: "scavolini/logo.png" },
  { name: "Bosch", file: "bosch/logo.png" },
  { name: "Miele", file: "miele/logo.png" },
  { name: "Blum", file: "blum/logo.png" },
  { name: "BLANCO", file: "blanco/logo.png" },
  { name: "Franke", file: "franke/logo.png" },
  { name: "Smeg", file: "smeg/logo.png" },
  { name: "Siemens", file: "siemens/logo.png" },
  { name: "Dyson", file: "dyson/logo.png" },
  { name: "Hettich", file: "hettich/logo.png" },
  { name: "Kesseböhmer", file: "kessebohmer/logo.png" },
  { name: "Bergner", file: "bergner/logo.png" },
  { name: "Meyer", file: "meyer/logo.png" },
  { name: "Nachtmann", file: "nachtmann/logo.png" },
  { name: "Dubblin", file: "dubblin/logo.png" },
  { name: "Reginox", file: "reginox/logo.png" },
  { name: "Futura", file: "futura/logo.png" },
];

export default function Section5Brands() {
  return (
    <section className="relative bg-void py-[clamp(80px,12vh,160px)] overflow-hidden">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-14" style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
        <Reveal>
          <span className="editorial-caption block mb-4">
            BRANDS
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="editorial-headline">
            35+ brands.<br />One standard.
          </h2>
        </Reveal>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-void to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-void to-transparent z-10" />

        {/* Row 1 — left to right */}
        <div className="flex overflow-hidden mb-6">
          <motion.div
            className="flex items-center gap-[clamp(40px,6vw,80px)] shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" },
            }}
          >
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
              <BrandLogo key={`${brand.name}-${i}`} brand={brand} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 — right to left */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center gap-[clamp(40px,6vw,80px)] shrink-0"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 45, ease: "linear" },
            }}
          >
            {[...BRAND_LOGOS.slice().reverse(), ...BRAND_LOGOS.slice().reverse()].map(
              (brand, i) => (
                <BrandLogo key={`rev-${brand.name}-${i}`} brand={brand} />
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BrandLogo({ brand }: { brand: (typeof BRAND_LOGOS)[number] }) {
  return (
    <div className="relative w-[clamp(80px,10vw,140px)] h-[clamp(40px,5vw,60px)] shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-700">
      <Image
        src={`/images/brands/${brand.file}`}
        alt={`${brand.name} — Kitser brand partner`}
        fill
        className="object-contain"
        style={{
          filter: "brightness(0) invert(1)",
        }}
        sizes="140px"
      />
    </div>
  );
}
