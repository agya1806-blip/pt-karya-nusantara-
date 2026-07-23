import { useState, useCallback, useEffect } from "react";
import type { SearchState, SearchResult, SearchSuggestion, SearchFilters, SearchConfig } from "@/search/search-types";

interface UseSearchOptions {
  config?: SearchConfig;
  onSearch?: (query: string, filters: SearchFilters) => Promise<{ results: SearchResult[]; suggestions: SearchSuggestion[] }>;
}

export function useSearch({ config = {}, onSearch }: UseSearchOptions = {}) {
  const [state, setState] = useState<SearchState>({
    query: "", results: [], suggestions: [], filters: {},
    isOpen: false, isLoading: false, hasMore: false, page: 1,
  });

  const setQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, query }));
  }, []);

  const setFilters = useCallback((filters: SearchFilters) => {
    setState((prev) => ({ ...prev, filters }));
  }, []);

  const toggleOpen = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const closeSearch = useCallback(() => setState((prev) => ({ ...prev, isOpen: false })), []);
  const openSearch = useCallback(() => setState((prev) => ({ ...prev, isOpen: true })), []);

  const loadMore = useCallback(() => {
    setState((prev) => ({ ...prev, page: prev.page + 1 }));
  }, []);

  const clearSearch = useCallback(() => {
    setState({ query: "", results: [], suggestions: [], filters: {}, isOpen: false, isLoading: false, hasMore: false, page: 1 });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === (config.keyboardShortcut || "k")) {
        e.preventDefault();
        toggleOpen();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [config.keyboardShortcut, toggleOpen]);

  useEffect(() => {
    if (!onSearch || !state.query) return;
    const timer = setTimeout(async () => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const result = await onSearch(state.query, state.filters);
        setState((prev) => ({ ...prev, ...result, isLoading: false }));
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    }, config.debounceMs ?? 300);
    return () => clearTimeout(timer);
  }, [state.query, state.filters, onSearch, config.debounceMs]);

  return { ...state, setQuery, setFilters, toggleOpen, closeSearch, openSearch, loadMore, clearSearch };
}
