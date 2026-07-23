import { getSupabaseServerClient } from "@/supabase/server-client";
import { getSupabaseAdminClient } from "@/supabase/admin-client";

export type QueryFilter = Record<string, unknown>;
export type QueryOptions = {
  limit?: number;
  offset?: number;
  order?: { column: string; ascending?: boolean };
  select?: string;
};

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class BaseRepository<T extends object> {
  protected tableName: string;
  protected defaultSelect: string;

  constructor(tableName: string, defaultSelect = "*") {
    this.tableName = tableName;
    this.defaultSelect = defaultSelect;
  }

  protected async getClient(admin = false) {
    if (admin) {
      return getSupabaseAdminClient();
    }
    return getSupabaseServerClient();
  }

  async findById(id: string, select = this.defaultSelect): Promise<T | null> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select(select)
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // not found
      throw new RepositoryError(`Failed to find ${this.tableName} by id`, {
        cause: error,
      });
    }

    return data as unknown as T | null;
  }

  async findBySlug(slug: string, select = this.defaultSelect): Promise<T | null> {
    const client = await this.getClient();
    const { data, error } = await client
      .from(this.tableName)
      .select(select)
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      throw new RepositoryError(`Failed to find ${this.tableName} by slug`, {
        cause: error,
      });
    }

    return data as unknown as T | null;
  }

  async findAll(
    filters: QueryFilter = {},
    options: QueryOptions = {}
  ): Promise<T[]> {
    const client = await this.getClient();
    let query = client.from(this.tableName).select(options.select ?? this.defaultSelect);

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    }

    if (options.order) {
      query = query.order(options.order.column, {
        ascending: options.order.ascending ?? false,
      });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit ?? 20) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new RepositoryError(`Failed to query ${this.tableName}`, {
        cause: error,
      });
    }

    return (data ?? []) as unknown as T[];
  }

  async findPaginated(
    filters: QueryFilter = {},
    page = 1,
    limit = 20,
    orderColumn = "created_at",
    ascending = false
  ): Promise<PaginatedResult<T>> {
    const client = await this.getClient();
    const offset = (page - 1) * limit;

    let countQuery = client
      .from(this.tableName)
      .select("*", { count: "exact", head: true });

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        countQuery = countQuery.eq(key, value);
      }
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      throw new RepositoryError(`Failed to count ${this.tableName}`, {
        cause: countError,
      });
    }

    let dataQuery = client
      .from(this.tableName)
      .select(this.defaultSelect)
      .order(orderColumn, { ascending })
      .range(offset, offset + limit - 1);

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        dataQuery = dataQuery.eq(key, value);
      }
    }

    const { data, error } = await dataQuery;

    if (error) {
      throw new RepositoryError(`Failed to query ${this.tableName} paginated`, {
        cause: error,
      });
    }

    return {
      data: (data ?? []) as unknown as T[],
      total: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit),
    };
  }

  async create(input: Partial<T>): Promise<T> {
    const client = await this.getClient(true);
    const { data, error } = await client
      .from(this.tableName)
      .insert(input as Record<string, unknown>)
      .select()
      .single();

    if (error) {
      throw new RepositoryError(`Failed to create ${this.tableName}`, {
        cause: error,
      });
    }

    return data as unknown as T;
  }

  async update(id: string, input: Partial<T>): Promise<T> {
    const client = await this.getClient(true);
    const { data, error } = await client
      .from(this.tableName)
      .update(input as Record<string, unknown>)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new RepositoryError(`Failed to update ${this.tableName}`, {
        cause: error,
      });
    }

    return data as unknown as T;
  }

  async softDelete(id: string): Promise<void> {
    const client = await this.getClient(true);
    const { error } = await client
      .from(this.tableName)
      .update({ deleted_at: new Date().toISOString() } as Record<string, unknown>)
      .eq("id", id);

    if (error) {
      throw new RepositoryError(`Failed to soft-delete ${this.tableName}`, {
        cause: error,
      });
    }
  }

  async hardDelete(id: string): Promise<void> {
    const client = await this.getClient(true);
    const { error } = await client
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (error) {
      throw new RepositoryError(`Failed to hard-delete ${this.tableName}`, {
        cause: error,
      });
    }
  }

  async count(filters: QueryFilter = {}): Promise<number> {
    const client = await this.getClient();
    let query = client
      .from(this.tableName)
      .select("*", { count: "exact", head: true });

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    }

    const { count, error } = await query;

    if (error) {
      throw new RepositoryError(`Failed to count ${this.tableName}`, {
        cause: error,
      });
    }

    return count ?? 0;
  }

  async exists(filters: QueryFilter): Promise<boolean> {
    const count = await this.count(filters);
    return count > 0;
  }
}

export class RepositoryError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "RepositoryError";
  }
}
