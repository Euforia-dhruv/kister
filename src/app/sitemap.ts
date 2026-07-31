import type { MetadataRoute } from "next";

const BASE = "https://kister.vercel.app";

const routes = [
  "",
  "/about",
  "/collections",
  "/brands",
  "/materials",
  "/gallery",
  "/projects",
  "/showroom",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
