<p align="center">
  <img src="public/images/logo/template-icon.png" alt="Gridline Portfolio Template" width="120"/>
</p>

# Gridline Portfolio Template

Minimalist developer portfolio with dashed architectural grid, Web Audio micro-interactions, contribution calendar, and retro canvas minigames. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

[English](README.md) · [Português](README.pt.md) · [Live Demo](https://gabrielbaiano.vercel.app/) · [Use Template](https://github.com/GabrielBaiano/gridline-portfolio-template/generate)

---

## Quick Start

To start with a clean template without personal data, clone the [`template`](https://github.com/GabrielBaiano/gridline-portfolio-template/tree/template) branch:

```bash
git clone -b template https://github.com/GabrielBaiano/gridline-portfolio-template.git my-portfolio
cd my-portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

All content (bio, social links, experiences, projects, blog articles, skills) is configured in a single file:

```
src/data/portfolio.ts
```

Edit this file to replace the placeholder data with your own.

## Features

- **Architectural Grid**: 690px container with dashed border styling and dot-grid canvas banners.
- **Web Audio FX**: Zero-dependency synthesized sound effects (ticks, clicks, chimes, limit alert).
- **Contribution Graph**: Responsive GitHub-style activity calendar.
- **Technical Blog**: Markdown-like sections, syntax-highlighted code blocks, and tactile clap counter.
- **Retro Easter Eggs**: Triple-click top banner for Snake; triple-click bottom banner for Space Invaders.
- **Dark Mode**: Persisted theme switch with system preference fallback.

## Deployment

Deploy directly to Vercel:

1. Push to your repository.
2. Import the project in Vercel.
3. (Optional) Set environment variables:
   - `NEXT_PUBLIC_SITE_URL`: Your custom production domain (for canonical SEO and RSS).
   - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis credentials to persist visitor count and claps across serverless restarts. If omitted, stats run in memory.

## License

[MIT](LICENSE)
