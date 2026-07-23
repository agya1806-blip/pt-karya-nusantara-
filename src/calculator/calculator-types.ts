export type BuildingType = "residential" | "commercial" | "hospitality" | "cultural" | "educational" | "mixed-use";

export interface BuildingInput {
  type: BuildingType;
  totalArea: number;
  floors: number;
  location: string;
  complexity: "simple" | "moderate" | "complex" | "premium";
  includedServices: ("architecture" | "interior" | "landscape" | "structural" | "mep")[];
}

export interface CostBreakdown {
  architecture: { percentage: number; amount: number };
  interior: { percentage: number; amount: number };
  landscape: { percentage: number; amount: number };
  structural: { percentage: number; amount: number };
  mep: { percentage: number; amount: number };
  total: number;
}

export interface EstimateResult {
  buildingInput: BuildingInput;
  estimatedCost: CostBreakdown;
  estimatedTimeline: {
    design: { min: number; max: number; unit: "weeks" };
    documentation: { min: number; max: number; unit: "weeks" };
    permitting: { min: number; max: number; unit: "weeks" };
    construction: { min: number; max: number; unit: "months" };
    total: { min: number; max: number; unit: "months" };
  };
  recommendation: string;
  confidence: "low" | "medium" | "high";
  disclaimer: string;
}

export interface CalculatorConfig {
  baseRates: Record<BuildingType, { design: number; construction: number }>;
  complexityMultipliers: Record<string, number>;
  floorMultiplier: number;
  locationMultipliers: Record<string, number>;
}

export interface CalculatorFormData extends BuildingInput {
  name: string;
  email: string;
  phone: string;
  projectDescription: string;
}
