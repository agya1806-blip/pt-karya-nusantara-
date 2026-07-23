import { cn } from "@/lib/utils";
import type { QuoteVariant } from "./types";

interface QuoteProps {
  variant?: QuoteVariant;
  attribution?: string;
  role?: string;
  className?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<QuoteVariant, string> = {
  default: "border-l-4 border-border pl-4",
  featured: "border-l-4 border-neutral-900 pl-6 text-lg",
};

export function Quote({ variant = "default", attribution, role, className, children }: QuoteProps) {
  return (
    <figure className={cn("my-6", className)}>
      <blockquote className={cn("italic text-text leading-relaxed", variantStyles[variant])}>
        {children}
      </blockquote>
      {(attribution || role) && (
        <figcaption className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
          {attribution && <span className="font-medium">{attribution}</span>}
          {role && <span className="text-text-muted">&mdash; {role}</span>}
        </figcaption>
      )}
    </figure>
  );
}