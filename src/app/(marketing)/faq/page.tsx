import { FAQAccordion, CategoryFAQ, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { FAQItem } from "@/sections";

export const metadata = createMetadata({
  title: "FAQ",
  description: "Frequently asked questions about PT Karya Nusantara Realty's architecture services, process, and pricing.",
});

const generalFAQ: FAQItem[] = [
  { question: "What types of projects does PT Karya Nusantara Realty handle?", answer: "We specialize in luxury residential, commercial, hospitality, and master planning projects. Our portfolio ranges from private villas and estates to boutique hotels and mixed-use developments.", category: "General" },
  { question: "Where are you based?", answer: "Our main studio is in Jakarta, Indonesia, with project offices in Bali and Singapore. We serve clients both domestically and internationally.", category: "General" },
  { question: "What is your design philosophy?", answer: "We believe in creating timeless spaces that harmonize beauty, functionality, and environmental responsibility. Every design is rooted in context, culture, and client vision.", category: "General" },
  { question: "Do you handle projects outside of Indonesia?", answer: "Yes, we have completed projects across Southeast Asia, including Singapore, Malaysia, Thailand, and Vietnam. We are always open to international collaborations.", category: "General" },
];

const processFAQ: FAQItem[] = [
  { question: "What is your design process?", answer: "Our process follows five stages: Discovery, Concept Design, Design Development, Construction Documents, and Construction Administration. Each stage involves close collaboration with our clients.", category: "Process" },
  { question: "How long does a typical project take?", answer: "Timelines vary by project scope. A custom home typically takes 12–18 months from concept to completion. Larger commercial projects may take 24–36 months.", category: "Process" },
  { question: "How do you charge for your services?", answer: "We offer both percentage-based and fixed-fee structures depending on project scope. An initial consultation is complimentary to discuss your needs and budget.", category: "Process" },
  { question: "Do you provide cost estimates?", answer: "Yes, we provide detailed cost estimates during the design development phase, working closely with quantity surveyors and contractors.", category: "Process" },
];

const collaborationFAQ: FAQItem[] = [
  { question: "How do I start a project with your firm?", answer: "Simply reach out through our contact form or call us. We will schedule an initial consultation to discuss your vision, requirements, and budget.", category: "Collaboration" },
  { question: "What information do you need to provide a proposal?", answer: "We typically need your project brief, site information, budget range, and timeline expectations. The more detail you share, the more accurate our proposal.", category: "Collaboration" },
  { question: "Do you work with external consultants?", answer: "Yes, we collaborate with a network of trusted structural engineers, MEP consultants, interior designers, landscape architects, and sustainability experts.", category: "Collaboration" },
  { question: "Can you recommend contractors?", answer: "Absolutely. We work with a curated list of reputable contractors who share our commitment to quality craftsmanship.", category: "Collaboration" },
];

export default function FAQPage() {
  return (
    <>
      <FAQAccordion
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services, process, and collaboration."
        items={[...generalFAQ, ...processFAQ, ...collaborationFAQ]}
      />
      <CategoryFAQ
        title="Browse by Category"
        description="Select a category to find answers faster."
        categories={[
          { label: "General", items: generalFAQ },
          { label: "Process", items: processFAQ },
          { label: "Collaboration", items: collaborationFAQ },
        ]}
      />
      <CTADefault
        title="Still Have Questions?"
        description="We are happy to answer any questions you may have. Reach out to our team directly."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
