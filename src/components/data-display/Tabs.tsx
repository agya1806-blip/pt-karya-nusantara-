import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pills";
  className?: string;
}

function getTabListStyles(variant: "underline" | "pills"): string {
  if (variant === "underline") {
    return "border-b border-border-muted";
  }
  return "gap-1";
}

function getTabTriggerStyles(
  variant: "underline" | "pills",
  isActive: boolean,
  isDisabled: boolean,
): string {
  const base = "transition-colors duration-300";
  if (variant === "underline") {
    return cn(
      base,
      "pb-3 border-b-2 border-transparent",
      isActive && "border-brand-500 text-text",
      isDisabled && "text-text-muted cursor-not-allowed",
      !isActive && !isDisabled && "text-text-secondary hover:text-text",
    );
  }
  return cn(
    base,
    "px-4 py-2 rounded-lg",
    isActive && "bg-surface text-text",
    isDisabled && "text-text-muted cursor-not-allowed",
    !isActive && !isDisabled && "text-text-secondary hover:text-text hover:bg-surface-muted",
  );
}

function Tabs({ tabs, activeTab, onChange, variant = "underline", className }: TabsProps) {
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={className}>
      <div className={cn("flex", getTabListStyles(variant))}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTab}
            aria-disabled={tab.disabled}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={getTabTriggerStyles(variant, tab.id === activeTab, !!tab.disabled)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTabData && (
        <div role="tabpanel" className="mt-6">
          {activeTabData.content}
        </div>
      )}
    </div>
  );
}

export { Tabs };
