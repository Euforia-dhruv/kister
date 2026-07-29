"use client";

import { useRef, useEffect } from "react";

interface LightSourceProps {
  x: string;
  y: string;
  size: string;
  color: string;
  intensity: number;
  blur?: string;
}

export default function LightSource({ x, y, size, color, intensity, blur = "150px" }: LightSourceProps) {
  return (
    <div
      className="pointer-events-none absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur})`,
        opacity: intensity,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
