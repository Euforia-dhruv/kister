"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal, { Stagger, StaggerItem } from "@/components/site/Reveal";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/collections", label: "Collections" },
  { href: "/brands", label: "Brands" },
  { href: "/materials", label: "Materials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
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
    <footer className="relative bg-void border-t border-linen/5">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
        <Stagger stagger={0.08} className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <StaggerItem>
            <div className="flex flex-col gap-4">
              <span className="font-display text-lg font-[100] tracking-[0.2em] text-linen">
                KITSER
              </span>
              <p className="editorial-body">
                Premium kitchen curation.<br />
                Heritage meets innovation.<br />
                Coimbatore, India.
              </p>
              <div className="mt-2 flex gap-4">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs font-[400] tracking-wide-custom text-smoke transition-colors duration-300 hover:text-ember"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Links */}
          <StaggerItem>
            <div className="flex flex-col gap-2.5">
              <span className="editorial-caption mb-2">NAVIGATE</span>
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm font-[300] tracking-wide-custom text-smoke transition-colors duration-300 hover:text-linen"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem>
            <div className="flex flex-col gap-3">
              <span className="editorial-caption mb-2">CONTACT</span>
              <span className="font-body text-sm font-[300] text-smoke">
                No. 1, Nava India Road
              </span>
              <span className="font-body text-sm font-[300] text-smoke">
                Coimbatore — 641028
              </span>
              <a href="tel:+914222301092" className="mt-2 font-body text-sm font-[300] text-ember transition-opacity hover:opacity-80">
                +91 422 230 1092
              </a>
              <a href="mailto:showroom@kitser.in" className="font-body text-sm font-[300] text-smoke transition-colors hover:text-linen">
                showroom@kitser.in
              </a>
            </div>
          </StaggerItem>

          {/* Newsletter */}
          <StaggerItem>
            <div className="flex flex-col gap-3">
              <span className="editorial-caption mb-2">NEWSLETTER</span>
              {subscribed ? (
                <p className="font-body text-sm font-[300] text-linen">
                  Thank you for subscribing.
                </p>
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
                      className="border-b border-linen/20 bg-transparent px-0 py-2 font-body text-sm font-[300] text-linen placeholder:text-ash/60 focus:border-ember focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="self-start border border-linen/20 px-5 py-2 font-body text-xs font-[400] tracking-wide-custom text-linen transition-all duration-500 hover:border-ember hover:text-ember"
                    >
                      SUBSCRIBE
                    </button>
                  </form>
                </>
              )}
            </div>
          </StaggerItem>
        </Stagger>

        <Reveal>
          <div className="mt-16 border-t border-linen/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs font-[300] text-ash">
              © {new Date().getFullYear()} Kitser Retail Pvt Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="font-body text-xs font-[300] text-ash transition-colors hover:text-smoke cursor-pointer">
                Privacy
              </span>
              <span className="font-body text-xs font-[300] text-ash transition-colors hover:text-smoke cursor-pointer">
                Terms
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
