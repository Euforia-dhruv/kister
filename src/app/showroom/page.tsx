import type { Metadata } from "next";
import ShowroomPage from "@/components/pages/ShowroomPage";

export const metadata: Metadata = {
  title: "Showroom — Kitser | No. 1 Nava India Road, Coimbatore",
  description:
    "Visit the Kitser showroom in Coimbatore. Experience premium kitchen materials, appliances, and design consultation. Open Mon–Sat, 10 AM – 7 PM.",
  openGraph: {
    title: "Showroom — Kitser",
    description: "Experience the materials. No. 1 Nava India Road, Coimbatore.",
    images: ["/images/showroom/01-interior.jpg"],
  },
};

export default function Page() {
  return <ShowroomPage />;
}
