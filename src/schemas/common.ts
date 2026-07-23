import { z } from "zod";

export const slugSchema = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a valid slug (e.g. 'my-slug')");

export const contentStatusSchema = z.enum(["draft", "published", "archived"]);

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export const seoSchema = z.object({
  title: z.string().max(70).optional(),
  description: z.string().max(160).optional(),
  keywords: z.array(z.string()).optional(),
  ogTitle: z.string().max(70).optional(),
  ogDescription: z.string().max(160).optional(),
  ogImageId: z.string().uuid().optional(),
  twitterTitle: z.string().max(70).optional(),
  twitterDescription: z.string().max(160).optional(),
  twitterImageId: z.string().uuid().optional(),
  canonicalUrl: z.string().url().optional(),
  jsonLd: z.record(z.string(), z.unknown()).optional(),
  robots: z.string().optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type SEOInput = z.infer<typeof seoSchema>;
