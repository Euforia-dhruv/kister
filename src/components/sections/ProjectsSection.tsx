"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/site/Reveal";

const PROJECTS = [
  {
    id: 1,
    title: "The Lakewood Residence",
    location: "Coimbatore, Tamil Nadu",
    year: "2024",
    description: "A 2,400 sq ft kitchen designed for a family of four who cook every day. Scavolini cabinetry in matte charcoal, Le Creuset cast iron collection, Bosch induction range, BLANCO granite sink.",
    brands: ["Scavolini", "Le Creuset", "Bosch", "BLANCO"],
    image: "/images/dark-kitchen-v2.jpg",
    stats: { area: "2,400 sq ft", duration: "8 weeks", brands: 4 },
  },
  {
    id: 2,
    title: "The Heritage Kitchen",
    location: "Bangalore, Karnataka",
    year: "2023",
    description: "Restoring a 1960s bungalow kitchen with modern efficiency. Walnut cabinetry by Scavolini, copper cookware from Mauviel, Franke undermount sink. The challenge: make it feel original.",
    brands: ["Scavolini", "Franke", "Mauviel"],
    image: "/images/artisan-hands-v2.jpg",
    stats: { area: "1,800 sq ft", duration: "12 weeks", brands: 3 },
  },
  {
    id: 3,
    title: "The Minimalist Studio",
    location: "Mumbai, Maharashtra",
    year: "2024",
    description: "A 600 sq ft apartment kitchen that needed to disappear. Handleless Scavolini cabinets, integrated Bosch appliances, BLANCO undermount. Less kitchen, more life.",
    brands: ["Scavolini", "Bosch", "BLANCO"],
    image: "/images/marble-veins.jpg",
    stats: { area: "600 sq ft", duration: "6 weeks", brands: 3 },
  },
];

export default function ProjectsSection() {
  return (
    <section className="scene scene-warm px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-20">
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">PROJECTS</span>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
              Kitchens we&apos;ve brought to life.
            </h2>
            <p className="mt-6 font-body text-[clamp(0.9rem,1.3vw,1.05rem)] font-[300] leading-[1.8] text-smoke max-w-2xl mx-auto">
              Every kitchen is a collaboration. Here are three recent projects that showcase what happens when craft meets conviction.
            </p>
          </div>
        </Reveal>

        {/* Projects */}
        <div className="flex flex-col gap-24">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 50}>
              <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 items-center`}>
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

                  {/* Year badge */}
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
                  <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
                    {project.title}
                  </h3>
                  <p className="font-body text-xs font-[400] tracking-wide-custom text-smoke">
                    {project.location}
                  </p>
                  <p className="font-body text-[clamp(0.9rem,1.2vw,1rem)] font-[300] leading-[1.8] text-smoke">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-8 mt-4">
                    <div>
                      <span className="font-body text-[0.65rem] font-[400] tracking-ultra text-ember">AREA</span>
                      <p className="mt-1 font-body text-sm font-[300] text-linen">{project.stats.area}</p>
                    </div>
                    <div>
                      <span className="font-body text-[0.65rem] font-[400] tracking-ultra text-ember">DURATION</span>
                      <p className="mt-1 font-body text-sm font-[300] text-linen">{project.stats.duration}</p>
                    </div>
                    <div>
                      <span className="font-body text-[0.65rem] font-[400] tracking-ultra text-ember">BRANDS</span>
                      <p className="mt-1 font-body text-sm font-[300] text-linen">{project.stats.brands}</p>
                    </div>
                  </div>

                  {/* Brands */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {project.brands.map((b) => (
                      <span
                        key={b}
                        className="font-body text-[0.65rem] font-[400] tracking-wide-custom text-linen/60 border border-linen/10 px-3 py-1"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="self-start mt-4 font-body text-xs font-[400] tracking-wide-custom text-ember transition-colors hover:text-flame"
                  >
                    VIEW FULL CASE STUDY →
                  </motion.button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
