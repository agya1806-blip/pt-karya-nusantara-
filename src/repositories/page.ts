import { BaseRepository } from "./base";

interface PageRecord {
  id: string;
  title: string;
  slug: string;
  content: Record<string, unknown>;
  status: string;
  template: string | null;
  seo_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class PageRepository extends BaseRepository<PageRecord> {
  constructor() {
    super("pages");
  }

  async findPublishedBySlug(slug: string) {
    return this.findBySlug(slug);
  }

  async findPublished() {
    return this.findAll(
      { status: "published", deleted_at: null },
      { order: { column: "title", ascending: true } }
    );
  }
}

export const pageRepository = new PageRepository();
