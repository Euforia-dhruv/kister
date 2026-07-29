export const EASINGS = {
  smooth: "power2.inOut",
  decelerate: "power2.out",
  accelerate: "power2.in",
  bounce: "elastic.out(1, 0.5)",
  overshoot: "back.out(1.7)",
  linear: "none",
} as const;

export const DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  dramatic: 1.5,
} as const;

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
} as const;
