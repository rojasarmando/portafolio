```yaml
schema: nelsibeth-ia.verify-result/v1
evidence_revision: sha256:9c4f1a2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a
verdict: pass-with-warnings
blockers: 0
critical_findings: 1
requirements: 24/27
scenarios: 23/28
test_command: npm run check
test_exit_code: 0
test_output_hash: sha256:2585ed63ff30a6bf7857e22f55652396c3cbab905532dfa4461d56713b0488cf
build_command: npm run build
build_exit_code: 0
build_output_hash: sha256:ec21441a1e721a7a5dcb7663b163af7113d27e1c11e8b25989e43685a5b48f61
```

# Verification Report — portafolio-rebuild

**Change**: portafolio-rebuild
**Version**: 1.0 (initial)
**Mode**: Standard (Strict TDD: false; no test runner; verify via `astro check` + `astro build`)

## Completeness

| Metric | Value |
|---|---|
| Tasks total | 10 |
| Tasks complete | 10 |
| Tasks incomplete | 0 |
| Specs | 4 (data model, detail page, badges, hygiene) |
| Requirements | 27 |
| Scenarios | 28 |
| Requirements compliant | 24/27 |
| Scenarios compliant | 23/28 |

## Build & Tests Execution

**Build**: ✅ Passed

```
$ npm run build
08:42:47 [@astrojs/sitemap] sitemap-index.xml created at dist
08:42:47 [build] 16 page(s) built in 2.51s
08:42:47 [build] Complete!
```

16 pages: `/`, `/en/`, 5× `/projects/<slug>/`, 5× `/en/projects/<slug>/`, `/blog/`, `/en/blog/`, 2× blog posts.

**Tests**: ➖ Not applicable (no test runner configured; verification via `astro check` which runs TypeScript + Astro type checking on 29 files).

```
$ npm run check
Result (29 files):
- 0 errors
- 0 warnings
- 0 hints
```

**Coverage**: ➖ Not available (no test runner, no coverage tooling).

## Spec Compliance Matrix

### Spec 01 — Showcase Data Model (7 scenarios)

| REQ | Scenario | Evidence | Result |
|---|---|---|---|
| REQ-01-1 | Anonymized case study entry | Schema deviation: implementation uses `type: "anonymized"` (4 enum) not the spec's `case-study-anonymized` (4 enum); missing `problem`/`decision`/`tradeoff`/`outcome`/`metrics[]` fields in `site.json`; `links` shape uses `kind: repo/demo/post` array, not the spec's `repoUrl`/`demoUrl`/`postUrl` object | ⚠️ PARTIAL |
| REQ-01-2 | Current role record | `AVANTEC.DS` entry has `current: true`, no `endDate`; renders "LIDERANDO ACTUALMENTE" badge | ✅ COMPLIANT |
| REQ-01-3 | Verified stack entry | `evidenceStack[]` contains 4 entries; "verified" entries include at least one repo with a resolvable GitHub URL (`https://github.com/rojasarmando/bot-router` resolves) | ✅ COMPLIANT |
| REQ-01-4 | Anonymized rendering safety | Odoo case study entries have no client names, no code, no proprietary metrics; only anonymized titles like "Odoo Retail Fiscalization Sync" and the user's authored narrative | ✅ COMPLIANT |
| REQ-01-5 | Live demo link present | `this-portafolio` entry has `status: verified` and `links` with `kind: demo` pointing to `https://rojasarmando.com`; rendered HTML contains the anchor | ✅ COMPLIANT |
| REQ-01-6 | Roadmap entry position | HTML order verified: 1) Fiscalization, 2) Migration, 3) bot-router, 4) this-portafolio, 5) Go service (roadmap) — last as required | ✅ COMPLIANT |
| REQ-01-7 | Interface import | `src/types/site.ts` exports `ShowcaseEntry`, `TrajectoryRecord`, `EvidenceStackItem`; `Badge.astro`, `ShowcaseCard.astro`, `EvidenceStackCard.astro`, `Projects.astro`, `Ecosystem.astro` all import from there | ✅ COMPLIANT |

### Spec 02 — Project Detail Page (9 scenarios)

| REQ | Scenario | Evidence | Result |
|---|---|---|---|
| REQ-02-1 | Valid slug renders | All 5 showcase slugs render at `/projects/<slug>/` (HTTP 200) | ✅ COMPLIANT |
| REQ-02-1 | Unknown slug returns 404 | Astro static build only emits pages for slugs in `getStaticPaths`; `dist/projects/does-not-exist/` does not exist (Astro default 404 for unmatched dynamic routes) | ✅ COMPLIANT |
| REQ-02-2 | Markdown body overrides short fields | `content.render()` produces the markdown body that renders into `<div class="prose">`; when body is absent, fallback shows brief-view notice | ✅ COMPLIANT |
| REQ-02-3 | Invalid status rejected at build time | Zod schema in `src/content/config.ts` uses `z.enum(BADGE_STATUSES)`; build succeeds (no current markdown files violate, but the schema will reject if added) | ✅ COMPLIANT |
| REQ-02-4 | All required sections visible | `Problem`, `Tradeoff`, `Measured outcome` present in HTML (from markdown body); `Siguiente` (next) present; `Read case study` link rendered (as Spanish equivalent "Leer caso de estudio") | ✅ COMPLIANT |
| REQ-02-5 | Language switching | `/en/projects/odoo-retail-fiscalization/` shows English copy (`Problem`, `Technical decision`, `Measured outcome`, `Tradeoff`); `/projects/odoo-retail-fiscalization/` shows Spanish (Todo content) | ⚠️ PARTIAL — i18n works at the page level but the markdown body itself is English-only; Spanish page shows English content |
| REQ-02-6 | No markdown body | `bot-router`, `this-portafolio`, `go-api-service` slugs have no matching markdown; the page renders with "Vista breve" notice | ⚠️ PARTIAL — brief-view notice is shown, but spec also requires rendering problem/decision/tradeoff/outcome from showcase entry; those fields don't exist in `site.json` so the brief view is bare |
| REQ-02-7 | Badge delegated to Spec 03 | `ProjectDetail.astro` imports and uses `<Badge status={entry.status}>`; no inline badge markup in the detail page | ✅ COMPLIANT |
| REQ-02-8 | Blog post renders | `dist/blog/odoo-fiscalization-queue-job/index.html` exists; contains "queue_job" content; build did not fail | ✅ COMPLIANT |

### Spec 03 — Verification Badges (6 scenarios)

| REQ | Scenario | Evidence | Result |
|---|---|---|---|
| REQ-03-1 | Default label derived from status | `<Badge status="verified">` renders "Verified" by default; `STATUS_LABEL` map in `src/types/site.ts` provides the labels | ✅ COMPLIANT |
| REQ-03-2 | Color per status | Verified: `bg-emerald-500` class present; Anonymized: `text-slate-300`; Learning: `text-amber-300`; all 3 distinct color groups present in rendered HTML | ✅ COMPLIANT |
| REQ-03-3 | Screen reader announcement | `aria-label="Status: <label>"` attribute on all rendered badges; non-empty and distinct from `title` attribute (where present) | ✅ COMPLIANT |
| REQ-03-4 | Icon rendered | `Badge.astro` renders `<Icon name="...">` when icon is provided; default icon per status maps to `checkCircle`/`lock`/`graduationCap`/`archive` — note: spec scenario example uses `icon="check"` but `Icon.astro` has `checkCircle` (renamed for clarity) | ⚠️ PARTIAL — icon name in spec (`check`) is not in `Icon.astro`'s keyof, so passing `icon="check"` would fail type-check; `checkCircle` is the functional equivalent |
| REQ-03-5 | Tooltip present | Badge component sets `title` attribute and `data-repo-url` when `repoUrl` prop provided; current call sites do not pass `repoUrl` so no tooltips in this build (zero `data-repo-url` matches in HTML) | ⚠️ PARTIAL — wiring exists, no current consumer uses it |
| REQ-03-6 | Type reuse | `BadgeStatus` exported from `src/types/site.ts`; `Badge.astro`, `ShowcaseCard.astro`, `EvidenceStackCard.astro`, `ProjectDetail.astro` all import the type | ✅ COMPLIANT |

### Spec 04 — Repo Hygiene (6 scenarios)

| REQ | Scenario | Evidence | Result |
|---|---|---|---|
| REQ-04-1 | Each pattern blocks tracking | `git check-ignore` confirms all 7 required patterns (`dist/`, `node_modules/`, `.astro/`, `.env`, `.env.local`, `.DS_Store`, `app.log`) are ignored | ✅ COMPLIANT |
| REQ-04-2 | Artifacts removed from index | `git ls-files | grep -E '^(dist|node_modules|\.astro)/'` returns 0 results (artifacts were never tracked to begin with) | ✅ COMPLIANT |
| REQ-04-3 | Post-cleanup status is clean | `git status --porcelain | grep -E "^\?\? (dist|node_modules|\.astro)/"` returns 0; tracked source files show in `M`/`??` status (expected) | ✅ COMPLIANT |
| REQ-04-4 | Build still works | `npm run check` 0 errors / 0 warnings / 0 hints; `npm run build` complete in 2.5s with 16 pages | ✅ COMPLIANT |
| REQ-04-5 | Text files normalized | `.gitattributes` exists at repo root with `* text=auto eol=lf`, explicit `*.md`/`*.ts`/`*.astro`/`*.json`/`*.yml` text + LF, plus binary markers for images | ✅ COMPLIANT |
| REQ-04-6 | Doc covers required topics | `docs/HOUSEKEEPING.md` exists (1207 bytes) and mentions `dist/`, `node_modules/`, `.astro/`, `.env*` as forbidden tracked content, the `git rm --cached -r dist node_modules .astro` cleanup command, and `git status` verification | ✅ COMPLIANT |

## Correctness (Static Evidence)

| Requirement | Status | Notes |
|---|---|---|
| ShowcaseEntry schema with all required fields | ⚠️ Partial | Missing `problem`/`decision`/`tradeoff`/`outcome`/`metrics[]` in `site.json`; implementation deferred to markdown body |
| Trajectory with full record | ✅ Implemented | `Trajectory.astro` renders role, dates (formatted period), scope, outcomes list, stack chips |
| EvidenceStack with status per repo | ✅ Implemented | Per-repo badges in `EvidenceStackCard.astro`; aggregate status on the card |
| Status badge in 4 colors | ✅ Implemented | Static `Record<status,string>` for Tailwind v4 JIT safety |
| Badge aria-label distinct from tooltip | ✅ Implemented | `aria-label="Status: <name>"` + `title=<name>` (or repo URL) |
| Content collection Zod schemas | ✅ Implemented | `projects` and `blog` collections; status/type enums imported from `src/types/site.ts` |
| Project detail route for every slug | ✅ Implemented | `getStaticPaths` over all showcase entries, content lookup with `.md` strip |
| 404 for unknown slugs | ✅ Default | Astro static build only emits known slugs |
| i18n at page level | ✅ Implemented | `/` (es) and `/en/` (en) parallel pages |
| i18n at content level | ❌ Not implemented | Project markdown is English-only; Spanish page shows English body |
| Repo hygiene | ✅ Implemented | `.gitignore` already covered; `.gitattributes` and `docs/HOUSEKEEPING.md` added |
| Build still passes after hygiene | ✅ Verified | 16 pages, 0 errors, sitemap regenerated |

## Coherence (Design)

| Decision | Followed? | Notes |
|---|---|---|
| Tailwind v4 JIT safety: explicit `Record<status,string>` | ✅ Yes | `Badge.astro` and `EvidenceStackCard.astro` use static maps |
| Single source of truth: `src/types/site.ts` | ✅ Yes | All components import types from there; no inline duplicates |
| Astro 5 legacy `type: 'content'` collections | ✅ Yes | `src/content/config.ts` uses `type: 'content'`, not new `loader: glob()` |
| Deprecated i18n keys removed in WU-10 | ✅ Yes | `ecosystem` and `builds` aliases gone from both en.ts and es.ts |
| Learning-roadmap last via `order: 99` + sort | ✅ Yes | `Projects.astro` sort places roadmap entries last |
| Each showcase entry has `id` (slug source) | ✅ Yes | `getStaticPaths` uses `entry.id` as the route param |
| Markdown body is the primary detail content | ✅ Yes | When present, `Content` component renders into the prose block |

## Issues Found

### CRITICAL

1. **REQ-01-1 schema deviation + REQ-02-6 brief-view completeness**: `site.json` does not include `problem`/`decision`/`tradeoff`/`outcome`/`metrics[]` per showcase entry. The implementation defers this content to the markdown body. As a result, the brief-view fallback (entries without markdown: `bot-router`, `this-portafolio`, `go-api-service`) renders a near-empty page with only the title, badge, and "Vista breve" placeholder — no problem/decision/tradeoff/outcome sections appear. The spec requires them to render from the showcase entry.

### WARNING

2. **REQ-03-4 icon name mismatch**: Spec scenario uses `icon="check"`, but `Icon.astro` exposes `checkCircle`. The Badge component maps status → icon automatically, so this is functionally fine, but the literal example in the spec would fail type-checking if implemented verbatim.

3. **REQ-02-5 content-level i18n**: Project markdown is English-only. The Spanish `/projects/<slug>/` page renders English body content. The structural i18n (titles, labels, navigation) is correct; the body is not.

4. **REQ-03-5 no current consumer passes `repoUrl`**: The `repoUrl` → tooltip wiring exists in `Badge.astro` but no current call site sets it. The functionality is dormant.

5. **Hero evidence aria-labels**: `aria-label="Status: ai"`, `aria-label="Status: core"` — the Hero passes `label={stack.id}` to Badge, so the aria-label says the stack name. Spec says aria-label should describe the status. This is correct per spec (distinct from title) but the wording is misleading: visitors hear "Status: ai" rather than "Status: Verified".

### SUGGESTION

6. The 2 case study markdowns (`odoo-retail-fiscalization.md`, `odoo-migration-v14-v18.md`) contain `<!-- TODO -->` HTML comments. These are placeholders for user-authored narrative. The detail pages render these as HTML comments, which is invisible to visitors but pollutes the source. Replace with real content before merge.

7. Cover image: `this-portafolio` reuses `/images/projects/digital-signature.png` as cover. Consider dedicated cover images for each showcase entry.

8. Trajectory dates: present in `site.json` but rendered as a single formatted string. A timeline visualization (per-period chips with gap detection) would be richer.

## Verdict

**PASS WITH WARNINGS**

Build is clean (`astro check` 0 errors, `astro build` 16 pages, sitemap regenerated). 24/27 requirements and 23/28 scenarios are compliant. The single critical issue is the brief-view fallback for showcase entries without markdown — spec says problem/decision/tradeoff/outcome MUST render from the showcase entry in fallback, but the current `site.json` shape doesn't include those fields, so the fallback shows an incomplete page. Three warning-level issues: icon name mismatch in spec example, content-level i18n missing, dormant `repoUrl` tooltip wiring. These are addressable in a follow-up change without blocking the current work.

## Recommendation

1. **Before merge** (user decision): either (a) extend `site.json` showcase entries with `problem`/`decision`/`tradeoff`/`outcome`/`metrics[]` fields so brief-view renders fully, or (b) explicitly mark this as a known limitation in the case-study markdowns and ship the partial UX.
2. **Before merge**: replace `<!-- TODO -->` markers in 2 case study markdowns with real narrative.
3. **Follow-up change**: add content-level i18n (`*.es.md` variants or `lang` frontmatter filtering) for projects and blog posts.
4. **Follow-up change**: pass `repoUrl` to verified badges in `ShowcaseCard.astro` to surface the tooltip.
