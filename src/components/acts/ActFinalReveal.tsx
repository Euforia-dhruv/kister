"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useTransform, type MotionValue } from "motion/react";

// ACT 8: FINAL REVEAL
// Walk through the kitchen. Scroll controls camera.
// Drawer opens. Light turns on. Tap flows.

export default function ActFinalReveal({ progress }: { progress: MotionValue<number> }) {
  const titleOpacity = useTransform(progress, [0.02, 0.08], [0, 1]);
  const cameraScale = useTransform(progress, [0.05, 0.85], [1, 1.25]);
  const cameraX = useTransform(progress, [0.05, 0.5, 0.85], ["0%", "-3%", "-6%"]);
  const cameraY = useTransform(progress, [0.05, 0.5, 0.85], ["0%", "-2%", "-4%"]);
  const drawerOpen = useTransform(progress, [0.2, 0.4], [0, 1]);
  const drawerX = useTransform(drawerOpen, [0, 1], [0, 60]);
  const lightGlow = useTransform(progress, [0.35, 0.5], [0, 0.25]);
  const tapFlow = useTransform(progress, [0.5, 0.65], [0, 1]);
  const cabinetOpen = useTransform(progress, [0.6, 0.75], [0, 1]);
  const cabinetRotate = useTransform(cabinetOpen, [0, 1], [0, -45]);
  const contactOpacity = useTransform(progress, [0.75, 0.9], [0, 1]);
  const sceneFade = useTransform(progress, [0.8, 0.95], [1, 0.3]);
  const contactContentOpacity = useTransform(progress, [0.8, 0.9], [0, 1]);
  const contactContentY = useTransform(progress, [0.8, 0.9], [30, 0]);

  return (
    <div className="relative w-full h-full bg-void">
      <motion.div className="absolute inset-0 z-[5]" style={{ scale: cameraScale, x: cameraX, y: cameraY }}>
        <Image src="/images/kitchens/scavolini-delinea-brass.jpg" alt="Kitser premium kitchen" fill className="object-cover" style={{ filter: "saturate(0.7) brightness(0.6) contrast(1.1)" }} sizes="100vw" priority />

        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: useTransform(lightGlow, (g) => `radial-gradient(ellipse at 50% 20%, rgba(255,240,200,${g}) 0%, transparent 60%)`) }} />

        <motion.div className="absolute bottom-[25%] right-[15%] w-[15%] h-[8%] pointer-events-none" style={{ x: drawerX, opacity: useTransform(drawerOpen, [0, 0.1], [0, 1]) }}>
          <motion.div className="w-full h-full rounded-sm bg-void/30 backdrop-blur-sm border border-linen/8" style={{ opacity: useTransform(drawerOpen, [0, 0.1], [0.3, 1]) }}>
            <motion.div className="absolute inset-2 flex gap-1" style={{ opacity: useTransform(drawerOpen, [0.3, 0.8], [0, 0.6]) }}>
              {[1, 2, 3].map((i) => (<div key={i} className="flex-1 rounded-sm bg-linen/5" />))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="absolute top-[35%] left-[52%] w-[1px] pointer-events-none" style={{ height: useTransform(tapFlow, [0, 1], [0, 80]), opacity: tapFlow, background: "linear-gradient(180deg, rgba(160,190,220,0.4) 0%, rgba(160,190,220,0.1) 80%, transparent 100%)" }} />

        <motion.div className="absolute top-[15%] left-[10%] w-[12%] h-[20%] pointer-events-none" style={{ opacity: useTransform(cabinetOpen, [0, 0.1], [0, 1]), transformOrigin: "left center", rotateY: cabinetRotate }}>
          <div className="w-full h-full rounded-sm bg-concrete/50 backdrop-blur-sm border border-linen/5" />
        </motion.div>
      </motion.div>

      <motion.div className="absolute inset-0 z-[8] pointer-events-none" style={{ opacity: sceneFade, background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.5) 100%)" }} />

      <motion.div className="absolute top-8 left-8 md:left-12 z-[25]" style={{ opacity: titleOpacity }}>
        <span className="editorial-caption">ACT VIII</span>
        <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-[200] tracking-[-0.01em] text-linen/80 mt-2">The Living Kitchen</h2>
      </motion.div>

      <motion.div className="absolute bottom-[28%] right-[12%] z-[15] pointer-events-none hidden md:block" style={{ opacity: useTransform(progress, [0.25, 0.35, 0.45], [0, 0.6, 0]) }}>
        <span className="font-body text-[8px] font-[300] tracking-[0.15em] text-ember/60 uppercase flex items-center gap-2"><span className="w-3 h-[1px] bg-ember/40" />DRAWER OPENS</span>
      </motion.div>

      <motion.div className="absolute top-[20%] left-[45%] z-[15] pointer-events-none hidden md:block" style={{ opacity: useTransform(progress, [0.4, 0.5, 0.6], [0, 0.6, 0]) }}>
        <span className="font-body text-[8px] font-[300] tracking-[0.15em] text-ember/60 uppercase flex items-center gap-2">LIGHT TURNS ON<span className="w-3 h-[1px] bg-ember/40" /></span>
      </motion.div>

      <motion.div className="absolute top-[38%] left-[55%] z-[15] pointer-events-none hidden md:block" style={{ opacity: useTransform(progress, [0.55, 0.6, 0.7], [0, 0.6, 0]) }}>
        <span className="font-body text-[8px] font-[300] tracking-[0.15em] text-ember/60 uppercase flex items-center gap-2"><span className="w-3 h-[1px] bg-ember/40" />TAP FLOWS</span>
      </motion.div>

      <motion.div className="absolute inset-0 z-[20] flex items-center justify-center" style={{ opacity: contactOpacity }}>
        <div className="absolute inset-0 bg-void/85 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center max-w-2xl px-8">
          <motion.div style={{ opacity: contactContentOpacity, y: contactContentY }}>
            <span className="editorial-caption">BEGIN YOUR KITCHEN</span>
            <h2 className="editorial-headline mt-6">Let&apos;s engineer<br />your kitchen.</h2>
            <p className="editorial-body mt-8 mx-auto max-w-md text-center">Every kitchen begins with a conversation. Visit our showroom in Coimbatore or schedule a private consultation.</p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="magnetic-btn" data-cursor="INQUIRE">SCHEDULE CONSULTATION<span className="btn-arrow h-[1px] bg-current" /></Link>
              <Link href="/collections" className="magnetic-btn" data-cursor="EXPLORE">VIEW COLLECTIONS<span className="btn-arrow h-[1px] bg-current" /></Link>
            </div>
            <div className="mt-16 flex flex-col items-center gap-3">
              <span className="font-display text-sm font-[100] tracking-[0.2em] text-linen/40">KITSER</span>
              <span className="font-body text-[10px] font-[300] text-smoke/30">No. 1, Nava India Road, Coimbatore — 641028</span>
              <span className="font-body text-[10px] font-[300] text-smoke/25">+91 422 231 5555</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
