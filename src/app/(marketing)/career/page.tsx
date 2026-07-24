import { CareerHero, Benefits, OpenPositions, CultureValues, RecruitmentProcess, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Career",
  description: "Join PT Karya Nusantara Realty and contribute to architecture of lasting significance in Southeast Asia.",
});

const positions: Array<{
  id: string; title: string; department: string; location: string; type: "Full-time" | "Contract"; description: string; postedDate: string;
}> = [
  { id: "1", title: "Senior Architect", department: "Design", location: "Jakarta", type: "Full-time", description: "Lead complex architectural projects from concept through construction administration.", postedDate: "2025-06-01" },
  { id: "2", title: "Junior Architect", department: "Design", location: "Jakarta", type: "Full-time", description: "Support senior architects in design development, documentation, and site coordination.", postedDate: "2025-06-01" },
  { id: "3", title: "Interior Designer", department: "Interior", location: "Jakarta", type: "Full-time", description: "Develop interior design concepts and specifications for luxury residential and hospitality projects.", postedDate: "2025-05-15" },
  { id: "4", title: "BIM Specialist", department: "Technology", location: "Jakarta", type: "Contract", description: "Manage BIM workflows, create detailed models, and support project coordination.", postedDate: "2025-05-15" },
  { id: "5", title: "Marketing Manager", department: "Marketing", location: "Jakarta", type: "Full-time", description: "Lead marketing strategy, brand development, and business development initiatives.", postedDate: "2025-04-20" },
  { id: "6", title: "Project Manager", department: "Operations", location: "Jakarta", type: "Full-time", description: "Oversee project timelines, budgets, and client communications across multiple projects.", postedDate: "2025-04-20" },
];

export default function CareerPage() {
  return (
    <>
      <CareerHero
        title="Join Our Team"
        subtitle="PT Karya Nusantara Realty"
        description="Be part of a practice creating architecture of lasting significance in Southeast Asia."
        image={{ src: "/images/career/hero.jpg", alt: "Career at Karya Nusantara Realty" }}
        cta={{ label: "View Open Positions", href: "#positions" }}
      />
      <CultureValues
        title="Our Culture"
        description="A studio culture built on rigour, curiosity, and mutual respect."
        values={[
          { title: "Innovation", description: "We explore new frontiers in design, materiality, and method." },
          { title: "Collaboration", description: "Great ideas emerge from open dialogue and diverse perspectives." },
          { title: "Excellence", description: "We hold ourselves to the highest standards in every endeavour." },
        ]}
      />
      <Benefits
        title="Why Work With Us"
        description="We nurture talent and provide an environment where creativity and rigour thrive."
        benefits={[
          { title: "Creative Freedom", description: "The autonomy to explore innovative design solutions and push boundaries.", icon: "lightbulb" },
          { title: "Competitive Compensation", description: "Attractive packages, performance bonuses, and comprehensive benefits.", icon: "dollar-sign" },
          { title: "Professional Growth", description: "Continuous learning, workshops, and international exposure.", icon: "trending-up" },
          { title: "Collaborative Culture", description: "Work alongside experienced architects and designers in a supportive studio.", icon: "users" },
        ]}
      />
      <RecruitmentProcess
        title="Recruitment Process"
        description="A transparent process designed to identify talent and ensure a mutual fit."
        steps={[
          { title: "Application Review", description: "Our team reviews your application and portfolio." },
          { title: "Initial Interview", description: "A conversation to discuss your background and aspirations." },
          { title: "Portfolio Presentation", description: "Present your work to our design leadership." },
          { title: "Final Interview", description: "Meet with senior leadership to discuss the role and cultural fit." },
          { title: "Offer", description: "Successful candidates receive an offer to join the studio." },
        ]}
      />
      <OpenPositions
        title="Open Positions"
        description="Current opportunities to join our growing practice."
        positions={positions}
      />
      <CTADefault
        title="Don't See the Right Role?"
        description="We are always looking for exceptional talent. Send us your portfolio and we will keep you in mind for future opportunities."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
