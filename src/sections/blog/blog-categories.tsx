"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogCategory {
  name: string;
  slug: string;
  count: number;
  description?: string;
  image?: string;
}

interface BlogCategoriesProps {
  label?: string;
  title: string;
  description?: string;
  categories: BlogCategory[];
  variant?: "grid" | "list";
  className?: string;
}

export function BlogCategories({
  label,
  title,
  description,
  categories,
  variant = "grid",
  className,
}: BlogCategoriesProps) {
  if (variant === "list") {
    return (
      <section className={cn("bg-surface-secondary py-24", className)}>
        <div className="container-site">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
          <div className="mx-auto mt-16 max-w-2xl">
            <Stagger className="space-y-4">
              {categories.map((cat) => (
                <StaggerItem key={cat.slug}>
                  <Link
                    href={`/blog/category/${cat.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border-light bg-surface px-6 py-5 transition-all duration-300 hover:border-text-primary hover:shadow-elevation-1"
                  >
                    <div>
                      <span className="text-body font-medium text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                        {cat.name}
                      </span>
                      {cat.description && (
                        <p className="text-body-sm text-text-secondary mt-0.5">
                          {cat.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-surface-secondary px-3 py-1 text-caption text-text-secondary tabular-nums">
                        {cat.count}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-text-tertiary transition-all duration-300 group-hover:translate-x-1 group-hover:text-text-primary"
                      />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <Link
                href={`/blog/category/${cat.slug}`}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl"
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface-secondary" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative p-6">
                  <h3 className="text-heading-sm font-medium text-white">
                    {cat.name}
                  </h3>
                  <p className="text-body-sm text-white/80">
                    {cat.count} {cat.count === 1 ? "article" : "articles"}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
