"use server";

import { settingsRepository } from "@/repositories/settings";
import {
  ActionResult,
  success,
  handleServerError,
  requireRole,
} from "./utils";

export async function getSiteSettings() {
  try {
    const settings = await settingsRepository.getAll();
    return success(settings);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getSetting(key: string) {
  try {
    const value = await settingsRepository.get(key);
    return success({ key, value });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateSetting(
  key: string,
  value: unknown
): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await settingsRepository.set(key, value);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateSettings(
  settings: Record<string, unknown>
): Promise<ActionResult> {
  try {
    await requireRole("admin");

    for (const [key, value] of Object.entries(settings)) {
      await settingsRepository.set(key, value);
    }

    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteSetting(key: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await settingsRepository.delete(key);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
