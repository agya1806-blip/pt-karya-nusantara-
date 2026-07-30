import { z } from "zod";

export const auditLogSchema = z.object({
  userId: z.string().uuid().nullable(),
  action: z.string().min(1),
  entityType: z.string().min(1),
  entityId: z.string().uuid().nullable(),
  changes: z.record(z.string(), z.unknown()).optional(),
  ipAddress: z.string().optional(),
});

export const activityLogSchema = z.object({
  userId: z.string().uuid().nullable(),
  action: z.string().min(1),
  details: z.record(z.string(), z.unknown()).optional(),
});

export const authLogSchema = z.object({
  email: z.string().email(),
  action: z.string().min(1),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

export type AuditLogInput = z.infer<typeof auditLogSchema>;
export type ActivityLogInput = z.infer<typeof activityLogSchema>;
export type AuthLogInput = z.infer<typeof authLogSchema>;
