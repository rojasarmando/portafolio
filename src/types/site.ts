/**
 * Single source of truth for content shape across the portfolio.
 * Imported by components, i18n dictionaries, and content collections.
 *
 * Rule: no `any`. Every field is explicit so the type-checker and
 * content-collections runtime both agree on shape.
 */

// ---- Badge / status vocabulary ----

export const BADGE_STATUSES = ['verified', 'anonymized', 'learning', 'archived'] as const;
export type BadgeStatus = (typeof BADGE_STATUSES)[number];

/** Default aria / visible label for a given status. */
export const STATUS_LABEL: Record<BadgeStatus, string> = {
  verified: 'Verified',
  anonymized: 'Case Study',
  learning: 'Next Focus',
  archived: 'Archived'
};

/** Tailwind v4-compatible color tokens per status (JIT-safe via static strings). */
export const STATUS_COLOR: Record<BadgeStatus, string> = {
  verified: 'emerald-500',
  anonymized: 'slate-400',
  learning: 'amber-400',
  archived: 'zinc-500'
};

// ---- Showcase entry (project card on the homepage) ----

export const SHOWCASE_TYPES = ['public', 'live-demo', 'anonymized', 'learning-roadmap'] as const;
export type ShowcaseType = (typeof SHOWCASE_TYPES)[number];

/** Order weight used by the homepage grid: lower numbers render first. */
export const SHOWCASE_ORDER: Record<ShowcaseType, number> = {
  public: 1,
  'live-demo': 2,
  anonymized: 3,
  'learning-roadmap': 99
};

export interface ShowcaseLink {
  label: string;
  href: string;
  kind: 'repo' | 'demo' | 'post';
}

export interface ShowcaseEntry {
  /** Stable identifier; used for slugs, fallback pages, prev/next. */
  id: string;
  /** Localization key inside `dict.showcase.cards[id]`. */
  titleKey: string;
  /** Short summary shown on the card. */
  descriptionKey: string;
  /** Status badge — drives color, label, and verification signal. */
  status: BadgeStatus;
  /** How to display the entry. Controls ordering. */
  type: ShowcaseType;
  /** Lower numbers render first within the same type. */
  order: number;
  /** Tags surfaced as chips on the card. */
  tags: readonly string[];
  /** Optional cover image (under /images/projects/). */
  image?: string;
  /** Optional explicit links rendered on the card and detail page. */
  links?: readonly ShowcaseLink[];
  /** Path of the matching content collection entry, if it exists. */
  contentSlug?: string;
}

// ---- Trajectory (work history timeline) ----

export interface TrajectoryRecord {
  /** Company / organization. */
  company: string;
  /** Job title shown next to the company. */
  role: string;
  /** ISO date (YYYY-MM) or free-form period text. */
  startDate: string;
  /** ISO date (YYYY-MM). Omitted when `current` is true. */
  endDate?: string;
  /** True when this is the present role. */
  current?: boolean;
  /** One-line summary of what the role covered. */
  scope: string;
  /** Quantified or qualitative outcomes ("shipped X", "led Y people"). */
  keyOutcomes: readonly string[];
  /** Stack chips surfaced on the detail / hover. */
  stack: readonly string[];
}

// ---- Evidence stack (formerly "ecosystem") ----

export type EvidenceStackId = 'core' | 'erp' | 'cloud' | 'ai';

export interface EvidenceRepo {
  label: string;
  href: string;
  status: BadgeStatus;
}

export interface EvidenceStackItem {
  id: EvidenceStackId;
  /** Localization key inside `dict.evidenceStack.cards[id]`. */
  labelKey: string;
  /** i18n key for the long-form description. */
  descriptionKey: string;
  /** Aggregate badge status — worst-of repos is fine here. */
  status: BadgeStatus;
  /** Years of professional use, e.g. "4+ yrs". */
  years: string;
  /** Public-facing repos or services inside this stack. */
  repos: readonly EvidenceRepo[];
  /** Tailwind v4-friendly accent tokens for the icon tile. */
  accent: 'primary' | 'emerald' | 'amber' | 'slate';
  /** Icon name matching keys in Icon.astro. */
  icon: 'terminal' | 'building' | 'cloud' | 'brain';
}

// ---- Badge component props ----

export interface BadgeProps {
  status: BadgeStatus;
  /** Override the default `STATUS_LABEL[status]`. */
  label?: string;
  /** Optional leading icon name (matches Icon.astro keys). */
  icon?: 'verified' | 'play' | 'atSign' | 'terminal' | 'building' | 'cloud' | 'brain';
  /** Visual size. Default `sm`. */
  size?: 'sm' | 'md';
  /** Optional URL surfaced as a tooltip / link target. */
  repoUrl?: string;
}

// ---- Link entry (generic nav / footer link) ----

export interface LinkEntry {
  label: string;
  href: string;
  external?: boolean;
}