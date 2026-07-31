"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/engine/gsap";

/* ─── HERO CANVAS — SCROLL-DRIVEN FRAME SEQUENCE ──────── */
/* Canvas-only rendering. No <img> elements.                */
/* GSAP ScrollTrigger pins and maps scroll → frame.         */
/* Progressive loading: first 20 eager, rest lazy.          */
/* Fade-to-black at end, then reveals Act 1.                */

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

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const manifestRef = useRef<Manifest | null>(null);
  const currentFrameRef = useRef(-1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);

      // Draw first frame
      drawFrame(0);

      // Set up ScrollTrigger
      const container = containerRef.current;
      const fade = fadeRef.current;
      if (!container || !fade) return;

      // Main: pin canvas and map scroll → frame
      st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: canvas,
        scrub: 0.3,
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
            <h1 className="font-display text-[clamp(2rem,6vw,4rem)] font-[100] tracking-[0.2em] text-linen/80">
              KITSER
            </h1>
            <span className="font-body text-[0.6rem] font-[300] tracking-[0.3em] text-ember/50 mt-2 block">
              ALL ABOUT KITCHENS
            </span>
          </div>

          <div className="mt-12 w-[clamp(200px,30vw,300px)]">
            <div className="h-[1px] bg-linen/5 relative overflow-hidden">
              <div
                className="h-full bg-ember/60"
                style={{
                  width: `${progress}%`,
                  transition: "width 0.3s ease-out",
                }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="font-body text-[0.45rem] font-[300] tracking-[0.15em] text-linen/20">
                LOADING
              </span>
              <span className="font-body text-[0.45rem] font-[300] tracking-[0.15em] text-linen/20">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
