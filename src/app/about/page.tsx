import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "Our Story — Kitser | Three Decades of Curated Craft",
  description:
    "Since 1989, Kitser has curated the world's finest kitchen essentials from Coimbatore. Heritage meets innovation. Over 35 premium brand partners.",
  openGraph: {
    title: "Our Story — Kitser",
    description: "Three decades of curated craft. Premium kitchen curation from Coimbatore.",
    images: ["/images/artisan-hands-v2.jpg"],
  },
};

export default function Page() {
  return <AboutPage />;
}
