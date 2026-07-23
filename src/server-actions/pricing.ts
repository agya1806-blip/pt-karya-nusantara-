"use server";

import { pricingRepository } from "@/repositories/pricing";
import { pricingPlanSchema, pricingPlanUpdateSchema } from "@/schemas/pricing";
import {
  ActionResult,
  success,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getPricingPlans() {
  try {
    const plans = await pricingRepository.findActive();
    return success(plans);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createPricingPlan(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("marketing");

    const parsed = pricingPlanSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const plan = await pricingRepository.create(parsed.data as any);
    return success(plan);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updatePricingPlan(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("marketing");

    const parsed = pricingPlanUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const plan = await pricingRepository.update(id, parsed.data as any);
    return success(plan);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deletePricingPlan(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await pricingRepository.softDelete(id);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
