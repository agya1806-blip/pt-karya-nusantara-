import type { BaseEntity, NotificationType, NotificationPriority } from "./base";

export interface Notification extends BaseEntity {
  user_id: string | null;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string | null;
  link: string | null;
  metadata: Record<string, unknown>;
  is_read: boolean;
  read_at: string | null;
}

export interface ActivityLog extends BaseEntity {
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  description: string | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
}

export interface AuditLog extends BaseEntity {
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_values: Record<string, unknown>;
  new_values: Record<string, unknown>;
  diff: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
}
