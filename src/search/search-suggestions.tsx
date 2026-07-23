"use client";

import { Clock, TrendingUp, Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchSuggestion } from "./search-types";

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSelect: (suggestion: SearchSuggestion) => void;
  maxDisplay?: number;
}

export function SearchSuggestions({ suggestions, onSelect, maxDisplay = 8 }: SearchSuggestionsProps) {
  const grouped = suggestions.slice(0, maxDisplay).reduce<Record<string, SearchSuggestion[]>>((acc, s) => {
    const key = s.type === "history" ? "Recent" : s.type === "trending" ? "Trending" : "Suggestions";
    (acc[key] = acc[key] || []).push(s);
    return acc;
  }, {});

  const typeIcon: Record<string, React.ElementType> = { history: Clock, trending: TrendingUp, autocomplete: SearchIcon };

  return (
    <div className="px-6 py-4">
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="mb-4 last:mb-0">
          <h3 className="mb-2 text-body-xs font-medium uppercase tracking-wider text-text-muted">{group}</h3>
          <ul className="space-y-1">
            {items.map((suggestion) => {
              const Icon = typeIcon[suggestion.type];
              return (
                <li key={`${suggestion.type}-${suggestion.text}`}>
                  <button
                    onClick={() => onSelect(suggestion)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-body-sm text-text-secondary transition-colors hover:bg-surface-muted"
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0 text-text-muted" />}
                    <span className={cn(suggestion.type === "autocomplete" && "font-medium text-text")}>
                      {suggestion.text}
                    </span>
                    {suggestion.entity && (
                      <span className="ml-auto text-body-xs text-text-muted capitalize">{suggestion.entity}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
