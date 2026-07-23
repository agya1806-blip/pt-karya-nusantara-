import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumb({
  items,
  showHome = true,
  className,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-1.5 text-body-sm text-text-muted">
        {showHome && (
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 transition-colors duration-300 hover:text-text"
            >
              <Home size={14} />
              <span className="sr-only">Home</span>
            </Link>
          </li>
        )}

        {showHome && items.length > 0 && (
          <li className="flex items-center">
            <ChevronRight size={14} />
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors duration-300 hover:text-text"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast ? "text-text" : "text-text-muted")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && <ChevronRight size={14} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
