import { z } from "zod";

export const formFieldSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["text", "email", "tel", "textarea", "select", "file", "checkbox", "radio"]),
  label: z.string().min(1),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
});

export const formSchema = z.object({
  type: z.enum(["contact", "consultation", "career", "newsletter"]),
  title: z.string().min(1).max(200),
  fields: z.array(formFieldSchema),
  isActive: z.boolean().default(true),
});

export const formSubmissionSchema = z.object({
  formId: z.string().uuid(),
  data: z.record(z.unknown()),
});

export type FormFieldInput = z.infer<typeof formFieldSchema>;
export type FormInput = z.infer<typeof formSchema>;
export type FormSubmissionInput = z.infer<typeof formSubmissionSchema>;
