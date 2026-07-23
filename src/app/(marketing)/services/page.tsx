import { ServicesGrid, ProcessSteps, ConsultationCTA, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { ServiceItem, ProcessStep } from "@/sections";

export const metadata = createMetadata({
  title: "Services",
  description: "Comprehensive luxury architecture services — from residential design to master planning. PT Karya Nusantara Realty delivers world-class solutions.",
});

const services: ServiceItem[] = [
  { title: "Residential Architecture", description: "Luxury custom homes, villas, and apartments designed to reflect your unique lifestyle and vision.", features: ["Custom Home Design", "Renovation & Expansion", "Interior Architecture", "Landscape Integration"], image: { src: "/images/services/residential.jpg", alt: "Luxury residential architecture" } },
  { title: "Commercial Architecture", description: "Innovative office spaces, retail environments, and mixed-use developments that elevate brands.", features: ["Office Buildings", "Retail & Hospitality", "Mixed-Use Developments", "Workplace Strategy"], image: { src: "/images/services/commercial.jpg", alt: "Commercial architecture" } },
  { title: "Hospitality Design", description: "Resorts, hotels, and restaurants that deliver unforgettable guest experiences through exceptional design.", features: ["Resort Design", "Hotel Architecture", "Restaurant & Bar", "Spa & Wellness"], image: { src: "/images/services/hospitality.jpg", alt: "Hospitality design" } },
  { title: "Master Planning", description: "Comprehensive site planning and urban design for large-scale developments and communities.", features: ["Site Analysis", "Urban Design", "Infrastructure Planning", "Sustainability Strategy"], image: { src: "/images/services/master-planning.jpg", alt: "Master planning" } },
  { title: "Interior Design", description: "Sophisticated interior spaces that seamlessly blend aesthetics, comfort, and functionality.", features: ["Spatial Planning", "Material Selection", "Custom Furniture", "Lighting Design"], image: { src: "/images/services/interior.jpg", alt: "Interior design" } },
  { title: "Sustainable Design", description: "Eco-conscious architecture that minimizes environmental impact without compromising luxury.", features: ["Passive Design", "Energy Modeling", "Material Sourcing", "Green Certification"], image: { src: "/images/services/sustainable.jpg", alt: "Sustainable architecture" } },
];

const workflowSteps: ProcessStep[] = [
  { title: "Discovery", description: "We learn about your vision, needs, and site conditions through in-depth consultation." },
  { title: "Concept Design", description: "Our team develops initial design concepts, sketches, and mood boards for your review." },
  { title: "Design Development", description: "We refine the chosen concept with detailed drawings, material selections, and budgets." },
  { title: "Construction Documents", description: "Comprehensive technical drawings and specifications are prepared for permitting and bidding." },
  { title: "Construction Administration", description: "We oversee construction to ensure the design vision is executed to perfection." },
];

export default function ServicesPage() {
  return (
    <>
      {/* ServiceOverview commented out — component not available */}
      <ServicesGrid title="Our Services" description="From concept to completion, we provide end-to-end architectural services that bring your vision to life. Each project receives the highest level of attention and expertise." services={services} />
      <ProcessSteps title="How We Work" steps={workflowSteps} />
      <ConsultationCTA
        title="Book a Consultation"
        description="Schedule a complimentary consultation with our team to discuss your project requirements."
      />
      <CTADefault
        title="Let's Create Something Extraordinary"
        description="Ready to begin? Contact us to discuss your project and discover how we can bring your vision to life."
        primaryCta={{ label: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}
