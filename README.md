# Portfolio — Armando Rojas

> https://rojasarmando.com

![GitHub stars](https://img.shields.io/github/stars/rojasarmando/portafolio)
![GitHub forks](https://img.shields.io/github/forks/rojasarmando/portafolio)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/rojasarmando/portafolio/commits/master)
[![Website](https://img.shields.io/badge/website-up-blue)](https://rojasarmando.com)
[![Ask Me Anything !](https://img.shields.io/badge/ask%20me-linkedin-1abc9c.svg)](https://www.linkedin.com/in/rojasarmando/)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

Personal portfolio site: bilingual (EN/ES) with a dark "System Architect" design, built with Astro 5 and Tailwind CSS 4. Fully static output with zero framework JavaScript.

## Features

- Astro 5 — static output
- Tailwind CSS 4
- Bilingual EN/ES with locale routing (`/` English, `/es/` Spanish)
- Self-hosted fonts (Manrope, JetBrains Mono)
- SEO ready: Open Graph, Twitter cards, sitemap
- View transitions, reduced-motion aware animations
- Fully responsive with mobile navigation

## Requirements

- Node.js ≥ 20 (developed with Node 24 via nvm)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run check` | Type-check `.astro` files |

## Structure

```
src/
├── components/   # Navbar, Hero, Ecosystem, Trajectory, Projects, Cta, Footer
├── data/         # site.json (links, stats, tags, video)
├── i18n/         # en.ts, es.ts dictionaries + utils
├── layouts/      # BaseLayout (SEO), Page
├── pages/        # index.astro (EN), es/index.astro (ES)
└── styles/       # global.css (Tailwind v4 theme)
public/
├── images/       # local project images
└── cv/           # downloadable CV
```

## Deployment

`npm run build` produces a fully static `dist/` served at [rojasarmando.com](https://rojasarmando.com).

## License

MIT — see [LICENSE](./LICENSE).

**Armando Rojas** — Systems Engineer

- GitHub: [rojasarmando](https://github.com/rojasarmando)
- LinkedIn: [rojasarmando](https://www.linkedin.com/in/rojasarmando)
- Email: [armando.develop@gmail.com](mailto:armando.develop@gmail.com)

**Other languages:** [Español](docs/README.es.md) · [Français](docs/README.fr.md) · [Português](docs/README.pt.md) · [中文](docs/README.zh.md)
