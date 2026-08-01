"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { BRAND } from "@/lib/brand";

/* ─── GLASSMORPHISM NAVBAR ────────────────────────────────── */
/* Floating. Blur. Rounded. Minimal.                           */
/* Hides while scrolling down. Returns while scrolling up.      */
/* Hidden during cinematic intro.                               */

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/collections", label: "Collections" },
  { href: "/brands", label: "Brands" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Scroll-based show/hide
  useEffect(() => {
    let lastY = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;

          // On homepage, show nav only after hero video ends (300vh)
          const threshold = isHome ? window.innerHeight * 2.8 : 80;
          const pastThreshold = y > threshold;

          // Show/hide logic
          const scrollingUp = y < lastY;
          if (pastThreshold) {
            if (scrollingUp) {
              setVisible(true);
            } else if (y - lastY > 5) {
              setVisible(false);
            }
          } else {
            setVisible(false);
          }

          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Reduced motion: show nav immediately
  useEffect(() => {
    if (isHome && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
    }
  }, [isHome]);

  const navVisible = isHome ? visible || menuOpen : true;

  return (
    <>
      {/* ─── FLOATING GLASS NAVBAR ─── */}
      <motion.header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        initial={false}
        animate={{
          opacity: navVisible ? 1 : 0,
          y: navVisible ? 0 : -10,
          scale: navVisible ? 1 : 0.95,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: navVisible ? "auto" : "none" }}
      >
        <nav
          className="flex items-center gap-0.5 px-2 py-1.5 rounded-full"
          style={{
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            backgroundColor: "rgba(10,10,10,0.55)",
            border: "1px solid rgba(245,240,235,0.06)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,240,235,0.03)",
          }}
        >
          {/* Logo — left */}
          <Link href="/" className="flex items-center px-4 py-1.5 group">
            <span className="font-display text-[0.65rem] font-[100] tracking-[0.2em] text-linen/70 group-hover:text-linen transition-colors duration-500">
              KITSER
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-3 bg-linen/[0.06] mx-1" />

          {/* Center links */}
          <div className="hidden items-center md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 group"
              >
                <span
                  className={`font-body text-[0.55rem] font-[300] tracking-[0.12em] transition-colors duration-500 ${
                    pathname === link.href
                      ? "text-ember"
                      : "text-linen/35 group-hover:text-linen/70"
                  }`}
                >
                  {link.label.toUpperCase()}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[1px] bg-ember/40"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-3 bg-linen/[0.06] mx-1" />

          {/* CTA — right */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="flex items-center px-4 py-1.5 font-body text-[0.5rem] font-[400] tracking-[0.12em] text-ember/70 hover:text-ember transition-colors duration-500"
            >
              BOOK CONSULTATION
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative z-50 flex flex-col gap-[4px] md:hidden w-7 h-7 justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="absolute block h-[1px] w-4 bg-linen/60"
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute block h-[1px] w-4 bg-linen/60"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute block h-[1px] w-4 bg-linen/60"
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </nav>
      </motion.header>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundColor: "rgba(10,10,10,0.96)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
              }}
            />

            <div className="relative flex flex-col items-center gap-6">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={link.href} onClick={closeMenu} className="group flex items-center gap-3">
                    <motion.span
                      className="block h-[1px] bg-ember"
                      animate={{ width: pathname === link.href ? 24 : 0 }}
                      whileHover={{ width: 16 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span
                      className={`font-display text-2xl font-[200] tracking-[0.06em] transition-colors duration-500 ${
                        pathname === link.href ? "text-ember" : "text-linen/40 group-hover:text-linen"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-3 border border-ember px-8 py-3 font-body text-sm font-[300] tracking-[0.08em] text-ember transition-all duration-500 hover:bg-ember hover:text-void"
                >
                  BOOK CONSULTATION
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1.5"
            >
              <span className="font-body text-[0.5rem] font-[300] tracking-[0.12em] text-linen/12">
                {BRAND.location.full}
              </span>
              <span className="font-body text-[0.5rem] font-[300] tracking-[0.12em] text-linen/12">
                {BRAND.contact.phone}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
