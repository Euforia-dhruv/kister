"use client";

import { lazy, Suspense } from "react";
import CinematicHero from "@/components/hero/CinematicHero";
import CinematicJourney from "@/components/cinematic/CinematicJourney";

const CanvasExperience = lazy(
  () => import("@/components/canvas/CanvasExperience")
);

function CanvasLoader() {
  return (
    <div className="h-[600vh] bg-void" />
  );
}

export default function Home() {
  return (
    <main className="relative bg-void">
      {/* ─── CINEMATIC INTRO (600vh scroll-driven) ─── */}
      <Suspense fallback={<CanvasLoader />}>
        <CanvasExperience />
      </Suspense>

      {/* ─── INTERACTIVE KITCHEN HERO (180vh pinned) ─── */}
      <CinematicHero />

      {/* ─── CONTINUOUS CINEMATIC JOURNEY (540vh pinned) ─── */}
      <CinematicJourney />
    </main>
  );
}
