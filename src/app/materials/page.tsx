import type { Metadata } from "next";
import MaterialsPage from "@/components/pages/MaterialsPage";

export const metadata: Metadata = {
  title: "Materials — Kitser",
  description: "Cast iron, copper, granite, walnut, brass, stainless steel. Materials that deserve the name. Premium kitchen materials from Kitser, Coimbatore.",
  openGraph: {
    title: "Materials — Kitser",
    description: "Materials that deserve the name. Cast iron, copper, granite, walnut, brass.",
    images: ["/images/materials/03-brass-detail.jpg"],
  },
};

export default function Page() {
  return <MaterialsPage />;
}
