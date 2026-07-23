import { createServerClient } from "@/repositories/client";
import { STORAGE_BUCKETS, MAX_FILE_SIZES, ALLOWED_IMAGE_TYPES, buildStoragePath } from "./config";
import type { ApiResponse } from "@/schemas/base";

export interface UploadOptions {
  file: File;
  bucket?: string;
  folder?: string;
  isPublic?: boolean;
}

export interface UploadResult {
  url: string;
  path: string;
  filename: string;
  size: number;
  mimeType: string;
}

export async function uploadFile(options: UploadOptions): Promise<ApiResponse<UploadResult>> {
  const { file, bucket = STORAGE_BUCKETS.PUBLIC, folder = "_temp", isPublic = true } = options;

  if (file.size > MAX_FILE_SIZES[bucket as keyof typeof MAX_FILE_SIZES]) {
    return { success: false, error: `File size exceeds ${MAX_FILE_SIZES[bucket as keyof typeof MAX_FILE_SIZES] / 1024 / 1024}MB limit` };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type) && bucket !== STORAGE_BUCKETS.PRIVATE) {
    return { success: false, error: "File type not supported" };
  }

  const supabase = createServerClient();
  const path = buildStoragePath(folder, `${Date.now()}-${file.name}`);
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });

  if (error) return { success: false, error: error.message };

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);

  return {
    success: true,
    data: { url: urlData.publicUrl, path, filename: file.name, size: file.size, mimeType: file.type },
  };
}

export async function deleteFile(path: string, bucket: string = STORAGE_BUCKETS.PUBLIC): Promise<ApiResponse<void>> {
  const supabase = createServerClient();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function listFiles(folder: string, bucket: string = STORAGE_BUCKETS.MEDIA): Promise<ApiResponse<{ name: string; url: string }[]>> {
  const supabase = createServerClient();
  const { data, error } = await supabase.storage.from(bucket).list(folder);
  if (error) return { success: false, error: error.message };
  const files = data.map((f) => {
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(`${folder}/${f.name}`);
    return { name: f.name, url: urlData.publicUrl };
  });
  return { success: true, data: files };
}
