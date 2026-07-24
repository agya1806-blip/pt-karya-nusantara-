import { ProjectGallery, Awards, FeaturedProjects, ProjectDetailHeader, BeforeAfter, ProjectStatistics, CTADefault, ProcessSteps, ClientReviews, PartnersShowcase } from "@/sections";
import { createMetadata, createProjectSchema, createBreadcrumbSchema, JsonLdScript } from "@/seo";
import type { GalleryItem, AwardItem, PortfolioItem, StatItem, ProjectItem, MediaItem, ProcessStep, TestimonialItem, PartnerItem } from "@/sections";

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
  process: ProcessStep[];
  testimonial?: TestimonialItem;
  partners?: PartnerItem[];
}

const projects: Record<string, ProjectData> = {
  "the-villa": {
    title: "The Sky Villa",
    category: "Residential",
    description: "A hillside villa in Bali where architecture yields to the landscape. Panoramic ocean views, seamless indoor-outdoor living, and a material palette rooted in the island's natural beauty.",
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
    process: [
      { title: "Site Analysis", description: "Studying the hillside topography, solar orientation, and ocean views to determine optimal building placement and orientation." },
      { title: "Concept Design", description: "Developing three distinct design directions — modern tropical, minimalist, and Balinese contemporary — refined through close client collaboration." },
      { title: "Design Development", description: "Detailing every space for seamless indoor-outdoor living, specifying natural stone, teak wood, and locally sourced materials." },
      { title: "Construction Oversight", description: "Working alongside local craftsmen to ensure every detail — from the infinity pool edge to the garden hardscape — met our exacting standards." },
    ],
    testimonial: {
      name: "James Thompson",
      role: "CEO",
      company: "Harmony Developments",
      content: "PT Karya Nusantara Realty exceeded our expectations. Their attention to detail and commitment to design excellence is unparalleled. The Sky Villa has become the crown jewel of our portfolio.",
      rating: 5,
    },
    partners: [
      { name: "Bali Construction Group" },
      { name: "Tropical Landscapes Studio" },
      { name: "Interior Atelier Bali" },
    ],
  },
  "sudirman-tower": {
    title: "Sudirman Tower",
    category: "Commercial",
    description: "A 40-storey office tower in Jakarta's central business district. Platinum LEED-certified, the building sets a new benchmark for sustainable commercial architecture in Indonesia.",
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
    process: [
      { title: "Feasibility Study", description: "Analysing site conditions, zoning regulations, and market demands to determine optimal building massing and program distribution." },
      { title: "Facade Engineering", description: "Designing a high-performance curtain wall system that reduces solar heat gain while maximising natural daylight penetration." },
      { title: "Sustainable Systems", description: "Integrating rainwater harvesting, solar panels, and energy-efficient HVAC to achieve Platinum LEED certification." },
      { title: "Interior Architecture", description: "Creating flexible floor plates with premium finishes, biophilic design elements, and smart building technology throughout." },
    ],
    testimonial: {
      name: "David Chen",
      role: "Founder",
      company: "Chen Properties",
      content: "Sudirman Tower set a new benchmark for commercial architecture in Jakarta. The team's mastery of sustainable design transformed our vision into a landmark that tenants and investors admire.",
      rating: 5,
    },
    partners: [
      { name: "Arup Engineering" },
      { name: "Green Building Council Indonesia" },
      { name: "CSL Interior Solutions" },
    ],
  },
  "nusantara-resort": {
    title: "Nusantara Resort",
    category: "Hospitality",
    description: "A beachfront resort in Lombok with 120 villas set within pristine coastal landscapes. The design honours the site's natural ecology while delivering an uncompromised guest experience.",
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
    process: [
      { title: "Master Planning", description: "Designing the resort layout to preserve existing coastal vegetation while maximising ocean views from every villa." },
      { title: "Villa Prototyping", description: "Creating three villa typologies — beachfront, garden, and hillside — each with distinct indoor-outdoor living experiences." },
      { title: "Landscape Design", description: "Integrating native tropical species, natural stone pathways, and water features that echo the surrounding coastal ecosystem." },
      { title: "Interior Curation", description: "Selecting local artisanal furnishings, handwoven textiles, and custom lighting to create an authentic sense of place." },
    ],
    testimonial: {
      name: "Miyako Tanaka",
      role: "Director",
      company: "Luxury Retreats Asia",
      content: "Working with this team was a pleasure. They understood our vision perfectly and delivered a resort that has become an icon of Lombok's hospitality scene.",
      rating: 5,
    },
    partners: [
      { name: "Lombok Landscape Architects" },
      { name: "Artisan Interiors" },
      { name: "Coastal Engineering Solutions" },
    ],
  },
  "green-valley": {
    title: "Green Valley Estate",
    category: "Master Planning",
    description: "A 50-hectare master-planned community in Bandung that balances density with liveability. Residential clusters, green corridors, and commercial centres woven into a cohesive urban fabric.",
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
    process: [
      { title: "Site Analysis", description: "Evaluating topography, watershed patterns, and existing vegetation to create a development that works with the land, not against it." },
      { title: "Community Framework", description: "Designing a hierarchy of public spaces — from central park to neighbourhood gardens — that foster community interaction." },
      { title: "Infrastructure Planning", description: "Planning roads, utilities, and drainage systems with future expansion capacity and minimal environmental disruption." },
      { title: "Sustainable Guidelines", description: "Establishing design guidelines for all buildings ensuring cohesive aesthetics, energy efficiency, and green construction practices." },
    ],
    testimonial: {
      name: "Dr. Ratna Kusuma",
      role: "Principal",
      company: "Bandung Urban Development",
      content: "Green Valley Estate is a model for sustainable community development in Indonesia. The master plan balances density with liveability in a way that sets a new standard.",
      rating: 5,
    },
    partners: [
      { name: "Bandung Infrastructure Authority" },
      { name: "Green Urban Design Lab" },
      { name: "Sustainable Communities Institute" },
    ],
  },
  "the-sanctuary": {
    title: "The Sanctuary",
    category: "Residential",
    description: "A private residence in Ubud, Bali, conceived as a retreat within the tropical forest. Natural materials, sustainable systems, and a porous boundary between inside and out define the experience.",
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
    process: [
      { title: "Site Immersion", description: "Understanding the forest microclimate, view corridors, and natural light patterns to inform every design decision." },
      { title: "Biophilic Design", description: "Developing a concept that blurs boundaries between interior and exterior, using glass walls, open courtyards, and green roofs." },
      { title: "Material Selection", description: "Sourcing sustainable timber, local stone, and natural finishes that age gracefully and complement the surrounding forest." },
      { title: "Sustainable Systems", description: "Integrating rainwater collection, solar energy, and natural ventilation to achieve a net-zero energy footprint." },
    ],
    testimonial: {
      name: "Alexandra Hartono",
      role: "Homeowner",
      content: "The Sanctuary is more than a home — it is a personal retreat that connects me to nature every moment. The team understood exactly how I wanted to live.",
      rating: 5,
    },
    partners: [
      { name: "Ubud Green Builders" },
      { name: "Natural Stone Works" },
      { name: "Forest Light Landscapes" },
    ],
  },
  "marina-club": {
    title: "Marina Bay Club",
    category: "Hospitality",
    description: "A members' club in Singapore's Marina Bay district. Interiors of refined restraint, waterfront dining, and wellness facilities designed for an exclusive, discerning membership.",
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
    process: [
      { title: "Concept Development", description: "Designing a sophisticated waterfront concept that balances exclusivity with warmth, inspired by luxury yacht club aesthetics." },
      { title: "Interior Architecture", description: "Curating a material palette of marble, brass, and rich timber across all spaces — from the grand lobby to private dining rooms." },
      { title: "Facade Design", description: "Creating a glass curtain wall with dynamic lighting that animates the waterfront facade at night." },
      { title: "Wellness Integration", description: "Designing the spa and wellness wing around a central courtyard with natural light, water features, and tropical planting." },
    ],
    testimonial: {
      name: "Michael Tan",
      role: "Managing Director",
      company: "Marina Bay Hospitality",
      content: "The Marina Bay Club has redefined what a private members club can be. Every detail — from the materials to the spatial flow — reflects uncompromising quality.",
      rating: 5,
    },
    partners: [
      { name: "Singapore Design Consortium" },
      { name: "Waterfront Engineering Pte Ltd" },
      { name: "Luxury Fit-Out Solutions" },
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

  const remainingProjects = allProjects.filter((p) => p.href !== `/portfolio/${slug}`);

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
        description="The transformation from concept to completed reality."
        project={projectItem}
      />
      <ProcessSteps
        title="The Design Journey"
        description="Our approach — from first site visit to final delivery."
        steps={project.process}
      />
      {project.testimonial && (
        <ClientReviews
          title="Client Perspective"
          description="What our client had to say."
          testimonials={[project.testimonial]}
          variant="grid"
        />
      )}
      {project.partners && (
        <PartnersShowcase
          title="Collaborators"
          description="The partners who contributed to this project."
          partners={project.partners}
          variant="simple"
        />
      )}
      <ProjectStatistics
        title="Project Statistics"
        description="Key metrics for this project."
        stats={project.stats}
      />
      <Awards title="Awards & Recognition" awards={awards} />
      {remainingProjects.length > 0 && (
        <FeaturedProjects
          title="Related Projects"
          description="Other projects from our portfolio."
          projects={remainingProjects.slice(0, 3)}
        />
      )}
      <CTADefault
        title="Inspired by This Project?"
        description="Let us create something equally considered for your space. Share your vision with us."
        primaryCta={{ label: "Discuss Your Project", href: "/contact" }}
      />
    </>
  );
}
