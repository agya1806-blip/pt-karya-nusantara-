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
          className="h-48 w-full object-cover transition-transform duration-300 ease-luxury group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-caption tracking-widest text-text-muted">
          <span>{category}</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </span>
        </div>
        <h3 className="text-heading-sm text-text mt-3">{title}</h3>
        <p className="text-body text-text-secondary mt-2 leading-relaxed">{excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-body-sm text-text-secondary">
          <User className="h-3.5 w-3.5" />
          {author}
        </div>
        {href && (
          <div className="mt-4 flex items-center gap-1 text-body-sm font-medium text-brand-500 group-hover:underline">
            Read More <ArrowUpRight className="h-4 w-4" />
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
          "group block bg-surface rounded-2xl overflow-hidden transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-elevation-3",
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
        "group bg-surface rounded-2xl overflow-hidden transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-elevation-3",
        className,
      )}
    >
      {shared}
    </div>
  );
}

export { BlogCard };
