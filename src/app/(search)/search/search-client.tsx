"use client";

import { useState, useCallback } from "react";
import { Section, Container } from "@/components/layout";
import { Search, Loader2, FileText, Building2, Briefcase, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const searchableContent = [
  { title: "The Sky Villa", description: "Luxury hillside villa in Bali", url: "/portfolio/the-villa", category: "Residential", type: "portfolio" as const },
  { title: "Sudirman Tower", description: "40-story premium office tower in Jakarta", url: "/portfolio/sudirman-tower", category: "Commercial", type: "portfolio" as const },
  { title: "Nusantara Resort", description: "Luxury beachfront resort in Lombok", url: "/portfolio/nusantara-resort", category: "Hospitality", type: "portfolio" as const },
  { title: "Green Valley Estate", description: "Master planned estate in Bandung", url: "/portfolio/green-valley", category: "Master Planning", type: "portfolio" as const },
  { title: "The Sanctuary", description: "Private residential sanctuary in Ubud", url: "/portfolio/the-sanctuary", category: "Residential", type: "portfolio" as const },
  { title: "Marina Bay Club", description: "Premium hospitality club in Singapore", url: "/portfolio/marina-club", category: "Hospitality", type: "portfolio" as const },
  { title: "Residential Architecture", description: "Luxury custom homes and villas", url: "/services/residential", category: "Service", type: "service" as const },
  { title: "Commercial Architecture", description: "Office spaces and retail environments", url: "/services/commercial", category: "Service", type: "service" as const },
  { title: "Hospitality Design", description: "Resorts, hotels, and restaurants", url: "/services/hospitality", category: "Service", type: "service" as const },
  { title: "Master Planning", description: "Urban design and development", url: "/services/master-planning", category: "Service", type: "service" as const },
  { title: "Interior Design", description: "Sophisticated interior spaces", url: "/services/interior-design", category: "Service", type: "service" as const },
  { title: "Sustainable Design", description: "Eco-conscious architecture", url: "/services/sustainable-design", category: "Service", type: "service" as const },
  { title: "The Future of Sustainable Luxury", description: "Exploring sustainable luxury architecture", url: "/blog/future-of-sustainable-luxury", category: "Sustainability", type: "blog" as const },
  { title: "Designing for Tropical Living", description: "Tropical architecture principles", url: "/blog/designing-for-tropical-living", category: "Design", type: "blog" as const },
  { title: "Biophilic Design in Urban Spaces", description: "Bringing nature into urban environments", url: "/blog/biophilic-design-urban-spaces", category: "Design", type: "blog" as const },
  { title: "Smart Home Integration", description: "Technology in modern architecture", url: "/blog/smart-home-integration", category: "Technology", type: "blog" as const },
  { title: "Sustainable Materials", description: "Eco-friendly building materials", url: "/blog/sustainable-materials", category: "Sustainability", type: "blog" as const },
  { title: "Maximizing Small Spaces", description: "Design strategies for compact living", url: "/blog/maximizing-small-spaces", category: "Design", type: "blog" as const },
  { title: "Landscape Architecture Trends", description: "Modern landscape design trends", url: "/blog/landscape-architecture-trends", category: "Design", type: "blog" as const },
  { title: "Heritage Conservation", description: "Preserving architectural heritage", url: "/blog/heritage-conservation", category: "Culture", type: "blog" as const },
  { title: "Future of Workspace", description: "Redesigning the modern workplace", url: "/blog/future-of-workspace", category: "Commercial", type: "blog" as const },
];

const typeIcons = {
  portfolio: Building2,
  service: Briefcase,
  blog: FileText,
} as const;

const typeLabels = {
  portfolio: "Portfolio",
  service: "Services",
  blog: "Blog",
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
            <h1 className="text-display font-light tracking-tight text-text-primary">Search</h1>
            <p className="mt-3 text-body-lg text-text-secondary max-w-2xl mx-auto">
              Search our portfolio, services, articles, and more.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
              <input
                type="search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search projects, services, articles..."
                className="w-full rounded-xl border border-border-light bg-surface py-4 pl-12 pr-4 text-body text-text-primary placeholder:text-text-tertiary transition-all duration-300 focus:border-text-primary focus:outline-none focus:ring-0"
                aria-label="Search"
                autoFocus
              />
              {isLoading && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-text-tertiary" />
              )}
            </div>
          </div>

          {query.trim() && filtered.length === 0 && !isLoading && (
            <div className="mx-auto mt-16 max-w-2xl text-center">
              <p className="text-body-lg text-text-tertiary">No results found for &ldquo;{query}&rdquo;</p>
              <p className="mt-2 text-body-sm text-text-tertiary">Try a different search term or browse our pages.</p>
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
                <p className="mt-4 text-body text-text-secondary">Type a keyword to search across projects, services, and articles.</p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}