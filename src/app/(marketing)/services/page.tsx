import { AnimatedSection } from "@/components/animation";
import { ServiceOverview, ServicesGrid, ProcessSteps, ConsultationCTA, CTADefault } from "@/sections";
import { createMetadata, createServiceSchema, JsonLdScript } from "@/seo";
import { siteConfig } from "@/config";
import type { ServiceItem, ProcessStep } from "@/sections";

export const metadata = createMetadata({
  title: "Services",
  description: "A full spectrum of architecture and design services — from private residences to large-scale master planning — delivered with uncompromising quality.",
});

const services: ServiceItem[] = [
  { title: "Residential Architecture", description: "Bespoke homes, villas, and private residences — each conceived as a unique expression of its owner and site.", features: ["Custom Home Design", "Renovation & Expansion", "Interior Architecture", "Landscape Integration"], image: { src: "/images/services/residential.jpg", alt: "Luxury residential architecture" }, href: "/contact" },
  { title: "Commercial Architecture", description: "Office towers, retail environments, and mixed-use developments designed to elevate brand identity and user experience.", features: ["Office Buildings", "Retail & Hospitality", "Mixed-Use Developments", "Workplace Strategy"], image: { src: "/images/services/commercial.jpg", alt: "Commercial architecture" }, href: "/contact" },
  { title: "Hospitality Design", description: "Resorts, hotels, and restaurants where architecture becomes an essential part of the guest experience.", features: ["Resort Design", "Hotel Architecture", "Restaurant & Bar", "Spa & Wellness"], image: { src: "/images/services/hospitality.jpg", alt: "Hospitality design" }, href: "/contact" },
  { title: "Master Planning", description: "Strategic site planning and urban design for large-scale developments and new communities.", features: ["Site Analysis", "Urban Design", "Infrastructure Planning", "Sustainability Strategy"], image: { src: "/images/services/master-planning.jpg", alt: "Master planning" }, href: "/contact" },
  { title: "Interior Design", description: "Refined interiors where material, proportion, and light come together to create spaces of character.", features: ["Spatial Planning", "Material Selection", "Custom Furniture", "Lighting Design"], image: { src: "/images/services/interior.jpg", alt: "Interior design" }, href: "/contact" },
  { title: "Sustainable Design", description: "Architecture that treads lightly — low-carbon materials, passive strategies, and a commitment to longevity.", features: ["Passive Design", "Energy Modeling", "Material Sourcing", "Green Certification"], image: { src: "/images/services/sustainable.jpg", alt: "Sustainable architecture" }, href: "/contact" },
];

const workflowSteps: ProcessStep[] = [
  { title: "Discovery", description: "Understanding your vision, aspirations, and the unique character of your site through a rigorous consultation." },
  { title: "Concept Design", description: "Translating ideas into spatial narratives through sketches, mood boards, and study models for your consideration." },
  { title: "Design Development", description: "Refining every detail — materials, proportions, systems, and budget — with precision and clarity." },
  { title: "Construction Documents", description: "Comprehensive technical drawings and specifications prepared for permitting, tendering, and construction." },
  { title: "Construction Administration", description: "Rigorous design oversight throughout construction to ensure every element is realised as intended." },
];

export default function ServicesPage() {
  return (
    <>
      {services.map((service, index) => (
        <JsonLdScript
          key={service.title}
          data={createServiceSchema({
            name: service.title,
            description: service.description,
            image: service.image?.src,
            providerName: siteConfig.name,
          })}
          id={`service-schema-${index}`}
        />
      ))}
      <AnimatedSection>
        <ServiceOverview
          title="Our Services"
          description="From concept to completion, each commission receives the full attention of our studio — a depth of care that distinguishes our work."
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <ServicesGrid title="Our Services" description="A full spectrum of architectural and design capabilities, delivered with a consistent standard of excellence." services={services} />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ProcessSteps title="How We Work" steps={workflowSteps} />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <ConsultationCTA
          title="Arrange a Consultation"
          description="Speak with our team about your project in a complimentary consultation tailored to your needs."
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <CTADefault
          title="Not Certain Where to Begin?"
          description="Describe your project to us and we will recommend the most suitable approach during a complimentary consultation."
          primaryCta={{ label: "Arrange a Consultation", href: "/contact" }}
        />
      </AnimatedSection>
    </>
  );
}