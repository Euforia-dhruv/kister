"use client";

import Reveal from "@/components/site/Reveal";

/* ─── SECTION 7: TESTIMONIALS ──────────────────────────────── */
/* Luxury quote cards. Minimal. Editorial.                      */

const TESTIMONIALS = [
  {
    quote: "The kitchen feels like it was always meant to be here. Kitser didn't just design a space — they understood how we live.",
    author: "Priya & Karthik",
    project: "The Lakewood Residence, Coimbatore",
  },
  {
    quote: "We walked in for a sink. We left with a complete kitchen. The attention to detail is extraordinary — every hinge, every surface, every grain of walnut.",
    author: "Meera Sharma",
    project: "The Heritage Kitchen, Bangalore",
  },
  {
    quote: "Thirty years of cooking, and this is the first kitchen that feels like it was designed around my hands, not the other way around.",
    author: "Chef Rajan",
    project: "The Chef's Kitchen, Chennai",
  },
];

export default function Section7Testimonials() {
  return (
    <section className="relative bg-void py-[clamp(100px,14vh,180px)]">
      <div className="max-w-[1400px] mx-auto" style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)" }}>
        {/* Header */}
        <Reveal>
          <span className="editorial-caption block mb-4">
            TESTIMONIALS
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="editorial-headline">
            Words from<br />our clients.
          </h2>
        </Reveal>

        {/* Quote cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-[clamp(16px,2vw,28px)]">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 120}>
              <blockquote className="flex flex-col h-full p-[clamp(24px,3vw,40px)] border border-linen/5 group hover:border-ember/15 transition-colors duration-700">
                {/* Quote mark */}
                <span className="font-display text-[3rem] text-ember/20 leading-none mb-4">
                  &ldquo;
                </span>

                {/* Quote text */}
                <p className="font-display text-[clamp(0.9rem,1.1vw,1.05rem)] leading-[1.7] text-linen/65 flex-1">
                  {t.quote}
                </p>

                {/* Attribution */}
                <div className="mt-8 pt-6 border-t border-linen/5">
                  <span className="font-body text-[0.65rem] font-[400] tracking-[0.1em] text-linen/55 block">
                    {t.author}
                  </span>
                  <span className="font-body text-[0.5rem] font-[300] tracking-[0.12em] text-smoke/25 block mt-1">
                    {t.project}
                  </span>
                </div>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
