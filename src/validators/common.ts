import { z } from "zod";

export const slugSchema = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a valid slug");

export const entityStatusSchema = z.enum(["draft", "published", "archived"]);

export const visibilitySchema = z.enum(["public", "private", "password"]);

export const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
]);

export const bookingStatusSchema = z.enum([
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);

export const bookingTypeSchema = z.enum([
  "meeting",
  "consultation",
  "site_visit",
]);

export const applicationStatusSchema = z.enum([
  "new",
  "reviewed",
  "shortlisted",
  "interviewed",
  "offered",
  "hired",
  "rejected",
]);

export const notificationTypeSchema = z.enum([
  "info",
  "success",
  "warning",
  "error",
]);

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export const listParamsSchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  isFeatured: z.coerce.boolean().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
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
  canonicalUrl: z.string().url().optional(),
  jsonLd: z.record(z.unknown()).optional(),
  robots: z.string().optional(),
});

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-()]{7,20}$/, "Invalid phone number");

export const emailSchema = z.string().email();
