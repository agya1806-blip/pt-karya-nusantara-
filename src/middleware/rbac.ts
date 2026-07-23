import { NextResponse } from "next/server";

export type Permission = {
  resource: string;
  action: "create" | "read" | "update" | "delete" | "publish" | "manage" | "*";
};

const rolePermissions: Record<string, Permission[]> = {
  super_admin: [{ resource: "*", action: "*" }],
  admin: [
    { resource: "users", action: "manage" },
    { resource: "settings", action: "manage" },
    { resource: "projects", action: "manage" },
    { resource: "services", action: "manage" },
    { resource: "blog", action: "manage" },
    { resource: "team", action: "manage" },
    { resource: "media", action: "manage" },
    { resource: "navigation", action: "manage" },
    { resource: "pages", action: "manage" },
    { resource: "forms", action: "manage" },
    { resource: "newsletter", action: "manage" },
    { resource: "career", action: "manage" },
    { resource: "redirects", action: "manage" },
  ],
  editor: [
    { resource: "projects", action: "create" },
    { resource: "projects", action: "read" },
    { resource: "projects", action: "update" },
    { resource: "services", action: "create" },
    { resource: "services", action: "read" },
    { resource: "services", action: "update" },
    { resource: "blog", action: "create" },
    { resource: "blog", action: "read" },
    { resource: "blog", action: "update" },
    { resource: "media", action: "manage" },
    { resource: "career", action: "create" },
    { resource: "career", action: "read" },
    { resource: "career", action: "update" },
    { resource: "gallery", action: "manage" },
  ],
  author: [
    { resource: "blog", action: "create" },
    { resource: "blog", action: "read" },
    { resource: "blog", action: "update" },
    { resource: "media", action: "create" },
    { resource: "media", action: "read" },
    { resource: "media", action: "update" },
  ],
  marketing: [
    { resource: "testimonials", action: "manage" },
    { resource: "faq", action: "manage" },
    { resource: "pricing", action: "manage" },
    { resource: "navigation", action: "manage" },
    { resource: "forms", action: "read" },
    { resource: "newsletter", action: "read" },
    { resource: "projects", action: "read" },
    { resource: "services", action: "read" },
    { resource: "blog", action: "read" },
    { resource: "media", action: "read" },
  ],
};

export function checkPermission(
  role: string,
  resource: string,
  action: string
): boolean {
  const permissions = rolePermissions[role];
  if (!permissions) return false;
  if (role === "super_admin") return true;

  return permissions.some(
    (p) =>
      p.resource === resource &&
      (p.action === action || p.action === "manage" || p.action === "*")
  );
}

export function getRolePermissions(role: string): Permission[] {
  return rolePermissions[role] ?? [];
}

export function hasMinimumRole(
  userRole: string,
  minimumRole: string
): boolean {
  const hierarchy = ["author", "marketing", "editor", "admin", "super_admin"];
  const userIndex = hierarchy.indexOf(userRole);
  const requiredIndex = hierarchy.indexOf(minimumRole);

  if (userIndex === -1 || requiredIndex === -1) return false;
  return userIndex >= requiredIndex;
}

export function requirePermission(
  role: string,
  resource: string,
  action: string
): void {
  if (!checkPermission(role, resource, action)) {
    throw new RBACError(
      `Insufficient permissions: ${role} cannot ${action} ${resource}`
    );
  }
}

export class RBACError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RBACError";
  }
}
