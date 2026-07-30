"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import Reveal, { Stagger, StaggerItem } from "@/components/site/Reveal";

const HOURS = [
  { day: "Monday — Friday", time: "10:00 AM — 7:00 PM" },
  { day: "Saturday", time: "10:00 AM — 7:00 PM" },
  { day: "Sunday", time: "By appointment" },
];

const BRAND_STORIES = [
  { name: "Scavolini", origin: "Italy", note: "Our cabinetry partner since 2005" },
  { name: "Le Creuset", origin: "France", note: "Exclusive regional distributor" },
  { name: "Bosch", origin: "Germany", note: "Appliance excellence since 1886" },
  { name: "Miele", origin: "Germany", note: "Built to last 20 years" },
  { name: "Blum", origin: "Austria", note: "The invisible backbone" },
  { name: "BLANCO", origin: "Germany", note: "Granite composite leaders" },
  { name: "Franke", origin: "Switzerland", note: "Swiss precision since 1911" },
  { name: "Smeg", origin: "Italy", note: "Where technology meets style" },
  { name: "Dyson", origin: "UK", note: "Reinventing the everyday" },
  { name: "Siemens", origin: "Germany", note: "Smart home integration" },
  { name: "Hettich", origin: "Germany", note: "Invisible engineering" },
  { name: "Kesseböhmer", origin: "Germany", note: "Every inch utilized" },
];

const GALLERY_IMAGES = [
  { src: "/images/showroom/02-display.jpg", alt: "Showroom interior — dark kitchen display" },
  { src: "/images/showroom/03-cookware.jpg", alt: "Showroom interior — marble and stone displays" },
  { src: "/images/showroom/04-brand-wall.jpg", alt: "Showroom interior — brass and copper accents" },
  { src: "/images/appliances/smeg-musa-hero.jpg", alt: "Showroom interior — Smeg Musa lifestyle display with vibrant colors" },
];

export default function ShowroomPage() {
  return (
    <main className="relative bg-void">
      {/* Hero — full viewport */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-[1400px] text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <span className="editorial-caption">SHOWROOM</span>
          </Reveal>
          <Reveal delay={100} blur>
            <h1 className="editorial-headline mt-6">
              Experience<br />the materials.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              3,000 sq ft. Twelve brands. One room designed to help you
              feel the difference before you commit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed hero image */}
      <section className="editorial-section-sm">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal scale>
            <div className="relative aspect-[16/7] overflow-hidden">
              <Image
                src="/images/kitchens/scavolini-carattere-hero.jpg"
                alt="Kitser showroom — Scavolini kitchen display with premium materials and natural lighting"
                fill
                className="object-cover img-grade"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
              <div className="absolute inset-0 img-warm img-vignette" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Details — editorial split: location, hours, appointment */}
      <section className="editorial-section">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
            {/* Location */}
            <Reveal className="md:col-span-4">
              <div className="flex flex-col gap-6">
                <div>
                  <span className="editorial-caption">LOCATION</span>
                  <h3 className="font-display text-lg font-[300] tracking-[0.04em] text-linen mt-3">
                    No. 1, Nava India Road
                  </h3>
                  <p className="editorial-body mt-2">
                    Coimbatore — 641028<br />
                    Tamil Nadu, India
                  </p>
                  <a
                    href="https://maps.google.com/?q=Kitser+Coimbatore+Nava+India+Road"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-body text-xs font-[400] tracking-wide-custom text-ember transition-colors duration-500 hover:text-flame"
                  >
                    OPEN IN MAPS
                    <span className="w-0 hover:w-4 h-[1px] bg-current transition-all duration-500" />
                  </a>
                </div>
                <div>
                  <span className="editorial-caption">PARKING</span>
                  <p className="editorial-body mt-3">
                    Dedicated parking available on Nava India Road. Valet service for consultation appointments.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Hours */}
            <Reveal className="md:col-span-4" delay={100}>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="editorial-caption">HOURS</span>
                  <div className="flex flex-col gap-3 mt-4">
                    {HOURS.map((h) => (
                      <div key={h.day} className="flex justify-between items-baseline border-b border-linen/5 pb-3">
                        <span className="font-body text-sm font-[300] text-smoke">{h.day}</span>
                        <span className="font-body text-sm font-[300] text-linen">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="editorial-caption">CONTACT</span>
                  <a href="tel:+914222301092" className="block font-display text-lg font-[300] tracking-[0.04em] text-linen mt-3 transition-colors duration-500 hover:text-ember">
                    +91 422 230 1092
                  </a>
                  <a href="mailto:showroom@kitser.in" className="block font-body text-sm font-[300] text-smoke mt-1 transition-colors duration-500 hover:text-linen">
                    showroom@kitser.in
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Appointment CTA */}
            <Reveal className="md:col-span-4" delay={200}>
              <div className="flex flex-col gap-6 p-8 border border-linen/10 h-full">
                <span className="editorial-caption">APPOINTMENT</span>
                <h3 className="editorial-headline-sm leading-[1.15]">
                  Book a private consultation.
                </h3>
                <p className="editorial-body">
                  Walk-ins welcome. For kitchen consultations, we recommend booking an appointment.
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
                    className="inline-flex items-center justify-center font-body text-xs font-[300] tracking-wide-custom text-smoke transition-colors duration-500 hover:text-linen"
                  >
                    Or call directly →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brand wall — editorial grid */}
      <section className="editorial-section">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal>
            <span className="editorial-caption">BRAND WALL</span>
            <h2 className="editorial-headline-md mt-4">
              35+ brands.<br />One showroom.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px bg-linen/5 sm:grid-cols-2 lg:grid-cols-3">
            {BRAND_STORIES.map((brand, i) => (
              <Reveal key={brand.name} delay={i * 30}>
                <div className="group bg-void p-8 transition-colors duration-500 hover:bg-ember/[0.03]">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-base font-[100] tracking-[0.08em] text-linen/60 group-hover:text-linen transition-colors duration-500">
                      {brand.name}
                    </span>
                    <span className="font-body text-[0.55rem] font-[400] tracking-wide-custom text-smoke/40">
                      {brand.origin}
                    </span>
                  </div>
                  <p className="font-body text-xs font-[300] text-smoke/40 mt-2 group-hover:text-smoke/70 transition-colors duration-500">
                    {brand.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interior gallery — editorial grid */}
      <section className="editorial-section">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal>
            <span className="editorial-caption">INTERIORS</span>
            <h2 className="editorial-headline-md mt-4">
              The showroom<br />experience.
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
      <section className="editorial-section">
        <div className="mx-auto max-w-[1400px]" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal>
            <span className="editorial-caption">FIND US</span>
            <h2 className="editorial-headline-md mt-4">
              Visit the showroom.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 relative aspect-[21/9] overflow-hidden bg-concrete">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6!2d76.991!3d11.023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8590056ce56c9%3A0x86f866d08420da19!2sNava%20India%20Rd%2C%20Peelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
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

      {/* Closing statement */}
      <section className="editorial-section-lg">
        <div className="mx-auto max-w-3xl text-center" style={{ paddingLeft: "clamp(1.5rem, 5vw, 6rem)", paddingRight: "clamp(1.5rem, 5vw, 6rem)" }}>
          <Reveal blur>
            <h2 className="editorial-headline-md">
              The showroom<br />is the experience.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="editorial-body mt-8 mx-auto max-w-md">
              No website can replace the feel of cast iron in your hand,
              the weight of a Blum drawer, the warmth of walnut.
              Visit us.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border border-linen/20 px-8 py-3 font-body text-sm font-[300] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
              >
                BOOK A VISIT
                <span className="block w-0 group-hover:w-4 h-[1px] bg-current transition-all duration-500" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
