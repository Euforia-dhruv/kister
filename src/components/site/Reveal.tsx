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
  mask?: boolean;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

const slideVariants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  blur = false,
  scale = false,
  slide = "up",
  mask = false,
  duration = 0.8,
  once = true,
}: RevealProps) {
  let variants: Variants;

  if (blur) {
    variants = {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    };
  } else if (scale) {
    variants = {
      hidden: { opacity: 0, scale: 1.06 },
      visible: { opacity: 1, scale: 1 },
    };
  } else if (mask) {
    variants = {
      hidden: { clipPath: "inset(0 100% 0 0)" },
      visible: { clipPath: "inset(0 0% 0 0)" },
    };
  } else {
    variants = slideVariants[slide];
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1, margin: "0px 0px -60px 0px" }}
      variants={variants}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "opacity, transform, filter, clip-path" }}
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
      viewport={{ once: true, amount: 0.1 }}
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
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

// ─── TEXT REVEAL (word by word) ─────────────────────────────
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function TextReveal({ text, className = "", delay = 0, stagger = 0.03 }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
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
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
