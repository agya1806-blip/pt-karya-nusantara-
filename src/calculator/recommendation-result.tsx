"use client";

import { Lightbulb, AlertTriangle, ShieldCheck } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { EstimateResult } from "./calculator-types";

interface RecommendationResultProps {
  estimate: EstimateResult;
}

export function RecommendationResult({ estimate }: RecommendationResultProps) {
  const confidenceConfig = {
    high: { icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50", label: "High Confidence" },
    medium: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", label: "Medium Confidence" },
    low: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", label: "Low Confidence" },
  };

  const conf = confidenceConfig[estimate.confidence];
  const ConfIcon = conf.icon;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <Lightbulb className="h-5 w-5 text-text-secondary" />
        <Heading as="h3" size="md" weight="light">Recommendation</Heading>
      </div>

      <div className={`flex items-start gap-4 rounded-xl border p-5 ${conf.bg}`}>
        <ConfIcon className={`h-5 w-5 shrink-0 mt-0.5 ${conf.color}`} />
        <div>
          <Text size="sm" color="secondary" className="font-medium">{conf.label}</Text>
          <Text size="sm" color="muted" className="mt-1">{estimate.recommendation}</Text>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface-muted p-5">
        <div className="flex items-start gap-4">
          <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5 text-text-muted" />
          <Text size="xs" color="muted" className="leading-relaxed">{estimate.disclaimer}</Text>
        </div>
      </div>
    </div>
  );
}
