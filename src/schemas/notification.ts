import { z } from "zod";

export const notificationSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(["info", "success", "warning", "error"]).default("info"),
  title: z.string().min(1).max(200),
  message: z.string().max(2000).optional(),
  data: z.record(z.unknown()).optional(),
});

export const notificationUpdateSchema = z.object({
  isRead: z.boolean().optional(),
});

export type NotificationInput = z.infer<typeof notificationSchema>;
export type NotificationUpdateInput = z.infer<typeof notificationUpdateSchema>;
