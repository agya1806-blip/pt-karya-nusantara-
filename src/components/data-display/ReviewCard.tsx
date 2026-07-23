import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface ReviewCardProps {
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  className?: string;
}

function ReviewCard({ content, author, role, company, avatar, className }: ReviewCardProps) {
  return (
    <div className={cn("bg-surface rounded-2xl p-8", className)}>
      <Quote className="h-8 w-8 text-brand-500/30 mb-4" />
      <blockquote className="text-body text-text-secondary leading-relaxed">&ldquo;{content}&rdquo;</blockquote>
      <div className="mt-6 flex items-center gap-4">
        <img src={avatar} alt={author} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <cite className="text-body-sm text-text not-italic font-medium">{author}</cite>
          <p className="text-caption text-text-muted mt-0.5">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}

export { ReviewCard };
