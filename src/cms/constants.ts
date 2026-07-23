export const CMS_NAME = "Karya Nusantara CMS";
export const CMS_VERSION = "1.0.0";

export const DEFAULT_PAGE_SIZE = 20;

export const CONTENT_STATUS = {
  DRAFT: "draft" as const,
  PUBLISHED: "published" as const,
  ARCHIVED: "archived" as const,
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: "super_admin" as const,
  ADMIN: "admin" as const,
  EDITOR: "editor" as const,
  AUTHOR: "author" as const,
  MARKETING: "marketing" as const,
} as const;

export const ROLE_HIERARCHY: Record<string, number> = {
  author: 0,
  marketing: 1,
  editor: 2,
  admin: 3,
  super_admin: 4,
};

export const FORM_TYPES = {
  CONTACT: "contact" as const,
  CONSULTATION: "consultation" as const,
  CAREER: "career" as const,
  NEWSLETTER: "newsletter" as const,
} as const;

export const JOB_TYPES = {
  FULL_TIME: "full-time" as const,
  PART_TIME: "part-time" as const,
  CONTRACT: "contract" as const,
  INTERNSHIP: "internship" as const,
} as const;

export const REDIRECT_STATUS_CODES = [301, 302, 307, 308] as const;

export const MEDIA_FOLDERS = ["/", "/projects", "/services", "/blog", "/team", "/gallery", "/about"];

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
