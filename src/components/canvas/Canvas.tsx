"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/engine/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CanvasProps {
  children: React.ReactNode;
  totalDuration?: number; // in viewport heights
}

export default function Canvas({ children, totalDuration = 80 }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!canvasRef.current || reducedMotion) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(window.scrollY / scrollHeight, 1);
      setProgress(p);

      // Map progress to beat (0-14 beats in the journey)
      const beat = Math.floor(p * 15);
      setCurrentBeat(Math.min(beat, 14));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  // Provide context to children

  return (
    <div
      ref={canvasRef}
      className="relative"
      style={{ height: `${totalDuration}00vh` }}
      data-progress={progress}
      data-beat={currentBeat}
    >
      {/* Fixed viewport — the "screen" */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// Hook to access canvas context
export function useCanvasContext() {
  const canvas = document.querySelector("[data-progress]");
  if (!canvas) return { progress: 0, currentBeat: 0 };
  return {
    progress: parseFloat(canvas.getAttribute("data-progress") || "0"),
    currentBeat: parseInt(canvas.getAttribute("data-beat") || "0"),
  };
}
