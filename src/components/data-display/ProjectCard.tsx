import { cn } from "@/lib/utils";
import { ArrowUpRight, MapPin } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  location: string;
  year: number | string;
  href?: string;
  className?: string;
}

function ProjectCard({ image, title, category, location, year, href, className }: ProjectCardProps) {
  const shared = (
    <>
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-64 w-full object-cover transition-transform duration-300 ease-luxury group-hover:scale-105"
        />
        {href && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 ease-luxury group-hover:opacity-100">
            <ArrowUpRight className="h-8 w-8 text-text-inverse" />
          </div>
        )}
      </div>
      <div className="p-6">
        <span className="text-caption tracking-widest text-text-muted">{category}</span>
        <h3 className="text-heading-sm text-text mt-1 font-light">{title}</h3>
        <div className="mt-3 flex items-center gap-4 text-body-sm text-text-secondary">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
          <span>{year}</span>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "group block rounded-2xl bg-surface overflow-hidden transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-elevation-3",
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
        "group rounded-2xl bg-surface overflow-hidden transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-elevation-3",
        className,
      )}
    >
      {shared}
    </div>
  );
}

export { ProjectCard };
