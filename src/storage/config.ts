export const STORAGE_BUCKETS = {
  PUBLIC: "public",
  PRIVATE: "private",
  MEDIA: "media",
} as const;

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml", "image/gif"];
export const ALLOWED_DOCUMENT_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export const MAX_FILE_SIZES = {
  [STORAGE_BUCKETS.PUBLIC]: 10 * 1024 * 1024,
  [STORAGE_BUCKETS.PRIVATE]: 50 * 1024 * 1024,
  [STORAGE_BUCKETS.MEDIA]: 500 * 1024 * 1024,
} as const;

export const FOLDER_CONVENTION = {
  PROJECTS: "projects/{projectId}",
  BLOG: "blog/{postId}",
  SERVICES: "services/{serviceId}",
  TEAM: "team",
  GALLERY: "gallery",
  PROFILE: "profiles",
  DOCUMENTS: "documents",
  TEMP: "_temp",
} as const;

export function buildStoragePath(folder: string, filename: string): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${folder}/${year}/${month}/${filename}`;
}
