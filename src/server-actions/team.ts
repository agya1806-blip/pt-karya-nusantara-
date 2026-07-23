"use server";

import { teamRepository } from "@/repositories/team";
import { teamMemberSchema, teamMemberUpdateSchema } from "@/schemas/team";
import { auditRepository } from "@/repositories/audit";
import {
  ActionResult,
  success,
  failure,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getTeamMembers(options?: { isFeatured?: boolean }) {
  try {
    const members = await teamRepository.findActive(options);
    return success(members);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getTeamMemberBySlug(slug: string) {
  try {
    const member = await teamRepository.findBySlug(slug);
    if (!member) return failure("Team member not found");
    return success(member);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createTeamMember(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("admin");

    const parsed = teamMemberSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const member = await teamRepository.create(parsed.data as any);

    await auditRepository.log({
      action: "create",
      entityType: "team_member",
      entityId: member.id,
    });

    return success(member);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateTeamMember(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("admin");

    const parsed = teamMemberUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const member = await teamRepository.update(id, parsed.data as any);

    await auditRepository.log({
      action: "update",
      entityType: "team_member",
      entityId: id,
    });

    return success(member);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteTeamMember(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await teamRepository.softDelete(id);

    await auditRepository.log({
      action: "delete",
      entityType: "team_member",
      entityId: id,
    });

    return success();
  } catch (error) {
    return handleServerError(error);
  }
}
