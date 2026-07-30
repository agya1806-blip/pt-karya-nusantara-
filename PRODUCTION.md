# Production Readiness

## Build Status
- `npm run build` — passes with 0 errors (Next.js 16.2.11, Turbopack)
- `npm run typecheck` — passes with 0 errors (TypeScript 5.9, strict mode)
- `npm run lint` — type-checks all files (tsc --noEmit)

## Architecture

### Rendering Strategy
| Strategy | Routes |
|---|---|
| Static (SSG) | All marketing, content, blog, portfolio, services listing pages |
| Static with generateStaticParams | `/blog/[slug]` (9 paths), `/portfolio/[slug]` (6 paths), `/services/[slug]` (6 paths) |
| Static assets | `robots.txt`, `sitemap.xml`, `manifest.webmanifest` |

### Route Groups
| Group | Scope | Layout |
|---|---|---|
| `(marketing)` | about, career, contact, faq, gallery, pricing, process, services, team | Navbar + PageWrapper + Footer |
| `(blog)` | blog, blog/[slug] | Navbar + PageWrapper + Footer |
| `(portfolio)` | portfolio, portfolio/[slug] | Navbar (transparent) + PageWrapper + Footer |
| `(content)` | privacy-policy, terms-of-service | Navbar + main + Footer |
| `(search)` | search | Navbar + PageWrapper + Footer |

### Error Boundaries
| Level | File |
|---|---|
| Root | `src/app/error.tsx` with reset |
| Root | `src/app/not-found.tsx` (404) |
| Marketing | `src/app/(marketing)/error.tsx` |
| Blog | `src/app/(blog)/error.tsx` |
| Portfolio | `src/app/(portfolio)/error.tsx` |
| Content | `src/app/(content)/error.tsx` |
| Search | `src/app/(search)/error.tsx` |

### Loading States
| Level | File |
|---|---|
| Root | `src/app/loading.tsx` (spinner) |
| Marketing | `src/app/(marketing)/loading.tsx` |
| Blog | `src/app/(blog)/loading.tsx` |
| Portfolio | `src/app/(portfolio)/loading.tsx` |
| Content | `src/app/(content)/loading.tsx` |
| Search | `src/app/(search)/loading.tsx` |

## Performance Optimizations

### Images
- Formats: AVIF + WebP (via `next.config.ts`)
- Device sizes: 375–2560 (8 breakpoints)
- Image sizes: 16–384 (8 sizes)
- Cache: 1 year immutable for `/images/*`
- Remote patterns: none (local images only)
- Local `<img>` tags used in lightbox components (intentional — Next.js Image doesn't support `object-contain` in certain contexts)

### Fonts
- Preconnect hints for Google Fonts in root layout
- `font-display: optional` via next/font (default)
- CSS variable-based font loading (`--font-sans`, `--font-serif`, `--font-mono`)

### Caching
| Resource | Cache Policy |
|---|---|
| `/images/*` | `public, max-age=31536000, immutable` |
| `/fonts/*` | `public, max-age=31536000, immutable` |
| HTML pages | `public, max-age=0, must-revalidate` (default Next.js) |

### Bundle
- `compiler.removeConsole` excludes `error` and `warn` in production
- reactStrictMode enabled
- All sections are client components (74/84 sections use `"use client"`) — no server component optimization applied to preserve visual behavior

## SEO

### Metadata
- Factory pattern: `createMetadata()` in `src/seo/metadata.ts`
- Template: `%s | PT Karya Nusantara Realty`
- All 17 pages have metadata (static `metadata` export or `generateMetadata`)
- 3 dynamic pages have per-slug `generateMetadata`

### JSON-LD Structured Data
| Schema | Placement | Type |
|---|---|---|
| Organization | Root layout (`src/app/layout.tsx`) | `schema.org/Organization` |
| WebSite | Root layout (`src/app/layout.tsx`) | `schema.org/WebSite` |
| LocalBusiness | Available (not injected in any page) | `schema.org/LocalBusiness` |
| Article | `src/app/(blog)/blog/[slug]/page.tsx` | `schema.org/Article` |
| Product (Project) | `src/app/(portfolio)/portfolio/[slug]/page.tsx` | `schema.org/Product` |
| BreadcrumbList | All dynamic [slug] pages | `schema.org/BreadcrumbList` |

### Technical SEO
| Asset | Route | Notes |
|---|---|---|
| Sitemap | `/sitemap.xml` | 35 URLs (14 static + 21 dynamic) |
| Robots | `/robots.txt` | Disallows `/search` and `/api/` |
| Manifest | `/manifest.webmanifest` | PWA-ready with icons |
| Canonical | Every page | Set via `metadataBase` + `alternates.canonical` |
| Open Graph | Every page | `og:image` at 1200×630 |
| Twitter Card | Every page | `summary_large_image` |

## Security

### HTTP Headers
| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | Tight CSP (self, inline styles, Supabase images) |
| `X-DNS-Prefetch-Control` | `on` |
| `poweredByHeader` | Removed |

### CSP
```
default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.supabase.co; font-src 'self' data:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'
```

## Accessibility
- Skip-to-content link in root layout (visually hidden, visible on focus)
- `id="main-content"` on `<main>` element in all layouts
- `role="alert"` on error pages
- `role="status"` on loading states
- `aria-label` on navigation, lightbox, and interactive elements
- `aria-current="page"` in Breadcrumb component
- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<ol>`, `<button>`

## Environment Variables
| Variable | Required | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `http://localhost:3000` |
| `NEXT_PUBLIC_COMPANY_PHONE` | Yes | — |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Yes | — |
| `NEXT_PUBLIC_COMPANY_ADDRESS` | Yes | — |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | Yes | — |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | Yes | — |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | — |
| `NEXT_PUBLIC_SUPABASE_URL` | No | — |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | — |

See `.env.example` for a template.

## Deployment

### Build Commands
```bash
npm ci              # Clean install (production)
npm run build       # Build (Next.js 16)
npm run typecheck   # Full TypeScript check
```

### Vercel (Recommended)
1. Connect Git repository
2. Set `NODE_VERSION` to `22.x`
3. Add environment variables from `.env.example`
4. Deploy — zero-config for Next.js

### Output
- Static SSG pages are pre-built at deploy time
- Dynamic pages use `generateStaticParams` — all known paths pre-rendered
- Middleware runs at edge for request processing

## Maintenance

### Updating Content
| Content | Location |
|---|---|
| Projects | `src/app/(portfolio)/portfolio/[slug]/page.tsx` |
| Services | `src/app/(marketing)/services/[slug]/page.tsx` |
| Blog articles | `src/app/(blog)/blog/[slug]/page.tsx` |
| Site config | `src/config/site.ts` |
| Navigation | `siteConfig.navigation` in `src/config/site.ts` |
| Footer | `siteConfig.footer` in `src/config/site.ts` |

### Adding a New Page
1. Create route directory under `src/app/(marketing)/` or appropriate group
2. Export `metadata` or `generateMetadata`
3. Add route to `src/app/sitemap.ts`
4. If dynamic, add `generateStaticParams`

## Known Limitations

### To Address Before Full Launch
1. `src/policies/` directory is empty — candidate for removal
2. No automated visual regression tests
3. No Prettier config (`.prettierrc`) — uses default settings
4. Dark mode partially implemented: types, provider, CSS variables exist but root layout hardcodes `data-theme="light"` — causes flash before hydration
5. 174 client components (74 sections + 52 component files use `"use client"`) — could be reduced but requires careful refactoring
6. No Content-Security-Policy report-uri for monitoring violations
7. `tsconfig.json` now excludes only `node_modules` — full type coverage enabled

### Lighthouse Targets
| Metric | Target | Status |
|---|---|---|
| Performance | ≥ 98 | — (test in production) |
| Accessibility | 100 | — (test in production) |
| Best Practices | 100 | — (test in production) |
| SEO | 100 | — (test in production) |
