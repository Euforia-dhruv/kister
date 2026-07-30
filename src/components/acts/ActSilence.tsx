"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

// ACT 1: SILENCE
// A stainless steel panel slowly separates, revealing wood, stone, glass,
// hinges, lighting, hardware floating in space.

const MATERIALS = [
  { name: "WALNUT", color: "#5a3825", x: 15, y: 30, rot: -5, size: 90 },
  { name: "QUARTZ", color: "#d4cfc8", x: 70, y: 25, rot: 3, size: 100 },
  { name: "GLASS", color: "rgba(180,210,220,0.15)", x: 40, y: 60, rot: -2, size: 80 },
  { name: "BRASS", color: "#b87333", x: 80, y: 55, rot: 7, size: 70 },
  { name: "STEEL", color: "#8a8a8a", x: 25, y: 70, rot: -8, size: 85 },
  { name: "STONE", color: "#3d3d3d", x: 55, y: 40, rot: 4, size: 95 },
];

function FloatingMaterial({
  mat,
  index,
  progress,
  materialOpacity,
}: {
  mat: (typeof MATERIALS)[number];
  index: number;
  progress: MotionValue<number>;
  materialOpacity: MotionValue<number>;
}) {
  const delay = index * 0.02;
  const floatY = useTransform(progress, [0.3, 0.8], [20, -20]);
  const itemScale = useTransform(progress, [0.25 + delay, 0.5 + delay], [0.6, 1]);
  const itemOpacity = useTransform(progress, [0.25 + delay, 0.4 + delay], [0, 1]);
  const rotate = useTransform(progress, [0.2, 0.8], [mat.rot * 2, mat.rot]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${mat.x}%`,
        top: `${mat.y}%`,
        width: mat.size,
        height: mat.size,
        y: floatY,
        scale: itemScale,
        opacity: itemOpacity,
        rotate,
      }}
    >
      <div
        className="w-full h-full rounded-sm"
        style={{
          background: mat.name === "GLASS"
            ? `linear-gradient(135deg, ${mat.color}, rgba(255,255,255,0.05))`
            : `linear-gradient(145deg, ${mat.color}, ${mat.color}dd)`,
          boxShadow: mat.name === "BRASS"
            ? "0 20px 60px rgba(184,115,51,0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
            : mat.name === "GLASS"
            ? "0 20px 60px rgba(100,150,170,0.08), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          border: mat.name === "GLASS" ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      />
      <motion.span
        className="absolute -bottom-6 left-0 right-0 text-center font-body text-[8px] font-[300] tracking-[0.2em] text-linen/20 uppercase"
        style={{ opacity: materialOpacity }}
      >
        {mat.name}
      </motion.span>
    </motion.div>
  );
}

export default function ActSilence({ progress }: { progress: MotionValue<number> }) {
  const panelLeftX = useTransform(progress, [0.05, 0.35], ["0%", "-55%"]);
  const panelRightX = useTransform(progress, [0.05, 0.35], ["0%", "55%"]);
  const panelLeftRot = useTransform(progress, [0.05, 0.35], [0, -3]);
  const panelRightRot = useTransform(progress, [0.05, 0.35], [0, 3]);
  const panelOpacity = useTransform(progress, [0.35, 0.5], [1, 0]);
  const seamOpacity = useTransform(progress, [0, 0.08], [0.6, 0]);
  const materialOpacity = useTransform(progress, [0.25, 0.45], [0, 1]);

  return (
    <div className="relative w-full h-full bg-void">
      {/* Ambient light */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(196,90,44,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Floating materials behind the panel */}
      <motion.div className="absolute inset-0 z-[2]" style={{ opacity: materialOpacity }}>
        {MATERIALS.map((mat, i) => (
          <FloatingMaterial
            key={mat.name}
            mat={mat}
            index={i}
            progress={progress}
            materialOpacity={materialOpacity}
          />
        ))}
      </motion.div>

      {/* Left metallic panel */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full z-[10]"
        style={{
          x: panelLeftX,
          rotateY: panelLeftRot,
          opacity: panelOpacity,
          transformOrigin: "right center",
        }}
      >
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 20%, #1e1e1e 40%, #252525 60%, #1c1c1c 80%, #222222 100%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)",
            }}
          />
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, transparent 30%, rgba(255,255,255,0.03) 45%, transparent 55%)",
            }}
          />
        </div>
      </motion.div>

      {/* Right metallic panel */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full z-[10]"
        style={{
          x: panelRightX,
          rotateY: panelRightRot,
          opacity: panelOpacity,
          transformOrigin: "left center",
        }}
      >
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(225deg, #1a1a1a 0%, #282828 20%, #1d1d1d 40%, #242424 60%, #1b1b1b 80%, #212121 100%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)",
            }}
          />
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(200deg, transparent 30%, rgba(255,255,255,0.03) 45%, transparent 55%)",
            }}
          />
        </div>
      </motion.div>

      {/* Center seam / light slit */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-[15] pointer-events-none"
        style={{ opacity: seamOpacity }}
      >
        <div className="w-full h-full"
          style={{
            background: "linear-gradient(180deg, transparent 10%, rgba(196,90,44,0.3) 30%, rgba(245,240,235,0.15) 50%, rgba(196,90,44,0.3) 70%, transparent 90%)",
            boxShadow: "0 0 30px rgba(196,90,44,0.1), 0 0 60px rgba(196,90,44,0.05)",
          }}
        />
      </motion.div>

      {/* KITSER wordmark — appears after split */}
      <motion.div
        className="absolute inset-0 z-[20] flex items-center justify-center pointer-events-none"
        style={{
          opacity: useTransform(progress, [0.4, 0.55], [0, 1]),
        }}
      >
        <div className="text-center">
          <span className="block font-display text-[0.55rem] font-[400] tracking-[0.4em] text-ember/50 mb-4 uppercase">
            Est. 1989
          </span>
          <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-[100] tracking-[0.25em] text-linen/90 leading-none">
            KITSER
          </h1>
          <span className="block mt-4 font-body text-[0.65rem] font-[300] tracking-[0.15em] text-smoke/40">
            CURATED KITCHEN ESSENTIALS
          </span>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-3"
        style={{
          opacity: useTransform(progress, [0, 0.08, 0.15], [0.5, 0.5, 0]),
        }}
      >
        <span className="font-body text-[0.5rem] font-[300] tracking-[0.25em] text-linen/20 uppercase">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-5 bg-linen/15"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </div>
  );
}
