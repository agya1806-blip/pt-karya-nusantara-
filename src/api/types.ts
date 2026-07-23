export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export interface PaginatedAPIResponse<T> extends APIResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface APIError {
  code: string;
  message: string;
  statusCode: number;
}

export const API_ERRORS = {
  NOT_FOUND: { code: "NOT_FOUND", message: "Resource not found", statusCode: 404 },
  UNAUTHORIZED: { code: "UNAUTHORIZED", message: "Authentication required", statusCode: 401 },
  FORBIDDEN: { code: "FORBIDDEN", message: "Insufficient permissions", statusCode: 403 },
  VALIDATION_ERROR: { code: "VALIDATION_ERROR", message: "Validation failed", statusCode: 422 },
  INTERNAL_ERROR: { code: "INTERNAL_ERROR", message: "Internal server error", statusCode: 500 },
  RATE_LIMITED: { code: "RATE_LIMITED", message: "Too many requests", statusCode: 429 },
} as const;

export function apiSuccess<T>(data: T): APIResponse<T> {
  return { success: true, data };
}

export function apiError(error: APIError): APIResponse {
  return { success: false, error: error.message };
}

export function apiPaginated<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedAPIResponse<T> {
  return {
    success: true,
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
