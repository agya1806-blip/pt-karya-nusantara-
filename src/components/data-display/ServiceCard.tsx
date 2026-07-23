import { cn } from "@/lib/utils";
import { ArrowUpRight, Check } from "lucide-react";

interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  href?: string;
  className?: string;
}

function ServiceCard({ icon, title, description, features, href, className }: ServiceCardProps) {
  const shared = (
    <>
      {icon && <div className="mb-4 text-brand-500">{icon}</div>}
      <h3 className="text-heading-sm text-text">{title}</h3>
      <p className="text-body text-text-secondary mt-2 leading-relaxed">{description}</p>
      {features && features.length > 0 && (
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-body-sm text-text-secondary">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      {href && (
        <div className="mt-6 flex items-center gap-1 text-body-sm font-medium text-brand-500">
          Learn More <ArrowUpRight className="h-4 w-4" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "group block bg-surface rounded-2xl p-6 transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-elevation-3",
          className,
        )}
      >
        {shared}
      </a>
    );
  }

  return (
    <div
      className={cn(
        "bg-surface rounded-2xl p-6 transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-elevation-3",
        className,
      )}
    >
      {shared}
    </div>
  );
}

export { ServiceCard };
