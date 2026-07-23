"use server";

import { serviceRepository } from "@/repositories/service";
import { serviceSchema, serviceUpdateSchema } from "@/schemas/service";
import { auditRepository } from "@/repositories/audit";
import {
  ActionResult,
  success,
  failure,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getServices(options?: {
  categoryId?: string;
  limit?: number;
}) {
  try {
    const services = await serviceRepository.findPublished(options);
    return success(services);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const service = await serviceRepository.findBySlug(slug);
    if (!service) return failure("Service not found");
    return success(service);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createService(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const parsed = serviceSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const service = await serviceRepository.create(parsed.data as any);

    await auditRepository.log({
      action: "create",
      entityType: "service",
      entityId: service.id,
    });

    return success(service);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateService(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const parsed = serviceUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const service = await serviceRepository.update(id, parsed.data as any);

    await auditRepository.log({
      action: "update",
      entityType: "service",
      entityId: id,
    });

    return success(service);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await serviceRepository.softDelete(id);

    await auditRepository.log({
      action: "delete",
      entityType: "service",
      entityId: id,
    });

    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getServiceCategories() {
  try {
    const categories = await serviceRepository.getCategories();
    return success(categories);
  } catch (error) {
    return handleServerError(error);
  }
}
