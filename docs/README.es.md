# Portafolio — Armando Rojas

> https://rojasarmando.com

![GitHub stars](https://img.shields.io/github/stars/rojasarmando/portafolio)
![GitHub forks](https://img.shields.io/github/forks/rojasarmando/portafolio)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/rojasarmando/portafolio/commits/master)
[![Website](https://img.shields.io/badge/website-up-blue)](https://rojasarmando.com)
[![Ask Me Anything !](https://img.shields.io/badge/ask%20me-linkedin-1abc9c.svg)](https://www.linkedin.com/in/rojasarmando/)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

Sitio web de portafolio personal: bilingüe (EN/ES) con un diseño oscuro de "Arquitecto de Sistemas", construido con Astro 5 y Tailwind CSS 4. Salida completamente estática, sin JavaScript de frameworks.

## Características

- Astro 5 — salida estática
- Tailwind CSS 4
- Bilingüe EN/ES con rutas por idioma (`/` español, `/en/` inglés)
- Fuentes autoalojadas (Manrope, JetBrains Mono)
- SEO listo: Open Graph, Twitter cards, sitemap
- Transiciones de vista, animaciones que respetan `prefers-reduced-motion`
- Totalmente responsivo con navegación móvil

## Requisitos

- Node.js ≥ 20 (desarrollado con Node 24 vía nvm)

## Inicio rápido

```bash
npm install
npm run dev
```

Abre http://localhost:4321

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye el sitio estático en `dist/` |
| `npm run preview` | Previsualiza la build de producción |
| `npm run check` | Verifica tipos de los archivos `.astro` |

## Estructura

```
src/
├── components/   # Navbar, Hero, Ecosystem, Trajectory, Projects, Cta, Footer
├── data/         # site.json (enlaces, estadísticas, etiquetas, video)
├── i18n/         # diccionarios en.ts, es.ts + utils
├── layouts/      # BaseLayout (SEO), Page
├── pages/        # index.astro (ES), en/index.astro (EN)
└── styles/       # global.css (tema Tailwind v4)
public/
├── images/       # imágenes locales de proyectos
└── cv/           # CV descargable
```

## Despliegue

`npm run build` produce un `dist/` completamente estático servido en [rojasarmando.com](https://rojasarmando.com).

## Docker

```bash
docker compose up -d --build
```

Sirve la build de producción con nginx en http://localhost:8080.

## Licencia

MIT — ver [LICENSE](../LICENSE).

**Armando Rojas** — Ing. Sistema

- GitHub: [rojasarmando](https://github.com/rojasarmando)
- LinkedIn: [rojasarmando](https://www.linkedin.com/in/rojasarmando)
- Correo: [armando.develop@gmail.com](mailto:armando.develop@gmail.com)

**Otros idiomas:** [English](../README.md) · [Français](README.fr.md) · [Português](README.pt.md) · [中文](README.zh.md)
