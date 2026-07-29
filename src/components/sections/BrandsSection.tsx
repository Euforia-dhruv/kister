"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Reveal from "@/components/site/Reveal";

const BRANDS = [
  { name: "Scavolini", category: "Cabinetry", origin: "Italy", year: 1961 },
  { name: "Bosch", category: "Appliances", origin: "Germany", year: 1886 },
  { name: "Le Creuset", category: "Cookware", origin: "France", year: 1925 },
  { name: "Dyson", category: "Innovation", origin: "UK", year: 1991 },
  { name: "Miele", category: "Appliances", origin: "Germany", year: 1899 },
  { name: "Blum", category: "Hardware", origin: "Austria", year: 1952 },
  { name: "BLANCO", category: "Sinks", origin: "Germany", year: 1925 },
  { name: "Franke", category: "Sinks", origin: "Switzerland", year: 1911 },
  { name: "Smeg", category: "Appliances", origin: "Italy", year: 1948 },
  { name: "Siemens", category: "Appliances", origin: "Germany", year: 1847 },
  { name: "Hettich", category: "Hardware", origin: "Germany", year: 1888 },
  { name: "Kesseböhmer", category: "Storage", origin: "Germany", year: 1954 },
  { name: "Meyer", category: "Cookware", origin: "USA", year: 1951 },
  { name: "Bergner", category: "Cookware", origin: "Germany", year: 1885 },
  { name: "Borosil", category: "Bakeware", origin: "India", year: 1962 },
  { name: "Nachtmann", category: "Barware", origin: "Germany", year: 1834 },
  { name: "Dubblin", category: "Barware", origin: "Ireland", year: 1895 },
  { name: "Futura", category: "Tools", origin: "India", year: 1977 },
  { name: "Reginox", category: "Sinks", origin: "Netherlands", year: 1976 },
];

// ─── INFINITE MARQUEE ─────────────────────────────────────
function MarqueeRow({ brands, speed = 30 }: { brands: typeof BRANDS; speed?: number }) {
  return (
    <div className="relative overflow-hidden whitespace-nowrap py-4">
      <motion.div
        className="inline-flex gap-16"
        animate={{ x: [0, -2000] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <span
            key={`${brand.name}-${i}`}
            className="font-display text-lg font-[100] tracking-[0.12em] text-linen/15 inline-block"
          >
            {brand.name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function BrandsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="editorial-section relative overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-16">
            <span className="editorial-caption">PARTNERS</span>
            <h2 className="editorial-headline-md mt-4">
              The world&apos;s finest makers.
            </h2>
            <p className="editorial-body mt-6 max-w-md">
              We don&apos;t chase brand names. We chase quality. Each partner is chosen for their commitment to craft, innovation, and materials that endure.
            </p>
          </div>
        </Reveal>

        {/* Brand grid — editorial with hover reveals */}
        <div className="grid grid-cols-2 gap-px bg-linen/[0.03] sm:grid-cols-3 lg:grid-cols-4">
          {BRANDS.map((brand, i) => (
            <Reveal key={brand.name} delay={i * 25}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(196,90,44,0.04)" }}
                className="group relative flex flex-col items-center justify-center gap-3 bg-void p-8 transition-colors duration-700 cursor-pointer min-h-[150px]"
                data-cursor={brand.category.toUpperCase()}
                data-cursor-magnetic
              >
                {/* Brand name */}
                <span className="font-display text-[0.9rem] font-[100] tracking-[0.1em] text-linen/35 group-hover:text-linen/80 transition-all duration-700">
                  {brand.name}
                </span>

                {/* Hover reveal — category, origin, year */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
                  <span className="editorial-caption text-[0.55rem]">
                    {brand.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[0.6rem] font-[300] text-smoke/40">
                      {brand.origin}
                    </span>
                    <span className="text-linen/10">·</span>
                    <span className="font-body text-[0.6rem] font-[300] text-smoke/40">
                      {brand.year}
                    </span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-1/2 h-[1px] bg-ember/40"
                  initial={{ width: 0, x: "-50%" }}
                  whileHover={{ width: "60%", x: "-50%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <Reveal delay={200}>
          <div className="mt-16 flex flex-wrap justify-center gap-16">
            <div className="text-center">
              <span className="font-display text-3xl font-[100] text-ember">35+</span>
              <p className="editorial-label mt-2">Brand Partners</p>
            </div>
            <div className="text-center">
              <span className="font-display text-3xl font-[100] text-ember">12</span>
              <p className="editorial-label mt-2">Countries</p>
            </div>
            <div className="text-center">
              <span className="font-display text-3xl font-[100] text-ember">35+</span>
              <p className="editorial-label mt-2">Years of Partnerships</p>
            </div>
          </div>
        </Reveal>

        {/* Infinite marquee — background */}
        <div className="mt-16 opacity-40">
          <MarqueeRow brands={BRANDS.slice(0, 10)} speed={40} />
        </div>
      </div>

      {/* ─── MOUSE-FOLLOWING GLOW ────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, rgba(196,90,44,0.3) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </section>
  );
}
