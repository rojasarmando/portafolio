# Proposal — portafolio-rebuild

## Why

A senior backend engineer cannot demonstrate Odoo/FastAPI/Go expertise with generic tagline text and 3 placeholder project cards. The current portfolio CLAIMS expertise; the GitHub evidence map shows it only partially supports those claims. The proposal rebalances the portfolio to DEMONSTRATE: anonymized case studies for private client work, honest case studies for public repos, and clear "what I'm building next" framing where public evidence is thin.

## What changes

**Content (in scope)**
- Replace generic `site.builds[]` with 4–6 curated showcase entries:
  - 2–3 Odoo case studies (private work, anonymized: client industry, scale, decision, outcome, metrics)
  - 1 Python API case study (using `bot-router` or `api-books` if FastAPI/Django/Flask confirmed; otherwise generic "Python API")
  - 1 Astro/full-stack case study (this portfolio as the live demo)
  - 1 "Next focus" entry for Go OR a tiny new public Go service
- Replace `site.trajectory[]` with full records: company, role, dates, scope, key outcomes
- Add 3 ecosystem tags per item: name, role, scope (years), one measurable outcome
- Add i18n copy parity for es/en (fr/pt/zh can be deferred)

**Structure (in scope)**
- New project detail pages: `src/pages/projects/[slug].astro`
- New content collection: `src/content/projects/` for case-study markdown
- New blog/cases section: `src/content/blog/` with 2–3 short technical write-ups (anonymized)
- New hero copy: clarify "Tech Lead" + actual stack with verification status badges

**Honesty labels (in scope)**
- Badge "In Production" only for repos with verifiable deploy evidence
- Badge "Case Study (Anonymized)" for private client work
- Badge "Learning / Building" for Go and any stack without public senior-level evidence
- Remove "30+ deployments" if not externally provable; replace with verifiable metric

**Hygiene (in scope)**
- Update `.gitignore` to exclude `dist/`, `node_modules/`, `.astro/`, `.env`
- Remove committed `dist/`, `node_modules/`, `.astro/` from history consideration (git rm --cached + clean working tree)

**Out of scope (this proposal)**
- Creating new public Go/FastAPI repos (separate change later)
- i18n for fr/pt/zh
- Reorganizing all 84 GitHub repos (user-owned action; portfolio references them)
- Switching framework (stays on Astro 5)

## Impact

**Stack claims after change**
- Odoo: ████████░░ (strong, evidence-rich)
- Python services: ██████░░░░ (medium, framework TBD per repo)
- FastAPI: ███░░░░░░░ (medium — depends on bot-router/api-books inspection; will be labeled honestly)
- Go: ██░░░░░░░░ (gap — labeled "Next focus" with roadmap)
- Full-stack JS/Astro: ███████░░░ (medium-high — this portfolio as demo)

**Affected files (estimate)**
- `src/data/site.json` — restructured
- `src/components/Projects.astro` — render new schema
- `src/components/Trajectory.astro` — render new fields
- `src/components/Hero.astro` — verification badges
- `src/i18n/{en,es}.ts` — new copy keys
- `src/pages/projects/[slug].astro` — NEW
- `src/content/{projects,blog}/**` — NEW collections
- `src/content/config.ts` — NEW collection schema
- `astro.config.ts` — content collections already supported
- `.gitignore` — add dist/, node_modules/, .astro/, .env
- `public/images/projects/*` — needs new assets (user input)

**Estimated diff size**
- Initial rough forecast: ~600–900 lines of new code/content
- **Triggers the `ask-on-risk` gate** (review budget 400 lines)
- User chose to be asked before apply

## Risk / Honest Truths

- Cannot verify framework (FastAPI vs Django vs Flask) for `bot-router`, `api-books`, `clinica-api` from public listing alone. Phase `sdd-spec` MUST either confirm or label generically.
- Anonymized case studies can NEVER show production code. The portfolio MUST compensate with depth in: problem framing, decision matrix, tradeoffs, measured outcomes. Without these, anonymized content reads like fluff.
- Go section without public evidence is a weak point. Two paths: (a) build a tiny public Go service in a follow-up change; (b) keep "Go" in roadmap only.
- Content collection requires asset support — projects without cover images will look broken. User must provide or generate.

## Alternatives considered

1. **Full rewrite from scratch in a different framework** (Next.js, SvelteKit): rejected — Astro is the right tool for a content-heavy portfolio with i18n, and rewriting throws away a working site.
2. **Skip Go entirely, focus on Odoo + Python**: rejected — user wants full-stack demonstration; better to label honestly and roadmap.
3. **Use AI-generated case studies for private work**: rejected — must be authored by user to be authentic; AI may draft structure only.
4. **Move all private work to anonymized public repos**: rejected — privacy/confidentiality concerns; client work is owned by clients.

## Open Questions for User (resolved)
- Q: Show existing or build new? → A: Show existing as case studies.
- Q: Private work treatment? → A: Anonymized case studies, no code.
- Q: Honest gaps? → A: Label Go as "Next focus" honestly.

## Resolved Decisions
- Artifact store: hybrid
- Delivery strategy: ask-on-risk
- Pace: auto
- Strict TDD: false (no test runner; verification via `astro check` + `astro build`)

## Next Phase
`sdd-spec` — write the delta specs:
- Spec A: Showcase data model (site.json schema + content collection schema)
- Spec B: Project detail page behavior
- Spec C: Honest verification badges logic
- Spec D: Gitignore + repo hygiene

---

## Delivery Forecast (from `sdd-tasks`)

**Review Workload Forecast** (added by `sdd-tasks` phase)

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
- **Decision needed before apply**: YES

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

**Delivery options presented** (cached delivery strategy: `ask-on-risk`):
- **A — 5 chained PRs (RECOMMENDED)**: PR-1 Foundation (~230), PR-2 i18n+data (~400), PR-3 Components (~200), PR-4 Pages (~400), PR-5 Hero+Integration (~180).
- **B — 1 PR with `size:exception`**: ~1600 lines, single review.
- **C — 3 thematic PRs with `size:exception` for over-budget PRs**.
- **D — 10 chained PRs, one per WU**.

**Chain strategy (not yet cached)**: must be collected from user if A or C is chosen — `stacked-to-main` vs `feature-branch-chain`.

**Open questions for the user before `sdd-apply`**:
1. Pick delivery option (A / B / C / D).
2. If A or C: pick chain strategy.
3. Confirm content author for anonymized case studies (user drafts vs skeleton-with-TODO).
4. Confirm Go decision: include `learning-roadmap` showcase entry now, or defer?

Full task breakdown: `openspec/changes/portafolio-rebuild/tasks.md`.