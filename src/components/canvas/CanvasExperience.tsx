"use client";

import { useRef, useEffect, useState } from "react";

// ═══════════════════════════════════════════════════════════════
// CANVAS EXPERIENCE V3 — 16 beats. 800vh. Auto-progression.
// ═══════════════════════════════════════════════════════════════

const TOTAL_SCROLL = 800; // vh — ~8 viewports, ~60s auto-progression
const AUTO_SPEED = 1 / 60000; // progress per ms — full experience in 60s
const IDLE_TIMEOUT = 2500; // ms before auto-progression begins

// ─── BEAT DATA ──────────────────────────────────────────────

interface Beat {
  id: string;
  start: number;
  end: number;
  enter: number;
  hold: number;
  exit: number;
}

const BEATS: Beat[] = [
  // ACT I — THE AWAKENING (0.00–0.15)
  { id: "nothing",    start: 0.00, end: 0.03,  enter: 0,     hold: 0.03,  exit: 0     },
  { id: "spark",      start: 0.03, end: 0.07,  enter: 0.002, hold: 0.03,  exit: 0.01  },
  { id: "name",       start: 0.07, end: 0.15,  enter: 0.04,  hold: 0.02,  exit: 0.02  },

  // ACT II — THE MATERIALS (0.15–0.50)
  { id: "stone",      start: 0.15, end: 0.24,  enter: 0.03,  hold: 0.04,  exit: 0.02  },
  { id: "copper",     start: 0.24, end: 0.33,  enter: 0.03,  hold: 0.04,  exit: 0.02  },
  { id: "number",     start: 0.33, end: 0.40,  enter: 0.01,  hold: 0.04,  exit: 0.01  },
  { id: "hands",      start: 0.40, end: 0.50,  enter: 0.03,  hold: 0.04,  exit: 0.02  },

  // ACT III — THE KITCHEN (0.50–0.75)
  { id: "breath",     start: 0.50, end: 0.53,  enter: 0,     hold: 0.03,  exit: 0     },
  { id: "kitchen",    start: 0.53, end: 0.72,  enter: 0.04,  hold: 0.10,  exit: 0.04  },

  // ACT IV — THE INVITATION (0.72–1.00)
  { id: "shift",      start: 0.72, end: 0.82,  enter: 0.03,  hold: 0.05,  exit: 0.02  },
  { id: "truth",      start: 0.82, end: 0.90,  enter: 0.01,  hold: 0.05,  exit: 0.02  },
  { id: "climax",     start: 0.90, end: 0.96,  enter: 0.01,  hold: 0.03,  exit: 0.01  },
  { id: "close",      start: 0.96, end: 1.00,  enter: 0.01,  hold: 0.02,  exit: 0     },
];

// ─── EASING ─────────────────────────────────────────────────

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number): number {
  return t * t * t;
}

// ─── ENVELOPE ───────────────────────────────────────────────

function envelope(beat: Beat, p: number): number {
  if (p < beat.start || p > beat.end) return 0;
  const local = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const exitStart = 1 - beat.exit / (beat.end - beat.start);
  if (local < enterEnd) return easeOutCubic(local / enterEnd);
  if (local > exitStart) return 1 - easeInCubic((local - exitStart) / (1 - exitStart));
  return 1;
}

// ─── LIGHT SIZE ─────────────────────────────────────────────

function lightSize(p: number): number {
  if (p < 0.03) return 0;
  if (p < 0.07) return 30;
  if (p < 0.15) return 50;
  if (p < 0.24) return 80;
  if (p < 0.33) return 120;
  if (p < 0.40) return 160;
  if (p < 0.50) return 200;
  if (p < 0.72) return 350;
  if (p < 0.82) {
    const t = (p - 0.72) / 0.10;
    return 350 + t * (1200 - 350);
  }
  const t = (p - 0.82) / 0.18;
  return 1200 - t * (1200 - 60);
}

// ─── BACKGROUND + TEXT COLOR ────────────────────────────────

function bgColor(p: number): string {
  if (p < 0.72) return "#050505";
  const t = Math.min((p - 0.72) / 0.08, 1);
  const r = Math.round(5 + (245 - 5) * t);
  const g = Math.round(5 + (240 - 5) * t);
  const b = Math.round(5 + (235 - 5) * t);
  return `rgb(${r},${g},${b})`;
}

function textColor(p: number): string {
  if (p < 0.78) return "#f5f0eb";
  return "#0a0a0a";
}

// ─── CINEMATIC COLOR GRADING ────────────────────────────────

const GRADE = "saturate(0.82) sepia(0.10) contrast(1.08) brightness(0.92)";
const WARM_OVERLAY = "rgba(196,90,44,0.08)";
const DEEP_VIGNETTE = "radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.6) 100%)";

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function CanvasExperience() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const isAutoAdvancing = useRef(false);
  const userHasScrolled = useRef(false);

  // ─── SCROLL TRACKING ─────────────────────────────────
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

  // ─── AUTO-PROGRESSION ────────────────────────────────
  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - lastTime;
      lastTime = now;

      const timeSinceScroll = Date.now() - lastScrollTime.current;

      if (timeSinceScroll > IDLE_TIMEOUT && userHasScrolled.current) {
        // Auto-advance
        isAutoAdvancing.current = true;
        setProgress((prev) => {
          const next = prev + AUTO_SPEED * elapsed;
          return next >= 1 ? 1 : next;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const p = progress;
  const bg = bgColor(p);
  const tc = textColor(p);
  const ls = lightSize(p);

  return (
    <div className="relative" style={{ height: `${TOTAL_SCROLL}vh` }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: bg }}
      >
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
        <StoneBeat progress={p} />
        <CopperBeat progress={p} />
        <NumberBeat progress={p} />
        <HandsBeat progress={p} />
        <BreathBeat progress={p} />
        <KitchenBeat progress={p} />
        <ShiftBeat progress={p} />
        <TruthBeat progress={p} />
        <ClimaxBeat progress={p} />
        <CloseBeat progress={p} color={tc} />

        {/* ─── FILM GRAIN ─────────────────────────────── */}
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BEAT 01 — NOTHING (Curiosity)
// ═══════════════════════════════════════════════════════════════

function NothingBeat({ progress: p }: { progress: number }) {
  return null;
}

// ═══════════════════════════════════════════════════════════════
// BEAT 02 — SPARK (Wonder)
// ═══════════════════════════════════════════════════════════════

function SparkBeat({ progress: p }: { progress: number }) {
  return null;
}

// ═══════════════════════════════════════════════════════════════
// BEAT 03 — NAME (Warmth)
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// BEAT 04 — STONE (Weight)
// ═══════════════════════════════════════════════════════════════

function StoneBeat({ progress: p }: { progress: number }) {
  const beat = BEATS[3];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 8 : 0;
  const scale = 1.03 - localP * 0.03;

  return (
    <div className="absolute z-[3]" style={{
      left: "10%", top: "15%", width: "60%", height: "70%",
      opacity: vis, clipPath: "ellipse(55% 45% at 50% 50%)",
      filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
      willChange: "opacity, filter",
    }}>
      <img src="/images/marble-veins.jpg" alt="" className="h-full w-full object-cover" draggable={false}
        style={{ filter: GRADE, transform: `scale(${scale})` }} />
      <div className="absolute inset-0" style={{ background: WARM_OVERLAY, mixBlendMode: "overlay" }} />
      <div className="absolute inset-0" style={{ background: DEEP_VIGNETTE }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BEAT 05 — COPPER (Presence)
// ═══════════════════════════════════════════════════════════════

function CopperBeat({ progress: p }: { progress: number }) {
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
      transform: `translateX(${panX}%)`,
      willChange: "opacity, filter, transform",
    }}>
      <img src="/images/brass-detail.jpg" alt="" className="h-full w-full object-cover" draggable={false}
        style={{ filter: GRADE }} />
      <div className="absolute inset-0" style={{ background: WARM_OVERLAY, mixBlendMode: "overlay" }} />
      <div className="absolute inset-0" style={{ background: DEEP_VIGNETTE }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BEAT 06 — NUMBER (Mystery)
// ═══════════════════════════════════════════════════════════════

function NumberBeat({ progress: p }: { progress: number }) {
  const beat = BEATS[5];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 10 : 0;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <span style={{
        fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 100,
        fontSize: "clamp(6rem, 18vw, 14rem)", color: "#f5f0eb",
        letterSpacing: "0.15em", opacity: vis,
        filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
        willChange: "opacity, filter",
      }}>0.1</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BEAT 07 — HANDS (Intimacy)
// ═══════════════════════════════════════════════════════════════

function HandsBeat({ progress: p }: { progress: number }) {
  const beat = BEATS[6];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 8 : 0;
  const driftY = localP * -2;

  return (
    <div className="absolute z-[3]" style={{
      left: "20%", top: "50%", width: "60%", height: "45%",
      opacity: vis,
      filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
      willChange: "opacity, filter",
    }}>
      <img src="/images/artisan-hands-v2.jpg" alt="" className="h-full w-full object-cover" draggable={false}
        style={{ filter: GRADE, transform: `translateY(${driftY}%)` }} />
      <div className="absolute inset-0" style={{ background: WARM_OVERLAY, mixBlendMode: "overlay" }} />
      <div className="absolute inset-0" style={{ background: DEEP_VIGNETTE }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BEAT 08 — BREATH (Anticipation)
// ═══════════════════════════════════════════════════════════════

function BreathBeat({ progress: p }: { progress: number }) {
  return null;
}

// ═══════════════════════════════════════════════════════════════
// BEAT 09 — KITCHEN (Desire)
// ═══════════════════════════════════════════════════════════════

function KitchenBeat({ progress: p }: { progress: number }) {
  const beat = BEATS[8];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 8 : 0;
  const scale = 1.04 - localP * 0.04;

  return (
    <div className="absolute inset-0 z-[3]" style={{
      opacity: vis,
      filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
      willChange: "opacity, filter",
    }}>
      <img src="/images/dark-kitchen-v2.jpg" alt="" className="h-full w-full object-cover" draggable={false}
        style={{ transform: `scale(${scale})`, filter: GRADE }} />
      <div className="absolute inset-0" style={{ background: WARM_OVERLAY, mixBlendMode: "overlay" }} />
      <div className="absolute inset-0" style={{ background: DEEP_VIGNETTE }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BEAT 10 — SHIFT (Expansion)
// ═══════════════════════════════════════════════════════════════

function ShiftBeat({ progress: p }: { progress: number }) {
  return null;
}

// ═══════════════════════════════════════════════════════════════
// BEAT 11 — TRUTH (Conviction)
// ═══════════════════════════════════════════════════════════════

function TruthBeat({ progress: p }: { progress: number }) {
  const beat = BEATS[10];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 8 : 0;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="flex flex-col items-center gap-1" style={{ opacity: vis,
        filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>
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

// ═══════════════════════════════════════════════════════════════
// BEAT 12 — CLIMAX (Feeling)
// ═══════════════════════════════════════════════════════════════

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
          return (
            <span key={i} style={{
              fontFamily: '"Inter", system-ui, sans-serif', fontWeight: line.weight,
              fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0a0a0a",
              letterSpacing: "0.06em", lineHeight: line.weight === 900 ? 1.1 : 1.0,
              opacity: vis * lineVis,
              filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
              willChange: "opacity, filter",
            }}>{line.text}</span>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BEAT 13 — CLOSE (Completion)
// ═══════════════════════════════════════════════════════════════

function CloseBeat({ progress: p, color }: { progress: number; color: string }) {
  const beat = BEATS[12];
  const vis = envelope(beat, p);
  if (vis < 0.01) return null;

  const localP = (p - beat.start) / (beat.end - beat.start);
  const enterEnd = beat.enter / (beat.end - beat.start);
  const blur = localP < enterEnd ? (1 - easeOutCubic(localP / enterEnd)) * 6 : 0;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3"
      style={{ opacity: vis, filter: blur > 0.5 ? `blur(${blur}px)` : undefined }}>
      <span style={{
        fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 100,
        fontSize: "clamp(2rem, 5vw, 3rem)", color, letterSpacing: "0.18em",
      }}>Kitser</span>
      <span style={{
        fontFamily: '"Inter", system-ui, sans-serif', fontWeight: 300,
        fontSize: "clamp(0.7rem, 1vw, 0.85rem)", color,
        letterSpacing: "0.12em", opacity: 0.6,
      }}>No. 1, Nava India Road, Coimbatore — 641028</span>
    </div>
  );
}
