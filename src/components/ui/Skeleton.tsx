import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circle" | "rect" | "card";
}

export function Skeleton({ className, variant = "rect" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-200 dark:bg-neutral-800",
        variant === "circle" && "rounded-full",
        variant === "text" && "h-4 w-full rounded",
        variant === "card" && "h-64 w-full rounded-2xl",
        variant === "rect" && "h-full w-full rounded-lg",
        className,
      )}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-2xl border border-gold-500/5 bg-surface p-6">
      <Skeleton variant="rect" className="aspect-[4/3] rounded-xl" />
      <Skeleton variant="text" className="w-1/3" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? "w-2/3" : "w-full"}
        />
      ))}
    </div>
  );
}
