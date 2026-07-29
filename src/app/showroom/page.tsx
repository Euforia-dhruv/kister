"use client";

import Reveal from "@/components/site/Reveal";

export default function ShowroomPage() {
  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="scene scene-dark flex items-center justify-center px-6 py-40">
        <div className="max-w-4xl text-center">
          <Reveal blur>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">SHOWROOM</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-[100] leading-[1.05] tracking-[0.04em] text-linen">
              Experience<br />the materials.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Showroom image */}
      <section className="scene scene-dark px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal scale>
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src="/images/dark-kitchen-v2.jpg" alt="Kitser showroom" className="h-full w-full object-cover img-grade" />
              <div className="absolute inset-0 img-warm img-vignette" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Details */}
      <section className="scene scene-dark px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-3">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="font-body text-xs font-[500] tracking-ultra text-ember">LOCATION</span>
              <h3 className="font-display text-lg font-[300] tracking-[0.04em] text-linen">No. 1, Nava India Road</h3>
              <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">
                Coimbatore — 641028<br />
                Tamil Nadu, India
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-3">
              <span className="font-body text-xs font-[500] tracking-ultra text-ember">HOURS</span>
              <h3 className="font-display text-lg font-[300] tracking-[0.04em] text-linen">Mon — Sat</h3>
              <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">
                10:00 AM — 7:00 PM<br />
                Sunday by appointment
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col gap-3">
              <span className="font-body text-xs font-[500] tracking-ultra text-ember">CONTACT</span>
              <h3 className="font-display text-lg font-[300] tracking-[0.04em] text-linen">+91 422 230 1092</h3>
              <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">
                showroom@kitser.in<br />
                Walk-ins welcome
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="scene scene-warm px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden bg-concrete flex items-center justify-center">
              <div className="text-center">
                <span className="font-body text-sm font-[300] tracking-wide-custom text-smoke">
                  Map — Nava India Road, Coimbatore
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
