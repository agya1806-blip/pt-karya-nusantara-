import { z } from "zod";

export const navigationItemSchema = z.object({
  label: z.string().min(1).max(100),
  url: z.string().min(1),
  icon: z.string().max(100).optional(),
  parentId: z.string().uuid().nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const navigationItemUpdateSchema = navigationItemSchema.partial();

export type NavigationItemInput = z.infer<typeof navigationItemSchema>;
export type NavigationItemUpdateInput = z.infer<typeof navigationItemUpdateSchema>;
