import { z } from "zod";
import { slugSchema, contentStatusSchema, seoSchema } from "./common";

export const pageSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  content: z.record(z.unknown()).optional(),
  status: contentStatusSchema.default("draft"),
  template: z.string().max(100).optional(),
  seo: seoSchema.optional(),
});

export const pageUpdateSchema = pageSchema.partial();

export type PageInput = z.infer<typeof pageSchema>;
export type PageUpdateInput = z.infer<typeof pageUpdateSchema>;
