import { AnimatedSection } from "@/components/animation";
import { HeroSection, FeaturedProjects, ServicesGrid, ProcessSteps, StatisticsShowcase, ClientReviews, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { PortfolioItem, ServiceItem, ProcessStep, StatItem, TestimonialItem } from "@/sections";

export const metadata = createMetadata();

const projects: PortfolioItem[] = [
  { title: "The Sky Villa", category: "Residential", image: { src: "/images/portfolio/villa-sky.jpg", alt: "The Sky Villa" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
  { title: "Sudirman Tower", category: "Commercial", image: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Sudirman Tower" }, href: "/portfolio/sudirman-tower", location: "Jakarta, Indonesia", year: "2023" },
  { title: "Nusantara Resort", category: "Hospitality", image: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Nusantara Resort" }, href: "/portfolio/nusantara-resort", location: "Lombok, Indonesia", year: "2025" },
  { title: "Green Valley Estate", category: "Master Planning", image: { src: "/images/portfolio/green-valley.jpg", alt: "Green Valley Estate" }, href: "/portfolio/green-valley", location: "Bandung, Indonesia", year: "2024" },
  { title: "The Sanctuary", category: "Residential", image: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" }, href: "/portfolio/the-sanctuary", location: "Ubud, Indonesia", year: "2023" },
  { title: "Marina Bay Club", category: "Hospitality", image: { src: "/images/portfolio/marina-club.jpg", alt: "Marina Bay Club" }, href: "/portfolio/marina-club", location: "Singapore", year: "2025" },
];

const services: ServiceItem[] = [
  { title: "Residential Architecture", description: "Bespoke homes and private estates crafted to the highest standards of design and comfort.", features: [], image: { src: "/images/services/residential.jpg", alt: "Residential" } },
  { title: "Commercial Architecture", description: "Distinguished workspaces and retail environments that elevate brand identity.", features: [], image: { src: "/images/services/commercial.jpg", alt: "Commercial" } },
  { title: "Hospitality Design", description: "Resorts and hotels designed to create lasting impressions through considered spatial narratives.", features: [], image: { src: "/images/services/hospitality.jpg", alt: "Hospitality" } },
  { title: "Master Planning", description: "Comprehensive precinct strategies that balance vision, density, and placemaking.", features: [], image: { src: "/images/services/master-planning.jpg", alt: "Master Planning" } },
];

const steps: ProcessStep[] = [
  { title: "Discovery", description: "Understanding your vision, aspirations, and the unique character of your site.", icon: "search" },
  { title: "Concept Design", description: "Translating ideas into spatial narratives through sketches, mood boards, and study models.", icon: "lightbulb" },
  { title: "Design Development", description: "Refining every detail — materials, proportions, systems, and budget alignment.", icon: "pen-tool" },
  { title: "Construction", description: "Rigorous design oversight to ensure every element is realised with precision.", icon: "hard-hat" },
];

const stats: StatItem[] = [
  { value: "200", label: "Projects Delivered", suffix: "+" },
  { value: "50", label: "Design Awards Received", suffix: "+" },
  { value: "15", label: "Years in Practice" },
  { value: "8", label: "Countries Reached" },
];

const testimonials: TestimonialItem[] = [
  { name: "James Thompson", role: "CEO", company: "Harmony Developments", content: "PT Karya Nusantara Realty exceeded our expectations. Their attention to detail and commitment to design excellence is unparalleled.", avatar: { src: "/images/testimonials/james.jpg", alt: "James Thompson" }, rating: 5 },
  { name: "Miyako Tanaka", role: "Director", company: "Luxury Retreats Asia", content: "Working with this team was a pleasure. They understood our vision perfectly and delivered a resort that has become an icon.", avatar: { src: "/images/testimonials/miyako.jpg", alt: "Miyako Tanaka" }, rating: 5 },
  { name: "David Chen", role: "Founder", company: "Chen Properties", content: "The most talented architects we have worked with in Southeast Asia. Our villa has received countless compliments.", avatar: { src: "/images/testimonials/david.jpg", alt: "David Chen" }, rating: 5 },
];

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Crafting Timeless Architecture"
        subtitle="PT Karya Nusantara Realty"
        description="An architecture and design practice dedicated to creating spaces of enduring beauty and purpose. Rooted in Aceh, reaching across the globe."
        background={{ src: "/images/hero/home-hero.jpg", alt: "Luxury architecture showcase" }}
        actions={[
          { label: "View Portfolio", href: "/portfolio", variant: "primary" },
          { label: "Contact Us", href: "/contact", variant: "outline" },
        ]}
      />
      <AnimatedSection>
        <FeaturedProjects
          title="Featured Projects"
          description="A curated selection of our work, each project a testament to considered design and meticulous craft."
          projects={projects.slice(0, 4)}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <StatisticsShowcase
          title="By the Numbers"
          description="A measure of the trust our clients place in us."
          stats={stats}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ServicesGrid
          title="Our Services"
          description="A full spectrum of architectural and design capabilities, each delivered with the same exacting standard."
          services={services}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <ProcessSteps
          title="How We Work"
          description="A disciplined process that transforms vision into built reality, thoughtfully and without compromise."
          steps={steps}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <ClientReviews
          title="What Our Clients Say"
          description="The voices of those we have had the privilege to serve."
          testimonials={testimonials}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <CTADefault
          title="Let Us Realise Your Vision"
          description="Every significant project begins with a conversation. Share your aspirations with us and discover the possibilities."
          primaryCta={{ label: "Arrange a Consultation", href: "/contact" }}
          secondaryCta={{ label: "View Our Portfolio", href: "/portfolio" }}
        />
      </AnimatedSection>
    </>
  );
}
