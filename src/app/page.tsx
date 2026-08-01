"use client";

import { lazy, Suspense } from "react";

const HeroCanvas = lazy(() => import("@/components/hero/HeroCanvas"));
const Section1Design = lazy(() => import("@/components/sections/Section1Design"));
const Section2Materials = lazy(() => import("@/components/sections/Section2Materials"));
const Section3Kitchens = lazy(() => import("@/components/sections/Section3Kitchens"));
const Section4WhyKitser = lazy(() => import("@/components/sections/Section4WhyKitser"));
const Section5Brands = lazy(() => import("@/components/sections/Section5Brands"));
const Section6Projects = lazy(() => import("@/components/sections/Section6Projects"));
const Section7Testimonials = lazy(() => import("@/components/sections/Section7Testimonials"));
const Section8CTA = lazy(() => import("@/components/sections/Section8CTA"));

function SectionLoader() {
  return <div className="h-screen bg-void" />;
}

export default function Home() {
  return (
    <main className="relative bg-void">
      {/* ─── HERO VIDEO — SCROLL-DRIVEN FRAME SEQUENCE ─── */}
      <Suspense fallback={<SectionLoader />}>
        <HeroCanvas />
      </Suspense>

      {/* ─── EDITORIAL SECTIONS ─── */}
      <Suspense fallback={<SectionLoader />}>
        <Section1Design />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Section2Materials />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Section3Kitchens />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Section4WhyKitser />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Section5Brands />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Section6Projects />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Section7Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Section8CTA />
      </Suspense>
    </main>
  );
}
