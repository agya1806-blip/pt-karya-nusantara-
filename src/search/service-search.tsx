"use client";

import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import type { SearchConfig, SearchResult } from "./search-types";

interface ServiceSearchProps {
  onSearch: (query: string) => void;
  results: SearchResult[];
  isLoading?: boolean;
  query?: string;
  config?: SearchConfig;
}

export function ServiceSearch({ onSearch, isLoading, query = "", config }: ServiceSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
      <Input
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={config?.placeholder ?? "Search services..."}
        className="w-full border-border bg-surface pl-12 py-3 text-body-md placeholder:text-text-muted"
        isLoading={isLoading}
        aria-label="Search services"
      />
    </div>
  );
}
