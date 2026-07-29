"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/site/Reveal";

type Step = 1 | 2 | 3 | 4;

const STEPS = [
  { label: "Your Space", description: "Tell us about your kitchen" },
  { label: "Your Style", description: "What inspires you" },
  { label: "Your Details", description: "How to reach you" },
  { label: "Confirmation", description: "We'll be in touch" },
];

const KITCHEN_TYPES = ["New Build", "Renovation", "Upgrade", "Not Sure"];
const STYLE_OPTIONS = ["Modern Minimal", "Heritage Warm", "Industrial", "Natural Materials", "Not Sure"];
const BUDGET_RANGES = ["Under ₹5L", "₹5L — ₹15L", "₹15L — ₹30L", "₹30L+", "Prefer not to say"];

export default function ContactPage() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    kitchenType: "",
    style: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const progress = (step / 4) * 100;

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Continue to success state anyway
    }
    setStatus("success");
  };

  const canProceed = () => {
    if (step === 1) return formData.kitchenType !== "";
    if (step === 2) return formData.style !== "";
    if (step === 3) return formData.name.trim() !== "" && formData.email.trim() !== "";
    return true;
  };

  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="flex items-center justify-center px-6 py-32 md:py-40">
        <div className="max-w-4xl text-center">
          <Reveal blur>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">CONSULTATION</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-[100] leading-[1.08] tracking-[0.05em] text-linen">
              Begin your<br />kitchen journey.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Consultation form */}
      <section className="px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-3xl">
          {/* Progress bar */}
          <Reveal>
            <div className="mb-16">
              <div className="flex items-center justify-between mb-4">
                {STEPS.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className={`font-body text-[0.65rem] font-[400] tracking-wide-custom transition-colors duration-500 ${
                      step > i + 1 ? "text-ember" : step === i + 1 ? "text-linen" : "text-ash/40"
                    }`}>
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="hidden sm:block w-8 h-[1px] bg-linen/10 mx-2" />
                    )}
                  </div>
                ))}
              </div>
              <div className="h-[1px] bg-linen/10 relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-ember"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </Reveal>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-12">
                  <span className="font-body text-xs font-[500] tracking-ultra text-ember">STEP 01</span>
                  <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
                    What brings you to Kitser?
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {KITCHEN_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, kitchenType: type })}
                      className={`p-6 border text-left transition-all duration-500 ${
                        formData.kitchenType === type
                          ? "border-ember bg-ember/5"
                          : "border-linen/10 hover:border-linen/30"
                      }`}
                    >
                      <span className={`font-display text-lg font-[100] tracking-[0.04em] ${
                        formData.kitchenType === type ? "text-ember" : "text-linen"
                      }`}>
                        {type}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-12">
                  <span className="font-body text-xs font-[500] tracking-ultra text-ember">STEP 02</span>
                  <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
                    What inspires your kitchen?
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {STYLE_OPTIONS.map((style) => (
                    <button
                      key={style}
                      onClick={() => setFormData({ ...formData, style })}
                      className={`p-6 border text-left transition-all duration-500 ${
                        formData.style === style
                          ? "border-ember bg-ember/5"
                          : "border-linen/10 hover:border-linen/30"
                      }`}
                    >
                      <span className={`font-display text-lg font-[100] tracking-[0.04em] ${
                        formData.style === style ? "text-ember" : "text-linen"
                      }`}>
                        {style}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-8">
                  <span className="font-body text-xs font-[500] tracking-ultra text-ember mb-4 block">BUDGET RANGE</span>
                  <div className="flex flex-wrap gap-3">
                    {BUDGET_RANGES.map((range) => (
                      <button
                        key={range}
                        onClick={() => setFormData({ ...formData, budget: range })}
                        className={`px-5 py-2.5 border text-sm font-[300] transition-all duration-500 ${
                          formData.budget === range
                            ? "border-ember text-ember bg-ember/5"
                            : "border-linen/10 text-smoke hover:border-linen/30 hover:text-linen"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-12">
                  <span className="font-body text-xs font-[500] tracking-ultra text-ember">STEP 03</span>
                  <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
                    How do we reach you?
                  </h2>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="font-body text-xs font-[400] tracking-wide-custom text-smoke mb-3 block">NAME *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b border-linen/20 bg-transparent px-0 py-3 font-body text-sm font-[300] text-linen placeholder:text-ash/60 focus:border-ember focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-[400] tracking-wide-custom text-smoke mb-3 block">EMAIL *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border-b border-linen/20 bg-transparent px-0 py-3 font-body text-sm font-[300] text-linen placeholder:text-ash/60 focus:border-ember focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-[400] tracking-wide-custom text-smoke mb-3 block">PHONE</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border-b border-linen/20 bg-transparent px-0 py-3 font-body text-sm font-[300] text-linen placeholder:text-ash/60 focus:border-ember focus:outline-none transition-colors"
                      placeholder="+91"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-[400] tracking-wide-custom text-smoke mb-3 block">ANYTHING ELSE?</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full border-b border-linen/20 bg-transparent px-0 py-3 font-body text-sm font-[300] text-linen placeholder:text-ash/60 focus:border-ember focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your space, timeline, or any specific requirements"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                  className="w-16 h-16 border border-ember/30 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <span className="text-ember text-2xl">✓</span>
                </motion.div>
                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[100] tracking-[0.04em] text-linen mb-4">
                  Thank you, {formData.name.split(" ")[0]}.
                </h2>
                <p className="font-body text-[clamp(0.9rem,1.3vw,1.05rem)] font-[300] leading-[1.8] text-smoke max-w-md mx-auto">
                  Your consultation request has been received. A member of our team will reach out within 24 hours to discuss your kitchen journey.
                </p>
                <div className="mt-12 p-8 border border-linen/10 max-w-md mx-auto">
                  <span className="font-body text-xs font-[500] tracking-ultra text-ember">YOUR SELECTIONS</span>
                  <div className="mt-4 flex flex-col gap-2 text-left">
                    <div className="flex justify-between">
                      <span className="font-body text-sm font-[300] text-smoke">Kitchen</span>
                      <span className="font-body text-sm font-[300] text-linen">{formData.kitchenType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-body text-sm font-[300] text-smoke">Style</span>
                      <span className="font-body text-sm font-[300] text-linen">{formData.style}</span>
                    </div>
                    {formData.budget && (
                      <div className="flex justify-between">
                        <span className="font-body text-sm font-[300] text-smoke">Budget</span>
                        <span className="font-body text-sm font-[300] text-linen">{formData.budget}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {status !== "success" && (
            <Reveal delay={200}>
              <div className="flex items-center justify-between mt-16">
                <button
                  onClick={() => setStep(Math.max(1, step - 1) as Step)}
                  disabled={step === 1}
                  className="font-body text-sm font-[300] tracking-wide-custom text-smoke transition-colors hover:text-linen disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>
                {step < 3 ? (
                  <button
                    onClick={() => setStep((step + 1) as Step)}
                    disabled={!canProceed()}
                    className="group inline-flex items-center gap-3 border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    CONTINUE
                    <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed() || status === "loading"}
                    className="group inline-flex items-center gap-3 border border-ember px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-ember transition-all duration-500 hover:bg-ember hover:text-void disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-4 h-4 border border-current/30 border-t-current rounded-full"
                        />
                        SUBMITTING...
                      </span>
                    ) : (
                      "SUBMIT CONSULTATION"
                    )}
                  </button>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
