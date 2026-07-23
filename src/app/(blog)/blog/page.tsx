import { BlogPosts, BlogCategories, NewsletterCTA, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
import type { BlogPost } from "@/sections";

export const metadata = createMetadata({
  title: "Blog",
  description: "Insights, trends, and stories from PT Karya Nusantara Realty — exploring architecture, design, and the built environment.",
});

const featuredPosts: BlogPost[] = [
  { title: "The Future of Sustainable Luxury Architecture", excerpt: "How Indonesia's leading architecture firm is redefining luxury through sustainable design principles and innovative materials.", image: { src: "/images/blog/sustainable-luxury.jpg", alt: "Sustainable luxury architecture" }, date: "2025-06-15", author: "Ardi Wicaksono", category: "Sustainability", href: "/blog/future-of-sustainable-luxury" },
  { title: "Designing for Tropical Living", excerpt: "Essential principles for creating comfortable, beautiful homes in Indonesia's tropical climate.", image: { src: "/images/blog/tropical-living.jpg", alt: "Tropical living design" }, date: "2025-05-28", author: "Sari Dewi", category: "Design", href: "/blog/designing-for-tropical-living" },
  { title: "Biophilic Design in Urban Spaces", excerpt: "Bringing nature into the city through thoughtful architectural integration of natural elements.", image: { src: "/images/blog/biophilic.jpg", alt: "Biophilic design" }, date: "2025-05-10", author: "Rina Wijaya", category: "Design Trends", href: "/blog/biophilic-design-urban-spaces" },
];

const latestPosts: BlogPost[] = [
  { title: "Navigating Building Permits in Indonesia", excerpt: "A comprehensive guide to the permitting process for residential and commercial projects.", image: { src: "/images/blog/permits.jpg", alt: "Building permits" }, date: "2025-04-20", author: "Budi Santoso", category: "Guides", href: "/blog/navigating-building-permits" },
  { title: "Material Spotlight: Local Stone", excerpt: "Exploring Indonesia's rich heritage of natural stone and its modern architectural applications.", image: { src: "/images/blog/local-stone.jpg", alt: "Local stone architecture" }, date: "2025-04-05", author: "Maya Putri", category: "Materials", href: "/blog/material-spotlight-local-stone" },
  { title: "The Art of Architectural Lighting", excerpt: "How thoughtful lighting design transforms spaces and enhances architectural forms.", image: { src: "/images/blog/lighting.jpg", alt: "Architectural lighting" }, date: "2025-03-18", author: "Dimas Prayogo", category: "Design", href: "/blog/art-of-architectural-lighting" },
  { title: "Preserving Heritage Through Modern Design", excerpt: "How we integrate traditional Indonesian craftsmanship into contemporary architecture.", image: { src: "/images/blog/heritage.jpg", alt: "Heritage architecture" }, date: "2025-03-01", author: "Ardi Wicaksono", category: "Culture", href: "/blog/preserving-heritage-modern-design" },
  { title: "Smart Home Integration in Luxury Properties", excerpt: "The latest in home automation and how it enhances luxury living experiences.", image: { src: "/images/blog/smart-home.jpg", alt: "Smart home technology" }, date: "2025-02-14", author: "Alex Hartono", category: "Technology", href: "/blog/smart-home-luxury-properties" },
  { title: "Color Trends in Architecture for 2025", excerpt: "A look at the emerging color palettes shaping architectural design this year.", image: { src: "/images/blog/color-trends.jpg", alt: "Color trends architecture" }, date: "2025-01-30", author: "Lisa Tanudjaja", category: "Design Trends", href: "/blog/color-trends-2025" },
];

export default function BlogPage() {
  return (
    <>
      <BlogPosts
        title="Featured Articles"
        description="Curated insights and stories from our team of architects and designers."
        posts={featuredPosts}
        variant="featured"
      />
      <BlogPosts
        title="Latest Articles"
        description="Stay up to date with our latest thinking on architecture, design, and the built environment."
        posts={latestPosts}
        variant="latest"
        columns={3}
      />
      <NewsletterCTA
        title="Stay Inspired"
        description="Subscribe to our newsletter for the latest articles, project updates, and design insights."
      />
      <CTADefault
        title="Have a Project in Mind?"
        description="Let's discuss how we can bring your architectural vision to life."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
