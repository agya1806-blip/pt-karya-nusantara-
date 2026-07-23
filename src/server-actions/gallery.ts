"use server";

import { galleryRepository } from "@/repositories/gallery";
import { galleryItemSchema, galleryItemUpdateSchema } from "@/schemas/gallery";
import {
  ActionResult,
  success,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getGalleryItems(options?: {
  category?: string;
  featured?: boolean;
}) {
  try {
    const items = await galleryRepository.findPublished(options);
    return success(items);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getGalleryCategories() {
  try {
    const categories = await galleryRepository.getCategories();
    return success(categories);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createGalleryItem(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const parsed = galleryItemSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const item = await galleryRepository.create(parsed.data as any);
    return success(item);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateGalleryItem(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const parsed = galleryItemUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const item = await galleryRepository.update(id, parsed.data as any);
    return success(item);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteGalleryItem(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await galleryRepository.softDelete(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
