import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel?: string;
}

interface PricingSectionProps {
  title?: string;
  description?: string;
  plans: PricingPlan[];
  className?: string;
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border bg-surface p-8 transition-all duration-300",
        plan.highlighted
          ? "border-text shadow-elevation-4 scale-105"
          : "border-border-muted hover:border-border hover:shadow-elevation-3",
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-text px-4 py-1 text-caption font-semibold tracking-widest uppercase text-text-inverse">
          Featured
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-heading-sm font-medium text-text">{plan.name}</h3>
        {plan.description && (
          <p className="mt-1 text-body-sm leading-relaxed text-text-secondary">
            {plan.description}
          </p>
        )}
      </div>

      <div className="mb-8">
        <span className="text-display font-light tracking-tight text-text">
          {plan.price}
        </span>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={18} className="mt-0.5 flex-shrink-0 text-text" />
            <span className="text-body-sm leading-relaxed text-text-secondary">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className={cn(
          "inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-body-sm font-medium tracking-tight transition-all duration-300",
          plan.highlighted
            ? "bg-text text-text-inverse hover:opacity-90"
            : "border border-border text-text hover:bg-surface-muted",
        )}
      >
        {plan.ctaLabel ?? "Get Started"}
      </a>
    </div>
  );
}

export function PricingSection({
  title,
  description,
  plans,
  className,
}: PricingSectionProps) {
  return (
    <section className={cn("py-20", className)}>
      <div className="container-site">
        {(title || description) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2 className="text-heading-xl font-light tracking-tight text-text">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-body-lg leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
