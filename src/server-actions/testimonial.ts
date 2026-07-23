"use server";

import { testimonialRepository } from "@/repositories/testimonial";
import { testimonialSchema, testimonialUpdateSchema } from "@/schemas/testimonial";
import { auditRepository } from "@/repositories/audit";
import {
  ActionResult,
  success,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getTestimonials(options?: { featured?: boolean }) {
  try {
    if (options?.featured) {
      const testimonials = await testimonialRepository.findFeatured();
      return success(testimonials);
    }

    const testimonials = await testimonialRepository.findAll(
      { deleted_at: null },
      { order: { column: "sort_order", ascending: true } }
    );

    return success(testimonials);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createTestimonial(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("marketing");

    const parsed = testimonialSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const testimonial = await testimonialRepository.create(parsed.data as any);

    await auditRepository.log({
      action: "create",
      entityType: "testimonial",
      entityId: testimonial.id,
    });

    return success(testimonial);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateTestimonial(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("marketing");

    const parsed = testimonialUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const testimonial = await testimonialRepository.update(id, parsed.data as any);

    await auditRepository.log({
      action: "update",
      entityType: "testimonial",
      entityId: id,
    });

    return success(testimonial);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await testimonialRepository.softDelete(id);

    await auditRepository.log({
      action: "delete",
      entityType: "testimonial",
      entityId: id,
    });

    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
