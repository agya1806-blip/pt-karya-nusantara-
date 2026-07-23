import { BlogPosts, NewsletterCTA, CTADefault } from "@/sections";
import { createMetadata, createArticleSchema, createBreadcrumbSchema, JsonLdScript } from "@/seo";
import type { BlogPost } from "@/sections";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const articles: Record<string, BlogPost> = {
  "future-of-sustainable-luxury": {
    title: "The Future of Sustainable Luxury Architecture", excerpt: "How Indonesia's leading architecture firm is redefining luxury through sustainable design principles.", image: { src: "/images/blog/sustainable-luxury.jpg", alt: "Sustainable luxury architecture" }, date: "2025-06-15", author: "Ardi Wicaksono", category: "Sustainability", href: "/blog/future-of-sustainable-luxury",
  },
  "designing-for-tropical-living": {
    title: "Designing for Tropical Living", excerpt: "Essential principles for creating comfortable, beautiful homes in Indonesia's tropical climate.", image: { src: "/images/blog/tropical-living.jpg", alt: "Tropical living design" }, date: "2025-05-28", author: "Sari Dewi", category: "Design", href: "/blog/designing-for-tropical-living",
  },
  "biophilic-design-urban-spaces": {
    title: "Biophilic Design in Urban Spaces", excerpt: "Bringing nature into the city through thoughtful architectural integration.", image: { src: "/images/blog/biophilic.jpg", alt: "Biophilic design" }, date: "2025-05-10", author: "Rina Wijaya", category: "Design", href: "/blog/biophilic-design-urban-spaces",
  },
  "smart-home-integration": {
    title: "Smart Home Integration in Modern Architecture", excerpt: "How smart home technology is transforming the way we design and interact with our living spaces.", image: { src: "/images/blog/smart-home.jpg", alt: "Smart home integration" }, date: "2025-06-01", author: "Bagas Pratama", category: "Technology", href: "/blog/smart-home-integration",
  },
  "sustainable-materials": {
    title: "Guide to Sustainable Building Materials", excerpt: "A comprehensive guide to eco-friendly materials transforming the construction industry.", image: { src: "/images/blog/sustainable-materials.jpg", alt: "Sustainable materials" }, date: "2025-05-20", author: "Dewi Lestari", category: "Sustainability", href: "/blog/sustainable-materials",
  },
  "maximizing-small-spaces": {
    title: "Maximizing Small Spaces: Design Strategies", excerpt: "Expert strategies for making the most of compact living spaces without compromising style.", image: { src: "/images/blog/small-spaces.jpg", alt: "Small space design" }, date: "2025-05-05", author: "Rina Wijaya", category: "Design", href: "/blog/maximizing-small-spaces",
  },
  "landscape-architecture-trends": {
    title: "Landscape Architecture Trends 2025", excerpt: "The latest trends in landscape architecture that are shaping outdoor spaces across Southeast Asia.", image: { src: "/images/blog/landscape-trends.jpg", alt: "Landscape architecture" }, date: "2025-04-22", author: "Ardi Wicaksono", category: "Design", href: "/blog/landscape-architecture-trends",
  },
  "heritage-conservation": {
    title: "Heritage Conservation in Modern Architecture", excerpt: "How architects are preserving cultural heritage while creating contemporary spaces.", image: { src: "/images/blog/heritage.jpg", alt: "Heritage conservation" }, date: "2025-04-10", author: "Sari Dewi", category: "Culture", href: "/blog/heritage-conservation",
  },
  "future-of-workspace": {
    title: "The Future of Workspace Design", excerpt: "Redesigning the modern workplace to foster collaboration, well-being, and productivity.", image: { src: "/images/blog/future-workspace.jpg", alt: "Future workspace" }, date: "2025-03-28", author: "Bagas Pratama", category: "Commercial", href: "/blog/future-of-workspace",
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return createMetadata({ title: "Article Not Found" });
  return createMetadata({ title: article.title, description: article.excerpt });
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return <CTADefault title="Article Not Found" description="The article you are looking for does not exist." primaryCta={{ label: "View Blog", href: "/blog" }} />;
  }

  const relatedArticles = Object.values(articles)
    .filter((a) => a.href !== slug && a.category === article.category)
    .slice(0, 3);

  return (
    <>
      <JsonLdScript data={createArticleSchema({
        headline: article.title,
        description: article.excerpt,
        image: article.image.src,
        datePublished: article.date,
        author: article.author ?? "PT Karya Nusantara Realty",
        url: `/blog/${slug}`,
      })} id="article-schema" />
      <JsonLdScript data={createBreadcrumbSchema([
        { name: "Blog", href: "/blog" },
        { name: article.title },
      ])} id="breadcrumb-schema" />
      <BlogPosts
        title={article.title}
        description={article.excerpt}
        posts={[article]}
        variant="featured"
      />
      <BlogPosts
        title="Related Articles"
        description="Continue reading more articles in this category."
        posts={relatedArticles.length > 0 ? relatedArticles : Object.values(articles).filter((a) => a.href !== slug).slice(0, 3)}
        variant="latest"
        columns={3}
      />
      <NewsletterCTA
        title="Enjoyed This Article?"
        description="Subscribe to our newsletter for more insights delivered to your inbox."
      />
      <CTADefault
        title="Inspired by This Article?"
        description="Our team of architects is ready to help you apply these ideas to your own project."
        primaryCta={{ label: "Discuss Your Project", href: "/contact" }}
      />
    </>
  );
}
