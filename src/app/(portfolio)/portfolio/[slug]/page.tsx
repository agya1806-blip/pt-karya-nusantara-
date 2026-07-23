import { ProjectGallery, Awards, FeaturedProjects, ProjectDetailHeader, BeforeAfter, ProjectStatistics, CTADefault } from "@/sections";
import { createMetadata, createProjectSchema, createBreadcrumbSchema, JsonLdScript } from "@/seo";
import type { GalleryItem, AwardItem, PortfolioItem, StatItem, ProjectItem, MediaItem } from "@/sections";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

interface ProjectData {
  title: string;
  category: string;
  description: string;
  thumbnail: MediaItem;
  images: GalleryItem[];
  location: string;
  year: string;
  awards: string[];
  stats: StatItem[];
}

const projects: Record<string, ProjectData> = {
  "the-villa": {
    title: "The Sky Villa",
    category: "Residential",
    description: "A breathtaking hillside villa in Bali with panoramic ocean views. This 800 sq meter residence seamlessly blends indoor and outdoor living, featuring an infinity pool, tropical gardens, and sweeping terraces that capture the essence of tropical luxury.",
    thumbnail: { src: "/images/portfolio/villa-sky.jpg", alt: "The Sky Villa" },
    images: [
      { src: "/images/portfolio/villa-01.jpg", alt: "Main building exterior" },
      { src: "/images/portfolio/villa-02.jpg", alt: "Infinity pool view" },
      { src: "/images/portfolio/villa-03.jpg", alt: "Living room interior" },
      { src: "/images/portfolio/villa-04.jpg", alt: "Master bedroom" },
    ],
    location: "Bali, Indonesia",
    year: "2024",
    awards: ["Best Residential Design 2024", "Green Building Award 2024"],
    stats: [
      { value: "800", label: "Total Area", suffix: " sqm" },
      { value: "4", label: "Bedrooms" },
      { value: "12", label: "Months to Complete" },
      { value: "2024", label: "Year Completed" },
    ],
  },
  "sudirman-tower": {
    title: "Sudirman Tower",
    category: "Commercial",
    description: "A 40-story premium office tower in Jakarta's central business district. Designed with cutting-edge sustainable technology, the tower achieves Platinum LEED certification while providing world-class office spaces.",
    thumbnail: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Sudirman Tower" },
    images: [
      { src: "/images/portfolio/tower-01.jpg", alt: "Tower exterior" },
      { src: "/images/portfolio/tower-02.jpg", alt: "Lobby interior" },
      { src: "/images/portfolio/tower-03.jpg", alt: "Office floor" },
      { src: "/images/portfolio/tower-04.jpg", alt: "Rooftop garden" },
    ],
    location: "Jakarta, Indonesia",
    year: "2023",
    awards: ["Best Commercial Architecture 2023", "LEED Platinum Certification"],
    stats: [
      { value: "40", label: "Floors", suffix: "+" },
      { value: "50000", label: "Total Area", suffix: " sqm" },
      { value: "LEED", label: "Platinum Certified" },
      { value: "2023", label: "Year Completed" },
    ],
  },
  "nusantara-resort": {
    title: "Nusantara Resort",
    category: "Hospitality",
    description: "A luxury beachfront resort in Lombok featuring 120 villas, a world-class spa, multiple dining venues, and extensive recreational facilities set within pristine tropical landscapes.",
    thumbnail: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Nusantara Resort" },
    images: [
      { src: "/images/portfolio/resort-01.jpg", alt: "Resort aerial view" },
      { src: "/images/portfolio/resort-02.jpg", alt: "Beachfront villa" },
      { src: "/images/portfolio/resort-03.jpg", alt: "Spa facility" },
      { src: "/images/portfolio/resort-04.jpg", alt: "Restaurant terrace" },
    ],
    location: "Lombok, Indonesia",
    year: "2025",
    awards: ["Best Resort Design 2025"],
    stats: [
      { value: "120", label: "Villas" },
      { value: "10", label: "Hectares" },
      { value: "5", label: "Dining Venues" },
      { value: "2025", label: "Year Completed" },
    ],
  },
  "green-valley": {
    title: "Green Valley Estate",
    category: "Master Planning",
    description: "A comprehensive master-planned community in Bandung spanning 50 hectares. The development integrates residential clusters, commercial centers, green spaces, and recreational facilities within a sustainable urban framework.",
    thumbnail: { src: "/images/portfolio/green-valley.jpg", alt: "Green Valley Estate" },
    images: [
      { src: "/images/portfolio/green-valley-01.jpg", alt: "Master plan overview" },
      { src: "/images/portfolio/green-valley-02.jpg", alt: "Residential cluster" },
      { src: "/images/portfolio/green-valley-03.jpg", alt: "Central park" },
      { src: "/images/portfolio/green-valley-04.jpg", alt: "Commercial center" },
    ],
    location: "Bandung, Indonesia",
    year: "2024",
    awards: ["Best Master Planning 2024", "Sustainable Community Award"],
    stats: [
      { value: "50", label: "Total Area", suffix: " hectares" },
      { value: "500", label: "Residential Units" },
      { value: "3", label: "Commercial Centers" },
      { value: "2024", label: "Year Completed" },
    ],
  },
  "the-sanctuary": {
    title: "The Sanctuary",
    category: "Residential",
    description: "An exclusive private residence in Ubud, Bali, designed as a serene retreat amidst lush tropical forest. The design emphasizes indoor-outdoor living with natural materials, sustainable systems, and panoramic valley views.",
    thumbnail: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" },
    images: [
      { src: "/images/portfolio/sanctuary-01.jpg", alt: "Main residence exterior" },
      { src: "/images/portfolio/sanctuary-02.jpg", alt: "Infinity pool overlooking valley" },
      { src: "/images/portfolio/sanctuary-03.jpg", alt: "Open-plan living area" },
      { src: "/images/portfolio/sanctuary-04.jpg", alt: "Master suite" },
    ],
    location: "Ubud, Indonesia",
    year: "2023",
    awards: ["Best Residential Design 2023", "Green Building Excellence Award"],
    stats: [
      { value: "600", label: "Total Area", suffix: " sqm" },
      { value: "3", label: "Bedrooms" },
      { value: "18", label: "Months to Complete" },
      { value: "2023", label: "Year Completed" },
    ],
  },
  "marina-club": {
    title: "Marina Bay Club",
    category: "Hospitality",
    description: "A premium members-only club in Singapore's Marina Bay district. The design features sophisticated interiors, waterfront dining venues, a rooftop infinity pool, and state-of-the-art wellness facilities.",
    thumbnail: { src: "/images/portfolio/marina-club.jpg", alt: "Marina Bay Club" },
    images: [
      { src: "/images/portfolio/marina-01.jpg", alt: "Club entrance" },
      { src: "/images/portfolio/marina-02.jpg", alt: "Main lounge" },
      { src: "/images/portfolio/marina-03.jpg", alt: "Rooftop pool" },
      { src: "/images/portfolio/marina-04.jpg", alt: "Dining room" },
    ],
    location: "Singapore",
    year: "2025",
    awards: ["Best Hospitality Design 2025"],
    stats: [
      { value: "5000", label: "Total Area", suffix: " sqm" },
      { value: "6", label: "Dining Venues" },
      { value: "300", label: "Member Capacity" },
      { value: "2025", label: "Year Completed" },
    ],
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

const allProjects: PortfolioItem[] = [
  { title: "The Sky Villa", category: "Residential", image: { src: "/images/portfolio/villa-sky.jpg", alt: "The Sky Villa" }, href: "/portfolio/the-villa", location: "Bali, Indonesia", year: "2024" },
  { title: "Sudirman Tower", category: "Commercial", image: { src: "/images/portfolio/sudirman-tower.jpg", alt: "Sudirman Tower" }, href: "/portfolio/sudirman-tower", location: "Jakarta, Indonesia", year: "2023" },
  { title: "Nusantara Resort", category: "Hospitality", image: { src: "/images/portfolio/nusantara-resort.jpg", alt: "Nusantara Resort" }, href: "/portfolio/nusantara-resort", location: "Lombok, Indonesia", year: "2025" },
  { title: "Green Valley Estate", category: "Master Planning", image: { src: "/images/portfolio/green-valley.jpg", alt: "Green Valley Estate" }, href: "/portfolio/green-valley", location: "Bandung, Indonesia", year: "2024" },
  { title: "The Sanctuary", category: "Residential", image: { src: "/images/portfolio/sanctuary.jpg", alt: "The Sanctuary" }, href: "/portfolio/the-sanctuary", location: "Ubud, Indonesia", year: "2023" },
  { title: "Marina Bay Club", category: "Hospitality", image: { src: "/images/portfolio/marina-club.jpg", alt: "Marina Bay Club" }, href: "/portfolio/marina-club", location: "Singapore", year: "2025" },
];

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    return <CTADefault title="Project Not Found" description="The project you are looking for does not exist." primaryCta={{ label: "View Portfolio", href: "/portfolio" }} />;
  }

  const awards: AwardItem[] = (project.awards ?? []).map((a) => ({
    title: a,
    organization: "PT Karya Nusantara Realty",
    year: project.year,
    description: `Awarded for excellence in ${project.category.toLowerCase()} architecture.`,
  }));

  const projectItem: ProjectItem = {
    id: slug,
    title: project.title,
    category: project.category,
    description: project.description,
    thumbnail: project.thumbnail,
    images: project.images,
    location: project.location,
    year: project.year,
  };

  return (
    <>
      <JsonLdScript data={createProjectSchema({
        name: project.title,
        description: project.description,
        image: project.thumbnail.src,
        category: project.category,
        location: project.location,
        year: project.year,
      })} id="project-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Portfolio", href: "/portfolio" },
        { name: project.title },
      ])} id="breadcrumb-schema" />
      <ProjectDetailHeader project={projectItem} />
      <ProjectGallery title={project.title} images={project.images} />
      <BeforeAfter
        title="Before & After"
        description="See the transformation of this project from concept to completion."
        project={projectItem}
      />
      <ProjectStatistics
        title="Project Statistics"
        description="Key metrics and figures for this project."
        stats={project.stats}
      />
      <Awards title="Awards & Recognition" awards={awards} />
      <FeaturedProjects title="Related Projects" description="Explore similar projects from our portfolio." projects={allProjects.filter((p) => p.href !== `/portfolio/${slug}`).slice(0, 3)} />
      <CTADefault
        title="Inspired by This Project?"
        description="Let's create something equally remarkable for your space. Share your vision with us."
        primaryCta={{ label: "Discuss Your Project", href: "/contact" }}
      />
    </>
  );
}
