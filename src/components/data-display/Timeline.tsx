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
    <div className={cn("space-y-8", className)}>
      {events.map((event, index) => (
        <div key={index} className="relative grid grid-cols-[auto_1fr] gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 shrink-0 rounded-full border-2 border-brand-500 bg-surface" />
            {index < events.length - 1 && (
              <div className="mt-1 w-0.5 flex-1 bg-brand-500/30" />
            )}
          </div>
          <div className="pb-8 last:pb-0">
            <span className="text-caption tracking-widest text-brand-400">{event.year}</span>
            <h3 className="text-heading-sm text-text mt-1">{event.title}</h3>
            <p className="text-body text-text-secondary mt-2 leading-relaxed">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export { Timeline };
