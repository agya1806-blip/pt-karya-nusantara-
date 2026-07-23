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
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 ease-luxury group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 ease-luxury group-hover:opacity-100">
        <h3 className="text-heading-sm text-text-inverse">{title}</h3>
        <p className="text-body-sm text-text-inverse/80 mt-1">{category}</p>
        {href && <ArrowUpRight className="absolute right-4 top-4 h-6 w-6 text-text-inverse" />}
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
