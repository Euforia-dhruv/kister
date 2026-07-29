"use client";

import { useEffect, useRef, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
  scale?: boolean;
}

export default function Reveal({ children, className = "", delay = 0, blur = false, scale = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseClass = blur ? "reveal-blur" : scale ? "reveal-scale" : "reveal";

  return (
    <div
      ref={ref}
      className={`${baseClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
