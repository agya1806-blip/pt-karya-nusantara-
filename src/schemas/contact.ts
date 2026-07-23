import { z } from "zod";

export const contactInfoSchema = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(500),
  icon: z.string().max(100).optional(),
  href: z.string().max(500).optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const socialMediaSchema = z.object({
  platform: z.string().min(1).max(100),
  url: z.string().url(),
  icon: z.string().max(100).optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const businessHoursSchema = z.object({
  day: z.string().min(1).max(20),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
  isClosed: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

export const companyMilestoneSchema = z.object({
  year: z.string().min(1).max(20),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  imageId: z.string().uuid().nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export type ContactInfoInput = z.infer<typeof contactInfoSchema>;
export type SocialMediaInput = z.infer<typeof socialMediaSchema>;
export type BusinessHoursInput = z.infer<typeof businessHoursSchema>;
export type CompanyMilestoneInput = z.infer<typeof companyMilestoneSchema>;
