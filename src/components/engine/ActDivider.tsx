"use client";

import { motion } from "motion/react";

export default function ActDivider({ actNumber }: { actNumber: number }) {
  return (
    <div className="relative h-[30vh] flex items-center justify-center overflow-hidden bg-void">
      {/* Horizontal line */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-ember/20 to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: "40vw" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Act number */}
      <motion.div
        className="relative z-10 flex items-center gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-8 h-[1px] bg-ember/20" />
        <span className="font-display text-[0.5rem] font-[300] tracking-[0.3em] text-ember/30 uppercase">
          ACT {actNumber}
        </span>
        <div className="w-8 h-[1px] bg-ember/20" />
      </motion.div>
    </div>
  );
}
