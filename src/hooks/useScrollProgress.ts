"use client";

import { useEffect, useState, useCallback } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [currentScene, setCurrentScene] = useState(0);
  const lastY = useCallback(() => {
    let y = 0;
    return () => {
      const prev = y;
      y = window.scrollY;
      return { prev, current: y };
    };
  }, [])();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / scrollHeight;
      setProgress(Math.min(scrolled, 1));

      const { prev, current } = lastY();
      setDirection(current > prev ? "down" : "up");

      // Estimate current scene (35 scenes over ~50 scroll units)
      const sceneEstimate = Math.floor(scrolled * 35);
      setCurrentScene(Math.min(sceneEstimate, 34));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return { progress, direction, currentScene };
}
