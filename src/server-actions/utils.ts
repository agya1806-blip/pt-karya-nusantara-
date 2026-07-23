"use server";

import { getSupabaseServerClient } from "@/supabase/server-client";

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export function success<T>(data?: T): ActionResult<T> {
  return { success: true, data };
}

export function failure(error: string): ActionResult {
  return { success: false, error };
}

export function validationError(fieldErrors: Record<string, string[]>): ActionResult {
  return { success: false, error: "Validation failed", fieldErrors };
}

export async function requireAuth() {
  const client = await getSupabaseServerClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    throw new AuthenticationError("Authentication required");
  }

  return user;
}

export async function requireRole(minimumRole: string) {
  const user = await requireAuth();

  const roleHierarchy = ["author", "marketing", "editor", "admin", "super_admin"];
  const userRoleIndex = roleHierarchy.indexOf((user as any).role ?? "author");
  const requiredRoleIndex = roleHierarchy.indexOf(minimumRole);

  if (userRoleIndex < requiredRoleIndex) {
    throw new AuthorizationError(
      `Insufficient permissions. Required role: ${minimumRole}`
    );
  }

  return user;
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export function handleServerError(error: unknown): ActionResult {
  if (error instanceof AuthenticationError) {
    return { success: false, error: "Please sign in to continue" };
  }

  if (error instanceof AuthorizationError) {
    return { success: false, error: "You do not have permission to perform this action" };
  }

  console.error("Server action error:", error);
  return { success: false, error: "An unexpected error occurred" };
}
