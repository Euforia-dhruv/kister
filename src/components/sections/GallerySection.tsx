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
    size: "large",
  },
  {
    id: 2,
    title: "The Le Creuset Corner",
    description: "Heritage cast iron meets contemporary design. Warmth in every surface.",
    image: "/images/kitchens/scavolini-carattere-white.jpg",
    category: "Heritage",
    size: "medium",
  },
  {
    id: 3,
    title: "The Bosch Minimal",
    description: "Hidden appliances, clean lines. Technology that disappears into craft.",
    image: "/images/kitchens/scavolini-delinea-peninsula.jpg",
    category: "Minimal",
    size: "medium",
  },
  {
    id: 4,
    title: "The Artisan's Workshop",
    description: "Walnut, copper, stone. A kitchen built for making, not just showing.",
    image: "/images/kitchens/scavolini-carattere-english.jpg",
    category: "Artisan",
    size: "wide",
  },
  {
    id: 5,
    title: "The Scavolini Nero",
    description: "Black on black. Depth without darkness. A kitchen that commands attention.",
    image: "/images/kitchens/scavolini-poetica-hero.jpg",
    category: "Modern",
    size: "medium",
  },
  {
    id: 6,
    title: "The Franke Station",
    description: "Granite composite, stainless steel, precision engineering. The unsung hero.",
    image: "/images/kitchens/scavolini-carattere-white.jpg",
    category: "Industrial",
    size: "medium",
  },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<(typeof GALLERY)[0] | null>(null);

  return (
    <section className="editorial-section border-t border-linen/5">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-14">
            <span className="editorial-caption">GALLERY</span>
            <h2 className="editorial-headline-md mt-4">
              Kitchens we&apos;ve curated.
            </h2>
          </div>
        </Reveal>

        {/* Editorial gallery — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Large hero image — 8 cols, 2 rows */}
          <Reveal className="md:col-span-8 md:row-span-2" delay={0}>
            <div
              className="group relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden cursor-pointer"
              onClick={() => setSelected(GALLERY[0])}
              data-cursor="OPEN"
              data-cursor-expand
            >
              <Image
                src={GALLERY[0].image}
                alt={GALLERY[0].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03] img-grade"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <span className="editorial-caption">{GALLERY[0].category.toUpperCase()}</span>
                <h3 className="editorial-headline-sm mt-2">{GALLERY[0].title}</h3>
                <p className="editorial-body mt-2 max-w-sm">{GALLERY[0].description}</p>
              </div>
            </div>
          </Reveal>

          {/* Two stacked medium — 4 cols */}
          <Reveal className="md:col-span-4" delay={100}>
            <div
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              onClick={() => setSelected(GALLERY[1])}
              data-cursor="OPEN"
            >
              <Image
                src={GALLERY[1].image}
                alt={GALLERY[1].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03] img-grade"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="editorial-caption text-[0.55rem]">{GALLERY[1].category.toUpperCase()}</span>
                <h3 className="font-display text-sm font-[100] tracking-[0.04em] text-linen mt-1.5">
                  {GALLERY[1].title}
                </h3>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-4" delay={200}>
            <div
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              onClick={() => setSelected(GALLERY[2])}
              data-cursor="OPEN"
            >
              <Image
                src={GALLERY[2].image}
                alt={GALLERY[2].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03] img-grade"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="editorial-caption text-[0.55rem]">{GALLERY[2].category.toUpperCase()}</span>
                <h3 className="font-display text-sm font-[100] tracking-[0.04em] text-linen mt-1.5">
                  {GALLERY[2].title}
                </h3>
              </div>
            </div>
          </Reveal>

          {/* Wide image — full width */}
          <Reveal className="md:col-span-6" delay={300}>
            <div
              className="group relative aspect-[16/9] overflow-hidden cursor-pointer"
              onClick={() => setSelected(GALLERY[3])}
              data-cursor="OPEN"
            >
              <Image
                src={GALLERY[3].image}
                alt={GALLERY[3].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03] img-grade"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="editorial-caption text-[0.55rem]">{GALLERY[3].category.toUpperCase()}</span>
                <h3 className="font-display text-sm font-[100] tracking-[0.04em] text-linen mt-1.5">
                  {GALLERY[3].title}
                </h3>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-6" delay={400}>
            <div
              className="group relative aspect-[16/9] overflow-hidden cursor-pointer"
              onClick={() => setSelected(GALLERY[4])}
              data-cursor="OPEN"
            >
              <Image
                src={GALLERY[4].image}
                alt={GALLERY[4].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03] img-grade"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="editorial-caption text-[0.55rem]">{GALLERY[4].category.toUpperCase()}</span>
                <h3 className="font-display text-sm font-[100] tracking-[0.04em] text-linen mt-1.5">
                  {GALLERY[4].title}
                </h3>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ─── LIGHTBOX ──────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 backdrop-blur-md p-6 md:p-12"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-6xl w-full aspect-[16/10] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover img-grade"
                sizes="90vw"
              />
              <div className="absolute inset-0 img-warm img-vignette" />

              {/* Gradient info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-void/80 via-void/30 to-transparent">
                <span className="editorial-caption">{selected.category.toUpperCase()}</span>
                <h3 className="editorial-headline-sm mt-2">{selected.title}</h3>
                <p className="editorial-body mt-2 max-w-lg">{selected.description}</p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 w-10 h-10 border border-linen/15 flex items-center justify-center bg-void/30 backdrop-blur-sm transition-all duration-300 hover:border-linen/40 hover:bg-void/50"
                data-cursor="CLOSE"
              >
                <span className="text-linen/70 text-lg">×</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
