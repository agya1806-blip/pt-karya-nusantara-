"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryLink {
  label: string;
  href: string;
}

interface ProjectCategoriesProps {
  title: string;
  description?: string;
  categories: CategoryLink[];
  className?: string;
}

export function ProjectCategories({
  title,
  description,
  categories,
  className,
}: ProjectCategoriesProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mx-auto mt-16 grid max-w-2xl gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex items-center justify-between rounded-xl border border-border-light bg-surface px-6 py-5 transition-all duration-300 hover:border-text-primary hover:shadow-elevation-1"
            >
              <span className="text-body font-medium text-text-primary transition-colors duration-300 group-hover:text-brand-600">
                {cat.label}
              </span>
              <ArrowRight
                size={16}
                className="text-text-tertiary transition-all duration-300 group-hover:translate-x-1 group-hover:text-text-primary"
              />
            </Link>
          ))}
        </Fade>
      </div>
    </section>
  );
}
