import { ServiceDetail, CTADefault } from "@/sections";
import { createMetadata, createBreadcrumbSchema, JsonLdScript } from "@/seo";
import type { ServiceItem } from "@/sections";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const serviceData: Record<string, ServiceItem> = {
  residential: {
    title: "Residential Architecture",
    description: "Bespoke homes, villas, and private residences — each conceived as a unique expression of its owner and site. Our residential work combines timeless sensibility with modern rigour.",
    features: ["Custom Home Design", "Renovation & Expansion", "Interior Architecture", "Landscape Integration", "Home Automation", "Sustainable Materials"],
    image: { src: "/images/services/residential-detail.jpg", alt: "Residential architecture detail" },
  },
  commercial: {
    title: "Commercial Architecture",
    description: "Office environments, retail spaces, and mixed-use developments designed to elevate brand identity and enrich user experience.",
    features: ["Office Buildings", "Retail Environments", "Mixed-Use Developments", "Workplace Strategy", "Brand Integration", "Adaptive Reuse"],
    image: { src: "/images/services/commercial-detail.jpg", alt: "Commercial architecture detail" },
  },
  hospitality: {
    title: "Hospitality Design",
    description: "Resorts, hotels, and restaurants where architecture shapes memory. Every detail is considered for its contribution to the guest journey.",
    features: ["Resort Design", "Hotel Architecture", "Restaurant & Bar", "Spa & Wellness", "Guest Experience Design", "FF&E Specification"],
    image: { src: "/images/services/hospitality-detail.jpg", alt: "Hospitality design detail" },
  },
  "master-planning": {
    title: "Master Planning",
    description: "Strategic site planning and urban design for large-scale developments. Master plans that balance density, ecology, infrastructure, and a sense of place.",
    features: ["Site Analysis", "Urban Design", "Infrastructure Planning", "Sustainability Strategy", "Zoning & Compliance", "Community Development"],
    image: { src: "/images/services/master-planning-detail.jpg", alt: "Master planning detail" },
  },
  "interior-design": {
    title: "Interior Design",
    description: "Interiors of character — where material, proportion, and light are orchestrated to create spaces that feel as refined as they are inhabitable.",
    features: ["Spatial Planning", "Material Selection", "Custom Furniture", "Lighting Design", "Colour Consultation", "Art Curation"],
    image: { src: "/images/services/interior-detail.jpg", alt: "Interior design detail" },
  },
  "sustainable-design": {
    title: "Sustainable Design",
    description: "Architecture that honours its environment. Low-carbon strategies, passive systems, and material stewardship — without compromising design calibre.",
    features: ["Passive Design", "Energy Modelling", "Material Sourcing", "Green Certification", "Water Conservation", "Waste Reduction"],
    image: { src: "/images/services/sustainable-detail.jpg", alt: "Sustainable design detail" },
  },
};

export async function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) return createMetadata({ title: "Service Not Found" });
  return createMetadata({ title: service.title, description: service.description });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceData[slug] ?? {
    title: "Service Not Found",
    description: "The requested service could not be found.",
    features: [],
    image: { src: "", alt: "" },
  };

  return (
    <>
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Services", href: "/services" },
        { name: service.title },
      ])} id="breadcrumb-schema" />
      <ServiceDetail {...service} />
      <CTADefault
        title="Interested in This Service?"
        description="Let us explore how we can tailor this service to the specific requirements of your project."
        primaryCta={{ label: "Discuss Your Project", href: "/contact" }}
      />
    </>
  );
}
