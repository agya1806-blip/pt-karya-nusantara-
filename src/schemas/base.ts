export type EntityStatus = "draft" | "published" | "archived" | "deleted";
export type VisibilityLevel = "public" | "private" | "password" | "draft";
export type LeadStatus = "new" | "contacted" | "qualified" | "proposal_sent" | "won" | "lost";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "rescheduled";
export type NotificationType = "email" | "dashboard" | "whatsapp" | "push";
export type NotificationPriority = "low" | "medium" | "high" | "urgent";
export type ApplicationStatus = "new" | "reviewed" | "shortlisted" | "interviewed" | "offered" | "hired" | "rejected";
export type ConsultationType = "virtual" | "in_person" | "site_visit";

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface SoftDeletable {
  deleted_at: string | null;
}

export interface Publishable {
  status: EntityStatus;
  published_at: string | null;
}

export interface Sluggable {
  slug: string;
}

export interface SEOMetadata {
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_image?: string | null;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  status?: EntityStatus;
  category?: string;
  featured?: boolean;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  filters?: Record<string, string>;
}
