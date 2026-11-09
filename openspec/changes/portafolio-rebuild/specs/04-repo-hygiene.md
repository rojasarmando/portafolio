# Spec 04 — Repo Hygiene

## Purpose
Remove committed artifacts that signal lack of engineering hygiene to senior reviewers, and document the hygiene rules for future contributors.

## Scope
**In scope**: `.gitignore` update, untracking committed build artifacts via `git rm --cached`, `.gitattributes` creation, and a `docs/HOUSEKEEPING.md` note.
**Out of scope**: Rewriting commit history (no `--force` pushes), removing PDFs from `public/cv/` (intentional asset), reorganizing unrelated tracked files.

## Requirements

### REQ-04-1: Gitignore contents
THE `.gitignore` file SHALL include the following entries: `dist/`, `node_modules/`, `.astro/`, `.env`, `.env.local`, `.DS_Store`, `*.log`.

#### Scenario: Each pattern blocks tracking
GIVEN `.gitignore` contains all required patterns
WHEN `git check-ignore` is run against each of `dist/`, `node_modules/`, `.astro/`, `.env`, `.env.local`, `.DS_Store`, `app.log`
THEN every path MUST be reported as ignored.

### REQ-04-2: Untrack committed artifacts
THE working tree SHALL run `git rm --cached -r dist node_modules .astro` (with explicit user confirmation before execution) to remove these directories from the index without deleting them from disk.

#### Scenario: Artifacts removed from index, kept on disk
GIVEN the directories `dist/`, `node_modules/`, `.astro/` are committed
WHEN `git rm --cached -r dist node_modules .astro` runs
THEN `git ls-files | grep -E '^(dist|node_modules|\.astro)/'` MUST return zero results
AND the directories MUST still exist on disk.

### REQ-04-3: Clean git status
WHEN `git status` is run after cleanup, THE result SHALL show no `dist/`, `node_modules/`, or `.astro/` entries (untracked or tracked).

#### Scenario: Post-cleanup status is clean
GIVEN cleanup has run
WHEN `git status --porcelain | grep -E '(dist|node_modules|\.astro)'` is executed
THEN the command MUST return no output.

### REQ-04-4: Build and check still pass
THE `astro.config.ts` SHALL remain valid AND `npm run check` AND `npm run build` SHALL both succeed after cleanup.

#### Scenario: Build still works
GIVEN cleanup is complete
WHEN `npm run build` runs
THEN it MUST complete with exit code 0
AND `npm run check` MUST report zero TypeScript / Astro errors.

### REQ-04-5: Gitattributes file
A `.gitattributes` file SHALL be added at the repo root, marking common text files (`*.md`, `*.ts`, `*.astro`, `*.json`, `*.yml`) as text and normalizing line endings.

#### Scenario: Text files normalized
GIVEN `.gitattributes` is in place
WHEN `git attributes --check` runs against a text file
THEN the file MUST be classified as text
AND CRLF/LF inconsistencies across contributors SHALL be normalized at commit time.

### REQ-04-6: Housekeeping documentation
A `docs/HOUSEKEEPING.md` file SHALL document the hygiene rules for future contributors: what MUST NOT be committed, how to run cleanup, and how to verify cleanliness.

#### Scenario: Doc covers required topics
GIVEN `docs/HOUSEKEEPING.md`
WHEN reviewed
THEN it MUST mention `dist/`, `node_modules/`, `.astro/`, `.env*` as forbidden tracked content
AND MUST include the `git rm --cached -r dist node_modules .astro` cleanup command
AND MUST include a `git status --porcelain` verification snippet.

## Constraints
- NO force-pushes and NO history rewrites — cleanup MUST be done with `git rm --cached` only.
- The implementation MUST prompt for confirmation before `git rm --cached`.
- PDFs in `public/cv/` MUST remain tracked (intentional asset, explicitly out of scope).

## Verification
- `git status` is clean of artifacts (REQ-04-3 check passes).
- `npm run build` and `npm run check` both pass (REQ-04-4 check passes).
- `docs/HOUSEKEEPING.md` exists and contains all required topics.

## Dependencies
- None. Repo hygiene is independent of the content/data-model specs.