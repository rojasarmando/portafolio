# Housekeeping

Engineering hygiene rules for this repository. These are enforced via `.gitignore` and `.gitattributes` at the root.

## Tracked vs untracked

The following directories are **untracked** by design — they are build artifacts or dependencies:

- `node_modules/` — npm dependencies; install with `npm ci`
- `dist/` — `astro build` output; regenerate with `npm run build`
- `.astro/` — Astro's internal cache; safe to delete any time

If any of these appear in `git status` as untracked, that is expected. If they appear as **tracked**, that is a regression — see "Fix a regression" below.

## Local environment

Never commit:

- `.env`, `.env.local`, `.env.*.local` — local secrets
- `*.log` — runtime logs
- `.DS_Store` — macOS metadata
- `.vscode/`, `.idea/` — editor state (per-user)

## Line endings

`.gitattributes` normalizes text files to LF. Do not introduce CRLF in commits.

## Fix a regression

If a build artifact is tracked by mistake:

```bash
git rm --cached -r dist node_modules .astro
git commit -m "chore: untrack build artifacts"
```

## Verification before PR

```bash
npm run check    # type-check
npm run build    # full build (regenerates sitemap)
```
