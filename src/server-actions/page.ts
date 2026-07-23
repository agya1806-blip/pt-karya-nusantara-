"use server";

import { pageRepository } from "@/repositories/page";
import { pageSchema, pageUpdateSchema } from "@/schemas/page";
import {
  ActionResult,
  success,
  failure,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getPageBySlug(slug: string) {
  try {
    const page = await pageRepository.findPublishedBySlug(slug);
    if (!page) return failure("Page not found");
    return success(page);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getPages() {
  try {
    const pages = await pageRepository.findPublished();
    return success(pages);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createPage(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("admin");

    const parsed = pageSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const page = await pageRepository.create(parsed.data as any);
    return success(page);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updatePage(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("admin");

    const parsed = pageUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const page = await pageRepository.update(id, parsed.data as any);
    return success(page);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deletePage(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await pageRepository.softDelete(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
