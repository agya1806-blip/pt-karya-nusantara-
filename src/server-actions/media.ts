"use server";

import { mediaRepository } from "@/repositories/media";
import { mediaUpdateSchema } from "@/schemas/media";
import { uploadFile, deleteFile, StorageError } from "@/supabase/storage";
import {
  ActionResult,
  success,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function uploadMedia(
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireRole("author");

    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) ?? "/";
    const altText = formData.get("altText") as string | null;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const uploadResult = await uploadFile(file, { folder });

    const media = await mediaRepository.create({
      filename: uploadResult.filename,
      original_name: file.name,
      alt_text: altText ?? null,
      mime_type: file.type,
      file_size: file.size,
      url: uploadResult.url,
      folder,
      bucket: "media",
    } as any);

    return success(media);
  } catch (error) {
    if (error instanceof StorageError) {
      return { success: false, error: error.message };
    }
    return handleServerError(error);
  }
}

export async function getMediaList(options?: {
  folder?: string;
  mimeType?: string;
}) {
  try {
    let media;

    if (options?.folder) {
      media = await mediaRepository.findByFolder(options.folder);
    } else if (options?.mimeType) {
      media = await mediaRepository.findByMimeType(options.mimeType);
    } else {
      media = await mediaRepository.findAll(
        { deleted_at: null },
        { order: { column: "created_at", ascending: false } }
      );
    }

    return success(media);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function searchMedia(query: string) {
  try {
    const results = await mediaRepository.search(query);
    return success(results);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateMedia(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("author");

    const parsed = mediaUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const media = await mediaRepository.update(id, parsed.data as any);
    return success(media);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteMedia(id: string): Promise<ActionResult> {
  try {
    await requireRole("editor");

    const media = await mediaRepository.findById(id);
    if (!media) return { success: false, error: "Media not found" };

    await mediaRepository.softDelete(id);

    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getMediaById(id: string) {
  try {
    const media = await mediaRepository.findById(id);
    if (!media) return { success: false, error: "Media not found" };
    return success(media);
  } catch (error) {
    return handleServerError(error);
  }
}
