import { z } from "zod";
import { slugSchema, contentStatusSchema, seoSchema } from "./common";

export const projectCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  description: z.string().max(500).optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  categoryId: z.string().uuid().nullable().optional(),
  description: z.string().min(1).max(2000),
  content: z.record(z.unknown()).optional(),
  thumbnailId: z.string().uuid().nullable().optional(),
  location: z.string().max(200).optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  areaSize: z.number().positive().optional(),
  status: contentStatusSchema.default("draft"),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  seo: seoSchema.optional(),
});

export const projectUpdateSchema = projectSchema.partial();

export const projectImageSchema = z.object({
  projectId: z.string().uuid(),
  mediaId: z.string().uuid(),
  sortOrder: z.number().int().min(0).default(0),
});

export const projectAwardSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(1).max(200),
  year: z.string().min(1).max(20),
  organization: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
});

export type ProjectCategoryInput = z.infer<typeof projectCategorySchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type ProjectImageInput = z.infer<typeof projectImageSchema>;
export type ProjectAwardInput = z.infer<typeof projectAwardSchema>;
