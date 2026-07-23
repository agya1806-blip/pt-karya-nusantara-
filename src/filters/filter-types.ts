export type FilterOperator = "any" | "all" | "range";
export type SortDirection = "asc" | "desc";
export type SortField = "name" | "date" | "budget" | "area" | "popularity" | "rating";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: string;
}

export interface FilterState {
  categories: string[];
  locations: string[];
  buildingTypes: string[];
  styles: string[];
  budgetRange: { min: number; max: number };
  areaRange: { min: number; max: number };
  sort: { field: SortField; direction: SortDirection };
}

export interface FilterProps {
  value: string | string[];
  options: FilterOption[];
  onChange: (value: string | string[]) => void;
  label: string;
  multiple?: boolean;
  searchable?: boolean;
}

export interface RangeFilterProps {
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  label: string;
  min: number;
  max: number;
  step?: number;
  formatLabel?: (value: number) => string;
}

export interface SortOption {
  value: string;
  label: string;
  field: SortField;
  direction: SortDirection;
}

export interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: { field: SortField; direction: SortDirection }) => void;
  activeFilters: FilterState;
  totalResults?: number;
  variant?: "default" | "compact" | "expanded";
}

export interface ActiveFilter {
  type: string;
  label: string;
  value: string;
  onRemove: () => void;
}
