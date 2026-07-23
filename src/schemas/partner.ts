import { z } from "zod";
import { slugSchema } from "./common";

export const partnerSchema = z.object({
  name: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().max(1000).optional(),
  logoId: z.string().uuid().nullable().optional(),
  websiteUrl: z.string().url().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const partnerUpdateSchema = partnerSchema.partial();

export type PartnerInput = z.infer<typeof partnerSchema>;
export type PartnerUpdateInput = z.infer<typeof partnerUpdateSchema>;
