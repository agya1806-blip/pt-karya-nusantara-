import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { cardHoverTransition } from "@/lib/animation";
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
          className="h-64 w-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-5 text-overline tracking-widest text-text-tertiary">
          <span className="text-text-secondary">{category}</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </span>
        </div>
        <h3 className="font-serif text-heading-sm text-text mt-4 leading-snug">{title}</h3>
        <p className="text-body text-text-secondary mt-3 leading-relaxed">{excerpt}</p>
        <div className="mt-6 flex items-center gap-2 text-body-sm text-text-secondary">
          <User className="h-3.5 w-3.5" />
          {author}
        </div>
        {href && (
          <div className="mt-6 flex items-center gap-1.5 text-caption font-medium tracking-widest uppercase text-brand-500 transition-colors duration-300 group-hover:text-brand-600">
            Baca Selengkapnya <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={cn(
          "group block bg-surface rounded-xl overflow-hidden transition-all duration-500 ease-architectural hover:-translate-y-0.5 hover:shadow-elevation-4",
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
        "group bg-surface rounded-xl overflow-hidden transition-all duration-500 ease-architectural hover:-translate-y-0.5 hover:shadow-elevation-4",
        className,
      )}
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
      transition={cardHoverTransition}
    >
      {shared}
    </motion.div>
  );
}

export { BlogCard };
