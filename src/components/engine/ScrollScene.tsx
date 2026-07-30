"use client";

import { useRef, useEffect, ReactNode } from "react";
import { useMotionValue } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/engine/gsap";

interface ScrollSceneProps {
  children: (progress: ReturnType<typeof useMotionValue<number>>) => ReactNode;
  height?: string;
  className?: string;
}

export default function ScrollScene({ children, height = "300vh", className = "" }: ScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          progress.set(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, [progress]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {children(progress)}
      </div>
    </div>
  );
}
