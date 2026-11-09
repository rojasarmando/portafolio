---
title: 'Odoo fiscalization: por qué queue_job ganó la carrera'
excerpt: 'Comparativa real entre Celery, cron y queue_job (OCA) para sincronización fiscal en una cadena retail de 50 tiendas. La decisión no fue sobre rendimiento, fue sobre operación.'
lang: 'es'
status: 'anonymized'
publishedOn: 2024-12-01
tags: ['Odoo', 'Python', 'Fiscal Compliance', 'Architecture']
---

## El problema

Una cadena retail con 50 tiendas emitía documentos fiscales contra un proveedor externo certificado por hacienda. El proceso corría como batch nocturno: cada madrugada, un cron recorría las ventas del día anterior, validaba contra el proveedor y emitía los comprobantes. Latencia end-to-end: 4 horas. Para 50.000 facturas diarias en horarios pico, eso significaba que un comprobante podía llegar 28 horas después de la venta.

## La decisión técnica

Evaluamos tres opciones reales, no teóricas:

- **Cron + script Python** — lo que ya teníamos. Funcionaba, pero rompía bajo picos.
- **Celery + Redis** — el estándar de la industria. Probable sobrediseño para este caso.
- **queue_job (OCA) + PostgreSQL** — específico para Odoo, sin infra nueva, retry/backoff nativos, dependencias entre jobs como ciudadanos de primera clase.

queue_job ganó por una razón que no se ve en benchmarks: las dependencias entre jobs. El flujo real es "validar → firmar → transmitir → consultar estado". Si el job 2 falla, el job 3 no debe correr. Celery exige modelar eso con chains explícitos. queue_job lo declara con `depends_on=` en el decorador.

## El tradeoff

queue_job acopla la cola a la base de datos de Odoo. Eso significa que un Postgres saturado bloquea también la cola. En un sistema con mucha escritura fiscal eso es un riesgo real. Lo aceptamos porque: (1) ya operábamos Postgres con HA, (2) la base ya era el cuello de botella real, no podíamos esconderlo, (3) monitorear un solo componente es más simple que monitorear dos.

## El resultado medido

- Latencia: 4h → 12 minutos en P95
- Throughput: 50.000 facturas/día sostenidas en pico
- Disponibilidad: 99.97% en los primeros 6 meses
- Tiempo de operación: bajó ~70% porque el retry y la idempotencia vinieron gratis

## Qué cambiaría

Si volviera a empezar, instrumentaría desde día uno con `prometheus_client` y exportaría métricas por tipo de job. Lo hicimos en el segundo mes, pero perdimos visibilidad del primer mes y nunca pudimos explicar tres incidentes de los que solo teníamos logs.
