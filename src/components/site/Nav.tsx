"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { BRAND } from "@/lib/brand";

/* ─── PREMIUM NAVBAR ──────────────────────────────────────── */
/* Glassmorphism. Premium. Scroll-aware.                        */

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/collections", label: "Collections" },
  { href: "/brands", label: "Brands" },
  { href: "/materials", label: "Materials" },
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
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,1280px)]"
        initial={false}
        animate={{
          opacity: navVisible ? 1 : 0,
          y: navVisible ? 0 : -10,
          scale: navVisible ? 1 : 0.96,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: navVisible ? "auto" : "none" }}
      >
        <nav
          className="flex items-center justify-between px-2 py-2 rounded-full"
          style={{
            backdropFilter: "blur(28px) saturate(1.5)",
            WebkitBackdropFilter: "blur(28px) saturate(1.5)",
            backgroundColor: "rgba(10,10,10,0.5)",
            border: "1px solid rgba(245,240,235,0.05)",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(245,240,235,0.02)",
          }}
        >
          {/* Logo — left */}
          <Link href="/" className="flex items-center px-6 py-2.5 group shrink-0">
            <span className="font-display text-[1rem] tracking-[0.22em] text-linen/60 group-hover:text-linen transition-colors duration-500">
              KITSER
            </span>
          </Link>

          {/* Center links */}
          <div className="hidden items-center lg:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 group"
              >
                <span
                  className={`font-body text-[0.68rem] font-[400] tracking-[0.12em] transition-colors duration-500 ${
                    pathname === link.href
                      ? "text-ember"
                      : "text-linen/30 group-hover:text-linen/65"
                  }`}
                >
                  {link.label.toUpperCase()}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[1px] bg-ember/40"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA — right */}
          <div className="hidden lg:flex items-center pr-3">
            <Link
              href="/contact"
              className="flex items-center px-6 py-2.5 font-body text-[0.65rem] font-[400] tracking-[0.14em] text-ember/70 hover:text-ember border border-ember/20 hover:border-ember/40 rounded-full transition-all duration-500"
            >
              BOOK CONSULTATION
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative z-50 flex flex-col gap-[5px] lg:hidden w-8 h-8 justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="absolute block h-[1px] w-5 bg-linen/50"
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute block h-[1px] w-5 bg-linen/50"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute block h-[1px] w-5 bg-linen/50"
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </nav>
      </motion.header>

      {/* ─── MOBILE MENU OVERLAY ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundColor: "rgba(10,10,10,0.96)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
              }}
            />

            <div className="relative flex flex-col items-center gap-7">
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
                      className={`font-display text-[1.7rem] tracking-[0.04em] transition-colors duration-500 ${
                        pathname === link.href ? "text-ember" : "text-linen/35 group-hover:text-linen"
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
                className="mt-5"
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-3 border border-ember px-8 py-3.5 font-body text-[0.85rem] font-[300] tracking-[0.08em] text-ember transition-all duration-500 hover:bg-ember hover:text-void"
                >
                  BOOK CONSULTATION
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-1.5"
            >
              <span className="font-body text-[0.6rem] font-[300] tracking-[0.12em] text-linen/10">
                {BRAND.location.full}
              </span>
              <span className="font-body text-[0.6rem] font-[300] tracking-[0.12em] text-linen/10">
                {BRAND.contact.phone}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
