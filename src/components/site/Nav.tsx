"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { BRAND } from "@/lib/brand";

/* ─── LUXURY NAVBAR ──────────────────────────────────────── */
/* Spacious. Balanced. Premium glassmorphism.                  */

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Scroll-based show/hide */
  useEffect(() => {
    let lastY = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const threshold = isHome ? window.innerHeight * 2.8 : 80;
          const pastThreshold = y > threshold;
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

  /* Reduced motion: show nav immediately */
  useEffect(() => {
    if (
      isHome &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
    }
  }, [isHome]);

  const navVisible = isHome ? visible || menuOpen : true;

  return (
    <>
      {/* ─── DESKTOP / TABLET NAVBAR ─── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        initial={false}
        animate={{
          opacity: navVisible ? 1 : 0,
          y: navVisible ? 0 : -12,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: navVisible ? "auto" : "none" }}
      >
        <nav
          className="flex items-center justify-between w-full max-w-[1520px] mx-auto relative"
          style={{
            padding: "0 clamp(24px, 4vw, 80px)",
            height: "88px",
          }}
        >
          {/* ─── GLASS CONTAINER (absolute, behind content) ─── */}
          <div
            className="absolute top-3 rounded-full pointer-events-none"
            style={{
              left: "clamp(24px, 4vw, 80px)",
              right: "clamp(24px, 4vw, 80px)",
              height: "64px",
              backdropFilter: "blur(32px) saturate(1.6)",
              WebkitBackdropFilter: "blur(32px) saturate(1.6)",
              backgroundColor: "rgba(10,10,10,0.45)",
              border: "1px solid rgba(245,240,235,0.06)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(245,240,235,0.03)",
            }}
          />

          {/* ─── LOGO ─── */}
          <Link
            href="/"
            className="relative z-10 flex items-center group shrink-0 whitespace-nowrap"
            style={{ height: "64px", paddingLeft: "12px", paddingRight: "12px" }}
          >
            <span
              className="tracking-[0.28em] text-linen/50 group-hover:text-linen transition-colors duration-500"
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)",
                fontWeight: 400,
              }}
            >
              KITSER
            </span>
          </Link>

          {/* ─── CENTER NAVIGATION ─── */}
          <div className="hidden items-center justify-center lg:flex relative z-10 flex-1" style={{ gap: "clamp(4px, 1.2vw, 16px)" }}>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center group whitespace-nowrap"
                style={{ height: "64px", padding: "0 clamp(10px, 1.2vw, 20px)" }}
              >
                <span
                  className={`transition-colors duration-400 ${
                    pathname === link.href
                      ? "text-ember"
                      : "text-linen/40 group-hover:text-linen/80"
                  }`}
                  style={{
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    lineHeight: 1,
                  }}
                >
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-2 left-0 right-0 h-[1.5px] bg-ember/50 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ─── CTA BUTTON ─── */}
          <div className="hidden lg:flex items-center relative z-10 shrink-0 whitespace-nowrap">
            <Link
              href="/contact"
              className="flex items-center justify-center rounded-full transition-all duration-500 hover:bg-ember hover:text-void group"
              style={{
                padding: "14px 30px",
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: "rgba(196,90,44,0.8)",
                border: "1px solid rgba(196,90,44,0.25)",
              }}
            >
              BOOK CONSULTATION
            </Link>
          </div>

          {/* ─── MOBILE HAMBURGER ─── */}
          <button
            className="relative z-50 flex flex-col justify-center items-center lg:hidden transition-opacity duration-300 hover:opacity-60"
            style={{ width: "44px", height: "64px" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="absolute block h-[1.5px] bg-linen/60 rounded-full"
              style={{ width: "24px" }}
              animate={
                menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }
              }
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute block h-[1.5px] bg-linen/60 rounded-full"
              style={{ width: "24px" }}
              animate={
                menuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="absolute block h-[1.5px] bg-linen/60 rounded-full"
              style={{ width: "24px" }}
              animate={
                menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }
              }
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundColor: "rgba(10,10,10,0.97)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
              }}
            />

            {/* Close button */}
            <motion.button
              className="absolute top-0 right-0 z-50 flex items-center justify-center"
              style={{
                width: "88px",
                height: "88px",
              }}
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              aria-label="Close menu"
            >
              <span
                className="text-linen/50 hover:text-linen transition-colors duration-300"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                ×
              </span>
            </motion.button>

            {/* Navigation links */}
            <div className="relative flex flex-col items-center">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: 0.06 + i * 0.04,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-center gap-5"
                    style={{ padding: "14px 0" }}
                  >
                    {/* Active indicator line */}
                    <motion.span
                      className="block h-[1.5px] bg-ember/60 rounded-full shrink-0"
                      animate={{
                        width: pathname === link.href ? 32 : 0,
                      }}
                      whileHover={{ width: 20 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                    <span
                      className={`transition-colors duration-500 ${
                        pathname === link.href
                          ? "text-ember"
                          : "text-linen/30 group-hover:text-linen"
                      }`}
                      style={{
                        fontFamily:
                          '"DM Serif Display", Georgia, serif',
                        fontSize: "clamp(1.6rem, 5vw, 2rem)",
                        fontWeight: 400,
                        letterSpacing: "0.03em",
                        lineHeight: 1.2,
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: 0.35,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ marginTop: "40px" }}
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center rounded-full transition-all duration-500 hover:bg-ember hover:text-void"
                  style={{
                    padding: "16px 40px",
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    color: "rgba(196,90,44,0.9)",
                    border: "1px solid rgba(196,90,44,0.3)",
                  }}
                >
                  BOOK CONSULTATION
                </Link>
              </motion.div>
            </div>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2"
            >
              <span
                className="text-linen/10"
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: "0.68rem",
                  fontWeight: 300,
                  letterSpacing: "0.12em",
                }}
              >
                {BRAND.location.full}
              </span>
              <span
                className="text-linen/10"
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: "0.68rem",
                  fontWeight: 300,
                  letterSpacing: "0.12em",
                }}
              >
                {BRAND.contact.phone}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
