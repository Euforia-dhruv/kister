"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal, { Stagger, StaggerItem } from "@/components/site/Reveal";
import { BRAND } from "@/lib/brand";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/collections", label: "Collections" },
  { href: "/brands", label: "Brands" },
  { href: "/showroom", label: "Showroom" },
  { href: "/contact", label: "Inquire" },
];

const SOCIALS = [
  { label: "Instagram", href: BRAND.social.instagram },
  { label: "Facebook", href: BRAND.social.facebook },
  { label: "Pinterest", href: BRAND.social.pinterest },
];

export default function Footer() {
  return (
    <footer className="relative bg-void overflow-hidden">
      {/* Background texture — 3% opacity */}
      <div className="absolute inset-0 opacity-[0.025] z-[2]">
        <Image src="/images/textures/dark-surface.jpg" alt="" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative z-[5] mx-auto max-w-[1400px] site-padding">
        {/* Statement — huge */}
        <Reveal>
          <div className="pt-24 pb-16 md:pt-32 md:pb-20 text-center">
            <h2 style={{ fontSize: "clamp(2rem, 7vw, 5rem)", lineHeight: 0.9, letterSpacing: "-0.025em" }} className="font-display font-[200] text-linen">
              The kitchen<br />
              is where<br />
              <span className="text-ember/60">life happens.</span>
            </h2>
          </div>
        </Reveal>

        {/* Thin divider */}
        <div className="h-[1px] bg-linen/6 max-w-[80%] mx-auto" />

        {/* Content */}
        <Stagger stagger={0.06} className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 py-16 md:py-20">
          <StaggerItem className="md:col-span-5">
            <div className="flex flex-col gap-4">
              <span className="font-display text-sm font-[100] tracking-[0.25em] text-linen/50">KITSER</span>
              <p className="font-body text-[0.85rem] font-[300] leading-[1.75] text-smoke/50 max-w-xs">
                Premium kitchen curation.<br />
                Heritage meets innovation.<br />
                Coimbatore, India.
              </p>
              <div className="flex gap-5 mt-1">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="font-body text-[0.58rem] font-[400] tracking-[0.12em] text-smoke/35 transition-colors duration-600 hover:text-ember">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="md:col-span-3">
            <div className="flex flex-col gap-2.5">
              <span className="editorial-caption mb-1">NAVIGATE</span>
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className="font-body text-[0.75rem] font-[300] tracking-wide-custom text-smoke/45 transition-colors duration-600 hover:text-linen">
                  {link.label}
                </Link>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem className="md:col-span-4">
            <div className="flex flex-col gap-3">
              <span className="editorial-caption mb-1">CONTACT</span>
              <span className="font-body text-[0.75rem] font-[300] text-smoke/45">{BRAND.location.address}</span>
              <span className="font-body text-[0.75rem] font-[300] text-smoke/45">{BRAND.location.city} — {BRAND.location.pincode}</span>
              <a href={`tel:${BRAND.contact.phone.replace(/\s/g, "")}`} className="mt-1 font-body text-[0.75rem] font-[300] text-ember/60 transition-colors duration-600 hover:text-ember">{BRAND.contact.phone}</a>
              <a href={`mailto:${BRAND.contact.email}`} className="font-body text-[0.75rem] font-[300] text-smoke/45 transition-colors duration-600 hover:text-linen">{BRAND.contact.email}</a>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Bottom bar */}
        <Reveal>
          <div className="border-t border-linen/4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-[0.55rem] font-[300] text-ash/35">
              © {new Date().getFullYear()} Kitser Retail Pvt Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/contact" className="font-body text-[0.55rem] font-[300] text-ash/25 transition-colors duration-600 hover:text-smoke">Privacy</Link>
              <Link href="/contact" className="font-body text-[0.55rem] font-[300] text-ash/25 transition-colors duration-600 hover:text-smoke">Terms</Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-[4]" />
    </footer>
  );
}
