"use server";

import { projectRepository } from "@/repositories/project";
import { projectSchema, projectUpdateSchema } from "@/schemas/project";
import { auditRepository } from "@/repositories/audit";
import {
  ActionResult,
  success,
  failure,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getProjects(options?: {
  categoryId?: string;
  isFeatured?: boolean;
  limit?: number;
}) {
  try {
    const projects = await projectRepository.findPublished(options);
    return success(projects);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await projectRepository.findBySlug(slug);
    if (!project) return failure("Project not found");
    return success(project);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await projectRepository.findById(id);
    if (!project) return failure("Project not found");
    return success(project);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createProject(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const parsed = projectSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const project = await projectRepository.create(parsed.data as any);

    await auditRepository.log({
      action: "create",
      entityType: "project",
      entityId: project.id,
    });

    return success(project);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateProject(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const parsed = projectUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const project = await projectRepository.update(id, parsed.data as any);

    await auditRepository.log({
      action: "update",
      entityType: "project",
      entityId: id,
      changes: parsed.data as any,
    });

    return success(project);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");

    await projectRepository.softDelete(id);

    await auditRepository.log({
      action: "delete",
      entityType: "project",
      entityId: id,
    });

    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getProjectCategories() {
  try {
    const categories = await projectRepository.getCategories();
    return success(categories);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getProjectImages(projectId: string) {
  try {
    const images = await projectRepository.getProjectImages(projectId);
    return success(images);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function addProjectImage(
  projectId: string,
  mediaId: string
): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const result = await projectRepository.addProjectImage({
      project_id: projectId,
      media_id: mediaId,
      sort_order: 0,
    });

    return success(result);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function removeProjectImage(
  projectId: string,
  mediaId: string
): Promise<ActionResult> {
  try {
    await requireRole("editor");
    await projectRepository.removeProjectImage(projectId, mediaId);
    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
