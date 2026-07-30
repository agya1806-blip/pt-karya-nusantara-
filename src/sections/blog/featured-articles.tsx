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
    <section className={cn("bg-surface py-24 lg:py-28", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <div className="mt-20 space-y-16">
          {first && (
            <Link
              href={`/blog/${first.slug}`}
              className="group grid items-center gap-10 lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <ImageReveal
                  src={first.image.src}
                  alt={first.image.alt}
                  fill
                  className="h-full w-full transition-transform duration-700 ease-luxury group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-overline tracking-widest text-brand-500">
                  {first.category}
                </span>
                <h3 className="mt-3 font-serif text-heading font-light tracking-tight text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                  {first.title}
                </h3>
                <p className="mt-4 text-body text-text-secondary leading-relaxed">
                  {first.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-5 text-body-sm text-text-secondary">
                  <span>{first.date}</span>
                  {first.author && <span>{first.author}</span>}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-caption font-medium tracking-widest uppercase text-brand-600 transition-all duration-300 group-hover:gap-3">
                  Baca Artikel <ArrowRight size={12} />
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
          )}
        </div>
      </div>
    </section>
  );
}
