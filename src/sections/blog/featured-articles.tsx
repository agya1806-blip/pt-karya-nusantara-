"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ArticleItem } from "@/sections/types";

interface FeaturedArticlesProps {
  title: string;
  description?: string;
  articles: ArticleItem[];
  className?: string;
}

export function FeaturedArticles({
  title,
  description,
  articles,
  className,
}: FeaturedArticlesProps) {
  const [first, ...rest] = articles;

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <div className="mt-16 space-y-12">
          {first && (
            <Link
              href={`/blog/${first.slug}`}
              className="group grid items-center gap-8 lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                <ImageReveal
                  src={first.image.src}
                  alt={first.image.alt}
                  fill
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                  {first.category}
                </span>
                <h3 className="mt-2 text-heading font-light tracking-tight text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                  {first.title}
                </h3>
                <p className="mt-3 text-body text-text-secondary leading-relaxed">
                  {first.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-body-sm text-text-secondary">
                  <span>{first.date}</span>
                  {first.author && <span>{first.author}</span>}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-brand-600 transition-all duration-300 group-hover:gap-2">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          )}
          {rest.length > 0 && (
            <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <StaggerItem key={article.id}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                      <ImageReveal
                        src={article.image.src}
                        alt={article.image.alt}
                        fill
                        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4">
                      <span className="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                        {article.category}
                      </span>
                      <h3 className="mt-1 text-heading-sm font-medium text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-body-sm text-text-secondary line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-caption text-text-tertiary">
                        <span>{article.date}</span>
                        {article.author && <span>{article.author}</span>}
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </div>
    </section>
  );
}
