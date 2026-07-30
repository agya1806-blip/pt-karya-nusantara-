import { CTADefault } from "@/sections";
import { createMetadata, createWebPageSchema, JsonLdScript } from "@/seo";
import { SearchClient } from "./search-client";

export const metadata = createMetadata({
  title: "Cari — Temukan Inspirasi",
  description: "Telusuri proyek arsitektur, layanan desain, artikel wawasan, dan referensi dari Karya Nusantara Realty.",
});

export default function SearchPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Cari — Karya Nusantara Realty",
        description: "Telusuri proyek, layanan, artikel, dan inspirasi dari Karya Nusantara Realty.",
        url: "/search",
      })} id="webpage-schema" />
      <SearchClient />
      <CTADefault
        title="Tak Menemukan yang Dicari?"
        description="Hubungi tim kami langsung — kami akan dengan senang hati membantu Anda."
        primaryCta={{ label: "Hubungi Langsung", href: "/contact" }}
      />
    </>
  );
}