# Exploration Report — portafolio-rebuild

## 1. Current Portfolio State

**Stack detected**
- Astro 5.12 static site, TypeScript strict, Tailwind v4 via Vite plugin
- Sitemap integration; i18n `es`/`en` with `prefixDefaultLocale: false`
- Docker: nginx 1.27-alpine serving `/` and `/armando-cv.pdf`
- Deploy: `Dockerfile` + `docker-compose.yml` + `nginx.conf`

**Pages**
- `src/pages/index.astro` (root, default locale `es`)
- `src/pages/en/index.astro` (English mirror)
- No dynamic routes, no project detail pages, no blog

**Components** (8)
- `Hero.astro`, `Navbar.astro`, `Cta.astro`, `Footer.astro`
- `Ecosystem.astro` (stack tags)
- `Trajectory.astro` (3 companies)
- `Projects.astro` (renders `site.builds[]`)
- `Icon.astro` (shared SVG icon helper)

**Data model** — `src/data/site.json`
- `name`, `email`, `linkedin`, `github`
- `nav[]` (4 anchors)
- `stats[]` — values "6+", "30+", "Senior"
- `ecosystem[]` — 4 cards (core / erp / cloud / ai) with `tags[]`
- `trajectory[]` — 3 companies, only `company` field present (no role, dates, scope)
- `builds[]` — 3 items, `image` + `tags[]` only. **Two entries point to the same image** (`digital-signature.png`). No links to repos, no demos.

**i18n**
- `src/i18n/en.ts`, `es.ts`, `utils.ts`
- Copy exists for: meta, hero, ecosystem, trajectory, builds, cta, footer, nav
- No translations for `fr`/`pt`/`zh` despite `docs/README.{fr,pt,zh}.md` existing at repo root

**Deploy story**
- Multi-stage Dockerfile (node:20-alpine build → nginx:1.27-alpine runtime)
- nginx serves `/usr/share/nginx/html` from `/`
- `armando-cv.pdf` in `public/cv/` is served directly

**`.gitignore` gaps** (HIGH severity)
- `dist/`, `node_modules/`, `.astro/` are committed to the repo
- These inflate the repo and signal lack of hygiene to senior reviewers

## 2. GitHub Evidence Map

Public repos observed via `?tab=repositories` and `?page=2` (57 source repos, 84 total including forks/archived).

### Odoo / ERP ecosystem — STRONG
| Repo | Status | Evidence value |
|---|---|---|
| `enterprise` (Python, Jan 2026) | Recent, repo name itself signals Odoo enterprise work | High — likely Odoo custom module |
| `service-store` (Nov 2025) | Recent | Medium — service-oriented code |
| `asistencia` (Python, Feb 2023) | Mature | Medium — attendance/scheduling Python |
| `custom_websocket_frappe` (Python, Jun 2022) | Mature | Medium — Frappe framework integration |
| `ms-jasper` (PHP, Aug 2022) | Mature | Low (PHP not in stack) |
| `inventory-nextjs-nestjs-ia` / `inventory-nextjs-nestjs` (Oct 2024) | Recent | Medium — inventory + NestJS |
| `todo-app-django` (Python, May 2024) | Recent | Low-medium |
| `shopping_cart_api_django` (Python, Jan 2024) | Recent | Medium |

**Verdict**: Solid Python/ERP base. The `enterprise` repo is the showcase candidate.

### FastAPI / Python APIs — MEDIUM
| Repo | Status | Evidence value |
|---|---|---|
| `bot-router` (Python, Dec 2023) | Mature | Medium |
| `api-books` (Python, Dec 2023) | Mature | Medium |
| `clinica-api` (Python, Oct 2020) | Mature | Low (older) |

**Verdict**: No explicit FastAPI showcase. The repos are Python services but not labeled FastAPI. Likely Django/Flask. **Honest gap**: FastAPI expertise is not directly evidenced.

### Go — NONE / HONEST GAP
- Zero Go repos in the source list
- `loader-wii` is Rust, not Go
- `api-rust` is Rust
- **Verdict**: NO public Go evidence. Claiming "expert in Go" is currently unsupported.

### Full-stack JS / TypeScript — MEDIUM
| Repo | Status | Evidence value |
|---|---|---|
| `portafolio` (this repo) | Active | High — Astro + i18n + Tailwind v4 |
| `school-grading-system` (TS, Aug 2026) | Very recent | Medium |
| `helpers-kj` (TS, Mar 2026) | Recent | Medium |
| `inventory-nextjs-nestjs-ia` (Oct 2024) | Recent | Medium |
| `shopping-cart-ionic` (TS, Jan 2024) | Mature | Medium |
| `calc` (TS, Aug 2026) | Very recent | Low |

**Verdict**: TS evidence exists. Astro is the live demo.

### Frontend / CSS — NOISE
- `Sopatizador` (CSS, sopa de letras) — pinned, but not senior-relevant
- `image-gallery` (CSS, Aug 2026) — small
- `dolar-bcv-monitor` (CSS, 2024) — small utility
- `landing-page` (HTML, 2021) — old

### Archived / Course / Archive noise
- `php-practices` (archived)
- `inventory-up` (PHP, 2025)
- `inventory` (PHP, 2019)
- `inventory` (PHP, 2019)
- `Courses-and-Pratices` (2022)
- `curso-react` (2024)
- `nestjs-course` (StackBlitz, 2022)
- `Practicas-Angular`, `PracticandoPython`, `Practicas-en-Turbo-Pascal`
- `vue-example`, `vue-form`
- `my-app-test-push`, `roman-numerals-c`, `cultura_pop_app`, `music-player-web`, `PlatziPics-ElectronJS`
- `survey` (PHP), `jasper-report-laravel-example` (PHP), `work` (PHP)
- `habladores` (JS), `radio` (JS), `blog` (HTML)
- `encryption` (Dec 2023), `python-example-class` (2021), `web-builder` (TS, 2021)
- `shopping_cart_flutter`, `shopping-cart-ionic`
- `d_random` (C++), `api-rust` (Rust), `loader-wii` (Rust)
- `template-readme`, `repository-template-general`, `shodan-ips`, `random-list-music`, `user-registry-spa`, `sopatizador-package`

**Verdict**: ~50 repos are courses, exercises, archived PHP, or noise. They dilute the signal.

## 3. Claim vs Reality Audit

| Claim (in portfolio or repo) | Evidence | Verdict |
|---|---|---|
| "6+ years" experience | Trajectory list covers AVANTEC.DS, INGEINT, Frontuari — verifiable via LinkedIn | Honest |
| "30+ deployments" | Not externally verifiable; reasonable if enterprise/Odoo work | Honest (claim plausible) |
| "Senior" level | Bio + LinkedIn says Tech Lead; consistent | Honest |
| "Python, FastAPI, Go" core | Python ✅ many repos. FastAPI ⚠ no public evidence. Go ❌ zero repos. | **Inflated on FastAPI/Go** |
| "Odoo (V14-V18)" | `enterprise` repo + trajectory strongly suggests | Honest |
| "PostgreSQL, Docker, CI/CD" | `Dockerfile`, `docker-compose.yml`, `nginx.conf` confirm Docker; Postgres unverified | Mostly honest |
| "Computer Vision, AI Agents, n8n" | No public evidence in source repos | Inflated |
| Portfolio pinned on profile alongside `Sopatizador`, `php-practices`, `Courses-and-Pratices` | Yes — this actively hurts senior signal | **Inflated self-presentation** |

## 4. User-Facing Gaps (what portfolio must show to DEMONSTRATE)

- [ ] Replace generic `builds[]` entries with 4–6 real projects: name, problem, role, stack, link to repo/demo, one metric each
- [ ] Section "Odoo Engineering" with module examples, versions V14–V18, models touched, integration patterns
- [ ] Section "FastAPI" — even with `bot-router` or `api-books` as case study, labeled honestly (FastAPI/Django/Flask unclear from name alone)
- [ ] Honest "Go" section OR removal of "Go" claim until public evidence exists
- [ ] Architecture case study end-to-end (1 project: problem → decision → tradeoff → measured result)
- [ ] Project detail pages (`/projects/[slug].astro`) with technical depth
- [ ] `.gitignore` clean: add `dist/`, `node_modules/`, `.astro/`, `.env`
- [ ] Re-pin GitHub: replace `Sopatizador`, `php-practices`, `Courses-and-Pratices` with `enterprise`, this portafolio, top 1–2 Python services
- [ ] i18n parity: `fr`/`pt`/`zh` mirrors in `src/i18n/` to match `docs/README.*.md` translations
- [ ] Architecture diagram(s) for at least 2 showcase projects
- [ ] Blog/cases section (`src/content/blog/`) with 2–3 short technical write-ups

## 5. Risks / Open Questions

- **Repo authentication required** to inspect `enterprise`, `service-store`, `bot-router`, `api-books`, `clinica-api` deeply — these are the candidates but their READMEs could not be parsed via webfetch here. Phase `sdd-propose` should NOT assume their content; user should confirm.
- **Privacy**: work projects at AVANTEC.DS / INGEINT / Frontuari may be proprietary. Architecture diagrams and metrics must be anonymized.
- **Go narrative risk**: removing "Go" is honest but weakens the stack badge. Creating a public Go service is the only way to re-earn that claim.
- **Review budget (400 lines)**: a content overhaul + new project detail pages + i18n parity + gitignore cleanup likely exceeds 400 lines. `sdd-tasks` will likely trigger the `ask-on-risk` gate.

## 6. Recommended Next Phase

**Phase**: `sdd-propose`
**Reason**: Exploration surfaced concrete evidence gaps AND a clear mismatch between claims and reality. A proposal must decide scope (rewrite content only? rebuild sections? new showcase repos? chained PRs?). The orchestrator already collected user preferences: show existing, case-study format, honest labeling — these belong in the proposal.

`next_recommended: sdd-propose`