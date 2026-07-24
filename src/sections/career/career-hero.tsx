"use client";

import Image from "next/image";
import { Fade } from "@/components/animation/Fade";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import type { MediaImage, SectionBaseProps } from "@/sections/types";

interface CareerHeroProps extends SectionBaseProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: MediaImage;
  cta?: { label: string; href: string };
}

export function CareerHero({ id, className, title, subtitle, description, image, cta }: CareerHeroProps) {
  return (
    <Section id={id} variant="dark" spacing="none" className={cn("relative min-h-screen", className)} aria-label="Career hero banner">
      <Image src={image.src} alt={image.alt} fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-800/50 to-brand-900/90" />
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-4xl px-6 text-center">
          {subtitle && (
            <Fade direction="none">
              <span className="mb-6 block text-body-xs font-medium uppercase tracking-widest text-text-inverse/60">{subtitle}</span>
            </Fade>
          )}
          <Fade direction="up">
            <Heading as="h1" size="3xl" weight="light" className="text-display-sm font-light leading-tight tracking-tight text-text-inverse md:text-display-lg">
              {title}
            </Heading>
          </Fade>
          {description && (
            <Fade direction="up" delay={0.15}>
              <Text as="p" size="lg" color="secondary" className="mx-auto mt-6 max-w-2xl text-text-inverse/80 leading-relaxed">{description}</Text>
            </Fade>
          )}
          {cta && (
            <Fade direction="up" delay={0.3}>
              <div className="mt-10">
                <a
                  href={cta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-base font-medium text-white transition-all duration-300 ease-luxury hover:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                >
                  {cta.label}
                </a>
              </div>
            </Fade>
          )}
        </div>
      </div>
    </Section>
  );
}
