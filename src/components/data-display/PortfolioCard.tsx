import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface PortfolioCardProps {
  image: string;
  title: string;
  category: string;
  href?: string;
  className?: string;
}

function PortfolioCard({ image, title, category, href, className }: PortfolioCardProps) {
  const shared = (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 ease-architectural group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-900/80 via-brand-800/30 to-transparent p-7 opacity-0 transition-opacity duration-500 ease-architectural group-hover:opacity-100">
        <h3 className="text-heading-sm text-text-inverse font-medium">{title}</h3>
        <p className="text-body-sm text-text-inverse/70 mt-1.5">{category}</p>
        {href && <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-text-inverse" />}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className={cn("group block", className)}>
        {shared}
      </a>
    );
  }

  return (
    <div className={cn("group", className)}>
      {shared}
    </div>
  );
}

export { PortfolioCard };
