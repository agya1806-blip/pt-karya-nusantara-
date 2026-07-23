import type { ElementType, ComponentPropsWithoutRef } from "react";

export type PolymorphicAs<C extends ElementType> = {
  as?: C;
};

export type PolymorphicProps<C extends ElementType, P = Record<string, never>> =
  PolymorphicAs<C> & Omit<ComponentPropsWithoutRef<C>, keyof PolymorphicAs<C> | keyof P> & P;

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type DisplaySize = "sm" | "md" | "lg" | "xl" | "2xl";
export type TextElement = "p" | "span" | "div" | "label" | "li";
export type CaptionElement = "span" | "p" | "small" | "div";
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold";
export type Tracking = "tight" | "normal" | "wide" | "widest";
export type ListStyle = "disc" | "decimal" | "none";
export type QuoteVariant = "default" | "featured";
export type TextColor = "default" | "secondary" | "muted";
export type ParagraphSize = "md" | "lg" | "xl";
export type CaptionSize = "xs" | "sm";
export type LabelSize = "sm" | "md";