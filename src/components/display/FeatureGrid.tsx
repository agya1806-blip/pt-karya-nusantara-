import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const gridCols: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  features,
  columns = 3,
  className,
}: FeatureGridProps) {
  return (
    <div
      className={cn(
        "grid gap-8",
        gridCols[columns] ?? gridCols[3],
        className,
      )}
    >
      {features.map((feature) => (
        <div
          key={feature.title}
          className="group rounded-xl border border-border-muted bg-surface p-6 transition-all duration-300 hover:border-border hover:shadow-elevation-3"
        >
          {feature.icon && (
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-muted text-text-secondary transition-colors duration-300 group-hover:bg-surface-dark group-hover:text-text">
              {feature.icon}
            </div>
          )}
          <h3 className="text-heading-sm font-medium tracking-tight text-text">
            {feature.title}
          </h3>
          <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
