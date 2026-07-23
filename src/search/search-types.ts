export type SearchEntity = "portfolio" | "services" | "blog" | "team" | "all";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  image?: string;
  entity: SearchEntity;
  matches?: { field: string; snippet: string }[];
}

export interface SearchFilters {
  entity?: SearchEntity[];
  category?: string[];
  tags?: string[];
  dateRange?: { from: string; to: string };
}

export interface SearchSuggestion {
  text: string;
  type: "history" | "trending" | "autocomplete";
  entity?: SearchEntity;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  suggestions: SearchSuggestion[];
  filters: SearchFilters;
  isOpen: boolean;
  isLoading: boolean;
  hasMore: boolean;
  page: number;
}

export interface SearchConfig {
  placeholder?: string;
  debounceMs?: number;
  resultsPerPage?: number;
  maxSuggestions?: number;
  keyboardShortcut?: string;
  entities?: SearchEntity[];
}

export type SearchContextValue = SearchState & {
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  toggleOpen: () => void;
  closeSearch: () => void;
  openSearch: () => void;
  loadMore: () => void;
  clearSearch: () => void;
};
