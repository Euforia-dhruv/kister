import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Inquire — ${BRAND.name} | Begin Your Kitchen Journey`,
  description:
    `Start your kitchen project with ${BRAND.name}. Modular kitchen design, cookware consultation, and premium appliance guidance from our ${BRAND.location.city} showroom.`,
  openGraph: {
    title: `Inquire — ${BRAND.name}`,
    description: `Begin your kitchen journey. Premium curation from ${BRAND.location.city}.`,
    images: ["/images/materials/03-brass-detail.jpg"],
  },
};

export default function Page() {
  return <ContactPage />;
}
