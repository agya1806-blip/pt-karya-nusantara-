"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQSection({
  title,
  description,
  items,
  className,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={cn("py-20", className)}>
      <div className="container-site">
        {(title || description) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2 className="text-heading-xl font-light tracking-tight text-text">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-body-lg leading-relaxed text-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-border-muted bg-surface transition-colors duration-300"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-body font-medium tracking-tight text-text">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "flex-shrink-0 text-text-muted transition-transform duration-300",
                    openIndex === index && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border-muted px-6 py-5">
                      <p className="text-body-sm leading-relaxed text-text-secondary">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
