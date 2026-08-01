"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/site/Reveal";

const GALLERY = [
  {
    id: 1,
    title: "The Scavolini Lago",
    description: "Scavolini Carattere kitchen — matte black cabinetry with brass hardware.",
    image: "/images/kitchens/scavolini-carattere-hero.jpg",
    category: "Modern",
    location: "Coimbatore",
    year: "2024",
  },
  {
    id: 2,
    title: "The Le Creuset Corner",
    description: "Scavolini DeLinea kitchen — minimalist design with integrated appliances.",
    image: "/images/kitchens/scavolini-poetica-island.jpg",
    category: "Heritage",
    location: "Bangalore",
    year: "2023",
  },
  {
    id: 3,
    title: "The Bosch Minimal",
    description: "Scavolini Poetica kitchen — elegant lines with warm wood tones.",
    image: "/images/kitchens/scavolini-poetica-linear.jpg",
    category: "Minimal",
    location: "Mumbai",
    year: "2024",
  },
  {
    id: 4,
    title: "The Artisan's Workshop",
    description: "Scavolini DeLinea peninsula — open plan kitchen with brass accents.",
    image: "/images/kitchens/scavolini-delinea-peninsula.jpg",
    category: "Artisan",
    location: "Chennai",
    year: "2023",
  },
  {
    id: 5,
    title: "The Scavolini Nero",
    description: "Scavolini Carattere English style — classic cabinetry with modern functionality.",
    image: "/images/kitchens/scavolini-carattere-english.jpg",
    category: "Modern",
    location: "Hyderabad",
    year: "2024",
  },
  {
    id: 6,
    title: "The Franke Station",
    description: "Franke sink — premium stainless steel with precision engineering.",
    image: "/images/hardware/franke-sink-hero.png",
    category: "Industrial",
    location: "Coimbatore",
    year: "2023",
  },
  {
    id: 7,
    title: "The Miele Gallery",
    description: "Miele Generation 7000 — integrated appliances with seamless design.",
    image: "/images/appliances/miele-gen7000-lifestyle.jpg",
    category: "Minimal",
    location: "Pune",
    year: "2024",
  },
  {
    id: 8,
    title: "The Heritage Bungalow",
    description: "Scavolini Poetica U-shaped — spacious layout with premium finishes.",
    image: "/images/kitchens/scavolini-poetica-ushaped.jpg",
    category: "Heritage",
    location: "Bangalore",
    year: "2023",
  },
  {
    id: 9,
    title: "The Copper Kitchen",
    description: "Scavolini Poetica Iron Grey — sleek modern kitchen with cool tones.",
    image: "/images/kitchens/scavolini-poetica-iron-grey.jpg",
    category: "Artisan",
    location: "Coimbatore",
    year: "2024",
  },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<(typeof GALLERY)[0] | null>(null);

  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="py-[clamp(80px,12vh,160px)]">
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
              The results speak for themselves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured kitchen — full viewport */}
      <section className="py-[clamp(40px,6vh,80px)]">
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
                <p className="font-body text-xs font-[300] text-smoke/40 mt-2">
                  {GALLERY[0].location} · {GALLERY[0].year}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery — editorial grid */}
      <section className="py-[clamp(60px,10vh,120px)]">
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
                  alt={`${GALLERY[1].title} — ${GALLERY[1].category} kitchen`}
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="editorial-caption">{GALLERY[1].category.toUpperCase()}</span>
                  <h3 className="editorial-headline-sm mt-2">{GALLERY[1].title}</h3>
                  <p className="font-body text-xs font-[300] text-smoke/40 mt-1">
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
                  alt={`${GALLERY[2].title} — ${GALLERY[2].category} kitchen`}
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="editorial-caption">{GALLERY[2].category.toUpperCase()}</span>
                  <h3 className="editorial-headline-sm mt-2">{GALLERY[2].title}</h3>
                  <p className="font-body text-xs font-[300] text-smoke/40 mt-1">
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
                  alt={`${GALLERY[3].title} — artisan kitchen`}
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
                    alt={`${GALLERY[4].title} — ${GALLERY[4].category.toLowerCase()} kitchen`}
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
                    alt={`${GALLERY[5].title} — ${GALLERY[5].category.toLowerCase()} kitchen`}
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
                    alt={`${item.title} — ${item.category} kitchen`}
                    fill
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04] img-grade"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="editorial-caption">{item.category.toUpperCase()}</span>
                    <h3 className="font-display text-base text-linen mt-1">
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
      <section className="py-[clamp(80px,12vh,160px)]">
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
                <p className="font-body text-xs font-[300] text-smoke/40 mt-1">
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
