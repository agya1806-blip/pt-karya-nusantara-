import { AnimatedSection } from "@/components/animation";
import { FeaturedProjects, ProjectCategories, StatisticsShowcase, CTADefault, SectionHeader } from "@/sections";
import { createMetadata, createWebsiteSchema, JsonLdScript } from "@/seo";
import type { PortfolioItem, StatItem } from "@/sections";

export const metadata = createMetadata({
  title: "Portfolio",
  description: "Explore our portfolio of award-winning luxury architecture projects across residential, commercial, hospitality, and master planning.",
});

const projects: PortfolioItem[] = [
  { title: "The Sky Villa", category: "Residential", image: { src: "/images/portfolio/villa-sky.jpg", alt: "The Sky Villa" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
  { title: "Sudirman Tower", category: "Commercial", image: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Sudirman Tower" }, href: "/portfolio/sudirman-tower", location: "Jakarta, Indonesia", year: "2023" },
  { title: "Nusantara Resort", category: "Hospitality", image: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Nusantara Resort" }, href: "/portfolio/nusantara-resort", location: "Lombok, Indonesia", year: "2025" },
  { title: "Green Valley Estate", category: "Master Planning", image: { src: "/images/portfolio/green-valley.jpg", alt: "Green Valley Estate" }, href: "/portfolio/green-valley", location: "Bandung, Indonesia", year: "2024" },
  { title: "The Sanctuary", category: "Residential", image: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" }, href: "/portfolio/the-sanctuary", location: "Ubud, Indonesia", year: "2023" },
  { title: "Marina Bay Club", category: "Hospitality", image: { src: "/images/portfolio/marina-club.jpg", alt: "Marina Bay Club" }, href: "/portfolio/marina-club", location: "Singapore", year: "2025" },
];

const stats: StatItem[] = [
  { value: "200", label: "Projects Completed", suffix: "+" },
  { value: "50", label: "Awards Won", suffix: "+" },
  { value: "15", label: "Years of Experience" },
  { value: "8", label: "Countries Served" },
];

export default function PortfolioPage() {
  return (
    <>
      <JsonLdScript data={createWebsiteSchema()} id="website-schema" />
      <AnimatedSection>
        <SectionHeader
          title="Our Portfolio"
          description="Every project tells a story. Explore our finest work — from private residences to iconic commercial landmarks — each a testament to design excellence."
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <FeaturedProjects
          title="Selected Works"
          description="A journey through our most significant projects, revealing the depth of our architectural vision."
          projects={projects}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ProjectCategories
          title="Explore by Discipline"
          description="Each category represents a distinct design language we have mastered."
          categories={[
            { label: "Residential", href: "/services/residential" },
            { label: "Commercial", href: "/services/commercial" },
            { label: "Hospitality", href: "/services/hospitality" },
            { label: "Master Planning", href: "/services/master-planning" },
          ]}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <StatisticsShowcase
          title="By the Numbers"
          description="A measure of our commitment to architectural excellence."
          stats={stats}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <CTADefault
          title="Your Vision, Our Expertise"
          description="Share your project aspirations with us and discover what we can create together."
          primaryCta={{ label: "Discuss Your Project", href: "/contact" }}
        />
      </AnimatedSection>
    </>
  );
}
