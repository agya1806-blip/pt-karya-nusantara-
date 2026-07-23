"use client";

import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/sections/shared/section-header";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { SectionBaseProps } from "@/sections/types";

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface BenefitsProps extends SectionBaseProps {
  title: string;
  description?: string;
  benefits: Benefit[];
}

export function Benefits({ id, className, title, description, benefits }: BenefitsProps) {
  return (
    <Section id={id} variant="muted" className={className} aria-label="Benefits and perks">
      <SectionHeader title={title} description={description} align="center" />
      <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <StaggerItem key={b.title} className="group border border-border bg-surface p-8 transition-all duration-300 ease-luxury hover:border-text-muted hover:bg-surface-muted">
            <span className="mb-6 block text-3xl" role="img" aria-hidden="true">{b.icon}</span>
            <Heading as="h3" size="md" weight="light">{b.title}</Heading>
            <Text size="sm" color="secondary" className="mt-4 leading-relaxed">{b.description}</Text>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
