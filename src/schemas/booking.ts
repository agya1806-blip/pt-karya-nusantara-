import { z } from "zod";

export const bookingSchema = z.object({
  leadId: z.string().uuid().nullable().optional(),
  type: z.enum(["meeting", "consultation", "site_visit"]),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  scheduledAt: z.string().datetime(),
  durationMinutes: z.number().int().positive().optional(),
  location: z.string().max(500).optional(),
  clientName: z.string().min(1).max(100),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),
  assignedTo: z.string().uuid().nullable().optional(),
  notes: z.string().max(2000).optional(),
});

export const bookingUpdateSchema = bookingSchema.partial();

export type BookingInput = z.infer<typeof bookingSchema>;
export type BookingUpdateInput = z.infer<typeof bookingUpdateSchema>;
