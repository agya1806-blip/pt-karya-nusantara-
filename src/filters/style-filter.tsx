"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FilterOption } from "./filter-types";

interface StyleFilterProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
}

export function StyleFilter({ options, selected, onChange, label = "Style" }: StyleFilterProps) {
  const toggle = (value: string) => {
    onChange(selected.includes(value) ? selected.filter((s) => s !== value) : [...selected, value]);
  };

  return (
    <div role="group" aria-label={label}>
      <h3 className="mb-3 text-body-xs font-medium uppercase tracking-wider text-text-muted">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={cn(
              "rounded-lg border px-4 py-2 text-body-sm transition-colors",
              selected.includes(opt.value)
                ? "border-text bg-text text-text-inverse"
                : "border-border bg-surface text-text-secondary hover:border-text-muted hover:text-text"
            )}
            aria-pressed={selected.includes(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
