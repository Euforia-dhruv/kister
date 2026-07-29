"use client";

import { useRef, useEffect, CSSProperties } from "react";

interface DepthLayerProps {
  children: React.ReactNode;
  speed: number; // 0 = static, 1 = full scroll speed, negative = reverse
  zIndex?: number;
  style?: CSSProperties;
  className?: string;
}

export default function DepthLayer({ children, speed, zIndex = 0, style, className = "" }: DepthLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layerRef.current) return;

    const handleScroll = () => {
      if (!layerRef.current) return;
      const scrollY = window.scrollY;
      const yOffset = scrollY * speed;
      layerRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={layerRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex, willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
