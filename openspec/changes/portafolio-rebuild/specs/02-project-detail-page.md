# Spec 02 — Project Detail Page

## Purpose
Each showcase entry has a dedicated route that delivers technical depth (problem → decision → tradeoff → outcome), supports i18n, and falls back gracefully when no long-form content exists.

## Scope
**In scope**: New dynamic route `src/pages/projects/[slug].astro`, Astro content collections `src/content/projects/` and `src/content/blog/`, collection schema in `src/content/config.ts`, and the `Badge.astro` placeholder wired to Spec 03.
**Out of scope**: Authoring actual case-study markdown bodies and blog posts (separate content task).

## Requirements

### REQ-02-1: Dynamic route for any showcase slug
THE portfolio SHALL expose a route at `src/pages/projects/[slug].astro` that renders any slug present in `site.showcase[]`.

#### Scenario: Valid slug renders
GIVEN the showcase contains an entry with `slug: "odoo-pos-19"`
WHEN a user navigates to `/projects/odoo-pos-19/`
THEN the detail page MUST render with HTTP 200
AND the page MUST show that entry's title and badges.

#### Scenario: Unknown slug returns 404
GIVEN a URL `/projects/does-not-exist/`
WHEN the route is built or requested
THEN the response MUST be 404 (Astro default for unmatched dynamic routes).

### REQ-02-2: Projects content collection
A new Astro content collection `src/content/projects/` SHALL hold markdown case studies whose frontmatter matches the showcase schema (REQ-01-1) plus a required `body` (markdown body).

#### Scenario: Markdown body overrides short fields
GIVEN a project markdown file with full body content
WHEN the detail page renders
THEN the markdown body MUST be the primary content
AND showcase `problem`/`decision`/`outcome` fields MUST appear only when the body is absent.

### REQ-02-3: Collection schema validation
`src/content/config.ts` SHALL define the projects collection schema using Zod, enforcing: `status` enum (`verified` | `anonymized` | `learning`), `type` enum (`case-study-anonymized` | `case-study-public` | `live-demo` | `learning-roadmap`), and unique `slug` across the collection.

#### Scenario: Invalid status rejected at build time
GIVEN a markdown file with frontmatter `status: "experimental"`
WHEN `npm run build` runs
THEN the build MUST fail with a Zod validation error pointing to the offending file.

### REQ-02-4: Detail page sections
THE detail page SHALL render, in order: title, type/status badge, problem statement, decision matrix (decision + tradeoff), measured outcome, links (repo/demo), and a related project footer (next/prev by `order`).

#### Scenario: All required sections visible
GIVEN a valid project
WHEN the detail page renders
THEN the rendered DOM MUST contain the title, a badge element, a problem section, a decision section, a tradeoff section, an outcome section, a links section, and next/prev links.

### REQ-02-5: i18n support
THE detail page SHALL accept a `lang` prop (`es` | `en`) and render the matching copy from `src/i18n/<lang>.ts`.

#### Scenario: Language switching
GIVEN the detail page for slug "odoo-pos-19"
WHEN visited with `?lang=en` (or the `/en/projects/<slug>/` path)
THEN the page MUST render English copy
AND section labels MUST match the keys in `src/i18n/en.ts`.

### REQ-02-6: Brief-view fallback
WHEN a project slug exists in `site.showcase[]` but has no matching markdown body in the projects collection, THE PORTFOLIO SHALL render using only the showcase entry data AND SHALL display a "Brief view" notice (or i18n equivalent).

#### Scenario: No markdown body
GIVEN a showcase entry with no matching `src/content/projects/<slug>.md`
WHEN the detail page renders
THEN the page MUST NOT error
AND MUST show the "Brief view" notice
AND MUST still render title, badge, problem, decision, tradeoff, outcome, and links from the showcase entry.

### REQ-02-7: Badge component wiring
THE detail page SHALL import `src/components/Badge.astro` and render a badge per REQ-03-1 for the project's `status` and `type`.

#### Scenario: Badge delegated to Spec 03
GIVEN a project with `status: anonymized`
WHEN the detail page renders
THEN the page MUST contain exactly one `<Badge>` instance with `status="anonymized"`
AND MUST NOT contain inline badge markup duplicating Badge.astro logic.

### REQ-02-8: Blog content collection
A new Astro content collection `src/content/blog/` SHALL hold short posts with frontmatter fields: `title` (string), `slug` (string, unique), `date` (ISO date), `excerpt` (string), `body` (markdown), `tags[]` (string array), `lang` (`es` | `en`).

#### Scenario: Blog post renders
GIVEN a blog markdown file with valid frontmatter
WHEN `npm run build` runs
THEN the post MUST be included in the build output
AND the build MUST NOT fail on missing optional fields.

## Constraints
- The detail page MUST NOT duplicate badge logic; it delegates to `Badge.astro`.
- The collection schema MUST use Astro 5's `defineCollection` + `z.object` API.
- i18n keys for detail-page sections MUST exist in BOTH `en.ts` and `es.ts`.

## Verification
- `npm run build` succeeds.
- Navigating to `/projects/<valid-slug>/` renders correctly with all required sections.
- Switching `?lang=en` (or `/en/projects/<slug>/`) renders English copy.
- `npm run check` (which runs `astro check`) passes — no schema validation errors.

## Dependencies
- Spec 01 (showcase schema is the source of truth for slug and frontmatter).
- Spec 03 (`Badge.astro` is consumed by the detail page).