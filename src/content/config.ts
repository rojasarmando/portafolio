/**
 * Astro content collections (Astro 5 `type: 'content'` API — NOT the new `loader: glob()`).
 * Single source of truth for the shape of `projects/` and `blog/` markdown entries.
 *
 * IMPORTANT: Zod enums are re-exported from `src/types/site.ts` so the runtime
 * vocabulary stays in lockstep with the TS types. If you add a status/type,
 * update `src/types/site.ts` first.
 */
import { defineCollection, z } from 'astro:content';
import { BADGE_STATUSES, SHOWCASE_TYPES } from '../types/site';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    status: z.enum(BADGE_STATUSES),
    type: z.enum(SHOWCASE_TYPES),
    order: z.number().int().default(10),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    publishedOn: z.coerce.date().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().url(),
          kind: z.enum(['repo', 'demo', 'post'])
        })
      )
      .default([]),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string()
        })
      )
      .default([])
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    lang: z.enum(['es', 'en']),
    status: z.enum(BADGE_STATUSES).default('verified'),
    publishedOn: z.coerce.date(),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { projects, blog };