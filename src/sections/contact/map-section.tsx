"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";

interface MapSectionProps {
  address: string;
  mapsUrl: string;
  className?: string;
}

export function MapSection({ address, mapsUrl, className }: MapSectionProps) {
  return (
    <section className={cn("bg-surface-secondary py-24", className)}>
      <div className="container-site">
        <Fade direction="up">
          <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-surface">
            <iframe
              src={mapsUrl}
              title={`Map showing ${address}`}
              className="h-full w-full grayscale transition-all duration-300 hover:grayscale-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-body-sm text-text-secondary text-center">
            {address}
          </p>
        </Fade>
      </div>
    </section>
  );
}
