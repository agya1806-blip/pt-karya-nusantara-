import { BaseRepository } from "./base";

interface SubscriberRecord {
  id: string;
  email: string;
  name: string | null;
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export class NewsletterRepository {
  private repo = new BaseRepository<SubscriberRecord>("newsletter_subscribers");

  async subscribe(input: Record<string, unknown>) {
    return this.repo.create(input);
  }

  async unsubscribe(email: string) {
    return this.repo.update(email, {
      is_active: false,
      unsubscribed_at: new Date().toISOString(),
    } as any);
  }

  async getSubscribers(page = 1, limit = 20) {
    return this.repo.findPaginated(
      { is_active: true },
      page,
      limit,
      "subscribed_at",
      false
    );
  }

  async getActiveCount(): Promise<number> {
    return this.repo.count({ is_active: true });
  }

  async findByEmail(email: string) {
    const subscribers = await this.repo.findAll({ email });
    return subscribers[0] ?? null;
  }

  async exportActive(): Promise<SubscriberRecord[]> {
    return this.repo.findAll(
      { is_active: true },
      { order: { column: "subscribed_at", ascending: true } }
    );
  }
}

export const newsletterRepository = new NewsletterRepository();
