"use server";

import { navigationRepository } from "@/repositories/navigation";
import { navigationItemSchema, navigationItemUpdateSchema } from "@/schemas/navigation";
import {
  ActionResult,
  success,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getNavigation() {
  try {
    const items = await navigationRepository.findTree();
    return success(items);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getFlatNavigation() {
  try {
    const items = await navigationRepository.findActive();
    return success(items);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createNavigationItem(
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("marketing");

    const parsed = navigationItemSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const item = await navigationRepository.create(parsed.data as any);
    return success(item);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateNavigationItem(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("marketing");

    const parsed = navigationItemUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const item = await navigationRepository.update(id, parsed.data as any);
    return success(item);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteNavigationItem(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await navigationRepository.softDelete(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
