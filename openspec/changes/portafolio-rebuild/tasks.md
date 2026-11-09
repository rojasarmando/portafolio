# Tasks — portafolio-rebuild

## Review Workload Forecast

- **Total estimated changed lines**: ~1600 (revised from design.md initial estimate)
- **Per-work-unit breakdown**:
  - WU-01 hygiene: ~30 lines
  - WU-02 types: ~120 lines
  - WU-03 i18n: ~150 lines
  - WU-04 badge: ~80 lines
  - WU-05 showcase-data: ~250 lines
  - WU-06 showcase-card: ~200 lines
  - WU-07 project-page: ~250 lines
  - WU-08 blog: ~150 lines
  - WU-09 hero-update: ~80 lines
  - WU-10 integration: ~100 lines
- **Review budget (cached)**: 400 lines
- **Chained PRs recommended**: YES
- **400-line budget risk**: HIGH (1600 / 400 = 4x over)
- **Decision needed before apply**: YES — chained PRs vs single PR with size:exception vs other

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

## Delivery Strategy Options (cached: ask-on-risk)

- **Option A — 5 chained PRs (RECOMMENDED)**: split per thematic boundary, balanced.
  - PR-1: Foundation (WU-01 + WU-02 + WU-04) = ~230 lines, no behavior change, safe base.
  - PR-2: i18n + data (WU-03 + WU-05) = ~400 lines, parity + new data shape.
  - PR-3: Components (WU-06) = ~200 lines, new cards render with stub data.
  - PR-4: Pages (WU-07 + WU-08) = ~400 lines, detail pages + blog.
  - PR-5: Hero + integration + cleanup (WU-09 + WU-10) = ~180 lines, final wiring + remove old refs.
- **Option B — 1 PR with size:exception**: ~1600 lines, single review, requires explicit `size:exception` from user.
- **Option C — 3 thematic PRs with size:exception for over-budget**: PR-A Foundation ~380 (under), PR-B Components+Data ~650 (exception needed), PR-C Pages+Integration ~580 (exception needed).
- **Option D — 10 chained PRs, one per WU**: maximum review focus, max PR overhead.

## Chain Strategy (NOT YET CACHED — collect from user if Option A or C chosen)

When chained PRs are used, the user must also pick:
- **stacked-to-main**: each PR merges to main in order, fast iteration.
- **feature-branch-chain**: PR-1 -> tracker branch; PR-2..N target the previous PR branch; only tracker merges to main. Best for rollback control.

## Work Units

Each WU is one cohesive change set, ideally small enough to review alone. Dependencies block parallel execution.

### WU-01: Repo Hygiene
**Goal**: Stop tracking `dist/`, `node_modules/`, `.astro/`; add `.gitattributes`.
**Files**:
- `.gitignore` — append: `dist/`, `node_modules/`, `.astro/`, `.env`, `.env.local`, `.DS_Store`, `*.log`
- `.gitattributes` — new file: `* text=auto eol=lf`, `*.png binary`, `*.jpg binary`, `*.webp binary`
- Bash commands: `git rm --cached -r dist node_modules .astro || true` then `git add .gitignore .gitattributes` then commit
**Lines est**: ~30
**Risk**: low
**Verification**: `git status` clean of artifacts; `npm run build` still works.
**Depends on**: —
**Blocks**: WU-10 (cleanup of remaining stale refs)

### WU-02: Shared Types
**Goal**: Single source of truth for all showcase/trajectory/badge types.
**Files**:
- `src/types/site.ts` — NEW, exports: `BadgeStatus`, `ShowcaseType`, `ShowcaseEntry`, `TrajectoryRecord`, `EvidenceStackItem`, `BadgeProps`.
- `src/content/config.ts` — NEW, Zod schemas for collections: `projects` and `blog`.
**Lines est**: ~120
**Risk**: low
**Verification**: `npm run check` passes; new types importable.
**Depends on**: —
**Blocks**: WU-03, WU-04, WU-05, WU-07, WU-08

### WU-03: i18n Key Additions
**Goal**: Add new keys for showcase/trajectory/evidenceStack; keep old keys temporarily as aliases (deprecate in WU-10).
**Files**:
- `src/i18n/en.ts` — add `showcase.*`, extend `trajectory.items[*]` schema, replace `ecosystem` with `evidenceStack`.
- `src/i18n/es.ts` — same structure.
**Lines est**: ~150
**Risk**: low (mechanical translation, structure parity required).
**Verification**: `npm run check` passes; both dicts structurally identical.
**Depends on**: WU-02
**Blocks**: WU-05, WU-09, WU-10

### WU-04: Badge Component
**Goal**: Verification badge with 4 status variants.
**Files**:
- `src/components/Badge.astro` — NEW. Props: status, label?, icon?, size? (default 'sm'). Status->color via explicit `Record<BadgeStatus, string>`.
- Update `src/components/Icon.astro` if needed (accept new icon names: 'check-shield', 'lock', 'graduation-cap', 'archive').
**Lines est**: ~80
**Risk**: low
**Verification**: `astro check` passes; visual review of all 4 variants.
**Depends on**: WU-02
**Blocks**: WU-06, WU-09

### WU-05: Showcase Data + Collections Seed
**Goal**: Reshape `site.json` to the new schema; seed 2 example markdown case studies.
**Files**:
- `src/data/site.json` — replace `builds[]` with `showcase[]`, extend `trajectory[]`, replace `ecosystem[]` with `evidenceStack[]`.
- `src/content/projects/odoo-retail-sync.md` — NEW (anonymized case study template).
- `src/content/projects/fastapi-invoice-api.md` — NEW (public repo case study template).
**Lines est**: ~250
**Risk**: medium (content authoring requires user input for anonymized case studies; ship with placeholder text marked TODO).
**Verification**: `astro check` passes; both collections load.
**Depends on**: WU-02, WU-03
**Blocks**: WU-06, WU-07

### WU-06: New Card Components
**Goal**: Render the new data shape with the new Badge.
**Files**:
- `src/components/ShowcaseCard.astro` — NEW. Replaces the old project card.
- `src/components/EvidenceStackCard.astro` — NEW. Replaces ecosystem card.
- `src/components/Projects.astro` — modify to use `site.showcase[]` and `ShowcaseCard`.
- `src/components/Ecosystem.astro` — modify to use `site.evidenceStack[]` and `EvidenceStackCard`.
**Lines est**: ~200
**Risk**: medium
**Verification**: visual review; cards render with correct badges; links to detail pages work.
**Depends on**: WU-04, WU-05
**Blocks**: WU-10

### WU-07: Project Detail Page
**Goal**: `/projects/[slug]/` renders any showcase entry.
**Files**:
- `src/pages/projects/[slug].astro` — NEW. `getStaticPaths` from collection + site.json fallback.
- `src/components/ProjectDetail.astro` — NEW. Renders problem, decision matrix, outcome, links, prev/next.
- `src/layouts/Page.astro` — extend with optional `ogImage` and `lang` props.
**Lines est**: ~250
**Risk**: medium
**Verification**: `npm run build` succeeds; navigating to each slug works in es and en.
**Depends on**: WU-05, WU-06
**Blocks**: WU-10

### WU-08: Blog/Cases Section
**Goal**: Short technical write-ups for anonymized deep-dives.
**Files**:
- `src/pages/blog/index.astro` — NEW. Lists all posts.
- `src/pages/blog/[slug].astro` — NEW. Renders one post.
- `src/content/blog/odoo-fiscalization-architecture.md` — NEW (sample post, anonymized).
- i18n keys: `blog.*`
**Lines est**: ~150
**Risk**: low
**Verification**: `npm run build` succeeds; navigation works.
**Depends on**: WU-02, WU-03
**Blocks**: WU-10

### WU-09: Hero Update
**Goal**: Verification badges in hero showing current evidence status per stack.
**Files**:
- `src/components/Hero.astro` — modify to consume `site.evidenceStack[]` and show inline status badges.
- i18n keys: `hero.evidence.*`
**Lines est**: ~80
**Risk**: low
**Verification**: visual review; keyboard nav.
**Depends on**: WU-03, WU-04
**Blocks**: WU-10

### WU-10: Integration + Cleanup
**Goal**: Remove deprecated refs, run final checks, verify build.
**Files**:
- Delete old `builds.items` keys from `en.ts` and `es.ts` (now unused).
- Delete `ecosystem` keys (renamed to `evidenceStack`).
- Remove unused images: `public/images/projects/digital-signature.png` (only used by deleted ref).
- Update `docs/README*.md` if they reference removed copy.
- Run `npm run check` and `npm run build` — both MUST pass.
- Optional: `npm audit` for hygiene.
**Lines est**: ~100
**Risk**: high (touches everything; first chance to see if all 9 WUs compose cleanly).
**Verification**: `npm run build` clean, no warnings, no broken links, sitemap regenerated.
**Depends on**: WU-01..WU-09
**Blocks**: — (final)

## Dependency Graph
WU-01 -> WU-10
WU-02 -> WU-03, WU-04, WU-05, WU-07, WU-08
WU-03 -> WU-05, WU-09
WU-04 -> WU-06, WU-09
WU-05 -> WU-06, WU-07
WU-06 -> WU-07
WU-07 -> WU-10
WU-08 -> WU-10
WU-09 -> WU-10

## Parallelizable
- WU-01 (independent)
- WU-02 (independent)
- WU-04 (after WU-02)
- WU-08 (after WU-02 + WU-03)
- WU-05, WU-06, WU-07, WU-09 form a critical path

## Delivery Strategy (per cached preflight: ask-on-risk)
- Forecast: ~1600 lines total.
- Budget: 400 lines.
- Chained PRs recommended: YES.
- Decision needed before apply: YES.

## Open Questions for Orchestrator Before sdd-apply
1. Pick delivery option (A / B / C / D from Review Workload Forecast).
2. If A or C chosen: pick chain strategy (stacked-to-main / feature-branch-chain).
3. Confirm content author: who writes the anonymized case studies? User drafts, then `sdd-apply` inserts markdown. Or `sdd-apply` produces skeleton with TODO markers and user fills later.
4. Confirm Go decision: include `learning-roadmap` showcase entry now, or defer until a real public Go repo exists?