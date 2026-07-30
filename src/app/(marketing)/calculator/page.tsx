"use client";

import { useState } from "react";
import { SectionHeader } from "@/sections/shared/section-header";
import { BuildingAreaCalculator, TimelineEstimator, RecommendationResult, calculateEstimate } from "@/calculator";
import { CTADefault } from "@/sections";
import type { BuildingInput, EstimateResult } from "@/calculator";

const initialBuildingInput: BuildingInput = {
  type: "residential",
  totalArea: 0,
  floors: 1,
  complexity: "moderate",
  location: "suburban",
  includedServices: ["architecture"],
};

export default function CalculatorPage() {
  const [area, setArea] = useState(0);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);

  const handleAreaCalculated = (totalArea: number) => {
    setArea(totalArea);
  };

  const handleCalculate = () => {
    if (area <= 0) return;
    const input: BuildingInput = {
      ...initialBuildingInput,
      totalArea: area,
    };
    const result = calculateEstimate(input);
    setEstimate(result);
  };

  return (
    <>
      <div className="bg-surface pt-32 pb-8">
        <div className="container-site">
          <SectionHeader
            title="Architecture Cost Calculator"
            description="Estimate the cost and timeline for your project. Use our calculator to get a preliminary budget and timeline based on your building area and requirements."
            align="center"
          />
        </div>
      </div>

      <section className="bg-surface-secondary py-16">
        <div className="container-site">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border-light bg-surface p-8 md:p-12">
              <BuildingAreaCalculator onAreaCalculated={handleAreaCalculated} />
              {area > 0 && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleCalculate}
                    className="inline-flex items-center gap-2 rounded-lg bg-text-primary px-8 py-3.5 text-body-sm font-medium text-text-inverse transition-all duration-300 hover:opacity-90"
                  >
                    Calculate Estimate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {estimate && (
        <>
          <section className="bg-surface py-16">
            <div className="container-site">
              <div className="mx-auto max-w-4xl">
                <SectionHeader
                  title="Your Estimate"
                  description="Preliminary cost breakdown and timeline based on your inputs."
                  align="center"
                />
                <div className="mt-12 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-border-light bg-surface-secondary p-8">
                    <p className="text-caption font-medium tracking-widest text-text-tertiary uppercase">Total Estimated Cost</p>
                    <p className="mt-2 text-display font-light text-text-primary tabular-nums">
                      IDR {estimate.estimatedCost.total.toLocaleString("id-ID")}
                    </p>
                    <p className="mt-1 text-body-sm text-text-secondary">
                      Architecture: IDR {estimate.estimatedCost.architecture.amount.toLocaleString("id-ID")} ({estimate.estimatedCost.architecture.percentage}%)
                    </p>
                    <p className="text-body-sm text-text-secondary">
                      Interior: IDR {estimate.estimatedCost.interior.amount.toLocaleString("id-ID")} ({estimate.estimatedCost.interior.percentage}%)
                    </p>
                    <p className="text-body-sm text-text-secondary">
                      Landscape: IDR {estimate.estimatedCost.landscape.amount.toLocaleString("id-ID")} ({estimate.estimatedCost.landscape.percentage}%)
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border-light bg-surface-secondary p-8">
                    <TimelineEstimator estimate={estimate} />
                  </div>
                </div>
                <div className="mt-6">
                  <RecommendationResult estimate={estimate} />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-secondary py-16">
            <div className="container-site">
              <div className="mx-auto max-w-4xl">
                <SectionHeader
                  title="Detailed Cost Breakdown"
                  align="center"
                />
                <div className="mt-12 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left p-4 border-b border-border-light text-body-sm font-medium text-text-tertiary">Service</th>
                        <th className="text-right p-4 border-b border-border-light text-body-sm font-medium text-text-tertiary">Percentage</th>
                        <th className="text-right p-4 border-b border-border-light text-body-sm font-medium text-text-tertiary">Estimated Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Architecture", key: "architecture" as const },
                        { label: "Interior", key: "interior" as const },
                        { label: "Landscape", key: "landscape" as const },
                        { label: "Structural", key: "structural" as const },
                        { label: "MEP", key: "mep" as const },
                      ].map((item) => {
                        const cost = estimate.estimatedCost[item.key];
                        return (
                          <tr key={item.key}>
                            <td className="p-4 border-b border-border-light text-body text-text-primary">{item.label}</td>
                            <td className="p-4 border-b border-border-light text-right text-body text-text-secondary">{cost.percentage}%</td>
                            <td className="p-4 border-b border-border-light text-right text-body text-text-secondary tabular-nums">
                              IDR {cost.amount.toLocaleString("id-ID")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="p-4 text-body font-medium text-text-primary">Total</td>
                        <td className="p-4 text-right text-body font-medium text-text-primary">100%</td>
                        <td className="p-4 text-right text-body font-medium text-text-primary tabular-nums">
                          IDR {estimate.estimatedCost.total.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <CTADefault
        title="Ready to Start Your Project?"
        description="Schedule a complimentary consultation for a detailed proposal tailored to your specific needs."
        primaryCta={{ label: "Book a Consultation", href: "/contact" }}
        secondaryCta={{ label: "View Our Portfolio", href: "/portfolio" }}
      />
    </>
  );
}