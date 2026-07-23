"use server";

import { newsletterRepository } from "@/repositories/newsletter";
import { newsletterSubscribeSchema } from "@/schemas/newsletter";
import {
  ActionResult,
  success,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function subscribeToNewsletter(
  input: unknown
): Promise<ActionResult> {
  try {
    const parsed = newsletterSubscribeSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const existing = await newsletterRepository.findByEmail(parsed.data.email);
    if (existing) {
      return { success: false, error: "This email is already subscribed" };
    }

    const subscriber = await newsletterRepository.subscribe(parsed.data as any);
    return success(subscriber);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function unsubscribeFromNewsletter(
  email: string
): Promise<ActionResult> {
  try {
    await newsletterRepository.unsubscribe(email);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getNewsletterSubscribers(page = 1, limit = 20) {
  try {
    await requireRole("marketing");
    const subscribers = await newsletterRepository.getSubscribers(page, limit);
    return success(subscribers);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getActiveSubscriberCount() {
  try {
    const count = await newsletterRepository.getActiveCount();
    return success({ count });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function exportNewsletterSubscribers() {
  try {
    await requireRole("admin");
    const subscribers = await newsletterRepository.exportActive();
    return success(subscribers);
  } catch (error) {
    return handleServerError(error);
  }
}
