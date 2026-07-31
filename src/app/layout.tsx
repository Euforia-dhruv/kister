import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ScrollToTop from "@/components/site/ScrollToTop";
import PageTransition from "@/components/site/PageTransition";
import SmoothScroll from "@/components/site/SmoothScroll";
import Cursor from "@/components/site/Cursor";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  metadataBase: new URL("https://kitser.in"),
  title: `${BRAND.name} — Premium Kitchen Curation | ${BRAND.location.city}`,
  description:
    `Curated kitchen essentials from Scavolini, Bosch, Le Creuset, and more. Heritage meets innovation. Visit our showroom in ${BRAND.location.city}.`,
  keywords: [
    `kitchen showroom ${BRAND.location.city.toLowerCase()}`,
    "premium kitchen appliances",
    "scavolini kitchens",
    "le creuset cookware",
    "cast iron cookware",
    "modular kitchen design",
  ],
  openGraph: {
    title: `${BRAND.name} — Premium Kitchen Curation`,
    description: `Heritage meets innovation. Visit our showroom in ${BRAND.location.city}.`,
    images: ["/images/kitchens/scavolini-poetica-island.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <SmoothScroll>
          <Cursor />
          <ScrollToTop />
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <div className="film-grain" aria-hidden="true" />
        </SmoothScroll>
      </body>
    </html>
  );
}
