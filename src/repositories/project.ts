import { BaseRepository } from "./base";

interface ProjectRecord {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  description: string;
  content: Record<string, unknown>;
  thumbnail_id: string | null;
  location: string | null;
  year: number | null;
  area_size: number | null;
  status: string;
  is_featured: boolean;
  sort_order: number;
  seo_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface ProjectCategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class ProjectRepository extends BaseRepository<ProjectRecord> {
  constructor() {
    super("projects");
  }

  async findPublished(options?: {
    limit?: number;
    categoryId?: string;
    isFeatured?: boolean;
  }) {
    const filters: Record<string, unknown> = {
      status: "published",
      deleted_at: null,
    };

    if (options?.categoryId) filters.category_id = options.categoryId;
    if (options?.isFeatured !== undefined) filters.is_featured = options.isFeatured;

    return this.findAll(filters, {
      limit: options?.limit,
      order: { column: "published_at", ascending: false },
    });
  }

  async getCategories() {
    const repo = new BaseRepository<ProjectCategoryRecord>("project_categories");
    return repo.findAll({ deleted_at: null }, { order: { column: "sort_order", ascending: true } });
  }

  async createCategory(input: Record<string, unknown>) {
    const repo = new BaseRepository<ProjectCategoryRecord>("project_categories");
    return repo.create(input);
  }

  async updateCategory(id: string, input: Record<string, unknown>) {
    const repo = new BaseRepository<ProjectCategoryRecord>("project_categories");
    return repo.update(id, input);
  }

  async deleteCategory(id: string) {
    const repo = new BaseRepository<ProjectCategoryRecord>("project_categories");
    return repo.softDelete(id);
  }

  async getProjectImages(projectId: string) {
    const client = await this.getClient();
    const { data, error } = await client
      .from("project_images")
      .select("*, media:media_id(*)")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data ?? [];
  }

  async addProjectImage(input: Record<string, unknown>) {
    const client = await this.getClient(true);
    const { data, error } = await client
      .from("project_images")
      .insert(input as never)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async removeProjectImage(projectId: string, mediaId: string) {
    const client = await this.getClient(true);
    const { error } = await client
      .from("project_images")
      .delete()
      .eq("project_id", projectId)
      .eq("media_id", mediaId);

    if (error) throw error;
  }

  async getProjectAwards(projectId: string) {
    const client = await this.getClient();
    const { data, error } = await client
      .from("project_awards")
      .select("*")
      .eq("project_id", projectId)
      .order("year", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  async addProjectAward(input: Record<string, unknown>) {
    const client = await this.getClient(true);
    const { data, error } = await client
      .from("project_awards")
      .insert(input as never)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async removeProjectAward(id: string) {
    const client = await this.getClient(true);
    const { error } = await client
      .from("project_awards")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  async getRelatedProjects(slug: string, limit = 3) {
    const project = await this.findBySlug(slug);
    if (!project) return [];

    return this.findPublished({
      limit,
      categoryId: project.category_id ?? undefined,
    });
  }
}

export const projectRepository = new ProjectRepository();
