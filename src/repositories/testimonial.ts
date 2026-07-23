import { BaseRepository } from "./base";
import type { PaginatedResult } from "./base";

interface TestimonialRecord {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_id: string | null;
  rating: number | null;
  video_url: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class TestimonialRepository extends BaseRepository<TestimonialRecord> {
  constructor() {
    super("testimonials");
  }

  async findFeatured(limit?: number) {
    return this.findAll(
      { is_featured: true, deleted_at: null },
      { limit, order: { column: "sort_order", ascending: true } }
    );
  }

  async findPaginated(
    filters: Record<string, unknown> = {},
    page = 1,
    limit = 20
  ): Promise<PaginatedResult<TestimonialRecord>> {
    return super.findPaginated(
      { ...filters, deleted_at: null },
      page,
      limit,
      "sort_order",
      true
    );
  }
}

export const testimonialRepository = new TestimonialRepository();
