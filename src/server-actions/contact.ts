"use server";

import { contactRepository } from "@/repositories/contact";
import {
  ActionResult,
  success,
  handleServerError,
  requireRole,
} from "./utils";

export async function getContactInfo() {
  try {
    const info = await contactRepository.getContactInfo();
    return success(info);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getSocialMedia() {
  try {
    const social = await contactRepository.getSocialMedia();
    return success(social);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getBusinessHours() {
  try {
    const hours = await contactRepository.getBusinessHours();
    return success(hours);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getCompanyMilestones() {
  try {
    const milestones = await contactRepository.getMilestones();
    return success(milestones);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createMilestone(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("admin");
    const milestone = await contactRepository.createMilestone(input as any);
    return success(milestone);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateMilestone(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("admin");
    const milestone = await contactRepository.updateMilestone(id, input as any);
    return success(milestone);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteMilestone(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await contactRepository.deleteMilestone(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
