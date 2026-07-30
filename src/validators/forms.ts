import { z } from "zod";
import {
  leadStatusSchema,
  bookingStatusSchema,
  bookingTypeSchema,
  applicationStatusSchema,
} from "./common";

export const contactMessageSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export const contactUpdateSchema = z.object({
  isRead: z.boolean().optional(),
  notes: z.string().optional(),
});

export const bookingSchema = z.object({
  leadId: z.string().uuid().nullable().optional(),
  type: bookingTypeSchema,
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  scheduledAt: z.string().datetime(),
  durationMinutes: z.number().int().positive().optional(),
  location: z.string().max(500).optional(),
  clientName: z.string().min(1).max(100),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

export const bookingUpdateSchema = bookingSchema.partial().extend({
  status: bookingStatusSchema.optional(),
  assignedTo: z.string().uuid().nullable().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
});

export const jobPositionSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1),
  department: z.string().max(100).optional(),
  location: z.string().max(200).optional(),
  type: z.enum(["full-time", "part-time", "contract", "internship"]),
  description: z.string().min(1).max(5000),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  isActive: z.boolean().default(true),
});

export const careerApplicationSchema = z.object({
  positionId: z.string().uuid().nullable().optional(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  coverLetter: z.string().max(5000).optional(),
  resumeUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
});

export const leadSchema = z.object({
  source: z.string().min(1),
  name: z.string().min(1).max(100),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().max(200).optional(),
  message: z.string().max(5000).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const leadUpdateSchema = z.object({
  status: leadStatusSchema.optional(),
  assignedTo: z.string().uuid().nullable().optional(),
  message: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const notificationSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(["info", "success", "warning", "error"]).default("info"),
  title: z.string().min(1).max(200),
  message: z.string().max(2000).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});
