import type { Metadata } from "next";
import CollectionsPage from "@/components/pages/CollectionsPage";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Collections — ${BRAND.name} | Cookware, Bakeware, Barware, Kitchen Tools`,
  description:
    `Explore ${BRAND.name}'s curated collections — cast iron cookware, precision bakeware, barware, and kitchen tools from Le Creuset, Bosch, BLANCO, and more.`,
  openGraph: {
    title: `Collections — ${BRAND.name}`,
    description: "Every material has a story. Curated collections from the world's finest makers.",
    images: ["/images/cookware/01-cast-iron.jpg"],
  },
};

export default function Page() {
  return <CollectionsPage />;
}
