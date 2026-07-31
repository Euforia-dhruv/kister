"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { BRAND } from "@/lib/brand";

const LINKS = [
  { href: "/about", label: "Story" },
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
    x.set((e.clientX - centerX) * 0.12);
    y.set((e.clientY - centerY) * 0.12);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        className="relative px-3 py-1.5 group"
        data-cursor-magnetic
      >
        <span className={`font-body text-[0.6rem] font-[300] tracking-[0.14em] transition-colors duration-500 ${
          isActive ? "text-ember" : "text-linen/40 group-hover:text-linen/80"
        }`}>
          {label.toUpperCase()}
        </span>
        {isActive && (
          <motion.div
            layoutId="nav-pill-indicator"
            className="absolute inset-0 rounded-full bg-ember/[0.06] border border-ember/15"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    let lastY = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const vh = window.innerHeight;

          // On homepage, show nav after ActOrchestrator intro (680vh)
          const threshold = isHome ? vh * 0.85 : 80;
          const pastThreshold = y > threshold;

          setScrolled(y > 80);

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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Always show on non-home pages after initial load
  const navVisible = isHome ? visible || menuOpen : true;

  return (
    <>
      {/* ─── GLASS FLOATING PILL ─── */}
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
        <nav className="relative flex items-center gap-1 px-2 py-1.5 rounded-full border border-linen/[0.06]"
          style={{
            backdropFilter: "blur(20px) saturate(1.3)",
            WebkitBackdropFilter: "blur(20px) saturate(1.3)",
            backgroundColor: scrolled ? "rgba(10,10,10,0.65)" : "rgba(10,10,10,0.4)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,240,235,0.03)"
              : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(245,240,235,0.02)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 group" data-cursor-magnetic>
            <span className="font-display text-[0.65rem] font-[100] tracking-[0.2em] text-linen/70 group-hover:text-linen transition-colors duration-500">
              KITSER
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-3 bg-linen/[0.06]" />

          {/* Nav links */}
          <div className="hidden items-center md:flex">
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
            className="relative z-50 flex flex-col gap-[4px] md:hidden w-7 h-7 justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-cursor-magnetic
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
                    <span className={`font-display text-2xl font-[200] tracking-[0.06em] transition-colors duration-500 ${
                      pathname === link.href ? "text-ember" : "text-linen/40 group-hover:text-linen"
                    }`}>
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
                <Link href="/contact" onClick={closeMenu} className="magnetic-btn" data-cursor="BOOK">
                  BOOK CONSULTATION
                  <span className="btn-arrow h-[1px] bg-current" />
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
