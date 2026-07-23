import { z } from "zod";

export const mediaSchema = z.object({
  filename: z.string().min(1),
  originalName: z.string().min(1),
  altText: z.string().max(500).optional(),
  caption: z.string().max(1000).optional(),
  mimeType: z.string().min(1),
  fileSize: z.number().int().positive(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  url: z.string(),
  bucket: z.string().default("media"),
  folder: z.string().default("/"),
  tags: z.array(z.string()).optional(),
  uploadedBy: z.string().uuid().nullable().optional(),
});

export const mediaUpdateSchema = z.object({
  altText: z.string().max(500).optional(),
  caption: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
  folder: z.string().optional(),
});

export type MediaInput = z.infer<typeof mediaSchema>;
export type MediaUpdateInput = z.infer<typeof mediaUpdateSchema>;
