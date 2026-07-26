"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { durations, easings } from "@/lib/animation";

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface MediaGalleryCardProps {
  image: GalleryImage;
  onClick?: () => void;
  className?: string;
}

export function MediaGalleryCard({ image, onClick, className }: MediaGalleryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn("group relative aspect-[4/3] w-full overflow-hidden rounded-lg", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: durations.fast, ease: easings.easeOut }}
      type="button"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-300 ease-architectural group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </motion.button>
  );
}

interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  onImageClick?: (index: number) => void;
  className?: string;
}

const gridClasses: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export function Gallery({
  images,
  columns = 3,
  onImageClick,
  className,
}: GalleryProps) {
  return (
    <div className={cn("grid gap-4", gridClasses[columns], className)}>
      {images.map((image, i) => (
        <MediaGalleryCard
          key={i}
          image={image}
          onClick={onImageClick ? () => onImageClick(i) : undefined}
        />
      ))}
    </div>
  );
}
