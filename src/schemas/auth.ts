import type { BaseEntity } from "./base";

export interface Role extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  is_system: boolean;
  sort_order: number;
}

export interface Permission extends BaseEntity {
  module: string;
  action: string;
  description: string | null;
}

export interface RolePermission extends BaseEntity {
  role_id: string;
  permission_id: string;
}

export interface UserRole extends BaseEntity {
  user_id: string;
  role_id: string;
}

export interface Profile extends BaseEntity {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  phone: string | null;
  bio: string | null;
  social_links: Record<string, string>;
  preferences: Record<string, unknown>;
  is_active: boolean;
  last_login_at: string | null;
}
