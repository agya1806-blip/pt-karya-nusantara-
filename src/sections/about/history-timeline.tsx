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
    <section className={cn("bg-surface py-24", className)}>
      <div className="container-site">
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-border-light md:left-1/2 md:-translate-x-px" />
          <div className="space-y-16">
            {events.map((event, i) => (
              <Fade key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                <div
                  className={cn(
                    "relative pl-12 md:w-1/2 md:pl-0",
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12",
                  )}
                >
                  <div
                    className={cn(
                      "absolute left-4 top-1 h-3 w-3 rounded-full border-2 border-brand-500 bg-surface md:left-auto",
                      i % 2 === 0 ? "md:right-[-6.5px]" : "md:left-[-6.5px]",
                    )}
                  />
                  <span className="text-caption font-semibold tracking-widest text-brand-500 uppercase">
                    {event.year}
                  </span>
                  <h3 className="mt-1 text-heading-sm font-medium text-text-primary">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-body text-text-secondary leading-relaxed">
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
