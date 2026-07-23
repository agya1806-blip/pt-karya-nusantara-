import { z } from "zod";

export const newsletterSubscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
});

export const newsletterUpdateSchema = z.object({
  name: z.string().max(100).optional(),
  isActive: z.boolean().optional(),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;
export type NewsletterUpdateInput = z.infer<typeof newsletterUpdateSchema>;
