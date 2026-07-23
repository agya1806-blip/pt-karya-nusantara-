import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";

interface GalleryCardProps {
  image: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}

function GalleryCard({ image, alt, onClick, className }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-2xl bg-surface-muted",
        className,
      )}
    >
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 ease-luxury group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 ease-luxury group-hover:opacity-100">
        <Maximize2 className="h-8 w-8 text-text-inverse" />
      </div>
    </button>
  );
}

export { GalleryCard };
