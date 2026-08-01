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
  { href: "/projects", label: "Projects" },
  { href: "/materials", label: "Materials" },
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
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02] z-[2]">
        <Image src="/images/textures/dark-surface.jpg" alt="" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative z-[5] mx-auto max-w-[1400px] site-padding">
        {/* ─── STATEMENT — Large serif ─── */}
        <Reveal>
          <div className="pt-28 pb-20 md:pt-40 md:pb-28 text-center">
            <h2 className="editorial-headline">
              The kitchen<br />
              is where<br />
              <span className="text-ember/50">life happens.</span>
            </h2>
          </div>
        </Reveal>

        {/* Thin divider */}
        <div className="h-[1px] bg-linen/5 max-w-[80%] mx-auto" />

        {/* ─── MAIN CONTENT GRID ─── */}
        <Stagger stagger={0.06} className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 py-16 md:py-20">
          {/* Brand + description */}
          <StaggerItem className="md:col-span-4">
            <div className="flex flex-col gap-5">
              <span className="font-display text-base tracking-[0.25em] text-linen/40">KITSER</span>
              <p className="font-body text-[0.85rem] font-[300] leading-[1.8] text-smoke/40 max-w-xs">
                Premium kitchen curation from {BRAND.brandPartners}+ world-class brands.
                Heritage meets innovation in {BRAND.location.city}, India.
              </p>
              <div className="flex gap-6 mt-1">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[0.68rem] font-[400] tracking-[0.12em] text-smoke/25 transition-colors duration-500 hover:text-ember"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Navigation */}
          <StaggerItem className="md:col-span-3 md:col-start-6">
            <div className="flex flex-col gap-3">
              <span className="editorial-caption mb-1">NAVIGATE</span>
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-[0.82rem] font-[300] tracking-wide-custom text-smoke/40 transition-colors duration-500 hover:text-linen"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem className="md:col-span-4 md:col-start-10">
            <div className="flex flex-col gap-3">
              <span className="editorial-caption mb-1">CONTACT</span>
              <span className="font-body text-[0.82rem] font-[300] text-smoke/40">
                {BRAND.location.address}
              </span>
              <span className="font-body text-[0.82rem] font-[300] text-smoke/40">
                {BRAND.location.city} — {BRAND.location.pincode}
              </span>
              <a
                href={`tel:${BRAND.contact.phone.replace(/\s/g, "")}`}
                className="mt-1 font-body text-[0.82rem] font-[300] text-ember/50 transition-colors duration-500 hover:text-ember"
              >
                {BRAND.contact.phone}
              </a>
              <a
                href={`mailto:${BRAND.contact.email}`}
                className="font-body text-[0.82rem] font-[300] text-smoke/40 transition-colors duration-500 hover:text-linen"
              >
                {BRAND.contact.email}
              </a>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Thin divider */}
        <div className="h-[1px] bg-linen/5 max-w-[80%] mx-auto" />

        {/* ─── BOTTOM BAR ─── */}
        <Reveal>
          <div className="py-10 flex flex-col sm:flex-row justify-between items-center gap-5">
            <p className="font-body text-[0.65rem] font-[300] text-ash/30">
              © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="/contact" className="font-body text-[0.65rem] font-[300] text-ash/20 transition-colors duration-500 hover:text-smoke">
                Privacy
              </Link>
              <Link href="/contact" className="font-body text-[0.65rem] font-[300] text-ash/20 transition-colors duration-500 hover:text-smoke">
                Terms
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-[4]" />
    </footer>
  );
}
