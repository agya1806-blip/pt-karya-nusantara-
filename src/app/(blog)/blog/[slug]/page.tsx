import { BlogPosts, NewsletterCTA, CTADefault } from "@/sections";
import { createMetadata } from "@/seo";
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
    title: "Biophilic Design in Urban Spaces", excerpt: "Bringing nature into the city through thoughtful architectural integration.", image: { src: "/images/blog/biophilic.jpg", alt: "Biophilic design" }, date: "2025-05-10", author: "Rina Wijaya", category: "Design Trends", href: "/blog/biophilic-design-urban-spaces",
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
        title="Start Your Project"
        description="Ready to turn inspiration into reality? Contact our team today."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
