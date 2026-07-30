"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/site/Reveal";

const TIMELINE = [
  { year: "1989", title: "Founded", desc: "Kitser opens its first showroom in Coimbatore, bringing premium European cookware to South India." },
  { year: "1995", title: "Le Creuset Partnership", desc: "Becomes the exclusive regional distributor of Le Creuset enameled cast iron cookware." },
  { year: "2005", title: "Kitchen Design", desc: "Expands into modular kitchen curation, partnering with Scavolini and Bosch for complete kitchen solutions." },
  { year: "2010", title: "Material Library", desc: "Opens a dedicated material library — marble, granite, walnut, brass — so clients can touch before they commit." },
  { year: "2015", title: "Showroom Redesign", desc: "The Nava India Road showroom is reimagined as an architectural experience — not a store." },
  { year: "2025", title: "Today", desc: "36 years. 35+ brand partnerships. One philosophy: build kitchens that last generations." },
];

const VALUES = [
  { title: "Craft", desc: "Every product is chosen for its integrity, not its marketing." },
  { title: "Heritage", desc: "We partner with makers who have decades — sometimes centuries — of expertise." },
  { title: "Material", desc: "Cast iron, copper, stone, walnut, brass. Materials that age with grace." },
  { title: "Restraint", desc: "We curate. We don't accumulate. Less, but better." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative bg-void">
      {/* Hero — full viewport with parallax */}
      <section ref={heroRef} className="hero-container">
        <motion.div className="hero-image-wrapper" style={{ y: heroY }}>
          <Image
            src="/images/textures/artisan.jpg"
            alt="Artisan hands shaping wood — the craft behind every Kitser kitchen"
            fill
            className="object-cover"
            style={{ filter: "saturate(0.8) sepia(0.08) contrast(1.1) brightness(0.85)" }}
            sizes="120vw"
            priority
          />
        </motion.div>
        <div className="hero-overlay-directional" />
        <div className="hero-overlay-bottom" />
        <div className="hero-grain" />

        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <div className="hero-content-inner">
            <Reveal blur>
              <span className="hero-eyebrow">OUR STORY</span>
            </Reveal>
            <Reveal delay={100} blur>
              <h1 style={{ fontSize: "clamp(40px, 8vw, 96px)" }} className="hero-headline">
                Three decades of<br />curated craft.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="hero-body mt-8">
                From a single showroom to 35+ world-class partnerships — the story of Kitser is the story of the kitchen itself.
              </p>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* Story — editorial split */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center">
            <div className="md:col-span-5 md:col-start-1 flex flex-col justify-center">
              <Reveal>
                <p className="editorial-body">
                  Kitser was born from a simple observation: the kitchen is the most important
                  room in any home, yet most people settle for materials that don&apos;t deserve
                  the name.
                </p>
                <p className="editorial-body mt-5">
                  In 1989, we opened our first showroom in Coimbatore with a single conviction:
                  that premium kitchen essentials should be accessible to anyone willing to invest
                  in quality.
                </p>
                <p className="editorial-body mt-5">
                  Today, we represent over 35 of the world&apos;s finest kitchen brands. But we don&apos;t
                  just stock products. We curate experiences.
                </p>
              </Reveal>
            </div>
            <Reveal className="md:col-span-6 md:col-start-7" delay={200} scale>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/cabinetry/01-scavolini-modular.jpg"
                  alt="Scavolini modular kitchen — precision joinery and premium materials"
                  fill
                  className="object-cover img-grade"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 img-warm img-vignette" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values — editorial grid */}
      <section className="editorial-section">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal>
            <span className="editorial-caption">VALUES</span>
            <h2 className="editorial-headline-md mt-4">
              What we believe.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val, i) => (
              <Reveal key={val.title} delay={i * 80}>
                <div className="flex flex-col gap-3">
                  <span className="font-body text-[0.55rem] font-[400] tracking-ultra text-ember/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-[300] tracking-[0.06em] text-linen">{val.title}</h3>
                  <p className="editorial-body">{val.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — editorial vertical */}
      <section className="editorial-section">
        <div className="mx-auto max-w-3xl" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal>
            <span className="editorial-caption">JOURNEY</span>
            <h2 className="editorial-headline-md mt-4">
              A timeline of craft.
            </h2>
          </Reveal>
          <div className="mt-12 relative">
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-linen/10" />
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 80}>
                <div className="flex gap-8 relative py-6">
                  <div className="absolute left-8 top-1/2 w-2 h-2 -translate-x-[3.5px] -translate-y-1/2 rounded-full bg-ember/60" />
                  <span className="font-display text-sm font-[300] tracking-wide-custom text-ember shrink-0 w-16 pl-12">
                    {item.year}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-base font-[300] tracking-[0.04em] text-linen">{item.title}</h3>
                    <p className="editorial-body">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship section */}
      <section className="editorial-section">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal>
            <span className="editorial-caption">CRAFTSMANSHIP</span>
            <h2 className="editorial-headline-md mt-4">
              The hands behind<br />the kitchen.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { image: "/images/cabinetry/05-design-detail.jpg", label: "Joinery & Assembly" },
              { image: "/images/materials/01-marble-countertop.jpg", label: "Stone Fabrication" },
              { image: "/images/hardware/01-blum-hinge.jpg", label: "Hardware Installation" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 80}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover img-grade"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="editorial-caption">{item.label.toUpperCase()}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
