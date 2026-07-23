import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { useState, type ReactNode } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function handleToggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn("divide-y divide-border-light", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => handleToggle(item.id)}
              className="flex w-full items-center justify-between py-5 text-left text-heading-sm text-text transition-colors duration-300 ease-architectural hover:text-brand-500"
            >
              {item.title}
              {isOpen ? (
                <Minus className="h-5 w-5 shrink-0 text-text-tertiary" />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-text-tertiary" />
              )}
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-400 ease-architectural",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-6 text-body text-text-secondary leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Accordion };
