"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/collections", label: "Collections" },
  { href: "/brands", label: "Brands" },
  { href: "/showroom", label: "Showroom" },
  { href: "/contact", label: "Inquire" },
];

function MagneticLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="relative py-1"
      >
        <span className={`font-body text-[0.75rem] font-[300] tracking-[0.14em] transition-colors duration-300 ${
          isActive ? "text-ember" : "text-linen/50 hover:text-linen"
        }`}>
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-1 left-0 right-0 h-[1px] bg-ember"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function Nav() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    let lastY = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const scrollingUp = y < lastY;
          const threshold = isHome ? 3200 : 80;

          setAtTop(y <= threshold);

          if (scrollingUp && y > threshold) {
            setShow(true);
          } else if (!scrollingUp || y <= threshold) {
            setShow(false);
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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Show nav immediately on inner pages after threshold
  const navVisible = isHome ? show : !atTop;

  return (
    <>
      {/* ─── DESKTOP NAV ─────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        initial={false}
        animate={{
          opacity: navVisible || menuOpen ? 1 : 0,
          y: navVisible || menuOpen ? 0 : -16,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: navVisible || menuOpen ? "auto" : "none" }}
      >
        {/* Glass background */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            backdropFilter: navVisible ? "blur(20px) saturate(1.2)" : "blur(0px)",
            WebkitBackdropFilter: navVisible ? "blur(20px) saturate(1.2)" : "blur(0px)",
            backgroundColor: navVisible ? "rgba(10,10,10,0.6)" : "transparent",
            borderBottom: navVisible ? "1px solid rgba(196,90,44,0.08)" : "1px solid transparent",
          }}
        />

        <nav className="relative flex items-center justify-between px-6 py-4 md:px-12 md:py-5">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-base font-[100] tracking-[0.2em] text-linen transition-colors duration-300 group-hover:text-ember">
              KITSER
            </span>
            <span className="hidden sm:inline-block w-4 h-[1px] bg-ember/40 transition-all duration-500 group-hover:w-6 group-hover:bg-ember" />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => (
              <MagneticLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative z-50 flex flex-col gap-[5px] md:hidden w-6 h-6 justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="absolute block h-[1px] w-5 bg-linen"
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute block h-[1px] w-5 bg-linen"
              animate={menuOpen ? { rotate: -90, scaleX: 0 } : { rotate: 0, scaleX: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute block h-[1px] w-5 bg-linen"
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </nav>
      </motion.header>

      {/* ─── MOBILE MENU ─────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-void"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Links */}
            <div className="relative flex flex-col items-center gap-6">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-center gap-3"
                  >
                    <span className={`block w-0 group-hover:w-4 h-[1px] bg-ember transition-all duration-500 ${
                      pathname === link.href ? "!w-4" : ""
                    }`} />
                    <span className={`font-display text-3xl font-[100] tracking-[0.12em] transition-colors duration-300 ${
                      pathname === link.href ? "text-ember" : "text-linen/70 group-hover:text-linen"
                    }`}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="border border-ember/30 px-8 py-3 font-body text-xs font-[400] tracking-[0.14em] text-ember transition-all duration-500 hover:bg-ember hover:text-void"
                >
                  BOOK CONSULTATION
                </Link>
              </motion.div>
            </div>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2"
            >
              <span className="font-body text-[0.6rem] font-[300] tracking-[0.12em] text-linen/30">
                No. 1, Nava India Road, Coimbatore
              </span>
              <span className="font-body text-[0.6rem] font-[300] tracking-[0.12em] text-linen/30">
                +91 422 230 1092
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
