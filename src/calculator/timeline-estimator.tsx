"use client";

import { CalendarDays } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { EstimateResult } from "./calculator-types";

interface TimelineEstimatorProps {
  estimate: Pick<EstimateResult, "estimatedTimeline">;
}

export function TimelineEstimator({ estimate }: TimelineEstimatorProps) {
  const phases = [
    { key: "design" as const, label: "Design Phase" },
    { key: "documentation" as const, label: "Documentation" },
    { key: "permitting" as const, label: "Permitting" },
    { key: "construction" as const, label: "Construction" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <CalendarDays className="h-5 w-5 text-text-secondary" />
        <Heading as="h3" size="md" weight="light">Estimated Timeline</Heading>
      </div>

      <div className="space-y-0">
        {phases.map((phase, i) => {
          const p = estimate.estimatedTimeline[phase.key];
          return (
            <div key={phase.key} className="flex items-center gap-4 py-4 border-t border-border">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted">
                <span className="text-body-xs font-medium text-text-secondary">{i + 1}</span>
              </div>
              <div className="flex-1">
                <Text size="sm" color="secondary" className="font-medium">{phase.label}</Text>
              </div>
              <div className="text-right">
                <Text size="sm" color="muted">
                  {p.min} &ndash; {p.max} {p.unit === "weeks" ? "weeks" : "months"}
                </Text>
              </div>
            </div>
          );
        })}
        <div className="flex items-center gap-4 py-4 border-t-2 border-text">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-text">
            <span className="text-body-xs font-medium text-text-inverse">T</span>
          </div>
          <div className="flex-1">
            <Text size="sm" className="font-medium text-text">Total Estimated Timeline</Text>
          </div>
          <div className="text-right">
            <Text size="sm" className="text-text font-medium">
              {estimate.estimatedTimeline.total.min} &ndash; {estimate.estimatedTimeline.total.max} months
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
