# Portfólio — Armando Rojas

> https://rojasarmando.com

![GitHub stars](https://img.shields.io/github/stars/rojasarmando/portafolio)
![GitHub forks](https://img.shields.io/github/forks/rojasarmando/portafolio)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/rojasarmando/portafolio/commits/master)
[![Website](https://img.shields.io/badge/website-up-blue)](https://rojasarmando.com)
[![Ask Me Anything !](https://img.shields.io/badge/ask%20me-linkedin-1abc9c.svg)](https://www.linkedin.com/in/rojasarmando/)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

Site de portfólio pessoal: bilíngue (EN/ES) com um design escuro de "Arquiteto de Sistemas", construído com Astro 5 e Tailwind CSS 4. Saída totalmente estática, sem JavaScript de frameworks.

## Características

- Astro 5 — saída estática
- Tailwind CSS 4
- Bilíngue EN/ES com rotas por idioma (`/` inglês, `/es/` espanhol)
- Fontes auto-hospedadas (Manrope, JetBrains Mono)
- SEO pronto: Open Graph, Twitter cards, sitemap
- Transições de view, animações que respeitam `prefers-reduced-motion`
- Totalmente responsivo com navegação móvel

## Requisitos

- Node.js ≥ 20 (desenvolvido com Node 24 via nvm)

## Início rápido

```bash
npm install
npm run dev
```

Abra http://localhost:4321

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila o site estático em `dist/` |
| `npm run preview` | Visualiza a build de produção |
| `npm run check` | Verifica os tipos dos arquivos `.astro` |

## Estrutura

```
src/
├── components/   # Navbar, Hero, Ecosystem, Trajectory, Projects, Cta, Footer
├── data/         # site.json (links, estatísticas, tags, vídeo)
├── i18n/         # dicionários en.ts, es.ts + utils
├── layouts/      # BaseLayout (SEO), Page
├── pages/        # index.astro (EN), es/index.astro (ES)
└── styles/       # global.css (tema Tailwind v4)
public/
├── images/       # imagens locais dos projetos
└── cv/           # CV para download
```

## Implantação

`npm run build` produz um `dist/` totalmente estático servido em [rojasarmando.com](https://rojasarmando.com).

## Licença

MIT — veja [LICENSE](../LICENSE).

**Armando Rojas** — Engenheiro de Sistemas

- GitHub: [rojasarmando](https://github.com/rojasarmando)
- LinkedIn: [rojasarmando](https://www.linkedin.com/in/rojasarmando)
- Email: [armando.develop@gmail.com](mailto:armando.develop@gmail.com)

**Outros idiomas:** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [中文](README.zh.md)
