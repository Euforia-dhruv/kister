"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { fade, vignette, IMAGE_FILTERS, clamp, contentReveal } from "@/lib/motion";

/* ─── ACT 8: FINAL REVEAL ───────────────────────────────── */
/* Walk through kitchens. Camera moves. Everything alive.     */

interface KitchenScene {
  id: string;
  image: string;
  label: string;
  depth: number;
  scale: number;
  x: number;
  y: number;
  in: number;
  peak: number;
  out: number;
}

const SCENES: KitchenScene[] = [
  { id: "entrance", image: "/images/showroom/01-interior.jpg", label: "ENTER", depth: 0, scale: 1.2, x: 50, y: 50, in: 0.0, peak: 0.1, out: 0.22 },
  { id: "cabinets", image: "/images/cabinetry/04-hero.jpg", label: "CABINETRY", depth: 1, scale: 1.0, x: 35, y: 45, in: 0.16, peak: 0.28, out: 0.40 },
  { id: "stone", image: "/images/materials/02-quartz-surface.jpg", label: "SURFACE", depth: 2, scale: 0.95, x: 60, y: 40, in: 0.34, peak: 0.46, out: 0.58 },
  { id: "hardware", image: "/images/hardware/01-blum-hinge.jpg", label: "HARDWARE", depth: 3, scale: 0.9, x: 40, y: 55, in: 0.52, peak: 0.64, out: 0.76 },
  { id: "light", image: "/images/kitchens/scavolini-delinea-brass.jpg", label: "DETAIL", depth: 4, scale: 0.85, x: 55, y: 45, in: 0.70, peak: 0.82, out: 0.94 },
  { id: "kitchen", image: "/images/kitchens/scavolini-poetica-island.jpg", label: "KITCHEN", depth: 5, scale: 1.0, x: 50, y: 50, in: 0.88, peak: 0.95, out: 1.02 },
];

const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  x: 10 + i * 12,
  phase: i * 0.5,
}));

export default function Act8FinalReveal({ progress }: { progress: number }) {
  const currentScene = useMemo(() => {
    return SCENES.reduce((best, scene) => {
      const op = fade(progress, scene.in, scene.peak, scene.out);
      const bestOp = fade(progress, best.in, best.peak, best.out);
      return op > bestOp ? scene : best;
    }, SCENES[0]);
  }, [progress]);

  const contentOpacity = contentReveal(progress, 0.05, 0.15);
  const isComplete = progress > 0.95;

  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      {/* ── Parallax kitchen scenes ── */}
      {SCENES.map((scene) => {
        const opacity = fade(progress, scene.in, scene.peak, scene.out);
        if (opacity <= 0.001) return null;

        const localP = clamp((progress - scene.in) / (scene.out - scene.in), 0, 1);
        const depthZ = scene.depth * 20;
        const parallaxX = (scene.x - 50) * localP * 5;
        const parallaxY = (scene.y - 50) * localP * 3;
        const zoom = scene.scale + localP * 0.05;

        return (
          <div
            key={scene.id}
            className="absolute inset-0"
            style={{ opacity }}
          >
            <div
              className="absolute inset-[-10%] will-change-transform"
              style={{
                transform: `
                  translateX(${parallaxX}px)
                  translateY(${parallaxY}px)
                  scale(${zoom})
                  translateZ(${depthZ}px)
                `,
              }}
            >
              <Image
                src={scene.image}
                alt={scene.label}
                fill
                className="object-cover"
                style={{
                  filter: `saturate(0.75) sepia(0.06) contrast(1.06) brightness(${0.6 + scene.depth * 0.04})`,
                }}
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-void/40" />
          </div>
        );
      })}

      {/* ── Floating detail elements ── */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        {progress > 0.2 && progress < 0.9 && (
          <>
            {/* Animated light streak */}
            <div
              className="absolute top-1/4 left-0 right-0 h-[1px] opacity-20"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(196,90,44,0.4), transparent)",
                transform: `translateX(${(progress - 0.2) * 200 - 50}%)`,
              }}
            />

            {/* Floating particles — memoized positions, computed opacity */}
            {PARTICLES.map((p) => {
              const y = 20 + Math.sin(progress * Math.PI * 3 + p.x) * 15;
              const particleOpacity = Math.sin(progress * Math.PI * 2 + p.phase) * 0.3 + 0.1;
              return (
                <div
                  key={p.x}
                  className="absolute w-[2px] h-[2px] rounded-full bg-ember/40"
                  style={{
                    left: `${p.x}%`,
                    top: `${y}%`,
                    opacity: Math.max(0, particleOpacity),
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      {/* ── Scene label ── */}
      <div className="absolute top-8 left-8 z-[20]">
        <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/20">
          {currentScene.label}
        </span>
      </div>

      {/* ── Progress dots ── */}
      <div className="absolute top-8 right-8 z-[20] flex items-center gap-2">
        {SCENES.map((scene) => {
          const isActive = scene.id === currentScene.id;
          const isPast = progress > scene.peak;
          return (
            <div
              key={scene.id}
              className={`w-1 h-1 rounded-full transition-all duration-500 ${
                isActive ? "bg-ember scale-150" : isPast ? "bg-linen/20" : "bg-linen/6"
              }`}
            />
          );
        })}
      </div>

      {/* ── Content ── */}
      <div
        className="absolute inset-0 z-[20] flex flex-col justify-center items-center text-center pointer-events-none"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
          opacity: contentOpacity,
        }}
      >
        {!isComplete ? (
          <>
            <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60 mb-6">
              REVEAL
            </span>
            <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-[100] leading-[0.9] tracking-[-0.03em] text-linen max-w-[700px]">
              Walk through<br />your kitchen.
            </h2>
            <p className="font-body text-[clamp(0.8rem,1vw,0.95rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[400px] mt-8">
              Scroll to move through the space. Every detail, every material,
              every system — alive and waiting.
            </p>
          </>
        ) : (
          <>
            <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60 mb-6">
              YOUR KITCHEN AWAITS
            </span>
            <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-[100] leading-[0.9] tracking-[-0.03em] text-linen max-w-[700px]">
              The kitchen<br />is where life<br />happens.
            </h2>
            <p className="font-body text-[clamp(0.85rem,1vw,0.95rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[420px] mt-8">
              No. 1, Nava India Road, Coimbatore — 641028
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 pointer-events-auto">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 h-12 border border-linen/10 px-6 font-body text-[10px] font-[300] tracking-[0.12em] text-linen/70 hover:text-linen hover:border-ember/30 transition-all duration-700"
                data-cursor="VISIT"
              >
                BOOK PRIVATE CONSULTATION
                <span className="w-0 group-hover:w-5 h-[1px] bg-current transition-all duration-700" />
              </Link>
              <Link
                href="/showroom"
                className="font-body text-sm font-[300] text-smoke/50 hover:text-ember transition-colors duration-700"
              >
                GET DIRECTIONS
              </Link>
            </div>
          </>
        )}
      </div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[18] pointer-events-none"
        style={{ background: vignette(20, 0.6) }}
      />
    </div>
  );
}
