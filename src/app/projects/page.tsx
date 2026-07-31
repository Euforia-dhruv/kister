import type { Metadata } from "next";
import ProjectsPage from "@/components/pages/ProjectsPage";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Projects — ${BRAND.name}`,
  description: `Kitchens we've brought to life. Case studies from ${BRAND.name} — ${BRAND.location.city}, Bangalore, Mumbai, Chennai. Premium kitchen design and curation.`,
  openGraph: {
    title: `Projects — ${BRAND.name}`,
    description: `Kitchens we've brought to life. Case studies from ${BRAND.name}.`,
    images: ["/images/kitchens/scavolini-poetica-island.jpg"],
  },
};

export default function Page() {
  return <ProjectsPage />;
}
