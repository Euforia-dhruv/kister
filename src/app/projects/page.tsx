import type { Metadata } from "next";
import ProjectsPage from "@/components/pages/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects — Kitser",
  description: "Kitchens we've brought to life. Case studies from Kitser — Coimbatore, Bangalore, Mumbai, Chennai. Premium kitchen design and curation.",
  openGraph: {
    title: "Projects — Kitser",
    description: "Kitchens we've brought to life. Case studies from Kitser.",
    images: ["/images/kitchens/scavolini-poetica-island.jpg"],
  },
};

export default function Page() {
  return <ProjectsPage />;
}
