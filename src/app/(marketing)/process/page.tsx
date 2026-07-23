import { ProcessSteps, Timeline } from "@/sections";
import { createMetadata } from "@/seo";
import type { ProcessStep, TimelineEvent } from "@/sections";

export const metadata = createMetadata({
  title: "Our Process",
  description: "Discover how PT Karya Nusantara Realty transforms visions into architectural masterpieces through our proven design and construction process.",
});

const steps: ProcessStep[] = [
  { title: "Discovery & Briefing", description: "We conduct in-depth discussions to understand your vision, requirements, budget, and timeline." },
  { title: "Site Analysis", description: "Our team performs thorough site evaluation, including topography, climate, orientation, and regulations." },
  { title: "Concept Design", description: "We develop initial design concepts, sketches, and mood boards for your review and feedback." },
  { title: "Design Development", description: "The chosen concept is refined with detailed drawings, material selections, and cost estimates." },
  { title: "Construction Documentation", description: "Comprehensive technical drawings and specifications are prepared for permitting and contractor bidding." },
  { title: "Construction Administration", description: "We oversee construction, conduct site visits, and ensure the design vision is faithfully executed." },
];

const timelineEvents: TimelineEvent[] = [
  { year: "Month 1-2", title: "Discovery Phase", description: "Initial consultations, site visits, and project brief development." },
  { year: "Month 3-4", title: "Concept Design", description: "Schematic designs, mood boards, and preliminary budget." },
  { year: "Month 5-8", title: "Design Development", description: "Detailed drawings, material selection, and final budget." },
  { year: "Month 9-12", title: "Documentation & Permitting", description: "Construction documents and building permit applications." },
  { year: "Month 13+", title: "Construction", description: "Construction administration and project completion." },
];

export default function ProcessPage() {
  return (
    <>
      <ProcessSteps
        title="How We Work"
        description="Our proven process ensures every project is delivered with the highest standards of quality and attention to detail."
        steps={steps}
      />
      <Timeline
        title="Project Timeline"
        events={timelineEvents}
      />
      {/* ConsultationProcess commented out — component not available */}
      {/* ConstructionFlow commented out — component not available */}
      {/* ProjectLifecycle commented out — component not available */}
    </>
  );
}
