"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/site/Reveal";

const TIMELINE = [
  { year: "1989", title: "Founded", desc: "Kitser opens its first showroom in Coimbatore, bringing premium European cookware to South India." },
  { year: "1995", title: "Le Creuset Partnership", desc: "Becomes the exclusive distributor of Le Creuset cast-iron cookware in the region." },
  { year: "2005", title: "Kitchen Design", desc: "Expands into modular kitchen curation, partnering with Scavolini and Bosch." },
  { year: "2015", title: "Showroom Redesign", desc: "The Nava India Road showroom is reimagined as an architectural experience — not a store." },
  { year: "2024", title: "Today", desc: "Over 35 brand partnerships. One philosophy: build kitchens that last generations." },
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
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative bg-void">
      {/* Hero with parallax */}
      <section ref={heroRef} className="scene scene-dark flex items-center justify-center px-6 py-40 overflow-hidden">
        <motion.div
          className="max-w-4xl text-center relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Reveal blur>
            <span className="editorial-caption">OUR STORY</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="editorial-headline mt-6">
              Three decades of<br />curated craft.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              From a single showroom to 35+ world-class partnerships — the story of Kitser is the story of the kitchen itself.
            </p>
          </Reveal>
        </motion.div>
      </section>

      {/* Story — editorial split */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center">
            <div className="md:col-span-5 md:col-start-1 flex flex-col justify-center">
              <Reveal>
                <p className="editorial-body">
                  Kitser was born from a simple observation: the kitchen is the most important
                  room in any home, yet most people settle for materials that don&apos;t deserve
                  the name.
                </p>
                <p className="editorial-body mt-6">
                  In 1989, we opened our first showroom in Coimbatore with a single conviction:
                  that premium kitchen essentials should be accessible to anyone willing to invest
                  in quality.
                </p>
                <p className="editorial-body mt-6">
                  Today, we represent over 35 of the world&apos;s finest kitchen brands. But we don&apos;t
                  just stock products. We curate experiences.
                </p>
              </Reveal>
            </div>
            <Reveal className="md:col-span-6 md:col-start-7" delay={200} scale>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/textures/artisan.jpg"
                  alt="Artisan craftsmanship"
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
      <section className="editorial-section border-t border-linen/5">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <span className="editorial-caption">VALUES</span>
            <h2 className="editorial-headline-md mt-4">
              What we believe.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val, i) => (
              <Reveal key={val.title} delay={i * 80}>
                <div className="flex flex-col gap-4">
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
      <section className="editorial-section border-t border-linen/5">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="editorial-caption">JOURNEY</span>
            <h2 className="editorial-headline-md mt-4">
              A timeline of craft.
            </h2>
          </Reveal>
          <div className="mt-16 relative">
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-linen/10" />
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 100}>
                <div className="flex gap-8 relative py-8">
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
    </main>
  );
}
