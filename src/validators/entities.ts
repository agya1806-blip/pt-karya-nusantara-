import { z } from "zod";
import { slugSchema, entityStatusSchema, seoSchema } from "./common";

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  categoryId: z.string().uuid().nullable().optional(),
  description: z.string().min(1).max(2000),
  content: z.record(z.string(), z.unknown()).optional(),
  thumbnailId: z.string().uuid().nullable().optional(),
  location: z.string().max(200).optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  areaSize: z.number().positive().optional(),
  status: entityStatusSchema.default("draft"),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  seo: seoSchema.optional(),
});

export const projectImageSchema = z.object({
  projectId: z.string().uuid(),
  mediaId: z.string().uuid(),
  sortOrder: z.number().int().min(0).default(0),
});

export const projectVideoSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().max(200).optional(),
  url: z.string().url(),
  platform: z.string().default("youtube"),
  thumbnailId: z.string().uuid().nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
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
  status: entityStatusSchema.default("draft"),
  isFeatured: z.boolean().default(false),
  seo: seoSchema.optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  categoryId: z.string().uuid().nullable().optional(),
  description: z.string().min(1).max(2000),
  content: z.record(z.string(), z.unknown()).optional(),
  icon: z.string().max(100).optional(),
  imageId: z.string().uuid().nullable().optional(),
  features: z.array(z.string()).optional(),
  status: entityStatusSchema.default("draft"),
  sortOrder: z.number().int().min(0).default(0),
  seo: seoSchema.optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  company: z.string().min(1).max(200),
  content: z.string().min(1).max(2000),
  avatarId: z.string().uuid().nullable().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  videoUrl: z.string().url().optional(),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  role: z.string().min(1).max(100),
  bio: z.string().max(2000).optional(),
  imageId: z.string().uuid().nullable().optional(),
  email: z.string().email().optional(),
  linkedinUrl: z.string().url().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
});

export const faqSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
  category: z.string().max(100).optional(),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const awardSchema = z.object({
  title: z.string().min(1).max(200),
  organization: z.string().max(200).optional(),
  year: z.string().min(1).max(20),
  description: z.string().max(1000).optional(),
  imageId: z.string().uuid().nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const partnerSchema = z.object({
  name: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().max(1000).optional(),
  logoId: z.string().uuid().nullable().optional(),
  websiteUrl: z.string().url().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const galleryItemSchema = z.object({
  title: z.string().max(200).optional(),
  mediaId: z.string().uuid(),
  category: z.string().max(100).optional(),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});
