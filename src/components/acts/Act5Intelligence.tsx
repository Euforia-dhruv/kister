"use client";

import { useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";

/* ─── ACT 5: KITCHEN INTELLIGENCE ───────────────────────── */

interface System {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: string;
  connections: string[];
  details: {
    water?: string;
    electrical?: string;
    structural?: string;
    maintenance?: string;
  };
}

const SYSTEMS: System[] = [
  { id: "sink", label: "SINK", x: 62, y: 48, icon: "◎", connections: ["tap", "drain", "cabinet", "countertop"], details: { water: "BLANCO SILGRANIT — 80% granite composite", structural: "Undermount installation. Zero-gap seal." } },
  { id: "tap", label: "TAP", x: 66, y: 35, icon: "◈", connections: ["sink", "pipes", "water-supply"], details: { water: "BLANCO Culina — dual spray, 360° rotation", electrical: "Optional sensor activation" } },
  { id: "drain", label: "DRAIN", x: 58, y: 55, icon: "◉", connections: ["sink", "pipes"], details: { water: "Franke overflow system. Anti-odor trap." } },
  { id: "pipes", label: "PIPEWORK", x: 50, y: 60, icon: "◇", connections: ["tap", "drain", "water-supply"], details: { water: "Copper supply lines. PEX drainage." } },
  { id: "water-supply", label: "WATER SUPPLY", x: 42, y: 65, icon: "◆", connections: ["pipes", "tap"], details: { water: "Municipal supply + filtration system" } },
  { id: "countertop", label: "COUNTERTOP", x: 30, y: 42, icon: "▣", connections: ["cabinet", "sink", "backsplash"], details: { structural: "Dekton — ultra-compact surface. 12mm thickness" } },
  { id: "cabinet", label: "CABINET", x: 18, y: 35, icon: "▢", connections: ["countertop", "hinges", "drawers", "lighting"], details: { structural: "Scavolini DeLinea — handleless push-to-open" } },
  { id: "hinges", label: "HINGES", x: 12, y: 42, icon: "◎", connections: ["cabinet", "soft-close"], details: { structural: "Blum Clips top Blumotion — 80K cycle tested" } },
  { id: "soft-close", label: "SOFT-CLOSE", x: 8, y: 50, icon: "●", connections: ["hinges", "drawers"], details: { structural: "Integrated damper. Any position. Silent." } },
  { id: "drawers", label: "DRAWERS", x: 22, y: 55, icon: "▤", connections: ["cabinet", "soft-close"], details: { structural: "Blum LEGRABOX — 40kg dynamic load capacity" } },
  { id: "lighting", label: "LIGHTING", x: 25, y: 22, icon: "◐", connections: ["cabinet", "electrical"], details: { electrical: "LED 3000K — CRI 95+. Dimmable. Warm white." } },
  { id: "electrical", label: "ELECTRICAL", x: 35, y: 70, icon: "⚡", connections: ["lighting", "appliances"], details: { electrical: "Dedicated 20A circuits. Surge protection." } },
  { id: "appliances", label: "APPLIANCES", x: 50, y: 25, icon: "⬡", connections: ["electrical", "cabinet"], details: { electrical: "Miele Gen 7000. Bosch FlexInduction." } },
  { id: "backsplash", label: "BACKSPLASH", x: 38, y: 30, icon: "▥", connections: ["countertop"], details: { structural: "Dekton — heat resistant. Seamless." } },
];

interface Act5Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act5Intelligence({ scrollProgress, actStart, actEnd }: Act5Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const [selected, setSelected] = useState<string | null>(null);

  const contentOpacity = useTransform(progress, (v) => Math.max(0, (v - 0.05) / 0.15));
  const containerOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  const selectedSystem = selected ? SYSTEMS.find((s) => s.id === selected) : null;

  const connectedIds = useMemo(() => {
    if (!selected) return new Set<string>();
    const system = SYSTEMS.find((s) => s.id === selected);
    if (!system) return new Set<string>();
    return new Set([selected, ...system.connections]);
  }, [selected]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── Dark background ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(20,18,15,1) 0%, rgba(10,10,10,1) 100%)",
        }}
      />

      {/* ── Grid lines ── */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,240,235,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,240,235,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px)",
          }}
        />
      </div>

      {/* ── Connection lines ── */}
      <svg className="absolute inset-0 w-full h-full z-[5] pointer-events-none">
        {selected && SYSTEMS.map((system) => {
          if (!system.connections.includes(selected)) return null;
          const from = SYSTEMS.find((s) => s.id === selected);
          if (!from) return null;
          return (
            <motion.path
              key={`conn-${system.id}`}
              d={`M ${from.x}% ${from.y}% L ${system.x}% ${system.y}%`}
              stroke="rgba(196,90,44,0.3)"
              strokeWidth="1"
              strokeDasharray="6 4"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3] }}
              transition={{
                pathLength: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 2, repeat: Infinity },
              }}
            />
          );
        })}
      </svg>

      {/* ── System nodes ── */}
      <div className="absolute inset-0 z-[10]">
        {SYSTEMS.map((system) => {
          const isSelected = selected === system.id;
          const isConnected = connectedIds.has(system.id);
          const dimmed = selected && !isConnected;

          return (
            <motion.div
              key={system.id}
              className="absolute cursor-pointer"
              style={{
                left: `${system.x}%`,
                top: `${system.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                opacity: dimmed ? 0.15 : 1,
                scale: isSelected ? 1.2 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleSelect(system.id)}
            >
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                  isSelected
                    ? "border-ember bg-ember/10"
                    : isConnected
                      ? "border-ember/30 bg-ember/5"
                      : "border-linen/10 bg-void/50"
                }`}
              >
                <span className={`text-[10px] transition-colors duration-500 ${
                  isSelected ? "text-ember" : "text-linen/40"
                }`}>
                  {system.icon}
                </span>
              </div>

              <motion.span
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 font-body text-[0.45rem] font-[400] tracking-[0.15em] whitespace-nowrap"
                animate={{
                  color: isSelected ? "#c45a2c" : "rgba(245,240,235,0.3)",
                }}
              >
                {system.label}
              </motion.span>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-ember/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* ── Detail panel ── */}
      <AnimatePresence>
        {selectedSystem && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[30]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="backdrop-blur-[20px] bg-void/80 border-t border-linen/6 px-8 py-8 md:px-12">
              <div className="max-w-[1400px] mx-auto">
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <span className="font-body text-[0.5rem] font-[400] tracking-[0.2em] text-ember/60">
                      {selectedSystem.label}
                    </span>
                    <h3 className="font-display text-lg font-[200] text-linen mt-2">
                      System Overview
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-7 h-7 border border-linen/8 flex items-center justify-center text-linen/30 hover:text-linen/60 transition-all duration-500 shrink-0"
                  >
                    <span className="text-[10px]">×</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                  {Object.entries(selectedSystem.details).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-body text-[0.45rem] font-[400] tracking-[0.15em] text-smoke/30 uppercase">
                        {key}
                      </span>
                      <p className="font-body text-[11px] font-[300] leading-[1.6] text-linen/60 mt-1">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-linen/4">
                  <span className="font-body text-[0.45rem] font-[400] tracking-[0.12em] text-smoke/25">
                    CONNECTED TO
                  </span>
                  {selectedSystem.connections.map((connId) => {
                    const conn = SYSTEMS.find((s) => s.id === connId);
                    return conn ? (
                      <button
                        key={connId}
                        onClick={() => handleSelect(connId)}
                        className="font-body text-[0.5rem] font-[400] tracking-[0.1em] text-ember/50 hover:text-ember transition-colors"
                      >
                        {conn.label}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header content ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-[20] flex flex-col pointer-events-none"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
          opacity: contentOpacity,
        }}
      >
        <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60">
          INTELLIGENCE
        </span>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[200] leading-[0.94] tracking-[-0.02em] text-linen mt-3">
          {selected ? "Everything is connected." : "Click any system."}
        </h2>
        <p className="font-body text-[clamp(0.75rem,0.9vw,0.9rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[360px] mt-6">
          A kitchen is a machine. Every component connects to every other.
          Click to explore the system.
        </p>
      </motion.div>
    </motion.div>
  );
}
