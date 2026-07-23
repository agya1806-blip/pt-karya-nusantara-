import { CompanyOverview, VisionMission, Timeline, FounderStory, Values, Awards, StatisticsShowcase, TeamGrid, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { TimelineEvent, TeamMember, AwardItem, StatItem } from "@/sections";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn about PT Karya Nusantara Realty — a world-class luxury architecture firm based in Jakarta, serving globally.",
});

const stats: StatItem[] = [
  { value: "200", label: "Projects Completed", suffix: "+" },
  { value: "50", label: "Awards Won", suffix: "+" },
  { value: "15", label: "Years of Experience" },
  { value: "8", label: "Countries Served" },
];

const timelineEvents: TimelineEvent[] = [
  { year: "2010", title: "Founded", description: "PT Karya Nusantara Realty was established in Jakarta with a vision to redefine luxury architecture in Indonesia." },
  { year: "2013", title: "First International Project", description: "Completed our first cross-border project in Singapore, establishing our reputation for world-class design." },
  { year: "2016", title: "Expanded Team", description: "Grew to over 50 architects and designers, opening a second studio in Bali." },
  { year: "2019", title: "Award-Winning Year", description: "Received multiple international architecture awards for residential and commercial projects." },
  { year: "2022", title: "Global Recognition", description: "Named among Southeast Asia's top luxury architecture firms by Architectural Digest." },
  { year: "2025", title: "Sustainable Future", description: "Launched our green architecture division, committing to net-zero design by 2030." },
];

const founders: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Founder & Principal Architect", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "Visionary architect with 25+ years of experience in luxury residential and commercial design." },
  { name: "Sari Dewi", role: "Co-Founder & Design Director", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Award-winning designer known for blending traditional Indonesian craftsmanship with modern aesthetics." },
];

const teamMembers: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Founder & Principal Architect", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "25+ years of experience in luxury architecture across Southeast Asia." },
  { name: "Sari Dewi", role: "Co-Founder & Design Director", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Award-winning designer specializing in luxury residential and hospitality projects." },
  { name: "Budi Santoso", role: "Managing Partner", image: { src: "/images/team/budi.jpg", alt: "Budi Santoso" }, bio: "Oversees firm operations, client relationships, and strategic growth." },
  { name: "Rina Wijaya", role: "Creative Director", image: { src: "/images/team/rina.jpg", alt: "Rina Wijaya" }, bio: "Leads creative vision across all projects, ensuring design excellence." },
  { name: "Dimas Prayogo", role: "Senior Architect", image: { src: "/images/team/dimas.jpg", alt: "Dimas Prayogo" }, bio: "Specializes in residential and mixed-use developments." },
  { name: "Maya Putri", role: "Senior Architect", image: { src: "/images/team/maya.jpg", alt: "Maya Putri" }, bio: "Expert in sustainable design and green building certification." },
  { name: "Alex Hartono", role: "Project Architect", image: { src: "/images/team/alex.jpg", alt: "Alex Hartono" }, bio: "Focuses on hospitality and commercial projects." },
  { name: "Lisa Tanudjaja", role: "Interior Designer", image: { src: "/images/team/lisa.jpg", alt: "Lisa Tanudjaja" }, bio: "Award-winning interior designer with a passion for luxury spaces." },
];

const awards: AwardItem[] = [
  { title: "Best Residential Architecture", year: "2023", description: "Asia Pacific Architecture Awards", organization: "APA" },
  { title: "Green Building Design Excellence", year: "2024", description: "International Sustainable Design Awards", organization: "ISDA" },
  { title: "Firm of the Year", year: "2025", description: "Indonesia Architecture Excellence Awards", organization: "IAI" },
];

export default function AboutPage() {
  return (
    <>
      <CompanyOverview
        title="About PT Karya Nusantara Realty"
        description={[
          "We are a Jakarta-based luxury architecture firm dedicated to crafting timeless spaces that inspire and endure. Since 2010, we have delivered over 200 projects across Southeast Asia.",
        ]}
        image={{ src: "/images/about/overview.jpg", alt: "PT Karya Nusantara Realty studio" }}
      />
      <StatisticsShowcase
        title="By the Numbers"
        description="A decade and a half of defining luxury architecture across the region."
        stats={stats}
      />
      <VisionMission
        title="Our Vision & Mission"
        vision={{ title: "Our Vision", description: "To be the leading luxury architecture firm in Southeast Asia, setting the benchmark for design excellence, innovation, and sustainability." }}
        mission={{ title: "Our Mission", description: "To create spaces that harmonize beauty, function, and environmental responsibility — enriching the lives of those who inhabit them." }}
      />
      <Values
        title="Our Values"
        values={[
          { title: "Design Excellence", description: "Every project reflects our unwavering commitment to aesthetic and functional perfection." },
          { title: "Sustainable Practice", description: "We integrate eco-friendly materials and energy-efficient solutions into every design." },
          { title: "Client Partnership", description: "We collaborate closely with clients to bring their vision to life, exceeding expectations." },
          { title: "Cultural Heritage", description: "We celebrate Indonesian craftsmanship and incorporate local traditions into modern designs." },
        ]}
      />
      <FounderStory founders={founders} />
      <Timeline title="Our History" events={timelineEvents} />
      <TeamGrid
        title="Meet Our Team"
        description="The architects, designers, and experts behind every project."
        members={teamMembers}
        columns={4}
      />
      <Awards title="Awards & Recognition" awards={awards} />
      <CTADefault
        title="Let's Discuss Your Vision"
        description="Share your project aspirations with us. Every great design begins with a conversation."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
        secondaryCta={{ label: "View Our Portfolio", href: "/portfolio" }}
      />
    </>
  );
}
