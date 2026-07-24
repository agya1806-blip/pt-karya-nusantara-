import { BlogPosts, BlogCategories, NewsletterCTA, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { BlogPost } from "@/sections";

export const metadata = createMetadata({
  title: "Blog",
  description: "Perspectives on architecture, design, and the built environment from the team at PT Karya Nusantara Realty.",
});

const featuredPosts: BlogPost[] = [
  { title: "The Future of Sustainable Luxury Architecture", excerpt: "How we are redefining luxury through sustainable design principles and thoughtfully sourced materials.", image: { src: "/images/blog/sustainable-luxury.jpg", alt: "Sustainable luxury architecture" }, date: "2025-06-15", author: "Ardi Wicaksono", category: "Sustainability", href: "/blog/future-of-sustainable-luxury" },
  { title: "Designing for Tropical Living", excerpt: "Principles for creating comfortable, beautiful homes in Indonesia's tropical climate.", image: { src: "/images/blog/tropical-living.jpg", alt: "Tropical living design" }, date: "2025-05-28", author: "Sari Dewi", category: "Design", href: "/blog/designing-for-tropical-living" },
  { title: "Biophilic Design in Urban Spaces", excerpt: "Bringing nature into the city through thoughtful integration of natural elements in architecture.", image: { src: "/images/blog/biophilic.jpg", alt: "Biophilic design" }, date: "2025-05-10", author: "Rina Wijaya", category: "Design Trends", href: "/blog/biophilic-design-urban-spaces" },
];

const latestPosts: BlogPost[] = [
  { title: "Navigating Building Permits in Indonesia", excerpt: "A guide to the permitting process for residential and commercial projects in Indonesia.", image: { src: "/images/blog/permits.jpg", alt: "Building permits" }, date: "2025-04-20", author: "Budi Santoso", category: "Guides", href: "/blog/navigating-building-permits" },
  { title: "Material Spotlight: Local Stone", excerpt: "Exploring Indonesia's natural stone heritage and its contemporary architectural applications.", image: { src: "/images/blog/local-stone.jpg", alt: "Local stone architecture" }, date: "2025-04-05", author: "Maya Putri", category: "Materials", href: "/blog/material-spotlight-local-stone" },
  { title: "The Art of Architectural Lighting", excerpt: "How considered lighting design transforms spaces and enhances architectural form.", image: { src: "/images/blog/lighting.jpg", alt: "Architectural lighting" }, date: "2025-03-18", author: "Dimas Prayogo", category: "Design", href: "/blog/art-of-architectural-lighting" },
  { title: "Preserving Heritage Through Modern Design", excerpt: "Integrating traditional Indonesian craftsmanship into contemporary architectural expression.", image: { src: "/images/blog/heritage.jpg", alt: "Heritage architecture" }, date: "2025-03-01", author: "Ardi Wicaksono", category: "Culture", href: "/blog/preserving-heritage-modern-design" },
  { title: "Smart Home Integration in Luxury Properties", excerpt: "The latest in home automation and its role in the contemporary luxury living experience.", image: { src: "/images/blog/smart-home.jpg", alt: "Smart home technology" }, date: "2025-02-14", author: "Alex Hartono", category: "Technology", href: "/blog/smart-home-luxury-properties" },
  { title: "Colour Trends in Architecture for 2025", excerpt: "A look at the emerging palettes shaping architectural design this year.", image: { src: "/images/blog/color-trends.jpg", alt: "Color trends architecture" }, date: "2025-01-30", author: "Lisa Tanudjaja", category: "Design Trends", href: "/blog/color-trends-2025" },
];

export default function BlogPage() {
  return (
    <>
      <BlogPosts
        title="Featured Articles"
        description="Curated perspectives from our team on architecture, design, and the built environment."
        posts={featuredPosts}
        variant="featured"
      />
      <BlogPosts
        title="Latest Articles"
        description="Recent thinking and insights from our studio."
        posts={latestPosts}
        variant="latest"
        columns={3}
      />
      <NewsletterCTA
        title="Stay Informed"
        description="Subscribe to receive our latest articles, project updates, and design perspectives."
      />
      <CTADefault
        title="Turn Inspiration into Reality"
        description="Our team is ready to bring your architectural vision to life. Let us start the conversation."
        primaryCta={{ label: "Begin Your Project", href: "/contact" }}
      />
    </>
  );
}
