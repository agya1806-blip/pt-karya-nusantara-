import { z } from "zod";

export const leadSchema = z.object({
  source: z.string().min(1),
  status: z.enum(["new", "contacted", "qualified", "proposal", "won", "lost"]).default("new"),
  name: z.string().min(1).max(100),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().max(200).optional(),
  message: z.string().max(5000).optional(),
  metadata: z.record(z.unknown()).optional(),
  assignedTo: z.string().uuid().nullable().optional(),
});

export const leadUpdateSchema = leadSchema.partial();

export const leadActivitySchema = z.object({
  leadId: z.string().uuid(),
  type: z.string().min(1),
  description: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;
export type LeadActivityInput = z.infer<typeof leadActivitySchema>;
