import type { ApiResponse } from "@/schemas/base";

export type ActionResponse<T = unknown> = Promise<ApiResponse<T>>;

export function success<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

export function failure(error: string): ApiResponse<never> {
  return { success: false, error };
}

export function parseError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "An unexpected error occurred";
}

export function requireAuth(context: { user?: unknown }): asserts context is { user: NonNullable<typeof context.user> } {
  if (!context.user) throw new Error("Authentication required");
}
