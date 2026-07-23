"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";
import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { ChevronDown, Plus, Minus } from "lucide-react";
import type { FAQItem } from "@/sections/types";

interface FAQAccordionProps {
  label?: string;
  title: string;
  description?: string;
  items: FAQItem[];
  variant?: "default" | "bordered" | "cards";
  icon?: "chevron" | "plus";
  className?: string;
}

export function FAQAccordion({
  label,
  title,
  description,
  items,
  variant = "default",
  icon = "chevron",
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    items.length === 1 ? 0 : null,
  );

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (variant === "cards") {
    return (
      <section className={cn("bg-surface py-24", className)}>
        <div className="container-site">
          <SectionHeader
            label={label}
            title={title}
            description={description}
          />
          <Stagger className="mx-auto mt-16 grid max-w-4xl gap-4 md:grid-cols-2">
            {items.map((item, i) => (
              <StaggerItem key={i}>
                <div
                  className={cn(
                    "rounded-xl border border-border-light bg-surface-secondary p-6 transition-all duration-300",
                    openIndex === i && "ring-1 ring-text-primary",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                    aria-expanded={openIndex === i}
                  >
                    <span className="text-body font-medium text-text-primary">
                      {item.question}
                    </span>
                    {icon === "plus" ? (
                      openIndex === i ? (
                        <Minus
                          size={16}
                          className="mt-1 flex-shrink-0 text-text-secondary"
                        />
                      ) : (
                        <Plus
                          size={16}
                          className="mt-1 flex-shrink-0 text-text-secondary"
                        />
                      )
                    ) : (
                      <ChevronDown
                        size={16}
                        className={cn(
                          "mt-1 flex-shrink-0 text-text-secondary transition-transform duration-300",
                          openIndex === i && "rotate-180",
                        )}
                      />
                    )}
                  </button>
                  {openIndex === i && (
                    <div className="mt-4">
                      <p className="text-body-sm text-text-secondary leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
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
        <div className="mx-auto mt-16 max-w-3xl">
          <Fade direction="up">
            <div className="divide-y divide-border-light">
              {items.map((item, i) => (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className={cn(
                      "flex w-full items-start justify-between gap-4 py-5 text-left transition-colors duration-300",
                      variant === "bordered" && "px-6",
                      openIndex === i
                        ? "text-text-primary"
                        : "text-text-secondary hover:text-text-primary",
                    )}
                    aria-expanded={openIndex === i}
                  >
                    <span className="text-body font-medium">
                      {item.question}
                    </span>
                    {icon === "plus" ? (
                      openIndex === i ? (
                        <Minus size={16} className="mt-1 flex-shrink-0" />
                      ) : (
                        <Plus size={16} className="mt-1 flex-shrink-0" />
                      )
                    ) : (
                      <ChevronDown
                        size={16}
                        className={cn(
                          "mt-1 flex-shrink-0 transition-transform duration-300",
                          openIndex === i && "rotate-180",
                        )}
                      />
                    )}
                  </button>
                  {openIndex === i && (
                    <div
                      className={cn(
                        "pb-5",
                        variant === "bordered" && "px-6",
                      )}
                    >
                      <p className="text-body-sm text-text-secondary leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
