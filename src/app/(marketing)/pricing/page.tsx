import { PricingTable, ServicePackages, ComparisonTable, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Our fee structures are tailored to each project's scope and ambition. Explore indicative pricing for residential, commercial, and master planning services.",
});

const plans = [
  {
    name: "Essential",
    description: "Suitable for small-scale residential projects and renovations.",
    price: "IDR 150M",
    period: "per project",
    features: ["Initial Consultation", "Concept Design", "Floor Plans & Elevations", "Permit Drawings", "2 Revision Rounds"],
    cta: { label: "Enquire", href: "/contact" },
  },
  {
    name: "Premium",
    description: "Designed for custom homes and medium-scale commercial projects.",
    price: "IDR 350M",
    period: "per project",
    features: ["Everything in Essential", "3D Renderings", "Interior Design Integration", "Material Selection", "Construction Administration", "Unlimited Revisions"],
    highlighted: true,
    cta: { label: "Most Requested", href: "/contact" },
  },
  {
    name: "Enterprise",
    description: "Comprehensive solution for large-scale developments and master planning.",
    price: "Custom",
    period: "negotiable",
    features: ["Everything in Premium", "Full Project Management", "Sustainability Consulting", "Landscape Design", "FF&E Specification", "Post-Completion Support"],
    cta: { label: "Contact Us", href: "/contact" },
  },
];

export default function PricingPage() {
  return (
    <>
      <PricingTable
        title="Fee Structures"
        description="Indicative fee ranges for common project typologies. Every quote is tailored to the specific scope and ambition of your project."
        plans={plans}
      />
      <ServicePackages
        title="Service Packages"
        description="Select the package that best aligns with the scale of your project."
        packages={plans.map((p) => ({ title: p.name, description: p.description ?? "", price: p.price, period: p.period, features: p.features }))}
      />
      <ComparisonTable
        title="Compare Packages"
        description="An overview of what each tier includes."
        plans={plans.map((p) => ({ name: p.name, highlighted: p.highlighted, features: p.features }))}
      />
      <CTADefault
        title="Not Sure Which Package Fits?"
        description="Schedule a complimentary consultation and we will recommend the right approach for your project."
        primaryCta={{ label: "Arrange a Consultation", href: "/contact" }}
      />
    </>
  );
}
