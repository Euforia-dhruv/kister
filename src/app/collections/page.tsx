import type { Metadata } from "next";
import CollectionsPage from "@/components/pages/CollectionsPage";

export const metadata: Metadata = {
  title: "Collections — Kitser | Cookware, Bakeware, Barware, Kitchen Tools",
  description:
    "Explore Kitser's curated collections — cast iron cookware, precision bakeware, barware, and kitchen tools from Le Creuset, Bosch, BLANCO, and more.",
  openGraph: {
    title: "Collections — Kitser",
    description: "Every material has a story. Curated collections from the world's finest makers.",
    images: ["/images/cookware/01-cast-iron.jpg"],
  },
};

export default function Page() {
  return <CollectionsPage />;
}
