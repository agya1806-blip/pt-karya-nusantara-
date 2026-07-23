import { z } from "zod";
import { slugSchema } from "./common";

export const careerPositionSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  department: z.string().max(100).optional(),
  location: z.string().max(200).optional(),
  type: z.enum(["full-time", "part-time", "contract", "internship"]).default("full-time"),
  description: z.string().min(1).max(5000),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  isActive: z.boolean().default(true),
});

export const careerPositionUpdateSchema = careerPositionSchema.partial();

export type CareerPositionInput = z.infer<typeof careerPositionSchema>;
export type CareerPositionUpdateInput = z.infer<typeof careerPositionUpdateSchema>;
