"use client";

import { useState, useCallback } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectCategoryFilter } from "./project-category-filter";
import { LocationFilter } from "./location-filter";
import { BuildingTypeFilter } from "./building-type-filter";
import { StyleFilter } from "./style-filter";
import { BudgetRangeFilter } from "./budget-range-filter";
import { AreaSizeFilter } from "./area-size-filter";
import { SortSelector } from "./sort-selector";
import type { FilterState, SortField, SortDirection, FilterOption } from "./filter-types";

interface FilterBarProps {
  categoryOptions: FilterOption[];
  locationOptions: FilterOption[];
  buildingTypeOptions: FilterOption[];
  styleOptions: FilterOption[];
  sortOptions: { value: string; label: string; field: SortField; direction: SortDirection }[];
  activeFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: { field: SortField; direction: SortDirection }) => void;
  totalResults?: number;
  variant?: "default" | "compact";
}

export function FilterBar({
  categoryOptions,
  locationOptions,
  buildingTypeOptions,
  styleOptions,
  sortOptions,
  activeFilters,
  onFilterChange,
  onSortChange,
  totalResults,
  variant = "default",
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeCount =
    activeFilters.categories.length + activeFilters.locations.length +
    activeFilters.buildingTypes.length + activeFilters.styles.length +
    (activeFilters.budgetRange.min > 0 || activeFilters.budgetRange.max < 100000000 ? 1 : 0) +
    (activeFilters.areaRange.min > 0 || activeFilters.areaRange.max < 10000 ? 1 : 0);

  const clearAll = useCallback(() => {
    onFilterChange({
      categories: [], locations: [], buildingTypes: [], styles: [],
      budgetRange: { min: 0, max: 100000000 },
      areaRange: { min: 0, max: 10000 },
      sort: activeFilters.sort,
    });
  }, [onFilterChange, activeFilters.sort]);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...activeFilters, [key]: value });
  }, [activeFilters, onFilterChange]);

  const currentSort = sortOptions.find(
    (o) => o.field === activeFilters.sort.field && o.direction === activeFilters.sort.direction
  );

  return (
    <div className="w-full" role="search" aria-label="Filter and sort projects">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2 text-body-sm transition-colors",
              isExpanded || activeCount > 0
                ? "border-text text-text"
                : "border-border text-text-secondary hover:border-text-muted hover:text-text"
            )}
            aria-expanded={isExpanded}
            aria-controls="filter-panel"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-text text-body-xs text-text-inverse">
                {activeCount}
              </span>
            )}
          </button>
          {activeCount > 0 && (
            <button onClick={clearAll} className="flex items-center gap-1 text-body-xs text-text-muted hover:text-text transition-colors">
              <X className="h-3 w-3" /> Clear all
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {totalResults !== undefined && (
            <span className="text-body-sm text-text-muted">{totalResults} result{totalResults !== 1 ? "s" : ""}</span>
          )}
          <SortSelector
            options={sortOptions}
            value={currentSort ? `${currentSort.field}-${currentSort.direction}` : ""}
            onChange={(val) => {
              const opt = sortOptions.find((o) => `${o.field}-${o.direction}` === val);
              if (opt) onSortChange({ field: opt.field, direction: opt.direction });
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className={cn(
              "mt-4 grid gap-8 border-t border-border pt-6",
              variant === "default" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            )}>
              <ProjectCategoryFilter
                options={categoryOptions}
                selected={activeFilters.categories}
                onChange={(v) => updateFilter("categories", v)}
              />
              <LocationFilter
                options={locationOptions}
                selected={activeFilters.locations}
                onChange={(v) => updateFilter("locations", v)}
              />
              <BuildingTypeFilter
                options={buildingTypeOptions}
                selected={activeFilters.buildingTypes}
                onChange={(v) => updateFilter("buildingTypes", v)}
              />
              <StyleFilter
                options={styleOptions}
                selected={activeFilters.styles}
                onChange={(v) => updateFilter("styles", v)}
              />
              <BudgetRangeFilter
                value={activeFilters.budgetRange}
                onChange={(v) => updateFilter("budgetRange", v)}
              />
              <AreaSizeFilter
                value={activeFilters.areaRange}
                onChange={(v) => updateFilter("areaRange", v)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
