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
        "bg-surface rounded-xl p-7 transition-all duration-500 ease-architectural hover:-translate-y-0.5 hover:shadow-elevation-4",
        className,
      )}
    >
      {index !== undefined && (
        <span className="text-display-sm text-text-tertiary font-light tracking-tight">
          {String(index).padStart(2, "0")}
        </span>
      )}
      {icon && <div className="mb-5 text-brand-500">{icon}</div>}
      <h3 className="text-heading-sm text-text leading-snug">{title}</h3>
      <p className="text-body text-text-secondary mt-3 leading-relaxed">{description}</p>
    </div>
  );
}

export { FeatureCard };
