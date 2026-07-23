"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/shared/section-header";
import { Fade } from "@/components/animation/Fade";

interface LogoCloudProps {
  label?: string;
  title: string;
  description?: string;
  logos: { name: string; logo: string }[];
  className?: string;
}

export function LogoCloud({
  label,
  title,
  description,
  logos,
  className,
}: LogoCloudProps) {
  return (
    <section className={cn("bg-surface-muted py-24", className)}>
      <div className="container-site">
        <SectionHeader
          label={label}
          title={title}
          description={description}
        />
        <Fade direction="up" className="mt-16">
          <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center p-6"
              >
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="max-h-12 w-auto object-contain opacity-50 grayscale transition-all duration-300 ease-luxury hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
