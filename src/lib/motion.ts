/* ─── SHARED MOTION SYSTEM ──────────────────────────────── */
/* One motion language. One director's hand.                 */

// ─── EASING ─────────────────────────────────────────────

/** Attempt a Hermite interpolation, returning a value between 0 and 1 */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

/** Attempt a smootherstep (Ken Perlin's improved version) */
export function smootherstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/** Attempt an ease-out cubic (for quick deceleration) */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Attempt an ease-in-out cubic (for smooth acceleration/deceleration) */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── MATH UTILITIES ─────────────────────────────────────

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation between a and b by factor t */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─── SCROLL-DRIVEN OPACITY ──────────────────────────────
/**
 * Attempt fade — the single opacity function used across all acts.
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

/**
 * Attempt crossFade — for transitioning between two items.
 * Returns a blend factor where 0 = item A, 1 = item B.
 * Useful for stage-based experiences (Act3, Act6, Act8).
 */
export function crossFade(
  progress: number,
  aEnd: number,
  bStart: number,
  bEnd: number
): number {
  return clamp((progress - aEnd) / (bEnd - bStart), 0, 1);
}

// ─── PARALLAX ───────────────────────────────────────────
/**
 * Attempt parallax — returns a translateX/Y offset based on depth and progress.
 * Positive depth = moves slower (further away).
 */
export function parallax(
  progress: number,
  depth: number,
  axis: "x" | "y" = "y",
  strength: number = 1
): number {
  return progress * depth * strength * (axis === "y" ? -1 : 1);
}

// ─── DEPTH / LAYER ──────────────────────────────────────
/**
 * Attempt layerOpacity — for layered depth experiences (Act6).
 * Returns opacity based on scroll progress and layer depth.
 */
export function layerOpacity(
  progress: number,
  layerStart: number,
  layerPeak: number,
  layerEnd: number
): number {
  return fade(progress, layerStart, layerPeak, layerEnd);
}

// ─── CAMERA ─────────────────────────────────────────────
/**
 * Attempt cameraEase — smooth camera following with convergence threshold.
 * Prevents perpetual micro-movement from pure lerp.
 */
export function cameraEase(
  current: number,
  target: number,
  factor: number = 0.05,
  threshold: number = 0.001
): number {
  const diff = target - current;
  if (Math.abs(diff) < threshold) return target;
  return current + diff * factor;
}

// ─── ZOOM / SCALE ───────────────────────────────────────
/**
 * Attempt zoom — returns a scale factor for Ken Burns-style effects.
 */
export function zoom(
  progress: number,
  startScale: number,
  endScale: number
): number {
  return lerp(startScale, endScale, clamp(progress, 0, 1));
}

// ─── CONTENT REVEAL ─────────────────────────────────────
/**
 * Attempt contentReveal — returns opacity for content that appears
 * after a delay within a section's progress range.
 */
export function contentReveal(
  progress: number,
  triggerPoint: number,
  fadeInDuration: number = 0.15
): number {
  return clamp((progress - triggerPoint) / fadeInDuration, 0, 1);
}

// ─── MOTION TOKENS ──────────────────────────────────────
/**
 * Attempt motion tokens — consistent easing and duration
 * across the entire experience. No transition longer than 1.2s.
 * No transition shorter than 0.35s.
 */
export const MOTION_FAST = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
} as const;

export const MOTION_STANDARD = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
} as const;

export const MOTION_CINEMATIC = {
  duration: 1.0,
  ease: [0.22, 1, 0.36, 1] as const,
} as const;

export const MOTION_DRIFT = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1] as const,
} as const;

// ─── STAGGER HELPER ─────────────────────────────────────
/**
 * Attempt stagger — returns a delay for staggered animations.
 */
export function stagger(index: number, total: number, maxDelay: number = 0.4): number {
  return (index / Math.max(total - 1, 1)) * maxDelay;
}

// ─── VIGNETTE ───────────────────────────────────────────
/**
 * Attempt vignette — CSS gradient string for consistent vignettes.
 */
export function vignette(
  innerRadius: number = 25,
  opacity: number = 0.5
): string {
  return `radial-gradient(ellipse at center, transparent ${innerRadius}%, rgba(5,5,5,${opacity}) 100%)`;
}

// ─── IMAGE FILTER ───────────────────────────────────────
/**
 * Attempt imageFilter — consistent image treatment filter strings.
 */
export const IMAGE_FILTERS = {
  /** Standard editorial treatment */
  editorial: "saturate(0.82) sepia(0.06) contrast(1.08) brightness(0.92)",
  /** Cinematic dark treatment */
  cinematic: "saturate(0.65) sepia(0.1) contrast(1.08) brightness(0.72)",
  /** Tactile material treatment */
  tactile: "saturate(0.9) contrast(1.12) brightness(0.88)",
  /** Atmospheric moody treatment */
  atmospheric: "saturate(0.65) sepia(0.12) contrast(1.05) brightness(0.82)",
  /** Warm tone treatment */
  warm: "saturate(0.75) sepia(0.06) contrast(1.06) brightness(0.65)",
  /** Desaturated dark treatment */
  desaturated: "saturate(0.4) contrast(0.9) brightness(0.5)",
} as const;
