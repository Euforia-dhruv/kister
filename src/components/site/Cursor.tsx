"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface CursorState {
  label: string;
  expand: boolean;
  magnetic: boolean;
}

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>({
    label: "",
    expand: false,
    magnetic: false,
  });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springCfg = useMemo(() => ({ damping: 25, stiffness: 200, mass: 0.5 }), []);
  const dotCfg = useMemo(() => ({ damping: 35, stiffness: 400, mass: 0.2 }), []);
  const x = useSpring(cursorX, springCfg);
  const y = useSpring(cursorY, springCfg);
  const dx = useSpring(dotX, dotCfg);
  const dy = useSpring(dotY, dotCfg);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
    },
    [cursorX, cursorY, dotX, dotY]
  );

  useEffect(() => {
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [onMouseMove]);

  // Intercept link/button hover to show cursor states
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor], [data-cursor-label]");
      if (el) {
        const label = el.getAttribute("data-cursor-label") || el.getAttribute("data-cursor") || "";
        const expand = el.hasAttribute("data-cursor-expand");
        const magnetic = el.hasAttribute("data-cursor-magnetic");
        setState({ label, expand, magnetic });
      }
    };
    const onOut = () => {
      setState({ label: "", expand: false, magnetic: false });
    };

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    return () => {
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
    };
  }, []);

  if (isTouchDevice || prefersReducedMotion) return null;

  const size = state.expand ? 64 : 32;
  const dotSize = 6;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <motion.div
        className="absolute"
        style={{
          x,
          y,
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: size,
          height: size,
          borderColor: state.label ? "rgba(196,90,44,0.6)" : "rgba(245,240,235,0.15)",
          backgroundColor: state.label ? "rgba(196,90,44,0.04)" : "transparent",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full h-full rounded-full border border-current flex items-center justify-center">
          {state.label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="font-body text-[0.5rem] font-[400] tracking-[0.15em] text-ember uppercase whitespace-nowrap"
            >
              {state.label}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="absolute"
        style={{
          x: dx,
          y: dy,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-full h-full rounded-full bg-ember/80" />
      </motion.div>
    </motion.div>
  );
}
