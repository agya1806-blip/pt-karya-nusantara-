"use client";

import { useState, useMemo } from "react";
import { SectionHeader } from "@/sections/shared/section-header";
import { FilterBar } from "@/filters";
import { PortfolioSearch } from "@/search";
import { CTADefault } from "@/sections";
import { Fade } from "@/components/animation/Fade";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FilterState, SortField, SortDirection } from "@/filters";

interface Project {
  title: string;
  category: string;
  description: string;
  location: string;
  year: string;
  href: string;
  image: string;
}

const allProjects: Project[] = [
  { title: "The Sky Villa", category: "Residential", description: "A luxury hillside villa overlooking the Bali coastline, designed for indoor-outdoor living.", location: "Bali, Indonesia", year: "2024", href: "/portfolio/the-villa", image: "/images/portfolio/villa-sky.jpg" },
  { title: "Sudirman Tower", category: "Commercial", description: "A 40-storey commercial tower in Jakarta's central business district.", location: "Jakarta, Indonesia", year: "2023", href: "/portfolio/sudirman-tower", image: "/images/portfolio/sudirman-tower.jpg" },
  { title: "Nusantara Resort", category: "Hospitality", description: "A beachfront resort in Lombok blending luxury with sustainable design.", location: "Lombok, Indonesia", year: "2025", href: "/portfolio/nusantara-resort", image: "/images/portfolio/nusantara-resort.jpg" },
  { title: "Green Valley Estate", category: "Master Planning", description: "A master-planned community in Bandung focused on green living.", location: "Bandung, Indonesia", year: "2024", href: "/portfolio/green-valley", image: "/images/portfolio/green-valley.jpg" },
  { title: "The Sanctuary", category: "Residential", description: "A private residential sanctuary in the heart of Ubud's jungle.", location: "Ubud, Indonesia", year: "2023", href: "/portfolio/the-sanctuary", image: "/images/portfolio/sanctuary.jpg" },
  { title: "Marina Bay Club", category: "Hospitality", description: "An exclusive members club overlooking the Marina Bay waterfront.", location: "Singapore", year: "2025", href: "/portfolio/marina-club", image: "/images/portfolio/marina-club.jpg" },
];

const categoryOptions = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "hospitality", label: "Hospitality" },
  { value: "master-planning", label: "Master Planning" },
];

const locationOptions = [
  { value: "bali", label: "Bali" },
  { value: "jakarta", label: "Jakarta" },
  { value: "lombok", label: "Lombok" },
  { value: "bandung", label: "Bandung" },
  { value: "ubud", label: "Ubud" },
  { value: "singapore", label: "Singapore" },
];

const buildingTypeOptions = [
  { value: "villa", label: "Villa" },
  { value: "tower", label: "Tower" },
  { value: "resort", label: "Resort" },
  { value: "estate", label: "Estate" },
];

const styleOptions = [
  { value: "modern", label: "Modern" },
  { value: "tropical", label: "Tropical" },
  { value: "contemporary", label: "Contemporary" },
  { value: "minimalist", label: "Minimalist" },
];

const sortOptions = [
  { value: "newest", label: "Newest", field: "year" as SortField, direction: "desc" as SortDirection },
  { value: "oldest", label: "Oldest", field: "year" as SortField, direction: "asc" as SortDirection },
  { value: "name-asc", label: "Name A-Z", field: "title" as SortField, direction: "asc" as SortDirection },
  { value: "name-desc", label: "Name Z-A", field: "title" as SortField, direction: "desc" as SortDirection },
];

export default function ProjectFinderPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [], locations: [], buildingTypes: [], styles: [],
    budgetRange: { min: 0, max: 100000000 },
    areaRange: { min: 0, max: 10000 },
    sort: { field: "year", direction: "desc" },
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = [...allProjects];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q),
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.some((c) => p.category.toLowerCase().replace(/\s+/g, "-") === c),
      );
    }

    if (filters.locations.length > 0) {
      result = result.filter((p) =>
        filters.locations.some((l) => p.location.toLowerCase().includes(l)),
      );
    }

    return result;
  }, [filters, searchQuery]);

  return (
    <>
      <div className="bg-surface pt-32 pb-8">
        <div className="container-site">
          <SectionHeader
            title="Project Finder"
            description="Find the perfect project that matches your vision. Search, filter, and explore our portfolio."
            align="center"
          />
        </div>
      </div>

      <section className="bg-surface-secondary pb-8">
        <div className="container-site">
          <div className="mx-auto max-w-xl">
            <PortfolioSearch
              query={searchQuery}
              onSearch={setSearchQuery}
              results={[]}
              config={{ placeholder: "Search projects by name, location, or type..." }}
            />
          </div>
        </div>
      </section>

      <section className="bg-surface-secondary pb-4">
        <div className="container-site">
          <FilterBar
            categoryOptions={categoryOptions}
            locationOptions={locationOptions}
            buildingTypeOptions={buildingTypeOptions}
            styleOptions={styleOptions}
            sortOptions={sortOptions}
            activeFilters={filters}
            onFilterChange={setFilters}
            onSortChange={(sort) => setFilters((prev) => ({ ...prev, sort }))}
            totalResults={filtered.length}
            variant="compact"
          />
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-site">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-body-lg text-text-tertiary">No projects match your criteria.</p>
              <button
                onClick={() => {
                  setFilters({
                    categories: [], locations: [], buildingTypes: [], styles: [],
                    budgetRange: { min: 0, max: 100000000 },
                    areaRange: { min: 0, max: 10000 },
                    sort: { field: "year", direction: "desc" },
                  });
                  setSearchQuery("");
                }}
                className="mt-4 text-body-sm text-brand-600 hover:text-brand-500 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <Fade key={project.title} direction="up" delay={i * 0.05}>
                  <Link
                    href={project.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-surface transition-all duration-500 hover:shadow-elevation-3"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-secondary">
                      <div className="absolute inset-0 flex items-center justify-center text-text-tertiary">
                        <span className="text-body-sm">{project.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-body-xs text-text-tertiary">
                        <MapPin size={12} />
                        <span>{project.location}</span>
                        <Calendar size={12} className="ml-2" />
                        <span>{project.year}</span>
                      </div>
                      <h3 className="mt-3 text-heading-sm font-medium text-text-primary group-hover:text-brand-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="mt-2 flex-1 text-body-sm text-text-secondary leading-relaxed">
                        {project.description}
                      </p>
                      <span className={cn(
                        "mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-brand-600 transition-all duration-300 group-hover:gap-2",
                      )}>
                        View Project <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </Fade>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTADefault
        title="Can't Find What You're Looking For?"
        description="Every project is unique. Tell us about your vision and we'll create something extraordinary together."
        primaryCta={{ label: "Start a Project", href: "/contact" }}
        secondaryCta={{ label: "View All Services", href: "/services" }}
      />
    </>
  );
}