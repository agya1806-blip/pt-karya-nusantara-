"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/sections/types";

interface FAQListProps {
  label?: string;
  title: string;
  description?: string;
  items: FAQItem[];
  categories?: string[];
  className?: string;
}

export function FAQList({
  label,
  title,
  description,
  items,
  categories,
  className,
}: FAQListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categories?.[0] ?? null,
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredItems = activeCategory && categories
    ? items
    : items;

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        {categories && categories.length > 0 && (
          <Fade direction="up" className="mt-10">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(null);
                  }}
                  className={cn(
                    "rounded-full px-5 py-2 text-body-sm font-medium transition-all duration-300 ease-luxury",
                    activeCategory === cat
                      ? "bg-surface-dark text-text-inverse"
                      : "bg-surface-muted text-text-secondary hover:bg-surface-dark hover:text-text-inverse",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Fade>
        )}
        <div className="mx-auto mt-12 max-w-3xl">
          <Stagger className="divide-y divide-border">
            {filteredItems.map((item, i) => (
              <StaggerItem key={i}>
                <div>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className={cn(
                      "flex w-full items-start justify-between gap-4 py-5 text-left transition-colors duration-300 ease-luxury",
                      openIndex === i
                        ? "text-text"
                        : "text-text-secondary hover:text-text",
                    )}
                    aria-expanded={openIndex === i}
                  >
                    <span className="text-body font-medium">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "mt-1 flex-shrink-0 transition-transform duration-300 ease-luxury",
                        openIndex === i && "rotate-180",
                      )}
                    />
                  </button>
                  {openIndex === i && (
                    <div className="pb-5">
                      <p className="text-body-sm text-text-muted leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
