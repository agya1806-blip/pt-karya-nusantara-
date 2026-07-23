import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index?: number;
  className?: string;
}

function FeatureCard({ title, description, icon, index, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-2xl p-6 transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-elevation-3",
        className,
      )}
    >
      {index !== undefined && (
        <span className="text-display-sm text-text-muted font-light tracking-tight">
          {String(index).padStart(2, "0")}
        </span>
      )}
      {icon && <div className="mb-4 text-brand-500">{icon}</div>}
      <h3 className="text-heading-sm text-text">{title}</h3>
      <p className="text-body text-text-secondary mt-2 leading-relaxed">{description}</p>
    </div>
  );
}

export { FeatureCard };
