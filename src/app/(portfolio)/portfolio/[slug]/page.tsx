import { ProjectGallery, Awards, FeaturedProjects, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { GalleryItem, AwardItem, PortfolioItem } from "@/sections";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

interface ProjectData {
  title: string;
  category: string;
  description: string;
  images: GalleryItem[];
  location: string;
  year: string;
  awards: string[];
}

const projects: Record<string, ProjectData> = {
  "the-villa": {
    title: "The天际 Villa",
    category: "Residential",
    description: "A breathtaking hillside villa in Bali with panoramic ocean views. This 800 sq meter residence seamlessly blends indoor and outdoor living, featuring an infinity pool, tropical gardens, and sweeping terraces that capture the essence of tropical luxury.",
    images: [
      { src: "/images/portfolio/villa-01.jpg", alt: "Main building exterior" },
      { src: "/images/portfolio/villa-02.jpg", alt: "Infinity pool view" },
      { src: "/images/portfolio/villa-03.jpg", alt: "Living room interior" },
      { src: "/images/portfolio/villa-04.jpg", alt: "Master bedroom" },
    ],
    location: "Bali, Indonesia",
    year: "2024",
    awards: ["Best Residential Design 2024", "Green Building Award 2024"],
  },
  "sudirman-tower": {
    title: "Sudirman Tower",
    category: "Commercial",
    description: "A 40-story premium office tower in Jakarta's central business district. Designed with cutting-edge sustainable technology, the tower achieves Platinum LEED certification while providing world-class office spaces.",
    images: [
      { src: "/images/portfolio/tower-01.jpg", alt: "Tower exterior" },
      { src: "/images/portfolio/tower-02.jpg", alt: "Lobby interior" },
      { src: "/images/portfolio/tower-03.jpg", alt: "Office floor" },
      { src: "/images/portfolio/tower-04.jpg", alt: "Rooftop garden" },
    ],
    location: "Jakarta, Indonesia",
    year: "2023",
    awards: ["Best Commercial Architecture 2023", "LEED Platinum Certification"],
  },
  "nusantara-resort": {
    title: "Nusantara Resort",
    category: "Hospitality",
    description: "A luxury beachfront resort in Lombok featuring 120 villas, a world-class spa, multiple dining venues, and extensive recreational facilities set within pristine tropical landscapes.",
    images: [
      { src: "/images/portfolio/resort-01.jpg", alt: "Resort aerial view" },
      { src: "/images/portfolio/resort-02.jpg", alt: "Beachfront villa" },
      { src: "/images/portfolio/resort-03.jpg", alt: "Spa facility" },
      { src: "/images/portfolio/resort-04.jpg", alt: "Restaurant terrace" },
    ],
    location: "Lombok, Indonesia",
    year: "2025",
    awards: ["Best Resort Design 2025"],
  },
};

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return createMetadata({ title: "Project Not Found" });
  return createMetadata({ title: project.title, description: project.description });
}

const relatedProjects: PortfolioItem[] = [
  { title: "The天际 Villa", category: "Residential", image: { src: "/images/portfolio/villa-sky.jpg", alt: "The天际 Villa" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
  { title: "The Sanctuary", category: "Residential", image: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" }, href: "/portfolio/the-sanctuary", location: "Ubud, Indonesia", year: "2023" },
];

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return <CTADefault title="Project Not Found" description="The project you are looking for does not exist." primaryCta={{ label: "View Portfolio", href: "/portfolio" }} />;
  }

  const awards: AwardItem[] = (project.awards ?? []).map((a) => ({
    title: a,
    year: project.year,
    description: `Awarded for excellence in ${project.category.toLowerCase()} architecture.`,
  }));

  return (
    <>
      {/* ProjectDetailHeader commented out — component not available */}
      <ProjectGallery title={project.title} images={project.images} />
      {/* BeforeAfter commented out — component not available */}
      {/* ProjectStatistics commented out — component not available */}
      <Awards title="Awards & Recognition" awards={awards} />
      <FeaturedProjects title="Related Projects" description="Explore similar projects from our portfolio." projects={relatedProjects} />
      <CTADefault
        title="Start Your Project"
        description="Ready to create something extraordinary? Let's bring your vision to life."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
