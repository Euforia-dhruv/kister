/* ─── SHARED MOTION SYSTEM ──────────────────────────────── */
/* One motion language. One director's hand.                 */

// ─── EASING ─────────────────────────────────────────────

/** Hermite interpolation, returning a value between 0 and 1 */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

/** Ease-in-out cubic for smooth acceleration/deceleration */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── MATH UTILITIES ─────────────────────────────────────

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ─── SCROLL-DRIVEN OPACITY ──────────────────────────────
/**
 * fade — the single opacity function used across all acts.
 * Returns 0 when outside [in, out], ramps up to 1 at peak, ramps down to 0.
 */
export function fade(
  progress: number,
  inPoint: number,
  peak: number,
  outPoint: number
): number {
  if (progress < inPoint || progress > outPoint) return 0;
  const fadeIn = smoothstep(inPoint, peak, progress);
  const fadeOut = 1 - smoothstep(peak, outPoint, progress);
  return Math.min(fadeIn, fadeOut);
}

// ─── CONTENT REVEAL ─────────────────────────────────────
/**
 * contentReveal — returns opacity for content that appears
 * after a delay within a section's progress range.
 */
export function contentReveal(
  progress: number,
  triggerPoint: number,
  fadeInDuration: number = 0.15
): number {
  return clamp((progress - triggerPoint) / fadeInDuration, 0, 1);
}

// ─── VIGNETTE ───────────────────────────────────────────
/**
 * vignette — CSS gradient string for consistent vignettes.
 */
export function vignette(
  innerRadius: number = 25,
  opacity: number = 0.5
): string {
  return `radial-gradient(ellipse at center, transparent ${innerRadius}%, rgba(5,5,5,${opacity}) 100%)`;
}

// ─── IMAGE FILTER ───────────────────────────────────────
/**
 * imageFilter — consistent image treatment filter strings.
 */
export const IMAGE_FILTERS = {
  editorial: "saturate(0.82) sepia(0.06) contrast(1.08) brightness(0.92)",
  cinematic: "saturate(0.65) sepia(0.1) contrast(1.08) brightness(0.72)",
  tactile: "saturate(0.9) contrast(1.12) brightness(0.88)",
  atmospheric: "saturate(0.65) sepia(0.12) contrast(1.05) brightness(0.82)",
  warm: "saturate(0.75) sepia(0.06) contrast(1.06) brightness(0.65)",
  desaturated: "saturate(0.4) contrast(0.9) brightness(0.5)",
} as const;
