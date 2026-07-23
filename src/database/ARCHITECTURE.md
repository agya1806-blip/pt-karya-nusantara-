# PT Karya Nusantara Realty — Backend Architecture

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    Next.js 15 Application                     │
├──────────────────────────────────────────────────────────────┤
│  app/           sections/        components/                  │
│  (Chat 4)       (Chat 6)         (Chat 2)                    │
├──────────────────────────────────────────────────────────────┤
│                    Server Actions (src/server-actions/)        │
│                    API Routes (src/api/)                       │
├──────────────────────────────────────────────────────────────┤
│                    Repository Layer (src/repositories/)        │
│                    Validators (src/validators/)                │
│                    Schemas (src/schemas/)                      │
├──────────────────────────────────────────────────────────────┤
│                    Supabase Client                             │
├──────────────────────────────────────────────────────────────┤
│                    PostgreSQL Database                         │
│                    Row-Level Security                          │
│                    Supabase Storage                            │
└──────────────────────────────────────────────────────────────┘
```

## Ownership

| Engineer | Directories |
|----------|-------------|
| **Chat 5 (You)** | `supabase/`, `database/`, `repositories/`, `schemas/`, `validators/`, `server-actions/`, `api/`, `cms/`, `middleware/`, `policies/`, `storage/` |

## Database: 32 Tables (45+ entities)

### Core
- `roles`, `permissions`, `role_permissions`, `user_roles`, `profiles`

### Content
- `projects`, `project_categories`, `project_images`, `project_videos`
- `services`, `service_categories`
- `blog_posts`, `blog_categories`, `authors`
- `tags`, `taggables`

### Business
- `testimonials`, `clients`
- `faq`, `faq_categories`
- `team_members`
- `awards`, `partners`
- `gallery`, `gallery_categories`

### Media
- `media_library`, `media_folders`

### Navigation
- `navigation`, `navigation_items`, `footer`

### Settings
- `site_settings`, `seo_metadata`, `redirects`

### Forms & Leads
- `contact_messages`, `consultation_requests`, `leads`
- `newsletter_subscribers`
- `job_positions`, `job_categories`, `career_applications`
- `bookings`

### System
- `notifications`, `activity_logs`, `audit_logs`

## Entity Relationships (ERD)

```
auth.users
  └── profiles (1:1)
  └── user_roles (1:N) ──── roles (N:M)
                                └── role_permissions ──── permissions

projects
  ├── project_categories (N:1)
  ├── project_images (1:N)
  ├── project_videos (1:N)
  ├── awards (1:N)
  ├── testimonials (N:1)
  └── gallery (1:N)

blog_posts
  ├── blog_categories (N:1)
  └── authors (N:1)

services
  └── service_categories (N:1)

media_library
  └── media_folders (N:1)

navigation
  └── navigation_items (1:N, self-referencing)

tags ─── taggables (polymorphic N:M)
```

## Repository Pattern

```
BaseRepository<T>
  ├── findById(id)
  ├── list(params)
  ├── create(values)
  ├── update(id, values)
  ├── delete(id, hardDelete?)
  ├── publish(id)
  ├── archive(id)
  ├── restore(id)
  └── count(field?, value?)
  │
  ├── ProjectRepository (extends) — findBySlug, getFeatured, getByCategory, addImage, getRelated
  └── BlogRepository (extends) — findBySlug, getFeatured, getByAuthor
```

## Permission Matrix

| Module | Owner | Admin | Editor | Marketing | Content Writer | Architect | Guest |
|--------|-------|-------|--------|-----------|---------------|-----------|-------|
| Dashboard | CRUD | CRUD | R | R | R | R | — |
| Projects | CRUD | CRUD | CRUD | — | CR (no publish) | CRUD | — |
| Blog | CRUD | CRUD | CRUD | — | CR (no publish) | — | — |
| Services | CRUD | CRUD | CRUD | — | CR (no publish) | CRUD | — |
| Media | CRUD | CRUD | CRUD | CRUD | CRUD | CRUD | — |
| Contacts | CRUD | CRUD | — | CRUD | — | — | — |
| Bookings | CRUD | CRUD | — | CRUD | — | — | — |
| Newsletter | CRUD | CRUD | — | CRUD | — | — | — |
| Career | CRUD | CRUD | — | CRUD | — | — | — |
| Team | CRUD | CRUD | CRUD | — | CR (no publish) | — | — |
| SEO | CRUD | CRUD | RU | — | RU | — | — |
| Settings | CRUD | CRUD | — | — | — | — | — |
| Users | CRUD | CRUD | — | — | — | — | — |
| Roles | CRUD | CRUD | — | — | — | — | — |
| Analytics | R | R | — | R | — | — | — |

## Storage Strategy

```
Supabase Storage
├── public/          (10MB limit, images-only)
│   ├── projects/{id}/{year}/{month}/
│   ├── blog/{id}/{year}/{month}/
│   ├── gallery/{year}/{month}/
│   ├── team/
│   └── profiles/
├── private/         (50MB limit, any document type)
│   └── documents/
└── media/           (500MB limit, raw media files)
    ├── videos/
    └── archives/
```

## API Strategy

All entities expose RESTful endpoints:
- `GET /api/{entity}` — List (paginated, filterable, sortable)
- `GET /api/{entity}/[id]` — Detail
- `POST /api/{entity}` — Create
- `PATCH /api/{entity}/[id]` — Update
- `DELETE /api/{entity}/[id]` — Soft delete

Server Actions preferred over API routes for form submissions and CMS operations.

## Validation Strategy

```
src/validators/
├── common.ts         — Shared Zod schemas (slug, status, pagination, etc.)
├── entities.ts       — Entity schemas (project, blog, service, testimonial, etc.)
├── forms.ts          — Form submission schemas (contact, booking, newsletter, etc.)
└── index.ts          — Barrel exports
```

All Zod schemas used by both Server Actions and API routes for validation.

## CMS Module Structure

```
cms/
├── _components/layout.tsx    — Sidebar layout with navigation
├── dashboard/page.tsx        — Analytics dashboard
├── projects/page.tsx         — Project list table
├── blog/page.tsx             — Blog post list
├── media/page.tsx            — Media library (grid/list view)
├── forms/                    — Contact leads, bookings
├── team/                     — Team management
├── settings/                 — Site settings
├── users/                    — User management
├── analytics/                — Analytics dashboards
└── notifications/            — Notification center
```

## Row-Level Security

RLS enforced on all 32 tables. Key policies:

- **Public tables**: Read published content without auth
- **Contact/Booking**: Public insert, staff-only read/update
- **Content tables**: Role-based CRUD via `has_permission()` function
- **Admin tables**: Owner/Admin only (settings, users, roles, logs)
- **Storage buckets**: Public read, authenticated upload, admin private access

## Supabase Client Setup

```typescript
// Required environment variables
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

// Database migration
supabase migration up
```

## Future-Proofing

- **Polymorphic tags** via `taggables` table — supports future content types
- **JSONB content fields** — supports flexible page builder content
- **Lead unification** — all form submissions create unified `leads` record
- **Activity + Audit logging** — complete traceability
- **Notification triggers** — database-level webhook-ready
- **Soft delete** with `deleted_at` — recoverable data
