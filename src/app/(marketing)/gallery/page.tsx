import { AnimatedSection } from "@/components/animation";
import { GalleryGrid, InteractiveGallery, ImageGallery, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { GalleryItem } from "@/sections";

export const metadata = createMetadata({
  title: "Galeri",
  description: "Koleksi terkurasi fotografi arsitektur, visual proyek, dan showcase desain dari PT Karya Nusantara Realty.",
});

const galleryItems: GalleryItem[] = [
  { src: "/images/gallery/gallery-01.jpg", alt: "Interior ruang tamu mewah", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-02.jpg", alt: "Eksterior vila modern", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-03.jpg", alt: "Desain lobi hotel", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-04.jpg", alt: "Kamar mandi minimalis", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-05.jpg", alt: "Lansekap taman", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-06.jpg", alt: "Interior kantor", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-07.jpg", alt: "Teras atap", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-08.jpg", alt: "Desain tangga", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-09.jpg", alt: "Kolam renang dan area luar", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-10.jpg", alt: "Kamar utama", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-11.jpg", alt: "Detail fasad", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-12.jpg", alt: "Interior restoran", width: 1920, height: 1280 },
];

const featuredImages = galleryItems.map((item) => ({ src: item.src, alt: item.alt }));

export default function GalleryPage() {
  return (
    <>
      <AnimatedSection>
        <GalleryGrid
          title="Galeri Foto"
          description="Kurasi pilihan fotografi arsitektur dari proyek-proyek kami."
          items={galleryItems}
          columns={3}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <InteractiveGallery
          title="Jelajahi Semua Visual"
          description="Navigasi grid lengkap foto arsitektur dengan tampilan lightbox interaktif."
          images={galleryItems}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ImageGallery
          label="Koleksi"
          title="Karya Pilihan"
          description="Sorotan visual dari proyek-proyek terbaik yang pernah kami kerjakan."
          images={featuredImages}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <CTADefault
          title="Terinspirasi oleh Apa yang Anda Lihat?"
          description="Mari diskusikan bagaimana kami dapat menciptakan sesuatu yang sama baiknya untuk proyek Anda."
          primaryCta={{ label: "Mulai Percakapan", href: "/contact" }}
          secondaryCta={{ label: "Lihat Portofolio", href: "/portfolio" }}
        />
      </AnimatedSection>
    </>
  );
}