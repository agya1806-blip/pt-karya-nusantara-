import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://karya-nusantara-realty.com";

const staticRoutes = [
  { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
  { url: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { url: "/process", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/gallery", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/team", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/pricing", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/career", priority: 0.6, changeFrequency: "weekly" as const },
  { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { url: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
