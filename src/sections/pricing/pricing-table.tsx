"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { Check } from "lucide-react";
import Link from "next/link";

interface PricingPlan {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  cta?: { label: string; href: string };
}

interface PricingTableProps {
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

export function PricingTable({
  label,
  title,
  description,
  plans,
  columns = 3,
  className,
}: PricingTableProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
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
                  "relative flex flex-col rounded-2xl border bg-surface p-8 transition-all duration-300 hover:shadow-elevation-2",
                  plan.highlighted
                    ? "border-text-primary shadow-elevation-1"
                    : "border-border-light",
                )}
              >
                {plan.highlighted && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-text-primary px-4 py-1 text-caption font-medium text-text-inverse">
                    Popular
                  </span>
                )}
                <div>
                  <h3 className="text-heading font-medium text-text-primary">
                    {plan.name}
                  </h3>
                  {plan.description && (
                    <p className="mt-1 text-body-sm text-text-secondary">
                      {plan.description}
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <span className="text-display font-light text-text-primary tabular-nums">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-body-sm text-text-secondary">
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-brand-500"
                      />
                      <span className="text-body-sm text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                {plan.cta && (
                  <Link
                    href={plan.cta.href}
                    className={cn(
                      "mt-8 inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-body-sm font-medium transition-all duration-300",
                      plan.highlighted
                        ? "bg-text-primary text-text-inverse hover:opacity-90"
                        : "border border-border-light text-text-primary hover:bg-surface-secondary",
                    )}
                  >
                    {plan.cta.label}
                  </Link>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
