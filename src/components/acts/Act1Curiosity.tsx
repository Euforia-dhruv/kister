"use client";

import { useMemo } from "react";
import Image from "next/image";

/* ─── ACT 1: CURIOSITY ──────────────────────────────────── */
/* A stainless steel panel slowly separates, revealing         */
/* floating materials — wood, stone, glass, hardware.         */

interface FloatingMaterial {
  id: string;
  image: string;
  label: string;
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  scale: number;
}

const MATERIALS: FloatingMaterial[] = [
  { id: "walnut", image: "/images/cabinetry/02-handleless-design.jpg", label: "WALNUT", x: 15, y: 25, z: 80, rotateX: 12, rotateY: -8, scale: 0.9 },
  { id: "marble", image: "/images/materials/01-marble-countertop.jpg", label: "MARBLE", x: 72, y: 20, z: 120, rotateX: -5, rotateY: 15, scale: 1.1 },
  { id: "brass", image: "/images/materials/03-brass-detail.jpg", label: "BRASS", x: 28, y: 65, z: 60, rotateX: 8, rotateY: 12, scale: 0.75 },
  { id: "glass", image: "/images/materials/06-natural-finish.jpg", label: "GLASS", x: 78, y: 60, z: 100, rotateX: -10, rotateY: -5, scale: 0.85 },
  { id: "steel", image: "/images/materials/05-steel-finish.jpg", label: "STEEL", x: 50, y: 40, z: 140, rotateX: 3, rotateY: -12, scale: 1.0 },
  { id: "copper", image: "/images/materials/04-copper-patina.jpg", label: "COPPER", x: 40, y: 75, z: 70, rotateX: -8, rotateY: 6, scale: 0.8 },
];

export default function Act1Curiosity({ progress }: { progress: number }) {
  const panelOffset = Math.min(progress / 0.6, 1);
  const materialsOpacity = Math.max(0, (progress - 0.3) / 0.4);
  const contentOpacity = Math.max(0, (progress - 0.15) / 0.2);

  const eased = useMemo(() => {
    const t = panelOffset;
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }, [panelOffset]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      {/* ── Floating materials (revealed as panel opens) ── */}
      <div
        className="absolute inset-0"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          opacity: materialsOpacity,
        }}
      >
        {MATERIALS.map((mat, i) => {
          const delay = i * 0.08;
          const matProgress = Math.max(0, (progress - 0.3 - delay) / 0.35);
          const floatY = Math.sin(progress * Math.PI * 2 + i) * 8;
          const matOpacity = Math.min(matProgress * 2, 1);

          return (
            <div
              key={mat.id}
              className="absolute"
              style={{
                left: `${mat.x}%`,
                top: `${mat.y}%`,
                width: "clamp(100px, 14vw, 180px)",
                height: "clamp(100px, 14vw, 180px)",
                transform: `
                  translateZ(${mat.z * eased}px)
                  rotateX(${mat.rotateX * eased}deg)
                  rotateY(${mat.rotateY * eased}deg)
                  scale(${mat.scale})
                  translateY(${floatY}px)
                `,
                opacity: matOpacity,
                willChange: "transform, opacity",
              }}
            >
              <div className="relative w-full h-full overflow-hidden group">
                <Image
                  src={mat.image}
                  alt={mat.label}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  style={{
                    filter: "saturate(0.8) contrast(1.1) brightness(0.85)",
                  }}
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/40">
                    {mat.label}
                  </span>
                </div>
                {/* Light reflection overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(${135 + mat.rotateY}deg, rgba(255,255,255,0.08) 0%, transparent 50%)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Steel panels (separate on scroll) ── */}
      <div
        className="absolute inset-0 z-[20] pointer-events-none"
        style={{ perspective: "800px" }}
      >
        {/* Top panel */}
        <div
          className="absolute top-0 left-0 right-0 overflow-hidden"
          style={{
            height: "50%",
            transform: `translateY(${-eased * 55}%)`,
            transformOrigin: "center bottom",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #1a1a1a 0%, #222 40%, #1e1e1e 100%)",
            }}
          />
          {/* Brushed steel texture */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)`,
            }}
          />
          {/* Edge highlight */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 50%, transparent 90%)",
            }}
          />
        </div>

        {/* Bottom panel */}
        <div
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{
            height: "50%",
            transform: `translateY(${eased * 55}%)`,
            transformOrigin: "center top",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, #1a1a1a 0%, #222 40%, #1e1e1e 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)`,
            }}
          />
          {/* Edge highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 50%, transparent 90%)",
            }}
          />
        </div>
      </div>

      {/* ── Content overlay ── */}
      <div
        className="absolute inset-0 z-[30] flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <span className="font-body text-[0.55rem] font-[400] tracking-[0.25em] text-ember/50 mb-6">
          WHAT LIES BENEATH
        </span>
        <h1 className="font-display text-[clamp(2rem,6vw,5rem)] font-[100] leading-[0.9] tracking-[-0.03em] text-linen text-center max-w-[600px]">
          Every kitchen<br />starts with a material.
        </h1>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[25] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.6) 100%)",
        }}
      />
    </div>
  );
}
