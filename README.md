# Gridline Portfolio Template

A clean, minimalist, and modular developer portfolio template built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **TypeScript**. Features dashed grid borders, synthesized audio micro-interactions, an interactive contribution heatmap, and dark mode.

---

## Features

- **Architectural Grid Aesthetic**: Clean 690px centered container with repeating linear-gradient dashed borders, dot-grid hero banner, and subtle divider accents.
- **Audio Feedback**: Synthesized clicks and ticks powered by the Web Audio API with zero audio file dependencies and a persistent mute toggle.
- **Activity Calendar**: Interactive contribution heatmap visualizing coding activity.
- **Single-File Configuration**: Customize 100% of your portfolio content, links, bio, projects, and experiences in `portfolio.config.ts` (or `src/data/portfolio.ts`).
- **Dark & Light Mode**: Smooth theme toggle with system preference fallback and instant flash-free initialization.
- **Tech Stack Grid**: Interactive skills section with Devicon SVG integration and search shortcuts.
- **SEO & Performance Ready**: Static generation via Next.js App Router, zero layout shifts, and responsive across mobile, tablet, and desktop.

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/GabrielBaiano/gridline-portifolio-template.git
cd gridline-portifolio-template
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the template in your browser.

---

## Customization

All portfolio data is decoupled from the UI components. Customize your site by editing:

👉 `portfolio.config.ts` (or `src/data/portfolio.ts`)

```typescript
export const portfolioData = {
  personal: {
    name: "Your Name",
    role: "Your Role",
    statusBadge: "Available for Projects",
    avatar: "/images/logo/avatar.jpg",
    bio: [
      "Your bio line 1...",
      "Your bio line 2...",
    ],
    email: "your.email@example.com",
    calendarUrl: "https://cal.com/yourhandle",
  },
  socials: [
    { name: "GitHub", url: "https://github.com/yourhandle", icon: "github" },
    { name: "Twitter", url: "https://x.com/yourhandle", icon: "twitter" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourhandle", icon: "linkedin" },
  ],
  // ...projects, experiences, wikis, blogs, and skills
};
```

---

## Scripts

| Command | Action |
| --- | --- |
| `pnpm dev` | Starts local Next.js dev server on port 3000 |
| `pnpm build` | Builds optimized production bundle |
| `pnpm start` | Runs the production build locally |

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FGabrielBaiano%2Fgridline-portifolio-template)

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. The default Next.js build settings will automatically configure and deploy.

---

## Roadmap & Integrations

- See [TODO.md](TODO.md) for the architecture plan of the automated Google Calendar & Meet scheduling bot.

---

## License

This project is open source and available under the [MIT License](LICENSE).
