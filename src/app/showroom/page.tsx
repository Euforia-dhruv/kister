import type { Metadata } from "next";
import ShowroomPage from "@/components/pages/ShowroomPage";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Showroom — ${BRAND.name} | ${BRAND.location.full}`,
  description:
    `Visit the ${BRAND.name} showroom in ${BRAND.location.city}. Experience premium kitchen materials, appliances, and design consultation. Open Mon–Sat, 10 AM – 7 PM.`,
  openGraph: {
    title: `Showroom — ${BRAND.name}`,
    description: `Experience the materials. ${BRAND.location.full}`,
    images: ["/images/showroom/01-interior.jpg"],
  },
};

export default function Page() {
  return <ShowroomPage />;
}
