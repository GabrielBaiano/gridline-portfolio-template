export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "twitter" | "x" | "linkedin" | "instagram" | "youtube" | "discord" | "telegram" | "blog" | "mail" | "globe";
}

export interface Experience {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  logo?: string;
  color?: string;
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

export interface AppToolItem {
  name: string;
  description: string;
  tag?: string;
  icon?: string;
  iconBg?: string;
  iconFit?: "cover" | "contain";
  iconGradient?: string;
  iconType?: string;
  url?: string;
  githubUrl?: string;
}

export interface RepositoryItem {
  name: string;
  description: string;
  url: string;
  language?: string;
  stars?: number;
}

export type ToolItem = RepositoryItem;

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
  apps?: AppToolItem[];
  appsAndTools?: AppToolItem[];
  tools?: RepositoryItem[];
  repositories?: RepositoryItem[];
  wikis: WikiItem[];
  blogs: BlogPostItem[];
  skills: SkillItem[];
  quote: {
    text: string;
    author: string;
  };
  features?: {
    newsletter?: boolean;
  };
}

export const portfolioData: PortfolioConfig = {
  personal: {
    name: "Alex River",
    role: "Full-Stack Software Engineer",
    statusBadge: "Available for opportunities",
    subtitles: [
      "Full-Stack Software Engineer",
      "Open Source Contributor",
      "UI/UX & Web Developer"
    ],
    avatar: "/images/logo/template-icon.png",
    bio: [
      "Hello! I am a full-stack engineer passionate about crafting fast, accessible web applications and developer tools.",
      "Specialized in TypeScript, React, Next.js, and modern cloud architectures. Focused on clean code, performance, and intuitive user experiences.",
      "Active open source enthusiast, tinkerer, and continuous learner."
    ],
    email: "alex.river@example.com",
    calendarUrl: "",
  },

  socials: [
    { name: "GitHub", url: "https://github.com/your-username", icon: "github" },
    { name: "Twitter", url: "https://x.com/your-handle", icon: "x" },
    { name: "LinkedIn", url: "https://linkedin.com/in/your-profile", icon: "linkedin" },
    { name: "Email", url: "mailto:alex.river@example.com", icon: "mail" },
  ],

  experiences: [
    {
      company: "Acme Cloud",
      role: "Senior Frontend Engineer",
      type: "Full-time",
      period: "2024 - Present · 2 yrs",
      location: "San Francisco, CA · Remote",
      color: "#3B82F6",
      bullets: [
        "Architected and deployed responsive design system components across multi-tenant web applications",
        "Improved web performance and Core Web Vitals score by 35% through bundle splitting and asset caching",
        "Implemented end-to-end type safety across backend and frontend boundaries with TypeScript",
        "Mentored junior engineers and led weekly architectural RFC review sessions"
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Jest", "CI/CD"]
    },
    {
      company: "Pulse Systems",
      role: "Full-Stack Developer",
      type: "Full-time",
      period: "2022 - 2024 · 2 yrs",
      location: "New York, NY · Hybrid",
      color: "#10B981",
      bullets: [
        "Engineered scalable REST and GraphQL APIs serving high-concurrency client requests",
        "Designed PostgreSQL schema migrations, relational indexes, and query optimizations",
        "Integrated third-party payment gateways and webhook handling pipelines with 99.9% uptime",
        "Containerized development and staging environments using Docker and GitHub Actions"
      ],
      skills: ["Node.js", "TypeScript", "PostgreSQL", "Docker", "REST API", "Redis"]
    },
    {
      company: "Studio Zero",
      role: "Frontend Developer",
      type: "Full-time",
      period: "2021 - 2022 · 1 yr",
      location: "Austin, TX · Remote",
      color: "#8B5CF6",
      bullets: [
        "Built dynamic client dashboards and landing pages with micro-animations and responsive layouts",
        "Collaborated with product designers to implement WCAG 2.1 AA accessible UI primitives",
        "Maintained state management pipelines using Redux Toolkit and Context API"
      ],
      skills: ["React.js", "JavaScript", "HTML/CSS", "Git", "Figma"]
    }
  ],

  projects: [
    {
      name: "nebula-ui-kit",
      slug: "nebula-ui-kit",
      status: "Live",
      label: "Component Library",
      description: "Accessible, themeable, and lightweight React UI components built with Tailwind CSS and Radix UI.",
      longDescription: [
        "nebula-ui-kit is an accessible component library engineered to provide robust foundation primitives for web applications.",
        "Crafted with zero heavy runtime overhead, it supports automated dark mode, full keyboard navigation, ARIA attributes, and tree-shakeable exports.",
        "Features customizable tokens, composable subcomponents, and comprehensive unit test coverage."
      ],
      screenshot: "/images/project/screenshots/pure-svg-charts.svg",
      bgImage: "/images/project/background/bg-gradient-1.svg",
      websiteUrl: "https://github.com/your-username/nebula-ui-kit",
      githubUrl: "https://github.com/your-username/nebula-ui-kit",
      stack: ["React", "TypeScript", "Tailwind CSS", "Radix UI"]
    },
    {
      name: "vector-flow-analytics",
      slug: "vector-flow-analytics",
      status: "Live",
      label: "Developer Tool",
      description: "Real-time edge analytics and visualization platform with reactive SVG telemetry charts.",
      longDescription: [
        "vector-flow-analytics provides real-time event aggregation and visual metric dashboards with sub-millisecond chart renders.",
        "Engineered on Next.js 15 Server Components and Edge functions, delivering instant page loads with minimal client bundle size.",
        "Includes customizable time-series charts, threshold alert webhooks, and exportable JSON summaries."
      ],
      screenshot: "/images/project/screenshots/gridline-template.svg",
      bgImage: "/images/project/background/bg-gradient-2.svg",
      websiteUrl: "https://github.com/your-username/vector-flow-analytics",
      githubUrl: "https://github.com/your-username/vector-flow-analytics",
      stack: ["Next.js", "TypeScript", "Edge Runtime", "Tailwind CSS"]
    },
    {
      name: "pulse-api-gateway",
      slug: "pulse-api-gateway",
      status: "Live",
      label: "Backend Service",
      description: "Lightweight API gateway with distributed token-bucket rate limiting and latency caching.",
      longDescription: [
        "pulse-api-gateway is a high-throughput proxy server engineered to protect downstream microservices.",
        "Features distributed sliding-window rate limiting powered by Redis, request payload validation, and telemetry logging.",
        "Easily deployable to Docker, Kubernetes, or serverless container runtimes with zero external configuration."
      ],
      screenshot: "/images/project/screenshots/ebbc-opendata.svg",
      bgImage: "/images/project/background/bg-gradient-3.svg",
      websiteUrl: "https://github.com/your-username/pulse-api-gateway",
      githubUrl: "https://github.com/your-username/pulse-api-gateway",
      stack: ["Node.js", "TypeScript", "Redis", "Docker"]
    }
  ],

  apps: [
    {
      name: "DevDeck",
      description: "Keyboard-first developer dashboard for managing pull requests, issues, and deployments.",
      icon: "/images/apps/deskstamp.png",
      iconFit: "contain",
      url: "https://github.com/your-username/devdeck",
    },
    {
      name: "SnippetForge",
      description: "Lightweight code snippet manager with instant search, syntax highlighting, and tags.",
      icon: "/images/apps/paperback.png",
      url: "https://github.com/your-username/snippetforge",
    },
  ],

  tools: [
    {
      name: "SVGMinify",
      description: "Fast browser-based SVG cleaner and optimizer with instant side-by-side preview.",
      url: "https://github.com/your-username/svgminify",
    },
    {
      name: "EnvVault",
      description: "Secure, zero-knowledge CLI utility to encrypt and synchronize environment files.",
      url: "https://github.com/your-username/envvault",
    },
  ],

  wikis: [],

  blogs: [
    {
      slug: "architecting-scalable-web-applications-with-nextjs",
      title: "Architecting Scalable Web Applications with Next.js 15",
      date: "Sep 2026",
      readTime: "6 min read",
      claps: 38,
      tags: ["Next.js", "React", "Architecture", "Performance"],
      url: "",
      summary: "A practical guide to structuring full-stack web applications with React Server Components, clean boundaries, and zero-dependency micro-interactions.",
      sections: [
        {
          heading: "The Power of Server-First Architecture",
          paragraphs: [
            "Modern web development has evolved from massive client-side single page applications towards balanced hybrid architectures.",
            "With Next.js 15 and React 19, Server Components allow us to fetch data, compute layouts, and generate static HTML directly on the server without shipping bulky dependencies to the client.",
            "Here is how a clean data-fetching boundary looks in practice:"
          ],
          code: {
            language: "typescript",
            code: "export async function ProjectList() {\n  const projects = await getFeaturedProjects();\n\n  return (\n    <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n      {projects.map((p) => (\n        <ProjectCard key={p.id} project={p} />\n      ))}\n    </div>\n  );\n}"
          }
        },
        {
          paragraphs: [
            "By pushing complex logic and heavy dependencies to the build or server phase, the client bundle remains focused solely on necessary interactivity.",
            "This architectural separation drastically improves Time to Interactive (TTI) and First Contentful Paint (FCP) across both mobile and desktop viewports."
          ],
          callout: {
            icon: "💡",
            text: "Rule of thumb: Keep components as Server Components by default. Only opt into 'use client' when handling user interaction, local state, or browser-only APIs."
          }
        },
        {
          heading: "Tactile Micro-Interactions",
          paragraphs: [
            "Performance is not merely about raw millisecond metrics; it is also about perceived responsiveness.",
            "Adding subtle audio feedback via the native Web Audio API and micro-animations makes interfaces feel physical and intentional without adding external media asset weight."
          ]
        },
        {
          heading: "Summary",
          paragraphs: [
            "Building software that lasts is about simplicity. By leveraging platform-native capabilities and thoughtful architecture, we can deliver experiences that are both blazingly fast and delightful to use."
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
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra"
  },

  features: {
    newsletter: true,
  }
};
