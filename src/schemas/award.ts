import { z } from "zod";

export const awardSchema = z.object({
  title: z.string().min(1).max(200),
  organization: z.string().max(200).optional(),
  year: z.string().min(1).max(20),
  description: z.string().max(1000).optional(),
  imageId: z.string().uuid().nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const awardUpdateSchema = awardSchema.partial();

export type AwardInput = z.infer<typeof awardSchema>;
export type AwardUpdateInput = z.infer<typeof awardUpdateSchema>;
