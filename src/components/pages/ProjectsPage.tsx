"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/site/Reveal";
import Link from "next/link";

const PROJECTS = [
  {
    id: 1,
    title: "The Lakewood Residence",
    location: "Coimbatore, Tamil Nadu",
    year: "2024",
    description: "A 2,400 sq ft kitchen designed for a family of four who cook every day. Scavolini cabinetry in matte charcoal, Le Creuset cast iron collection, Bosch induction range, BLANCO granite sink.",
    longDesc: "The Lakewood family wanted a kitchen that worked as hard as they did. Four people, three meals a day, and a conviction that cooking should be a pleasure — not a chore. We designed a kitchen with dedicated zones: prep, cook, clean, and store. Every surface was chosen for durability. Every appliance for reliability. The result: a kitchen that feels like home.",
    brands: ["Scavolini", "Le Creuset", "Bosch", "BLANCO"],
    image: "/images/dark-kitchen-v2.jpg",
    stats: { area: "2,400 sq ft", duration: "8 weeks", brands: 4 },
    materials: ["Matte charcoal cabinetry", "Quartz countertops", "Granite sink", "Brass hardware"],
  },
  {
    id: 2,
    title: "The Heritage Kitchen",
    location: "Bangalore, Karnataka",
    year: "2023",
    description: "Restoring a 1960s bungalow kitchen with modern efficiency. Walnut cabinetry by Scavolini, copper cookware from Mauviel, Franke undermount sink. The challenge: make it feel original.",
    longDesc: "The Heritage bungalow was built in 1962. The kitchen had been renovated twice — both times badly. Our task: restore the original proportions, add modern efficiency, and make it feel like it had always been this way. We used American black walnut for the cabinetry (matching the home's original woodwork), copper accents (echoing the period), and hidden modern appliances. The result: a kitchen that honors its past while serving its future.",
    brands: ["Scavolini", "Franke", "Mauviel"],
    image: "/images/artisan-hands-v2.jpg",
    stats: { area: "1,800 sq ft", duration: "12 weeks", brands: 3 },
    materials: ["American black walnut", "Copper accents", "Marble countertops", "Franke undermount"],
  },
  {
    id: 3,
    title: "The Minimalist Studio",
    location: "Mumbai, Maharashtra",
    year: "2024",
    description: "A 600 sq ft apartment kitchen that needed to disappear. Handleless Scavolini cabinets, integrated Bosch appliances, BLANCO undermount. Less kitchen, more life.",
    longDesc: "In a 600 sq ft Mumbai apartment, the kitchen can't dominate. We designed a kitchen that disappears: handleless cabinets that blend into the wall, integrated appliances that hide behind panels, and a BLANCO undermount sink that's invisible from above. When closed, it's a wall. When open, it's a complete kitchen. The result: more living space, less visual noise.",
    brands: ["Scavolini", "Bosch", "BLANCO"],
    image: "/images/marble-veins.jpg",
    stats: { area: "600 sq ft", duration: "6 weeks", brands: 3 },
    materials: ["Handleless matte white", "Integrated appliances", "Undermount sink", "Quartz countertop"],
  },
  {
    id: 4,
    title: "The Chef's Kitchen",
    location: "Chennai, Tamil Nadu",
    year: "2023",
    description: "A professional-grade home kitchen for a serious home cook. Miele range, Le Creuset collection, Blum storage systems. Built for performance.",
    longDesc: "Priya cooks every day — and she cooks seriously. Her kitchen needed professional performance without the industrial aesthetic. We installed a Miele range with five burners, a Le Creuset cast iron collection (12 pieces), and Blum storage systems that keep every tool within arm's reach. The result: a kitchen that performs like a restaurant, feels like a home.",
    brands: ["Miele", "Le Creuset", "Blum", "Scavolini"],
    image: "/images/brass-detail.jpg",
    stats: { area: "1,200 sq ft", duration: "10 weeks", brands: 4 },
    materials: ["Stainless steel countertops", "Walnut open shelving", "Cast iron collection", "Professional range"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="scene scene-dark flex items-center justify-center px-6 py-40">
        <div className="max-w-4xl text-center">
          <Reveal blur>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">PROJECTS</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-[100] leading-[1.05] tracking-[0.04em] text-linen">
              Kitchens we&apos;ve<br />brought to life.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 font-body text-[clamp(0.9rem,1.5vw,1.1rem)] font-[300] leading-relaxed text-smoke max-w-2xl mx-auto">
              Every kitchen is a collaboration. Every material is a choice. Here are four recent projects that showcase what happens when craft meets conviction.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="scene scene-warm px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl flex flex-col gap-32">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 50}>
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-start">
                {/* Image */}
                <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover img-grade"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute top-6 left-6 bg-void/60 backdrop-blur-sm px-4 py-2">
                    <span className="font-body text-xs font-[400] tracking-wide-custom text-linen">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col gap-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="font-body text-xs font-[500] tracking-ultra text-ember">
                    0{i + 1}
                  </span>
                  <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
                    {project.title}
                  </h2>
                  <p className="font-body text-xs font-[400] tracking-wide-custom text-smoke">
                    {project.location}
                  </p>
                  <p className="font-body text-[clamp(0.9rem,1.2vw,1rem)] font-[300] leading-[1.8] text-smoke">
                    {project.description}
                  </p>
                  <p className="font-body text-sm font-[300] leading-[1.8] text-smoke/80">
                    {project.longDesc}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 mt-4 py-6 border-t border-b border-linen/5">
                    <div>
                      <span className="font-body text-[0.6rem] font-[400] tracking-ultra text-ember">AREA</span>
                      <p className="mt-1 font-body text-sm font-[300] text-linen">{project.stats.area}</p>
                    </div>
                    <div>
                      <span className="font-body text-[0.6rem] font-[400] tracking-ultra text-ember">DURATION</span>
                      <p className="mt-1 font-body text-sm font-[300] text-linen">{project.stats.duration}</p>
                    </div>
                    <div>
                      <span className="font-body text-[0.6rem] font-[400] tracking-ultra text-ember">BRANDS</span>
                      <p className="mt-1 font-body text-sm font-[300] text-linen">{project.stats.brands}</p>
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="flex flex-col gap-2">
                    <span className="font-body text-[0.6rem] font-[400] tracking-ultra text-ember">MATERIALS</span>
                    <div className="flex flex-wrap gap-2">
                      {project.materials.map((m) => (
                        <span
                          key={m}
                          className="font-body text-[0.65rem] font-[300] text-smoke border border-linen/10 px-3 py-1"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div className="flex flex-wrap gap-3 mt-2">
                    {project.brands.map((b) => (
                      <span
                        key={b}
                        className="font-body text-[0.65rem] font-[400] tracking-wide-custom text-linen/60 border border-linen/10 px-3 py-1"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ x: 4 }}
                    className="self-start mt-4 font-body text-xs font-[400] tracking-wide-custom text-ember transition-colors hover:text-flame"
                  >
                    DISCUSS YOUR PROJECT →
                  </motion.button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="scene scene-dark flex items-center justify-center px-6 py-32">
        <div className="max-w-3xl text-center">
          <Reveal blur>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-[100] tracking-[0.06em] text-linen">
              Your kitchen is next.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 font-body text-[clamp(0.9rem,1.5vw,1.1rem)] font-[300] leading-relaxed text-smoke">
              Every project begins with a conversation. Tell us about your space, your habits, your vision — we&apos;ll bring the materials and the craft.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <Link
              href="/contact"
              className="mt-10 inline-block border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
            >
              BEGIN YOUR KITCHEN JOURNEY
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
