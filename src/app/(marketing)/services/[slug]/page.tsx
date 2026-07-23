import { ServiceDetail, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { ServiceItem } from "@/sections";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const serviceData: Record<string, ServiceItem> = {
  residential: {
    title: "Residential Architecture",
    description: "Luxury custom homes, villas, and apartments designed to reflect your unique lifestyle and vision. Our residential practice combines timeless aesthetics with modern functionality.",
    features: ["Custom Home Design", "Renovation & Expansion", "Interior Architecture", "Landscape Integration", "Smart Home Integration", "Sustainable Materials"],
    image: { src: "/images/services/residential-detail.jpg", alt: "Residential architecture detail" },
  },
  commercial: {
    title: "Commercial Architecture",
    description: "Innovative office spaces, retail environments, and mixed-use developments that elevate brands and enhance user experience.",
    features: ["Office Buildings", "Retail & Hospitality", "Mixed-Use Developments", "Workplace Strategy", "Brand Integration", "Adaptive Reuse"],
    image: { src: "/images/services/commercial-detail.jpg", alt: "Commercial architecture detail" },
  },
  hospitality: {
    title: "Hospitality Design",
    description: "Resorts, hotels, and restaurants that deliver unforgettable guest experiences through exceptional design and attention to detail.",
    features: ["Resort Design", "Hotel Architecture", "Restaurant & Bar", "Spa & Wellness", "Guest Experience Design", "FF&E Specification"],
    image: { src: "/images/services/hospitality-detail.jpg", alt: "Hospitality design detail" },
  },
  "master-planning": {
    title: "Master Planning",
    description: "Comprehensive site planning and urban design for large-scale developments and communities. We create visionary master plans that balance density, green space, infrastructure, and community needs.",
    features: ["Site Analysis", "Urban Design", "Infrastructure Planning", "Sustainability Strategy", "Zoning & Compliance", "Community Development"],
    image: { src: "/images/services/master-planning-detail.jpg", alt: "Master planning detail" },
  },
  "interior-design": {
    title: "Interior Design",
    description: "Sophisticated interior spaces that seamlessly blend aesthetics, comfort, and functionality. Our interior design team works in close harmony with our architects to create cohesive environments.",
    features: ["Spatial Planning", "Material Selection", "Custom Furniture", "Lighting Design", "Color Consultation", "Art Curation"],
    image: { src: "/images/services/interior-detail.jpg", alt: "Interior design detail" },
  },
  "sustainable-design": {
    title: "Sustainable Design",
    description: "Eco-conscious architecture that minimizes environmental impact without compromising luxury or design excellence. We lead the industry in green building practices.",
    features: ["Passive Design", "Energy Modeling", "Material Sourcing", "Green Certification", "Water Conservation", "Waste Reduction"],
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
      <ServiceDetail {...service} />
      <CTADefault
        title="Interested in This Service?"
        description="Contact us to discuss how we can tailor this service to your project's unique requirements."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
