"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import Reveal from "@/components/site/Reveal";

const HOURS = [
  { day: "Monday — Friday", time: "10:00 AM — 7:00 PM" },
  { day: "Saturday", time: "10:00 AM — 7:00 PM" },
  { day: "Sunday", time: "By appointment" },
];

const BRAND_WALL = [
  "Scavolini", "Bosch", "Le Creuset", "Miele", "Dyson",
  "Blum", "BLANCO", "Franke", "Smeg", "Siemens",
  "Hettich", "Kesseböhmer", "Meyer", "Bergner", "Borosil",
];

const GALLERY_IMAGES = [
  { src: "/images/dark-kitchen-v2.jpg", alt: "Showroom interior — dark kitchen display" },
  { src: "/images/marble-veins.jpg", alt: "Showroom interior — marble and stone displays" },
  { src: "/images/brass-detail.jpg", alt: "Showroom interior — brass and copper accents" },
  { src: "/images/artisan-hands-v2.jpg", alt: "Showroom interior — artisan cookware display" },
];

export default function ShowroomPage() {
  return (
    <main className="relative bg-void">
      {/* Hero */}
      <section className="flex items-center justify-center px-6 py-32 md:py-40">
        <div className="max-w-4xl text-center">
          <Reveal blur>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">SHOWROOM</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-[100] leading-[1.08] tracking-[0.05em] text-linen">
              Experience<br />the materials.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Full-width hero image */}
      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal scale>
            <div className="relative aspect-[16/7] overflow-hidden">
              <Image
                src="/images/dark-kitchen-v2.jpg"
                alt="Kitser showroom interior"
                fill
                className="object-cover img-grade"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
              <div className="absolute inset-0 img-warm img-vignette" />

              {/* Virtual tour overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 border border-linen/20 px-8 py-4 bg-void/40 backdrop-blur-sm transition-all duration-500 hover:border-ember hover:bg-void/60"
                >
                  <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
                  <span className="font-body text-sm font-[300] tracking-wide-custom text-linen">
                    VIRTUAL TOUR
                  </span>
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Details + Appointment */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-16 lg:grid-cols-3">
          {/* Location + Parking */}
          <Reveal>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">LOCATION</span>
                <h3 className="font-display text-lg font-[300] tracking-[0.04em] text-linen">No. 1, Nava India Road</h3>
                <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">
                  Coimbatore — 641028<br />
                  Tamil Nadu, India
                </p>
                <a
                  href="https://maps.google.com/?q=Kitser+Coimbatore+Nava+India+Road"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 font-body text-xs font-[400] tracking-wide-custom text-ember transition-opacity hover:opacity-80"
                >
                  OPEN IN MAPS →
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">PARKING</span>
                <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">
                  Dedicated parking available<br />
                  on Nava India Road. Valet service<br />
                  for consultation appointments.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Hours */}
          <Reveal delay={100}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">HOURS</span>
                <div className="flex flex-col gap-3">
                  {HOURS.map((h) => (
                    <div key={h.day} className="flex justify-between items-baseline border-b border-linen/5 pb-3">
                      <span className="font-body text-sm font-[300] text-smoke">{h.day}</span>
                      <span className="font-body text-sm font-[300] text-linen">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-body text-xs font-[500] tracking-ultra text-ember">CONTACT</span>
                <a href="tel:+914222301092" className="font-display text-lg font-[300] tracking-[0.04em] text-linen transition-colors hover:text-ember">
                  +91 422 230 1092
                </a>
                <a href="mailto:showroom@kitser.in" className="font-body text-sm font-[300] text-smoke transition-colors hover:text-linen">
                  showroom@kitser.in
                </a>
              </div>
            </div>
          </Reveal>

          {/* Appointment CTA */}
          <Reveal delay={200}>
            <div className="flex flex-col gap-6 p-8 border border-linen/10 h-full">
              <span className="font-body text-xs font-[500] tracking-ultra text-ember">APPOINTMENT</span>
              <h3 className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-[100] tracking-[0.04em] text-linen leading-[1.2]">
                Book a private consultation.
              </h3>
              <p className="font-body text-sm font-[300] leading-[1.7] text-smoke">
                Walk-ins welcome. For kitchen consultations, we recommend booking an appointment — our design team will dedicate their full attention to your project.
              </p>
              <div className="mt-auto flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 border border-ember px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-ember transition-all duration-500 hover:bg-ember hover:text-void"
                >
                  BOOK CONSULTATION
                  <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
                </Link>
                <a
                  href="tel:+914222301092"
                  className="inline-flex items-center justify-center gap-2 font-body text-xs font-[300] tracking-wide-custom text-smoke transition-colors hover:text-linen"
                >
                  Or call directly →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand Wall */}
      <section className="px-6 py-24 md:px-12 border-t border-linen/5">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">BRAND WALL</span>
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
              35+ brands. One showroom.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              {BRAND_WALL.map((brand) => (
                <span
                  key={brand}
                  className="font-body text-sm font-[300] tracking-wide-custom text-smoke/40 transition-colors duration-300 hover:text-linen/70"
                >
                  {brand}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interior Gallery */}
      <section className="px-6 py-24 md:px-12 border-t border-linen/5">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">INTERIORS</span>
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
              The showroom experience.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {GALLERY_IMAGES.map((img, i) => (
              <Reveal key={img.src} delay={i * 80}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover img-grade"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 img-warm img-vignette" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-6 py-24 md:px-12 border-t border-linen/5">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <span className="font-body text-xs font-[500] tracking-ultra text-ember">FIND US</span>
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-[100] tracking-[0.04em] text-linen">
              Visit the showroom.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 relative aspect-[21/9] overflow-hidden bg-concrete">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3!2d76.95!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKitser!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.6) contrast(1.1) brightness(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 pointer-events-none border border-linen/5" />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
