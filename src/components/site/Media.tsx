"use client";

import Image, { type ImageProps } from "next/image";
import { forwardRef } from "react";

/* ─── REUSABLE MEDIA COMPONENT ──────────────────────────────── */
/* Wraps next/image with:                                        */
/*  - aspect-ratio container (CLS prevention)                    */
/*  - responsive sizes                                           */
/*  - consistent object-fit / object-position                    */
/*  - optional image treatment classes                           */
/*  - proper priority handling                                   */

type AspectRatio =
  | "16/9"
  | "21/9"
  | "16/10"
  | "3/2"
  | "4/3"
  | "5/4"
  | "1/1"
  | "4/5"
  | "3/4"
  | "2/3"
  | "9/16";

type Treatment = "grade" | "tactile" | "atmospheric" | "none";

interface MediaProps extends Omit<ImageProps, "fill" | "sizes" | "className"> {
  /** Aspect ratio container. Defaults to "3/2" */
  aspect?: AspectRatio;
  /** Image treatment CSS class */
  treatment?: Treatment;
  /** Container className */
  containerClassName?: string;
  /** Image className */
  imageClassName?: string;
  /** Responsive sizes prop. Auto-generated if not provided */
  responsiveSizes?: string;
  /** Enable hover scale effect */
  hoverScale?: boolean;
}

const SIZES_MAP: Record<string, string> = {
  "16/9": "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw",
  "21/9": "(max-width: 768px) 100vw, 90vw",
  "16/10": "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw",
  "3/2": "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw",
  "4/3": "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw",
  "5/4": "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw",
  "1/1": "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw",
  "4/5": "(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 45vw",
  "3/4": "(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 45vw",
  "2/3": "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw",
  "9/16": "(max-width: 768px) 100vw, 50vw",
};

const TREATMENT_CLASS: Record<Treatment, string> = {
  grade: "img-grade",
  tactile: "img-tactile",
  atmospheric: "img-atmospheric",
  none: "",
};

const Media = forwardRef<HTMLDivElement, MediaProps>(
  (
    {
      aspect = "3/2",
      treatment = "none",
      containerClassName = "",
      imageClassName = "",
      responsiveSizes,
      hoverScale = false,
      alt,
      priority,
      ...imageProps
    },
    ref
  ) => {
    const sizes = responsiveSizes || SIZES_MAP[aspect] || SIZES_MAP["3/2"];
    const treatmentClass = TREATMENT_CLASS[treatment];

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${containerClassName}`}
        style={{ aspectRatio: aspect }}
      >
        <Image
          alt={alt || ""}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${treatmentClass} ${
            hoverScale
              ? "transition-transform duration-[1.2s] ease-out hover:scale-110"
              : ""
          } ${imageClassName}`}
          {...imageProps}
        />
      </div>
    );
  }
);

Media.displayName = "Media";

export default Media;

/* ─── ASPECT RATIO PRESETS ────────────────────────────────── */
/* For use in Tailwind class names                               */

export const ASPECT = {
  /** Ultra-wide hero / cinematic */
  hero: "aspect-[21/9]",
  /** Standard landscape */
  landscape: "aspect-[16/10]",
  /** Wide landscape */
  wide: "aspect-[16/9]",
  /** Classic photo */
  photo: "aspect-[3/2]",
  /** Standard card */
  card: "aspect-[4/3]",
  /** Slightly tall */
  tall: "aspect-[5/4]",
  /** Square */
  square: "aspect-square",
  /** Portrait editorial */
  portrait: "aspect-[4/5]",
  /** Tall portrait */
  tallPortrait: "aspect-[3/4]",
  /** Ultra tall */
  ultraTall: "aspect-[2/3]",
  /** Mobile / vertical video */
  vertical: "aspect-[9/16]",
} as const;
