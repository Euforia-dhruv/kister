"use client";

import { useRef, useEffect, useMemo } from "react";

interface CinematicTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  weight?: number;
  size?: string;
  color?: string;
  tracking?: string;
  className?: string;
  // Animation props
  reveal?: "fade" | "letters" | "words" | "scale" | "blur";
  revealDelay?: number;
  // Parallax
  parallaxSpeed?: number;
  // Perspective
  perspective?: number;
  rotateX?: number;
}

export default function CinematicText({
  text,
  as: Tag = "h2",
  weight = 100,
  size = "clamp(2rem, 6vw, 4rem)",
  color = "#f5f0eb",
  tracking = "0em",
  className = "",
  reveal = "fade",
  revealDelay = 0,
  parallaxSpeed = 0,
  perspective = 0,
  rotateX = 0,
}: CinematicTextProps) {
  const textRef = useRef<HTMLElement>(null);

  // Split text for letter/word animation
  const splits = useMemo(() => {
    if (reveal === "letters") return text.split("").map((l) => l === " " ? "\u00A0" : l);
    if (reveal === "words") return text.split(" ");
    return [];
  }, [text, reveal]);

  return (
    <Tag
      ref={textRef as any}
      className={`cinematic-text ${className}`}
      style={{
        fontFamily: '"Inter", system-ui, sans-serif',
        fontWeight: weight,
        fontSize: size,
        color,
        letterSpacing: tracking,
        lineHeight: weight < 200 ? 0.95 : 1.2,
        transform: perspective ? `perspective(${perspective}px) rotateX(${rotateX}deg)` : undefined,
        willChange: "transform, opacity",
      }}
      data-reveal={reveal}
      data-delay={revealDelay}
    >
      {reveal === "letters" || reveal === "words" ? (
        splits.map((split, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              transitionDelay: `${revealDelay + i * (reveal === "letters" ? 30 : 80)}ms`,
            }}
          >
            {split}
            {reveal === "words" && i < splits.length - 1 ? " " : ""}
          </span>
        ))
      ) : (
        text
      )}
    </Tag>
  );
}
