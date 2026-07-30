"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

// ═══════════════════════════════════════════════════════════════
// CANVAS EXPERIENCE V5 — Cinematic intro with Ken Burns,
// dust particles, light leak, refined transitions.
// ═══════════════════════════════════════════════════════════════

const TOTAL_SCROLL = 600;
const AUTO_SPEED = 1 / 65000;
const IDLE_TIMEOUT = 2500;

interface Beat {
  id: string;
  start: number;
  end: number;
  enter: number;
  hold: number;
  exit: number;
}

const BEATS: Beat[] = [
  { id: "nothing",    start: 0.00, end: 0.03,  enter: 0,     hold: 0.03,  exit: 0     },
  { id: "spark",      start: 0.03, end: 0.08,  enter: 0.002, hold: 0.04,  exit: 0.01  },
  { id: "name",       start: 0.08, end: 0.18,  enter: 0.05,  hold: 0.03,  exit: 0.02  },
  { id: "stone",      start: 0.18, end: 0.30,  enter: 0.04,  hold: 0.06,  exit: 0.02  },
  { id: "copper",     start: 0.30, end: 0.42,  enter: 0.04,  hold: 0.06,  exit: 0.02  },
  { id: "number",     start: 0.42, end: 0.50,  enter: 0.02,  hold: 0.04,  exit: 0.02  },
  { id: "hands",      start: 0.50, end: 0.62,  enter: 0.04,  hold: 0.06,  exit: 0.02  },
  { id: "breath",     start: 0.62, end: 0.66,  enter: 0,     hold: 0.04,  exit: 0     },
  { id: "kitchen",    start: 0.66, end: 0.80,  enter: 0.05,  hold: 0.08,  exit: 0.02  },
  { id: "shift",      start: 0.80, end: 0.88,  enter: 0.03,  hold: 0.04,  exit: 0.01  },
  { id: "truth",      start: 0.88, end: 0.94,  enter: 0.01,  hold: 0.04,  exit: 0.01  },
  { id: "climax",     start: 0.94, end: 0.98,  enter: 0.01,  hold: 0.02,  exit: 0.005 },
  { id: "close",      start: 0.98, end: 1.00,  enter: 0.005, hold: 0.015, exit: 0     },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number): number {
  return t * t * t;
}

function envelope(beat: Beat, p: number): number {
  if (p < beat.start || p > beat.end) return 0;
  const local = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const exitStart = 1 - beat.exit / (beat.end - beat.start);
  if (local < enterEnd) return easeOutCubic(local / enterEnd);
  if (local > exitStart) return 1 - easeInCubic((local - exitStart) / (1 - exitStart));
  return 1;
}

function lightSize(p: number): number {
  if (p < 0.03) return 0;
  if (p < 0.08) return 30;
  if (p < 0.18) return 50;
  if (p < 0.30) return 80;
  if (p < 0.42) return 120;
  if (p < 0.50) return 160;
  if (p < 0.62) return 200;
  if (p < 0.80) return 350;
  if (p < 0.88) {
    const t = (p - 0.80) / 0.08;
    return 350 + t * (1200 - 350);
  }
  const t = (p - 0.88) / 0.12;
  return 1200 - t * (1200 - 60);
}

function bgColor(p: number): string {
  if (p < 0.80) return "#050505";
  const t = Math.min((p - 0.80) / 0.06, 1);
  const r = Math.round(5 + (245 - 5) * t);
  const g = Math.round(5 + (240 - 5) * t);
  const b = Math.round(5 + (235 - 5) * t);
  return `rgb(${r},${g},${b})`;
}

function textColor(p: number): string {
  if (p < 0.85) return "#f5f0eb";
  return "#0a0a0a";
}

function beatLabel(p: number): string {
  for (let i = BEATS.length - 1; i >= 0; i--) {
    if (p >= BEATS[i].start) return BEATS[i].id.toUpperCase();
  }
  return "";
}

const GRADE = "saturate(0.82) sepia(0.10) contrast(1.08) brightness(0.92)";
const WARM_OVERLAY = "rgba(196,90,44,0.08)";
const DEEP_VIGNETTE = "radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.6) 100%)";

// ─── DUST PARTICLES ──────────────────────────────────────────

function DustCanvas({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (opacity <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }

    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -Math.random() * 0.1 - 0.02,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,90,44,${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [opacity > 0]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[4] pointer-events-none"
      style={{ opacity }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function CanvasExperience() {
  const [progress, setProgress] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const rafRef = useRef(0);
  const lastScrollTime = useRef(0);
  const isAutoAdvancing = useRef(false);
  const userHasScrolled = useRef(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
          ticking = false;
        });
        ticking = true;
      }
      lastScrollTime.current = Date.now();
      isAutoAdvancing.current = false;
      userHasScrolled.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (skipped) return;
    let lastTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - lastTime;
      lastTime = now;
      const timeSinceScroll = Date.now() - lastScrollTime.current;
      if (timeSinceScroll > IDLE_TIMEOUT && userHasScrolled.current) {
        isAutoAdvancing.current = true;
        setProgress((prev) => {
          const next = prev + AUTO_SPEED * elapsed;
          return next >= 1 ? 1 : next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [skipped]);

  const skipToEnd = useCallback(() => {
    setSkipped(true);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: h, behavior: "instant" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (skipped) return;
      const step = 0.05;
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setProgress((prev) => Math.min(prev + step, 1));
        userHasScrolled.current = true;
        lastScrollTime.current = Date.now();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setProgress((prev) => Math.max(prev - step, 0));
        userHasScrolled.current = true;
        lastScrollTime.current = Date.now();
      } else if (e.key === "Escape") {
        skipToEnd();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skipped, skipToEnd]);

  const p = skipped ? 1 : progress;
  const bg = bgColor(p);
  const tc = textColor(p);
  const ls = lightSize(p);

  // Ken Burns zoom for textures
  const kenBurnsScale = (base: number, range: number) => base + p * range;

  return (
    <div className="relative" style={{ height: `${TOTAL_SCROLL}vh` }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {/* ─── LIGHT LEAK ───────────────────────────────── */}
        <div
          className="absolute z-[1] pointer-events-none"
          style={{
            top: "-20%",
            right: "-10%",
            width: "60%",
            height: "140%",
            background: `radial-gradient(ellipse at 70% 30%, rgba(196,90,44,${0.03 + p * 0.04}) 0%, transparent 60%)`,
            transform: `rotate(${p * 15}deg)`,
            filter: "blur(60px)",
          }}
        />

        {/* ─── LIGHT POINT ──────────────────────────────── */}
        {ls > 0 && (
          <div
            className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${ls}px`,
              height: `${ls}px`,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(196,90,44,0.35) 0%, rgba(196,90,44,0.12) 40%, transparent 70%)`,
              filter: `blur(${2 + ls * 0.05}px)`,
            }}
          />
        )}

        {/* ─── BEATS ────────────────────────────────────── */}
        <NothingBeat progress={p} />
        <SparkBeat progress={p} />
        <NameBeat progress={p} />
        <StoneBeat progress={p} scale={kenBurnsScale(1.04, -0.04)} />
        <CopperBeat progress={p} scale={kenBurnsScale(1.03, -0.03)} />
        <NumberBeat progress={p} />
        <HandsBeat progress={p} scale={kenBurnsScale(1.03, -0.02)} />
        <BreathBeat progress={p} />
        <KitchenBeat progress={p} scale={kenBurnsScale(1.05, -0.05)} />
        <ShiftBeat progress={p} />
        <TruthBeat progress={p} />
        <ClimaxBeat progress={p} />
        <CloseBeat progress={p} color={tc} />

        {/* ─── DUST PARTICLES ─────────────────────────── */}
        <DustCanvas opacity={Math.min(p * 3, 0.6) * (p < 0.9 ? 1 : (1 - p) * 10)} />

        {/* ─── VIGNETTE ──────────────────────────────── */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,${0.3 + p * 0.2}) 100%)`,
          }}
        />

        {/* ─── FILM GRAIN ─────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-[45] opacity-[0.035]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }} />

        {/* ─── SCROLL INDICATOR ──────────────────────── */}
        <div className="absolute bottom-10 left-1/2 z-[40] -translate-x-1/2 flex flex-col items-center gap-4">
          <motion.span
            className="font-body text-[0.55rem] font-[300] tracking-[0.25em] uppercase"
            style={{ color: `rgba(245,240,235,${0.25 + Math.sin(p * Math.PI) * 0.15})` }}
          >
            {beatLabel(p)}
          </motion.span>
          <div className="w-32 h-[1px] bg-linen/8 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${p * 100}%`,
                background: "linear-gradient(90deg, rgba(196,90,44,0.2) 0%, rgba(196,90,44,0.8) 100%)",
              }}
            />
          </div>
          <motion.div
            className="w-[1px] h-6 bg-linen/20"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>

        {/* ─── SKIP BUTTON ────────────────────────────── */}
        <AnimatePresence>
          {!skipped && p < 0.95 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              onClick={skipToEnd}
              className="absolute bottom-10 right-8 z-[40] font-body text-[0.6rem] font-[300] tracking-[0.18em] text-linen/25 transition-colors duration-500 hover:text-linen/60 border border-linen/8 px-5 py-2.5 hover:border-linen/20 backdrop-blur-sm"
            >
              SKIP INTRO
            </motion.button>
          )}
        </AnimatePresence>

        {/* ─── NAVIGATION FADE-IN (appears after intro) ── */}
        <AnimatePresence>
          {p > 0.92 && !skipped && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 z-[42] flex items-center justify-between px-6 py-4 md:px-12"
            >
              <span className="font-display text-sm font-[100] tracking-[0.2em] text-linen/60">
                KITSER
              </span>
              <div className="flex items-center gap-8">
                {["Collections", "Brands", "Showroom", "Contact"].map((label) => (
                  <span
                    key={label}
                    className="font-body text-[0.65rem] font-[300] tracking-[0.12em] text-linen/30 hover:text-linen/60 transition-colors duration-300 cursor-pointer"
                  >
                    {label.toUpperCase()}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BEATS
// ═══════════════════════════════════════════════════════════════

function NothingBeat({ progress: _p }: { progress: number }) {
  return null;
}

function SparkBeat({ progress: _p }: { progress: number }) {
  return null;
}

function NameBeat({ progress: p }: { progress: number }) {
  const beat = BEATS[2];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const letters = ["K", "I", "T", "S", "E", "R"];
  const letterDur = 0.006;
  const gapDur = 0.003;
  const totalBlock = letters.length * letterDur + (letters.length - 1) * gapDur;
  const enterEnd = beat.enter / (beat.end - beat.start);
  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterP = Math.min(localP / enterEnd, 1);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="flex gap-[0.3em]" style={{ opacity: vis }}>
        {letters.map((letter, i) => {
          const letterStart = (i * (letterDur + gapDur)) / totalBlock;
          const letterProgress = Math.max(0, Math.min((enterP - letterStart) / (letterDur / totalBlock), 1));
          const blur = (1 - easeOutCubic(letterProgress)) * 10;
          const yOffset = (1 - easeOutCubic(letterProgress)) * 15;
          return (
            <span
              key={i}
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontWeight: 100,
                fontSize: "clamp(4rem, 14vw, 11rem)",
                color: "#f5f0eb",
                letterSpacing: "0.3em",
                lineHeight: 0.92,
                filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
                transform: `translateY(${yOffset}px)`,
                display: "inline-block",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function StoneBeat({ progress: p, scale }: { progress: number; scale: number }) {
  const beat = BEATS[3];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 8 : 0;
  const panX = localP * -2;

  return (
    <div className="absolute z-[3]" style={{
      left: "10%", top: "15%", width: "60%", height: "70%",
      opacity: vis, clipPath: "ellipse(55% 45% at 50% 50%)",
      filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
    }}>
      <Image src="/images/textures/marble.jpg" alt="" fill className="object-cover" draggable={false} unoptimized
        style={{ filter: GRADE, transform: `scale(${scale}) translateX(${panX}%)` }} sizes="60vw" />
      <div className="absolute inset-0" style={{ background: WARM_OVERLAY, mixBlendMode: "overlay" }} />
      <div className="absolute inset-0" style={{ background: DEEP_VIGNETTE }} />
    </div>
  );
}

function CopperBeat({ progress: p, scale }: { progress: number; scale: number }) {
  const beat = BEATS[4];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 8 : 0;
  const panX = localP * -3;

  return (
    <div className="absolute z-[3]" style={{
      left: "55%", top: "10%", width: "45%", height: "80%",
      opacity: vis, clipPath: "ellipse(42% 55% at 65% 50%)",
      filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
    }}>
      <Image src="/images/textures/brass.jpg" alt="" fill className="object-cover" draggable={false} unoptimized
        style={{ filter: GRADE, transform: `scale(${scale}) translateX(${panX}%)` }} sizes="45vw" />
      <div className="absolute inset-0" style={{ background: WARM_OVERLAY, mixBlendMode: "overlay" }} />
      <div className="absolute inset-0" style={{ background: DEEP_VIGNETTE }} />
    </div>
  );
}

function NumberBeat({ progress: p }: { progress: number }) {
  const beat = BEATS[5];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 10 : 0;
  const yOffset = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 20 : 0;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <span style={{
        fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 100,
        fontSize: "clamp(6rem, 18vw, 14rem)", color: "#f5f0eb",
        letterSpacing: "0.15em", opacity: vis,
        filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
        transform: `translateY(${yOffset}px)`,
      }}>0.1</span>
    </div>
  );
}

function HandsBeat({ progress: p, scale }: { progress: number; scale: number }) {
  const beat = BEATS[6];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 8 : 0;

  return (
    <div className="absolute z-[3]" style={{
      left: "20%", top: "50%", width: "60%", height: "45%",
      opacity: vis,
      filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
    }}>
      <Image src="/images/textures/artisan.jpg" alt="" fill className="object-cover" draggable={false} unoptimized
        style={{ filter: GRADE, transform: `scale(${scale})` }} sizes="60vw" />
      <div className="absolute inset-0" style={{ background: WARM_OVERLAY, mixBlendMode: "overlay" }} />
      <div className="absolute inset-0" style={{ background: DEEP_VIGNETTE }} />
    </div>
  );
}

function BreathBeat({ progress: _p }: { progress: number }) {
  return null;
}

function KitchenBeat({ progress: p, scale }: { progress: number; scale: number }) {
  const beat = BEATS[8];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 8 : 0;

  return (
    <div className="absolute inset-0 z-[3]" style={{
      opacity: vis,
      filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
    }}>
      <Image src="/images/textures/dark-surface.jpg" alt="" fill className="object-cover" draggable={false} unoptimized
        style={{ transform: `scale(${scale})`, filter: GRADE }} sizes="100vw" />
      <div className="absolute inset-0" style={{ background: WARM_OVERLAY, mixBlendMode: "overlay" }} />
      <div className="absolute inset-0" style={{ background: DEEP_VIGNETTE }} />
    </div>
  );
}

function ShiftBeat({ progress: _p }: { progress: number }) {
  return null;
}

function TruthBeat({ progress: p }: { progress: number }) {
  const beat = BEATS[10];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-1" style={{ opacity: vis }}>
        <span style={{
          fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 100,
          fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0a0a0a",
          letterSpacing: "0.06em", lineHeight: 1.0,
        }}>A KITCHEN</span>
        <span style={{
          fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 900,
          fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0a0a0a",
          letterSpacing: "0.06em", lineHeight: 1.1,
        }}>IS NOT FURNITURE.</span>
      </div>
    </div>
  );
}

function ClimaxBeat({ progress: p }: { progress: number }) {
  const beat = BEATS[11];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);

  const lines = [
    { text: "THE KITCHEN", weight: 100, delay: 0 },
    { text: "IS WHERE", weight: 100, delay: 0.25 },
    { text: "LIFE HAPPENS.", weight: 900, delay: 0.5 },
  ];

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        {lines.map((line, i) => {
          const lineStart = line.delay * 0.5;
          const lineProgress = Math.max(0, Math.min((localP - lineStart) / 0.2, 1));
          const blur = lineProgress < 1 ? (1 - easeOutCubic(lineProgress)) * 8 : 0;
          const lineVis = Math.min(lineProgress / 0.15, 1);
          const yOffset = (1 - easeOutCubic(Math.min(lineProgress, 1))) * 12;
          return (
            <span key={i} style={{
              fontFamily: '"Inter", system-ui, sans-serif', fontWeight: line.weight,
              fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0a0a0a",
              letterSpacing: "0.06em", lineHeight: line.weight === 900 ? 1.1 : 1.0,
              opacity: vis * lineVis,
              filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
              transform: `translateY(${yOffset}px)`,
            }}>{line.text}</span>
          );
        })}
      </div>
    </div>
  );
}

function CloseBeat({ progress: p, color }: { progress: number; color: string }) {
  const beat = BEATS[12];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 6 : 0;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4"
      style={{ opacity: vis, filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>
      <span style={{
        fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 100,
        fontSize: "clamp(2rem, 5vw, 3rem)", color, letterSpacing: "0.18em",
      }}>Kitser</span>
      <span style={{
        fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 300,
        fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", color,
        letterSpacing: "0.12em", opacity: 0.5,
      }}>No. 1, Nava India Road, Coimbatore — 641028</span>
    </div>
  );
}
