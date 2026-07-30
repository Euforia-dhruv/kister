"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/site/Reveal";

const GALLERY = [
  {
    id: 1,
    title: "The Scavolini Lago",
    description: "Matte black cabinetry with brass hardware. A kitchen that breathes.",
    image: "/images/kitchens/scavolini-poetica-hero.jpg",
    category: "Modern",
    location: "Coimbatore",
    year: "2024",
  },
  {
    id: 2,
    title: "The Le Creuset Corner",
    description: "Heritage cast iron meets contemporary design. Warmth in every surface.",
    image: "/images/kitchens/scavolini-carattere-white.jpg",
    category: "Heritage",
    location: "Bangalore",
    year: "2023",
  },
  {
    id: 3,
    title: "The Bosch Minimal",
    description: "Hidden appliances, clean lines. Technology that disappears into craft.",
    image: "/images/kitchens/scavolini-delinea-peninsula.jpg",
    category: "Minimal",
    location: "Mumbai",
    year: "2024",
  },
  {
    id: 4,
    title: "The Artisan's Workshop",
    description: "Walnut, copper, stone. A kitchen built for making, not just showing.",
    image: "/images/kitchens/scavolini-carattere-english.jpg",
    category: "Artisan",
    location: "Chennai",
    year: "2023",
  },
  {
    id: 5,
    title: "The Scavolini Nero",
    description: "Black on black. Depth without darkness. A kitchen that commands attention.",
    image: "/images/kitchens/scavolini-poetica-ushaped.jpg",
    category: "Modern",
    location: "Hyderabad",
    year: "2024",
  },
  {
    id: 6,
    title: "The Franke Station",
    description: "Granite composite, stainless steel, precision engineering. The unsung hero.",
    image: "/images/hardware/blanco-claron-700.webp",
    category: "Industrial",
    location: "Coimbatore",
    year: "2023",
  },
  {
    id: 7,
    title: "The Miele Gallery",
    description: "Integrated appliances, seamless cabinetry. The kitchen that disappears.",
    image: "/images/appliances/smeg-musa-hero.jpg",
    category: "Minimal",
    location: "Pune",
    year: "2024",
  },
  {
    id: 8,
    title: "The Heritage Bungalow",
    description: "Restored 1960s kitchen with modern efficiency. Original bones, contemporary soul.",
    image: "/images/kitchens/scavolini-poetica-iron-grey.jpg",
    category: "Heritage",
    location: "Bangalore",
    year: "2023",
  },
  {
    id: 9,
    title: "The Copper Kitchen",
    description: "Copper cookware display, walnut shelving, marble countertops. Material heaven.",
    image: "/images/kitchens/scavolini-poetica-linear.jpg",
    category: "Artisan",
    location: "Coimbatore",
    year: "2024",
  },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<(typeof GALLERY)[0] | null>(null);

  return (
    <main className="relative bg-void">
      {/* Hero — full viewport */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-[1400px] text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <span className="editorial-caption">GALLERY</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="editorial-headline mt-6">
              Kitchens we&apos;ve<br />curated.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              Every kitchen is a collaboration. Every material is a choice.
              Here are the results.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured kitchen — full viewport */}
      <section className="editorial-section-sm">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal scale>
            <div
              className="group relative aspect-[16/9] overflow-hidden cursor-pointer"
              onClick={() => setSelected(GALLERY[0])}
            >
              <Image
                src={GALLERY[0].image}
                alt={`${GALLERY[0].title} — ${GALLERY[0].description}`}
                fill
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <span className="editorial-caption">{GALLERY[0].category.toUpperCase()}</span>
                <h2 className="editorial-headline-sm mt-3">{GALLERY[0].title}</h2>
                <p className="editorial-body mt-2 max-w-sm">{GALLERY[0].description}</p>
                <p className="font-body text-xs font-[300] text-smoke/50 mt-2">
                  {GALLERY[0].location} · {GALLERY[0].year}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery — editorial grid with varying sizes */}
      <section className="editorial-section">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-4">
            {/* Row 1: two medium */}
            <Reveal className="md:col-span-6" delay={0}>
              <div
                className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                onClick={() => setSelected(GALLERY[1])}
              >
                <Image
                  src={GALLERY[1].image}
                  alt={`${GALLERY[1].title} — ${GALLERY[1].category} kitchen in ${GALLERY[1].location}`}
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="editorial-caption">{GALLERY[1].category.toUpperCase()}</span>
                  <h3 className="editorial-headline-sm mt-2">{GALLERY[1].title}</h3>
                  <p className="font-body text-xs font-[300] text-smoke/50 mt-1">
                    {GALLERY[1].location} · {GALLERY[1].year}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal className="md:col-span-6" delay={80}>
              <div
                className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                onClick={() => setSelected(GALLERY[2])}
              >
                <Image
                  src={GALLERY[2].image}
                  alt={`${GALLERY[2].title} — ${GALLERY[2].category} kitchen in ${GALLERY[2].location}`}
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="editorial-caption">{GALLERY[2].category.toUpperCase()}</span>
                  <h3 className="editorial-headline-sm mt-2">{GALLERY[2].title}</h3>
                  <p className="font-body text-xs font-[300] text-smoke/50 mt-1">
                    {GALLERY[2].location} · {GALLERY[2].year}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Row 2: one wide, two stacked */}
            <Reveal className="md:col-span-8" delay={160}>
              <div
                className="group relative aspect-[16/10] overflow-hidden cursor-pointer"
                onClick={() => setSelected(GALLERY[3])}
              >
                <Image
                  src={GALLERY[3].image}
                  alt={`${GALLERY[3].title} — artisan kitchen with ${GALLERY[3].category.toLowerCase()} design`}
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="editorial-caption">{GALLERY[3].category.toUpperCase()}</span>
                  <h3 className="editorial-headline-sm mt-2">{GALLERY[3].title}</h3>
                </div>
              </div>
            </Reveal>
            <div className="md:col-span-4 flex flex-col gap-4">
              <Reveal delay={240}>
                <div
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => setSelected(GALLERY[4])}
                >
                  <Image
                    src={GALLERY[4].image}
                    alt={`${GALLERY[4].title} — ${GALLERY[4].category.toLowerCase()} kitchen design`}
                    fill
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="editorial-caption">{GALLERY[4].category.toUpperCase()}</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => setSelected(GALLERY[5])}
                >
                  <Image
                    src={GALLERY[5].image}
                    alt={`${GALLERY[5].title} — ${GALLERY[5].category.toLowerCase()} kitchen with stainless steel`}
                    fill
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="editorial-caption">{GALLERY[5].category.toUpperCase()}</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Row 3: three equal */}
            {GALLERY.slice(6).map((item, i) => (
              <Reveal key={item.id} className="md:col-span-4" delay={i * 80}>
                <div
                  className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                  onClick={() => setSelected(item)}
                >
                  <Image
                    src={item.image}
                    alt={`${item.title} — ${item.category} kitchen in ${item.location}`}
                    fill
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="editorial-caption">{item.category.toUpperCase()}</span>
                    <h3 className="font-display text-base font-[100] tracking-[0.04em] text-linen mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-3xl text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <h2 className="editorial-headline-md">
              Every kitchen<br />tells a story.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-lg">
              Yours is next. Visit the showroom to see, touch, and experience
              the materials that will define your kitchen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 backdrop-blur-sm p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full aspect-[16/10] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.image}
                alt={`${selected.title} — ${selected.description}`}
                fill
                className="object-cover img-grade"
                sizes="90vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-void/80 to-transparent">
                <span className="editorial-caption">{selected.category.toUpperCase()}</span>
                <h3 className="editorial-headline-sm mt-2">{selected.title}</h3>
                <p className="editorial-body mt-2 max-w-lg">{selected.description}</p>
                <p className="font-body text-xs font-[300] text-smoke/50 mt-1">
                  {selected.location} · {selected.year}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 border border-linen/20 flex items-center justify-center bg-void/40 backdrop-blur-sm transition-colors duration-500 hover:border-linen/50"
              >
                <span className="text-linen text-lg">×</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
