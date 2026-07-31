"use client";

import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";

/* ─── MOTION TEXT ───────────────────────────────────────── */
/* Subscribes to a MotionValue<string> and renders it        */
/* without triggering React re-renders on scroll.             */

/* eslint-disable @typescript-eslint/no-explicit-any */
export function MotionText({
  value,
  style,
  className,
}: {
  value: MotionValue<any>;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [text, setText] = useState(String(value.get()));
  useMotionValueEvent(value, "change", (v: any) => setText(String(v)));
  return (
    <span style={style} className={className}>
      {text}
    </span>
  );
}
