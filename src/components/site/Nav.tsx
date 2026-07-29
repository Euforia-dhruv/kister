"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/collections", label: "Collections" },
  { href: "/showroom", label: "Showroom" },
  { href: "/contact", label: "Inquire" },
];

export default function Nav() {
  const [show, setShow] = useState(false);
  const [_scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      setShow(y > 300 && y < lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: show ? "auto" : "none",
        }}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/"
            className="font-display text-base font-[100] tracking-[0.15em] text-linen transition-colors hover:text-ember"
          >
            KITSER
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[0.8rem] font-[300] tracking-wide-custom text-linen/60 transition-colors hover:text-linen"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            className="flex flex-col gap-[5px] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block h-[1px] w-5 bg-linen transition-transform" style={menuOpen ? { transform: "rotate(45deg) translate(2px, 2px)" } : {}} />
            <span className="block h-[1px] w-5 bg-linen transition-opacity" style={menuOpen ? { opacity: 0 } : {}} />
            <span className="block h-[1px] w-5 bg-linen transition-transform" style={menuOpen ? { transform: "rotate(-45deg) translate(2px, -2px)" } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-void/95 backdrop-blur-sm transition-all duration-500 md:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-2xl font-[100] tracking-[0.15em] text-linen transition-colors hover:text-ember"
            style={{ transitionDelay: menuOpen ? `${i * 80}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
