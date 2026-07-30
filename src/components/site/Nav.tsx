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
        className="relative py-1 group"
        data-cursor-magnetic
      >
        <span className={`font-body text-[0.65rem] font-[300] tracking-[0.16em] transition-colors duration-600 ${
          isActive ? "text-ember" : "text-linen/35 group-hover:text-linen/70"
        }`}>
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-0.5 left-0 right-0 h-[1px]"
            style={{ background: "rgba(196,90,44,0.4)" }}
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
  const [pastHero, setPastHero] = useState(false);
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
          const heroThreshold = isHome ? vh * 0.1 : 80;
          setPastHero(y > heroThreshold);

          const scrollingUp = y < lastY;
          if (scrollingUp && y > heroThreshold) {
            setShow(true);
          } else if (!scrollingUp || y <= heroThreshold) {
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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navVisible = isHome ? (pastHero && show) || menuOpen : !pastHero || show || menuOpen;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        initial={false}
        animate={{
          opacity: navVisible ? 1 : 0,
          y: navVisible ? 0 : -6,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: navVisible ? "auto" : "none" }}
      >
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            backdropFilter: pastHero ? "blur(10px) saturate(1.2)" : "blur(0px)",
            WebkitBackdropFilter: pastHero ? "blur(10px) saturate(1.2)" : "blur(0px)",
            backgroundColor: pastHero ? "rgba(10,10,10,0.55)" : "transparent",
            borderBottom: pastHero ? "1px solid rgba(245,240,235,0.04)" : "1px solid transparent",
          }}
        />

        <nav className="relative flex items-center justify-between px-6 py-3.5 md:px-12 md:py-4">
          <Link href="/" className="group flex items-center gap-2" data-cursor-magnetic>
            <span className="font-display text-[0.8rem] font-[100] tracking-[0.25em] text-linen transition-colors duration-600 group-hover:text-ember">
              KITSER
            </span>
            <motion.span
              className="hidden sm:inline-block h-[1px] bg-ember/25"
              animate={{ width: 14 }}
              whileHover={{ width: 22 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {LINKS.map((link) => (
              <MagneticLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </div>

          <button
            className="relative z-50 flex flex-col gap-[5px] md:hidden w-6 h-6 justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-cursor-magnetic
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundColor: "rgba(10,10,10,0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            />

            <div className="relative flex flex-col items-center gap-7">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={link.href} onClick={closeMenu} className="group flex items-center gap-4">
                    <motion.span
                      className="block h-[1px] bg-ember"
                      animate={{ width: pathname === link.href ? 28 : 0 }}
                      whileHover={{ width: 20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className={`font-display text-3xl font-[200] tracking-[0.06em] transition-colors duration-600 ${
                      pathname === link.href ? "text-ember" : "text-linen/50 group-hover:text-linen"
                    }`}>
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6"
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
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2"
            >
              <span className="font-body text-[0.5rem] font-[300] tracking-[0.15em] text-linen/15">
                No. 1, Nava India Road, Coimbatore
              </span>
              <span className="font-body text-[0.5rem] font-[300] tracking-[0.15em] text-linen/15">
                +91 422 230 1092
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
