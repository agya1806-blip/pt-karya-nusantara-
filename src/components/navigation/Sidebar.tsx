"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: string | number;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  variant?: "default" | "compact";
  className?: string;
}

export function Sidebar({
  items,
  title,
  variant = "default",
  className,
}: SidebarProps) {
  return (
    <nav className={cn("flex flex-col", className)}>
      {title && (
        <p className="mb-4 px-3 text-caption font-semibold tracking-widest uppercase text-text-muted">
          {title}
        </p>
      )}

      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg transition-all duration-300",
                item.active
                  ? "bg-surface-muted text-text"
                  : "text-text-secondary hover:bg-surface-muted hover:text-text",
                variant === "compact" ? "px-3 py-2" : "px-4 py-2.5",
              )}
            >
              {item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              <span
                className={cn(
                  "flex-1 font-medium tracking-tight",
                  variant === "compact" ? "text-body-sm" : "text-body",
                )}
              >
                {item.label}
              </span>
              {item.badge !== undefined && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-text px-1.5 text-caption font-medium text-text-inverse">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
