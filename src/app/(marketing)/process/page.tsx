import { ProcessSteps, Timeline, ConsultationProcess, ConstructionFlow, ProjectLifecycle } from "@/sections";
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
      <ConsultationProcess
        title="Consultation Process"
        description="Our consultation process ensures every detail is captured before we begin the design journey."
        steps={[
          { step: 1, title: "Initial Inquiry", description: "Reach out via our contact form or phone to express your interest." },
          { step: 2, title: "Discovery Call", description: "A 30-minute call to understand your project scope, vision, and budget." },
          { step: 3, title: "Site Visit", description: "Our team visits your site to assess conditions and gather measurements." },
          { step: 4, title: "Proposal", description: "We provide a tailored proposal with scope, timeline, and fee structure." },
        ]}
      />
      <ConstructionFlow
        title="Construction Flow"
        description="Our phased approach to construction ensures quality at every stage."
      />
      <ProjectLifecycle
        title="Project Lifecycle"
        description="From inception to completion, we guide your project through every phase."
      />
    </>
  );
}
