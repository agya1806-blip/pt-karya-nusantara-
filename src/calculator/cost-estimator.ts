import type { BuildingInput, CostBreakdown, EstimateResult, CalculatorConfig } from "./calculator-types";

const defaultConfig: CalculatorConfig = {
  baseRates: {
    residential: { design: 150, construction: 2500 },
    commercial: { design: 200, construction: 3500 },
    hospitality: { design: 250, construction: 4000 },
    cultural: { design: 300, construction: 4500 },
    educational: { design: 180, construction: 3000 },
    "mixed-use": { design: 220, construction: 3800 },
  },
  complexityMultipliers: { simple: 0.8, moderate: 1.0, complex: 1.3, premium: 1.6 },
  floorMultiplier: 0.05,
  locationMultipliers: { urban: 1.2, suburban: 1.0, rural: 0.85 },
};

const serviceAllocation: Record<string, { architecture: number; interior: number; landscape: number; structural: number; mep: number }> = {
  residential: { architecture: 35, interior: 25, landscape: 10, structural: 15, mep: 15 },
  commercial: { architecture: 30, interior: 20, landscape: 5, structural: 20, mep: 25 },
  hospitality: { architecture: 30, interior: 30, landscape: 10, structural: 15, mep: 15 },
  cultural: { architecture: 40, interior: 20, landscape: 15, structural: 15, mep: 10 },
  educational: { architecture: 35, interior: 20, landscape: 10, structural: 20, mep: 15 },
  "mixed-use": { architecture: 30, interior: 25, landscape: 10, structural: 15, mep: 20 },
};

export function calculateEstimate(
  input: BuildingInput,
  config: CalculatorConfig = defaultConfig
): EstimateResult {
  const rates = (config.baseRates[input.type] ?? config.baseRates.residential)!;
  const complexityMultiplier = config.complexityMultipliers[input.complexity] ?? 1;
  const locationMultiplier = config.locationMultipliers[input.location] ?? 1;
  const floorMultiplier = 1 + (input.floors - 1) * config.floorMultiplier;

  const baseDesignRate = rates.design * complexityMultiplier * locationMultiplier * floorMultiplier;
  const baseConstructionRate = rates.construction * complexityMultiplier * locationMultiplier * floorMultiplier;

  const designFee = input.totalArea * baseDesignRate;
  const constructionCost = input.totalArea * baseConstructionRate;

  const allocation = (serviceAllocation[input.type] ?? serviceAllocation.residential)!;
  const included = input.includedServices;

  const architectureCost = included.includes("architecture") ? constructionCost * (allocation.architecture / 100) : 0;
  const interiorCost = included.includes("interior") ? constructionCost * (allocation.interior / 100) : 0;
  const landscapeCost = included.includes("landscape") ? constructionCost * (allocation.landscape / 100) : 0;
  const structuralCost = included.includes("structural") ? constructionCost * (allocation.structural / 100) : 0;
  const mepCost = included.includes("mep") ? constructionCost * (allocation.mep / 100) : 0;

  const totalServiceCost = architectureCost + interiorCost + landscapeCost + structuralCost + mepCost;
  const total = designFee + totalServiceCost;

  const estimatedTimeline = {
    design: { min: 4, max: 12, unit: "weeks" as const },
    documentation: { min: 6, max: 16, unit: "weeks" as const },
    permitting: { min: 4, max: 12, unit: "weeks" as const },
    construction: {
      min: Math.max(3, Math.round(input.totalArea / 500)),
      max: Math.max(6, Math.round(input.totalArea / 300)),
      unit: "months" as const,
    },
    total: {
      min: Math.max(6, Math.round(input.totalArea / 300)),
      max: Math.max(12, Math.round(input.totalArea / 200)),
      unit: "months" as const,
    },
  };

  const confidence = input.complexity === "simple" && input.totalArea < 500 ? "high"
    : input.complexity === "complex" || input.totalArea > 5000 ? "low"
    : "medium";

  const recommendation = generateRecommendation(input, total, estimatedTimeline);

  return {
    buildingInput: input,
    estimatedCost: {
      architecture: { percentage: allocation.architecture, amount: architectureCost },
      interior: { percentage: allocation.interior, amount: interiorCost },
      landscape: { percentage: allocation.landscape, amount: landscapeCost },
      structural: { percentage: allocation.structural, amount: structuralCost },
      mep: { percentage: allocation.mep, amount: mepCost },
      total,
    },
    estimatedTimeline,
    recommendation,
    confidence,
    disclaimer: "This estimate is for reference only. Actual costs and timelines depend on site conditions, regulatory requirements, material availability, and market rates. Please schedule a consultation for a detailed proposal.",
  };
}

function generateRecommendation(input: BuildingInput, total: number, timeline: EstimateResult["estimatedTimeline"]): string {
  const recs: string[] = [];

  if (input.totalArea > 5000) recs.push("Consider phasing the project to manage complexity and cash flow effectively.");
  if (input.complexity === "premium") recs.push("A premium tier project benefits from early engagement of all consultants to align on quality benchmarks.");
  if (input.floors > 10) recs.push("High-rise projects require specialized structural and MEP engineering. We recommend engaging these consultants early.");

  if (recs.length === 0) recs.push("Based on the provided parameters, a standard design and construction approach is recommended. We can provide a more tailored recommendation during a detailed consultation.");

  return recs.join(" ");
}
