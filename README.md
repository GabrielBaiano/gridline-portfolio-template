<p align="center">
  <img src="public/images/logo/template-icon.png" alt="Gridline Portfolio Template Logo" width="180"/>
</p>

<h1 align="center">Gridline Portfolio Template</h1>

<p align="center">
  <strong>Minimalist architectural developer portfolio with synthesized Web Audio, activity heatmap, and retro minigames.</strong><br>
  <em>Built with Next.js 15 (App Router), React 19, Tailwind CSS, and TypeScript.</em>
</p>

<p align="center">
  <a href="README.md">🇺🇸 English</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="README.pt.md">🇧🇷 Português</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://gabrielbaiano.vercel.app/" target="_blank">🌐 Live Demo</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GabrielBaiano/gridline-portfolio-template/generate">⚡ Use Template</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/GabrielBaiano/gridline-portfolio-template/archive/refs/heads/main.zip">📦 Download ZIP</a>
</p>

<p align="center">
  <a href="https://github.com/GabrielBaiano/gridline-portfolio-template/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/GabrielBaiano/gridline-portfolio-template?style=flat-square" alt="License">
  </a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js 15">
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript" alt="TypeScript">
  <a href="https://github.com/GabrielBaiano/gridline-portfolio-template/stargazers">
    <img src="https://img.shields.io/github/stars/GabrielBaiano/gridline-portfolio-template?style=social" alt="GitHub stars">
  </a>
</p>

---

<p align="center">
  <a href="https://gabrielbaiano.vercel.app/" target="_blank">
    <strong>🌐 Live Preview: https://gabrielbaiano.vercel.app/</strong>
  </a>
</p>

**Gridline Portfolio Template** is an engineering-first personal website template structured around a 690px architectural drafting grid with dashed borders, zero-latency Web Audio sound synthesis, static contribution heatmaps, and hidden canvas minigames.

> 📚 **Project Evolution**: Designed as a high-density, low-clutter alternative to generic SaaS-style portfolios, prioritizing zero-dependency browser APIs (Web Audio synthesis, SVG charts, Server Components) over heavy client-side bundles.

## 🎓 Main Features

* **Architectural Grid Layout**: Centered 690px container bounded by fine dashed border grids (`repeating-linear-gradient`) and interactive dot-grid canvas banners.
* **In-Memory Web Audio Synthesizer**: Zero external MP3 or audio asset dependencies. Micro-sounds generated at runtime via PCM `AudioBuffer` synthesis for hover ticks, mechanical clicks, toggles, clap chimes, and limit buzzers.
* **Server-Rendered Activity Calendar**: GitHub-style contribution heatmap generated at build time as a React Server Component (0 KB client bundle overhead) with smooth auto-scroll to latest dates on mobile and desktop.
* **Technical Blog with Code Highlighting**: Dedicated routes (`/blog/[slug]`), copy-to-clipboard code blocks, reading time estimates, full RSS feed (`/feed.xml`), and dynamic `sitemap.xml`.
* **Tactile Clap Counter & Live Visitor Metrics**: Interactive clapping with floating `+1` particles and tactile error shake on reaching the 10-clap limit. Real-time visitor counter with optional Upstash Redis persistence.
* **Canvas Retro Easter Eggs**:
  * **Snake Game**: Triple-click the top header banner to play with keyboard arrows/WASD or mobile touch swipes.
  * **Space Invaders**: Triple-click the footer banner to defend against animated alien waves with lasers, spark particles, live score, and sound effects.
* **Direct Meeting Booking**: Integrated "Book a call" action linking directly to your [Cal.com](https://cal.com) calendar.
* **Dark & Light Mode**: Clean theme toggle persisted in `localStorage` with system preference detection.

## 🛠️ Technologies Used

* **Framework**: Next.js 15 (App Router, Turbopack, React Server Components)
* **Language**: TypeScript 5
* **Styling**: Tailwind CSS, PostCSS
* **Icons**: Lucide React
* **Persistence (Optional)**: Upstash Redis (`@upstash/redis`) for global stats

## 🚀 Quick Start & Download

### 📥 3 Ways to Get Started

1. **GitHub Template (Recommended)**: Click **[Use this template](https://github.com/GabrielBaiano/gridline-portfolio-template/generate)** to scaffold a clean copy directly into your GitHub account.
2. **Scaffold via Degit**:
   ```bash
   npx degit GabrielBaiano/gridline-portfolio-template my-portfolio
   cd my-portfolio
   pnpm install
   ```
3. **Download ZIP Package**:
   - Download the latest template archive: **[gridline-portfolio-template.zip](https://github.com/GabrielBaiano/gridline-portfolio-template/archive/refs/heads/main.zip)**
   - Unpack and install dependencies: `pnpm install`

### 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/GabrielBaiano/gridline-portfolio-template.git

# Enter project directory
cd gridline-portfolio-template

# Install dependencies
pnpm install

# Run locally
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 📦 Create Offline Distribution Package

To bundle a clean ZIP package of the template locally without `.git` or build artifacts:

```bash
pnpm package
```

## 🌐 Customization

All personal information, experiences, projects, blog articles, and social links are managed in a single configuration file:

👉 **`src/data/portfolio.ts`** (also mirrored as `portfolio.config.ts`)

### Configuration Sections:

- **`personal`**:
  - `name`: Your display name.
  - `role`: Professional headline (e.g. `Full-Stack Engineer`).
  - `avatar`: Profile image path (e.g. `/images/logo/avatar.jpg`).
  - `statusBadge`: Current status tag (e.g. `Open for opportunities`).
  - `bio`: Multi-paragraph bio introduction.
  - `email`: Direct contact email.
  - `calendarUrl`: Cal.com booking link (leave empty `""` to hide the booking button).
- **`socials`**: Links to GitHub, LinkedIn, X, Telegram, email, and personal sites.
- **`experiences`**: Career history items with dates, company, role, bullet accomplishments, and technology chips.
- **`projects`**: Featured projects with screenshots, labels, live demo links, repository URLs, and write-ups.
- **`blogs`**: Technical articles with sections, code blocks, reading time, and tags.
- **`skills`**: Categorized skill pills (Languages, Frameworks, Cloud, Databases).

## ☁️ Deployment (Vercel)

Deploying to Vercel takes less than two minutes:

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New... > Project**.
3. Import your `gridline-portfolio-template` repository.
4. Set the following environment variables (in **Project Settings > Environment Variables**):

```ini
# Canonical URL for SEO, sitemap.xml, and RSS feed
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Optional: Upstash Redis for persisting views and claps across serverless restarts
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...
```

5. Click **Deploy**.

> **Upstash Redis Setup**: Without Redis keys, visitor counts and claps use an in-memory fallback. For permanent global persistence across serverless cold starts, create a free database on [Upstash](https://upstash.com) (or via the Vercel Marketplace integration) and paste the REST credentials into Vercel.

## 🎮 Easter Eggs

Both dot-grid canvas banners hide interactive arcade minigames:

- **Snake Game (Header Banner)**: Fast triple-click (3 clicks within 750ms) on the top dot banner. Control via `Arrow Keys` / `WASD` on desktop or touch gestures on mobile. Press `Esc` to exit.
- **Space Invaders (Footer Banner)**: Fast triple-click on the footer dot banner. Control cannon with `← / →` or mouse drag, fire with `Space` or click. Includes alien waves, score tracking, shield collisions, and synthesized audio.

## 💻 Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts local Next.js development server on port 3000 |
| `pnpm build` | Compiles optimized production build with static generation |
| `pnpm start` | Runs production build locally |
| `pnpm package` | Generates a clean standalone template ZIP package |
| `pnpm tsc --noEmit` | Runs TypeScript static type checking without emitting files |

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/GabrielBaiano" target="_blank">GabrielBaiano</a>
</p>
