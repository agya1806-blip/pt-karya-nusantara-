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
  { title: "Residential Architecture", description: "Luxury custom homes and villas tailored to your lifestyle.", features: [], image: { src: "/images/services/residential.jpg", alt: "Residential" } },
  { title: "Commercial Architecture", description: "Innovative spaces for business and retail.", features: [], image: { src: "/images/services/commercial.jpg", alt: "Commercial" } },
  { title: "Hospitality Design", description: "Exceptional experiences through thoughtful design.", features: [], image: { src: "/images/services/hospitality.jpg", alt: "Hospitality" } },
  { title: "Master Planning", description: "Comprehensive planning for large-scale developments.", features: [], image: { src: "/images/services/master-planning.jpg", alt: "Master Planning" } },
];

const steps: ProcessStep[] = [
  { title: "Discovery", description: "We learn about your vision, needs, and site conditions.", icon: "search" },
  { title: "Concept Design", description: "Initial design concepts and mood boards for your review.", icon: "lightbulb" },
  { title: "Design Development", description: "Refined drawings, material selection, and budget.", icon: "pen-tool" },
  { title: "Construction", description: "Expert administration ensuring faithful execution.", icon: "hard-hat" },
];

const stats: StatItem[] = [
  { value: "200", label: "Projects Completed", suffix: "+" },
  { value: "50", label: "Awards Won", suffix: "+" },
  { value: "15", label: "Years of Experience" },
  { value: "8", label: "Countries Served" },
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
        description="World-class luxury architecture firm crafting timeless spaces that inspire and endure. Based in Jakarta, serving globally."
        background={{ src: "/images/hero/home-hero.jpg", alt: "Luxury architecture showcase" }}
        actions={[
          { label: "View Portfolio", href: "/portfolio", variant: "primary" },
          { label: "Contact Us", href: "/contact", variant: "outline" },
        ]}
      />
      <FeaturedProjects
        title="Featured Projects"
        description="A selection of our most remarkable projects, showcasing the breadth of our expertise."
        projects={projects.slice(0, 4)}
      />
      <StatisticsShowcase
        title="By the Numbers"
        description="Our track record of excellence."
        stats={stats}
      />
      <ServicesGrid
        title="Our Services"
        description="Comprehensive architectural services tailored to your vision."
        services={services}
      />
      <ProcessSteps
        title="How We Work"
        description="Our proven process ensures exceptional results for every project."
        steps={steps}
      />
      <ClientReviews
        title="What Our Clients Say"
        description="Hear from the clients who have trusted us with their vision."
        testimonials={testimonials}
      />
      <CTADefault
        title="Begin Your Architectural Journey"
        description="Every masterpiece begins with a conversation. Share your vision with us and discover what we can create together."
        primaryCta={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCta={{ label: "View Our Portfolio", href: "/portfolio" }}
      />
    </>
  );
}
