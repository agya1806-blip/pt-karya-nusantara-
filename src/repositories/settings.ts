import { BaseRepository } from "./base";

interface GlobalSettingRecord {
  id: string;
  key: string;
  value: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export class SettingsRepository {
  private repo = new BaseRepository<GlobalSettingRecord>("global_settings");

  async get(key: string): Promise<unknown | null> {
    const settings = await this.repo.findAll({ key });
    if (settings.length === 0) return null;
    return settings[0]?.value ?? null;
  }

  async set(key: string, value: unknown): Promise<void> {
    const existing = await this.repo.findAll({ key });

    if (existing.length > 0) {
      await this.repo.update(existing[0]!.id, { value } as any);
    } else {
      await this.repo.create({ key, value } as any);
    }
  }

  async getAll(): Promise<Record<string, unknown>> {
    const settings = await this.repo.findAll(
      {},
      { order: { column: "key", ascending: true } }
    );

    return settings.reduce(
      (acc, s) => {
        acc[s.key] = s.value;
        return acc;
      },
      {} as Record<string, unknown>
    );
  }

  async delete(key: string): Promise<void> {
    const settings = await this.repo.findAll({ key });
    for (const setting of settings) {
      await this.repo.hardDelete(setting.id);
    }
  }
}

export const settingsRepository = new SettingsRepository();
