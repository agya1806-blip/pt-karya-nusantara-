import { z } from "zod";

export const careerApplicationSchema = z.object({
  positionId: z.string().uuid().nullable().optional(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  coverLetter: z.string().max(5000).optional(),
  resumeUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
  status: z
    .enum(["new", "reviewed", "shortlisted", "interviewed", "offered", "hired", "rejected"])
    .default("new"),
});

export const careerApplicationUpdateSchema = careerApplicationSchema.partial();

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
export type CareerApplicationUpdateInput = z.infer<typeof careerApplicationUpdateSchema>;
