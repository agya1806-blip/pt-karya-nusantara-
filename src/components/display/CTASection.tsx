import { cn } from "@/lib/utils";

interface CTAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

interface CTASectionProps {
  title: string;
  description?: string;
  actions?: CTAction[];
  variant?: "default" | "brand" | "dark";
  className?: string;
}

const sectionVariants: Record<string, string> = {
  default: "bg-surface text-text",
  brand: "bg-gradient-to-br from-brand-500/90 to-brand-500/70 text-text-inverse",
  dark: "bg-surface border-y border-brand-500/20 text-text",
};

export function CTASection({
  title,
  description,
  actions,
  variant = "default",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-20 transition-colors duration-300",
        sectionVariants[variant],
        className,
      )}
    >
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-heading-xl font-light tracking-tight">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-4 text-body-lg leading-relaxed",
                variant === "default"
                  ? "text-text-secondary"
                  : "text-text-inverse/80",
              )}
            >
              {description}
            </p>
          )}
          {actions && actions.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {actions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-lg px-8 py-3 text-body-sm font-medium tracking-tight transition-all duration-300",
                    action.variant === "primary" || !action.variant
                      ? "bg-brand-500 text-text-inverse hover:bg-brand-500/90"
                      : action.variant === "secondary"
                        ? "border border-brand-500/40 text-text hover:bg-brand-500/10"
                        : "border border-brand-500/30 text-text hover:bg-brand-500/10",
                  )}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
