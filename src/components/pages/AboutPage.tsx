"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal, { Stagger, StaggerItem } from "@/components/site/Reveal";

const TIMELINE = [
  { year: "1989", title: "Founded", desc: "Kitser opens its first showroom in Coimbatore, bringing premium European cookware to South India." },
  { year: "1995", title: "Le Creuset Partnership", desc: "Becomes the exclusive distributor of Le Creuset cast-iron cookware in the region." },
  { year: "2005", title: "Kitchen Design", desc: "Expands into modular kitchen curation, partnering with Scavolini and Bosch." },
  { year: "2015", title: "Showroom Redesign", desc: "The Nava India Road showroom is reimagined as an architectural experience — not a store." },
  { year: "2024", title: "Today", desc: "Over 35 brand partnerships. One philosophy: build kitchens that last generations." },
];

const VALUES = [
  { title: "Craft", desc: "Every product is chosen for its integrity, not its marketing.", icon: "◆" },
  { title: "Heritage", desc: "We partner with makers who have decades — sometimes centuries — of expertise.", icon: "◇" },
  { title: "Material", desc: "Cast iron, copper, stone, walnut, brass. Materials that age with grace.", icon: "○" },
  { title: "Restraint", desc: "We curate. We don't accumulate. Less, but better.", icon: "□" },
];

const STATS = [
  { value: 35, suffix: "+", label: "Brand Partners" },
  { value: 35, suffix: "+", label: "Years of Craft" },
  { value: 1, suffix: "", label: "Philosophy" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  return (
    <motion.span
      className="font-display text-[clamp(2.5rem,5vw,4rem)] font-[100] tracking-[0.04em] text-ember"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {value}{suffix}
    </motion.span>
  );
}

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
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">OUR STORY</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-[100] leading-[1.05] tracking-[0.04em] text-linen">
              Three decades of<br />curated craft.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 font-body text-[clamp(0.9rem,1.3vw,1.05rem)] font-[300] leading-[1.8] text-smoke max-w-xl mx-auto">
              From a single showroom to 35+ world-class partnerships — the story of Kitser is the story of the kitchen itself.
            </p>
          </Reveal>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="scene scene-warm px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <Stagger stagger={0.15} className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <span className="font-body text-sm font-[300] tracking-wide-custom text-smoke">
                    {stat.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Story */}
      <section className="scene scene-dark px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-6">
              <p className="font-body text-[clamp(0.95rem,1.4vw,1.15rem)] font-[300] leading-[1.9] text-smoke">
                Kitser was born from a simple observation: the kitchen is the most important
                room in any home, yet most people settle for materials that don&apos;t deserve
                the name.
              </p>
              <p className="font-body text-[clamp(0.95rem,1.4vw,1.15rem)] font-[300] leading-[1.9] text-smoke">
                In 1989, we opened our first showroom in Coimbatore with a single conviction:
                that premium kitchen essentials should be accessible to anyone willing to invest
                in quality. Not expensive for the sake of it. Expensive because the materials
                demand it. Because the craft deserves it.
              </p>
              <p className="font-body text-[clamp(0.95rem,1.4vw,1.15rem)] font-[300] leading-[1.9] text-smoke">
                Today, we represent over 35 of the world&apos;s finest kitchen brands — from
                Scavolini&apos;s Italian cabinetry to Le Creuset&apos;s French cast iron,
                from Bosch&apos;s German engineering to Dyson&apos;s innovation. But we don&apos;t
                just stock products. We curate experiences.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200} scale>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/artisan-hands-v2.jpg"
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
      </section>

      {/* Values */}
      <section className="scene scene-warm px-6 py-32 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">VALUES</span>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
              What we believe.
            </h2>
          </Reveal>
          <Stagger stagger={0.1} className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val) => (
              <StaggerItem key={val.title}>
                <div className="flex flex-col gap-4 group">
                  <span className="text-2xl text-ember/40 group-hover:text-ember transition-colors duration-500">
                    {val.icon}
                  </span>
                  <h3 className="font-display text-lg font-[300] tracking-[0.06em] text-linen">{val.title}</h3>
                  <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">{val.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="scene scene-dark px-6 py-32 md:px-12">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">JOURNEY</span>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
              A timeline of craft.
            </h2>
          </Reveal>
          <div className="mt-16 relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-linen/10" />

            <Stagger stagger={0.15} className="flex flex-col gap-12">
              {TIMELINE.map((item) => (
                <StaggerItem key={item.year}>
                  <div className="flex gap-8 relative">
                    {/* Dot */}
                    <div className="absolute left-8 top-1 w-2 h-2 -translate-x-[3.5px] rounded-full bg-ember/60" />
                    <span className="font-display text-sm font-[300] tracking-wide-custom text-ember shrink-0 w-16 pl-12">
                      {item.year}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-base font-[300] tracking-[0.04em] text-linen">{item.title}</h3>
                      <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
    </main>
  );
}
