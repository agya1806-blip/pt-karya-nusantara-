import { useState, useCallback } from "react";
import type { FilterState, SortField, SortDirection } from "@/filters/filter-types";

const defaultFilterState: FilterState = {
  categories: [], locations: [], buildingTypes: [], styles: [],
  budgetRange: { min: 0, max: 100000000 },
  areaRange: { min: 0, max: 10000 },
  sort: { field: "date", direction: "desc" },
};

interface UseFilterOptions {
  initialState?: Partial<FilterState>;
  onFilterChange?: (filters: FilterState) => void;
  onSortChange?: (sort: { field: SortField; direction: SortDirection }) => void;
}

export function useFilter({ initialState, onFilterChange, onSortChange }: UseFilterOptions = {}) {
  const [filters, setFilters] = useState<FilterState>({ ...defaultFilterState, ...initialState });

  const updateFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  }, [onFilterChange]);

  const updateSort = useCallback((sort: { field: SortField; direction: SortDirection }) => {
    const newFilters = { ...filters, sort };
    setFilters(newFilters);
    onSortChange?.(sort);
  }, [filters, onSortChange]);

  const resetFilters = useCallback(() => {
    const reset: FilterState = { ...defaultFilterState, sort: filters.sort };
    setFilters(reset);
    onFilterChange?.(reset);
  }, [filters.sort, onFilterChange]);

  const activeCount =
    filters.categories.length + filters.locations.length +
    filters.buildingTypes.length + filters.styles.length +
    (filters.budgetRange.min > 0 || filters.budgetRange.max < 100000000 ? 1 : 0) +
    (filters.areaRange.min > 0 || filters.areaRange.max < 10000 ? 1 : 0);

  return { filters, updateFilters, updateSort, resetFilters, activeCount };
}
