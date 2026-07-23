import { cn } from "@/lib/utils";
import { ArrowUpRight, Calendar, User } from "lucide-react";

interface BlogCardProps {
  image: string;
  category: string;
  date: string;
  author: string;
  title: string;
  excerpt: string;
  href?: string;
  className?: string;
}

function BlogCard({ image, category, date, author, title, excerpt, href, className }: BlogCardProps) {
  const shared = (
    <>
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover transition-transform duration-500 ease-architectural group-hover:scale-105"
        />
      </div>
      <div className="p-7">
        <div className="flex items-center gap-4 text-caption tracking-widest text-text-tertiary">
          <span className="text-text-secondary">{category}</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </span>
        </div>
        <h3 className="text-heading-sm text-text mt-4 leading-snug">{title}</h3>
        <p className="text-body text-text-secondary mt-3 leading-relaxed">{excerpt}</p>
        <div className="mt-5 flex items-center gap-2 text-body-sm text-text-secondary">
          <User className="h-3.5 w-3.5" />
          {author}
        </div>
        {href && (
          <div className="mt-5 flex items-center gap-1.5 text-body-sm font-medium text-brand-500 transition-colors duration-300 group-hover:text-brand-600">
            Read More <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "group block bg-surface rounded-xl overflow-hidden transition-all duration-500 ease-architectural hover:-translate-y-0.5 hover:shadow-elevation-4",
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
        "group bg-surface rounded-xl overflow-hidden transition-all duration-500 ease-architectural hover:-translate-y-0.5 hover:shadow-elevation-4",
        className,
      )}
    >
      {shared}
    </div>
  );
}

export { BlogCard };
