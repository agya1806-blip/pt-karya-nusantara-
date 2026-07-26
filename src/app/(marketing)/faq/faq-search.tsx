"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItemType {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSearchProps {
  items: FAQItemType[];
  className?: string;
}

export function FAQSearch({ items, className }: FAQSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q),
    );
  }, [items, query]);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari pertanyaan berdasarkan kata kunci..."
          className="w-full rounded-xl border border-border-light bg-surface py-4 pl-12 pr-4 text-body text-text-primary placeholder:text-text-tertiary transition-colors duration-300 focus:border-text-primary focus:outline-none"
          aria-label="Search frequently asked questions"
        />
      </div>
      {query && (
        <p className="mt-3 text-body-sm text-text-tertiary">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
          {filtered.length === 0 && (
            <button
              onClick={() => setQuery("")}
              className="ml-2 text-brand-600 hover:text-brand-500 underline"
            >
              Clear search
            </button>
          )}
        </p>
      )}
    </div>
  );
}