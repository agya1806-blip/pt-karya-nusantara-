"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import type { TimelineEvent } from "@/sections/types";

interface HistoryTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function HistoryTimeline({ events, className }: HistoryTimelineProps) {
  return (
    <section className={cn("bg-surface py-24 lg:py-28", className)}>
      <div className="container-site">
        <div className="relative mt-20">
          <div className="absolute left-4 top-0 h-full w-px bg-border-light md:left-1/2 md:-translate-x-px" />
          <div className="space-y-16">
            {events.map((event, i) => (
              <Fade key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                <div
                  className={cn(
                    "relative pl-12 md:w-1/2 md:pl-0",
                    i % 2 === 0 ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16",
                  )}
                >
                  <div
                    className={cn(
                      "absolute left-4 top-1 h-3 w-3 border-2 border-brand-500 bg-surface md:left-auto",
                      i % 2 === 0 ? "md:right-[-6.5px]" : "md:left-[-6.5px]",
                    )}
                  />
                  <span className="text-overline tracking-widest text-brand-500">
                    {event.year}
                  </span>
                  <h3 className="mt-2 font-serif text-heading-sm font-medium text-text-primary">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-body text-text-secondary leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
