"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
  scale?: boolean;
  slide?: "up" | "down" | "left" | "right";
  duration?: number;
  stagger?: number;
  once?: boolean;
}

const slideVariants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  blur = false,
  scale = false,
  slide = "up",
  duration = 0.7,
  once = true,
}: RevealProps) {
  let variants: Variants;

  if (blur) {
    variants = {
      hidden: { opacity: 0, filter: "blur(8px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    };
  } else if (scale) {
    variants = {
      hidden: { opacity: 0, scale: 1.05 },
      visible: { opacity: 1, scale: 1 },
    };
  } else {
    variants = slideVariants[slide];
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15, margin: "0px 0px -50px 0px" }}
      variants={variants}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

// ─── STAGGER CONTAINER ──────────────────────────────────────
interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function Stagger({ children, className = "", stagger = 0.1, delay = 0 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay / 1000,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
