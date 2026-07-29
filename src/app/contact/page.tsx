import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Inquire — Kitser | Begin Your Kitchen Journey",
  description:
    "Start your kitchen project with Kitser. Modular kitchen design, cookware consultation, and premium appliance guidance from our Coimbatore showroom.",
  openGraph: {
    title: "Inquire — Kitser",
    description: "Begin your kitchen journey. Premium curation from Coimbatore.",
    images: ["/images/brass-detail.jpg"],
  },
};

export default function Page() {
  return <ContactPage />;
}
