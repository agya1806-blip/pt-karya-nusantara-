import { BaseRepository } from "./base";

interface BlogPostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: Record<string, unknown>;
  image_id: string | null;
  author_id: string | null;
  category_id: string | null;
  tags: string[];
  status: string;
  is_featured: boolean;
  seo_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class BlogRepository extends BaseRepository<BlogPostRecord> {
  constructor() {
    super("blog_posts", "*, author:author_id(*), category:category_id(*)");
  }

  async findPublished(options?: {
    limit?: number;
    categoryId?: string;
    authorId?: string;
    tag?: string;
    isFeatured?: boolean;
  }) {
    const filters: Record<string, unknown> = {
      status: "published",
      deleted_at: null,
    };

    if (options?.categoryId) filters.category_id = options.categoryId;
    if (options?.authorId) filters.author_id = options.authorId;
    if (options?.isFeatured !== undefined) filters.is_featured = options.isFeatured;

    const posts = await this.findAll(filters, {
      limit: options?.limit,
      order: { column: "published_at", ascending: false },
    });

    if (options?.tag) {
      return posts.filter((post) => post.tags?.includes(options.tag!));
    }

    return posts;
  }

  async getCategories() {
    const repo = new BaseRepository<any>("blog_categories");
    return repo.findAll({}, { order: { column: "name", ascending: true } });
  }

  async getAuthors() {
    const repo = new BaseRepository<any>("authors");
    return repo.findAll(
      { deleted_at: null },
      { order: { column: "name", ascending: true } }
    );
  }

  async getRelatedPosts(slug: string, limit = 3) {
    const post = await this.findBySlug(slug, "category_id,tags");
    if (!post) return [];

    const filters: Record<string, unknown> = {
      status: "published",
      deleted_at: null,
    };

    if (post.category_id) {
      filters.category_id = post.category_id;
    }

    const posts = await this.findAll(filters, {
      limit: limit + 1,
      order: { column: "published_at", ascending: false },
    });

    return posts.filter((p) => p.slug !== slug).slice(0, limit);
  }
}

export const blogRepository = new BlogRepository();
