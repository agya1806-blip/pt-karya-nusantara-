import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { cardHoverTransition } from "@/lib/animation";
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
      {icon && <div className="mb-5 text-brand-500">{icon}</div>}
      <h3 className="font-serif text-heading-sm text-text leading-snug">{title}</h3>
      <p className="text-body text-text-secondary mt-3 leading-relaxed">{description}</p>
      {features && features.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-body-sm text-text-secondary">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      {href && (
        <div className="mt-6 flex items-center gap-1.5 text-caption font-medium tracking-widest uppercase text-brand-500 transition-colors duration-300 group-hover:text-brand-600">
          Selengkapnya <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={cn(
          "group block bg-surface border border-border-light/60 p-8 transition-all duration-500 ease-architectural hover:-translate-y-0.5 hover:border-border-default hover:shadow-elevation-4",
          className,
        )}
        whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
        transition={cardHoverTransition}
      >
        {shared}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={cn(
        "bg-surface border border-border-light/60 p-8 transition-all duration-500 ease-architectural hover:-translate-y-0.5 hover:border-border-default hover:shadow-elevation-4",
        className,
      )}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
      transition={cardHoverTransition}
    >
      {shared}
    </motion.div>
  );
}

export { ServiceCard };
