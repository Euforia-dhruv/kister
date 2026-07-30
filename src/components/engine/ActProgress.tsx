"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ACTS = [
  { id: "silence", label: "I", name: "Silence" },
  { id: "anatomy", label: "II", name: "Anatomy" },
  { id: "manufacturing", label: "III", name: "Manufacturing" },
  { id: "materials", label: "IV", name: "Materials" },
  { id: "intelligence", label: "V", name: "Intelligence" },
  { id: "build", label: "VI", name: "Build" },
  { id: "transform", label: "VII", name: "Transform" },
  { id: "reveal", label: "VIII", name: "Reveal" },
];

export default function ActProgress() {
  const [activeAct, setActiveAct] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scenes = document.querySelectorAll("[data-act-index]");
    if (!scenes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-act-index"));
            setActiveAct(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    scenes.forEach((scene) => observer.observe(scene));

    // Show after scrolling past Act 1
    const onScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-end gap-3"
        >
          {ACTS.map((act, i) => (
            <div key={act.id} className="flex items-center gap-2.5 group">
              <span
                className="font-body text-[7px] font-[300] tracking-[0.1em] uppercase transition-all duration-500"
                style={{
                  opacity: activeAct === i ? 0.7 : 0.15,
                  color: activeAct === i ? "#c45a2c" : "#8a8a8a",
                }}
              >
                {act.name}
              </span>
              <div className="relative flex items-center">
                <motion.div
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: activeAct === i ? 6 : 3,
                    height: activeAct === i ? 6 : 3,
                    backgroundColor: activeAct === i ? "#c45a2c" : "rgba(245,240,235,0.15)",
                  }}
                />
                {activeAct === i && (
                  <motion.div
                    layoutId="act-ring"
                    className="absolute inset-[-3px] rounded-full border border-ember/30"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
