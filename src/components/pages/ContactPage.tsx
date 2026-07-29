"use client";

import { useState } from "react";
import Reveal from "@/components/site/Reveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="scene scene-dark flex items-center justify-center px-6 py-40">
        <div className="max-w-4xl text-center">
          <Reveal blur>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">INQUIRE</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-[100] leading-[1.05] tracking-[0.04em] text-linen">
              Begin your<br />kitchen journey.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="scene scene-dark px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2">
          {/* Left: info */}
          <Reveal>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">SHOWROOM</span>
                <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">
                  No. 1, Nava India Road<br />
                  Coimbatore — 641028
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">PHONE</span>
                <p className="font-body text-sm font-[300] text-ember">+91 422 230 1092</p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">EMAIL</span>
                <p className="font-body text-sm font-[300] text-ember">showroom@kitser.in</p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">HOURS</span>
                <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">
                  Mon — Sat: 10:00 AM — 7:00 PM<br />
                  Sunday by appointment
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={200}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <span className="font-display text-xl font-[100] tracking-[0.06em] text-linen">Thank you.</span>
                <p className="font-body text-sm font-[300] text-smoke">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="border-b border-linen/20 bg-transparent px-0 py-3 font-body text-sm font-[300] text-linen placeholder:text-ash/60 focus:border-ember focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="border-b border-linen/20 bg-transparent px-0 py-3 font-body text-sm font-[300] text-linen placeholder:text-ash/60 focus:border-ember focus:outline-none transition-colors"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="border-b border-linen/20 bg-transparent px-0 py-3 font-body text-sm font-[300] text-linen placeholder:text-ash/60 focus:border-ember focus:outline-none transition-colors"
                />
                <select
                  defaultValue=""
                  className="border-b border-linen/20 bg-transparent px-0 py-3 font-body text-sm font-[300] text-ash/60 focus:border-ember focus:outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>Interest</option>
                  <option value="kitchen">Modular Kitchen</option>
                  <option value="cookware">Cookware</option>
                  <option value="appliances">Appliances</option>
                  <option value="consultation">Design Consultation</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="Tell us about your project"
                  rows={4}
                  className="border-b border-linen/20 bg-transparent px-0 py-3 font-body text-sm font-[300] text-linen placeholder:text-ash/60 focus:border-ember focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="mt-4 border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember self-start"
                >
                  SEND INQUIRY
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
