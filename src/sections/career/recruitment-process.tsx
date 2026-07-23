"use client";

import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/sections/shared/section-header";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import type { ProcessStep, SectionBaseProps } from "@/sections/types";

interface RecruitmentProcessProps extends SectionBaseProps {
  title: string;
  description?: string;
  steps: ProcessStep[];
}

export function RecruitmentProcess({ id, className, title, description, steps }: RecruitmentProcessProps) {
  return (
    <Section id={id} className={className} aria-label="Recruitment process">
      <SectionHeader title={title} description={description} />
      <Stagger className="relative mt-16">
        {steps.map((s, i) => (
          <StaggerItem key={s.title}>
            <div
              className={cn(
                "relative grid gap-4 pb-12 md:grid-cols-12 md:pb-16",
                i < steps.length - 1 && "border-l border-border pl-8 md:border-l-0 md:pl-0",
              )}
            >
              <div className="relative md:col-span-3 md:text-right">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-body-sm font-medium text-text md:absolute md:-left-5 md:top-0",
                    i < steps.length - 1 && "md:border-text-muted",
                  )}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </div>
              <div className="md:col-span-4">
                <Heading as="h3" size="md" weight="light">{s.title}</Heading>
              </div>
              <div className="md:col-span-5">
                <Text size="sm" color="secondary" className="leading-relaxed">{s.description}</Text>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
