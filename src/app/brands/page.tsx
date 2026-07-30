import type { Metadata } from "next";
import BrandsPage from "@/components/pages/BrandsPage";

export const metadata: Metadata = {
  title: "Our Partners — Kitser",
  description: "35+ world-class kitchen brands. Scavolini, Bosch, Le Creuset, Dyson, Miele, Blum, BLANCO, Franke, Smeg, Siemens. Premium kitchen curation from Coimbatore.",
  openGraph: {
    title: "Our Partners — Kitser",
    description: "35+ world-class kitchen brands curated for integrity and craft.",
    images: ["/images/kitchens/scavolini-poetica-hero.jpg"],
  },
};

export default function Page() {
  return <BrandsPage />;
}
