"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/sections/types";

interface CategoryGroup {
  label: string;
  items: FAQItem[];
}

interface CategoryFAQProps {
  title: string;
  description?: string;
  categories: CategoryGroup[];
  className?: string;
}

export function CategoryFAQ({
  title,
  description,
  categories,
  className,
}: CategoryFAQProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.label ?? "");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeItems = categories.find((c) => c.label === activeCategory)?.items ?? [];

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader title={title} description={description} />
        <Fade direction="up" className="mx-auto mt-16 max-w-4xl">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(cat.label)}
                className={cn(
                  "rounded-full px-5 py-2 text-body-sm font-medium transition-all duration-300",
                  activeCategory === cat.label
                    ? "bg-text-primary text-text-inverse"
                    : "border border-border-light text-text-secondary hover:bg-surface-secondary",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="divide-y divide-border-light">
            {activeItems.map((item, i) => {
              const key = `${activeCategory}-${i}`;
              return (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => toggleItem(key)}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors duration-300 hover:text-text-primary"
                    aria-expanded={!!openItems[key]}
                  >
                    <span className="text-body font-medium text-text-primary">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "mt-1 flex-shrink-0 text-text-secondary transition-transform duration-300",
                        openItems[key] && "rotate-180",
                      )}
                    />
                  </button>
                  {openItems[key] && (
                    <div className="pb-5">
                      <p className="text-body-sm text-text-secondary leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Fade>
      </div>
    </section>
  );
}
