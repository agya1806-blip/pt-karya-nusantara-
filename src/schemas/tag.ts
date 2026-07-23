import { z } from "zod";
import { slugSchema } from "./common";

export const tagSchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  type: z.string().max(50).optional(),
});

export const tagUpdateSchema = tagSchema.partial();

export const taggableSchema = z.object({
  tagId: z.string().uuid(),
  taggableId: z.string().uuid(),
  taggableType: z.string().min(1),
});

export type TagInput = z.infer<typeof tagSchema>;
export type TagUpdateInput = z.infer<typeof tagUpdateSchema>;
export type TaggableInput = z.infer<typeof taggableSchema>;
