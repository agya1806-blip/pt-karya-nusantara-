import { FeaturedProjects, Categories, StatisticsShowcase, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { PortfolioItem, StatItem } from "@/sections";

export const metadata = createMetadata({
  title: "Portfolio",
  description: "Explore our portfolio of award-winning luxury architecture projects across residential, commercial, hospitality, and master planning.",
});

const projects: PortfolioItem[] = [
  { title: "The天际 Villa", category: "Residential", image: { src: "/images/portfolio/villa-sky.jpg", alt: "The天际 Villa" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
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
      <FeaturedProjects
        title="Our Portfolio"
        description="A curated collection of our finest work, showcasing the breadth and depth of our architectural expertise."
        projects={projects}
      />
      {/* ProjectCategories commented out — component not available */}
      <StatisticsShowcase
        title="By the Numbers"
        description="Our track record speaks for itself."
        stats={stats}
      />
      <CTADefault
        title="Start Your Project"
        description="Ready to create something extraordinary? Let's bring your vision to life."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
