"use server";

import { formRepository } from "@/repositories/form";
import { formSchema, formSubmissionSchema } from "@/schemas/form";
import {
  ActionResult,
  success,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function submitForm(
  formType: string,
  data: Record<string, unknown>
): Promise<ActionResult> {
  try {
    const form = await formRepository.getFormByType(formType);
    if (!form) {
      return { success: false, error: "Form not found" };
    }

    const submission = await formRepository.submitForm({
      form_id: form.id,
      data,
    });

    return success(submission);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function submitContactForm(data: Record<string, unknown>) {
  return submitForm("contact", data);
}

export async function submitConsultationForm(data: Record<string, unknown>) {
  return submitForm("consultation", data);
}

export async function getFormSubmissions(
  formId?: string,
  page = 1,
  limit = 20
) {
  try {
    await requireRole("marketing");

    const submissions = await formRepository.getSubmissions(formId, page, limit);
    return success(submissions);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getUnreadSubmissionCount() {
  try {
    await requireRole("marketing");
    const count = await formRepository.getUnreadCount();
    return success({ count });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function markSubmissionAsRead(id: string): Promise<ActionResult> {
  try {
    await requireRole("marketing");
    await formRepository.markAsRead(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteSubmission(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await formRepository.deleteSubmission(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
