import { AnimatedSection } from "@/components/animation";
import { GalleryGrid, InteractiveGallery, ImageGallery, CTADefault } from "@/sections";
import { createMetadata, createBreadcrumbSchema, createWebPageSchema, JsonLdScript } from "@/seo";
import type { GalleryItem } from "@/sections";

export const metadata = createMetadata({
  title: "Galeri — Karya Terkurasi",
  description: "Jelajahi kurasi visual mahakarya arsitektur, interior, dan lansekap dari studio Karya Nusantara Realty di Indonesia dan Asia Tenggara.",
});

const galleryItems: GalleryItem[] = [
  { src: "/images/gallery/gallery-01.jpg", alt: "Ruang tamu dengan cahaya alami yang menari di permukaan marmer", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-02.jpg", alt: "Fasad vila kontemporer yang berbisik dengan lanskap sekitarnya", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-03.jpg", alt: "Lobi hotel yang memadukan kemewahan dan kehangatan tropis", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-04.jpg", alt: "Ruang mandi minimalis dengan sentuhan artisan", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-05.jpg", alt: "Taman yang dirancang sebagai ruang meditasi terbuka", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-06.jpg", alt: "Ruang kerja yang menerangi kreativitas melalui pencahayaan arsitektural", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-07.jpg", alt: "Langit-langit teras atap yang menyatu dengan cakrawala", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-08.jpg", alt: "Tangga berliku sebagai pahatan di dalam ruang", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-09.jpg", alt: "Kolam renang yang merefleksikan ketenangan jiwa", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-10.jpg", alt: "Ruang istirahat utama dengan panorama dan privasi absolut", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-11.jpg", alt: "Detail fasad yang merayakan keahlian tangan dan material", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-12.jpg", alt: "Interior restoran yang mengundang dialog antara cahaya dan bayangan", width: 1920, height: 1280 },
];

const featuredImages = galleryItems.map((item) => ({ src: item.src, alt: item.alt }));

export default function GalleryPage() {
  return (
    <>
      <JsonLdScript data={createWebPageSchema({
        name: "Galeri Karya — Karya Nusantara Realty",
        description: "Kurasi visual mahakarya arsitektur, desain interior, dan lansekap dari proyek residensial, komersial, dan hospitality terpilih.",
        url: "/gallery",
      })} id="webpage-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Galeri" },
      ])} id="breadcrumb-schema" />
      <AnimatedSection>
        <GalleryGrid
          title="Kurasi Visual"
          description="Pilihan fotografi arsitektur yang dikurasi untuk merekam jiwa setiap karya."
          items={galleryItems}
          columns={3}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <InteractiveGallery
          title="Jelajahi Seluruh Koleksi"
          description="Telusuri galeri penuh dalam tampilan lightbox interaktif yang menghidupkan setiap detail."
          images={galleryItems}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ImageGallery
          label="Kurasi Khusus"
          title="Mahakarya Pilihan"
          description="Sorotan dari proyek-proyek yang mendefinisikan kembali kemewahan arsitektur Nusantara."
          items={featuredImages}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <CTADefault
          title="Visual Ini Menginspirasi Anda?"
          description="Bayangkan apa yang dapat kami ciptakan bersama. Diskusikan visi Anda dengan tim arsitek kami."
          primaryCta={{ label: "Mulai Diskusi Desain", href: "/contact" }}
          secondaryCta={{ label: "Jelajahi Portofolio", href: "/portfolio" }}
        />
      </AnimatedSection>
    </>
  );
}