# Architecture Documentation

## Overview

Enterprise-grade project foundation for PT Karya Nusantara Realty — a luxury architecture firm digital platform. Built with Next.js 15, React 19, TypeScript Strict, Tailwind CSS v4.

## Folder Ownership

### Foundation Engineer (You)
| Folder | Responsibility |
|--------|---------------|
| `app/` | Root layout, metadata, error/loading/not-found pages, robots/sitemap/manifest |
| `config/` | Site configuration, environment config |
| `constants/` | Design constants, breakpoints, navigation, metadata, theme |
| `hooks/` | Custom React hooks (scroll, media query, reduced motion, etc.) |
| `lib/` | Core utilities (cn, fonts) |
| `providers/` | Theme provider, motion provider, root provider composition |
| `styles/` | Global CSS with Tailwind v4 `@theme` design tokens |
| `types/` | TypeScript interfaces and types |
| `utils/` | Re-exports of utility functions |
| `motions/` | Framer Motion variants, transitions, animation presets |
| `seo/` | Metadata factory, Schema.org JSON-LD, SEO utilities |

### UI Engineer (Do Not Touch)
- `components/` — Reusable UI components
- `sections/` — Page-level sections

### Page Engineer (Do Not Touch)
- `app/(marketing)/` — Marketing pages
- `app/(portfolio)/` — Portfolio pages
- `app/(blog)/` — Blog pages
- `app/(content)/` — Content pages
- `app/(search)/` — Search page

## Architecture Decisions

### 1. Design Tokens via CSS Custom Properties
All design tokens (colors, typography, spacing, shadows, radius, z-index, opacity, transitions) are defined as CSS custom properties in `styles/globals.css` using Tailwind v4's `@theme` directive. This ensures:
- Zero hardcoded values in components
- Single source of truth
- Dark mode variant via `data-theme` attribute
- Reduced motion variant via `data-reduced-motion` attribute

### 2. Dark Mode via Attribute Strategy
Theme switching uses the `data-theme` attribute on `<html>`. No CSS-in-JS runtime needed. Light/dark color schemes are defined entirely in CSS using `@variant dark`. The `ThemeProvider` persists preference to `localStorage`.

### 3. Motion Architecture
Framer Motion variants and transitions are centralized in `motions/`:
- `variants.ts` — Reusable animation presets (fadeIn, fadeInUp, scaleIn, stagger, etc.)
- `transitions.ts` — Transition presets (default, fast, slow, spring variants)
- `animations.ts` — Higher-level animation creators and interaction presets (hover, tap, image zoom, clip reveal)
- Reduced motion context is respected globally via the MotionProvider

### 4. SEO Architecture
Centralized metadata factory in `seo/`:
- `metadata.ts` — `createMetadata()` generates complete Next.js Metadata object with OpenGraph, Twitter, robots
- `schema.ts` — Factory functions for Organization, Website, LocalBusiness JSON-LD
- `json-ld.tsx` — `<JsonLdScript>` component for injecting structured data

### 5. Provider Architecture
Two client-side providers composed in `Providers.tsx`:
- `ThemeProvider` — Dark/light mode with localStorage persistence
- `MotionProvider` — Lenis smooth scroll + reduced motion detection
- Providers wrap the root layout, enabling all pages to consume theme/motion context

### 6. TypeScript Strictness
- `strict: true` with all strict flags enabled
- `noUncheckedIndexedAccess: true` for safe object access
- `noUnusedLocals`/`noUnusedParameters` delegated to ESLint (allows underscore prefix)
- Absolute imports via `@/` alias

### 7. Environment Architecture
Singleton `EnvironmentConfig` class in `config/env.ts` provides typed access to all environment variables with sensible defaults.

## Design Token Reference

### Colors
- `brand-*` — Warm architectural brown tones (luxury feel)
- `neutral-*` — Cool architectural grays
- `surface-*` — Background surfaces
- `text-*` — Typography colors
- `border-*` — Border colors
- `ring` — Focus ring

### Typography
- `display-*` — Large display sizes (xl: 4.5rem, lg: 3.75rem, base: 3rem)
- `heading-*` — Heading sizes (xl: 2.25rem through sm: 1.25rem)
- `body-*` — Body text (xl: 1.25rem through sm: 0.875rem)
- `caption` — Small text (0.75rem)
- `overline` — Uppercase label (0.6875rem)
- Fonts: Inter (sans), Playfair Display (serif), JetBrains Mono (mono)

### Shadows
- `elevation-1` through `elevation-5` — Subtle elevation shadows for a premium feel

### Spacing
- Full scale from `0` to `96`

### Z-Index
- Named tokens: `below`, `dropdown`, `sticky`, `navbar`, `overlay`, `modal`, `toast`, `tooltip`

## Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Strict CSP headers, image optimization, security |
| `tsconfig.json` | Strict TypeScript, `@/` alias |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin |
| `.eslintrc.json` | ESLint strict rules + import ordering |
| `.prettierrc` | Code formatting |
| `.env.example` | Environment variable template |

## Conventions

1. **Design tokens only** — No magic numbers, inline colors, or inline spacing
2. **Server Components by default** — Only add `"use client"` when necessary
3. **Accessibility** — Semantic HTML, focus-visible, aria labels, reduced motion
4. **Imports** — Always use `@/` alias, never relative imports outside current folder
5. **No comments on obvious code** — Only explain complex logic
