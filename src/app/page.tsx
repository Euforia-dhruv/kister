"use client";

import { lazy, Suspense } from "react";

const HeroScene = lazy(() => import("@/components/hero/HeroScene"));
const ActOrchestrator = lazy(
  () => import("@/components/acts/ActOrchestrator")
);

function CanvasLoader({ height }: { height: string }) {
  return <div style={{ height }} className="bg-void" />;
}

export default function Home() {
  return (
    <main className="relative bg-void">
      {/* ─── HERO SCENE 01 — "ENTER THE WORLD OF KITSER" ─── */}
      <Suspense fallback={<CanvasLoader height="120vh" />}>
        <HeroScene />
      </Suspense>

      {/* ─── ACT-ORCHESTRATED CINEMATIC EXPERIENCE (680vh) ─── */}
      <Suspense fallback={<CanvasLoader height="680vh" />}>
        <ActOrchestrator />
      </Suspense>
    </main>
  );
}
