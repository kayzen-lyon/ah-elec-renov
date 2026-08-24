import type { MetadataRoute } from "next";
import { services } from "@/content/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahelecrenov.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/urgence",
    "/services",
    "/realisations",
    "/a-propos",
    "/zone-intervention",
    "/devis",
    "/contact",
    "/mentions-legales",
    "/cgu",
    "/cgp",
    "/politique-confidentialite",
  ];

  const serviceRoutes = services.map((s) => `/services/${s.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-06-08"),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route === "/urgence" ? 0.9 : 0.7,
  }));
}
