"use client";

import { useState, useMemo } from "react";
import { AnimatedSection } from "@/components/animation";
import { FeaturedProjects, ProjectCategories, StatisticsShowcase, CTADefault, SectionHeader } from "@/sections";
import { FilterBar } from "@/filters";
import type { FilterState, SortField, SortDirection } from "@/filters";
import type { PortfolioItem, StatItem } from "@/sections";

const projects: PortfolioItem[] = [
  { title: "The Sky Villa", category: "Residential", image: { src: "/images/portfolio/villa-sky.jpg", alt: "The Sky Villa" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
  { title: "Sudirman Tower", category: "Commercial", image: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Sudirman Tower" }, href: "/portfolio/sudirman-tower", location: "Jakarta, Indonesia", year: "2023" },
  { title: "Nusantara Resort", category: "Hospitality", image: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Nusantara Resort" }, href: "/portfolio/nusantara-resort", location: "Lombok, Indonesia", year: "2025" },
  { title: "Green Valley Estate", category: "Master Planning", image: { src: "/images/portfolio/green-valley.jpg", alt: "Green Valley Estate" }, href: "/portfolio/green-valley", location: "Bandung, Indonesia", year: "2024" },
  { title: "The Sanctuary", category: "Residential", image: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" }, href: "/portfolio/the-sanctuary", location: "Ubud, Indonesia", year: "2023" },
  { title: "Marina Bay Club", category: "Hospitality", image: { src: "/images/portfolio/marina-club.jpg", alt: "Marina Bay Club" }, href: "/portfolio/marina-club", location: "Singapore", year: "2025" },
  { title: "Puri Akaruma", category: "Residential", image: { src: "/images/portfolio/puri-ak aruma.jpg", alt: "Puri Akaruma" }, href: "/portfolio/puri-akaruma", location: "Aceh, Indonesia", year: "2025" },
  { title: "Casara Estate", category: "Master Planning", image: { src: "/images/portfolio/casara-estate.jpg", alt: "Casara Estate" }, href: "/portfolio/casara-estate", location: "Banda Aceh, Indonesia", year: "2024" },
];

const stats: StatItem[] = [
  { value: "200", label: "Projects Delivered", suffix: "+" },
  { value: "50", label: "Design Awards Received", suffix: "+" },
  { value: "15", label: "Years in Practice" },
  { value: "8", label: "Countries Reached" },
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
  { value: "aceh", label: "Aceh" },
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

export default function PortfolioPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [], locations: [], buildingTypes: [], styles: [],
    budgetRange: { min: 0, max: 100000000 },
    areaRange: { min: 0, max: 10000 },
    sort: { field: "year", direction: "desc" },
  });

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.some((c) => p.category.toLowerCase().replace(/\s+/g, "-") === c),
      );
    }

    if (filters.locations.length > 0) {
      result = result.filter((p) =>
        filters.locations.some((l) => p.location?.toLowerCase().includes(l)),
      );
    }

    return result;
  }, [filters]);

  return (
    <>
      <div className="bg-surface pt-32 pb-8">
        <div className="container-site">
          <SectionHeader
            title="Our Portfolio"
            description="Every project tells a story. Explore our work — from private residences to commercial landmarks — each a reflection of considered design."
          />
        </div>
      </div>
      <section className="bg-surface pb-8">
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
            totalResults={filteredProjects.length}
          />
        </div>
      </section>
      <AnimatedSection>
        <FeaturedProjects
          title="Selected Works"
          description="A curated journey through projects that define our practice and reveal the breadth of our capability."
          projects={filteredProjects}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ProjectCategories
          title="Explore by Discipline"
          description="Each category reflects a distinct design language and a depth of expertise we have cultivated over time."
          categories={[
            { label: "Residential", href: "/services" },
            { label: "Commercial", href: "/services" },
            { label: "Hospitality", href: "/services" },
            { label: "Master Planning", href: "/services" },
          ]}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <StatisticsShowcase
          title="By the Numbers"
          description="A measure of the trust our clients place in us."
          stats={stats}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <CTADefault
          title="Your Vision, Our Expertise"
          description="Share your project aspirations with us and discover what we can create together."
          primaryCta={{ label: "Arrange a Consultation", href: "/contact" }}
        />
      </AnimatedSection>
    </>
  );
}