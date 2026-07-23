"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ImageReveal } from "@/components/animation/ImageReveal";
import Link from "next/link";
import type { MediaItem } from "@/sections/types";

interface CategoryItem {
  title: string;
  description: string;
  image: MediaItem;
  href: string;
  count?: number;
}

interface CategoriesProps {
  label?: string;
  title: string;
  description?: string;
  categories: CategoryItem[];
  className?: string;
}

export function Categories({
  label,
  title,
  description,
  categories,
  className,
}: CategoriesProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <StaggerItem key={category.title}>
              <Link
                href={category.href}
                className="group block h-full overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ImageReveal
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-heading-sm font-medium text-white">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-body-sm text-neutral-300">
                      {category.count
                        ? `${category.count} projects`
                        : category.description}
                    </p>
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
