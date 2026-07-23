import { BaseRepository } from "./base";

interface ServiceRecord {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  description: string;
  content: Record<string, unknown>;
  icon: string | null;
  image_id: string | null;
  features: string[];
  status: string;
  sort_order: number;
  seo_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class ServiceRepository extends BaseRepository<ServiceRecord> {
  constructor() {
    super("services");
  }

  async findPublished(options?: { limit?: number; categoryId?: string }) {
    const filters: Record<string, unknown> = {
      status: "published",
      deleted_at: null,
    };

    if (options?.categoryId) filters.category_id = options.categoryId;

    return this.findAll(filters, {
      limit: options?.limit,
      order: { column: "sort_order", ascending: true },
    });
  }

  async getCategories() {
    const repo = new BaseRepository<any>("service_categories");
    return repo.findAll(
      { deleted_at: null },
      { order: { column: "sort_order", ascending: true } }
    );
  }
}

export const serviceRepository = new ServiceRepository();
