import { z } from "zod";

const phoneRegex = /^[+]?[0-9\s()-]{8,20}$/;

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number").optional().or(z.literal("")),
  projectType: z.string().min(1, "Please select a project type"),
  areaSize: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  preferredContact: z.enum(["email", "phone", "whatsapp"]).default("email"),
  agreeToTerms: z.literal(true, { errorMap: () => ({ message: "You must agree to proceed" }) }),
});

export const callbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  preferredTime: z.enum(["morning", "afternoon", "evening"]),
  urgent: z.boolean().default(false),
});

export const downloadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  role: z.string().optional(),
  interest: z.string().optional(),
  agreeToContact: z.boolean().default(false),
});

export const leadMagnetSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number").optional().or(z.literal("")),
  projectType: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name is required").optional(),
  interests: z.array(z.string()).optional(),
  agreeToPrivacy: z.literal(true, { errorMap: () => ({ message: "You must agree to receive communications" }) }),
});

export const floatingConsultationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
export type CallbackFormData = z.infer<typeof callbackSchema>;
export type DownloadFormData = z.infer<typeof downloadSchema>;
export type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type FloatingConsultationFormData = z.infer<typeof floatingConsultationSchema>;
