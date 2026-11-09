# Spec 03 — Verification Badges

## Purpose
Honest signals that tell visitors which claims are verified, which are anonymized, and which are in progress — so the portfolio never misleads senior reviewers.

## Scope
**In scope**: The `Badge.astro` component, its TypeScript types, and its rendering rules across all consumers.
**Out of scope**: Visual design system for non-badge UI, icon library beyond what `Icon.astro` already provides.

## Requirements

### REQ-03-1: Badge component props
THE `src/components/Badge.astro` component SHALL accept props: `status` (one of `verified` | `anonymized` | `learning` | `archived`), `label` (string, defaults to the human-readable status name), `icon` (optional, passed through to `Icon.astro`), `size` (`sm` | `md`, default `sm`), and `repoUrl` (optional string for the verified-tooltip case).

#### Scenario: Default label derived from status
GIVEN a `<Badge status="verified" />` with no `label` prop
WHEN the component renders
THEN the rendered text MUST be the human-readable label for `verified` (e.g., "Verified")
AND MUST be internationalized using the active locale.

### REQ-03-2: Tailwind color mapping
THE badge SHALL apply Tailwind color classes by status: `verified` → emerald, `anonymized` → slate, `learning` → amber, `archived` → zinc.

#### Scenario: Color per status
GIVEN a badge with `status: verified`
WHEN the component renders
THEN the rendered HTML MUST include an emerald utility class (e.g., `bg-emerald-500/15` or equivalent)
AND MUST NOT include classes from any other status color group.

### REQ-03-3: Accessibility label
THE badge SHALL include an `aria-label` attribute that describes the status (not just the visible label).

#### Scenario: Screen reader announcement
GIVEN a badge with `status: anonymized` rendered on a page
WHEN the page is inspected with an accessibility tool
THEN the badge element MUST have a non-empty `aria-label` distinct from any decorative tooltip text.

### REQ-03-4: Icon prefix from Icon.astro
THE badge SHALL render an icon prefix from `src/components/Icon.astro` when the `icon` prop is provided.

#### Scenario: Icon rendered
GIVEN `<Badge status="verified" icon="check" />`
WHEN the component renders
THEN the rendered HTML MUST contain exactly one `<Icon>` instance with `name="check"`
AND the icon MUST visually precede the label.

### REQ-03-5: Verified badge tooltip with repo URL
WHEN a `verified` badge includes a `repoUrl` prop, THE badge component SHALL include a tooltip that exposes the repo URL (e.g., via `title` attribute or an accessible tooltip pattern).

#### Scenario: Tooltip present
GIVEN `<Badge status="verified" repoUrl="https://github.com/user/repo" />`
WHEN the badge renders
THEN the rendered element MUST expose the URL through a tooltip mechanism (`title` attribute or `aria-describedby` pointing to a tooltip node).

### REQ-03-6: Status enum exported as TypeScript union
THE status enum SHALL be exported as a TypeScript union type from `src/types/site.ts` (e.g., `export type BadgeStatus = 'verified' | 'anonymized' | 'learning' | 'archived'`).

#### Scenario: Type reuse
GIVEN `Badge.astro` and any consumer
WHEN either references the badge status
THEN both MUST import the type from `src/types/site.ts`
AND MUST NOT redeclare the union inline.

## Constraints
- Badge rendering logic MUST live in exactly one place: `src/components/Badge.astro`.
- No component MAY duplicate the status→color or status→label mapping inline.
- The status enum MUST be identical to the one used by the showcase schema (Spec 01) where applicable.

## Verification
- Visual review confirms correct color and icon per status.
- Keyboard navigation reaches the badge and the tooltip is announced via `aria-label` / `title`.
- `npm run check` (which runs `astro check`) passes.

## Dependencies
- Spec 01 (showcase entries reference these badges).
- Spec 02 (project detail page renders these badges).