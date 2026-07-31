import type { Metadata } from "next";
import BrandsPage from "@/components/pages/BrandsPage";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Our Partners — ${BRAND.name}`,
  description: `${BRAND.brandPartners}+ world-class kitchen brands. Scavolini, Bosch, Le Creuset, Dyson, Miele, Blum, BLANCO, Franke, Smeg, Siemens. Premium kitchen curation from ${BRAND.location.city}.`,
  openGraph: {
    title: `Our Partners — ${BRAND.name}`,
    description: `${BRAND.brandPartners}+ world-class kitchen brands curated for integrity and craft.`,
    images: ["/images/kitchens/scavolini-poetica-hero.jpg"],
  },
};

export default function Page() {
  return <BrandsPage />;
}
