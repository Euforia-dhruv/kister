import type { Metadata } from "next";
import MaterialsPage from "@/components/pages/MaterialsPage";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Materials — ${BRAND.name}`,
  description: `Cast iron, copper, granite, walnut, brass, stainless steel. Materials that deserve the name. Premium kitchen materials from ${BRAND.name}, ${BRAND.location.city}.`,
  openGraph: {
    title: `Materials — ${BRAND.name}`,
    description: "Materials that deserve the name. Cast iron, copper, granite, walnut, brass.",
    images: ["/images/materials/03-brass-detail.jpg"],
  },
};

export default function Page() {
  return <MaterialsPage />;
}
