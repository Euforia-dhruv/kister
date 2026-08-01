"use client";

import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import Link from "next/link";

const PROJECTS = [
  {
    id: 1,
    title: "The Lakewood Residence",
    location: "Coimbatore, Tamil Nadu",
    year: "2024",
    description: "A 2,400 sq ft kitchen designed for a family of four who cook every day. Scavolini cabinetry in matte charcoal, Le Creuset cast iron collection, Bosch induction range, BLANCO granite sink.",
    longDesc: "The Lakewood family wanted a kitchen that worked as hard as they did. Four people, three meals a day, and a conviction that cooking should be a pleasure — not a chore. The result: a kitchen that feels like home.",
    brands: ["Scavolini", "Le Creuset", "Bosch", "BLANCO"],
    image: "/images/kitchens/scavolini-poetica-island.jpg",
    stats: { area: "2,400 sq ft", duration: "8 weeks", brands: 4 },
    materials: ["Matte charcoal cabinetry", "Quartz countertops", "Granite sink", "Brass hardware"],
  },
  {
    id: 2,
    title: "The Heritage Kitchen",
    location: "Bangalore, Karnataka",
    year: "2023",
    description: "Restoring a 1960s bungalow kitchen with modern efficiency. Walnut cabinetry by Scavolini, copper cookware from Mauviel, Franke undermount sink.",
    longDesc: "The Heritage bungalow was built in 1962. Our task: restore the original proportions, add modern efficiency, and make it feel like it had always been this way. We used American black walnut for the cabinetry, copper accents, and hidden modern appliances.",
    brands: ["Scavolini", "Franke", "Mauviel"],
    image: "/images/kitchens/scavolini-poetica-ushaped.jpg",
    stats: { area: "1,800 sq ft", duration: "12 weeks", brands: 3 },
    materials: ["American black walnut", "Copper accents", "Marble countertops", "Franke undermount"],
  },
  {
    id: 3,
    title: "The Minimalist Studio",
    location: "Mumbai, Maharashtra",
    year: "2024",
    description: "A 600 sq ft apartment kitchen that needed to disappear. Handleless Scavolini cabinets, integrated Bosch appliances, BLANCO undermount.",
    longDesc: "In a 600 sq ft Mumbai apartment, the kitchen can't dominate. We designed a kitchen that disappears: handleless cabinets that blend into the wall, integrated appliances that hide behind panels. When closed, it's a wall. When open, it's a complete kitchen.",
    brands: ["Scavolini", "Bosch", "BLANCO"],
    image: "/images/kitchens/scavolini-delinea-peninsula.jpg",
    stats: { area: "600 sq ft", duration: "6 weeks", brands: 3 },
    materials: ["Handleless matte white", "Integrated appliances", "Undermount sink", "Quartz countertop"],
  },
  {
    id: 4,
    title: "The Chef's Kitchen",
    location: "Chennai, Tamil Nadu",
    year: "2023",
    description: "A professional-grade home kitchen for a serious home cook. Miele range, Le Creuset collection, Blum storage systems.",
    longDesc: "Priya cooks every day — and she cooks seriously. Her kitchen needed professional performance without the industrial aesthetic. We installed a Miele range with five burners, a Le Creuset cast iron collection, and Blum storage systems that keep every tool within arm's reach.",
    brands: ["Miele", "Le Creuset", "Blum", "Scavolini"],
    image: "/images/kitchens/scavolini-carattere-hero.jpg",
    stats: { area: "1,200 sq ft", duration: "10 weeks", brands: 4 },
    materials: ["Stainless steel countertops", "Walnut open shelving", "Cast iron collection", "Professional range"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="py-[clamp(80px,12vh,160px)]">
        <div className="mx-auto max-w-[1400px] text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <span className="editorial-caption">PROJECTS</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="editorial-headline mt-6">
              Kitchens we&apos;ve<br />brought to life.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Projects — editorial splits, alternating */}
      {PROJECTS.map((project, i) => {
        const isReversed = i % 2 === 1;
        return (
          <section key={project.id} className="py-[clamp(60px,10vh,120px)]">
            <div className="mx-auto max-w-[1400px]">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-start">
                <Reveal
                  className={`${isReversed ? "md:col-span-5 md:order-2" : "md:col-span-7"}`}
                  scale
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
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
                </Reveal>

                <div
                  className={`${
                    isReversed
                      ? "md:col-span-6 md:order-1"
                      : "md:col-span-4 md:col-start-9"
                  } flex flex-col justify-center`}
                >
                  <Reveal delay={200}>
                    <span className="editorial-caption">0{i + 1}</span>
                    <h2 className="editorial-headline-sm mt-4">{project.title}</h2>
                    <p className="font-body text-xs font-[400] tracking-wide-custom text-smoke/40 mt-2">
                      {project.location}
                    </p>
                    <p className="editorial-body mt-6 max-w-sm">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-8 py-6 border-t border-b border-linen/5">
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

                    {/* Materials */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.materials.map((m) => (
                        <span key={m} className="editorial-label border border-linen/10 px-3 py-1.5">
                          {m}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link
                        href="/contact"
                        className="font-body text-xs font-[400] tracking-wide-custom text-ember transition-colors hover:text-flame"
                      >
                        DISCUSS YOUR PROJECT →
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-[clamp(80px,12vh,160px)]">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal blur>
            <h2 className="editorial-headline">
              Your kitchen<br />is next.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              The best kitchens start with conversation. Tell us about your space, your habits, your vision.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="magnetic-btn"
              >
                BEGIN YOUR KITCHEN JOURNEY
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
