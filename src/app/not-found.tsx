"use client";

import Link from "next/link";
import Reveal from "@/components/site/Reveal";

export default function NotFound() {
  return (
    <main className="relative bg-void min-h-screen flex items-center justify-center">
      <div className="text-center site-padding">
        <Reveal blur>
          <span className="editorial-caption">404</span>
        </Reveal>
        <Reveal delay={100} blur>
          <h1
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
            className="font-display font-[200] tracking-[-0.025em] text-linen mt-6 leading-[0.94]"
          >
            Lost in<br />the kitchen.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="editorial-body mt-8 mx-auto max-w-md">
            The page you&apos;re looking for doesn&apos;t exist.
            Let&apos;s get you back to the kitchen.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <Link href="/" className="magnetic-btn" data-cursor="HOME">
              BACK TO HOME
              <span className="btn-arrow h-[1px] bg-current" />
            </Link>
            <Link
              href="/contact"
              className="font-body text-sm font-[300] tracking-wide-custom text-smoke/60 transition-colors duration-700 hover:text-ember"
            >
              BOOK APPOINTMENT
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
