import { BaseRepository } from "./base";

interface TeamMemberRecord {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string | null;
  image_id: string | null;
  email: string | null;
  linkedin_url: string | null;
  sort_order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class TeamRepository extends BaseRepository<TeamMemberRecord> {
  constructor() {
    super("team_members");
  }

  async findActive(options?: { isFeatured?: boolean; limit?: number }) {
    const filters: Record<string, unknown> = { deleted_at: null };
    if (options?.isFeatured !== undefined) {
      filters.is_featured = options.isFeatured;
    }

    return this.findAll(filters, {
      limit: options?.limit,
      order: { column: "sort_order", ascending: true },
    });
  }
}

export const teamRepository = new TeamRepository();
