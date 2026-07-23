import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "grid" | "inline";
  className?: string;
}

const gridCols: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function StatsSection({
  stats,
  columns = 4,
  variant = "default",
  className,
}: StatsSectionProps) {
  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-12 gap-y-6",
          className,
        )}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-display-lg font-light tracking-tight text-text">
              {stat.prefix}{stat.value}{stat.suffix}
            </p>
            <p className="text-body-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-8", gridCols[columns], className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border-muted bg-surface p-8 text-center transition-colors duration-300"
        >
          <p className="text-display font-light tracking-tight text-text">
            {stat.prefix}{stat.value}{stat.suffix}
          </p>
          <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
