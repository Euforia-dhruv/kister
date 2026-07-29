import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Kitser — Premium Kitchen Curation | Coimbatore",
  description:
    "Curated kitchen essentials from Scavolini, Bosch, Le Creuset, and more. Heritage meets innovation. Visit our showroom in Coimbatore.",
  keywords: [
    "kitchen showroom coimbatore",
    "premium kitchen appliances",
    "scavolini kitchens",
    "le creuset cookware",
    "cast iron cookware",
    "modular kitchen design",
  ],
  openGraph: {
    title: "Kitser — Premium Kitchen Curation",
    description: "Heritage meets innovation. Visit our showroom in Coimbatore.",
    images: ["/images/marble-veins.jpg"],
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
        <Nav />
        {children}
        <Footer />
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
