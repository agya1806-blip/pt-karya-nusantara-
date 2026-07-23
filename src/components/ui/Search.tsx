"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  id?: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEvent<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ id, className, placeholder = "Search...", ...rest }, ref) => {
    return (
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
        <input
          ref={ref}
          id={id}
          type="search"
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg border border-border bg-surface py-2 pl-10 pr-3 text-text placeholder:text-text-muted outline-none transition-colors duration-300 ease-luxury focus:border-neutral-900",
            className,
          )}
          {...rest}
        />
      </div>
    );
  },
);
Search.displayName = "Search";