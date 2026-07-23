"use server";

import { careerRepository } from "@/repositories/career";
import { careerPositionSchema, careerPositionUpdateSchema } from "@/schemas/career";
import {
  ActionResult,
  success,
  failure,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getCareerPositions(options?: {
  type?: string;
  department?: string;
}) {
  try {
    const positions = await careerRepository.findActive(options);
    return success(positions);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getCareerPositionBySlug(slug: string) {
  try {
    const position = await careerRepository.findBySlug(slug);
    if (!position) return failure("Position not found");
    return success(position);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getCareerDepartments() {
  try {
    const departments = await careerRepository.getDepartments();
    return success(departments);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createCareerPosition(
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const parsed = careerPositionSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const position = await careerRepository.create(parsed.data as any);
    return success(position);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateCareerPosition(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const parsed = careerPositionUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const position = await careerRepository.update(id, parsed.data as any);
    return success(position);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteCareerPosition(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await careerRepository.softDelete(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
