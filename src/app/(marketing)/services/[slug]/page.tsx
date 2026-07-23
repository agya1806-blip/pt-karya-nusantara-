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
      <ServiceDetail service={service} />
      <CTADefault
        title="Interested in This Service?"
        description="Contact us to discuss how we can tailor this service to your project's unique requirements."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
