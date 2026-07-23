import { CTADefault } from "@/sections";
import { createMetadata } from "@/seo";

export const metadata = createMetadata({
  title: "Search",
  description: "Search PT Karya Nusantara Realty's website for projects, services, articles, and more.",
});

import { Section, Container } from "@/components/layout";

export default function SearchPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="py-24 text-center">
            <h1 className="text-4xl font-bold mb-4">Search</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Search our portfolio, services, articles, and more.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search projects, services, articles..."
                  className="w-full px-6 py-4 text-lg rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <CTADefault
        title="Can't Find What You're Looking For?"
        description="Contact our team directly and we'll be happy to help."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
