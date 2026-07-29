"use client";

import dynamic from "next/dynamic";

const LenisProvider = dynamic(() => import("@/components/LenisProvider"), { ssr: false });
const CanvasExperience = dynamic(() => import("@/components/canvas/CanvasExperience"), { ssr: false });

export default function Home() {
  return (
    <LenisProvider>
      <main className="relative bg-void">
        <CanvasExperience />
      </main>
    </LenisProvider>
  );
}
