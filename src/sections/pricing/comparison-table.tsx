"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Check, Minus } from "lucide-react";

interface ComparisonPlan {
  name: string;
  highlighted?: boolean;
  features: string[];
}

interface ComparisonTableProps {
  title: string;
  description?: string;
  plans: ComparisonPlan[];
  className?: string;
}

export function ComparisonTable({
  title,
  description,
  plans,
  className,
}: ComparisonTableProps) {
  const allFeatures = [...new Set(plans.flatMap((p) => p.features))];

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mt-16 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-body-sm font-medium text-text-tertiary p-4 border-b border-border-light">
                  Feature
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={cn(
                      "text-center p-4 border-b",
                      plan.highlighted ? "border-text-primary bg-text-primary/5" : "border-border-light",
                    )}
                  >
                    <span className="text-body font-medium text-text-primary">{plan.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature, i) => (
                <tr key={feature}>
                  <td className="p-4 text-body-sm text-text-secondary border-b border-border-light">
                    {feature}
                  </td>
                  {plans.map((plan) => {
                    const has = plan.features.includes(feature);
                    return (
                      <td
                        key={plan.name}
                        className={cn(
                          "text-center p-4 border-b border-border-light",
                          plan.highlighted && "bg-text-primary/5",
                        )}
                      >
                        {has ? (
                          <Check size={18} className="mx-auto text-brand-500" />
                        ) : (
                          <Minus size={18} className="mx-auto text-text-tertiary" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Fade>
      </div>
    </section>
  );
}
