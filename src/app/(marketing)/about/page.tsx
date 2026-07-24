import { AnimatedSection } from "@/components/animation";
import { CompanyOverview, VisionMission, Timeline, FounderStory, Values, Awards, StatisticsShowcase, TeamGrid, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { TimelineEvent, TeamMember, AwardItem, StatItem } from "@/sections";

export const metadata = createMetadata({
  title: "About Us",
  description: "Discover the story, vision, and people behind PT Karya Nusantara Realty — an architecture and design practice based in Aceh, Indonesia.",
});

const stats: StatItem[] = [
  { value: "200", label: "Projects Delivered", suffix: "+" },
  { value: "50", label: "Design Awards Received", suffix: "+" },
  { value: "15", label: "Years in Practice" },
  { value: "8", label: "Countries Reached" },
];

const timelineEvents: TimelineEvent[] = [
  { year: "2010", title: "Founded", description: "PT Karya Nusantara Realty is established in Banda Aceh, driven by a conviction that Indonesia deserves architecture of the highest order." },
  { year: "2013", title: "First International Project", description: "A residential commission in Singapore marks our first cross-border engagement, setting the standard for future overseas work." },
  { year: "2016", title: "Studio Expansion", description: "The practice grows to accommodate a multidisciplinary team, reflecting the increasing complexity and scale of our projects." },
  { year: "2019", title: "Award-Winning Year", description: "Multiple international awards recognise the rigour and refinement of our residential and commercial portfolio." },
  { year: "2022", title: "Global Recognition", description: "Named among Southeast Asia's foremost architecture practices by international design media." },
  { year: "2025", title: "Sustainable Future", description: "A dedicated sustainability division is formed, formalising our commitment to net-zero design." },
];

const founders: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Founder & Principal Architect", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "Over two decades shaping luxury residential and commercial environments across Indonesia and Southeast Asia." },
  { name: "Sari Dewi", role: "Co-Founder & Design Director", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "An award-winning designer recognised for weaving Indonesian craft traditions into contemporary architectural language." },
];

const teamMembers: TeamMember[] = [
  { name: "Ardi Wicaksono", role: "Founder & Principal Architect", image: { src: "/images/team/ardi.jpg", alt: "Ardi Wicaksono" }, bio: "Over two decades of experience shaping luxury residential and commercial environments across Southeast Asia." },
  { name: "Sari Dewi", role: "Co-Founder & Design Director", image: { src: "/images/team/sari.jpg", alt: "Sari Dewi" }, bio: "Award-winning designer with a distinctive approach to contemporary luxury residential and hospitality projects." },
  { name: "Budi Santoso", role: "Managing Partner", image: { src: "/images/team/budi.jpg", alt: "Budi Santoso" }, bio: "Leads firm strategy, client partnerships, and practice operations with a focus on sustainable growth." },
  { name: "Rina Wijaya", role: "Creative Director", image: { src: "/images/team/rina.jpg", alt: "Rina Wijaya" }, bio: "Guides the studio's creative direction, ensuring coherence of vision across all projects." },
  { name: "Dimas Prayogo", role: "Senior Architect", image: { src: "/images/team/dimas.jpg", alt: "Dimas Prayogo" }, bio: "Leads residential and mixed-use projects from concept through construction." },
  { name: "Maya Putri", role: "Senior Architect", image: { src: "/images/team/maya.jpg", alt: "Maya Putri" }, bio: "Specialist in sustainable design, green building certification, and low-carbon materiality." },
  { name: "Alex Hartono", role: "Project Architect", image: { src: "/images/team/alex.jpg", alt: "Alex Hartono" }, bio: "Focuses on hospitality and commercial projects with an emphasis on experiential design." },
  { name: "Lisa Tanudjaja", role: "Interior Designer", image: { src: "/images/team/lisa.jpg", alt: "Lisa Tanudjaja" }, bio: "Award-winning interior designer known for crafting refined, inhabitable spaces of character." },
];

const awards: AwardItem[] = [
  { title: "Best Residential Architecture", year: "2023", description: "Asia Pacific Architecture Awards", organization: "APA" },
  { title: "Green Building Design Excellence", year: "2024", description: "International Sustainable Design Awards", organization: "ISDA" },
  { title: "Firm of the Year", year: "2025", description: "Indonesia Architecture Excellence Awards", organization: "IAI" },
];

export default function AboutPage() {
  return (
    <>
      <AnimatedSection>
        <CompanyOverview
          title="About PT Karya Nusantara Realty"
          description={[
            "We are an architecture and design practice based in Aceh, serving clients across Indonesia and Southeast Asia. Since 2010, we have delivered over 200 projects — each defined by a commitment to craft, context, and enduring quality.",
          ]}
          image={{ src: "/images/about/overview.jpg", alt: "PT Karya Nusantara Realty studio" }}
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
        <VisionMission
          title="Our Vision & Mission"
          vision={{ title: "Our Vision", description: "To be the defining architecture practice in Indonesia — a studio where design rigour, cultural sensitivity, and environmental stewardship converge." }}
          mission={{ title: "Our Mission", description: "To create spaces that elevate the human experience — environments of beauty, purpose, and lasting value." }}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <Values
          title="Our Values"
          values={[
            { title: "Design Excellence", description: "An uncompromising commitment to craft, proportion, and the integrity of every detail." },
            { title: "Sustainable Practice", description: "Responsible stewardship of materials and energy — designing for longevity, not trends." },
            { title: "Client Partnership", description: "Close, collaborative relationships built on listening deeply and delivering with precision." },
            { title: "Cultural Heritage", description: "A reverence for Indonesian craftsmanship and the wisdom of vernacular building traditions." },
          ]}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <FounderStory founders={founders} />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <Timeline title="Our History" events={timelineEvents} />
      </AnimatedSection>
      <AnimatedSection delay={0.6}>
        <TeamGrid
          title="Meet Our Team"
          description="The people behind our practice — architects, designers, and strategists united by a shared commitment to craft."
          members={teamMembers}
          columns={4}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.7}>
        <Awards title="Awards & Recognition" awards={awards} />
      </AnimatedSection>
      <AnimatedSection delay={0.8}>
        <CTADefault
          title="Let Us Realise Your Vision"
          description="Share your project aspirations with us. Every great design begins with a conversation."
          primaryCta={{ label: "Arrange a Consultation", href: "/contact" }}
          secondaryCta={{ label: "View Our Portfolio", href: "/portfolio" }}
        />
      </AnimatedSection>
    </>
  );
}
