"use server";

import { faqRepository } from "@/repositories/faq";
import { faqSchema, faqUpdateSchema } from "@/schemas/faq";
import {
  ActionResult,
  success,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getFAQs(options?: { category?: string }) {
  try {
    const faqs = await faqRepository.findPublished(options);
    return success(faqs);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getFAQCategories() {
  try {
    const categories = await faqRepository.getCategories();
    return success(categories);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createFAQ(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("marketing");

    const parsed = faqSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const faq = await faqRepository.create(parsed.data as any);
    return success(faq);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateFAQ(id: string, input: unknown): Promise<ActionResult> {
  try {
    await requireRole("marketing");

    const parsed = faqUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const faq = await faqRepository.update(id, parsed.data as any);
    return success(faq);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteFAQ(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await faqRepository.softDelete(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
