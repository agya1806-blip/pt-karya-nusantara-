import { BaseRepository } from "./base";

interface GalleryItemRecord {
  id: string;
  title: string | null;
  media_id: string;
  category: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class GalleryRepository extends BaseRepository<GalleryItemRecord> {
  constructor() {
    super("gallery_items", "*, media:media_id(*)");
  }

  async findPublished(options?: { category?: string; isFeatured?: boolean }) {
    const filters: Record<string, unknown> = { deleted_at: null };
    if (options?.category) filters.category = options.category;
    if (options?.isFeatured !== undefined) filters.is_featured = options.isFeatured;

    return this.findAll(filters, {
      order: { column: "sort_order", ascending: true },
    });
  }

  async getCategories(): Promise<string[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("gallery_items")
      .select("category")
      .not("category", "is", null)
      .is("deleted_at", null)
      .order("category");

    if (error) return [];
    return [...new Set(data.map((d: any) => d.category).filter(Boolean))] as string[];
  }
}

export const galleryRepository = new GalleryRepository();
