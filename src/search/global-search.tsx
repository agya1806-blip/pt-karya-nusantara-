"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X, Command, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLockBody, useMediaQuery, useReducedMotion } from "@/hooks";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { SearchSuggestions } from "./search-suggestions";
import type { SearchResult, SearchSuggestion, SearchConfig } from "./search-types";

interface GlobalSearchProps {
  results: SearchResult[];
  suggestions: SearchSuggestion[];
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  onSelectResult: (result: SearchResult) => void;
  onSelectSuggestion: (suggestion: SearchSuggestion) => void;
  isLoading?: boolean;
  config?: SearchConfig;
}

export function GlobalSearch({
  results,
  suggestions,
  isOpen,
  onClose,
  onSearch,
  onSelectResult,
  onSelectSuggestion,
  isLoading = false,
  config = {},
}: GlobalSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reducedMotion = useReducedMotion();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLockBody(isOpen);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { setSelectedIndex((p) => Math.min(p + 1, results.length + suggestions.length - 1)); e.preventDefault(); }
      if (e.key === "ArrowUp") { setSelectedIndex((p) => Math.max(p - 1, -1)); e.preventDefault(); }
      if (e.key === "Enter" && selectedIndex >= 0) {
        const all = [...results, ...suggestions];
        if (all[selectedIndex]) {
          if ("matches" in all[selectedIndex]) onSelectResult(all[selectedIndex] as SearchResult);
          else onSelectSuggestion(all[selectedIndex] as SearchSuggestion);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, results, suggestions, selectedIndex, onClose, onSelectResult, onSelectSuggestion]);

  const handleChange = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(value), config.debounceMs ?? 300);
  }, [onSearch, config.debounceMs]);

  const groupedResults = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const key = r.entity === "portfolio" ? "Projects" : r.entity === "services" ? "Services" : r.entity === "blog" ? "Articles" : "Other";
    (acc[key] = acc[key] || []).push(r);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="fixed inset-0 bg-brand-900/70 backdrop-blur-sm" onClick={onClose} />
          <div className={cn("fixed left-1/2 top-[15%] w-full max-w-2xl -translate-x-1/2 px-4", isMobile && "top-0 px-0")}>
            <motion.div
              initial={reducedMotion ? {} : { y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reducedMotion ? {} : { y: -20, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl bg-surface shadow-luxury-xl"
            >
              <div className="relative flex items-center border-b border-border px-6">
                <Search className="h-5 w-5 shrink-0 text-text-muted" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={config.placeholder ?? "Search projects, services, articles..."}
                  className="border-0 bg-transparent px-4 py-5 text-body-lg placeholder:text-text-muted focus:ring-0"
                  aria-label="Search query"
                />
                {isLoading && <Loader2 className="h-4 w-4 animate-spin text-text-muted" />}
                {query && !isLoading && (
                  <button onClick={() => { setQuery(""); onSearch(""); }} className="p-1 text-text-muted hover:text-text" aria-label="Clear search">
                    <X className="h-4 w-4" />
                  </button>
                )}
                <kbd className="ml-3 hidden items-center gap-1 rounded-md border border-border px-2 py-1 text-body-xs text-text-muted md:flex">
                  <Command className="h-3 w-3" />{config.keyboardShortcut ?? "K"}
                </kbd>
              </div>

              {query && (
                <div className="max-h-[60vh] overflow-y-auto">
                  {isLoading && results.length === 0 && (
                    <div className="flex items-center justify-center gap-3 px-6 py-12 text-text-muted">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-body-sm">Searching...</span>
                    </div>
                  )}

                  {!isLoading && query && results.length === 0 && (
                    <div className="px-6 py-12 text-center">
                      <p className="text-body-sm text-text-muted">No results found for &ldquo;{query}&rdquo;</p>
                      <p className="mt-2 text-body-xs text-text-muted">Try different keywords or browse our categories</p>
                    </div>
                  )}

                  {Object.entries(groupedResults).map(([group, items]) => (
                    <div key={group} className="px-6 py-4" role="group" aria-label={group}>
                      <h3 className="mb-3 text-body-xs font-medium uppercase tracking-wider text-text-muted">{group}</h3>
                      <ul className="space-y-1">
                        {items.map((result, idx) => {
                          const globalIdx = suggestions.length + Object.values(groupedResults).flat().indexOf(result);
                          return (
                            <li key={result.id}>
                              <button
                                onClick={() => onSelectResult(result)}
                                onMouseEnter={() => setSelectedIndex(globalIdx)}
                                className={cn(
                                  "flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left transition-colors",
                                  selectedIndex === globalIdx ? "bg-surface-muted" : "hover:bg-surface-muted"
                                )}
                              >
                                <div className="flex-1 min-w-0">
                                  <span className="block text-body-sm font-medium text-text truncate">{result.title}</span>
                                  <span className="block text-body-xs text-text-muted truncate">{result.description}</span>
                                </div>
                                <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}

                  {results.length > 0 && (
                    <div className="border-t border-border px-6 py-3">
                      <p className="text-body-xs text-text-muted">
                        Showing {results.length} result{results.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!query && suggestions.length > 0 && (
                <SearchSuggestions
                  suggestions={suggestions}
                  onSelect={onSelectSuggestion}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
