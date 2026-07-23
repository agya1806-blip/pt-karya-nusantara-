"use client";

import { Fade } from "@/components/animation/Fade";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/sections/shared/section-header";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/feedback/Badge";
import { cn } from "@/lib/utils";
import type { SectionBaseProps } from "@/sections/types";

type JobType = "Full-time" | "Part-time" | "Contract";

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  description: string;
  postedDate: string;
}

interface OpenPositionsProps extends SectionBaseProps {
  title: string;
  description?: string;
  positions: Position[];
}

const badgeVariant: Record<JobType, "default" | "success" | "warning"> = {
  "Full-time": "success",
  "Part-time": "warning",
  "Contract": "default",
};

export function OpenPositions({ id, className, title, description, positions }: OpenPositionsProps) {
  return (
    <Section id={id} className={className} aria-label="Open positions">
      <SectionHeader title={title} description={description} />
      <div className="mt-16 space-y-4" role="list">
        {positions.map((p, i) => (
          <Fade key={p.id} direction="up" delay={i * 0.05}>
            <div
              role="listitem"
              className="group cursor-pointer border border-border bg-surface p-6 transition-all duration-300 ease-luxury hover:border-text-muted hover:bg-surface-muted md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <Heading as="h3" size="md" weight="light">{p.title}</Heading>
                    <Badge variant={badgeVariant[p.type]} size="sm">{p.type}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-body-sm text-text-secondary">
                    <span>{p.department}</span>
                    <span>{p.location}</span>
                    <span>Posted {p.postedDate}</span>
                  </div>
                  <Text size="sm" color="secondary" className="mt-4 leading-relaxed line-clamp-2">{p.description}</Text>
                </div>
                <span className="hidden shrink-0 text-body-sm font-medium text-text-muted transition-colors duration-300 group-hover:text-text md:block" aria-hidden="true">
                  View role &rarr;
                </span>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </Section>
  );
}
