"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/engine/gsap";

/* ─── HERO CANVAS — SCROLL-DRIVEN FRAME SEQUENCE ──────── */
/* Canvas-only rendering. No <img> elements.                */
/* GSAP ScrollTrigger pins and maps scroll → frame.         */
/* Progressive loading: first 20 eager, rest lazy.          */
/* Film grain, vignette, breathing, fade-to-black.          */

interface Manifest {
  frames: number;
  fps: number;
  width: number;
  height: number;
  duration: number;
  framePath: string;
  framePrefix: string;
  frameExt: string;
}

const IS_REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const manifestRef = useRef<Manifest | null>(null);
  const currentFrameRef = useRef(-1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);

  /* ── Draw frame to canvas ── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  /* ── Load frames progressively ── */
  const loadFrames = useCallback(async (manifest: Manifest) => {
    const { frames, framePath, framePrefix, frameExt } = manifest;
    const images: HTMLImageElement[] = new Array(frames);
    let loaded = 0;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          images[index] = img;
          loaded++;
          loadedCountRef.current = loaded;
          setProgress(Math.round((loaded / frames) * 100));
          resolve();
        };
        img.onerror = () => {
          loaded++;
          loadedCountRef.current = loaded;
          setProgress(Math.round((loaded / frames) * 100));
          resolve();
        };
        img.src = `${framePath}${framePrefix}${String(index + 1).padStart(4, "0")}${frameExt}`;
      });
    };

    // Phase 1: Load first 20 frames (eager)
    const eagerCount = Math.min(20, frames);
    await Promise.all(Array.from({ length: eagerCount }, (_, i) => loadImage(i)));

    // Draw first frame immediately
    if (images[0]) drawFrame(0);

    // Phase 2: Load remaining in batches of 10
    for (let i = eagerCount; i < frames; i += 10) {
      await Promise.all(
        Array.from({ length: Math.min(10, frames - i) }, (_, j) => loadImage(i + j))
      );
      await new Promise((r) => requestAnimationFrame(r));
    }

    framesRef.current = images;
  }, [drawFrame]);

  /* ── Initialize GSAP ScrollTrigger ── */
  useEffect(() => {
    let st: ScrollTrigger | null = null;
    let exitSt: ScrollTrigger | null = null;

    const init = async () => {
      const res = await fetch("/assets/hero/manifest.json");
      const manifest: Manifest = await res.json();
      manifestRef.current = manifest;

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Size canvas for retina
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = manifest.width * dpr;
      canvas.height = manifest.height * dpr;

      // Load all frames
      await loadFrames(manifest);

      // Smooth transition from loader to first frame
      setIsLoading(false);
      requestAnimationFrame(() => setIsRevealed(true));

      // Draw first frame
      drawFrame(0);

      // If reduced motion, skip to end state
      if (IS_REDUCED_MOTION) {
        const fade = fadeRef.current;
        if (fade) fade.style.opacity = "1";
        return;
      }

      // Set up ScrollTrigger
      const container = containerRef.current;
      const fade = fadeRef.current;
      const text = textRef.current;
      if (!container || !fade) return;

      // Main: pin canvas and map scroll → frame
      st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: canvas,
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            Math.floor(self.progress * manifest.frames),
            manifest.frames - 1
          );

          // Draw frame if changed
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
          }

          // Typography: fade in 0-15%, hold 15-60%, fade out 60-75%
          if (text) {
            if (self.progress < 0.15) {
              const t = self.progress / 0.15;
              text.style.opacity = String(t);
              text.style.transform = `translateY(${(1 - t) * 20}px)`;
            } else if (self.progress < 0.6) {
              text.style.opacity = "1";
              text.style.transform = "translateY(0)";
            } else if (self.progress < 0.75) {
              const t = 1 - (self.progress - 0.6) / 0.15;
              text.style.opacity = String(t);
              text.style.transform = `translateY(${(1 - t) * -10}px)`;
            } else {
              text.style.opacity = "0";
            }
          }

          // Fade to black in last 8% of scroll
          if (self.progress > 0.92) {
            const fadeProgress = (self.progress - 0.92) / 0.08;
            fade.style.opacity = String(Math.min(fadeProgress, 1));
          } else {
            fade.style.opacity = "0";
          }
        },
      });

      // Exit: dismiss overlay when hero scrolls out of view
      exitSt = ScrollTrigger.create({
        trigger: container,
        start: "bottom top",
        onEnterBack: () => { fade.style.opacity = "1"; },
        onLeave: () => { fade.style.opacity = "0"; },
      });
    };

    init();

    return () => {
      if (st) st.kill();
      if (exitSt) exitSt.kill();
    };
  }, [loadFrames, drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative bg-void"
      style={{ height: "300vh" }}
    >
      {/* Canvas — pinned during scroll */}
      <canvas
        ref={canvasRef}
        className="w-full h-screen object-cover"
        style={{ background: "#0a0a0a" }}
      />

      {/* ── Cinematic overlays (CSS only, over canvas) ── */}
      <div className="fixed inset-0 z-[9989] pointer-events-none">
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.45) 100%)",
          }}
        />
        {/* Subtle warm bloom — very low opacity */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, rgba(196,90,44,0.03) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ── Typography overlay ── */}
      <div
        ref={textRef}
        className="fixed inset-0 z-[9988] flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        {/* Level 1: Brand label */}
        <span
          className="text-linen/40"
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: "clamp(0.75rem, 1.1vw, 1rem)",
            fontWeight: 400,
            letterSpacing: "0.3em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          KITSER
        </span>

        {/* Spacer: label → headline */}
        <div style={{ height: "clamp(28px, 4vw, 48px)" }} />

        {/* Level 2: Main headline */}
        <h1
          className="text-center text-linen/90"
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.02,
            maxWidth: "750px",
          }}
        >
          Crafted Kitchens.<br />Designed Around Living.
        </h1>

        {/* Spacer: headline → supporting copy */}
        <div style={{ height: "clamp(24px, 3.5vw, 40px)" }} />

        {/* Level 3: Supporting copy */}
        <p
          className="text-center text-linen/45"
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: "clamp(0.78rem, 1vw, 0.95rem)",
            fontWeight: 300,
            letterSpacing: "0.08em",
            lineHeight: 1.85,
            maxWidth: "520px",
          }}
        >
          Italian precision, exceptional materials,<br />and timeless craftsmanship.
        </p>

        {/* Spacer: copy → scroll indicator */}
        <div style={{ height: "clamp(40px, 6vw, 64px)" }} />
      </div>

      {/* Fade-to-black overlay at end */}
      <div
        ref={fadeRef}
        className="fixed inset-0 z-[9990] pointer-events-none bg-void"
        style={{ opacity: 0 }}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void">
          <div className="text-center">
            <h1
              className="text-linen/80"
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "0.2em",
                lineHeight: 1,
              }}
            >
              KITSER
            </h1>
            <span
              className="text-ember/40 mt-4 block"
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: "0.65rem",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              ALL ABOUT KITCHENS
            </span>
          </div>

          <div className="mt-14 w-[clamp(200px,30vw,300px)]">
            <div className="h-[1px] bg-linen/[0.04] relative overflow-hidden">
              <div
                className="h-full bg-ember/50"
                style={{
                  width: `${progress}%`,
                  transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
            <div className="flex justify-between mt-4">
              <span
                className="text-linen/15"
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: "0.55rem",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                PREPARING EXPERIENCE
              </span>
              <span
                className="text-linen/15"
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: "0.55rem",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                }}
              >
                {progress}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Smooth reveal fade */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-none bg-void transition-opacity duration-1000"
        style={{ opacity: isRevealed ? 0 : 1 }}
      />
    </div>
  );
}
