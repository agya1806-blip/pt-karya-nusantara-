import type { BaseEntity, EntityStatus, SoftDeletable } from "./base";
import type { Project } from "./content";

export interface ServiceCategory extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Service extends BaseEntity, SoftDeletable {
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  content: Record<string, unknown>;
  category_id: string | null;
  icon: string | null;
  image_url: string | null;
  price_range: string | null;
  duration: string | null;
  features: string[];
  process: Record<string, unknown>[];
  faq: Record<string, unknown>[];
  status: EntityStatus;
  featured: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  published_at: string | null;
  created_by: string | null;
  category?: ServiceCategory;
}

export interface Client extends BaseEntity {
  name: string;
  slug: string;
  logo_url: string | null;
  website_url: string | null;
  industry: string | null;
  description: string | null;
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface Testimonial extends BaseEntity {
  client_name: string;
  client_role: string | null;
  client_company: string | null;
  client_avatar: string | null;
  content: string;
  rating: number | null;
  project_id: string | null;
  service_id: string | null;
  featured: boolean;
  status: EntityStatus;
  sort_order: number;
  published_at: string | null;
  created_by: string | null;
  project?: Project;
}

export interface FAQCategory extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface FAQ extends BaseEntity {
  question: string;
  answer: string;
  category_id: string | null;
  sort_order: number;
  is_featured: boolean;
  status: EntityStatus;
  created_by: string | null;
}

export interface TeamMember extends BaseEntity {
  name: string;
  slug: string;
  job_title: string;
  department: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  expertise: string[];
  social_links: Record<string, string>;
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
  status: EntityStatus;
  created_by: string | null;
}

export interface Award extends BaseEntity {
  title: string;
  slug: string;
  organization: string | null;
  description: string | null;
  year: number | null;
  image_url: string | null;
  project_id: string | null;
  url: string | null;
  sort_order: number;
  is_featured: boolean;
  status: EntityStatus;
  published_at: string | null;
  created_by: string | null;
  project?: Project;
}

export interface Partner extends BaseEntity {
  name: string;
  slug: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  partnership_type: string | null;
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
  created_by: string | null;
}
