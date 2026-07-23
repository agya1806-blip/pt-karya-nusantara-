import { BaseRepository } from "./base";

interface CareerPositionRecord {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary_min: number | null;
  salary_max: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class CareerRepository extends BaseRepository<CareerPositionRecord> {
  constructor() {
    super("career_positions");
  }

  async findActive(options?: { type?: string; department?: string }) {
    const filters: Record<string, unknown> = {
      is_active: true,
      deleted_at: null,
    };

    if (options?.type) filters.type = options.type;
    if (options?.department) filters.department = options.department;

    return this.findAll(filters, {
      order: { column: "created_at", ascending: false },
    });
  }

  async getDepartments(): Promise<string[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("career_positions")
      .select("department")
      .not("department", "is", null)
      .eq("is_active", true)
      .is("deleted_at", null)
      .order("department");

    if (error) return [];
    return [...new Set(data.map((d: any) => d.department).filter(Boolean))] as string[];
  }
}

export const careerRepository = new CareerRepository();
