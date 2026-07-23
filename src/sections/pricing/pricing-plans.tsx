"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  cta?: { label: string; href: string };
}

interface PricingPlansProps {
  label?: string;
  title: string;
  description?: string;
  plans: PricingPlan[];
  columns?: 3 | 4;
  className?: string;
}

const gridCols = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

export function PricingPlans({
  label,
  title,
  description,
  plans,
  columns = 3,
  className,
}: PricingPlansProps) {
  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger
          className={cn(
            "mt-16 grid gap-6 md:grid-cols-2",
            gridCols[columns],
          )}
        >
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-surface-muted p-8 transition-all duration-300 ease-luxury",
                  plan.highlighted
                    ? "border-border scale-105 bg-surface-dark shadow-lg"
                    : "border-border hover:border-border-muted",
                )}
              >
                {plan.highlighted && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-surface-dark px-4 py-1 text-caption font-medium tracking-widest text-text-inverse uppercase">
                    Popular
                  </span>
                )}
                <div>
                  <h3 className="text-heading font-medium text-text">
                    {plan.name}
                  </h3>
                  {plan.description && (
                    <p className="mt-1 text-body-sm text-text-secondary">
                      {plan.description}
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <span className="text-display font-light text-text tabular-nums">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-body-sm text-text-muted">
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-text-secondary"
                      />
                      <span className="text-body-sm text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {plan.cta && (
                  <a
                    href={plan.cta.href}
                    className={cn(
                      "mt-8 inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-body-sm font-medium transition-all duration-300 ease-luxury",
                      plan.highlighted
                        ? "bg-text-inverse text-text hover:opacity-90"
                        : "border border-border text-text hover:bg-surface-dark hover:text-text-inverse",
                    )}
                  >
                    {plan.cta.label}
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
