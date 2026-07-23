import { z } from "zod";

export const galleryItemSchema = z.object({
  title: z.string().max(200).optional(),
  mediaId: z.string().uuid(),
  category: z.string().max(100).optional(),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

export const galleryItemUpdateSchema = galleryItemSchema.partial();

export type GalleryItemInput = z.infer<typeof galleryItemSchema>;
export type GalleryItemUpdateInput = z.infer<typeof galleryItemUpdateSchema>;
