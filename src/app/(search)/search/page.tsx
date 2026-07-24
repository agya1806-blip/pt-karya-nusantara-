import { CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import { SearchClient } from "./search-client";

export const metadata = createMetadata({
  title: "Search",
  description: "Search our website for projects, services, articles, and more.",
});

export default function SearchPage() {
  return (
    <>
      <SearchClient />
      <CTADefault
        title="Did Not Find What You Were Looking For?"
        description="Contact our team directly and we will be happy to assist you."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}