"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

// ACT 7: BEFORE / AFTER
// Not a slider. The room transforms in 3D.
// Scroll makes old room morph into new kitchen.

export default function ActBeforeAfter({ progress }: { progress: MotionValue<number> }) {
  const titleOpacity = useTransform(progress, [0.02, 0.1], [0, 1]);

  // Morph progress: 0 = empty room, 1 = finished kitchen
  const morphProgress = useTransform(progress, [0.1, 0.8], [0, 1]);

  // Wall color transition
  const wallBrightness = useTransform(morphProgress, [0, 0.3, 1], [0.35, 0.4, 0.85]);

  // Cabinet emergence
  const cabinetOpacity = useTransform(morphProgress, [0.15, 0.4], [0, 1]);
  const cabinetY = useTransform(morphProgress, [0.15, 0.4], [30, 0]);

  // Countertop
  const countertopOpacity = useTransform(morphProgress, [0.3, 0.5], [0, 1]);
  const countertopScale = useTransform(morphProgress, [0.3, 0.5], [0.95, 1]);

  // Lighting
  const lightIntensity = useTransform(morphProgress, [0.4, 0.7], [0, 1]);
  const lightGlow = useTransform(morphProgress, [0.4, 0.7], [0, 0.3]);

  // Appliances
  const applianceOpacity = useTransform(morphProgress, [0.5, 0.7], [0, 1]);

  // Accessories
  const accessoryOpacity = useTransform(morphProgress, [0.65, 0.85], [0, 1]);

  // Final polish
  const polishOverlay = useTransform(morphProgress, [0.85, 1], [0, 0.05]);

  // Progress percentage
  const percentText = useTransform(morphProgress, (p) => `${Math.round(p * 100)}%`);

  return (
    <div className="relative w-full h-full bg-void overflow-hidden">
      {/* Act header */}
      <motion.div
        className="absolute top-8 left-8 md:left-12 z-[30]"
        style={{ opacity: titleOpacity }}
      >
        <span className="editorial-caption">ACT VII</span>
        <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-[200] tracking-[-0.01em] text-linen/80 mt-2">
          Transformation
        </h2>
        <p className="font-body text-[11px] font-[300] text-smoke/40 mt-2 max-w-xs">
          Scroll to transform. Watch the room come alive.
        </p>
      </motion.div>

      {/* Room container */}
      <div className="absolute inset-0 flex items-center justify-center z-[10]">
        <div className="relative w-[min(85vw,900px)] h-[min(65vh,550px)]">
          {/* Empty room base (before) */}
          <div className="absolute inset-0 rounded-sm overflow-hidden">
            {/* Walls */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: useTransform(wallBrightness, (b) =>
                  `linear-gradient(180deg, rgb(${Math.round(60 * b)},${Math.round(55 * b)},${Math.round(50 * b)}) 0%, rgb(${Math.round(35 * b)},${Math.round(32 * b)},${Math.round(28 * b)}) 100%)`
                ),
              }}
            />

            {/* Floor */}
            <div className="absolute bottom-0 left-0 right-0 h-[30%]"
              style={{
                background: "linear-gradient(180deg, #2a2520 0%, #1a1815 100%)",
              }}
            />

            {/* Grid lines (before state) */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: useTransform(morphProgress, [0, 0.3], [0.06, 0]),
                backgroundImage: "linear-gradient(rgba(245,240,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,235,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Cabinet system — emerges */}
            <motion.div
              className="absolute bottom-[30%] left-[5%] right-[5%] h-[45%]"
              style={{ opacity: cabinetOpacity, y: cabinetY }}
            >
              {/* Upper cabinets */}
              <div className="absolute top-0 left-0 right-0 h-[45%] flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      background: `linear-gradient(180deg, #3a2e25 0%, #322820 100%)`,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  />
                ))}
              </div>
              {/* Base cabinets */}
              <div className="absolute bottom-0 left-0 right-0 h-[50%] flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm relative"
                    style={{
                      background: `linear-gradient(180deg, #352a22 0%, #2d231c 100%)`,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Handle line */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-linen/10" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Countertop */}
            <motion.div
              className="absolute bottom-[calc(30%+45%*0.5)] left-[5%] right-[5%] h-[3%]"
              style={{ opacity: countertopOpacity, scale: countertopScale }}
            >
              <div className="w-full h-full rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #8a8278 0%, #7a7268 100%)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              />
            </motion.div>

            {/* Lighting effect */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[50%] pointer-events-none"
              style={{
                background: useTransform(lightGlow, (g) =>
                  `radial-gradient(ellipse at 50% 0%, rgba(255,240,200,${g}) 0%, transparent 70%)`
                ),
              }}
            />

            {/* Light fixtures */}
            <motion.div
              className="absolute top-[8%] left-[30%] right-[30%] h-[2px]"
              style={{ opacity: lightIntensity }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
              <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-b from-ember/10 to-transparent blur-sm" />
            </motion.div>

            {/* Appliances */}
            <motion.div
              className="absolute bottom-[calc(30%+2%)] left-[8%] w-[12%] h-[20%]"
              style={{ opacity: applianceOpacity }}
            >
              <div className="w-full h-full rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {/* Oven window */}
                <div className="absolute top-[15%] left-[10%] right-[10%] h-[45%] rounded-sm bg-void/50 border border-linen/5" />
                {/* Handle */}
                <div className="absolute top-[12%] left-[15%] right-[15%] h-[1px] bg-linen/15" />
              </div>
            </motion.div>

            {/* Sink */}
            <motion.div
              className="absolute bottom-[calc(30%+45%*0.5+3%)] left-[55%] w-[12%] h-[3%]"
              style={{ opacity: applianceOpacity }}
            >
              <div className="w-full h-full rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #666 0%, #555 100%)",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)",
                }}
              />
            </motion.div>

            {/* Accessories */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ opacity: accessoryOpacity }}
            >
              {/* Open shelf */}
              <div className="absolute top-[20%] right-[8%] w-[15%] h-[1px] bg-linen/15" />
              {/* Decorative items */}
              <div className="absolute top-[17%] right-[10%] w-[3%] h-[3%] rounded-full bg-ember/10" />
              <div className="absolute top-[16%] right-[14%] w-[2%] h-[4%] bg-linen/5" />
            </motion.div>

            {/* Warm overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `rgba(196,90,44,${polishOverlay})`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.4) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Before/After labels */}
      <motion.div
        className="absolute bottom-8 left-8 md:left-12 z-[20] flex items-center gap-6"
        style={{ opacity: useTransform(progress, [0.05, 0.15, 0.85, 0.95], [0, 0.6, 0.6, 0]) }}
      >
        <motion.span
          className="font-body text-[9px] font-[300] tracking-[0.12em] uppercase"
          style={{
            opacity: useTransform(morphProgress, [0, 0.5], [0.6, 0.25]),
          }}
        >
          Before
        </motion.span>
        <div className="w-16 h-[1px] bg-linen/10 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-ember/50"
            style={{ width: useTransform(morphProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>
        <motion.span
          className="font-body text-[9px] font-[300] tracking-[0.12em] uppercase"
          style={{
            opacity: useTransform(morphProgress, [0.5, 1], [0.25, 0.7]),
          }}
        >
          After
        </motion.span>
      </motion.div>

      {/* Completion percentage */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-12 z-[20]"
        style={{ opacity: useTransform(progress, [0.1, 0.2, 0.9, 1], [0, 0.5, 0.5, 0]) }}
      >
        <motion.span className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] text-ember/40">
          {percentText}
        </motion.span>
        <span className="block font-body text-[8px] font-[300] tracking-[0.12em] text-smoke/25 uppercase mt-1 text-right">
          COMPLETE
        </span>
      </motion.div>
    </div>
  );
}
