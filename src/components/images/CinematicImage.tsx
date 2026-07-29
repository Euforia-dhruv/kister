"use client";

import { useRef } from "react";

interface CinematicImageProps {
  src: string;
  alt: string;
  // Animation
  reveal?: "zoom" | "pan" | "mask" | "blur" | "fade";
  // Mask shape
  maskShape?: "circle" | "rectangle" | "diamond" | "custom";
  maskSize?: string;
  // Motion
  scale?: [number, number]; // [from, to]
  panX?: [number, number];
  panY?: [number, number];
  // Lighting
  overlay?: string;
  vignette?: boolean;
  // Blur
  blurAmount?: number;
  // Perspective
  perspective?: number;
  rotateY?: number;
  // Style
  className?: string;
  objectPosition?: string;
}

export default function CinematicImage({
  src,
  alt,
  reveal: _reveal = "zoom",
  maskShape = "rectangle",
  maskSize = "100%",
  scale = [1.1, 1],
  panX: _panX = [0, 0],
  panY: _panY = [0, 0],
  overlay = "rgba(10,10,10,0.3)",
  vignette = true,
  blurAmount = 0,
  perspective = 0,
  rotateY = 0,
  className = "",
  objectPosition = "center center",
}: CinematicImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const maskStyles: Record<string, string> = {
    circle: `circle(${maskSize} at 50% 50%)`,
    rectangle: `inset(0 round 0)`,
    diamond: `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
    custom: `ellipse(${maskSize} at 50% 50%)`,
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        clipPath: maskStyles[maskShape],
        perspective: perspective ? `${perspective}px` : undefined,
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{
          objectPosition,
          transform: perspective ? `perspective(${perspective}px) rotateY(${rotateY}deg) scale(${scale[0]})` : `scale(${scale[0]})`,
          transition: "transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
          filter: blurAmount ? `blur(${blurAmount}px)` : undefined,
        }}
        loading="lazy"
      />
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0" style={{ background: overlay }} />
      )}
      {/* Vignette */}
      {vignette && (
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.6) 100%)",
          }}
        />
      )}
    </div>
  );
}
