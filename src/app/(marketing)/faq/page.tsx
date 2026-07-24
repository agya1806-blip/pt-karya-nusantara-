import { FAQAccordion, CategoryFAQ, CTADefault } from "@/sections";
import { createMetadata, createFAQPageSchema, JsonLdScript } from "@/seo";
import { FAQSearch } from "./faq-search";
import type { FAQItem } from "@/sections";

export const metadata = createMetadata({
  title: "FAQ",
  description: "Answers to common questions about our architecture services, design process, and how to collaborate with us.",
});

const generalFAQ: FAQItem[] = [
  { question: "What types of projects does PT Karya Nusantara Realty handle?", answer: "We specialise in luxury residential, commercial, hospitality, and master planning projects. Our portfolio ranges from private villas and estates to boutique hotels and mixed-use developments.", category: "General" },
  { question: "Where are you based?", answer: "Our studio is based in Banda Aceh, Indonesia. We serve clients both domestically and internationally.", category: "General" },
  { question: "What is your design philosophy?", answer: "We create spaces of enduring beauty and purpose — each design rooted in its context, culture, and the aspirations of those who will inhabit it.", category: "General" },
  { question: "Do you handle projects outside of Indonesia?", answer: "Yes. We have completed projects across Southeast Asia, including Singapore, Malaysia, Thailand, and beyond. International collaborations are always welcome.", category: "General" },
];

const processFAQ: FAQItem[] = [
  { question: "What is your design process?", answer: "Our process follows five stages: Discovery, Concept Design, Design Development, Construction Documents, and Construction Administration. Each stage involves close collaboration with our clients and consultants.", category: "Process" },
  { question: "How long does a typical project take?", answer: "Timelines vary by scope. A custom residence typically takes 12–18 months from concept to completion. Larger commercial projects may extend to 24–36 months.", category: "Process" },
  { question: "How do you charge for your services?", answer: "We offer both percentage-based and fixed-fee structures depending on project scope. An initial consultation is complimentary to discuss your needs and budget.", category: "Process" },
  { question: "Do you provide cost estimates?", answer: "Yes. We provide detailed cost estimates during design development, working closely with quantity surveyors and contractors.", category: "Process" },
];

const collaborationFAQ: FAQItem[] = [
  { question: "How do I start a project with your firm?", answer: "Reach out through our contact form or call us. We will schedule an initial consultation to discuss your vision, requirements, and budget.", category: "Collaboration" },
  { question: "What information do you need to provide a proposal?", answer: "We typically need your project brief, site information, budget range, and timeline expectations. The more detail you share, the more accurate our proposal.", category: "Collaboration" },
  { question: "Do you work with external consultants?", answer: "Yes. We collaborate with a network of trusted structural engineers, MEP consultants, interior designers, landscape architects, and sustainability experts.", category: "Collaboration" },
  { question: "Can you recommend contractors?", answer: "Yes. We maintain a curated list of reputable contractors who share our commitment to quality and craftsmanship.", category: "Collaboration" },
];

const allFAQ = [...generalFAQ, ...processFAQ, ...collaborationFAQ];

export default function FAQPage() {
  return (
    <>
      <JsonLdScript data={createFAQPageSchema(allFAQ)} id="faq-schema" />
      <section className="bg-surface pt-32 pb-8">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <FAQSearch items={allFAQ} />
          </div>
        </div>
      </section>
      <FAQAccordion
        title="Frequently Asked Questions"
        description="Answers to common questions about our services, process, and collaborations."
        items={allFAQ}
      />
      <CategoryFAQ
        title="Browse by Category"
        description="Select a category to find answers quickly."
        categories={[
          { label: "General", items: generalFAQ },
          { label: "Process", items: processFAQ },
          { label: "Collaboration", items: collaborationFAQ },
        ]}
      />
      <CTADefault
        title="Still Have Questions?"
        description="Every project is unique. Reach out to our team and we will personally answer any questions about your specific needs."
        primaryCta={{ label: "Contact Our Team", href: "/contact" }}
      />
    </>
  );
}