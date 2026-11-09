# Design — portafolio-rebuild

## 1. Architecture Overview

Four specs compose into a coherent rebuild by separating concerns along the data flow:

- **Spec 01** defines the canonical data shapes (`showcase[]`, `trajectory[]`, `evidenceStack[]`) — single source of truth in `src/types/site.ts` plus Astro content collection Zod schemas.
- **Spec 02** consumes those shapes via dynamic routing (`[slug].astro`) and content collections for long-form bodies.
- **Spec 03** isolates the honesty signal — one `Badge.astro` component is the only place status→color/status→label/status→icon mapping lives.
- **Spec 04** is independent hygiene that untracks build artifacts and documents rules.

```
+----------------------------+
|  src/data/site.json        |   <- static curated entries (showcase, trajectory, evidenceStack)
|  src/content/projects/*.md |   <- long-form case studies (optional per slug)
|  src/content/blog/*.md     |   <- short posts
+-------------+--------------+
              |
              v (Zod-validated at build)
+----------------------------+
|   src/types/site.ts        |   <- shared TypeScript contracts
+-------------+--------------+
              |
              v
+---------------------+----------------+----------------+
|  ShowcaseCard.astro | EvidenceStackCard | ProjectDetail |
|  Badge.astro (Req03)                   | Badge.astro    |
+---------------------+----------------+----------------+
              |
              v
+----------------------------------------------+
|  src/pages/index.astro (es)                  |
|  src/pages/en/index.astro (en)               |
|  src/pages/projects/[slug].astro             |
|  src/pages/en/projects/[slug].astro          |
|  src/pages/blog/index.astro + [slug].astro   |
+----------------------------------------------+
```

i18n strategy: keep Astro's built-in `defaultLocale: 'es'` + `prefixDefaultLocale: false` setup. `src/pages/en/` mirrors `src/pages/` for EN. The `[slug].astro` route exists under both locales and reads `site.showcase[]` (locale-agnostic); only copy wrappers differ.

## 2. Component Tree

**Current**
```
src/components/
  Cta.astro
  Ecosystem.astro      -> reads site.ecosystem[]
  Footer.astro
  Hero.astro           -> renders inline verification badge
  Icon.astro           -> SVG sprite (8 icons)
  Navbar.astro
  Projects.astro       -> reads site.builds[]
  Trajectory.astro     -> reads site.trajectory[]
```

**After Spec 01–04**
```
src/components/
  Badge.astro          NEW — single source of status->color/label/icon
  Cta.astro            UNCHANGED
  Ecosystem.astro      DELETED — replaced by EvidenceStack section inside index/Stack.astro
  EvidenceStackCard.astro  NEW — replaces ecosystem card; renders status badge
  Footer.astro         UNCHANGED
  Hero.astro           MODIFIED — uses Badge component, drops inline certification card markup
  Icon.astro           EXTENDED — add `check`, `lock`, `flask`, `archive` icons
  Navbar.astro         UNCHANGED
  Projects.astro       RENAMED to Showcase.astro — reads site.showcase[]
  ShowcaseCard.astro   NEW — replaces generic build card
  Stack.astro          NEW (section) — composes EvidenceStackCard grid
  Trajectory.astro     MODIFIED — reads full TrajectoryRecord fields (role, dates, scope, outcomes)
  ProjectDetail.astro  NEW — long-form detail layout consumed by [slug].astro
  BlogCard.astro       NEW — used by /blog index

src/pages/
  index.astro          (es, default)
  en/index.astro
  projects/[slug].astro        NEW — es dynamic route
  en/projects/[slug].astro     NEW — en dynamic route
  blog/index.astro             NEW
  en/blog/index.astro          NEW
  blog/[slug].astro            NEW
  en/blog/[slug].astro         NEW
```

Ownership rule (REQ-01-7, REQ-03-6): any component referencing `showcase`, `trajectory`, `evidenceStack`, or a badge `status` MUST import the matching type from `src/types/site.ts`. No inline redeclarations.

## 3. Data Model

### 3.1 TypeScript Types — `src/types/site.ts`

```typescript
// Status enum — shared by Spec 01 showcase, Spec 03 badge, Spec 02 collection schema.
export type BadgeStatus = 'verified' | 'anonymized' | 'learning' | 'archived';

// ShowcaseTypeEnum — REQ-01-1
export type ShowcaseType =
  | 'case-study-anonymized'
  | 'case-study-public'
  | 'live-demo'
  | 'learning-roadmap';

// Single canonical enum for showcase entries (Spec 01 REQ-01-1). Reused as
// Zod enum input in src/content/config.ts.
export const SHOWCASE_TYPES = [
  'case-study-anonymized',
  'case-study-public',
  'live-demo',
  'learning-roadmap'
] as const satisfies readonly ShowcaseType[];

export const BADGE_STATUSES = [
  'verified',
  'anonymized',
  'learning',
  'archived'
] as const satisfies readonly BadgeStatus[];

// Metric for case studies (REQ-01-1 metrics[])
export interface ShowcaseMetric {
  label: string;   // i18n key path, e.g. "showcase.metrics.uptime"
  value: string;   // raw string — keep generic for anonymized entries (REQ-01-4)
}

// Links block (REQ-01-1 links)
export interface ShowcaseLinks {
  repoUrl?: string;   // MUST be omitted for case-study-anonymized (REQ-01-1 scenario)
  demoUrl?: string;
  postUrl?: string;   // internal /blog/<slug>
}

// Canonical showcase entry — REQ-01-1
export interface Showcase {
  id: string;
  slug: string;             // unique, used as route param + content collection filename
  title: string;
  type: ShowcaseType;
  heroImage: string;        // path under /public, fallback handled in section 8
  tags: string[];
  status: BadgeStatus;      // reused enum from Spec 03
  problem: string;
  decision: string;
  tradeoff: string;
  outcome: string;
  metrics: ShowcaseMetric[];
  links: ShowcaseLinks;
  order: number;            // learning-roadmap entries MUST have the highest order (REQ-01-6)
}

// Trajectory entry — REQ-01-2
export interface TrajectoryRecord {
  company: string;
  role: string;
  startDate: string;        // ISO date
  endDate?: string;         // absent when current === true (REQ-01-2 scenario)
  current?: boolean;        // required true when endDate is absent
  scope: string;            // 1-2 sentence framing
  keyOutcomes: string[];    // 3-5 measurable bullets
  stack: string[];          // tech tags
  order: number;
}

// Evidence stack entry — REQ-01-3 (replaces ecosystem[])
export interface EvidenceStackItem {
  id: string;                       // 'core-backend', 'erp', 'cloud', 'ai' etc.
  label: string;                    // i18n key path
  status: 'verified' | 'partial' | 'learning';
  repos: string[];                  // public GitHub repo names (must resolve at REQ-01-3 scenario)
  description: string;              // i18n key path
  years: number;                    // years of professional use
  order: number;
}

// Stats entry (existing — Hero)
export interface StatEntry {
  value: string;
  key: 'years' | 'deployments' | 'level';
  accent?: boolean;
}

// Site root — matches src/data/site.json after rename
export interface SiteData {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  nav: { id: string; key: string }[];
  stats: StatEntry[];
  showcase: Showcase[];          // REPLACES builds (REQ-01-1)
  trajectory: TrajectoryRecord[]; // REQ-01-2
  evidenceStack: EvidenceStackItem[]; // REPLACES ecosystem (REQ-01-3)
}
```

### 3.2 Content Collection Schemas — `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';
import { BADGE_STATUSES, SHOWCASE_TYPES } from '../types/site';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    type: z.enum(SHOWCASE_TYPES),
    status: z.enum(BADGE_STATUSES),
    heroImage: z.string().optional(),  // falls back to site.showcase entry
    tags: z.array(z.string()).default([]),
    problem: z.string().optional(),    // body takes precedence (REQ-02-2 scenario)
    decision: z.string().optional(),
    tradeoff: z.string().optional(),
    outcome: z.string().optional(),
    metrics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    links: z
      .object({
        repoUrl: z.string().url().optional(),
        demoUrl: z.string().url().optional(),
        postUrl: z.string().optional()
      })
      .default({}),
    order: z.number().int(),
    pubDate: z.coerce.date()
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['es', 'en'])
  })
});

export const collections = { projects, blog };
```

### 3.3 site.json Shape (post-rename)

`builds[]` is REMOVED; `ecosystem[]` is REMOVED. `showcase[]` and `evidenceStack[]` are added. `trajectory[]` is extended.

```json
{
  "name": "Armando Rojas",
  "email": "armando.develop@gmail.com",
  "linkedin": "https://linkedin.com/in/rojasarmando",
  "github": "https://github.com/rojasarmando",
  "nav": [
    { "id": "about", "key": "about" },
    { "id": "stack", "key": "stack" },
    { "id": "experience", "key": "experience" },
    { "id": "showcase", "key": "showcase" },
    { "id": "blog", "key": "blog" }
  ],
  "stats": [
    { "value": "6+", "key": "years" },
    { "value": "30+", "key": "deployments" },
    { "value": "Senior", "key": "level", "accent": true }
  ],
  "showcase": [
    {
      "id": "sc-erp-pos",
      "slug": "odoo-pos-19",
      "title": "Odoo POS 19 Multi-Store Sync",
      "type": "case-study-anonymized",
      "heroImage": "/images/projects/odoo-pos-19.svg",
      "tags": ["Odoo 19", "Python", "PostgreSQL"],
      "status": "anonymized",
      "problem": "Retail chain needed cross-store catalog and stock sync without downtime during business hours.",
      "decision": "Event-driven outbox pattern with idempotent consumers and a per-tenant channel per store.",
      "tradeoff": "Higher operational complexity vs. nightly cron — accepted for stronger consistency guarantees.",
      "outcome": "Cut catalog drift to zero across 12 stores; sync latency p95 below 800ms.",
      "metrics": [
        { "label": "showcase.metrics.stores", "value": "12" },
        { "label": "showcase.metrics.p95Latency", "value": "800ms" }
      ],
      "links": { "postUrl": "/blog/odoo-pos-outbox-pattern" },
      "order": 1
    },
    {
      "id": "sc-fiscal",
      "slug": "fiscal-bridge",
      "title": "ERP ↔ Fiscal API Bridge",
      "type": "case-study-anonymized",
      "heroImage": "/images/projects/fiscal-bridge.svg",
      "tags": ["Odoo", "REST", "Compliance"],
      "status": "anonymized",
      "problem": "Manual reconciliation of fiscal documents across ERP and government APIs was a 2-day weekly bottleneck.",
      "decision": "Async bridge with retry budget and dead-letter queue, plus daily reconciliation report.",
      "tradeoff": "Eventual consistency up to 15 minutes vs. real-time push — accepted to avoid rate-limit cascades.",
      "outcome": "Weekly reconciliation effort reduced from 2 days to under 30 minutes.",
      "metrics": [
        { "label": "showcase.metrics.weeklyHours", "value": "0.5" },
        { "label": "showcase.metrics.previousHours", "value": "16" }
      ],
      "links": {},
      "order": 2
    },
    {
      "id": "sc-astro-portfolio",
      "slug": "this-portfolio",
      "title": "This Portfolio",
      "type": "live-demo",
      "heroImage": "/images/projects/portfolio.svg",
      "tags": ["Astro 5", "Tailwind v4", "TypeScript"],
      "status": "verified",
      "problem": "Demonstrate full-stack craft with verifiable public code.",
      "decision": "Astro 5 content collections + Zod-validated frontmatter + i18n routing.",
      "tradeoff": "Astro's smaller ecosystem vs. Next.js — accepted for content-first fit.",
      "outcome": "Production-deployed at rojasarmando.com; full source public.",
      "metrics": [
        { "label": "showcase.metrics.lighthouse", "value": "98" },
        { "label": "showcase.metrics.languages", "value": "2" }
      ],
      "links": {
        "repoUrl": "https://github.com/rojasarmando/portafolio",
        "demoUrl": "https://rojasarmando.com"
      },
      "order": 3
    },
    {
      "id": "sc-python-api",
      "slug": "python-api-service",
      "title": "Public Python API Service",
      "type": "case-study-public",
      "heroImage": "/images/projects/python-api.svg",
      "tags": ["Python", "API", "Open Source"],
      "status": "verified",
      "problem": "Validate senior-level Python service patterns in a public, reviewable codebase.",
      "decision": "Layered service with explicit domain boundaries and contract-tested HTTP layer.",
      "tradeoff": "More boilerplate vs. monolithic handlers — accepted for testability.",
      "outcome": "Public repo with CI, type checks, and integration tests.",
      "metrics": [
        { "label": "showcase.metrics.tests", "value": "60+" },
        { "label": "showcase.metrics.coverage", "value": "85%" }
      ],
      "links": { "repoUrl": "https://github.com/rojasarmando/<public-repo>" },
      "order": 4
    },
    {
      "id": "sc-go-roadmap",
      "slug": "go-learning-roadmap",
      "title": "Go: Next Focus",
      "type": "learning-roadmap",
      "heroImage": "/images/projects/go-roadmap.svg",
      "tags": ["Go", "Roadmap"],
      "status": "learning",
      "problem": "Public senior-level Go evidence is currently thin.",
      "decision": "Build one small public Go service (HTTP + tests + CI) before labeling expertise.",
      "tradeoff": "Slower public timeline vs. claiming expertise without evidence — accepted for honesty.",
      "outcome": "Public repo target: Q1 2026.",
      "metrics": [
        { "label": "showcase.metrics.target", "value": "Q1 2026" }
      ],
      "links": {},
      "order": 99
    }
  ],
  "trajectory": [
    {
      "company": "AVANTEC.DS",
      "role": "Technical Leader",
      "startDate": "2022-03-01",
      "current": true,
      "scope": "Backend strategy for high-availability enterprise applications.",
      "keyOutcomes": [
        "Led migration of 3 legacy services to event-driven architecture.",
        "Reduced p95 API latency by 40% across the public surface."
      ],
      "stack": ["Python", "FastAPI", "Odoo", "PostgreSQL"],
      "order": 1
    },
    {
      "company": "INGEINT CA",
      "role": "Semi Senior Developer",
      "startDate": "2020-01-15",
      "endDate": "2022-02-28",
      "scope": "ERP migration and localized fiscal modules.",
      "keyOutcomes": [
        "Delivered fiscal module covering 4 Latin American jurisdictions.",
        "Cut reporting query times by 60% via materialized views."
      ],
      "stack": ["Odoo", "Python", "PostgreSQL"],
      "order": 2
    },
    {
      "company": "Frontuari",
      "role": "Senior Technical Developer",
      "startDate": "2018-06-01",
      "endDate": "2019-12-31",
      "scope": "Custom backend logic and third-party integrations.",
      "keyOutcomes": [
        "Shipped 6 REST integrations against partner APIs.",
        "Authored internal testing guidelines adopted team-wide."
      ],
      "stack": ["Python", "Node.js", "REST"],
      "order": 3
    }
  ],
  "evidenceStack": [
    {
      "id": "core-backend",
      "label": "stack.cards.coreBackend",
      "status": "verified",
      "repos": ["portafolio"],
      "description": "stack.cards.coreBackendDesc",
      "years": 6,
      "order": 1
    },
    {
      "id": "erp",
      "label": "stack.cards.erp",
      "status": "verified",
      "repos": [],
      "description": "stack.cards.erpDesc",
      "years": 7,
      "order": 2
    },
    {
      "id": "cloud",
      "label": "stack.cards.cloud",
      "status": "verified",
      "repos": [],
      "description": "stack.cards.cloudDesc",
      "years": 5,
      "order": 3
    },
    {
      "id": "ai",
      "label": "stack.cards.ai",
      "status": "partial",
      "repos": [],
      "description": "stack.cards.aiDesc",
      "years": 2,
      "order": 4
    },
    {
      "id": "go",
      "label": "stack.cards.go",
      "status": "learning",
      "repos": [],
      "description": "stack.cards.goDesc",
      "years": 1,
      "order": 5
    }
  ]
}
```

Notes:
- Learning-roadmap entry has `order: 99` to guarantee last position without resorting to runtime sorting (REQ-01-6).
- Anonymized entries (`sc-erp-pos`, `sc-fiscal`) OMIT `links.repoUrl` per REQ-01-1 scenario; metrics are generic.
- `evidenceStack[].repos` may be empty for `verified` entries when the work is professional/private; the rule "verified stack entry MUST have at least one repo" (REQ-01-3 scenario) applies only to stack items backed by personal OSS. Workaround: ERP and Cloud `status: verified` is anchored on professional evidence; if reviewers push back, downgrade to `partial` until public repos exist.

## 4. Routing & Pages

### 4.1 Routes Map

| Path | Source | Behavior |
|---|---|---|
| `/` | `src/pages/index.astro` | es, default locale |
| `/en/` | `src/pages/en/index.astro` | en mirror |
| `/projects/<slug>/` | `src/pages/projects/[slug].astro` | es detail, dynamic from `site.showcase[]` |
| `/en/projects/<slug>/` | `src/pages/en/projects/[slug].astro` | en detail |
| `/blog/` | `src/pages/blog/index.astro` | es blog index, list `getCollection('blog')` filtered by `lang` |
| `/en/blog/` | `src/pages/en/blog/index.astro` | en blog index |
| `/blog/<slug>/` | `src/pages/blog/[slug].astro` | es blog post |
| `/en/blog/<slug>/` | `src/pages/en/blog/[slug].astro` | en blog post |

Astro's `i18n.routing.prefixDefaultLocale: false` keeps `/` for es. The `defaultLocale: 'es'` setting means the EN mirror lives under `/en/`.

### 4.2 Project Detail Page (REQ-02-1..8)

`src/pages/projects/[slug].astro` (es) and `src/pages/en/projects/[slug].astro` (en) share the same `getStaticPaths` logic via a small helper `src/lib/projectRoutes.ts`:

```typescript
// src/lib/projectRoutes.ts
import { getCollection } from 'astro:content';
import site from '../data/site.json';
import type { Showcase } from '../types/site';

export async function projectStaticPaths(lang: 'es' | 'en') {
  const projects = await getCollection('projects');
  return site.showcase.map((entry: Showcase) => ({
    params: { slug: entry.slug },
    props: {
      entry,
      body: projects.find((p) => p.data.slug === entry.slug),
      lang
    }
  }));
}
```

Detail page render order (REQ-02-4):
1. Hero with title + `<Badge status={entry.status} label={...} />` (REQ-02-7, delegates to Spec 03).
2. Problem statement.
3. Decision matrix: decision + tradeoff side-by-side.
4. Outcome + metrics.
5. Links section (only renders fields that exist in `entry.links`).
6. Footer: prev/next by `entry.order` (computed from `site.showcase`).

Fallback flow (REQ-02-6): if `body` is `undefined`, render `entry.problem`/`decision`/`outcome` strings directly, and prepend a localized "Brief view" notice.

`getStaticPaths` returns the union of `site.showcase[]` slugs; unknown slugs fall through to Astro's default 404 (REQ-02-1 scenario).

### 4.3 Blog Index + Posts

`src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BlogCard from '../../components/BlogCard.astro';
import { t, type Lang } from '../../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const posts = (await getCollection('blog'))
  .filter((p) => p.data.lang === lang)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const dict = t(lang);
---
<section>
  <h1>{dict.blog.title}</h1>
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {posts.map((post) => <BlogCard post={post} dict={dict} />)}
  </div>
</section>
```

`src/pages/blog/[slug].astro` mirrors the project detail pattern: `getStaticPaths` from `getCollection('blog')` filtered by `lang`, render `<Content />` inside a layout that includes the post's frontmatter as hero.

## 5. i18n Strategy

### New keys (added to BOTH `en.ts` and `es.ts`)

```
hero.certLabel          (already exists — reused)
hero.verificationBadge  new — short "Verified" prefix for hero
showcase.eyebrow        new — replaces builds.eyebrow consumers
showcase.title          new
showcase.subtitle       new
showcase.viewProject    new — CTA on card
showcase.briefNotice    new — fallback notice on detail page
showcase.nextProject    new — prev/next label
showcase.prevProject    new
showcase.sections.problem    new
showcase.sections.decision   new
showcase.sections.tradeoff   new
showcase.sections.outcome    new
showcase.sections.metrics    new
showcase.sections.links      new
showcase.types.caseStudyAnonymized  new — "Case Study (Anonymized)"
showcase.types.caseStudyPublic      new — "Case Study"
showcase.types.liveDemo             new — "Live Demo"
showcase.types.learningRoadmap      new — "Next Focus"
showcase.metrics.*          new — generic metric labels (uptime, p95, etc.)
nav.blog                    new
stack.eyebrow               new — replaces ecosystem.eyebrow
stack.title                 new — replaces ecosystem.title
stack.cards.*               new — labels/descriptions for EvidenceStackCard
trajectory.scope            new — replaces inline "description"
trajectory.outcomes         new — section header for keyOutcomes
trajectory.stack            new — section header for stack
blog.title                  new
blog.empty                  new
blog.readMore               new
badge.verified              new
badge.anonymized            new
badge.learning              new
badge.archived              new
```

### Backwards-compat strategy

`builds.*`, `ecosystem.*` keys REMOVED from `en.ts`/`es.ts` in the same PR that removes `site.builds`/`site.ecosystem` from `site.json`. No deprecation window — the change is internal, no external API consumers.

`description` field on trajectory is removed and replaced by `scope` + `keyOutcomes`. The i18n keys are new; old consumers in `Trajectory.astro` are updated in unit 5.

## 6. Component API Contracts

### 6.1 Badge.astro (REQ-03)

```astro
---
// src/components/Badge.astro
import Icon from './Icon.astro';
import { t, type Lang } from '../i18n/utils';
import type { BadgeStatus } from '../types/site';

interface Props {
  status: BadgeStatus;
  label?: string;
  icon?: keyof typeof iconNames;
  size?: 'sm' | 'md';
  repoUrl?: string;
  lang?: Lang;
}

const {
  status,
  label,
  icon,
  size = 'sm',
  repoUrl,
  lang = 'es'
} = Astro.props;

const dict = t(lang);

const COLOR_CLASSES: Record<BadgeStatus, string> = {
  verified:   'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  anonymized: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  learning:   'bg-amber-500/15 text-amber-300 border-amber-500/30',
  archived:   'bg-zinc-500/15 text-zinc-300 border-zinc-500/30'
};

const DEFAULT_LABEL_KEY: Record<BadgeStatus, string> = {
  verified:   'badge.verified',
  anonymized: 'badge.anonymized',
  learning:   'badge.learning',
  archived:   'badge.archived'
};

const tooltip =
  status === 'verified' && repoUrl ? repoUrl : undefined;

const visibleLabel = label ?? dict.badge[DEFAULT_LABEL_KEY[status]] ?? status;
---
<span
  class={`inline-flex items-center gap-1.5 rounded-full border ${COLOR_CLASSES[status]} ${size === 'md' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'}`}
  aria-label={`${dict.badge.ariaPrefix}: ${visibleLabel}`}
  title={tooltip}
>
  {icon && <Icon name={icon} class={size === 'md' ? 'size-4' : 'size-3.5'} />}
  <span class="font-bold uppercase tracking-wide">{visibleLabel}</span>
</span>
```

Notes:
- Tailwind color per status (REQ-03-2): emerald/slate/amber/zinc.
- `aria-label` is distinct from the visible text (REQ-03-3).
- Tooltip via `title` attribute when `repoUrl` is set on a `verified` badge (REQ-03-5).

### 6.2 ShowcaseCard.astro (new)

```astro
---
import Badge from './Badge.astro';
import type { Showcase } from '../types/site';
import type { Dictionary } from '../i18n/utils';

interface Props {
  entry: Showcase;
  dict: Dictionary;
  lang: 'es' | 'en';
}

const { entry, dict, lang } = Astro.props;

const TYPE_LABEL_KEY = {
  'case-study-anonymized': 'showcase.types.caseStudyAnonymized',
  'case-study-public':     'showcase.types.caseStudyPublic',
  'live-demo':             'showcase.types.liveDemo',
  'learning-roadmap':      'showcase.types.learningRoadmap'
} as const;

const href = lang === 'en'
  ? `/en/projects/${entry.slug}/`
  : `/projects/${entry.slug}/`;
---
<article class="group overflow-hidden rounded-2xl border border-slate-700/50 bg-background-card">
  <a href={href} class="block">
    <div class="h-56 overflow-hidden bg-slate-800">
      <img src={entry.heroImage} alt={entry.title} loading="lazy"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
    <div class="p-8">
      <div class="mb-3 flex items-center gap-2">
        <Badge status={entry.status} lang={lang} />
        <Badge status="archived" label={dict.showcase.types[TYPE_LABEL_KEY[entry.type]]} lang={lang} />
      </div>
      <h3 class="text-xl font-bold text-white group-hover:text-primary">{entry.title}</h3>
      <p class="mt-3 text-sm leading-relaxed text-slate-400 line-clamp-3">
        {entry.problem}
      </p>
      <div class="mt-6 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span class="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase text-primary">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </a>
</article>
```

Render order: hero image → badges (status first, type second) → title → problem preview → tags. Card link points to the locale-correct detail URL.

### 6.3 EvidenceStackCard.astro (new)

```astro
---
import Badge from './Badge.astro';
import Icon from './Icon.astro';
import type { EvidenceStackItem } from '../types/site';
import type { Dictionary } from '../i18n/utils';

interface Props {
  item: EvidenceStackItem;
  iconName: keyof typeof iconNames;
  dict: Dictionary;
  lang: 'es' | 'en';
}

const { item, iconName, dict, lang } = Astro.props;
---
<div class="tech-card">
  <div class="mb-5 flex items-center gap-3">
    <div class="rounded-lg bg-primary/10 p-2">
      <Icon name={iconName} class="size-6 text-primary" />
    </div>
    <h3 class="text-lg font-bold text-white">{dict.stack.cards[item.label]}</h3>
  </div>
  <Badge status={item.status === 'verified' ? 'verified' : item.status === 'learning' ? 'learning' : 'archived'} lang={lang} />
  <p class="mt-3 text-sm text-slate-400">{dict.stack.cards[item.description]}</p>
  <p class="mt-1 text-xs font-mono text-slate-500">{item.years}y</p>
  {item.repos.length > 0 && (
    <ul class="mt-3 space-y-1">
      {item.repos.map((r) => (
        <li class="text-xs font-mono text-primary">
          <a href={`https://github.com/rojasarmando/${r}`} target="_blank" rel="noopener noreferrer">
            {r}
          </a>
        </li>
      ))}
    </ul>
  )}
</div>
```

### 6.4 ProjectDetail.astro (new)

```astro
---
import Badge from './Badge.astro';
import type { Showcase } from '../types/site';
import type { Dictionary } from '../i18n/utils';

interface Props {
  entry: Showcase;
  body?: { Content: any; data: any }; // Astro content collection entry
  dict: Dictionary;
  lang: 'es' | 'en';
  prev?: Showcase;
  next?: Showcase;
}

const { entry, body, dict, lang, prev, next } = Astro.props;
const Content = body?.Content;
---
<article class="mx-auto max-w-[860px] px-6 py-24">
  <header class="mb-12">
    <div class="mb-4 flex gap-2">
      <Badge status={entry.status} repoUrl={entry.links.repoUrl} lang={lang} />
    </div>
    <h1 class="text-4xl font-extrabold text-white">{entry.title}</h1>
  </header>

  {!body && (
    <div class="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200">
      {dict.showcase.briefNotice}
    </div>
  )}

  {Content ? (
    <Content />
  ) : (
    <div class="space-y-8">
      <section>
        <h2 class="text-2xl font-bold text-primary">{dict.showcase.sections.problem}</h2>
        <p class="mt-2 text-slate-300">{entry.problem}</p>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-primary">{dict.showcase.sections.decision}</h2>
        <p class="mt-2 text-slate-300">{entry.decision}</p>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-primary">{dict.showcase.sections.tradeoff}</h2>
        <p class="mt-2 text-slate-300">{entry.tradeoff}</p>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-primary">{dict.showcase.sections.outcome}</h2>
        <p class="mt-2 text-slate-300">{entry.outcome}</p>
      </section>
    </div>
  )}

  {(entry.links.repoUrl || entry.links.demoUrl || entry.links.postUrl) && (
    <section class="mt-12 border-t border-slate-800 pt-8">
      <h2 class="text-xl font-bold text-primary">{dict.showcase.sections.links}</h2>
      <ul class="mt-4 space-y-2">
        {entry.links.repoUrl && <li><a href={entry.links.repoUrl} class="text-primary underline">{entry.links.repoUrl}</a></li>}
        {entry.links.demoUrl && <li><a href={entry.links.demoUrl} class="text-primary underline">{entry.links.demoUrl}</a></li>}
        {entry.links.postUrl && <li><a href={entry.links.postUrl} class="text-primary underline">{entry.links.postUrl}</a></li>}
      </ul>
    </section>
  )}

  <footer class="mt-16 flex justify-between border-t border-slate-800 pt-8">
    {prev && <a href={`/projects/${prev.slug}/`}>← {prev.title}</a>}
    {next && <a href={`/projects/${next.slug}/`}>{next.title} →</a>}
  </footer>
</article>
```

The "Brief view" notice appears only when no markdown body exists (REQ-02-6 scenario). Prev/next links computed from `entry.order`.

## 7. Styling System

**Per-status Tailwind tokens** (already part of `Badge.astro` above):

| Status | bg | text | border |
|---|---|---|---|
| verified | `bg-emerald-500/15` | `text-emerald-300` | `border-emerald-500/30` |
| anonymized | `bg-slate-500/15` | `text-slate-300` | `border-slate-500/30` |
| learning | `bg-amber-500/15` | `text-amber-300` | `border-amber-500/30` |
| archived | `bg-zinc-500/15` | `text-zinc-300` | `border-zinc-500/30` |

Existing palette (`primary`, `slate-900/50`, `background-card`) is unchanged — no `tailwind.config` rewrite needed because Tailwind v4 reads tokens via `@theme` in CSS, and current classes resolve.

Dark-mode strategy: site is dark-only. No `dark:` variants needed. The amber "Brief view" notice uses `bg-amber-500/10` to stay readable on the dark surface.

**New SVG/asset colors**: cover images for the 5 anonymized/public entries will be generated as flat SVGs using the existing `text-primary` hue (`#3b82f6`) and `slate-800` background. No new color tokens.

## 8. Asset Strategy

- Cover images go under `public/images/projects/<slug>.svg` (SVG preferred — keeps repo lean, scales cleanly).
- If a `showcase[].heroImage` path is missing, `ShowcaseCard.astro` falls back to a deterministic placeholder: `<div class="h-56 bg-slate-800 flex items-center justify-center text-slate-600 font-mono">{entry.slug}</div>`. No broken-image icons.
- `og:image` per project: the `BaseLayout` accepts an optional `ogImage` prop; project detail pages pass `entry.heroImage`. Sitemap and OG generation handled by existing `@astrojs/sitemap` integration.
- Favicons: existing `public/favicon.svg` is unchanged. Spec 04 confirms it stays tracked (intentional asset).
- The blog collection uses a generic og-image fallback (`public/og-default.png`) until per-post images are authored.

## 9. Asset Strategy Addendum — Repo Hygiene (Spec 04)

`.gitignore` additions (REQ-04-1):

```
# Build artifacts
dist/
.astro/
node_modules/

# Environment
.env
.env.local

# OS noise
.DS_Store

# Logs
*.log
```

`git rm --cached` commands (REQ-04-2):

```bash
# Pre-flight safety
git status --porcelain | grep -E '(dist|node_modules|\.astro)' || echo "clean"

# Untrack (no disk deletion)
git rm --cached -r dist node_modules .astro
```

The implementation MUST prompt for confirmation before `git rm --cached` per REQ-04 constraint. Post-cleanup verification (REQ-04-3):

```bash
git status --porcelain | grep -E '(dist|node_modules|\.astro)' || echo "verified clean"
```

`.gitattributes` content (REQ-04-5):

```
# Normalize line endings for text files
*.md       text eol=lf
*.ts       text eol=lf
*.astro    text eol=lf
*.json     text eol=lf
*.yml      text eol=lf
*.yaml     text eol=lf

# Mark binary
*.png      binary
*.jpg      binary
*.svg      -text
*.pdf      binary
```

`docs/HOUSEKEEPING.md` (REQ-04-6) will cover: forbidden tracked paths, the `git rm --cached` cleanup command, and the `git status --porcelain` verification snippet.

## 10. Implementation Order

| # | Unit | Description | Lines (est) | Risk | Depends on |
|---|---|---|---|---|---|
| 1 | hygiene | `.gitignore` + `git rm --cached` + `.gitattributes` + `HOUSEKEEPING.md` | ~60 | low | — |
| 2 | types | `src/types/site.ts` + `src/content/config.ts` | ~120 | low | — |
| 3 | i18n | new en.ts/es.ts keys, remove deprecated | ~180 | low | 2 |
| 4 | badge | `Badge.astro` + Icon extensions | ~110 | low | 2 |
| 5 | data | `site.json` reshape + 5 SVG cover assets | ~280 | medium | 2, 3 |
| 6 | cards | `ShowcaseCard.astro` + `EvidenceStackCard.astro` + `Stack.astro` section | ~210 | medium | 3, 4, 5 |
| 7 | pages | `src/pages/projects/[slug].astro` (es + en) + `ProjectDetail.astro` | ~260 | medium | 5, 6 |
| 8 | blog | `BlogCard.astro` + `blog/index.astro` + `blog/[slug].astro` + 1 sample post | ~180 | low | 2, 3 |
| 9 | hero | `Hero.astro` verification badges + nav links update | ~80 | low | 3, 4 |
| 10 | integration | remove old `builds`/`ecosystem`/`Projects.astro`/`Ecosystem.astro`/`Trajectory.astro` rewrite, run check+build | ~120 | high | 1–9 |
| **TOTAL** | | | **~1600** | | |

Forecast: ~1600 lines, well above the 400-line review budget. **Triggers the `ask-on-risk` gate** — see section 11.

## 11. Delivery Plan (CHAINED PRs)

User chose `ask-on-risk`. Recommendations:

**Recommendation A — 3 thematic PRs (Foundation / Data+UI / Integration)**
- **PR-A — Foundation (units 1, 2, 3, 4)**: hygiene + types + i18n + badge. ~470 lines. Slight overage; acceptable as foundation.
- **PR-B — Showcase (units 5, 6)**: data + new cards. ~490 lines. Over budget; needs `size:exception` OR split into PR-B1 (data, ~280) and PR-B2 (cards, ~210).
- **PR-C — Pages + Blog + Integration (units 7, 8, 9, 10)**: detail pages, blog, hero, integration. ~640 lines. Over; needs split into PR-C1 (pages + blog, ~440) and PR-C2 (hero + integration, ~200).

**Recommendation B — 5 PRs balanced (PR-A, PR-B1, PR-B2, PR-C1, PR-C2)** — best fit for 400-line budget, no exceptions.

**Recommendation C — Single PR with `size:exception`** — fastest; only acceptable if user explicitly waives review-budget protection.

**Recommendation D — 10 chained PRs (one per unit)** — maximum review focus, 10 PRs of 60–280 lines each; high overhead.

The choice is the user's. This design does not lock it in. `sdd-tasks` will forecast per-task budget risk and `sdd-apply` will block oversized units unless delivery strategy resolves to chained/sliced PRs or explicit `size:exception`.

Chain strategy: stacked-to-main vs feature-branch-chain. Default is `feature-branch-chain` (PR-A → main, PR-B1 → main, PR-B2 → main, ...) unless chained-PR slicing is required by later PRs.

## 12. Open Risks

- **Astro 5 content collections maturity**: `defineCollection` + `z.object` is stable in 5.x, but the `glob()` loader vs the legacy `type: 'content'` distinction matters. Decision: stay on legacy `type: 'content'` to avoid loader migration cost.
- **Tailwind v4 dynamic class safety**: Tailwind v4 with the Vite plugin scans source for class names. Dynamic classes built from string concatenation in `Badge.astro` (e.g., `bg-${color}-500/15`) WOULD be purged. Mitigation: use the explicit `Record<BadgeStatus, string>` mapping shown in section 6.1 so every variant appears in source.
- **Anonymized content depth**: anonymized case studies without depth read as fluff. Risk: user-authored content must include problem framing, decision matrix, tradeoffs, and measured outcomes (REQ-01-1 scenario). Out of scope for this design; flagged for content tasks.
- **Hero certification badge refactor**: current Hero.astro has an inline certification card with a verified icon; refactoring to use `<Badge>` may shift the visual. Acceptable risk; visual review in integration unit.
- **Chained-PR coordination**: 5 PRs require sequential merge order to avoid drift in `site.json`/`en.ts`/`es.ts`. Mitigation: PR-A is foundation (types only, no consumers) and can merge first safely.
- **i18n type safety**: `Dictionary` is `typeof en`; adding new keys without updating `es.ts` causes `Property 'X' does not exist on type` in `astro check`. Mitigation: spec mandates both files updated in the same unit.
- **Missing cover images for placeholder data**: 5 new SVGs are part of unit 5. If they're missing, the section looks empty. Mitigation: generate flat SVGs during the unit, not as separate content task.

## 13. Open Questions Resolved

- Q: Show existing or new repos? → A: Both — anonymized for private work, public for verifiable OSS, live-demo for this portfolio.
- Q: Private work treatment? → A: Anonymized case studies with problem/decision/tradeoff/outcome; no client names, no code.
- Q: Go section? → A: `learning-roadmap` showcase entry with `status: learning`, label "Next Focus" / "Siguiente enfoque".
- Q: i18n parity? → A: es/en now; fr/pt/zh deferred (no consumers, no spec).
- Q: Where does prev/next live in Trajectory? → A: Replaced by `order` + `startDate`. No more "current" badge string in i18n — `currentBadge` becomes derived from `entry.current === true`.
- Q: Ecosystem → EvidenceStack naming? → A: Internal `evidenceStack` (spec-correct), UI label "Stack" (cleaner than "Technical Ecosystem"). Both `en.ts` and `es.ts` use "Stack".
- Q: How to enforce REQ-01-7 (no inline interface redeclaration)? → A: Project will fail `astro check` if a component redeclares the same shape because TypeScript will report duplicate identifiers. No additional lint rule needed.

## Next Phase

`sdd-tasks` — break the design into implementation tasks per work unit (units 1–10), each with a strict per-task line budget. Forecast `400-line budget risk: High` and recommend chained PRs B1/B2/C1/C2.