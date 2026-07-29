"use client";

import { motion } from "motion/react";
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

export default function BrandsSection() {
  return (
    <section className="editorial-section border-t border-linen/5">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center mb-16">
            <span className="editorial-caption">PARTNERS</span>
            <h2 className="editorial-headline-md mt-4">
              The world&apos;s finest makers.
            </h2>
            <p className="editorial-body mt-6 mx-auto max-w-md">
              We don&apos;t chase brand names. We chase quality. Each partner is chosen for their commitment to craft, innovation, and materials that endure.
            </p>
          </div>
        </Reveal>

        {/* Brand grid — editorial */}
        <div className="grid grid-cols-2 gap-px bg-linen/5 sm:grid-cols-3 lg:grid-cols-4">
          {BRANDS.map((brand, i) => (
            <Reveal key={brand.name} delay={i * 30}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(196,90,44,0.06)" }}
                className="group flex flex-col items-center justify-center gap-3 bg-void p-8 transition-colors duration-500 cursor-pointer min-h-[160px]"
              >
                <span className="font-display text-base font-[100] tracking-[0.12em] text-linen/50 group-hover:text-linen transition-colors duration-500">
                  {brand.name}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="editorial-label text-ember">
                    {brand.category}
                  </span>
                  <span className="text-linen/15">·</span>
                  <span className="font-body text-[0.6rem] font-[300] text-smoke/50">
                    {brand.origin}
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <Reveal delay={200}>
          <div className="mt-16 flex flex-wrap justify-center gap-12">
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
      </div>
    </section>
  );
}
