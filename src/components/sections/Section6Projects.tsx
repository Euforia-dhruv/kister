"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/site/Reveal";

/* ─── SECTION 6: PROJECTS ──────────────────────────────────── */
/* Beautiful masonry gallery. Large images.                     */

const PROJECTS = [
  {
    id: 1,
    title: "The Lakewood Residence",
    location: "Coimbatore",
    image: "/images/kitchens/scavolini-poetica-hero.jpg",
  },
  {
    id: 2,
    title: "The Heritage Kitchen",
    location: "Bangalore",
    image: "/images/kitchens/scavolini-delinea-hero.jpg",
  },
  {
    id: 3,
    title: "The Minimalist Studio",
    location: "Mumbai",
    image: "/images/kitchens/03-minimal-white.jpg",
  },
  {
    id: 4,
    title: "The Chef's Kitchen",
    location: "Chennai",
    image: "/images/kitchens/scavolini-carattere-hero.jpg",
  },
  {
    id: 5,
    title: "The Modern Family",
    location: "Hyderabad",
    image: "/images/kitchens/04-modular-hero.jpg",
  },
  {
    id: 6,
    title: "The Urban Loft",
    location: "Delhi NCR",
    image: "/images/kitchens/scavolini-poetica-island.jpg",
  },
];

export default function Section6Projects() {
  return (
    <section className="relative bg-void py-[clamp(100px,14vh,180px)]">
      <div className="max-w-[1400px] mx-auto" style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
        {/* Header */}
        <Reveal>
          <span className="editorial-caption block mb-4">
            PROJECTS
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="editorial-headline">
            Kitchens we&apos;ve<br />brought to life.
          </h2>
        </Reveal>

        {/* Editorial grid — uniform cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(8px,1vw,14px)]">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.location}`}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          style={{
            filter: "saturate(0.85) contrast(1.05) brightness(0.75)",
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Default overlay */}
      <div className="absolute inset-0 bg-void/15 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-void/60 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />

      {/* Hover content */}
      <div className="absolute inset-0 flex flex-col justify-end p-[clamp(16px,2vw,28px)] opacity-0 translate-y-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="editorial-caption block mb-1.5">
          {project.location.toUpperCase()}
        </span>
        <h3 className="font-display text-[clamp(1.1rem,1.9vw,1.6rem)] tracking-[0.02em] text-linen">
          {project.title}
        </h3>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-linen/0 group-hover:border-linen/15 transition-all duration-700" />
    </motion.div>
  );
}
