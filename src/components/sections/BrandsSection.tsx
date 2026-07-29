"use client";

import { motion } from "motion/react";
import Reveal, { Stagger, StaggerItem } from "@/components/site/Reveal";

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
    <section className="scene scene-dark px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">PARTNERS</span>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
              The world&apos;s finest makers.
            </h2>
            <p className="mt-6 font-body text-[clamp(0.9rem,1.3vw,1.05rem)] font-[300] leading-[1.8] text-smoke max-w-2xl mx-auto">
              We don&apos;t chase brand names. We chase quality. Each partner is chosen for their commitment to craft, innovation, and materials that endure.
            </p>
          </div>
        </Reveal>

        {/* Brand grid */}
        <Stagger stagger={0.05} className="grid grid-cols-2 gap-px bg-linen/5 sm:grid-cols-3 lg:grid-cols-4">
          {BRANDS.map((brand) => (
            <StaggerItem key={brand.name}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(196,90,44,0.08)" }}
                className="group flex flex-col items-center justify-center gap-3 bg-void p-8 transition-colors duration-500 cursor-pointer"
              >
                <span className="font-display text-base font-[100] tracking-[0.12em] text-linen/60 group-hover:text-linen transition-colors duration-500">
                  {brand.name}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-body text-[0.6rem] font-[400] tracking-wide-custom text-ember">
                    {brand.category}
                  </span>
                  <span className="text-linen/20">·</span>
                  <span className="font-body text-[0.6rem] font-[300] text-smoke">
                    {brand.origin}
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Stats */}
        <Reveal delay={200}>
          <div className="mt-16 flex flex-wrap justify-center gap-12">
            <div className="text-center">
              <span className="font-display text-3xl font-[100] text-ember">35+</span>
              <p className="mt-2 font-body text-xs font-[300] tracking-wide-custom text-smoke">Brand Partners</p>
            </div>
            <div className="text-center">
              <span className="font-display text-3xl font-[100] text-ember">12</span>
              <p className="mt-2 font-body text-xs font-[300] tracking-wide-custom text-smoke">Countries</p>
            </div>
            <div className="text-center">
              <span className="font-display text-3xl font-[100] text-ember">35+</span>
              <p className="mt-2 font-body text-xs font-[300] tracking-wide-custom text-smoke">Years of Partnerships</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
