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
  },
  {
    id: 2,
    title: "The Le Creuset Corner",
    description: "Heritage cast iron meets contemporary design. Warmth in every surface.",
    image: "/images/kitchens/scavolini-carattere-white.jpg",
    category: "Heritage",
  },
  {
    id: 3,
    title: "The Bosch Minimal",
    description: "Hidden appliances, clean lines. Technology that disappears into craft.",
    image: "/images/kitchens/scavolini-delinea-peninsula.jpg",
    category: "Minimal",
  },
  {
    id: 4,
    title: "The Artisan's Workshop",
    description: "Walnut, copper, stone. A kitchen built for making, not just showing.",
    image: "/images/kitchens/scavolini-carattere-english.jpg",
    category: "Artisan",
  },
  {
    id: 5,
    title: "The Scavolini Nero",
    description: "Black on black. Depth without darkness. A kitchen that commands attention.",
    image: "/images/kitchens/scavolini-poetica-hero.jpg",
    category: "Modern",
  },
  {
    id: 6,
    title: "The Franke Station",
    description: "Granite composite, stainless steel, precision engineering. The unsung hero.",
    image: "/images/kitchens/scavolini-carattere-white.jpg",
    category: "Industrial",
  },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<(typeof GALLERY)[0] | null>(null);

  return (
    <section className="editorial-section border-t border-linen/5">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="text-center mb-16">
            <span className="editorial-caption">GALLERY</span>
            <h2 className="editorial-headline-md mt-4">
              Kitchens we&apos;ve curated.
            </h2>
          </div>
        </Reveal>

        {/* Gallery — editorial grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <Reveal key={item.id} delay={i * 60}>
              <div
                className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                onClick={() => setSelected(item)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 img-grade"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 img-warm img-vignette" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="editorial-caption">{item.category.toUpperCase()}</span>
                  <h3 className="font-display text-lg font-[100] tracking-[0.04em] text-linen mt-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 backdrop-blur-sm p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full aspect-[16/10] overflow-hidden"
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
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-void/80 to-transparent">
                <span className="editorial-caption">{selected.category.toUpperCase()}</span>
                <h3 className="editorial-headline-sm mt-2">{selected.title}</h3>
                <p className="editorial-body mt-2 max-w-lg">{selected.description}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 border border-linen/20 flex items-center justify-center bg-void/40 backdrop-blur-sm transition-colors hover:border-linen/50"
              >
                <span className="text-linen text-lg">×</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
