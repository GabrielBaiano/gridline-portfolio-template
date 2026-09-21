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

export interface BlogPostItem {
  title: string;
  date: string;
  claps?: number;
  tags?: string[];
  url: string;
  image?: string;
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
      title: "Next.js 15 & Architecture: Server Actions and Partial Prerendering",
      date: "Sep 2026",
      claps: 14,
      tags: ["Next.js", "React 19", "Architecture"],
      url: "https://github.com/GabrielBaiano"
    },
    {
      title: "Building Reactive Charts with Pure SVG and React",
      date: "Jul 2026",
      claps: 7,
      tags: ["SVG", "React", "TypeScript", "Performance"],
      url: "https://github.com/GabrielBaiano/pure-svg-charts"
    },
    {
      title: "Mastering TypeScript Generics and Clean Architecture",
      date: "Jul 2026",
      claps: 5,
      tags: ["TypeScript", "JavaScript", "React", "Node"],
      url: "https://github.com/GabrielBaiano"
    },
    {
      title: "Claude Code & Agentic Workflow Engineering",
      date: "Mar 2026",
      claps: 19,
      tags: ["AI", "Agents", "Next.js", "Automation"],
      url: "https://github.com/GabrielBaiano/gridline-portifolio-template"
    },
    {
      title: "High-Precision SVG Visualizations without Heavy Canvas",
      date: "Feb 2026",
      claps: 11,
      tags: ["SVG", "Frontend", "Math", "Zero-Dependency"],
      url: "https://github.com/GabrielBaiano/pure-svg-charts"
    },
    {
      title: "Micro-interactions & Audio UX with Web Audio API",
      date: "Jan 2026",
      claps: 8,
      tags: ["Web Audio API", "UX", "Micro-interactions"],
      url: "https://github.com/GabrielBaiano/gridline-portifolio-template"
    },
    {
      title: "Scalable Design Systems with Tailwind CSS & CSS Variables",
      date: "Nov 2025",
      claps: 12,
      tags: ["Design Systems", "TailwindCSS", "CSS"],
      url: "https://github.com/GabrielBaiano"
    },
    {
      title: "Automated GitHub Release Publisher for Developer Communities",
      date: "Oct 2025",
      claps: 9,
      tags: ["Automation", "Open Source", "CLI", "Node.js"],
      url: "https://github.com/GabrielBaiano/tabnews-release-publisher"
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
