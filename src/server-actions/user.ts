"use server";

import { userRepository } from "@/repositories/user";
import { userSchema, userUpdateSchema } from "@/schemas/user";
import {
  ActionResult,
  success,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getUsers(page = 1, limit = 20) {
  try {
    await requireRole("admin");
    const users = await userRepository.findPaginated({}, page, limit);
    return success(users);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getUserById(id: string) {
  try {
    await requireRole("admin");
    const user = await userRepository.findById(id);
    if (!user) return { success: false, error: "User not found" } as ActionResult;
    return success(user);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createUser(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("admin");

    const parsed = userSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const user = await userRepository.create(parsed.data as any);
    return success(user);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateUser(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("admin");

    const parsed = userUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const user = await userRepository.update(id, parsed.data as any);
    return success(user);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteUser(id: string): Promise<ActionResult> {
  try {
    await requireRole("super_admin");
    await userRepository.softDelete(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getCurrentUserProfile() {
  try {
    const { getCurrentUser } = await import("./auth");
    const authUser = await getCurrentUser();
    if (!authUser) return { success: false, error: "Not authenticated" } as ActionResult;

    const user = await userRepository.findByEmail(authUser.email!);
    return success(user);
  } catch (error) {
    return handleServerError(error);
  }
}
