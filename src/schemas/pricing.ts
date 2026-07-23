import { z } from "zod";
import { slugSchema } from "./common";

export const pricingPlanSchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  description: z.string().max(500).optional(),
  price: z.number().positive(),
  currency: z.string().default("IDR"),
  period: z.string().default("project"),
  features: z.array(z.string()),
  isHighlighted: z.boolean().default(false),
  ctaText: z.string().default("Get Started"),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const pricingPlanUpdateSchema = pricingPlanSchema.partial();

export type PricingPlanInput = z.infer<typeof pricingPlanSchema>;
export type PricingPlanUpdateInput = z.infer<typeof pricingPlanUpdateSchema>;
