"use client";

import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SortOption } from "./filter-types";

interface SortSelectorProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function SortSelector({ options, value, onChange, label = "Sort By" }: SortSelectorProps) {
  return (
    <div className="flex items-center gap-3" role="group" aria-label={label}>
      <ArrowUpDown className="h-4 w-4 text-text-muted shrink-0" />
      <label className="sr-only">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 bg-transparent text-body-sm text-text-secondary cursor-pointer focus:outline-none focus:ring-0"
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
