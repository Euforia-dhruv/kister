import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Kitchen Gallery — ${BRAND.name}`,
  description: `Kitchens we've curated. Modern, heritage, minimal, artisan — every kitchen tells a story. Gallery from ${BRAND.name}, ${BRAND.location.city}.`,
  openGraph: {
    title: `Kitchen Gallery — ${BRAND.name}`,
    description: "Kitchens we've curated. Every kitchen tells a story.",
    images: ["/images/kitchens/scavolini-carattere-hero.jpg"],
  },
};

export default function Page() {
  return <GalleryPage />;
}
