"use client";

import { Stagger, StaggerItem } from "@/components/animation/Stagger";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/sections/shared/section-header";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { SectionBaseProps } from "@/sections/types";

interface CultureValue {
  title: string;
  description: string;
}

interface CultureValuesProps extends SectionBaseProps {
  title: string;
  description?: string;
  values: CultureValue[];
}

export function CultureValues({ id, className, title, description, values }: CultureValuesProps) {
  return (
    <Section id={id} variant="muted" className={className} aria-label="Company culture and values">
      <SectionHeader title={title} description={description} align="center" />
      <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {values.map((v, i) => (
          <StaggerItem key={v.title} className="border border-border bg-surface p-8 transition-all duration-300 ease-luxury hover:border-text-muted hover:bg-surface-muted">
            <span className="text-display-sm font-light text-text-muted/40" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Heading as="h3" size="md" weight="light" className="mt-6">{v.title}</Heading>
            <Text size="sm" color="secondary" className="mt-4 leading-relaxed">{v.description}</Text>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
