import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

type TrendDirection = "up" | "down" | "neutral";

interface StatisticCardProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
  trend?: TrendDirection;
  className?: string;
}

function StatisticCard({ value, label, prefix, suffix, trend, className }: StatisticCardProps) {
  return (
    <div className={cn("bg-surface rounded-xl p-8 text-center", className)}>
      <div className="flex items-baseline justify-center gap-2">
        {prefix && <span className="text-heading text-text-tertiary">{prefix}</span>}
        <span className="text-display text-text font-light tracking-tight">{value}</span>
        {suffix && <span className="text-heading text-text-tertiary">{suffix}</span>}
        {trend && trend !== "neutral" && (
          <span
            className={cn(
              "flex items-center",
              trend === "up" ? "text-green-500" : "text-red-500",
            )}
          >
            {trend === "up" ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
          </span>
        )}
      </div>
      <p className="text-body-sm text-text-secondary mt-3 tracking-widest">{label}</p>
    </div>
  );
}

export { StatisticCard };
