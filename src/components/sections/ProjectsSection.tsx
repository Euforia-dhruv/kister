"use client";

import Image from "next/image";
import Reveal from "@/components/site/Reveal";

const PROJECTS = [
  {
    id: 1,
    title: "The Lakewood Residence",
    location: "Coimbatore, Tamil Nadu",
    year: "2024",
    description: "A 2,400 sq ft kitchen designed for a family of four who cook every day. Scavolini cabinetry in matte charcoal, Le Creuset cast iron collection, Bosch induction range, BLANCO granite sink.",
    brands: ["Scavolini", "Le Creuset", "Bosch", "BLANCO"],
    image: "/images/kitchens/scavolini-poetica-island.jpg",
    stats: { area: "2,400 sq ft", duration: "8 weeks", brands: 4 },
  },
  {
    id: 2,
    title: "The Heritage Kitchen",
    location: "Bangalore, Karnataka",
    year: "2023",
    description: "Restoring a 1960s bungalow kitchen with modern efficiency. Walnut cabinetry by Scavolini, copper cookware from Mauviel, Franke undermount sink.",
    brands: ["Scavolini", "Franke", "Mauviel"],
    image: "/images/kitchens/scavolini-carattere-english.jpg",
    stats: { area: "1,800 sq ft", duration: "12 weeks", brands: 3 },
  },
  {
    id: 3,
    title: "The Minimalist Studio",
    location: "Mumbai, Maharashtra",
    year: "2024",
    description: "A 600 sq ft apartment kitchen that needed to disappear. Handleless Scavolini cabinets, integrated Bosch appliances, BLANCO undermount.",
    brands: ["Scavolini", "Bosch", "BLANCO"],
    image: "/images/kitchens/scavolini-delinea-peninsula.jpg",
    stats: { area: "600 sq ft", duration: "6 weeks", brands: 3 },
  },
];

export default function ProjectsSection() {
  return (
    <section className="editorial-section border-t border-linen/5">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center mb-20">
            <span className="editorial-caption">PROJECTS</span>
            <h2 className="editorial-headline-md mt-4">
              Kitchens we&apos;ve brought to life.
            </h2>
            <p className="editorial-body mt-6 mx-auto max-w-md">
              Every kitchen is a collaboration. Here are three recent projects that showcase what happens when craft meets conviction.
            </p>
          </div>
        </Reveal>

        {/* Projects — editorial splits */}
        <div className="flex flex-col gap-24">
          {PROJECTS.map((project, i) => {
            const isReversed = i % 2 === 1;
            return (
              <Reveal key={project.id} delay={i * 50}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center">
                  <div className={`relative aspect-[4/3] overflow-hidden ${isReversed ? "md:col-span-5 md:order-2" : "md:col-span-7"}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover img-grade"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />
                    <div className="absolute top-6 left-6 bg-void/60 backdrop-blur-sm px-4 py-2">
                      <span className="font-body text-xs font-[400] tracking-wide-custom text-linen">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div className={`flex flex-col gap-6 ${isReversed ? "md:col-span-6 md:order-1" : "md:col-span-4 md:col-start-9"}`}>
                    <span className="editorial-caption">0{i + 1}</span>
                    <h3 className="editorial-headline-sm">{project.title}</h3>
                    <p className="font-body text-xs font-[400] tracking-wide-custom text-smoke">
                      {project.location}
                    </p>
                    <p className="editorial-body">{project.description}</p>
                    <div className="flex flex-wrap gap-8 mt-4">
                      <div>
                        <span className="editorial-caption text-[0.55rem]">AREA</span>
                        <p className="font-body text-sm font-[300] text-linen mt-1">{project.stats.area}</p>
                      </div>
                      <div>
                        <span className="editorial-caption text-[0.55rem]">DURATION</span>
                        <p className="font-body text-sm font-[300] text-linen mt-1">{project.stats.duration}</p>
                      </div>
                      <div>
                        <span className="editorial-caption text-[0.55rem]">BRANDS</span>
                        <p className="font-body text-sm font-[300] text-linen mt-1">{project.stats.brands}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {project.brands.map((b) => (
                        <span key={b} className="editorial-label border border-linen/10 px-3 py-1.5">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
