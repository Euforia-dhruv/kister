"use client";

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
  return (
    <footer className="relative bg-void overflow-hidden">
      {/* Fade from content */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-void to-transparent pointer-events-none z-[1]" />

      {/* Background photography — ghosted */}
      <div className="absolute inset-0 opacity-[0.025] z-[2]">
        <Image src="/images/kitchens/scavolini-poetica-island.jpg" alt="" fill className="object-cover img-grade" sizes="100vw" />
      </div>

      {/* Warm glow */}
      <div className="absolute inset-0 pointer-events-none z-[3]" style={{
        background: "radial-gradient(ellipse at 50% 20%, rgba(196,90,44,0.04) 0%, transparent 50%)",
      }} />

      <div className="relative z-[5] mx-auto max-w-[1400px] px-6 pt-24 pb-12 md:px-12 md:pt-32 md:pb-16">
        {/* Huge statement */}
        <Reveal>
          <div className="mb-20 md:mb-28 text-center">
            <h2 style={{ fontSize: "clamp(2rem, 7vw, 6rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }} className="font-display font-[100] text-linen">
              The kitchen is where<br />
              <span className="text-ember/80">life happens.</span>
            </h2>
          </div>
        </Reveal>

        {/* Minimal content grid */}
        <Stagger stagger={0.08} className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <StaggerItem className="md:col-span-5">
            <div className="flex flex-col gap-5">
              <span className="font-display text-sm font-[100] tracking-[0.25em] text-linen/70">KITSER</span>
              <p className="editorial-body max-w-xs">Premium kitchen curation.<br />Heritage meets innovation.<br />Coimbatore, India.</p>
              <div className="flex gap-5 mt-1">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="font-body text-[0.6rem] font-[400] tracking-[0.12em] text-smoke/40 transition-colors duration-500 hover:text-ember">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Links + Contact */}
          <StaggerItem className="md:col-span-3">
            <div className="flex flex-col gap-3">
              <span className="editorial-caption mb-2">NAVIGATE</span>
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className="font-body text-[0.8rem] font-[300] tracking-wide-custom text-smoke/50 transition-colors duration-500 hover:text-linen">
                  {link.label}
                </Link>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem className="md:col-span-4">
            <div className="flex flex-col gap-3.5">
              <span className="editorial-caption mb-2">CONTACT</span>
              <span className="font-body text-[0.8rem] font-[300] text-smoke/50">No. 1, Nava India Road</span>
              <span className="font-body text-[0.8rem] font-[300] text-smoke/50">Coimbatore — 641028</span>
              <a href="tel:+914222301092" className="mt-1 font-body text-[0.8rem] font-[300] text-ember/70 transition-colors hover:text-ember">+91 422 230 1092</a>
              <a href="mailto:showroom@kitser.in" className="font-body text-[0.8rem] font-[300] text-smoke/50 transition-colors hover:text-linen">showroom@kitser.in</a>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Bottom bar */}
        <Reveal>
          <div className="mt-16 border-t border-linen/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-[0.6rem] font-[300] text-ash/40">
              © {new Date().getFullYear()} Kitser Retail Pvt Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="font-body text-[0.6rem] font-[300] text-ash/30 transition-colors hover:text-smoke cursor-pointer">Privacy</span>
              <span className="font-body text-[0.6rem] font-[300] text-ash/30 transition-colors hover:text-smoke cursor-pointer">Terms</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Fade to pure black at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-[4]" />

      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.012] z-[6]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }} />
    </footer>
  );
}
