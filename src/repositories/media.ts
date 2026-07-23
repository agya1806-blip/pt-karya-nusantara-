import { BaseRepository } from "./base";

interface MediaRecord {
  id: string;
  filename: string;
  original_name: string;
  alt_text: string | null;
  caption: string | null;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  url: string;
  bucket: string;
  folder: string;
  tags: string[];
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class MediaRepository extends BaseRepository<MediaRecord> {
  constructor() {
    super("media_library");
  }

  async findByFolder(folder: string) {
    return this.findAll(
      { folder, deleted_at: null },
      { order: { column: "created_at", ascending: false } }
    );
  }

  async findByMimeType(mimeType: string) {
    return this.findAll(
      { mime_type: mimeType, deleted_at: null },
      { order: { column: "created_at", ascending: false } }
    );
  }

  async search(query: string) {
    const client = await this.getClient();
    const { data, error } = await client
      .from("media_library")
      .select("*")
      .or(`original_name.ilike.%${query}%,alt_text.ilike.%${query}%,tags.cs.{${query}}`)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as MediaRecord[];
  }
}

export const mediaRepository = new MediaRepository();
