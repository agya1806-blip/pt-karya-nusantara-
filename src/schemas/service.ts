import { z } from "zod";
import { slugSchema, contentStatusSchema, seoSchema } from "./common";

export const serviceCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  description: z.string().max(500).optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  categoryId: z.string().uuid().nullable().optional(),
  description: z.string().min(1).max(2000),
  content: z.record(z.unknown()).optional(),
  icon: z.string().max(100).optional(),
  imageId: z.string().uuid().nullable().optional(),
  features: z.array(z.string()).optional(),
  status: contentStatusSchema.default("draft"),
  sortOrder: z.number().int().min(0).default(0),
  seo: seoSchema.optional(),
});

export const serviceUpdateSchema = serviceSchema.partial();

export type ServiceCategoryInput = z.infer<typeof serviceCategorySchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
