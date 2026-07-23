"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FilterOption } from "./filter-types";

interface LocationFilterProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
}

export function LocationFilter({ options, selected, onChange, label = "Location" }: LocationFilterProps) {
  const toggle = (value: string) => {
    onChange(selected.includes(value) ? selected.filter((s) => s !== value) : [...selected, value]);
  };

  return (
    <div role="group" aria-label={label}>
      <h3 className="mb-3 text-body-xs font-medium uppercase tracking-wider text-text-muted">{label}</h3>
      <ul className="space-y-1">
        {options.map((opt) => (
          <li key={opt.value}>
            <button
              onClick={() => toggle(opt.value)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm transition-colors hover:bg-surface-muted",
                selected.includes(opt.value) ? "text-text" : "text-text-secondary"
              )}
              aria-pressed={selected.includes(opt.value)}
            >
              <span className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                selected.includes(opt.value) ? "border-text bg-text text-text-inverse" : "border-border"
              )}>
                {selected.includes(opt.value) && <Check className="h-3 w-3" />}
              </span>
              <span className="flex-1 text-left">{opt.label}</span>
              {opt.count !== undefined && (
                <span className="text-body-xs text-text-muted">{opt.count}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
