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
    name: "GabrielBaiano",
    role: "Frontend Software Engineer",
    statusBadge: "Open Source Contributor",
    subtitles: [
      "Frontend Software Engineer",
      "Open Source Contributor",
      "UI/UX & Web Developer"
    ],
    avatar: "/images/logo/avatar.jpg",
    bio: [
      "Hey, I'm Gabriel, a frontend software developer based in Brazil specializing in performance, dedicated to building clean web applications and component & web design.",
      "Coding with the persistence of a Soulslike player. Specialized in React, Next.js, TypeScript, reactive SVG architectures, and design systems.",
      "Passionate about open-source contribution, music and literature."
    ],
    email: "gabrielngama@gmail.com",
    calendarUrl: "https://cal.com/gabriel-nascimento-gama-hw1x48/15min",
  },

  socials: [
    { name: "GitHub", url: "https://github.com/GabrielBaiano", icon: "github" },
    { name: "Email", url: "mailto:gabrielngama@gmail.com", icon: "mail" },
  ],

  experiences: [
    {
      company: "Flash",
      role: "Frontend Software Engineer (Mid-level)",
      type: "Full-time",
      period: "Jun 2025 - Aug 2026 · 1 yr 3 mos",
      location: "São Paulo, Brazil · Hybrid",
      color: "#FF007A", // Rosa choque Flash
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
      type: "Internship",
      period: "Oct 2024 - Apr 2025 · 7 mos",
      location: "São Paulo, Brazil · Remote",
      color: "#FF6A00", // Laranja Compass
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
      type: "Full-time",
      period: "May 2023 - Nov 2024 · 1 yr 7 mos",
      location: "Curitiba, Paraná, Brazil · Remote",
      color: "#0066FF", // Azul Techsolution
      bullets: [
        "Built responsive, accessible web applications using React.js, Next.js, and TypeScript",
        "Developed Backend-for-Frontend (BFF) layers with Node.js and Prisma ORM to optimize client data pipelines",
        "Maintained robust application state using Redux Toolkit, Context API, and custom hooks",
        "Participated in code reviews, sprint planning, and architectural discussions"
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Node.js", "Prisma", "Redux", "REST API", "Git"]
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
      name: "gridline-portfolio-template",
      slug: "gridline-portfolio-template",
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
      websiteUrl: "https://github.com/GabrielBaiano/gridline-portfolio-template",
      githubUrl: "https://github.com/GabrielBaiano/gridline-portfolio-template",
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

  apps: [
    {
      name: "Deskstamp",
      description: "Native desktop watermark overlay with seamless click-through for Linux & COSMIC.",
      icon: "/images/apps/deskstamp.png",
      iconFit: "contain",
      url: "https://github.com/GabrielBaiano/Deskstamp",
    },
    {
      name: "Paperback",
      description: "Clean, fast, and lightweight collaborative e-book reader in the browser.",
      icon: "/images/apps/paperback.png",
      url: "https://github.com/GabrielBaiano/paperback",
    },
  ],

  tools: [
    {
      name: "Awesome README",
      description: "Generate professional, high-quality READMEs and GitHub templates in seconds.",
      url: "https://awesome-readme-nu.vercel.app/",
    },
    {
      name: "pure-svg-charts",
      description: "Lightweight, accessible, and reactive SVG chart primitives for React and Next.js.",
      url: "https://github.com/GabrielBaiano/pure-svg-charts",
    },
  ],

  wikis: [],

  blogs: [
    {
      slug: "the-frontend-performance-paradox-and-the-duck",
      title: "The Frontend Performance Paradox and the Duck",
      date: "Sep 2026",
      readTime: "12 min read",
      claps: 74,
      tags: ["Frontend", "Performance", "Architecture", "Engineering"],
      url: "https://www.tabnews.com.br/gabrielbaiano/o-paradoxo-da-performance-no-frontend-e-o-pato",
      summary: "A deep reflection on why modern frontend engineering normalized throwing abstractions, dependencies, and hundreds of kilobytes of JavaScript at every problem until the developer itself became a duck: able to swim, walk, and fly, but master of none.",
      sections: [
        {
          heading: "The Paradox of Modern Web Performance",
          paragraphs: [
            "Front-end... We are probably one of the disciplines that talk the most about performance and, at the same time, one of the most normalized when it comes to throwing abstractions, dependencies, and JavaScript at a problem until it disappears.",
            "We talk about Core Web Vitals. We talk about tree shaking. We talk about lazy loading, code splitting, Server Components, SSR, streaming, hydration, and bundle reduction.",
            "Then Monday arrives and we need to render a seven-bar chart in an administrative dashboard:"
          ],
          code: {
            language: "bash",
            code: "npm install some-heavy-charting-library"
          }
        },
        {
          paragraphs: [
            "Suddenly, we inherit dozens or hundreds of kilobytes of JavaScript, transitive dependencies, abstractions we will never touch, and a massive API surface to solve what is, conceptually, drawing seven rectangles on a screen.",
            "This is where the Frontend Performance Paradox is born: we care deeply about performance — right after building systems that require relentless optimization just to recover it."
          ],
          callout: {
            icon: "💡",
            text: "Architecture is the cumulative sum of hundreds of locally reasonable decisions. Nobody decides to add 2 MB of JS in one go — it happens through 30 decisions of 'not reinventing the wheel.'"
          }
        },
        {
          heading: "Frontend Is Not Just 'Building Little Screens'",
          paragraphs: [
            "There is still a curious misconception that frontend is simply the visual presentation layer of software: buttons, modals, forms, tables, and charts.",
            "Modern frontend stopped being merely presentation a long time ago. A modern React application manages complex client-side caching, server state synchronization, authentication, routing, validation, optimistic updates, internationalization, accessibility (a11y), observability, telemetry, and a considerable amount of critical business logic.",
            "React, Next.js, Angular, Vue, Nuxt, and SvelteKit do not exist simply because developers wanted different syntaxes for writing a button. They exist because we are attempting to solve a difficult organizational problem: how to build increasingly complex applications, with more features, across larger teams, without losing the ability to ship software.",
            "This fostered a pervasive culture in frontend: ship fast, optimize later. Not out of negligence, but incentives. A feature shipped today provides immediate, measurable business value. An extra dependency that adds 80 kB to the bundle rarely triggers an emergency retro."
          ]
        },
        {
          heading: "The Frontend Is Full of Ducks",
          paragraphs: [
            "There is a metaphor I frequently return to: modern frontend is full of ducks.",
            "The duck swims. The duck walks. The duck flies. It can do practically everything. Yet it is rarely the best animal at any single one of those tasks.",
            "Most modern frontend tooling behaves precisely like this: extraordinarily generalist. Need server-side rendering? Supported. Single Page App? Supported. Static generation? Supported. API routes? Streaming? Middleware? Caching? Hybrid architecture? All included out of the box.",
            "Convenience is an essential quality in developer tooling. But the problem begins when convenience is conflated with efficiency. We no longer choose the tool that performs a specific task best; we choose the one that solves the greatest number of problems adequately well.",
            "Economically, this makes sense for organizations: companies want engineers who deliver across an ecosystem where every problem has an existing package: npm install solved-problem."
          ]
        },
        {
          heading: "The Sprint Needs to Finish",
          paragraphs: [
            "Corporate software operates against non-negotiable deadlines. If a third-party library solves a problem in an afternoon and crafting a lightweight custom implementation takes three days, there is rational business pressure to import the library.",
            "Multiply this across forms, tables, charts, dates, auth, analytics, state management, i18n, validation, and animations. In isolation, practically none of those individual decisions were wrong. But collectively, they construct the monster."
          ]
        },
        {
          heading: "When Even the Frontend Gets Divided (Micro Frontends)",
          paragraphs: [
            "Consider micro frontends: bringing microservices philosophy to the user interface. Dividing an application into smaller units that can be developed, tested, and deployed independently.",
            "We built systems so massive that we had to introduce architectural fault lines within the user interface itself just to preserve organizational autonomy.",
            "Micro frontends reduce the blast radius of changes and unlock decoupled CI/CD pipelines. But they introduce their own overhead: cross-application contracts, runtime orchestration, duplicated shared dependencies, and heightened operational complexity.",
            "We trade technical simplicity for organizational independence. Frontend architecture is rarely determined solely by performance; it is shaped by team topology and delivery velocity."
          ]
        },
        {
          heading: "The Web Wasn't Always Built Like This",
          paragraphs: [
            "There is an easy nostalgia trap here: claiming that 'things were better in the old days.' They were not. Browser compatibility was brutal, Internet Explorer required dark magic, and CSS had severe limitations.",
            "However, there was a foundational architectural difference: the browser was not expected to be the container where the entire application lived.",
            "For decades, the web operated with brutal simplicity: the server received a request, fetched data, injected it into a template, and returned static HTML to the client."
          ],
          code: {
            language: "text",
            code: "Traditional Model:\nRequest -> Server -> Database -> Template -> HTML -> Browser\n\nModern Client Hydration Pipeline:\nRequest -> CDN -> SSR / RSC -> API -> Client Component -> Hydration -> State -> Cache -> Re-render"
          }
        },
        {
          heading: "The Curious Return of Old Principles",
          paragraphs: [
            "After years of offloading execution to the client, frontend has rediscovered the server: SSR, Static Site Generation, React Server Components, Streaming HTML, Server Actions, Islands Architecture, and Progressive Enhancement.",
            "If computation can be resolved before reaching the client, why force the user's browser to do the heavy lifting? Perhaps classic server-driven architecture wasn't so obsolete after all."
          ]
        },
        {
          heading: "How pure-svg-charts Started",
          paragraphs: [
            "This entire reflection began for me from a straightforward requirement: I needed to render interactive charts in React.",
            "Libraries like Recharts, Chart.js, D3, and Victory are powerful, but for most dashboards, the core requirements are simple: line, bar, area, axis, tooltip.",
            "I ran a personal experiment: how far can a React chart library go if the primary architectural constraint is doing less?",
            "That led to pure-svg-charts: native SVG, zero runtime dependencies, and a bundle footprint under 12 kB gzip."
          ],
          code: {
            language: "text",
            code: "Benchmark Comparison (5,000 Data Points):\n----------------------------------------------------------------------------------\nLibrary              Engine        Gzip       Dependencies   Mount Time   DOM Nodes\n----------------------------------------------------------------------------------\npure-svg-charts      SVG           11.1 kB    0              1.45 ms      33\nRecharts             SVG + D3      162.4 kB   14             132.50 ms    106\nChart.js + react     Canvas        68.2 kB    4              0.45 ms      7\nVictory              SVG + D3      184.6 kB   22             48.20 ms     69\n----------------------------------------------------------------------------------"
          }
        },
        {
          heading: "In the End, the Developer Became the Duck",
          paragraphs: [
            "Look at a modern Frontend Engineer job posting:",
            "HTML, CSS, JavaScript, TypeScript, React... Next.js, SSR, SSG, React Query, Redux, WebSockets... Jest, RTL, Cypress, Playwright, Storybook, Design Systems, A11y, Core Web Vitals... Node.js, Docker, CI/CD, GitHub Actions, AWS/GCP, Kubernetes, Observability, Datadog, OpenTelemetry... Kafka, Redis, BFF, OAuth, Terraform.",
            "At some point, you read the spec and wonder: am I still applying for frontend?",
            "The frontend engineer became the duck of software engineering: swimming, walking, and occasionally flying whenever someone puts Kubernetes on the job description."
          ]
        },
        {
          heading: "Learning to Do Less",
          paragraphs: [
            "The takeaway isn't to abandon modern frameworks or hand-craft every dropdown from scratch.",
            "It is about asking the question that modern hype often obscures: what is the minimal amount of technology required to solve this problem well?",
            "Every abstraction, layer, and third-party dependency carries a non-zero operational and cognitive cost. Convenience doesn't make that cost vanish; it just makes it invisible until production.",
            "Technical responsibility isn't blindly chasing raw performance, nor is it shipping at any cost. It is consciously understanding what we are buying and what we are paying with every architectural decision."
          ],
          callout: {
            icon: "🚀",
            text: "Read the original publication and join the discussion on TabNews: https://www.tabnews.com.br/gabrielbaiano/o-paradoxo-da-performance-no-frontend-e-o-pato"
          }
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
    text: "To succeed, planning alone is insufficient. One must improvise as well.",
    author: "Salvor Hardin, Foundation"
  },

  features: {
    newsletter: true,
  }
};
