import { CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import { SearchClient } from "./search-client";

export const metadata = createMetadata({
  title: "Search",
  description: "Search PT Karya Nusantara Realty's website for projects, services, articles, and more.",
});

export default function SearchPage() {
  return (
    <>
      <SearchClient />
      <CTADefault
        title="Can't Find What You're Looking For?"
        description="Contact our team directly and we'll be happy to help."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}