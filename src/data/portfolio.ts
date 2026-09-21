export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "twitter" | "weibo" | "blog" | "douyin" | "bilibili" | "mail" | "calendar" | "linkedin" | "globe";
}

export interface Experience {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  logo?: string;
  bullets: string[];
  skills: string[];
}

export interface ProjectItem {
  name: string;
  slug?: string;
  status: "Live" | "Building";
  label: string;
  description: string;
  longDescription?: string[];
  screenshot: string;
  bgImage: string;
  websiteUrl?: string;
  githubUrl?: string;
  postUrl?: string;
  stack?: string[];
}

export interface WikiItem {
  title: string;
  date: string;
  claps?: number;
  tags?: string[];
  url?: string;
}

export interface BlogArticleSection {
  heading?: string;
  paragraphs: string[];
  code?: {
    language: string;
    code: string;
  };
  callout?: {
    icon?: string;
    text: string;
  };
}

export interface BlogPostItem {
  slug: string;
  title: string;
  date: string;
  readTime?: string;
  claps?: number;
  tags?: string[];
  url?: string;
  image?: string;
  summary: string;
  sections: BlogArticleSection[];
}

export interface SkillItem {
  name: string;
  icon?: string;
  letter?: string;
  search: string;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    role: string;
    statusBadge: string;
    subtitles?: string[];
    avatar: string;
    bio: string[];
    email?: string;
    calendarUrl?: string;
  };
  socials: SocialLink[];
  experiences: Experience[];
  projects: ProjectItem[];
  wikis: WikiItem[];
  blogs: BlogPostItem[];
  skills: SkillItem[];
  quote: {
    text: string;
    author: string;
  };
}

export const portfolioData: PortfolioConfig = {
  personal: {
    name: "Gabriel Nascimento",
    role: "Frontend Software Engineer",
    statusBadge: "Open Source Contributor",
    subtitles: [
      "Frontend Software Engineer",
      "Open Source Contributor",
      "UI/UX & Web Developer"
    ],
    avatar: "/images/logo/avatar.jpg",
    bio: [
      "Hey, I'm Gabriel, a frontend software engineer dedicated to building clean, accessible web applications and developer tooling where design, precision, and performance meet.",
      "Coding with the persistence of a Soulslike player. Specialized in React, Next.js, TypeScript, reactive SVG architectures, and design systems.",
      "Passionate about open-source contribution, micro-interactions, sound-enhanced interfaces, and clean UI engineering."
    ],
    email: "gabrielngama@gmail.com",
    calendarUrl: "https://cal.com/gabrielbaiano",
  },

  socials: [
    { name: "GitHub", url: "https://github.com/GabrielBaiano", icon: "github" },
    { name: "Twitter", url: "https://x.com/GabrielBaiano", icon: "twitter" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/gabriel-gama-6301633b2/", icon: "linkedin" },
    { name: "Email", url: "mailto:gabrielngama@gmail.com", icon: "mail" },
  ],

  experiences: [
    {
      company: "Flash",
      role: "Frontend Software Engineer (Mid-level)",
      type: "Tempo integral",
      period: "Jun 2025 - Ago 2026 · 1 ano 3 meses",
      location: "São Paulo, Brasil · Híbrido",
      bullets: [
        "Designed and implemented scalable frontend architecture using React.js, Next.js, and TypeScript with Micro Frontends",
        "Improved Core Web Vitals and reduced page load time by 40% using lazy loading, code splitting, and bundle optimization",
        "Developed and maintained a Design System with reusable components, ensuring accessibility (a11y) and responsive design",
        "Implemented unit and integration tests using Jest and React Testing Library",
        "Built and maintained CI/CD pipelines using GitHub Actions",
        "Collaborated with backend teams on REST API integration, API contracts, and application observability"
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Micro Frontends", "Jest", "CI/CD", "GitHub Actions", "Linux"]
    },
    {
      company: "Compass UOL",
      role: "Mobile Developer Intern",
      type: "Estágio",
      period: "Out 2024 - Abr 2025 · 7 meses",
      location: "São Paulo, Brasil · Remoto",
      bullets: [
        "Developed cross-platform mobile applications using React Native and TypeScript",
        "Implemented navigation, async data handling, and API integration",
        "Delivered pixel-perfect UI and smooth animations aligned with design systems",
        "Worked in Agile/Scrum environments with version control using Git/GitHub"
      ],
      skills: ["React Native", "TypeScript", "React.js", "Git", "Scrum"]
    },
    {
      company: "TECHSOLUTION",
      role: "Frontend Developer",
      type: "Tempo integral",
      period: "Mai 2023 - Nov 2024 · 1 ano 7 meses",
      location: "Curitiba, Paraná, Brasil · Remoto",
      bullets: [
        "Built scalable web applications using React.js, TypeScript, HTML, and CSS",
        "Implemented BFF (Backend for Frontend) using Node.js and Prisma ORM, improving data flow efficiency by 15%",
        "Managed complex application state using Redux and Context API",
        "Integrated RESTful APIs and contributed to full feature lifecycle (development, testing, deployment)"
      ],
      skills: ["React.js", "TypeScript", "Node.js", "Prisma ORM", "Redux", "REST APIs"]
    }
  ],

  projects: [
    {
      name: "pure-svg-charts",
      slug: "pure-svg-charts",
      status: "Live",
      label: "Open Source Library",
      description: "Lightweight, accessible, and reactive SVG chart primitives for React and Next.js without heavy canvas dependencies.",
      longDescription: [
        "pure-svg-charts is an accessible, high-performance charting library built entirely on native SVG elements for React and Next.js applications.",
        "Engineered with zero third-party visualization dependencies, it provides sub-millisecond render times, O(1) DOM node counts with dynamic hover dots, strict TypeScript autocomplete generics, and automatic responsive layout observation via ResizeObserver.",
        "Features shaded background zones, dark mode compatibility, and built-in Retina 2x PNG and SVG image export."
      ],
      screenshot: "/images/project/screenshots/pure-svg-charts.svg",
      bgImage: "/images/project/background/bg-gradient-1.svg",
      websiteUrl: "https://github.com/GabrielBaiano/pure-svg-charts",
      githubUrl: "https://github.com/GabrielBaiano/pure-svg-charts",
      stack: ["React", "TypeScript", "Next.js", "SVG", "TailwindCSS"]
    },
    {
      name: "gridline-portifolio-template",
      slug: "gridline-portifolio-template",
      status: "Live",
      label: "Portfolio Template",
      description: "A clean, modern developer portfolio template featuring dashed borders, sound effects, contribution graph, and dark mode.",
      longDescription: [
        "Gridline Portfolio Template is an architectural developer portfolio crafted with Next.js 15, React 19, and Tailwind CSS.",
        "It introduces an engineering-inspired visual identity with dashed borders, dot-grid banners, interactive Web Audio API click/tick micro-interactions, and a GitHub-style contribution calendar.",
        "All user content, social profiles, projects, blogs, and experiences are decoupled into a single configuration file for instant customization and one-click Vercel deployments."
      ],
      screenshot: "/images/project/screenshots/gridline-template.svg",
      bgImage: "/images/project/background/bg-gradient-2.svg",
      websiteUrl: "https://github.com/GabrielBaiano/gridline-portifolio-template",
      githubUrl: "https://github.com/GabrielBaiano/gridline-portifolio-template",
      stack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Web Audio API"]
    },
    {
      name: "EBBC-OpenData",
      slug: "ebbc-opendata",
      status: "Live",
      label: "Scientific Web Platform",
      description: "Public open data API and platform providing scientometrics, metadata, and analytics for academic research.",
      longDescription: [
        "EBBC OpenData is a public data platform and RESTful API that aggregates, indexes, and visualizes scientometric data from the Encontro Brasileiro de Bibliometria e Cientometria.",
        "Allows researchers to explore metadata, author collaboration networks, keyword trends, institutional metrics, and publication histories.",
        "Built to foster Open Science practices and enable quantitative bibliometric studies."
      ],
      screenshot: "/images/project/screenshots/ebbc-opendata.svg",
      bgImage: "/images/project/background/bg-gradient-3.svg",
      websiteUrl: "https://ebbcopendata.vercel.app/",
      githubUrl: "https://github.com/GabrielBaiano/EBBC-OpenData",
      stack: ["JavaScript", "React", "Node.js", "Open Data", "REST API"]
    },
    {
      name: "tabnews-release-publisher",
      slug: "tabnews-release-publisher",
      status: "Live",
      label: "Automation Tool",
      description: "Automated GitHub release publisher with AI translation and markdown parsing for developer communities.",
      longDescription: [
        "tabnews-release-publisher automates publishing GitHub repository release notes directly to the Brazilian developer platform TabNews.",
        "Integrates intelligent LLM translation into Portuguese while preserving 100% of markdown formatting, code snippets, badge links, and release semantics.",
        "Can be executed as a GitHub Action or local CLI tool to streamline developer community announcements."
      ],
      screenshot: "/images/project/screenshots/tabnews-publisher.svg",
      bgImage: "/images/project/background/bg-gradient-4.svg",
      websiteUrl: "https://github.com/GabrielBaiano/tabnews-release-publisher",
      githubUrl: "https://github.com/GabrielBaiano/tabnews-release-publisher",
      stack: ["TypeScript", "Node.js", "GitHub Actions", "OpenAI API"]
    },
  ],

  wikis: [],

  blogs: [
    {
      slug: "nextjs-15-architecture-server-actions",
      title: "Next.js 15 & Architecture: Server Actions and Partial Prerendering",
      date: "Sep 2026",
      readTime: "5 min read",
      claps: 14,
      tags: ["Next.js", "React 19", "Architecture", "Performance"],
      url: "/blog/nextjs-15-architecture-server-actions",
      summary: "A deep dive into scalable frontend architecture using Next.js 15, React 19 Server Actions, and Partial Prerendering (PPR) for high-performance web applications.",
      sections: [
        {
          heading: "The Shift to React 19 and Next.js 15",
          paragraphs: [
            "With Next.js 15 and React 19 now in general availability, the mental model for full-stack frontend architecture has matured. The earlier friction between client-side state and server components has crystallized into a clean separation of concerns: heavy compute, data fetching, and security-critical operations live on the server, while client components are reserved for genuinely interactive DOM primitives.",
            "One of the most consequential changes in Next.js 15 is the deprecation of aggressive default request caching. In Next.js 14, `fetch` requests were cached by default unless specified otherwise. In Next.js 15, requests are uncached by default (`cache: 'no-store'`), eliminating subtle stale data bugs in production dashboards."
          ],
          callout: {
            icon: "💡",
            text: "Explicit caching is now the golden rule. Use `unstable_cache` or route segment configs when you deliberately want persistence, rather than relying on framework magic."
          }
        },
        {
          heading: "Eliminating API Boilerplate with Server Actions",
          paragraphs: [
            "Before Server Actions, updating a single record required authoring a route handler (`/api/records/route.ts`), configuring request validation, writing a client-side fetcher with SWR or React Query, and managing loading states manually.",
            "With Server Actions, the mutation function is colocated with your feature logic. Using React 19's `useActionState` and `useFormStatus`, we achieve native progressive enhancement with full type inference across the network boundary."
          ],
          code: {
            language: "typescript",
            code: `'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const UpdateProfileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(280),
});

export async function updateProfile(prevState: unknown, formData: FormData) {
  const parsed = UpdateProfileSchema.safeParse({
    name: formData.get('name'),
    bio: formData.get('bio'),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await db.user.update({ where: { id: userId }, data: parsed.data });
  revalidatePath('/profile');
  return { success: true };
}`
          }
        },
        {
          heading: "Partial Prerendering (PPR) in Production",
          paragraphs: [
            "Partial Prerendering combines the speed of static site generation (SSG) with the dynamism of server-side streaming. The static shell—including navigation, hero banners, and dashed container layouts—is served immediately from edge CDNs.",
            "Dynamic holes wrapped in `<Suspense>` stream in asynchronously over the same HTTP response. For high-traffic portfolios and e-commerce platforms, this yields sub-100ms Time to First Byte (TTFB) while preserving personalized real-time user data."
          ]
        }
      ]
    },
    {
      slug: "building-reactive-charts-pure-svg",
      title: "Building Reactive Charts with Pure SVG and React",
      date: "Jul 2026",
      readTime: "7 min read",
      claps: 7,
      tags: ["SVG", "React", "TypeScript", "Performance"],
      url: "/blog/building-reactive-charts-pure-svg",
      summary: "Why and how we built pure-svg-charts with zero canvas or third-party visualization dependencies, achieving sub-millisecond renders and accessible DOM nodes.",
      sections: [
        {
          heading: "Why Avoid Heavy Canvas and Chart Libraries?",
          paragraphs: [
            "When building performance-sensitive frontends, importing Chart.js, D3, or ECharts often introduces 150KB–400KB of minified JavaScript. Canvas-based charts also treat your data as a black box of pixels, forfeiting semantic accessibility, clean dark-mode CSS variable integration, and sharp rendering across high-DPI displays.",
            "We wanted an alternative: a chart primitive library written strictly in SVG, with zero runtime dependencies, O(1) DOM overhead, and native responsive scaling through SVG's built-in `viewBox` coordinate system."
          ]
        },
        {
          heading: "The Geometry: Bezier Curves & Coordinate Mapping",
          paragraphs: [
            "To render smooth cubic bezier lines without external math dependencies, we map raw data tuples `[x, y]` into a normalized SVG bounding box. For any series of points, cubic control points are calculated using Catmull-Rom or cardinal spline interpolation.",
            "Because SVG elements are standard DOM nodes, styling themes is as effortless as `fill=\"var(--brand)\"` and `stroke=\"var(--border)\"`. Dark mode switches happen instantaneously with 0 milliseconds of JavaScript re-computation."
          ],
          code: {
            language: "typescript",
            code: `export function generateBezierPath(points: [number, number][]): string {
  if (points.length < 2) return '';
  return points.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return \`M \${x} \${y}\`;
    const [prevX, prevY] = arr[i - 1];
    const cpX = (prevX + x) / 2;
    return \`\${acc} C \${cpX} \${prevY}, \${cpX} \${y}, \${x} \${y}\`;
  }, '');
}`
          },
          callout: {
            icon: "⚡",
            text: "By using SVG viewBox dimensions (e.g. 0 0 600 200), charts scale smoothly from mobile viewports to 4K displays without blurring or manual canvas resolution re-rendering."
          }
        },
        {
          heading: "Accessibility by Default",
          paragraphs: [
            "Every generated chart outputs `<desc>` and `<title>` elements with detailed summary statistics. Keyboard navigability allows screen reader users to tab across individual data points and inspect numerical values natively."
          ]
        }
      ]
    },
    {
      slug: "mastering-typescript-generics",
      title: "Mastering TypeScript Generics and Clean Architecture",
      date: "Jul 2026",
      readTime: "6 min read",
      claps: 5,
      tags: ["TypeScript", "JavaScript", "React", "Architecture"],
      url: "/blog/mastering-typescript-generics",
      summary: "Practical generic constraints, mapped types, and conditional typing patterns for designing robust frontend architecture without excessive type gymnastics.",
      sections: [
        {
          heading: "The Pragmatic Boundary of Generics",
          paragraphs: [
            "Generics are one of TypeScript's most celebrated features, yet they are frequently misused. Over-engineered generic types often degrade editor LSP performance, generate opaque compiler errors, and create steep cognitive friction for teams.",
            "Senior frontend engineering is about finding the pragmatic sweet spot: writing generics that amplify developer productivity, ensure strict API contracts, and fade into the background during everyday feature work."
          ]
        },
        {
          heading: "Type-Safe API Contracts and Response Unwrapping",
          paragraphs: [
            "A common pattern in production React applications is standardizing API client responses. By combining generic constraints with conditional unwrapping, we guarantee that consumers cannot access payload properties without first narrowing the success state."
          ],
          code: {
            language: "typescript",
            code: `export type ApiResponse<T> =
  | { success: true; data: T; timestamp: number }
  | { success: false; error: { code: string; message: string } };

export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.error ?? { code: 'HTTP_ERR', message: res.statusText } };
    }
    return { success: true, data: json as T, timestamp: Date.now() };
  } catch (err) {
    return { success: false, error: { code: 'NETWORK_ERR', message: (err as Error).message } };
  }
}`
          },
          callout: {
            icon: "🛡️",
            text: "Favor discriminating unions over optional nullables. Discriminated unions force compiler-checked exhaustiveness and eliminate runtime 'cannot read property of undefined' errors."
          }
        }
      ]
    },
    {
      slug: "claude-code-agentic-workflow-engineering",
      title: "Claude Code & Agentic Workflow Engineering",
      date: "Mar 2026",
      readTime: "6 min read",
      claps: 19,
      tags: ["AI", "Agents", "Next.js", "Automation"],
      url: "/blog/claude-code-agentic-workflow-engineering",
      summary: "Engineering deterministic software development workflows with agentic AI tooling, terminal loops, and automated verification.",
      sections: [
        {
          heading: "Beyond Conversational Code Generation",
          paragraphs: [
            "The shift from conversational AI coding assistants to autonomous agentic tools represents a paradigm leap in software engineering. Instead of asking for code snippets and pasting them by hand, modern agentic environments operate directly in the workspace: inspecting directories, running lint suites, executing tests, and verifying runtime DOM states.",
            "However, agents are only as reliable as their verification loop. Without strict feedback mechanisms, agents risk accumulating subtle regressions."
          ]
        },
        {
          heading: "Deterministic Verification Pipelines",
          paragraphs: [
            "In our development setup, we institute three automated checkpoints before declaring any task complete:",
            "1. Static type checking with `tsc --noEmit` and build bundle analysis with `next build`.",
            "2. Headless browser inspection via the Chrome DevTools Protocol (CDP) to measure actual layout bounding rects and verify pixel symmetry.",
            "3. Automated runtime error interceptors that trap unhandled exceptions and console warnings across all routes."
          ],
          callout: {
            icon: "🤖",
            text: "Treat agentic AI like an enthusiastic mid-level developer: provide crystal-clear design constraints, enforce automated test gates, and verify the resulting work before committing."
          }
        }
      ]
    },
    {
      slug: "high-precision-svg-visualizations",
      title: "High-Precision SVG Visualizations without Heavy Canvas",
      date: "Feb 2026",
      readTime: "5 min read",
      claps: 11,
      tags: ["SVG", "Frontend", "Math", "Zero-Dependency"],
      url: "/blog/high-precision-svg-visualizations",
      summary: "A quantitative comparison between HTML5 Canvas and native SVG for developer dashboards, DOM node budgeting, and crisp rendering across high-DPI displays.",
      sections: [
        {
          heading: "Canvas vs. SVG: The Performance Reality",
          paragraphs: [
            "A common myth in web development is that `<canvas>` is always faster than SVG. While canvas shines when rendering 100,000 continuous particles in 60fps WebGL simulations, typical developer dashboards render between 50 and 500 data points.",
            "Within this range, SVG consistently outperforms Canvas in perceptual responsiveness, memory footprint, and CSS theme integration."
          ]
        },
        {
          heading: "Retina Scaling and Zero-Memory Overhead",
          paragraphs: [
            "To make a `<canvas>` look sharp on an Apple Retina screen, you must scale its width and height by `window.devicePixelRatio` (usually 2x or 3x) and multiply the canvas 2D context by the scale factor. This quadruples the backing bitmap memory buffer.",
            "SVG requires zero pixel buffers. Vector math renders directly through GPU rasterization pipelines at native display resolution, consuming negligible RAM."
          ]
        }
      ]
    },
    {
      slug: "micro-interactions-audio-ux",
      title: "Micro-interactions & Audio UX with Web Audio API",
      date: "Jan 2026",
      readTime: "4 min read",
      claps: 8,
      tags: ["Web Audio API", "UX", "Micro-interactions"],
      url: "/blog/micro-interactions-audio-ux",
      summary: "Implementing tactile sound effects directly via synthetic audio waveforms, avoiding static MP3 network requests and delivering zero-latency feedback.",
      sections: [
        {
          heading: "Tactile Digital Physicality",
          paragraphs: [
            "Software feels more tangible when visual feedback is coupled with auditory confirmation. However, traditional approaches to web sound—loading external `.mp3` or `.wav` files—introduce network latency, audio decode delays, and mobile autoplay restrictions.",
            "By synthesizing mechanical click and tick waveforms using the Web Audio API (`AudioContext`), we achieve instantaneous sub-5ms feedback with zero asset downloads."
          ],
          code: {
            language: "typescript",
            code: `export function playSyntheticTick(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.03);
}`
          }
        }
      ]
    },
    {
      slug: "scalable-design-systems-tailwind",
      title: "Scalable Design Systems with Tailwind CSS & CSS Variables",
      date: "Nov 2025",
      readTime: "5 min read",
      claps: 12,
      tags: ["Design Systems", "TailwindCSS", "CSS", "Theming"],
      url: "/blog/scalable-design-systems-tailwind",
      summary: "Structuring design token primitives with CSS variables and Tailwind utility mapping for instant, flicker-free dark mode and consistent spacing scales.",
      sections: [
        {
          heading: "Decoupling Tokens from Utility Classes",
          paragraphs: [
            "Hardcoding hex colors like `bg-[#181818]` across dozens of components creates tech debt that slows refactors to a crawl. A scalable design system declares high-level tokens in root CSS variables (`:root` and `.dark`), mapping them cleanly into `tailwind.config.ts`.",
            "This enables immediate global theme changes, seamless dark mode transitions, and architectural consistency across all pages and subpages."
          ]
        }
      ]
    },
    {
      slug: "automated-github-releases-tabnews",
      title: "Automated GitHub Release Publisher for Developer Communities",
      date: "Oct 2025",
      readTime: "4 min read",
      claps: 9,
      tags: ["Automation", "Open Source", "CLI", "Node.js"],
      url: "/blog/automated-github-releases-tabnews",
      summary: "Automating GitHub release notifications and markdown translation to TabNews using GitHub Actions, LLM prompt engineering, and resilient REST clients.",
      sections: [
        {
          heading: "Connecting Developer Workflows to Communities",
          paragraphs: [
            "Publishing software releases manually across developer portals is repetitive and error-prone. `tabnews-release-publisher` automates this entire lifecycle by capturing GitHub release webhooks, preserving code formatting, and translating technical release summaries seamlessly."
          ]
        }
      ]
    }
  ],

  skills: [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", search: "React JS" },
    { name: "Next", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", search: "Next.js" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", search: "TypeScript" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", search: "JavaScript" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", search: "Tailwind CSS" },
    { name: "Node", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", search: "Node.js" },
    { name: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg", search: "Vue.js" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", search: "Express.js" },
    { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg", search: "NestJS" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", search: "MongoDB" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", search: "Redis" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", search: "Postman" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", search: "Docker" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", search: "Linux" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", search: "Git" },
    { name: "Github", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", search: "GitHub" },
    { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", search: "Vercel" },
    { name: "VSCode", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", search: "VS Code" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", search: "Figma" },
    { name: "shadcn", letter: "S", search: "shadcn/ui" },
    { name: "Zustand", letter: "Z", search: "Zustand" },
    { name: "Motion", letter: "M", search: "Framer Motion" },
  ],

  quote: {
    text: "Do so much work that it would be unreasonable for you to not be successful.",
    author: "Alex Hormozi"
  }
};
