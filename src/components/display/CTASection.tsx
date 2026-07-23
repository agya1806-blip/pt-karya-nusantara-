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
  brand: "bg-brand-500 text-text-inverse",
  dark: "bg-surface-dark text-text-inverse",
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
        "py-24 md:py-32 transition-colors duration-500",
        sectionVariants[variant],
        className,
      )}
    >
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-heading-xl font-light leading-tight tracking-tight">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-6 text-body-lg leading-relaxed",
                variant === "default"
                  ? "text-text-secondary"
                  : "text-text-inverse/80",
              )}
            >
              {description}
            </p>
          )}
          {actions && actions.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              {actions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-lg px-8 py-3.5 text-body-sm font-medium tracking-tight transition-all duration-300",
                    action.variant === "primary" || !action.variant
                      ? "bg-text text-text-inverse hover:opacity-90"
                      : action.variant === "secondary"
                        ? "bg-surface text-text hover:bg-surface-muted"
                        : "border border-border-light text-text hover:bg-surface-muted",
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
