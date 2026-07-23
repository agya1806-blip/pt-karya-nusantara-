import { z } from "zod";

export const userRoleSchema = z.enum(["super_admin", "admin", "editor", "author", "marketing"]);

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  avatarUrl: z.string().url().optional(),
  role: userRoleSchema.default("editor"),
  isActive: z.boolean().default(true),
});

export const userUpdateSchema = userSchema.partial();

export const permissionSchema = z.object({
  resource: z.string().min(1),
  action: z.enum(["create", "read", "update", "delete", "publish", "manage", "*"]),
  description: z.string().optional(),
});

export const rolePermissionSchema = z.object({
  roleId: z.string().uuid(),
  permissionId: z.string().uuid(),
});

export type UserInput = z.infer<typeof userSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type PermissionInput = z.infer<typeof permissionSchema>;
export type RolePermissionInput = z.infer<typeof rolePermissionSchema>;
