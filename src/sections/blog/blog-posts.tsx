"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/sections/types";

interface BlogPostsProps {
  label?: string;
  title: string;
  description?: string;
  posts: BlogPost[];
  variant?: "featured" | "latest";
  columns?: 2 | 3;
  className?: string;
}

const gridCols = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
};

export function BlogPosts({
  label,
  title,
  description,
  posts,
  variant = "latest",
  columns = 3,
  className,
}: BlogPostsProps) {
  if (variant === "featured" && posts.length > 0) {
    const featured = posts[0];
    const rest = posts.slice(1);

    return (
      <section className={cn("bg-surface py-24", className)}>
        <div className="container-site">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
          <div className="mt-16 space-y-12">
            {featured && (
              <Link
                href={featured.href}
                className="group grid items-center gap-8 lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                  <ImageReveal
                    src={featured.image.src}
                    alt={featured.image.alt}
                    fill
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                    {featured.category}
                  </span>
                  <h3 className="mt-2 text-heading font-light tracking-tight text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-body text-text-secondary leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-body-sm text-text-secondary">
                    <span>{featured.date}</span>
                    {featured.author && <span>{featured.author}</span>}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-brand-600 transition-all duration-300 group-hover:gap-2">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            )}
            {rest.length > 0 && (
              <Stagger className={cn("grid gap-8", gridCols[columns])}>
                {rest.map((post) => (
                  <StaggerItem key={post.title}>
                    <Link
                      href={post.href}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                        <ImageReveal
                          src={post.image.src}
                          alt={post.image.alt}
                          fill
                          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-4">
                        <span className="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                          {post.category}
                        </span>
                        <h3 className="mt-1 text-heading-sm font-medium text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-body-sm text-text-secondary line-clamp-2">
                          {post.excerpt}
                        </p>
                        <span className="mt-2 inline-block text-caption text-text-tertiary">
                          {post.date}
                        </span>
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

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className={cn("mt-16 grid gap-8", gridCols[columns])}>
          {posts.map((post) => (
            <StaggerItem key={post.title}>
              <Link
                href={post.href}
                className="group block"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <ImageReveal
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                    {post.category}
                  </span>
                  <h3 className="mt-1 text-heading-sm font-medium text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-text-secondary line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-caption text-text-tertiary">
                    <span>{post.date}</span>
                    {post.author && <span>{post.author}</span>}
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
