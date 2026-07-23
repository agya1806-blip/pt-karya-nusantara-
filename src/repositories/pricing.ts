import { BaseRepository } from "./base";

interface PricingPlanRecord {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  period: string;
  features: string[];
  is_highlighted: boolean;
  cta_text: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export class PricingRepository extends BaseRepository<PricingPlanRecord> {
  constructor() {
    super("pricing_plans");
  }

  async findActive() {
    return this.findAll(
      { is_active: true, deleted_at: null },
      { order: { column: "sort_order", ascending: true } }
    );
  }
}

export const pricingRepository = new PricingRepository();
