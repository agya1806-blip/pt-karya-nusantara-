import { BaseRepository } from "./base";

interface FAQRecord {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export class FAQRepository extends BaseRepository<FAQRecord> {
  constructor() {
    super("faq");
  }

  async findPublished(options?: { category?: string }) {
    const filters: Record<string, unknown> = { is_published: true };
    if (options?.category) filters.category = options.category;

    return this.findAll(filters, {
      order: { column: "sort_order", ascending: true },
    });
  }

  async getCategories(): Promise<string[]> {
    const client = await this.getClient();
    const { data, error } = await client
      .from("faq")
      .select("category")
      .not("category", "is", null)
      .eq("is_published", true)
      .order("category");

    if (error) return [];
    return [...new Set(data.map((d: any) => d.category).filter(Boolean))] as string[];
  }
}

export const faqRepository = new FAQRepository();
