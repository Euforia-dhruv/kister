"use client";

import { lazy, Suspense } from "react";

const ActOrchestrator = lazy(
  () => import("@/components/acts/ActOrchestrator")
);

function CanvasLoader() {
  return (
    <div className="h-[680vh] bg-void" />
  );
}

export default function Home() {
  return (
    <main className="relative bg-void">
      {/* ─── ACT-ORCHESTRATED CINEMATIC EXPERIENCE (680vh) ─── */}
      <Suspense fallback={<CanvasLoader />}>
        <ActOrchestrator />
      </Suspense>
    </main>
  );
}
