import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";

export const metadata: Metadata = {
  title: "Kitchen Gallery — Kitser",
  description: "Kitchens we've curated. Modern, heritage, minimal, artisan — every kitchen tells a story. Gallery from Kitser, Coimbatore.",
  openGraph: {
    title: "Kitchen Gallery — Kitser",
    description: "Kitchens we've curated. Every kitchen tells a story.",
  },
};

export default function Page() {
  return <GalleryPage />;
}
