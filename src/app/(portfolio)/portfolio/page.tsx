"use client";

import { useState, useMemo } from "react";
import { AnimatedSection } from "@/components/animation";
import { FeaturedProjects, ProjectCategories, StatisticsShowcase, CTADefault, SectionHeader } from "@/sections";
import { FilterBar } from "@/filters";
import type { FilterState, SortField, SortDirection } from "@/filters";
import type { PortfolioItem, StatItem } from "@/sections";

const projects: PortfolioItem[] = [
  { title: "The Sky Villa", category: "Residensial", image: { src: "/images/portfolio/villa-sky.jpg", alt: "The Sky Villa" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
  { title: "Sudirman Tower", category: "Komersial", image: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Sudirman Tower" }, href: "/portfolio/sudirman-tower", location: "Jakarta, Indonesia", year: "2023" },
  { title: "Nusantara Resort", category: "Hospitality", image: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Nusantara Resort" }, href: "/portfolio/nusantara-resort", location: "Lombok, Indonesia", year: "2025" },
  { title: "Green Valley Estate", category: "Master Plan", image: { src: "/images/portfolio/green-valley.jpg", alt: "Green Valley Estate" }, href: "/portfolio/green-valley", location: "Bandung, Indonesia", year: "2024" },
  { title: "The Sanctuary", category: "Residensial", image: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" }, href: "/portfolio/the-sanctuary", location: "Ubud, Indonesia", year: "2023" },
  { title: "Marina Bay Club", category: "Hospitality", image: { src: "/images/portfolio/marina-club.jpg", alt: "Marina Bay Club" }, href: "/portfolio/marina-club", location: "Singapura", year: "2025" },
];

const stats: StatItem[] = [
  { value: "200", label: "Proyek Terselesaikan", suffix: "+" },
  { value: "50", label: "Penghargaan Desain", suffix: "+" },
  { value: "15", label: "Tahun Berpraktek" },
  { value: "8", label: "Negara Terjangkau" },
];

const categoryOptions = [
  { value: "residensial", label: "Residensial" },
  { value: "komersial", label: "Komersial" },
  { value: "hospitality", label: "Hospitality" },
  { value: "master-plan", label: "Master Plan" },
];

const locationOptions = [
  { value: "bali", label: "Bali" },
  { value: "jakarta", label: "Jakarta" },
  { value: "lombok", label: "Lombok" },
  { value: "bandung", label: "Bandung" },
  { value: "ubud", label: "Ubud" },
  { value: "singapura", label: "Singapura" },
];

const buildingTypeOptions = [
  { value: "villa", label: "Villa" },
  { value: "tower", label: "Menara" },
  { value: "resort", label: "Resor" },
  { value: "estate", label: "Kawasan" },
];

const styleOptions = [
  { value: "modern", label: "Modern" },
  { value: "tropical", label: "Tropis" },
  { value: "contemporary", label: "Kontemporer" },
  { value: "minimalist", label: "Minimalis" },
];

const sortOptions = [
  { value: "newest", label: "Terbaru", field: "year" as SortField, direction: "desc" as SortDirection },
  { value: "oldest", label: "Terlama", field: "year" as SortField, direction: "asc" as SortDirection },
  { value: "name-asc", label: "Nama A-Z", field: "title" as SortField, direction: "asc" as SortDirection },
  { value: "name-desc", label: "Nama Z-A", field: "title" as SortField, direction: "desc" as SortDirection },
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
            title="Portofolio"
            description="Setiap proyek memiliki cerita. Jelajahi karya kami — dari hunian pribadi hingga landmark komersial — masing-masing cerminan desain yang matang."
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
          title="Karya Terpilih"
          description="Perjalanan terkurasi melalui proyek-proyek yang mendefinisikan praktik kami dan mengungkap keluasan kemampuan kami."
          projects={filteredProjects}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ProjectCategories
          title="Jelajahi Berdasarkan Disiplin"
          description="Setiap kategori mencerminkan bahasa desain yang berbeda dan kedalaman keahlian yang telah kami kembangkan dari waktu ke waktu."
          categories={[
            { label: "Residensial", href: "/services" },
            { label: "Komersial", href: "/services" },
            { label: "Hospitality", href: "/services" },
            { label: "Master Plan", href: "/services" },
          ]}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <StatisticsShowcase
          title="Dalam Angka"
          description="Ukuran kepercayaan yang diberikan klien kepada kami."
          stats={stats}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <CTADefault
          title="Visi Anda, Keahlian Kami"
          description="Bagikan aspirasi proyek Anda dengan kami dan temukan apa yang dapat kami ciptakan bersama."
          primaryCta={{ label: "Jadwalkan Konsultasi", href: "/contact" }}
        />
      </AnimatedSection>
    </>
  );
}