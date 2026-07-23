import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
  category: z.string().max(100).optional(),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const faqUpdateSchema = faqSchema.partial();

export type FAQInput = z.infer<typeof faqSchema>;
export type FAQUpdateInput = z.infer<typeof faqUpdateSchema>;
