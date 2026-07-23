import { getSupabaseAdminClient } from "@/supabase/admin-client";

export class AuditRepository {
  async log(input: {
    userId?: string;
    action: string;
    entityType: string;
    entityId?: string;
    changes?: Record<string, unknown>;
    ipAddress?: string;
  }) {
    const client = await getSupabaseAdminClient();
    const { error } = await client.from("audit_logs").insert({
      user_id: input.userId ?? null,
      action: input.action,
      entity_type: input.entityType,
      entity_id: input.entityId ?? null,
      changes: input.changes ?? null,
      ip_address: input.ipAddress ?? null,
    });

    if (error) {
      console.error("Failed to create audit log:", error);
    }
  }

  async logActivity(input: {
    userId?: string;
    action: string;
    details?: Record<string, unknown>;
  }) {
    const client = await getSupabaseAdminClient();
    const { error } = await client.from("activity_logs").insert({
      user_id: input.userId ?? null,
      action: input.action,
      details: input.details ?? null,
    });

    if (error) {
      console.error("Failed to create activity log:", error);
    }
  }

  async logAuth(input: {
    email: string;
    action: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    const client = await getSupabaseAdminClient();
    const { error } = await client.from("auth_logs").insert({
      email: input.email,
      action: input.action,
      ip_address: input.ipAddress ?? null,
      user_agent: input.userAgent ?? null,
    });

    if (error) {
      console.error("Failed to create auth log:", error);
    }
  }

  async getAuditLogs(page = 1, limit = 50) {
    const client = await getSupabaseAdminClient();
    const offset = (page - 1) * limit;

    const { data, count, error } = await client
      .from("audit_logs")
      .select("*, user:user_id(id, name, email)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data: data ?? [],
      total: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit),
    };
  }
}

export const auditRepository = new AuditRepository();
