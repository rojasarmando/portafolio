# Spec 01 — Showcase Data Model

## Purpose
Replace generic `site.builds[]` with curated showcase entries that DEMONSTRATE expertise through anonymized case studies and verifiable public repos, plus full trajectory records and a verified evidence stack.

## Scope
**In scope**: New `site.showcase[]`, `site.trajectory[]`, `site.evidenceStack[]` schemas in `src/data/site.json` and matching TypeScript interfaces in `src/types/site.ts`. Rendering rules per entry type.
**Out of scope**: Actual content authoring of case studies (separate content task). New public Go/FastAPI repos.

## Requirements

### REQ-01-1: Showcase entry schema
WHEN the portfolio data file is loaded, `site.showcase[]` SHALL contain entries with fields: `id` (string), `slug` (string, unique), `title` (string), `type` (one of `case-study-anonymized` | `case-study-public` | `live-demo` | `learning-roadmap`), `heroImage` (string path), `tags[]` (string array), `status` (one of `verified` | `anonymized` | `learning`), `problem` (string), `decision` (string), `tradeoff` (string), `outcome` (string), `metrics[]` (object array with `label` and `value`), `links` (object with optional `repoUrl`, `demoUrl`, `postUrl`), `order` (integer).

#### Scenario: Anonymized case study entry
GIVEN a showcase entry with `type: case-study-anonymized`
WHEN the data file is validated
THEN it MUST include `problem`, `decision`, `tradeoff`, `outcome`, and `metrics[]`
AND `links.repoUrl` MUST be omitted.

### REQ-01-2: Trajectory entry schema
WHEN the portfolio data file is loaded, `site.trajectory[]` SHALL contain entries with fields: `company` (string), `role` (string), `startDate` (ISO date string), `endDate` (ISO date string) OR `current: true`, `scope` (string), `keyOutcomes[]` (string array), `stack[]` (string array), `order` (integer).

#### Scenario: Current role record
GIVEN a trajectory entry where the engineer is still employed
WHEN the entry is rendered
THEN `endDate` MUST be absent and `current: true` MUST be present.

### REQ-01-3: Evidence stack schema (replaces ecosystem[])
WHEN the portfolio data file is loaded, `site.evidenceStack[]` SHALL replace `ecosystem[]` and contain entries with fields: `id` (string), `label` (string), `status` (one of `verified` | `partial` | `learning`), `repos[]` (string array of repo names), `description` (string), `years` (number), `order` (integer).

#### Scenario: Verified stack entry
GIVEN an evidence stack entry with `status: verified`
WHEN the entry is rendered
THEN `repos[]` MUST contain at least one public GitHub repo name that resolves.

### REQ-01-4: Anonymized entries render verification badge
WHEN a `case-study-anonymized` entry is rendered, THE PORTFOLIO SHALL show the verification badge (from Spec 03) with `status: anonymized`
AND MUST NOT expose client names, proprietary code, or confidential metrics.

#### Scenario: Anonymized rendering safety
GIVEN a `case-study-anonymized` entry
WHEN the entry is reviewed for rendering
THEN the rendered HTML MUST NOT contain strings matching a known client list
AND any `metrics[].value` MUST be generic (no client-identifying values).

### REQ-01-5: Verified live-demo links
WHEN a `live-demo` entry has `status: verified`, THE PORTFOLIO SHALL link to the verifiable repo and/or demo URL in the `links` field.

#### Scenario: Live demo link present
GIVEN a `live-demo` entry with `status: verified`
WHEN the entry is rendered
THEN the rendered card MUST include an anchor element whose `href` matches `links.repoUrl` or `links.demoUrl`.

### REQ-01-6: Learning-roadmap ordering
WHEN a `learning-roadmap` entry is rendered, THE PORTFOLIO SHALL display it LAST in the showcase section
AND SHALL mark it with the label "Next focus" or an i18n-equivalent string.

#### Scenario: Roadmap entry position
GIVEN a list of showcase entries including exactly one `learning-roadmap` entry
WHEN the showcase is rendered in document order
THEN the `learning-roadmap` entry MUST appear after all other entries.

### REQ-01-7: TypeScript declarations
THE TypeScript interface declarations for `Showcase`, `Trajectory`, `EvidenceStack`, and related enums SHALL live in `src/types/site.ts`
AND SHALL be imported by every component that consumes the data.

#### Scenario: Interface import
GIVEN a component file under `src/components/` or `src/pages/`
WHEN it references `showcase`, `trajectory`, or `evidenceStack`
THEN it MUST import the matching interface from `src/types/site.ts` (no inline duplicate declarations).

## Constraints
- The `site.ecosystem[]` field SHALL be removed (not deprecated); it is replaced by `site.evidenceStack[]`.
- Field names MUST be identical across `src/data/site.json`, `src/types/site.ts`, and any Astro content collection frontmatter.
- i18n copy keys for new sections MUST exist in BOTH `src/i18n/en.ts` and `src/i18n/es.ts` with identical keys.

## Verification
- `npm run check` passes (TypeScript strict mode validates the schema).
- Manual review of rendered output at `/` and `/en/` confirms badge placement and ordering.
- Grep check: `site.ecosystem` returns zero results in `src/` after migration.

## Dependencies
- Spec 02 (project detail page consumes the showcase schema).
- Spec 03 (verification badges are referenced by REQ-01-4 and REQ-01-5).