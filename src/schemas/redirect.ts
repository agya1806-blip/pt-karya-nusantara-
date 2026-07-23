import { z } from "zod";

export const redirectSchema = z.object({
  source: z.string().min(1).max(500),
  destination: z.string().min(1).max(500),
  statusCode: z.number().int().refine((v) => [301, 302, 307, 308].includes(v), {
    message: "Must be a valid redirect status code (301, 302, 307, 308)",
  }).default(301),
  isActive: z.boolean().default(true),
});

export const redirectUpdateSchema = redirectSchema.partial();

export type RedirectInput = z.infer<typeof redirectSchema>;
export type RedirectUpdateInput = z.infer<typeof redirectUpdateSchema>;
