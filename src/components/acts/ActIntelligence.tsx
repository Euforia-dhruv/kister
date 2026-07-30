"use client";

import { useState } from "react";
import { motion, AnimatePresence, useTransform, type MotionValue } from "motion/react";

// ACT 5: KITCHEN INTELLIGENCE
// When someone clicks a system, the whole kitchen highlights connected components.

interface System {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
  icon: string;
  details: {
    title: string;
    systems: { name: string; description: string }[];
  };
}

const SYSTEMS: System[] = [
  { id: "sink", label: "SINK", x: 55, y: 42, connections: ["water", "drain", "cabinet", "countertop"], icon: "◈", details: { title: "Sink System", systems: [{ name: "Water Flow", description: "Hot/cold mixer, 3.5 bar pressure" }, { name: "Drainage", description: "Siphon trap, 1.5 inch outlet" }, { name: "Cabinet Protection", description: "Waterproof membrane, silicone sealed" }, { name: "Material", description: "SILGRANIT composite, 280°C heat-proof" }, { name: "Warranty", description: "15 years structural, 5 years finish" }] } },
  { id: "cabinet", label: "CABINET", x: 20, y: 35, connections: ["hinge", "drawer", "lighting", "hardware"], icon: "▣", details: { title: "Cabinet System", systems: [{ name: "Structure", description: "18mm marine ply, moisture-resistant" }, { name: "Hinge System", description: "Blumotion, 110° opening, soft-close" }, { name: "Drawer Channels", description: "LEGRABOX, full extension, 70kg load" }, { name: "Finish", description: "PU lacquer, 6-coat process" }, { name: "Warranty", description: "10 years structural" }] } },
  { id: "lighting", label: "LIGHTING", x: 35, y: 15, connections: ["cabinet", "countertop", "power"], icon: "◉", details: { title: "Lighting System", systems: [{ name: "Task Lighting", description: "Under-cabinet LED, 3000K, CRI 95+" }, { name: "Ambient", description: "Ceiling spots, dimmable warm white" }, { name: "Display", description: "In-cabinet LED strips, colour-matched" }, { name: "Power", description: "Separate circuit, smart dimmer" }, { name: "Warranty", description: "5 years on LED modules" }] } },
  { id: "countertop", label: "STONE", x: 40, y: 50, connections: ["sink", "cabinet", "splash"], icon: "▬", details: { title: "Countertop System", systems: [{ name: "Surface", description: "Dekton/Caesarstone, zero porosity" }, { name: "Edge Profile", description: "Eased, beveled, or waterfall" }, { name: "Splash Back", description: "Matching or contrasting material" }, { name: "Cabinet Interface", description: "Silicone sealed, level-mounted" }, { name: "Warranty", description: "25 years structural, 10 years surface" }] } },
  { id: "appliance", label: "APPLIANCE", x: 65, y: 30, connections: ["power", "cabinet", "ventilation"], icon: "⊞", details: { title: "Appliance Integration", systems: [{ name: "Power Supply", description: "Dedicated 16A circuits, surge protected" }, { name: "Ventilation", description: "External exhaust, 600 m³/h airflow" }, { name: "Cabinet Cut", description: "Precision CNC cut, heat shields" }, { name: "Service Access", description: "Rear panel removable for maintenance" }, { name: "Warranty", description: "Manufacturer warranty + Kitser support" }] } },
  { id: "storage", label: "STORAGE", x: 12, y: 58, connections: ["cabinet", "hardware", "drawer"], icon: "⬡", details: { title: "Storage System", systems: [{ name: "Corner Solutions", description: "Kesseböhmer LeMans, full access" }, { name: "Pull-Out Pantry", description: "450mm wide, full extension" }, { name: "Drawer Organizers", description: "Bamboo dividers, cutlery trays" }, { name: "Soft-Close", description: "Blumotion at every position" }, { name: "Warranty", description: "10 years on mechanisms" }] } },
];

function SystemNode({
  system,
  index,
  progress,
  isActive,
  isFaded,
  onClick,
}: {
  system: System;
  index: number;
  progress: MotionValue<number>;
  isActive: boolean;
  isFaded: boolean;
  onClick: () => void;
}) {
  const delay = index * 0.03;
  const nodeOpacity = useTransform(progress, [0.08 + delay, 0.2 + delay], [0, 1]);

  return (
    <motion.div
      className="absolute z-[15] cursor-pointer"
      style={{ left: `${system.x}%`, top: `${system.y}%`, opacity: useTransform(nodeOpacity, (o) => isFaded ? o * 0.2 : o) }}
      onClick={onClick}
      data-cursor-label={system.label}
    >
      <motion.div className="relative flex items-center gap-3" animate={{ scale: isActive ? 1.05 : 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-500"
          style={{
            borderColor: isActive ? "rgba(196,90,44,0.6)" : "rgba(245,240,235,0.08)",
            boxShadow: isActive ? "0 0 30px rgba(196,90,44,0.15)" : "none",
            backgroundColor: isActive ? "rgba(196,90,44,0.06)" : "transparent",
          }}
        >
          <span className="text-xs text-linen/50">{system.icon}</span>
        </div>
        <div className="hidden md:block">
          <span className="font-body text-[8px] font-[400] tracking-[0.18em] text-ember/60 uppercase">{system.label}</span>
        </div>
        {isActive && (
          <motion.div className="absolute inset-0 rounded-full border border-ember/20 pointer-events-none" animate={{ scale: [1, 1.8], opacity: [0.4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }} />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ActIntelligence({ progress }: { progress: MotionValue<number> }) {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const titleOpacity = useTransform(progress, [0.02, 0.1], [0, 1]);
  const activeData = activeSystem ? SYSTEMS.find(s => s.id === activeSystem) : null;

  return (
    <div className="relative w-full h-full bg-void">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(245,240,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,235,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div className="absolute top-8 left-8 md:left-12 z-[25]" style={{ opacity: titleOpacity }}>
        <span className="editorial-caption">ACT V</span>
        <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-[200] tracking-[-0.01em] text-linen/80 mt-2">Kitchen Intelligence</h2>
        <p className="font-body text-[11px] font-[300] text-smoke/40 mt-2 max-w-xs">An operating system. Click any component to inspect connected systems.</p>
      </motion.div>

      {SYSTEMS.map((system, i) => {
        const isConnected = activeSystem !== null && system.connections.includes(activeSystem);
        const isFaded = activeSystem !== null && activeSystem !== system.id && !isConnected;
        return (
          <SystemNode
            key={system.id}
            system={system}
            index={i}
            progress={progress}
            isActive={activeSystem === system.id}
            isFaded={isFaded}
            onClick={() => setActiveSystem(activeSystem === system.id ? null : system.id)}
          />
        );
      })}

      <AnimatePresence>
        {activeData && (
          <motion.div key={activeData.id} initial={{ x: -360, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -360, opacity: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="absolute top-0 left-0 h-full w-[340px] max-w-[85vw] z-[30]">
            <div className="h-full backdrop-blur-[20px] bg-void/70 border-r border-linen/6 overflow-y-auto">
              <div className="p-8 md:p-10">
                <button onClick={() => setActiveSystem(null)} className="absolute top-6 right-6 w-7 h-7 border border-linen/8 flex items-center justify-center text-linen/30 hover:text-linen/60 hover:border-linen/15 transition-all duration-500">
                  <span className="text-[10px]">×</span>
                </button>
                <div className="mb-8">
                  <span className="editorial-caption">SYSTEM INSPECTOR</span>
                  <h3 className="font-display text-xl font-[200] tracking-[-0.02em] text-linen leading-[1.15] mt-2">{activeData.details.title}</h3>
                </div>
                <div className="space-y-5">
                  {activeData.details.systems.map((sys, j) => (
                    <motion.div key={sys.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="border-l border-linen/6 pl-4">
                      <span className="font-body text-[9px] font-[400] tracking-[0.12em] text-ember/60 uppercase">{sys.name}</span>
                      <p className="font-body text-[11px] font-[300] text-smoke/45 mt-1 leading-[1.6]">{sys.description}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-linen/4">
                  <span className="editorial-label text-[7px] mb-3 block">CONNECTED TO</span>
                  <div className="flex flex-wrap gap-2">
                    {activeData.connections.map((connId) => {
                      const conn = SYSTEMS.find(s => s.id === connId);
                      return (
                        <button key={connId} onClick={() => setActiveSystem(connId)} className="font-body text-[9px] font-[300] tracking-[0.08em] text-linen/40 border border-linen/8 px-3 py-1.5 hover:border-ember/30 hover:text-ember/60 transition-all duration-300 uppercase">
                          {conn?.label || connId}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[20] flex items-center gap-4 backdrop-blur-sm bg-void/50 border border-linen/6 px-6 py-3" style={{ opacity: useTransform(progress, [0.15, 0.3], [0, 1]) }}>
        <span className="font-body text-[8px] font-[300] tracking-[0.12em] text-smoke/30 uppercase">KitchenOS v1.0</span>
        <span className="w-px h-3 bg-linen/8" />
        <span className="font-body text-[8px] font-[300] text-smoke/25">{activeSystem ? `Inspecting: ${activeData?.details.title}` : "Click a system to inspect"}</span>
      </motion.div>
    </div>
  );
}
