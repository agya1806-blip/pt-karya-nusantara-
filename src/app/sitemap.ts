import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";

const siteUrl = siteConfig.url;

const staticRoutes = [
  { url: "/", priority: 1.0, changeFrequency: "monthly" as const, lastModified: "2025-06-01" },
  { url: "/about", priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2025-06-01" },
  { url: "/services", priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2025-06-01" },
  { url: "/process", priority: 0.7, changeFrequency: "monthly" as const, lastModified: "2025-06-01" },
  { url: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const, lastModified: "2025-06-01" },
  { url: "/gallery", priority: 0.8, changeFrequency: "weekly" as const, lastModified: "2025-06-01" },
  { url: "/team", priority: 0.7, changeFrequency: "monthly" as const, lastModified: "2025-06-01" },
  { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const, lastModified: "2025-06-01" },
  { url: "/faq", priority: 0.6, changeFrequency: "monthly" as const, lastModified: "2025-06-01" },
  { url: "/pricing", priority: 0.7, changeFrequency: "monthly" as const, lastModified: "2025-06-01" },
  { url: "/contact", priority: 0.8, changeFrequency: "monthly" as const, lastModified: "2025-06-01" },
  { url: "/career", priority: 0.6, changeFrequency: "weekly" as const, lastModified: "2025-06-01" },
  { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const, lastModified: "2025-01-01" },
  { url: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const, lastModified: "2025-01-01" },
];

const dynamicRoutes: { url: string; priority: number; changeFrequency: "monthly" | "weekly" | "yearly"; lastModified: string }[] = [];

const projectSlugs = ["the-villa", "sudirman-tower", "nusantara-resort", "green-valley", "the-sanctuary", "marina-club"];
for (const slug of projectSlugs) {
  dynamicRoutes.push({ url: `/portfolio/${slug}`, priority: 0.7, changeFrequency: "monthly", lastModified: "2025-06-01" });
}

const serviceSlugs = ["residential", "commercial", "hospitality", "master-planning", "interior-design", "sustainable-design"];
for (const slug of serviceSlugs) {
  dynamicRoutes.push({ url: `/services/${slug}`, priority: 0.6, changeFrequency: "monthly", lastModified: "2025-06-01" });
}

const blogSlugs = ["future-of-sustainable-luxury", "designing-for-tropical-living", "biophilic-design-urban-spaces", "smart-home-integration", "sustainable-materials", "maximizing-small-spaces", "landscape-architecture-trends", "heritage-conservation", "future-of-workspace"];
for (const slug of blogSlugs) {
  dynamicRoutes.push({ url: `/blog/${slug}`, priority: 0.5, changeFrequency: "weekly" as const, lastModified: "2025-06-01" });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteUrl}${route.url}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
