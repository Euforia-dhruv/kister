"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
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

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const isReversed = index % 2 === 1;

  return (
    <div ref={ref}>
      <Reveal delay={index * 50}>
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 items-center`}>
          {/* Image with parallax */}
          <div
            className={`relative aspect-[4/3] overflow-hidden ${isReversed ? "md:col-span-6 md:order-2" : "md:col-span-7"}`}
            data-cursor="VIEW"
            data-cursor-expand
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover img-grade"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </motion.div>
            <div className="absolute inset-0 img-warm img-vignette" />

            {/* Year badge */}
            <div className="absolute top-6 left-6 bg-void/50 backdrop-blur-sm px-4 py-2">
              <span className="font-body text-[0.65rem] font-[400] tracking-[0.12em] text-linen/70">
                {project.year}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className={`flex flex-col gap-5 ${isReversed ? "md:col-span-5 md:order-1" : "md:col-span-4 md:col-start-9"}`}>
            <Reveal>
              <span className="editorial-caption">0{index + 1}</span>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="editorial-headline-sm">{project.title}</h3>
            </Reveal>
            <Reveal delay={150}>
              <p className="font-body text-[0.7rem] font-[400] tracking-[0.12em] text-smoke/50">
                {project.location}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="editorial-body">{project.description}</p>
            </Reveal>
            <Reveal delay={250}>
              <div className="flex flex-wrap gap-8 mt-2">
                <div>
                  <span className="editorial-caption text-[0.5rem]">AREA</span>
                  <p className="font-body text-sm font-[300] text-linen/80 mt-1">{project.stats.area}</p>
                </div>
                <div>
                  <span className="editorial-caption text-[0.5rem]">DURATION</span>
                  <p className="font-body text-sm font-[300] text-linen/80 mt-1">{project.stats.duration}</p>
                </div>
                <div>
                  <span className="editorial-caption text-[0.5rem]">BRANDS</span>
                  <p className="font-body text-sm font-[300] text-linen/80 mt-1">{project.stats.brands}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.brands.map((b) => (
                  <span key={b} className="editorial-label border border-linen/8 px-3 py-1.5">{b}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="editorial-section border-t border-linen/5">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-16">
            <span className="editorial-caption">PROJECTS</span>
            <h2 className="editorial-headline-md mt-4">
              Kitchens we&apos;ve brought to life.
            </h2>
            <p className="editorial-body mt-6 max-w-md">
              Every kitchen is a collaboration. Here are three recent projects that showcase what happens when craft meets conviction.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-20">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
