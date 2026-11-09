---
title: 'Odoo fiscalization: why queue_job won the race'
excerpt: 'A real comparison between Celery, cron, and queue_job (OCA) for fiscal sync across a 50-store retail chain. The decision was not about performance — it was about operations.'
lang: 'en'
status: 'anonymized'
publishedOn: 2024-12-01
tags: ['Odoo', 'Python', 'Fiscal Compliance', 'Architecture']
---

## The problem

A retail chain with 50 stores issued fiscal documents against an external provider certified by the tax authority. The process ran as a nightly batch: every morning, a cron walked through the previous day's sales, validated them against the provider, and issued the receipts. End-to-end latency: 4 hours. For 50,000 invoices a day at peak, a receipt could land 28 hours after the sale.

## The technical decision

We evaluated three real options, not theoretical ones:

- **Cron + Python script** — what we already had. It worked, but it broke under peaks.
- **Celery + Redis** — the industry standard. Likely overkill for this case.
- **queue_job (OCA) + PostgreSQL** — specific to Odoo, no new infra, native retry/backoff, dependencies between jobs as first-class citizens.

queue_job won for a reason benchmarks do not show: dependencies between jobs. The real flow is "validate → sign → transmit → poll status." If job 2 fails, job 3 must not run. Celery forces you to model that with explicit chains. queue_job declares it with `depends_on=` on the decorator.

## The tradeoff

queue_job couples the queue to the Odoo database. That means a saturated Postgres also blocks the queue. In a system with heavy fiscal writes that is a real risk. We accepted it because: (1) we already operated Postgres with HA, (2) the database was already the real bottleneck, we could not hide it, (3) monitoring one component is simpler than monitoring two.

## The measured outcome

- Latency: 4h → 12 minutes at P95
- Throughput: 50,000 invoices/day sustained at peak
- Availability: 99.97% over the first 6 months
- Operational time: down ~70% because retry and idempotency came for free

## What I would change

If I started over, I would instrument from day one with `prometheus_client` and export metrics by job type. We did it in the second month, but lost visibility for the first month and could never explain three incidents for which we only had logs.
