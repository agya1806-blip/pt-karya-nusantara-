import { z } from "zod";

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

export const testimonialUpdateSchema = testimonialSchema.partial();

export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type TestimonialUpdateInput = z.infer<typeof testimonialUpdateSchema>;
