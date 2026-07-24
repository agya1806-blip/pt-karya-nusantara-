import { AnimatedSection } from "@/components/animation";
import { GalleryGrid, InteractiveGallery, VideoShowcase, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { GalleryItem, VideoItem } from "@/sections";

export const metadata = createMetadata({
  title: "Gallery",
  description: "A curated collection of architectural photography, project visuals, and video showcases from PT Karya Nusantara Realty.",
});

const galleryItems: GalleryItem[] = [
  { src: "/images/gallery/gallery-01.jpg", alt: "Luxury living room interior", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-02.jpg", alt: "Modern villa exterior", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-03.jpg", alt: "Hotel lobby design", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-04.jpg", alt: "Minimalist bathroom", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-05.jpg", alt: "Garden landscape", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-06.jpg", alt: "Office interior", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-07.jpg", alt: "Rooftop terrace", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-08.jpg", alt: "Staircase design", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-09.jpg", alt: "Pool and outdoor area", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-10.jpg", alt: "Master bedroom", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-11.jpg", alt: "Facade detail", width: 1920, height: 1280 },
  { src: "/images/gallery/gallery-12.jpg", alt: "Restaurant interior", width: 1920, height: 1280 },
];

const showcaseVideo: VideoItem = {
  src: "/videos/project-showcase.mp4",
  title: "Project Showcase 2025",
  type: "local",
};

export default function GalleryPage() {
  return (
    <>
      <AnimatedSection>
        <GalleryGrid
          title="Photo Gallery"
          description="A curated selection of architectural photography from our projects."
          items={galleryItems}
          columns={3}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <InteractiveGallery
          title="Interactive Gallery"
          description="Browse all visuals in a compact, explorable grid."
          images={galleryItems}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <VideoShowcase
          title="Video Showcase"
          description="See our projects come to life through cinematic videography."
          video={showcaseVideo}
        />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <CTADefault
          title="Inspired by What You See?"
          description="Let us discuss how we can create something equally considered for your project."
          primaryCta={{ label: "Start a Conversation", href: "/contact" }}
          secondaryCta={{ label: "View Our Portfolio", href: "/portfolio" }}
        />
      </AnimatedSection>
    </>
  );
}
