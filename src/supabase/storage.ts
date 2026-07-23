import { getSupabaseClient } from "./client";
import { getSupabaseAdminClient } from "./admin-client";
import supabaseConfig from "./config";

export interface UploadOptions {
  bucket?: string;
  folder?: string;
  upsert?: boolean;
}

export interface UploadResult {
  url: string;
  path: string;
  filename: string;
}

export async function uploadFile(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const {
    bucket = supabaseConfig.storage.buckets.media,
    folder = "/",
    upsert = false,
  } = options;

  const client = getSupabaseClient();
  const fileExt = file.name.split(".").pop() ?? "";
  const timestamp = Date.now();
  const randomId = crypto.randomUUID().slice(0, 8);
  const filename = `${timestamp}-${randomId}.${fileExt}`;
  const filePath = `${folder}/${filename}`.replace(/\/+/g, "/");

  const { data, error } = await client.storage
    .from(bucket)
    .upload(filePath, file, {
      upsert,
      contentType: file.type,
    });

  if (error) {
    throw new StorageError("Upload failed", { cause: error });
  }

  const { data: urlData } = client.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    url: urlData.publicUrl,
    path: data.path,
    filename,
  };
}

export async function deleteFile(
  path: string,
  bucket: string = supabaseConfig.storage.buckets.media
): Promise<void> {
  const client = getSupabaseAdminClient();

  const { error } = await client.storage.from(bucket).remove([path]);

  if (error) {
    throw new StorageError("Delete failed", { cause: error });
  }
}

export async function listFiles(
  folder: string,
  bucket: string = supabaseConfig.storage.buckets.media
) {
  const client = getSupabaseClient();

  const { data, error } = await client.storage
    .from(bucket)
    .list(folder, {
      sortBy: { column: "created_at", order: "desc" },
    });

  if (error) {
    throw new StorageError("List failed", { cause: error });
  }

  if (!data) return [];

  return data.map((file: { name: string; metadata?: { size?: number; mimetype?: string }; created_at?: string; updated_at?: string }) => ({
    name: file.name,
    size: file.metadata?.size ?? 0,
    mimeType: file.metadata?.mimetype ?? "unknown",
    created_at: file.created_at,
    updated_at: file.updated_at,
    url: client.storage.from(bucket).getPublicUrl(`${folder}/${file.name}`)
      .data.publicUrl,
  }));
}

export class StorageError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "StorageError";
  }
}

export const ALLOWED_IMAGE_TYPES = supabaseConfig.storage.allowedImageTypes;
export const ALLOWED_DOCUMENT_TYPES = supabaseConfig.storage.allowedDocumentTypes;
export const ALLOWED_VIDEO_TYPES = supabaseConfig.storage.allowedVideoTypes;
export const MAX_FILE_SIZE = supabaseConfig.storage.maxFileSize;
