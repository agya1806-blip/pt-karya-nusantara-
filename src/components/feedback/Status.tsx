"use client";

import { cn } from "@/lib/utils";

type StatusVariant = "online" | "away" | "busy" | "offline";

interface StatusProps {
  variant?: StatusVariant;
  label?: string;
  pulse?: boolean;
  className?: string;
}

const dotColors: Record<StatusVariant, string> = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  busy: "bg-red-500",
  offline: "bg-neutral-400",
};

export function Status({
  variant = "online",
  label,
  pulse,
  className,
}: StatusProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-body-sm leading-relaxed text-text-secondary",
        className,
      )}
    >
      <span className="relative inline-flex">
        <span
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            dotColors[variant],
          )}
          aria-hidden="true"
        />
        {pulse && variant === "online" && (
          <span
            className={cn(
              "absolute inset-0 h-2.5 w-2.5 animate-ping rounded-full opacity-25",
              dotColors[variant],
            )}
          />
        )}
      </span>
      {label && <span>{label}</span>}
    </span>
  );
}
