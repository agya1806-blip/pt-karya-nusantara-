import { cn } from "@/lib/utils";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("space-y-10", className)}>
      {events.map((event, index) => (
        <div key={index} className="relative grid grid-cols-[auto_1fr] gap-5">
          <div className="flex flex-col items-center">
            <div className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-border-default bg-surface" />
            {index < events.length - 1 && (
              <div className="mt-1.5 w-px flex-1 bg-border-light" />
            )}
          </div>
          <div className="pb-8 last:pb-0">
            <span className="text-caption tracking-widest text-text-tertiary">{event.year}</span>
            <h3 className="text-heading-sm text-text mt-2 leading-snug">{event.title}</h3>
            <p className="text-body text-text-secondary mt-3 leading-relaxed">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export { Timeline };
