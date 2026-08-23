# Portfolio — Armando Rojas

> https://rojasarmando.com

![GitHub stars](https://img.shields.io/github/stars/rojasarmando/portafolio)
![GitHub forks](https://img.shields.io/github/forks/rojasarmando/portafolio)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/rojasarmando/portafolio/commits/master)
[![Website](https://img.shields.io/badge/website-up-blue)](https://rojasarmando.com)
[![Ask Me Anything !](https://img.shields.io/badge/ask%20me-linkedin-1abc9c.svg)](https://www.linkedin.com/in/rojasarmando/)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

Site web de portfolio personnel : bilingue (EN/ES) avec un design sombre « Architecte Système », construit avec Astro 5 et Tailwind CSS 4. Sortie entièrement statique, sans JavaScript de framework.

## Caractéristiques

- Astro 5 — sortie statique
- Tailwind CSS 4
- Bilingue EN/ES avec routage par langue (`/` anglais, `/es/` espagnol)
- Polices auto-hébergées (Manrope, JetBrains Mono)
- SEO prêt : Open Graph, Twitter cards, sitemap
- Transitions de vue, animations respectant `prefers-reduced-motion`
- Entièrement responsif avec navigation mobile

## Prérequis

- Node.js ≥ 20 (développé avec Node 24 via nvm)

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrez http://localhost:4321

## Commandes

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Compile le site statique dans `dist/` |
| `npm run preview` | Prévisualise la build de production |
| `npm run check` | Vérifie les types des fichiers `.astro` |

## Structure

```
src/
├── components/   # Navbar, Hero, Ecosystem, Trajectory, Projects, Cta, Footer
├── data/         # site.json (liens, statistiques, tags, vidéo)
├── i18n/         # dictionnaires en.ts, es.ts + utils
├── layouts/      # BaseLayout (SEO), Page
├── pages/        # index.astro (EN), es/index.astro (ES)
└── styles/       # global.css (thème Tailwind v4)
public/
├── images/       # images locales des projets
└── cv/           # CV téléchargeable
```

## Déploiement

`npm run build` produit un `dist/` entièrement statique servi sur [rojasarmando.com](https://rojasarmando.com).

## Licence

MIT — voir [LICENSE](../LICENSE).

**Armando Rojas** — Ingénieur Système

- GitHub : [rojasarmando](https://github.com/rojasarmando)
- LinkedIn : [rojasarmando](https://www.linkedin.com/in/rojasarmando)
- Email : [armando.develop@gmail.com](mailto:armando.develop@gmail.com)

**Autres langues :** [English](../README.md) · [Español](README.es.md) · [Português](README.pt.md) · [中文](README.zh.md)
