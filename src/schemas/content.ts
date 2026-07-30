import type { BaseEntity, EntityStatus, VisibilityLevel, SoftDeletable } from "./base";

export interface ProjectCategory extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  media_id: string | null;
  url: string;
  alt: string | null;
  caption: string | null;
  sort_order: number;
  is_primary: boolean;
  width: number | null;
  height: number | null;
  file_size: number | null;
  format: string | null;
  created_at: string;
}

export interface ProjectVideo {
  id: string;
  project_id: string;
  url: string;
  title: string | null;
  provider: string;
  video_id: string | null;
  thumbnail_url: string | null;
  duration: number | null;
  sort_order: number;
  is_featured: boolean;
  created_at: string;
}

export interface Project extends BaseEntity, SoftDeletable {
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  content: Record<string, unknown>;
  category_id: string | null;
  location: string | null;
  building_type: string | null;
  style: string | null;
  area_size: number | null;
  budget: number | null;
  currency: string;
  year: number | null;
  duration: string | null;
  status: EntityStatus;
  visibility: VisibilityLevel;
  password: string | null;
  featured: boolean;
  sort_order: number;
  client_name: string | null;
  client_testimonial: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image: string | null;
  published_at: string | null;
  created_by: string | null;
  images?: ProjectImage[];
  videos?: ProjectVideo[];
  category?: ProjectCategory;
  tags?: Tag[];
}
export interface BlogCategory extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Author extends BaseEntity {
  name: string;
  slug: string;
  avatar_url: string | null;
  bio: string | null;
  job_title: string | null;
  email: string | null;
  social_links: Record<string, string>;
  is_active: boolean;
}

export interface BlogPost extends BaseEntity, SoftDeletable {
  title: string;
  slug: string;
  excerpt: string | null;
  content: Record<string, unknown>;
  category_id: string | null;
  author_id: string | null;
  featured_image: string | null;
  featured: boolean;
  status: EntityStatus;
  visibility: VisibilityLevel;
  password: string | null;
  reading_time: number | null;
  allow_comments: boolean;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image: string | null;
  canonical_url: string | null;
  published_at: string | null;
  created_by: string | null;
  category?: BlogCategory;
  author?: Author;
  tags?: Tag[];
}

export interface Tag extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
}

export interface Taggable extends BaseEntity {
  tag_id: string;
  taggable_id: string;
  taggable_type: string;
}
