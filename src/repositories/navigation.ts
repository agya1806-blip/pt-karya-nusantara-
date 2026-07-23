import { BaseRepository } from "./base";

interface NavigationItemRecord {
  id: string;
  label: string;
  url: string;
  icon: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class NavigationRepository extends BaseRepository<NavigationItemRecord> {
  constructor() {
    super("navigation_items");
  }

  async findActive() {
    return this.findAll(
      { is_active: true },
      { order: { column: "sort_order", ascending: true } }
    );
  }

  async findTree(): Promise<NavigationItemRecord[]> {
    const items = await this.findActive();
    return this.buildTree(items);
  }

  private buildTree(items: NavigationItemRecord[]): NavigationItemRecord[] {
    const map = new Map<string, NavigationItemRecord & { children: NavigationItemRecord[] }>();
    const roots: (NavigationItemRecord & { children: NavigationItemRecord[] })[] = [];

    for (const item of items) {
      map.set(item.id, { ...item, children: [] });
    }

    for (const item of items) {
      if (item.parent_id && map.has(item.parent_id)) {
        map.get(item.parent_id)!.children.push(map.get(item.id)!);
      } else {
        roots.push(map.get(item.id)!);
      }
    }

    return roots;
  }
}

export const navigationRepository = new NavigationRepository();
