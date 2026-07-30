"use client";

import { useMemo } from "react";
import Image from "next/image";

/* ─── ACT 7: BEFORE / AFTER ─────────────────────────────── */
/* Scroll transforms the room. Walls repaint.                 */
/* Cabinets emerge. Lights turn on.                           */

export default function Act7BeforeAfter({ progress }: { progress: number }) {
  const wipeProgress = useMemo(() => Math.min(Math.max(progress, 0), 1), [progress]);
  const eased = useMemo(() => {
    const t = wipeProgress;
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }, [wipeProgress]);

  const contentOpacity = Math.max(0, (progress - 0.05) / 0.15);
  const labelOpacity = Math.max(0, Math.min((progress - 0.1) / 0.1, 1) * Math.min((1 - progress) / 0.1, 1));

  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      {/* ── Before image (full) ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/dark-kitchen-v2.jpg"
          alt="Kitchen before renovation"
          fill
          className="object-cover"
          style={{
            filter: "saturate(0.4) contrast(0.9) brightness(0.5)",
          }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/30" />
      </div>

      {/* ── After image (revealed via clip-path wipe) ── */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${(1 - eased) * 100}% 0 0)`,
        }}
      >
        <Image
          src="/images/kitchens/scavolini-poetica-island.jpg"
          alt="Kitchen after renovation — Scavolini Poetica"
          fill
          className="object-cover"
          style={{
            filter: "saturate(0.85) sepia(0.05) contrast(1.08) brightness(0.85)",
          }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/10" />
      </div>

      {/* ── Wipe line ── */}
      <div
        className="absolute top-0 bottom-0 w-[2px] z-[10] pointer-events-none"
        style={{
          left: `${eased * 100}%`,
          background: "linear-gradient(180deg, transparent 10%, rgba(196,90,44,0.6) 50%, transparent 90%)",
          boxShadow: "0 0 20px rgba(196,90,44,0.3), 0 0 60px rgba(196,90,44,0.1)",
        }}
      />

      {/* ── Before/After labels ── */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ opacity: labelOpacity }}
      >
        {/* Before label */}
        <div
          className="absolute top-8 left-8 transition-opacity duration-500"
          style={{ opacity: eased < 0.4 ? 1 : 0 }}
        >
          <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-linen/30">
            BEFORE
          </span>
        </div>

        {/* After label */}
        <div
          className="absolute top-8 right-8 transition-opacity duration-500"
          style={{ opacity: eased > 0.6 ? 1 : 0 }}
        >
          <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-ember/60">
            AFTER
          </span>
        </div>
      </div>

      {/* ── Progress percentage ── */}
      <div className="absolute bottom-8 right-8 z-[15]">
        <span className="font-display text-[clamp(2rem,5vw,4rem)] font-[100] text-linen/10 leading-none">
          {Math.round(eased * 100)}%
        </span>
      </div>

      {/* ── Content ── */}
      <div
        className="absolute inset-0 z-[20] flex flex-col justify-end pointer-events-none"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
          opacity: contentOpacity,
        }}
      >
        <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60">
          TRANSFORM
        </span>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[200] leading-[0.94] tracking-[-0.02em] text-linen mt-3">
          Drag to reveal<br />the transformation.
        </h2>
        <p className="font-body text-[clamp(0.75rem,0.9vw,0.9rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[360px] mt-6">
          Scroll to witness the metamorphosis. Every surface replaced.
          Every system upgraded. The same space, reborn.
        </p>
      </div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[12] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.5) 100%)",
        }}
      />
    </div>
  );
}
