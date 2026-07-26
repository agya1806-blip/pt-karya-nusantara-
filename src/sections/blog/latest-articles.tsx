"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import Link from "next/link";
import type { ArticleItem } from "@/sections/types";

interface LatestArticlesProps {
  title: string;
  description?: string;
  articles: ArticleItem[];
  itemsPerPage?: number;
  className?: string;
}

export function LatestArticles({
  title,
  description,
  articles,
  itemsPerPage = 6,
  className,
}: LatestArticlesProps) {
  const displayed = articles.slice(0, itemsPerPage);

  return (
    <section className={cn("bg-surface-secondary py-24 lg:py-28", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Stagger className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((article) => (
            <StaggerItem key={article.id}>
              <Link
                href={`/blog/${article.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <ImageReveal
                    src={article.image.src}
                    alt={article.image.alt}
                    fill
                    className="h-full w-full transition-transform duration-700 ease-luxury group-hover:scale-105"
                  />
                </div>
                <div className="mt-5">
                  <span className="text-overline tracking-widest text-brand-500">
                    {article.category}
                  </span>
                  <h3 className="mt-2 font-serif text-heading-sm font-medium text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-text-secondary line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-overline text-text-tertiary">
                    <span>{article.date}</span>
                    {article.author && <span>{article.author}</span>}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
