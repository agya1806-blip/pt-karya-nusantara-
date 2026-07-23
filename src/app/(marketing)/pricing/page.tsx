import { PricingTable } from "@/sections";
import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Pricing",
  description: "Explore our architecture service packages and pricing plans. PT Karya Nusantara Realty offers tailored solutions for every project scale.",
});

const plans = [
  {
    name: "Essential",
    description: "Perfect for small residential projects and renovations.",
    price: "IDR 150M",
    period: "per project",
    features: ["Initial Consultation", "Concept Design", "Floor Plans & Elevations", "Permit Drawings", "2 Revision Rounds"],
    cta: { label: "Get Started", href: "/contact" },
  },
  {
    name: "Premium",
    description: "Ideal for custom homes and medium-scale commercial projects.",
    price: "IDR 350M",
    period: "per project",
    features: ["Everything in Essential", "3D Renderings", "Interior Design Integration", "Material Selection", "Construction Administration", "Unlimited Revisions"],
    highlighted: true,
    cta: { label: "Most Popular", href: "/contact" },
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
        title="Our Pricing Plans"
        description="Transparent, value-driven pricing for every project scale. All plans include our commitment to design excellence."
        plans={plans}
      />
      {/* ServicePackages commented out — component not available */}
      {/* ComparisonTable commented out — component not available */}
    </>
  );
}
