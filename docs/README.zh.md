# 作品集 — Armando Rojas

> https://rojasarmando.com

![GitHub stars](https://img.shields.io/github/stars/rojasarmando/portafolio)
![GitHub forks](https://img.shields.io/github/forks/rojasarmando/portafolio)
[![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/rojasarmando/portafolio/commits/master)
[![Website](https://img.shields.io/badge/website-up-blue)](https://rojasarmando.com)
[![Ask Me Anything !](https://img.shields.io/badge/ask%20me-linkedin-1abc9c.svg)](https://www.linkedin.com/in/rojasarmando/)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

个人作品集网站：双语（英文/西班牙文），采用深色“系统架构师”设计，基于 Astro 5 和 Tailwind CSS 4 构建。完全静态输出，零框架 JavaScript。

## 特性

- Astro 5 — 静态输出
- Tailwind CSS 4
- 英文/西班牙文双语，按语言路由（`/` 英文，`/es/` 西班牙文）
- 自托管字体（Manrope、JetBrains Mono）
- SEO 就绪：Open Graph、Twitter 卡片、sitemap
- 视图过渡，动画遵循 `prefers-reduced-motion`
- 完全响应式，含移动端导航

## 环境要求

- Node.js ≥ 20（使用 nvm 的 Node 24 开发）

## 快速开始

```bash
npm install
npm run dev
```

打开 http://localhost:4321

## 脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 将静态站点构建到 `dist/` |
| `npm run preview` | 预览生产构建 |
| `npm run check` | 对 `.astro` 文件进行类型检查 |

## 目录结构

```
src/
├── components/   # Navbar、Hero、Ecosystem、Trajectory、Projects、Cta、Footer
├── data/         # site.json（链接、统计数据、标签、视频）
├── i18n/         # en.ts、es.ts 词典 + utils
├── layouts/      # BaseLayout（SEO）、Page
├── pages/        # index.astro（英文）、es/index.astro（西班牙文）
└── styles/       # global.css（Tailwind v4 主题）
public/
├── images/       # 项目本地图片
└── cv/           # 可下载的简历
```

## 部署

`npm run build` 生成完全静态的 `dist/`，部署于 [rojasarmando.com](https://rojasarmando.com)。

## 许可证

MIT — 参见 [LICENSE](../LICENSE)。

**Armando Rojas** — 系统工程师

- GitHub：[rojasarmando](https://github.com/rojasarmando)
- LinkedIn：[rojasarmando](https://www.linkedin.com/in/rojasarmando)
- 邮箱：[armando.develop@gmail.com](mailto:armando.develop@gmail.com)

**其他语言：** [English](../README.md) · [Español](README.es.md) · [Français](README.fr.md) · [Português](README.pt.md)
