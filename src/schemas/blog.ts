import { z } from "zod";
import { slugSchema, contentStatusSchema, seoSchema } from "./common";

export const blogCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  description: z.string().max(500).optional(),
});

export const authorSchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  bio: z.string().max(2000).optional(),
  avatarId: z.string().uuid().nullable().optional(),
  email: z.string().email().optional(),
  linkedinUrl: z.string().url().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  excerpt: z.string().max(500).optional(),
  content: z.record(z.string(), z.unknown()),
  imageId: z.string().uuid().nullable().optional(),
  authorId: z.string().uuid().nullable().optional(),
  categoryId: z.string().uuid().nullable().optional(),
  tags: z.array(z.string()).optional(),
  status: contentStatusSchema.default("draft"),
  isFeatured: z.boolean().default(false),
  seo: seoSchema.optional(),
});

export const blogPostUpdateSchema = blogPostSchema.partial();

export type BlogCategoryInput = z.infer<typeof blogCategorySchema>;
export type AuthorInput = z.infer<typeof authorSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type BlogPostUpdateInput = z.infer<typeof blogPostUpdateSchema>;
