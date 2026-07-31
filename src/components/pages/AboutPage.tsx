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
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="/images/artisan-hands-v2.jpg"
            alt="Artisan hands shaping wood — the craft behind every Kitser kitchen"
            fill
            className="object-cover"
            style={{ filter: "saturate(0.8) sepia(0.08) contrast(1.1) brightness(0.85)" }}
            sizes="120vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.1) 50%, rgba(10,10,10,0.6) 100%)" }} />
        <div className="absolute inset-0 z-[3]" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.8) 100%)" }} />

        <motion.div className="absolute inset-0 z-[10] flex flex-col justify-center" style={{ padding: "clamp(60px, 8vh, 120px) clamp(28px, 5vw, 72px)", opacity: heroOpacity }}>
          <Reveal blur>
            <span className="block font-body text-[0.6rem] font-[400] tracking-[0.2em] text-ember/70 mb-8">OUR STORY</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="font-display text-[clamp(40px,8vw,96px)] font-[200] leading-[0.94] tracking-[-0.025em] text-linen max-w-[700px]">
              Three decades of<br />curated craft.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-[clamp(0.85rem,1vw,0.95rem)] font-[300] leading-[1.75] text-smoke/50 max-w-[420px] mt-8">
              From a single showroom to 35+ world-class partnerships — the story of Kitser is the story of the kitchen itself.
            </p>
          </Reveal>
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
                  src="/images/kitchens/scavolini-carattere-hero.jpg"
                  alt="Scavolini Carattere kitchen — premium cabinetry installation in a modern Indian home"
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

      {/* Sustainability */}
      <section className="editorial-section bg-concrete/30">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Reveal>
              <div className="flex flex-col gap-6">
                <span className="editorial-caption">CONSCIOUS CHOICE</span>
                <h2 className="editorial-headline-md">
                  Materials that respect<br />your body and the planet.
                </h2>
                <p className="editorial-body mt-2">
                  We advocate for Teflon-free cookware — cast iron, clay, and handcrafted utensils
                  that impart depth of flavour without harmful chemicals. Our vision is plastic-free,
                  sustainable, and mindful.
                </p>
                <p className="editorial-body">
                  Beyond selling products, we advocate for a kitchen lifestyle that encourages
                  mindful cooking, healthy eating, and the joy of sharing meals with loved ones.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150} scale>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "TEFLON-FREE", desc: "Cast iron, clay, handcrafted utensils" },
                  { label: "PLASTIC-FREE", desc: "Sustainable vision for the planet" },
                  { label: "MINDFUL", desc: "Healthy eating, joy of sharing" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 p-4 border border-linen/5">
                    <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-ember/60">{item.label}</span>
                    <p className="font-body text-[0.7rem] font-[300] leading-[1.6] text-smoke/40">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
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
              { image: "/images/cabinetry/04-hero.jpg", label: "Joinery & Assembly — detailed craftsmanship in Scavolini cabinetry" },
              { image: "/images/materials/02-quartz-surface.jpg", label: "Stone Fabrication — premium quartz surface with natural veining" },
              { image: "/images/hardware/06-showroom.jpg", label: "Hardware Installation — Blum showroom display of precision hardware" },
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
