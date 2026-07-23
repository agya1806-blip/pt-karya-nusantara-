import { z } from "zod";
import { slugSchema } from "./common";

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

export const teamMemberUpdateSchema = teamMemberSchema.partial();

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type TeamMemberUpdateInput = z.infer<typeof teamMemberUpdateSchema>;
