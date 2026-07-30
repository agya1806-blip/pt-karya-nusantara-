"use client";

import { useState, useCallback } from "react";
import { Section, Container } from "@/components/layout";
import { Search, Loader2, FileText, Building2, Briefcase, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const searchableContent = [
  { title: "The Sky Villa", description: "Vila bukit mewah di Bali dengan panorama laut lepas", url: "/portfolio/the-villa", category: "Residensial", type: "portfolio" as const },
  { title: "Sudirman Tower", description: "Menara perkantoran premium 40 lantai di jantung Jakarta", url: "/portfolio/sudirman-tower", category: "Komersial", type: "portfolio" as const },
  { title: "Nusantara Resort", description: "Resor tepi pantai mewah di Lombok yang memukau", url: "/portfolio/nusantara-resort", category: "Hospitality", type: "portfolio" as const },
  { title: "Green Valley Estate", description: "Kawasan terencana hijau di Bandung", url: "/portfolio/green-valley", category: "Master Plan", type: "portfolio" as const },
  { title: "The Sanctuary", description: "Sanctuary residensial privat di Ubud", url: "/portfolio/the-sanctuary", category: "Residensial", type: "portfolio" as const },
  { title: "Marina Bay Club", description: "Club hospitality premium di Singapura", url: "/portfolio/marina-club", category: "Hospitality", type: "portfolio" as const },
  { title: "Arsitektur Residensial", description: "Rumah kustom dan vila mewah yang abadi", url: "/services/residential", category: "Layanan", type: "service" as const },
  { title: "Arsitektur Komersial", description: "Ruang kantor dan lingkungan ritel yang ikonik", url: "/services/commercial", category: "Layanan", type: "service" as const },
  { title: "Desain Hospitality", description: "Resor, hotel, dan restoran dengan jiwa", url: "/services/hospitality", category: "Layanan", type: "service" as const },
  { title: "Master Planning", description: "Desain urban dan pengembangan kawasan", url: "/services/master-planning", category: "Layanan", type: "service" as const },
  { title: "Desain Interior", description: "Ruang interior yang canggih dan personal", url: "/services/interior-design", category: "Layanan", type: "service" as const },
  { title: "Desain Berkelanjutan", description: "Arsitektur yang sadar lingkungan tanpa mengorbankan estetika", url: "/services/sustainable-design", category: "Layanan", type: "service" as const },
  { title: "Masa Depan Kemewahan Berkelanjutan", description: "Menjelajahi arsitektur mewah yang ramah lingkungan", url: "/blog/future-of-sustainable-luxury", category: "Keberlanjutan", type: "blog" as const },
  { title: "Mendesain untuk Hunian Tropis", description: "Prinsip arsitektur tropis yang nyaman dan indah", url: "/blog/designing-for-tropical-living", category: "Desain", type: "blog" as const },
  { title: "Desain Biofilik di Ruang Urban", description: "Menghadirkan alam ke dalam lingkungan kota", url: "/blog/biophilic-design-urban-spaces", category: "Desain", type: "blog" as const },
  { title: "Integrasi Rumah Pintar", description: "Teknologi dalam arsitektur modern", url: "/blog/smart-home-integration", category: "Teknologi", type: "blog" as const },
  { title: "Material Berkelanjutan", description: "Bahan bangunan ramah lingkungan masa kini", url: "/blog/sustainable-materials", category: "Keberlanjutan", type: "blog" as const },
  { title: "Memaksimalkan Ruang Kecil", description: "Strategi desain untuk hunian yang ringkas namun elegan", url: "/blog/maximizing-small-spaces", category: "Desain", type: "blog" as const },
  { title: "Tren Arsitektur Lansekap", description: "Tren desain lansekap modern terkini", url: "/blog/landscape-architecture-trends", category: "Desain", type: "blog" as const },
  { title: "Konservasi Warisan", description: "Melestarikan warisan arsitektur untuk generasi mendatang", url: "/blog/heritage-conservation", category: "Budaya", type: "blog" as const },
  { title: "Masa Depan Ruang Kerja", description: "Mendesain ulang tempat kerja modern", url: "/blog/future-of-workspace", category: "Komersial", type: "blog" as const },
];

const typeIcons = {
  portfolio: Building2,
  service: Briefcase,
  blog: FileText,
} as const;

const typeLabels = {
  portfolio: "Portofolio",
  service: "Layanan",
  blog: "Artikel",
} as const;

const typeColors = {
  portfolio: "bg-brand-500/10 text-brand-600",
  service: "bg-blue-500/10 text-blue-600",
  blog: "bg-emerald-500/10 text-emerald-600",
} as const;

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filtered = query.trim()
    ? searchableContent.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
    : [];

  const grouped = filtered.reduce<Record<string, typeof searchableContent>>((acc, item) => {
    const type = item.type;
    if (!acc[type]) acc[type] = [];
    acc[type]!.push(item);
    return acc;
  }, {});

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim()) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 300);
    }
  }, []);

  return (
    <Section>
      <Container>
        <div className="py-24">
          <div className="text-center">
            <h1 className="text-display font-light tracking-tight text-text-primary">Temukan Inspirasi</h1>
            <p className="mt-3 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Telusuri portofolio, layanan, artikel, dan referensi arsitektur dalam satu tempat.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
              <input
                type="search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari proyek, layanan, artikel..."
                className="w-full rounded-xl border border-border-light bg-surface py-4 pl-12 pr-4 text-body text-text-primary placeholder:text-text-tertiary transition-all duration-300 focus:border-text-primary focus:outline-none focus:ring-0"
                aria-label="Cari"
                autoFocus
              />
              {isLoading && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-text-tertiary" />
              )}
            </div>
          </div>

          {query.trim() && filtered.length === 0 && !isLoading && (
            <div className="mx-auto mt-16 max-w-2xl text-center">
              <p className="text-body-lg text-text-tertiary">Tidak ditemukan hasil untuk &ldquo;{query}&rdquo;</p>
              <p className="mt-2 text-body-sm text-text-tertiary">Coba kata kunci lain atau jelajahi halaman kami.</p>
            </div>
          )}

          {Object.keys(grouped).length > 0 && (
            <div className="mx-auto mt-16 max-w-3xl space-y-12">
              {Object.entries(grouped).map(([type, items]) => {
                const Icon = typeIcons[type as keyof typeof typeIcons];
                return (
                  <div key={type}>
                    <div className="mb-4 flex items-center gap-2">
                      {Icon && <Icon className="h-5 w-5 text-text-secondary" />}
                      <h2 className="text-heading-sm font-medium text-text-primary">{typeLabels[type as keyof typeof typeLabels]}</h2>
                      <span className="text-body-sm text-text-tertiary">({items.length})</span>
                    </div>
                    <div className="divide-y divide-border-light rounded-xl border border-border-light bg-surface">
                      {items.map((item) => (
                        <Link
                          key={item.url}
                          href={item.url}
                          className="group flex items-center justify-between px-6 py-4 transition-colors duration-200 hover:bg-surface-secondary"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-caption font-medium", typeColors[item.type])}>
                                {item.category}
                              </span>
                            </div>
                            <p className="mt-1 text-body font-medium text-text-primary group-hover:text-brand-600 transition-colors duration-200">
                              {item.title}
                            </p>
                            <p className="text-body-sm text-text-secondary mt-0.5">{item.description}</p>
                          </div>
                          <ChevronRight className="ml-4 h-5 w-5 flex-shrink-0 text-text-tertiary transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-text-primary" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!query.trim() && (
            <div className="mx-auto mt-16 max-w-2xl text-center">
              <div className="rounded-2xl border border-dashed border-border-light bg-surface-secondary p-12">
                <Search className="mx-auto h-12 w-12 text-text-tertiary" />
                <p className="mt-4 text-body text-text-secondary">Ketik kata kunci untuk menjelajahi proyek, layanan, dan artikel.</p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}