"use client";

import { cn } from "@/lib/utils";

interface LogoItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LogoCloudProps {
  title?: string;
  logos: LogoItem[];
  variant?: "grid" | "scrolling";
  className?: string;
}

export function LogoCloud({
  title,
  logos,
  variant = "grid",
  className,
}: LogoCloudProps) {
  if (variant === "scrolling") {
    return (
      <div className={cn("overflow-hidden py-12", className)}>
        {title && (
          <p className="mb-10 text-center text-caption tracking-widest uppercase text-text-tertiary">
            {title}
          </p>
        )}
        <div className="flex animate-scroll gap-20">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex flex-shrink-0 items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-7 w-auto opacity-30 grayscale transition-all duration-500 ease-architectural hover:opacity-70 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("py-16", className)}>
      {title && (
        <p className="mb-12 text-center text-caption tracking-widest uppercase text-text-tertiary">
          {title}
        </p>
      )}
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-16 gap-y-10">
        {logos.map((logo) => (
          <div key={logo.alt} className="flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-7 w-auto opacity-30 grayscale transition-all duration-500 ease-architectural hover:opacity-70 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
