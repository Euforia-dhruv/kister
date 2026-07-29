"use client";

import { motion } from "motion/react";
import Reveal, { Stagger, StaggerItem } from "@/components/site/Reveal";
import Link from "next/link";

const BRANDS = [
  { name: "Scavolini", category: "Cabinetry", origin: "Italy", year: 1961, desc: "Italian kitchen design since 1961. Handcrafted cabinetry that transforms kitchens into living spaces." },
  { name: "Bosch", category: "Appliances", origin: "Germany", year: 1886, desc: "German engineering excellence. Quiet, efficient, built to outlast trends." },
  { name: "Le Creuset", category: "Cookware", origin: "France", year: 1925, desc: "Enameled cast iron since 1925. Each piece is hand-finished in Fresnoy-le-Grand, France." },
  { name: "Dyson", category: "Innovation", origin: "UK", year: 1991, desc: "Reinventing everyday appliances through radical engineering." },
  { name: "Miele", category: "Appliances", origin: "Germany", year: 1899, desc: "Immer besser — always better. Built to last 20 years." },
  { name: "Blum", category: "Hardware", origin: "Austria", year: 1952, desc: "The invisible backbone of every premium kitchen. Soft-close hinges and drawer systems." },
  { name: "BLANCO", category: "Sinks", origin: "Germany", year: 1925, desc: "SILGRANIT granite composite. 80% granite, 20% acrylic. Non-polarizing, scratch-resistant." },
  { name: "Franke", category: "Sinks", origin: "Switzerland", year: 1911, desc: "Swiss precision in every sink. Granite, stainless steel, and ceramic." },
  { name: "Smeg", category: "Appliances", origin: "Italy", year: 1948, desc: "Where technology meets style. Retro and contemporary appliances that make statements." },
  { name: "Siemens", category: "Appliances", origin: "Germany", year: 1847, desc: "Smart home integration, energy efficiency, German reliability." },
  { name: "Hettich", category: "Hardware", origin: "Germany", year: 1888, desc: "Invisible engineering. Drawer systems, hinges, and fittings that define modern kitchens." },
  { name: "Kesseböhmer", category: "Storage", origin: "Germany", year: 1954, desc: "Pull-out organizers, corner solutions, and pantry systems. Every inch utilized." },
  { name: "Meyer", category: "Cookware", origin: "USA", year: 1951, desc: "Tri-ply stainless steel. Professional performance, home kitchen design." },
  { name: "Bergner", category: "Cookware", origin: "Germany", year: 1885, desc: "German-engineered cookware. Forged aluminum, stainless steel, ceramic." },
  { name: "Borosil", category: "Bakeware", origin: "India", year: 1962, desc: "Borosilicate glass. Freezer to oven to table. India's most trusted kitchen glass." },
  { name: "Nachtmann", category: "Barware", origin: "Germany", year: 1834, desc: "Crystal glassware since 1834. Precision-cut, lead-free crystal." },
  { name: "Dubblin", category: "Barware", origin: "Ireland", year: 1895, desc: "Stainless steel barware. Professional grade for the home bar." },
  { name: "Futura", category: "Tools", origin: "India", year: 1977, desc: "Indian kitchen tools. Knives, peelers, graters — built for daily use." },
  { name: "Reginox", category: "Sinks", origin: "Netherlands", year: 1976, desc: "European stainless steel sinks. Undermount, inset, and farmhouse styles." },
];

export default function BrandsPage() {
  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="scene scene-dark flex items-center justify-center px-6 py-40">
        <div className="max-w-4xl text-center">
          <Reveal blur>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">PARTNERS</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-[100] leading-[1.05] tracking-[0.04em] text-linen">
              The world&apos;s finest<br />makers.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 font-body text-[clamp(0.9rem,1.5vw,1.1rem)] font-[300] leading-relaxed text-smoke max-w-2xl mx-auto">
              35+ brand partnerships. 12 countries. One philosophy: every product must earn its place through craft, integrity, and materials that endure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Brand grid */}
      <section className="scene scene-dark px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Stagger stagger={0.04} className="grid grid-cols-1 gap-px bg-linen/5 sm:grid-cols-2 lg:grid-cols-3">
            {BRANDS.map((brand) => (
              <StaggerItem key={brand.name}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(196,90,44,0.06)" }}
                  className="group flex flex-col gap-4 bg-void p-8 transition-colors duration-500 cursor-pointer min-h-[200px]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-lg font-[100] tracking-[0.08em] text-linen/70 group-hover:text-linen transition-colors duration-500">
                      {brand.name}
                    </span>
                    <span className="font-body text-[0.6rem] font-[400] tracking-ultra text-ember/60">
                      {brand.year}
                    </span>
                  </div>
                  <p className="font-body text-sm font-[300] leading-[1.7] text-smoke/70 group-hover:text-smoke transition-colors duration-500 flex-1">
                    {brand.desc}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <span className="font-body text-[0.6rem] font-[400] tracking-wide-custom text-ember">
                      {brand.category.toUpperCase()}
                    </span>
                    <span className="text-linen/15">·</span>
                    <span className="font-body text-[0.6rem] font-[300] text-smoke/50">
                      {brand.origin}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="scene scene-warm flex items-center justify-center px-6 py-32">
        <div className="max-w-3xl text-center">
          <Reveal blur>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
              35+ brands. One standard.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 font-body text-[clamp(0.9rem,1.3vw,1.05rem)] font-[300] leading-[1.8] text-smoke">
              If a product doesn&apos;t meet our standard, it doesn&apos;t enter our showroom.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <Link
              href="/contact"
              className="mt-10 inline-block border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
            >
              DISCUSS YOUR PROJECT
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
