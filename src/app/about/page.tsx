"use client";

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
  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="scene scene-dark flex items-center justify-center px-6 py-40">
        <div className="max-w-4xl text-center">
          <Reveal blur>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">OUR STORY</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-[100] leading-[1.05] tracking-[0.04em] text-linen">
              Three decades of<br />curated craft.
            </h1>
          </Reveal>
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
              <img src="/images/artisan-hands-v2.jpg" alt="Artisan craftsmanship" className="h-full w-full object-cover img-grade" />
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
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val, i) => (
              <Reveal key={val.title} delay={i * 100}>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-lg font-[300] tracking-[0.06em] text-linen">{val.title}</h3>
                  <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">{val.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
          <div className="mt-16 flex flex-col gap-12">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 100}>
                <div className="flex gap-8">
                  <span className="font-display text-sm font-[300] tracking-wide-custom text-ember shrink-0 w-16">
                    {item.year}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-base font-[300] tracking-[0.04em] text-linen">{item.title}</h3>
                    <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">{item.desc}</p>
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
