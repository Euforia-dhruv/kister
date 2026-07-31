import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Our Story — ${BRAND.name} | Three Decades of Curated Craft`,
  description:
    `Since ${BRAND.founded}, ${BRAND.name} has curated the world's finest kitchen essentials from ${BRAND.location.city}. Heritage meets innovation. Over ${BRAND.brandPartners} premium brand partners.`,
  openGraph: {
    title: `Our Story — ${BRAND.name}`,
    description: `Three decades of curated craft. Premium kitchen curation from ${BRAND.location.city}.`,
    images: ["/images/textures/artisan.jpg"],
  },
};

export default function Page() {
  return <AboutPage />;
}
