"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Reveal, { Stagger, StaggerItem } from "@/components/site/Reveal";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/collections", label: "Collections" },
  { href: "/brands", label: "Brands" },
  { href: "/showroom", label: "Showroom" },
  { href: "/contact", label: "Inquire" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/kitserindia" },
  { label: "Facebook", href: "https://facebook.com/kitserindia" },
  { label: "Pinterest", href: "https://pinterest.com/kitserindia" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-void overflow-hidden">
      {/* ─── BACKGROUND PHOTOGRAPHY ──────────────────────── */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Image
          src="/images/kitchens/scavolini-poetica-island.jpg"
          alt=""
          fill
          className="object-cover img-grade"
          sizes="100vw"
        />
      </div>

      {/* ─── WARM GLOW ──────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(196,90,44,0.04) 0%, transparent 60%)",
        }}
      />

      {/* ─── ANIMATED DIVIDER ───────────────────────────── */}
      <div className="relative">
        <div className="section-divider" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 pt-20 pb-12 md:px-12 md:pt-32 md:pb-16">
        {/* ─── STATEMENT ───────────────────────────────── */}
        <Reveal>
          <div className="mb-20 md:mb-28">
            <h2 className="editorial-headline text-center" style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}>
              The kitchen is where<br />
              <span className="text-ember">life happens.</span>
            </h2>
          </div>
        </Reveal>

        {/* ─── CONTENT GRID ─────────────────────────────── */}
        <Stagger stagger={0.08} className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand — 4 cols */}
          <StaggerItem className="md:col-span-4">
            <div className="flex flex-col gap-5">
              <span className="font-display text-base font-[100] tracking-[0.25em] text-linen">
                KITSER
              </span>
              <p className="editorial-body max-w-xs">
                Premium kitchen curation.<br />
                Heritage meets innovation.<br />
                Coimbatore, India.
              </p>
              <div className="flex gap-5 mt-1">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[0.65rem] font-[400] tracking-[0.12em] text-smoke/50 transition-colors duration-500 hover:text-ember"
                    data-cursor="OPEN"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Links — 2 cols */}
          <StaggerItem className="md:col-span-2">
            <div className="flex flex-col gap-3">
              <span className="editorial-caption mb-2">NAVIGATE</span>
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm font-[300] tracking-wide-custom text-smoke/60 transition-colors duration-500 hover:text-linen"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </StaggerItem>

          {/* Contact — 3 cols */}
          <StaggerItem className="md:col-span-3">
            <div className="flex flex-col gap-3.5">
              <span className="editorial-caption mb-2">CONTACT</span>
              <span className="font-body text-sm font-[300] text-smoke/60">
                No. 1, Nava India Road
              </span>
              <span className="font-body text-sm font-[300] text-smoke/60">
                Coimbatore — 641028
              </span>
              <a href="tel:+914222301092" className="mt-2 font-body text-sm font-[300] text-ember/80 transition-colors hover:text-ember">
                +91 422 230 1092
              </a>
              <a href="mailto:showroom@kitser.in" className="font-body text-sm font-[300] text-smoke/60 transition-colors hover:text-linen">
                showroom@kitser.in
              </a>
            </div>
          </StaggerItem>

          {/* Newsletter — 3 cols */}
          <StaggerItem className="md:col-span-3">
            <div className="flex flex-col gap-3.5">
              <span className="editorial-caption mb-2">NEWSLETTER</span>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-body text-sm font-[300] text-linen"
                >
                  Thank you for subscribing.
                </motion.p>
              ) : (
                <>
                  <p className="editorial-body">
                    Curated insights on materials, craft, and kitchen design.
                  </p>
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-3 mt-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="border-b border-linen/15 bg-transparent px-0 py-2.5 font-body text-sm font-[300] text-linen placeholder:text-ash/40 focus:border-ember/60 focus:outline-none transition-colors duration-500"
                    />
                    <button
                      type="submit"
                      className="self-start magnetic-btn py-2 px-5 text-[0.65rem]"
                      data-cursor="SEND"
                    >
                      SUBSCRIBE
                      <span className="btn-arrow h-[1px] bg-current" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </StaggerItem>
        </Stagger>

        {/* ─── BOTTOM BAR ───────────────────────────────── */}
        <Reveal>
          <div className="mt-16 border-t border-linen/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-[0.65rem] font-[300] text-ash/50">
              © {new Date().getFullYear()} Kitser Retail Pvt Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="font-body text-[0.65rem] font-[300] text-ash/40 transition-colors hover:text-smoke cursor-pointer">
                Privacy
              </span>
              <span className="font-body text-[0.65rem] font-[300] text-ash/40 transition-colors hover:text-smoke cursor-pointer">
                Terms
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ─── SUBTLE GRAIN ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }} />
    </footer>
  );
}
