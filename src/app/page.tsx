"use client";

import { lazy, Suspense } from "react";

const HeroCanvas = lazy(() => import("@/components/hero/HeroCanvas"));
const ActOrchestrator = lazy(
  () => import("@/components/acts/ActOrchestrator")
);

function CanvasLoader({ height }: { height: string }) {
  return <div style={{ height }} className="bg-void" />;
}

export default function Home() {
  return (
    <main className="relative bg-void">
      {/* ─── HERO VIDEO — SCROLL-DRIVEN FRAME SEQUENCE ─── */}
      <Suspense fallback={<CanvasLoader height="300vh" />}>
        <HeroCanvas />
      </Suspense>

      {/* ─── ACT-ORCHESTRATED CINEMATIC EXPERIENCE (680vh) ─── */}
      <Suspense fallback={<CanvasLoader height="680vh" />}>
        <ActOrchestrator />
      </Suspense>
    </main>
  );
}
