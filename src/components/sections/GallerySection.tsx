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
    image: "/images/dark-kitchen-v2.jpg",
    category: "Modern",
  },
  {
    id: 2,
    title: "The Le Creuset Corner",
    description: "Heritage cast iron meets contemporary design. Warmth in every surface.",
    image: "/images/marble-veins.jpg",
    category: "Heritage",
  },
  {
    id: 3,
    title: "The Bosch Minimal",
    description: "Hidden appliances, clean lines. Technology that disappears into craft.",
    image: "/images/brass-detail.jpg",
    category: "Minimal",
  },
  {
    id: 4,
    title: "The Artisan's Workshop",
    description: "Walnut, copper, stone. A kitchen built for making, not just showing.",
    image: "/images/artisan-hands-v2.jpg",
    category: "Artisan",
  },
  {
    id: 5,
    title: "The Scavolini Nero",
    description: "Black on black. Depth without darkness. A kitchen that commands attention.",
    image: "/images/dark-kitchen-v2.jpg",
    category: "Modern",
  },
  {
    id: 6,
    title: "The Franke Station",
    description: "Granite composite, stainless steel, precision engineering. The unsung hero.",
    image: "/images/marble-veins.jpg",
    category: "Industrial",
  },
];

export default function GallerySection() {
  const [selected, setSelected] = useState<typeof GALLERY[0] | null>(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(GALLERY.map((g) => g.category)))];

  const filtered = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  return (
    <section className="scene scene-dark px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">GALLERY</span>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen">
              Kitchens we&apos;ve curated.
            </h2>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-body text-xs font-[400] tracking-wide-custom px-4 py-2 border transition-all duration-500 ${
                  filter === cat
                    ? "border-ember text-ember"
                    : "border-linen/10 text-smoke hover:border-linen/30 hover:text-linen"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Gallery grid */}
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Reveal delay={i * 60}>
                  <div
                    className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                    onClick={() => setSelected(item)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 img-grade"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 img-warm img-vignette" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-void/0 group-hover:bg-void/50 transition-all duration-500 flex items-end p-8">
                      <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="font-body text-[0.6rem] font-[400] tracking-ultra text-ember">
                          {item.category.toUpperCase()}
                        </span>
                        <h3 className="mt-2 font-display text-lg font-[300] tracking-[0.04em] text-linen">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* View icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 border border-linen/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-void/40 backdrop-blur-sm">
                      <span className="text-linen text-lg">+</span>
                    </div>
                  </div>
                </Reveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-void/80 to-transparent">
                <span className="font-body text-[0.65rem] font-[400] tracking-ultra text-ember">
                  {selected.category.toUpperCase()}
                </span>
                <h3 className="mt-2 font-display text-2xl font-[100] tracking-[0.04em] text-linen">
                  {selected.title}
                </h3>
                <p className="mt-2 font-body text-sm font-[300] text-smoke max-w-lg">
                  {selected.description}
                </p>
              </div>

              {/* Close button */}
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
