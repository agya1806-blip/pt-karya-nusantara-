import { BaseRepository } from "./base";
import type { PaginatedResult } from "./base";

interface UserRecord {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export class UserRepository extends BaseRepository<UserRecord> {
  constructor() {
    super("users");
  }

  async findByEmail(email: string) {
    const users = await this.findAll({ email });
    return users[0] ?? null;
  }

  async findPaginated(
    filters: Record<string, unknown> = {},
    page = 1,
    limit = 20
  ): Promise<PaginatedResult<UserRecord>> {
    return super.findPaginated(filters, page, limit, "created_at", false);
  }

  async updateLastLogin(id: string) {
    return this.update(id, {
      last_login_at: new Date().toISOString(),
    } as any);
  }

  async getPermissions(userId: string): Promise<string[]> {
    const client = await this.getClient(true);
    const { data, error } = await client
      .from("role_permissions")
      .select("permission:permission_id(resource, action)")
      .eq("role_id", userId);

    if (error) return [];

    return data.map(
      (rp: any) => `${rp.permission.resource}:${rp.permission.action}`
    );
  }

  async hasPermission(userId: string, resource: string, action: string): Promise<boolean> {
    const permissions = await this.getPermissions(userId);
    return (
      permissions.includes(`${resource}:*`) ||
      permissions.includes(`${resource}:${action}`)
    );
  }
}

export const userRepository = new UserRepository();
