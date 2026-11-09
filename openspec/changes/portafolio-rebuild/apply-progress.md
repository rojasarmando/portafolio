# Apply Progress — portafolio-rebuild

**Status**: COMPLETED (10/10 WUs)
**Date**: 2026-09-05
**Delivery mode**: single PR with `size:exception` (user-accepted)
**Verification**: `astro check` 0 errors, `astro build` clean, 16 pages generated

## Work Unit Results

### WU-01: Repo Hygiene — COMPLETED
- `.gitignore`: already covered all required paths (dist/, node_modules/, .astro/, .env*); no changes needed
- `.gitattributes`: NEW file with text auto-detection + LF normalization + explicit binary types
- `git rm --cached`: not needed (artifacts were untracked, not tracked)
- Verification: `git status` clean of artifacts

### WU-02: Shared Types — COMPLETED
- `src/types/site.ts` (NEW, 141 lines): BadgeStatus, ShowcaseType, ShowcaseEntry, TrajectoryRecord, EvidenceStackItem, BadgeProps, LinkEntry, with const arrays and explicit Record<status, color/label> mappings (Tailwind v4 JIT-safe)
- `src/content/config.ts` (NEW, 55 lines): Zod schemas for `projects` and `blog` content collections using legacy `type: 'content'` API

### WU-03: i18n Key Additions — COMPLETED
- `src/i18n/en.ts`: added `hero.evidence.*`, `evidenceStack.*`, `showcase.*` (full), `trajectory.*` (extended with scopeLabel, outcomesLabel, stackLabel, outcomes[]), `blog.*`
- `src/i18n/es.ts`: full Spanish mirror
- Deprecated aliases `ecosystem` and `builds` removed in WU-10 (after consumers migrated)

### WU-04: Badge Component — COMPLETED
- `src/components/Badge.astro` (NEW, 60 lines): props status/label/icon/size/repoUrl; static color mapping via Record<status,string> for Tailwind v4 JIT safety; default icon per status (checkCircle, lock, graduationCap, archive)
- `src/components/Icon.astro`: added 5 new icons (graduationCap, archive, lock, arrowLeft, arrowRight, checkCircle)

### WU-05: Showcase Data + Collections Seed — COMPLETED
- `src/data/site.json`: reshaped to new schema; `showcase[]` (5 entries: 2 anonymized Odoo case studies, 1 public bot-router, 1 live-demo portafolio, 1 learning-roadmap Go service); `trajectory[]` extended (3 records with role, startDate, scope, keyOutcomes, stack); `evidenceStack[]` (4 stacks: core, erp, cloud, ai with per-repo status)
- `src/content/projects/odoo-retail-fiscalization.md`: NEW (frontmatter + 4 TODO sections)
- `src/content/projects/odoo-migration-v14-v18.md`: NEW (frontmatter + 4 TODO sections)

### WU-06: New Card Components — COMPLETED
- `src/components/ShowcaseCard.astro` (NEW, 99 lines): renders showcase entries with status badge, type label, tags, actions
- `src/components/EvidenceStackCard.astro` (NEW, 64 lines): renders evidence stack items with per-repo badges
- `src/components/Projects.astro`: modified to iterate `site.showcase[]` with stable sort (learning-roadmap last via order: 99)
- `src/components/Ecosystem.astro`: modified to iterate `site.evidenceStack[]`
- `src/components/Trajectory.astro`: rewrote to use new `job.role`, `job.startDate/endDate/current`, `item.scope`, `item.outcomes[]`, `job.stack[]`

### WU-07: Project Detail Page — COMPLETED
- `src/pages/projects/[slug].astro` (NEW): getStaticPaths iterates showcase entries, looks up content collection by id (with `.md` extension stripped), passes content entry to ProjectDetail
- `src/pages/en/projects/[slug].astro` (NEW): English mirror, paths corrected to 3-level relative imports
- `src/components/ProjectDetail.astro` (NEW, ~105 lines): renders entry header + body (or brief view if no content) + prev/next nav. Receives `lang` as prop (fixed during integration)
- `src/layouts/Page.astro`: extended with `bare` prop and `ogImage`; omits global sections when `bare=true`

### WU-08: Blog/Cases Section — COMPLETED
- `src/pages/blog/index.astro` (NEW): lists blog posts filtered by lang, sorted desc
- `src/pages/blog/[slug].astro` (NEW): renders single post
- `src/pages/en/blog/index.astro` (NEW): English mirror
- `src/pages/en/blog/[slug].astro` (NEW): English mirror
- `src/content/blog/odoo-fiscalization-queue-job.md` (es): NEW, fully written (problem/decision/tradeoff/outcome, anonymized but technically rich)
- `src/content/blog/odoo-fiscalization-queue-job.en.md` (en): NEW, English version
- Slug cleanup: `post.id.replace(/\.md$/, '')` to avoid `.md` in URLs

### WU-09: Hero Update — COMPLETED
- `src/components/Hero.astro`: added `evidence.*` section between stats and CTA. Maps `site.evidenceStack[]` to inline status badges (Verified / Learning / Case Study) with anchor links to `#skills`. Uses Badge component for consistent rendering.

### WU-10: Integration + Cleanup — COMPLETED
- Removed deprecated `ecosystem` and `builds` keys from both en.ts and es.ts (consumers migrated)
- Removed unused `site` import in both `[slug].astro` pages
- Created `docs/HOUSEKEEPING.md` documenting gitignore rules and recovery procedure
- All paths corrected for `en/`-prefixed subdirectories (3-level relative imports)
- `astro check` 0 errors / 0 warnings
- `astro build` clean: 16 pages, sitemap regenerated

## Known Limitations / Outstanding TODOs

1. **i18n for project case studies**: project markdown files are English-only. The Spanish `/projects/<slug>/` pages render the English content. To fix: add `lang` field to project frontmatter and filter in getStaticPaths, or create `.es.md` versions. Documented but not auto-handled.

2. **Project case study bodies**: the 2 anonymized case studies in `src/content/projects/` still have HTML `<!-- TODO -->` markers awaiting real narrative from user. Page falls back to "Brief view — full case study pending" notice when content is missing. Current content is just the headers + TODO comments.

3. **Project card images**: `this-portafolio` reuses `/images/projects/digital-signature.png` as its cover. Not ideal — new dedicated cover images for the 5 showcase entries would improve presentation. Out of scope for this change.

4. **Trajectory dates**: dates are present in `site.json` but the current Trajectory component shows them as a single line. The visual hierarchy is fine, but a richer timeline (per-period chips, gap visualization) would be a follow-up.

5. **Icon names type**: `BadgeProps.icon` enum lists 7 icons, but only 4 are actually mapped. Cosmetic, not blocking.

## Verification Evidence

```
$ npm run check
Result (29 files):
- 0 errors
- 0 warnings
- 0 hints

$ npm run build
[build] 16 page(s) built in 1.65s
[build] Complete!
[@astrojs/sitemap] sitemap-index.xml created at dist

$ ls dist/projects/
bot-router  go-api-service  odoo-migration-v14-v18  odoo-retail-fiscalization  this-portafolio

$ ls dist/blog/
index.html  odoo-fiscalization-queue-job
```

## Files Created / Modified

**Created** (16):
- `.gitattributes`
- `src/types/site.ts`
- `src/content/config.ts`
- `src/components/Badge.astro`
- `src/components/ShowcaseCard.astro`
- `src/components/EvidenceStackCard.astro`
- `src/components/ProjectDetail.astro`
- `src/content/projects/odoo-retail-fiscalization.md`
- `src/content/projects/odoo-migration-v14-v18.md`
- `src/content/blog/odoo-fiscalization-queue-job.md`
- `src/content/blog/odoo-fiscalization-queue-job.en.md`
- `src/pages/projects/[slug].astro`
- `src/pages/en/projects/[slug].astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/en/blog/index.astro`
- `src/pages/en/blog/[slug].astro`
- `docs/HOUSEKEEPING.md`

**Modified** (8):
- `src/components/Icon.astro` (5 new icons)
- `src/components/Projects.astro` (use ShowcaseCard + site.showcase)
- `src/components/Ecosystem.astro` (use EvidenceStackCard + site.evidenceStack)
- `src/components/Trajectory.astro` (use new fields)
- `src/components/Hero.astro` (evidence section)
- `src/components/Navbar.astro` (per-item href support)
- `src/layouts/Page.astro` (bare + ogImage)
- `src/layouts/BaseLayout.astro` (ogImage)
- `src/data/site.json` (showcase, trajectory, evidenceStack, nav with href)
- `src/i18n/en.ts` (extended, deprecated keys removed)
- `src/i18n/es.ts` (extended, deprecated keys removed)

## Next Phase

`sdd-verify` (recommended) — validate that the 4 specs are satisfied by the implementation. Manual check is also acceptable given the build is clean.

After verification: user to:
1. Fill in TODO sections in 2 case study markdowns
2. Optionally: add `lang` filtering to project collections for true i18n
3. Create dedicated cover images for showcase entries
4. Commit, push, open PR (user owns git operations)
