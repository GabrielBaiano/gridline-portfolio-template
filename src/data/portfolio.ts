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
  link?: {
    title: string;
    url: string;
    image?: string;
  };
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

export type CalloutType = "info" | "warning" | "success" | "danger" | "note";

export interface BlogCallout {
  type?: CalloutType;
  icon?: string;
  text: string;
}

export interface BlogColumnItem {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: {
    language: string;
    code: string;
    caption?: string;
  };
  callout?: BlogCallout;
}

export interface BlogColumns {
  left: BlogColumnItem;
  right: BlogColumnItem;
}

export interface BlogArticleSection {
  heading?: string;
  subheading?: string;
  paragraphs?: string[];
  bullets?: string[];
  listOrdered?: boolean;
  code?: {
    language: string;
    code: string;
    caption?: string;
  };
  callout?: BlogCallout;
  columns?: BlogColumns;
  quote?: {
    text: string;
    author?: string;
  };
  image?: {
    src: string;
    alt: string;
    caption?: string;
    pixelated?: boolean;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogPostItem {
  slug: string;
  title: string;
  icon?: string;
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
      company: "Lightsprint (YC P26)",
      role: "Frontend Software Engineer (Freelancer)",
      type: "Freelance",
      period: "Oct 2026 - Nov 2026 · 2 mos",
      location: "United States · Remote",
      color: "#FF4B00",
      logo: "/images/experience/lightsprint.png",
      bullets: [
        "Built and shipped responsive web applications and high-fidelity user interfaces for Y Combinator-backed software factory products",
        "Engineered client-side features and modular design system components using React, Next.js, and TypeScript",
        "Collaborated with international cross-functional teams in a fast-paced environment to deliver pixel-perfect frontend experiences"
      ],
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Frontend Architecture", "Git"],
      link: {
        title: "Lightsprint - Software factory for product teams",
        url: "https://lightsprint.ai",
        image: "/images/experience/lightsprint-media.webp"
      }
    },
    {
      company: "Flash",
      role: "Frontend Software Engineer (Mid-level)",
      type: "Full-time",
      period: "Jun 2025 - Aug 2026 · 1 yr 3 mos",
      location: "São Paulo, Brazil · Hybrid",
      color: "#FF007A", // Rosa choque Flash
      logo: "/images/experience/flash.png",
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
      logo: "/images/experience/uol.png",
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
      logo: "/images/experience/techsolution.png",
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
    }
  ],

  apps: [
    {
      name: "Deskstamp",
      description: "Native desktop watermark overlay with seamless click-through for Linux & COSMIC.",
      icon: "/images/apps/deskstamp.webp",
      iconFit: "contain",
      url: "https://github.com/GabrielBaiano/Deskstamp",
    },
    {
      name: "Clubo",
      description: "Real-time social reading platform & virtual book club in the browser.",
      icon: "/images/apps/clubo.webp",
      url: "https://github.com/GabrielBaiano/Clubo",
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
    {
      name: "key-caster",
      description: "Lightweight on-screen keystroke displayer for Linux (Wayland, COSMIC, X11).",
      url: "https://github.com/GabrielBaiano/key-caster",
    },
  ],

  wikis: [],

  blogs: [
    {
      slug: "how-i-use-ai-in-scientific-research-auditable-pipelines",
      title: "How I Use AI in Scientific Research: Modular Pipelines and Auditable Code",
      icon: "🔬",
      date: "Nov 2026",
      readTime: "9 min read",
      claps: 0,
      tags: ["AI", "Scientometrics", "Data Engineering", "Python", "Open Source"],
      url: "/blog/how-i-use-ai-in-scientific-research-auditable-pipelines",
      summary: "Why treating scientific methodology like a software engineering pipeline turns messy academic data collection into reproducible, testable, and auditable research.",
      image: "/images/blog/scientific-ai-pipeline/pipeline-stages.webp",
      sections: [
        {
          heading: "Approaching Academic Research with a Developer Mindset",
          paragraphs: [
            "Recently, I started getting deeper into academic research, specifically in scientometrics and bibliometric analysis. Coming from a software engineering background, my initial instinct when designing data-heavy studies was to treat the methodology much like a software system: you define pristine inputs, establish modular data transformations, and verify outputs against testable invariants.",
            "In practice, data-driven research often encounters two common methodological pitfalls:",
            "• The Fragility of Purely Manual Workflows: Extracting, cross-referencing, and cleaning bibliographic metadata by hand across hundreds of records is exhausting and difficult to audit. When an ad-hoc spreadsheet workflow breaks or when corpus criteria expand, researchers are forced to restart tedious manual loops from scratch.",
            "• The Risks of Unconstrained AI: At the other extreme, passing raw papers into conversational chat windows to extract metrics introduces hallucinations ('devaneios'). When prompted without rigid constraints, LLMs can subtly fabricate citations, misattribute software libraries, or project statistical confidence that does not exist in the source paper. Because these answers read like polished academic prose, phantom errors easily slip through visual review.",
            "The purpose of this guide is educational: rather than treating artificial intelligence as an all-or-nothing choice, we can apply software engineering patterns to build auditable, testable, and reproducible research pipelines.",
            "By treating AI as a strictly constrained, modular component—and relying on deterministic code for everything else—you can eliminate repetitive manual toil while ensuring your findings remain verifiable, reproducible, and grounded in ground truth."
          ],
          callout: {
            type: "info",
            icon: "🔬",
            text: "Scientific rigor requires computational reproducibility: if another researcher executes your pipeline two years from today, they must reach the exact same deterministic conclusions."
          }
        },
        {
          heading: "The Theoretical Model: Scientific Methodology as a Pipeline",
          image: {
            src: "/images/blog/scientific-ai-pipeline/pipeline-stages.webp",
            alt: "Conceptual scientific pipeline diagram: Start -> Stage 1 -> Stage 2 -> Stage 3 -> End",
            caption: "The abstract model: Any data-driven research workflow deconstructs into sequential stages separated by automated verification gates."
          },
          paragraphs: [
            "Before diving into lines of code or specific datasets, it helps to step back and examine the conceptual model. At an abstract level, almost any empirical research study that processes data can be conceptualized as a unidirectional software pipeline.",
            "The defining characteristic of this approach is working backward from the research objective:",
            "1. You Start with the End in Mind: The objective of your study (the 'End' node) is fixed by your research question or formal hypothesis (for example: 'How do software adoption patterns correlate with empirical data sources across specialized literature?').",
            "2. Deconstruction into Modular Stages: Because you know the required output format (e.g., a validated statistical matrix or citation network), you can decompose the path into discrete, sequential steps: Ingestion (Stage 1), Transformation & Validation (Stage 2), and Enrichment & Semantic Analysis (Stage 3).",
            "3. Verification Gates: Between every single stage, there is an automated validation checkpoint. Stage 2 never assumes Stage 1 succeeded silently; it executes unit test assertions and schema guards against the incoming data contract. If an upstream format changes, the pipeline fails early, loudly, and locally before corrupted data reaches your analytical models."
          ]
        },
        {
          heading: "Folder Architecture: Decoupling Lifecycle and Verification",
          image: {
            src: "/images/blog/scientific-ai-pipeline/architecture-stages.webp",
            alt: "Directory structure separating stages, test guards, and tiered data directories",
            caption: "Directory architecture: Every script in src/stages/ mirrors a dedicated test file in tests/, with strict tiered data separation."
          },
          paragraphs: [
            "The most common engineering pitfall in scientific programming is the monolithic script: a single 2,000-line file that fetches HTML, runs regex, calls an API, computes statistics, and renders plots all in one unrepeatable pass.",
            "When a network connection drops or an unexpected character appears on record 350, the script crashes, leaving intermediate data in an undefined state. You are forced to start over, wasting time and compute.",
            "To prevent this, the repository architecture should physically decouple each lifecycle phase and mirror it with dedicated unit tests:"
          ],
          code: {
            language: "text",
            code: "research-project/\n├── data/\n│   ├── raw/                  # Immutable primary inputs and upstream data snapshots\n│   ├── processed/            # Validated intermediate transformation checkpoints\n│   └── outputs/              # Final deterministic research artifacts (matrices, figures, tables)\n├── src/\n│   ├── main.py               # Orchestrator: manages execution flow, logs checkpoints, and handles errors\n│   └── stages/\n│       ├── 01_stage_1.py     # Stage 1: Ingests raw inputs and guarantees immutable caching\n│       ├── 02_stage_2.py     # Stage 2: Applies intermediate transformation rules and schema validation\n│       └── 03_stage_3.py     # Stage 3: Executes analytical models and emits final research outputs\n└── tests/\n    ├── test_stage_1.py       # Unit tests verifying Stage 1 data extraction and format invariants\n    ├── test_stage_2.py       # Unit tests verifying Stage 2 transformation contracts\n    ├── test_stage_3.py       # Unit tests verifying Stage 3 analytical consistency and bounds\n    └── test_pipeline.py      # Integration test executing and verifying the pipeline end-to-end",
            caption: "Directory layout enforcing centralized orchestration, single-responsibility stages, and automated test coverage."
          }
        },
        {
          paragraphs: [
            "This layout enforces four practical safeguards:"
          ],
          bullets: [
            "Centralized Orchestration: main.py is the single entry point that drives the entire pipeline sequentially. It checks preconditions, triggers each stage, validates exit status, and handles graceful error reporting without hardcoded coupling between individual steps.",
            "Fault Isolation: If the requirements or format for Stage 1 change, only 01_stage_1.py and test_stage_1.py require updates. Stages 2 and 3 rely on standard intermediate schemas and remain completely untouched.",
            "Immutable Checkpoints & Fast Iteration: Because every stage persists its results to distinct directories (data/raw/, data/processed/, data/outputs/), intermediate states are fully auditable. You can experiment with downstream analytical models without needing to re-run upstream ingestion.",
            "Test-Driven Verification: Unit tests validate each transformation independently against defined data schemas, while test_pipeline.py ensures that a clean end-to-end execution generates reproducible artifacts."
          ]
        },
        {
          heading: "The Role of AI: A Constrained Component, Not an Oracle",
          subheading: "1. Use the LLM to Write the Pipeline, Not to Run It",
          paragraphs: [
            "In interactive chat interfaces, LLMs are designed to be conversational and creative. In scientific research, however, unconstrained creativity during data parsing is an anti-pattern: scientific methodology requires strict determinism, verifiable data contracts, and reproducible transformations.",
            "The highest-leverage way to use modern AI in research is as an engineering accelerator: using it to write the pipeline rather than executing the analysis directly through prompts.",
            "If you need to parse a tricky file format, extract meta tags from HTML, or calculate co-occurrence matrices, someone has almost certainly already solved that exact problem and published a battle-tested library on PyPI or GitHub. Instead of reinventing the wheel—or worse, asking an LLM chat window to 'summarize this data for me'—use the model to research existing tools, discover the right libraries, draft the integration glue code, and write unit tests.",
            "Using an LLM to produce deterministic Python code gives you three immediate scientific advantages:"
          ],
          bullets: [
            "Instant Execution: Pure code runs locally in milliseconds without network latency.",
            "Zero Ongoing Cost: You pay no token fees to rerun your analysis.",
            "Strict Reproducibility: Executing deterministic code ten times produces the exact same output ten times."
          ]
        },
        {
          subheading: "2. When AI Must Be in the Execution Loop: Constrained Semantic Disambiguation",
          paragraphs: [
            "There are cases where deterministic code alone hits a wall. In bibliometrics and scientometrics, you frequently encounter qualitative coding and semantic extraction tasks that cannot be solved with regular expressions alone. For instance, identifying software tools or empirical data sources from unstructured academic abstracts is notoriously tricky: authors use colloquial names, omit version numbers, or refer to single-letter tools like 'R', which regex easily confuses with amino acids, electrical resistance, or statistical correlation coefficients.",
            "When you genuinely need an LLM inside the execution loop to comprehend text or execute a repetitive qualitative classification, you must treat it like an untrusted, probabilistic component governed by strict software constraints:"
          ],
          bullets: [
            "Strict Context Sandboxing (Zero External Search): Feed the model only the specific corpus extract (such as the title and abstract text) and explicitly disallow external web browsing or ungrounded retrieval. Confining the model's universe strictly to the project data prevents hallucinations ('devaneios') from importing outside assumptions or fabricated citations into your dataset.",
            "Never Accept Free-Text Output (JSON Schema): Constrain model responses using formal Structured Outputs enforced at the API level. If the schema only accepts a boolean flag, a restricted enum of known categories, and an exact verbatim quote from the text as evidence, the model is physically prevented from generating conversational filler, speculative commentary, or markdown formatting quirks.",
            "Pre-Filter Deterministically: Never feed your entire corpus blindly through an LLM. Use fast regular expressions or keyword heuristics as a coarse pre-filter. If an abstract has zero mentions of software or data terminology, discard or label it immediately. Reserve LLM calls exclusively for the ambiguous records that genuinely require semantic disambiguation.",
            "Multi-Pass Validation and Consistency Checks: Because language models are probabilistic, sensitive classifications should be processed more than once—either through repeated sampling or deterministic zero-temperature cross-validation. If two independent passes disagree on a classification, the pipeline flags that record for manual peer review rather than quietly committing an uncertain label to the dataset.",
            "Atomic Incremental Checkpointing: Save curated records in discrete batches directly to disk (e.g., writing checkpoints every 10 articles). If an API rate limit or network error triggers on record 350, the pipeline resumes cleanly from the last confirmed checkpoint without losing progress or repeating paid requests."
          ],
          callout: {
            type: "warning",
            icon: "⚠️",
            text: "Unconstrained LLMs are probabilistic text generators. When scientific accuracy matters, treat them as untrusted components: constrain outputs with schemas, sandbox context, and verify with automated unit tests."
          },
          columns: {
            left: {
              heading: "❌ Fragile (Unconstrained AI)",
              bullets: [
                "Pasting entire PDFs into web chat prompts",
                "Subtle hallucinations and fabricated citations",
                "Non-reproducible results across runs",
                "Accumulating token costs on every rerun",
                "Impossible to peer-review or unit test"
              ],
              callout: {
                type: "danger",
                icon: "🛑",
                text: "Prompt drift creates phantom errors that easily slip through visual review."
              }
            },
            right: {
              heading: "✅ Auditable (Modular Pipeline)",
              bullets: [
                "Strict context sandboxing with JSON Schema",
                "Deterministic stages with immutable caches",
                "Automated unit tests on data contracts",
                "Zero API costs on local recalculations",
                "Cryptographic SHA-256 provenance"
              ],
              callout: {
                type: "success",
                icon: "✨",
                text: "Verifiable outputs allow any researcher to reproduce your exact numbers."
              }
            }
          }
        },
        {
          heading: "Putting Theory into Practice: My Scientometrics Research Pipeline",
          paragraphs: [
            "To see how this theoretical framework translates into real-world code, here is how I implemented it in my initial research project ([`GabrielBaiano/qss-ebbc-curator-ai`](https://github.com/GabrielBaiano/qss-ebbc-curator-ai) / [Zenodo DOI: 10.5281/zenodo.20638523](https://doi.org/10.5281/zenodo.20638523)), which analyzed computational software tool adoption and empirical data sources across national and international scientometrics publications.",
            "The research investigated two distinct corpora: Brazilian national conference articles from EBBC (2020, 2022, 2024 editions) on Open Journal Systems (OJS), and international articles from Quantitative Science Studies (QSS, MIT Press / ISSI) queried via the OpenAlex REST API.",
            "Here is how each theoretical principle mapped directly into code:"
          ]
        },
        {
          subheading: "1. Centralized Orchestration: main.py",
          paragraphs: [
            "Rather than having loose scripts that depend on someone manually remembering which file to execute in sequence, a single orchestrator controls the entire pipeline lifecycle. If any stage fails, execution halts immediately with a non-zero exit code so downstream models never ingest corrupted data:"
          ],
          code: {
            language: "python",
            code: "\"\"\"\nmain.py - Central pipeline orchestrator.\nCoordinates execution across all modular stages, validates intermediate outputs,\nand halts execution immediately on any failure.\n\"\"\"\nimport sys\nimport logging\nfrom stages import (\n    stage_01_ingest_ebbc,\n    stage_01_ingest_qss,\n    stage_02_preprocess_and_filter,\n    stage_03_curate_with_ai,\n    stage_04_correspondence_analysis,\n)\n\nlogging.basicConfig(level=logging.INFO, format=\"%(asctime)s [%(levelname)s] %(message)s\")\n\ndef run_pipeline(force_recompute: bool = False):\n    logging.info(\"Starting scientometrics research pipeline...\")\n    \n    # Stage 1: Ingest raw data into data/raw/ (with polite caching)\n    ebbc_raw = stage_01_ingest_ebbc.run(cache_dir=\"data/raw/ebbc\")\n    qss_raw = stage_01_ingest_qss.run(cache_dir=\"data/raw/qss\")\n    logging.info(f\"Ingested {len(ebbc_raw)} EBBC papers and {len(qss_raw)} QSS papers.\")\n    \n    # Stage 2: Clean, reconstruct abstracts, and run deterministic regex pre-filter\n    stg2_output = stage_02_preprocess_and_filter.run(\n        ebbc_raw=ebbc_raw, \n        qss_raw=qss_raw, \n        output_dir=\"data/processed\"\n    )\n    logging.info(f\"Preprocessing complete. {stg2_output['ambiguous_count']} records require LLM disambiguation.\")\n    \n    # Stage 3: Constrained AI curation with JSON Schema and batch checkpointing\n    stg3_output = stage_03_curate_with_ai.run(\n        candidate_file=\"data/processed/candidates.json\",\n        checkpoint_dir=\"data/processed/checkpoints\",\n        batch_size=10\n    )\n    \n    # Stage 4: Statistical matrix calculation & Correspondence Analysis\n    stage_04_correspondence_analysis.run(\n        curated_dataset=\"data/processed/final_curated_corpus.json\",\n        output_dir=\"data/outputs\"\n    )\n    logging.info(\"Pipeline completed successfully. Artifacts generated in data/outputs/.\")\n\nif __name__ == \"__main__\":\n    run_pipeline()",
            caption: "Central orchestrator (main.py) coordinating sequential execution, checkpointing, and fault isolation."
          }
        },
        {
          subheading: "2. Ingestion & Immutable Caching: EBBC (OJS) and QSS (OpenAlex)",
          paragraphs: [
            "For EBBC conference proceedings, university OJS instances frequently alter HTML layout templates between editions. Instead of brittle CSS selectors, the ingestion script uses Python's standard library html.parser to extract standardized Dublin Core and Highwire Press meta tags from the headers, generating deterministic synthetic identifiers (ebbc-2022-art-142) for papers lacking DOIs.",
            "Raw responses persist immutably in data/raw/ebbc/ so university servers are never redundantly scraped:"
          ],
          code: {
            language: "python",
            code: "import html\nfrom html.parser import HTMLParser\n\nclass OJSMetadataParser(HTMLParser):\n    \"\"\"\n    Extracts standardized academic metadata from <meta> tags in OJS headers.\n    Completely decoupled from visual CSS layouts or theme changes.\n    \"\"\"\n    def __init__(self):\n        super().__init__()\n        self.metadata = {}\n\n    def handle_starttag(self, tag, attrs):\n        if tag == \"meta\":\n            attr_dict = dict(attrs)\n            name = attr_dict.get(\"name\")\n            content = attr_dict.get(\"content\")\n            if name and content is not None:\n                val = html.unescape(content).strip()\n                self.metadata.setdefault(name, []).append(val)",
            caption: "Decoupled HTML metadata extraction using Python's standard library."
          }
        },
        {
          paragraphs: [
            "For QSS, OpenAlex distributes abstracts as token position inverted indices to comply with academic publisher copyright constraints. Stage 2 reconstructs continuous text deterministically in memory (< 1ms per paper) without third-party dependencies:"
          ],
          code: {
            language: "python",
            code: "def reconstruct_abstract(inverted_index: dict[str, list[int]]) -> str:\n    \"\"\"\n    Reconstructs continuous text from OpenAlex's token position mapping.\n    Deterministic, zero-token cost, runs in < 1ms per record.\n    \"\"\"\n    if not inverted_index:\n        return \"\"\n    word_map = {pos: word for word, positions in inverted_index.items() for pos in positions}\n    return \" \".join(word_map[i] for i in sorted(word_map.keys()))",
            caption: "Deterministic abstract reconstruction from OpenAlex inverted index."
          }
        },
        {
          subheading: "3. Deterministic Regex Pre-Filtering Before Any LLM Call",
          paragraphs: [
            "A common anti-pattern in automated research workflows is passing every raw record unconditionally into an LLM. In my corpus of several hundred papers, roughly 45% made zero empirical claims involving computational tools or databases (e.g., purely conceptual essays or historical overviews).",
            "Before invoking any API, Stage 2 applies a fast regular expression screen. If an abstract contains zero candidate mentions, it is classified immediately with zero API calls:"
          ],
          code: {
            language: "python",
            code: "import re\n\nTOOL_PATTERN = re.compile(\n    r\"\\b(vosviewer|gephi|bibliometrix|citespace|citnetexplorer|scimat|pajek|ucinet|spss|r\\s+package|python|stata)\\b\",\n    re.IGNORECASE\n)\nSOURCE_PATTERN = re.compile(\n    r\"\\b(scopus|web of science|wos|pubmed|lattes|scielo|dimensions|lens\\.org|google scholar)\\b\",\n    re.IGNORECASE\n)\n\ndef prefilter_record(text: str) -> dict:\n    \"\"\"\n    Fast regex screening. If an abstract contains zero candidate terms,\n    we classify it immediately without spending an API token.\n    \"\"\"\n    has_tool_mention = bool(TOOL_PATTERN.search(text))\n    has_source_mention = bool(SOURCE_PATTERN.search(text))\n    \n    return {\n        \"requires_llm\": has_tool_mention or has_source_mention,\n        \"preliminary_tool_flag\": has_tool_mention,\n        \"preliminary_source_flag\": has_source_mention,\n    }",
            caption: "Deterministic regex pre-filter cutting LLM API costs by nearly 50%."
          }
        },
        {
          subheading: "4. Constrained Semantic AI Curation with JSON Schema & Dual-Pass Validation",
          paragraphs: [
            "When the regex pre-filter flags candidate mentions, an LLM is required for semantic disambiguation: did the authors actually use the software in their empirical methodology, or did they merely cite someone else? Does 'R' refer to the statistical environment, an amino acid, or Pearson's correlation coefficient?",
            "Stage 3 invokes Gemini Flash Lite with Strict Context Sandboxing (zero external search tools enabled) and enforces a rigid JSON Schema with verbatim evidence quotes. Sensitive classifications run through two independent passes; conflicting records are flagged in data/processed/needs_manual_review.json for human peer inspection:"
          ],
          code: {
            language: "json",
            code: "{\n  \"type\": \"OBJECT\",\n  \"properties\": {\n    \"uses_computational_tools\": {\n      \"type\": \"BOOLEAN\",\n      \"description\": \"True only if the authors actively employed computational software in their methodology.\"\n    },\n    \"tools_deployed\": {\n      \"type\": \"ARRAY\",\n      \"items\": { \"type\": \"STRING\" },\n      \"description\": \"Normalized names of tools deployed (e.g. VOSviewer, bibliometrix, Python).\"\n    },\n    \"methodological_phase\": {\n      \"type\": \"STRING\",\n      \"enum\": [\n        \"data_extraction\",\n        \"network_analysis_and_visualization\",\n        \"statistical_computation\",\n        \"not_applicable\"\n      ]\n    },\n    \"empirical_data_sources\": {\n      \"type\": \"ARRAY\",\n      \"items\": { \"type\": \"STRING\" },\n      \"description\": \"Empirical databases mined (e.g. Scopus, Web of Science, Lattes).\"\n    },\n    \"evidence_quote\": {\n      \"type\": \"STRING\",\n      \"description\": \"Verbatim sentence copied from the input abstract supporting this classification.\"\n    }\n  },\n  \"required\": [\n    \"uses_computational_tools\",\n    \"tools_deployed\",\n    \"methodological_phase\",\n    \"empirical_data_sources\",\n    \"evidence_quote\"\n  ]\n}",
            caption: "JSON Schema enforcing type constraints, categorical enums, and grounded verbatim evidence quotes."
          }
        },
        {
          paragraphs: [
            "Stage 3 commits verified records to disk in atomic batches of 10 articles using temporary files and POSIX atomic swaps. If an interruption occurs on record 340, rerunning the orchestrator resumes from record 341 in less than one second:"
          ],
          code: {
            language: "python",
            code: "import os\nimport json\n\ndef save_checkpoint(records: list[dict], checkpoint_path: str):\n    \"\"\"Atomically commits verified batches to disk.\"\"\"\n    temp_path = f\"{checkpoint_path}.tmp\"\n    with open(temp_path, \"w\", encoding=\"utf-8\") as f:\n        json.dump(records, f, indent=2, ensure_ascii=False)\n    os.replace(temp_path, checkpoint_path)  # POSIX atomic swap",
            caption: "Atomic batch checkpointing preventing partial writes or corrupted progress."
          }
        },
        {
          subheading: "5. Verification Gates: Automated Testing with pytest",
          paragraphs: [
            "Underpinning the entire pipeline is an automated test suite. Unit tests in tests/ assert format invariants before data advances to downstream analytical models:"
          ],
          code: {
            language: "python",
            code: "import pytest\nfrom stages.stage_03_curate_with_ai import validate_curation_payload\n\ndef test_curation_payload_valid():\n    sample_payload = {\n        \"uses_computational_tools\": True,\n        \"tools_deployed\": [\"VOSviewer\"],\n        \"methodological_phase\": \"network_analysis_and_visualization\",\n        \"empirical_data_sources\": [\"Scopus\"],\n        \"evidence_quote\": \"Co-authorship networks were constructed using VOSviewer.\"\n    }\n    assert validate_curation_payload(sample_payload) is True\n\ndef test_disallows_conversational_filler():\n    malformed_payload = {\n        \"uses_computational_tools\": True,\n        \"notes\": \"Here is what I found in the paper...\" # Fails schema: extraneous field\n    }\n    with pytest.raises(ValueError):\n        validate_curation_payload(malformed_payload)",
            caption: "Pytest unit tests asserting schema validity and rejecting conversational filler."
          }
        },
        {
          subheading: "6. Multivariate Correspondence Analysis (CA)",
          paragraphs: [
            "With normalized, curated datasets in data/processed/, the final stage computes contingency cross-tabulations (Software Tool × Empirical Data Source) and runs Simple Correspondence Analysis using Python's scientific ecosystem (prince, scipy, matplotlib), rendering publication-ready biplots directly into data/outputs/:"
          ],
          code: {
            language: "python",
            code: "import pandas as pd\nimport prince\nimport matplotlib.pyplot as plt\n\ndef generate_ca_biplot(contingency_matrix: pd.DataFrame, output_image_path: str):\n    \"\"\"\n    Computes 2D Correspondence Analysis and renders a publication-ready biplot.\n    Maps software tools and data sources into a shared inertial space.\n    \"\"\"\n    ca = prince.CA(n_components=2, n_iter=10, random_state=42)\n    ca = ca.fit(contingency_matrix)\n    \n    ax = ca.plot(\n        contingency_matrix,\n        show_row_labels=True,\n        show_col_labels=True\n    )\n    plt.title(\"Correspondence Analysis: Software Tools vs. Empirical Data Sources\")\n    plt.tight_layout()\n    plt.savefig(output_image_path, dpi=300)",
            caption: "Correspondence Analysis biplot generation from curated cross-tabulation matrices."
          }
        },
        {
          heading: "The Payoff: True Reproducibility, Agility, and Auditability",
          paragraphs: [
            "Comparing an auditable software pipeline against an ad-hoc manual workflow illustrates the practical benefits:"
          ],
          table: {
            headers: ["Dimension", "Ad-Hoc Manual Workflow", "Auditable Software Pipeline"],
            rows: [
              ["Data Extraction", "Manual browser downloads & copy-paste", "Automated script with polite API rate limiting"],
              ["Handling Edge Cases", "Subjective notes hidden inside cells", "Explicit schema fallback rules & assertions"],
              ["Semantic Curation", "Unstructured ChatGPT prompt or manual reading", "LLM with enforced JSON Schema & regex pre-filter"],
              ["Reproducibility", "Near zero (author-dependent)", "100% reproducible via single command & pytest"],
              ["Scope Change Latency", "Weeks of manual re-reading", "Minutes to update config and rerun pipeline"]
            ]
          }
        },
        {
          paragraphs: [
            "The biggest reward is agility. If a reviewer or committee member asks to expand the temporal window to include an additional volume, a manual workflow requires weeks of repetitive rereading. In a modular pipeline, you update a single parameter in the configuration file and rerun the stages. Minutes later, the new corpus is harvested, verified, curated, and analyzed.",
            "The role of artificial intelligence in scientific research is not to replace academic discernment or bypass critical thinking. It is to automate well-defined, auditable stages within a transparent software architecture where inputs are guarded, transformations are tested, and outputs are mathematically reproducible."
          ],
          callout: {
            icon: "⚡",
            text: "Explore the open research tools, schemas, and curated datasets on GitHub: https://github.com/GabrielBaiano/qss-ebbc-curator-ai"
          }
        }
      ]
    },
    {
      slug: "building-a-3d-pixel-art-bonfire-in-the-terminal",
      title: "Building a 3D Pixel-Art Bonfire in the Terminal: Raymarching, Cellular Automata Fire, and ANSI TrueColor Sub-Pixels",
      icon: "🔥",
      date: "Oct 2026",
      readTime: "16 min read",
      claps: 0,
      tags: ["C99", "Graphics", "Audio", "Terminal", "Physics"],
      url: "https://github.com/GabrielBaiano/fireplace-experiment",
      image: "/images/blog/fireplace/dark_souls_bonfire.gif",
      summary: "I'm an addicted Soulslike player with a strict study routine. While playing Dark Souls, I used to leave my character AFK at a bonfire to study for an hour and review exercises on call with friends before playing again. I built this 60 FPS terminal bonfire purely for fun, while studying 3D rendering concepts and prototyping graphics experiments for my upcoming Playdate game.",
      sections: [
        {
          heading: "AFK at the Bonfire: How the Idea Started",
          image: {
            src: "/images/blog/fireplace/dark_souls_bonfire.gif",
            alt: "Real-time 60 FPS Dark Souls Bonfire terminal mode",
            caption: "Real-time 60 FPS terminal bonfire running Dark Souls Coiled Sword mode with 3D raymarching, cel-shading outlines, and cellular fire.",
            pixelated: true,
          },
          paragraphs: [
            "If you look at how I spend my time, two things stand out immediately: I am an addicted Soulslike player, and I follow my daily study schedule strictly to the letter.",
            "Whenever I was playing Dark Souls and study time arrived, I had a specific habit: instead of shutting down the game, I would rest my character at the nearest bonfire, leave it AFK with the crackling fire sound echoing in the background, jump into a Discord call with friends, and spend a full hour reviewing technical questions, computer science fundamentals, and exercises before picking up the controller again.",
            "That bonfire wasn't just a checkpoint in Lordran; it became the anchor of my study routine. Eventually I asked myself: why not bring that exact feeling straight into my development terminal?",
            "To be clear: I didn't build this project to fight against modern frameworks or make any grand statement. I built it purely for fun, curiosity, and the joy of experimenting. At the time, I was studying 3D software rendering from first principles and prototyping graphics ideas for a game I'm developing for the Panic Playdate handheld. A terminal bonfire was the perfect playground."
          ],
          callout: {
            icon: "🔥",
            text: "The goal was simple and fun: render a living 3D pixel-art Dark Souls bonfire inside a Linux terminal at locked 60 FPS with zero runtime dependencies — pure C99, raw math, and the terminal itself."
          }
        },
        {
          heading: "The Bonfire as a Study Anchor",
          paragraphs: [
            "In Dark Souls, the bonfire is the ultimate sanctuary. It is the only place in a punishing world where you can rest, reset, refill your flasks, and plan your next move. Bringing that ritual into a terminal timer made total sense for long study and coding sessions.",
            "Instead of an annoying buzzer or a generic countdown, the entire lifecycle is modeled through the state and physics of the fire itself:"
          ],
          bullets: [
            "**Unlit State**: The bonfire sits cold and dormant — the coiled sword thrust into a bed of charred ash and bone.",
            "**Ignition (`[E]` / `Space`)**: Kindling the flame triggers a radial spark burst, plays the iconic Dark Souls chime, and burns the golden banner 'BONFIRE LIT' across the terminal.",
            "**Focus Phase**: The fire roars with turbulent buoyancy, shedding embers and casting dynamic heat across the hearth as you work.",
            "**Rest Phase**: When study time is up, the flame settles into glowing crimson embers (`FIRE_STATE_SMOLDERING_REST`), signaling that it's time to take a breath."
          ]
        },
        {
          heading: "Visual Architecture: Doing Everything in 1.8 Milliseconds",
          paragraphs: [
            "When I started coding this, I wanted it to run at a locked 60 FPS in any terminal without burning CPU or draining my laptop battery. At 60 FPS, you have roughly 16.6 milliseconds per frame.",
            "The engine ends up executing in around 1.8 ms, split across five clean stages:"
          ],
          code: {
            language: "text",
            caption: "5-Stage 60 FPS Software Render Pipeline",
            code: "Simulation Update (Combustion, Particles, Gravity Collapse)\n       │\n       ▼\n3D Raymarching & Rasterization (Camera Transform, G-Buffer Fill)\n       │\n       ▼\nPixel-Art Quantization (Depth Discontinuity Outlines, Palette Shading)\n       │\n       ▼\nCellular Automata Fire Layer (Convection, Wind, Flame Decay)\n       │\n       ▼\nANSI Frame Buffer Generator (Half-Block '▀', 24-bit RGB Pairing)\n       │\n       ▼\nSingle atomic write() to TTY stdout"
          }
        },
        {
          heading: "The Mathematics of the 3D Camera & Geometry",
          subheading: "Spherical Orbit Coordinate Transform",
          paragraphs: [
            "Because I wanted to be able to smoothly orbit the camera around the bonfire with the mouse or arrow keys, I set up a spherical coordinate camera centered on the target $\\vec{T} = (0, y_{\\text{target}}, 0)$:",
            "Given yaw $\\theta$ (horizontal azimuth) and pitch $\\phi$ (vertical elevation) with orbital distance $R$:",
            "$$\\begin{aligned} \\text{eye}_x &= T_x + R \\cos(\\phi) \\sin(\\theta) \\\\ \\text{eye}_y &= T_y + R \\sin(\\phi) \\\\ \\text{eye}_z &= T_z + R \\cos(\\phi) \\cos(\\theta) \\end{aligned}$$",
            "To map world-space coordinates to camera view-space, we construct an orthonormal basis $(\\vec{u}, \\vec{v}, \\vec{w})$ using the Gram-Schmidt process:",
            "$$\\vec{w} = \\frac{\\vec{T} - \\vec{\\text{eye}}}{\\|\\vec{T} - \\vec{\\text{eye}}\\|}, \\quad \\vec{u} = \\frac{\\vec{w} \\times \\vec{\\text{up}}}{\\|\\vec{w} \\times \\vec{\\text{up}}\\|}, \\quad \\vec{v} = \\vec{u} \\times \\vec{w}$$",
            "For any 3D vertex $\\vec{P}_w$, its camera-space position $\\vec{P}_c$ is:",
            "$$\\vec{P}_c = \\begin{bmatrix} \\vec{u}_x & \\vec{u}_y & \\vec{u}_z \\\\ \\vec{v}_x & \\vec{v}_y & \\vec{v}_z \\\\ \\vec{w}_x & \\vec{w}_y & \\vec{w}_z \\end{bmatrix} (\\vec{P}_w - \\vec{\\text{eye}})$$",
            "Perspective projection to screen coordinates $(x_s, y_s)$ is computed using the focal length $f$:",
            "$$x_s = \\frac{W}{2} + \\frac{P_{c,x} \\cdot f}{P_{c,z}} \\cdot \\text{scale}_x, \\quad y_s = \\frac{H}{2} - \\frac{P_{c,y} \\cdot f}{P_{c,z}} \\cdot \\text{scale}_y$$",
            "Because terminal font glyphs are roughly twice as tall as they are wide, we set $\\text{scale}_y = 0.5 \\cdot \\text{scale}_x$ to enforce a strictly isotropic 1:1 circular aspect ratio."
          ],
          image: {
            src: "/images/blog/fireplace/camera_orbit_views.png",
            alt: "3D Camera orbit spherical angles",
            caption: "Spherical camera orbit views around the procedural hearth geometry at varying yaw and pitch angles.",
          }
        },
        {
          subheading: "Procedural Geometry: Coiled Sword & Human Skulls",
          paragraphs: [
            "Instead of shipping bulky 3D OBJ or GLTF meshes, all geometry is modeled parametrically in C.",
            "The Dark Souls Coiled Sword (*Espada Espiral*) is generated as a double-helix ribbon twisting along its vertical axis:",
            "$$x(t) = r(t) \\cdot \\cos(\\omega t), \\quad z(t) = r(t) \\cdot \\sin(\\omega t), \\quad y(t) = y_{\\text{base}} + h \\cdot t$$",
            "Where $\\omega = 7.5 \\text{ rad/unit}$ controls the helical twist frequency and $r(t)$ tapers from hilt to tip. The blade's dynamic normals catch light realistically:",
            "$$\\vec{N}(t) = \\left( \\frac{\\partial x}{\\partial t}, \\frac{\\partial y}{\\partial t}, \\frac{\\partial z}{\\partial t} \\right) \\times \\hat{e}_\\theta$$",
            "Surrounding the base is a mound of porous ash and human skulls. Each skull is modeled by combining an ellipsoidal cranial mass:",
            "$$\\frac{(x - x_0)^2}{a^2} + \\frac{(y - y_0)^2}{b^2} + \\frac{(z - z_0)^2}{c^2} \\le 1$$",
            "with negative spherical subtraction volumes positioned at the eye sockets $(\\pm d_x, d_y, d_z)$ and nasal cavity."
          ]
        },
        {
          heading: "Why Low-Poly 3D Isn't Pixel Art (The G-Buffer)",
          paragraphs: [
            "A common mistake in retro-style renderers is simply rasterizing 3D polygons at a low resolution (e.g., $80 \\times 48$). The result doesn't look like pixel art — it looks like a muddy PlayStation 1 game.",
            "Authentic pixel art has rules: crisp 1-pixel cel-art dark silhouettes separating depth planes, discrete bark plates, and indexed color ramps.",
            "To bridge continuous 3D mathematics with handcrafted pixel art, the engine renders into a multi-layer G-Buffer with three distinct layers per sub-pixel: Color Buffer $C(x, y) \\in \\text{RGB}$, Float Depth Buffer $Z(x, y) \\in \\mathbb{R}^+$, and Material/Object ID Buffer $M(x, y) \\in \\mathbb{N}$ (e.g., $1 = \\text{sword}, 2 = \\text{bone}, 3 = \\text{bark}, 4 = \\text{endcap}, 5 = \\text{stone}$).",
            "After geometry rasterization, a post-processing quantization pass scans the G-Buffer with a 4-neighborhood directional kernel: $\\mathcal{N}(x, y) = \\{(x+1, y), (x-1, y), (x, y+1), (x, y-1)\\}$. An edge is detected if depth or material ID jumps across neighboring pixels:",
            "$$\\text{IsEdge}(x, y) = \\left( \\max_{(i, j) \\in \\mathcal{N}} |Z(x, y) - Z(i, j)| > \\epsilon_z \\right) \\lor \\left( \\exists (i, j) \\in \\mathcal{N} : M(x, y) \\neq M(i, j) \\right)$$",
            "When an edge is detected, the pixel is clamped to a dark silhouette outline:",
            "$$C_{\\text{final}}(x, y) = \\begin{cases} C(x, y) \\times 0.22, & \\text{if IsEdge}(x, y) \\\\ C_{\\text{quantized}}(x, y), & \\text{otherwise} \\end{cases}$$",
            "Lighting does not use smooth continuous diffuse gradients. Instead, the diffuse term $L = \\vec{N} \\cdot \\vec{L}_{\\text{light}}$ is stepped into 3–4 discrete quantization bands:",
            "$$L_{\\text{band}} = \\left\\lfloor L \\cdot 4.0 \\right\\rfloor / 4.0$$",
            "These bands index into hand-tuned retro color ramps (`PALETTE_WOOD`, `PALETTE_EMBERS`, `PALETTE_STONE`), producing authentic 16-bit cel-shaded pixel art directly from 3D vector space."
          ]
        },
        {
          heading: "Thermodynamics: Why Fire Needs Depth",
          paragraphs: [
            "Classic 2D terminal fire (like the 1990s PSX Doom demo) ignites a flat bottom row and propagates heat upward with a blurring kernel. It is visually charming, but fundamentally flat: you cannot rotate the camera, fire cannot wrap around physical logs, and logs cannot burn, char, and collapse under gravity.",
            "In this engine, fire is simulated via a convective thermal grid $H(x, y) \\in [0.0, 1.0]$ driven directly by physical combustion:",
            "1. **Geometry-Coupled Heat Sources**: Flames only emit where fuel exists. We query the world-space heat of logs, kindling twigs, and the central ash bed. Only pixels with burning fuel inject thermal energy into the simulation base.",
            "2. **Buoyant Updraft**: Hot air rises faster than cool air:",
            "$$v_y(x, y) = v_0 + \\beta \\cdot H(x, y)$$",
            "3. **Lateral Wind & Turbulence**: A pseudo-random vector field simulates turbulent vortex shedding and smoke drift:",
            "$$x' = x + \\sin(t \\cdot 4.2 + y \\cdot 0.3) + \\text{rand}(-1, 1)$$",
            "Thermal energy decays stochastically as it ascends:",
            "$$H_{t+1}(x', y - 1) = \\left( H_t(x, y) \\times \\gamma \\right) - \\delta_{\\text{cooling}}$$"
          ],
          code: {
            language: "text",
            caption: "Thermal Buoyancy & Convection Transfer",
            code: "Hot Air Rises (y - 1)\n       ▲\n   [ 0.72 ]  <-- Heat decays & shifts laterally\n       ▲\n [0.85] [0.92] [0.81]\n       ▲\n  ╔═════════════╗\n  ║ Burning Log ║  <-- Fuel Source: T > Ignition\n  ╚═════════════╝"
          }
        },
        {
          subheading: "Wood Thermodynamics & Structural Collapse",
          paragraphs: [
            "In classic mode, each wood log is subdivided into 10 independent longitudinal segments tracking Temperature, Moisture content, Structural mass, and Char layer thickness.",
            "The combustion cycle follows 4 realistic physical stages:"
          ],
          bullets: [
            "**Drying Phase**: Ambient heat boils away internal moisture. While moisture remains, segment temperature is clamped below ignition threshold and steam particles emit.",
            "**Flaming Combustion**: Once dry and above ignition threshold, combustion begins. Segments radiate heat to adjacent wood and spawn spark particles.",
            "**Charring**: As structural mass is consumed, wood turns from fresh bark to blackened char, then brittle white ash.",
            "**Structural Failure & Gravity Collapse**: If central segments burn away (mass < 20%), the log loses structural integrity. Kinematic angular acceleration collapses the upper logs into the embers bed."
          ],
          image: {
            src: "/images/blog/fireplace/snapshot_roaring.png",
            alt: "Roaring campfire with wood logs and glowing ember bed",
            caption: "Roaring campfire mode with segmented burning logs, ash mantle, and stone fire ring.",
          }
        },
        {
          heading: "Sub-Character Resolution: The 24-bit Half-Block ANSI Trick",
          paragraphs: [
            "Standard terminal character cells have an aspect ratio of roughly 1:2 (they are twice as tall as they are wide). If you print one character per simulation pixel, a circle looks like an elongated vertical oval.",
            "To solve this without external graphics libraries, we exploit the Unicode upper half-block glyph `▀` (U+2580). In a single terminal cell, the top half represents pixel $(x, 2y)$ via ANSI foreground color, and the bottom half represents pixel $(x, 2y+1)$ via ANSI background color.",
            "This effectively **doubles the vertical resolution**: an 80×24 terminal window renders at 80×48 individual TrueColor pixels.",
            "To guarantee zero tearing and zero flicker, the entire frame is formatted into a single contiguous buffer (`s_present_buf`) and sent to the kernel in a single atomic `write(STDOUT_FILENO, buf, len)` syscall."
          ]
        },
        {
          heading: "Audio from First Principles: The Pipe Buffer and the 503 Hz Ghost",
          paragraphs: [
            "Adding audio sounded like a quick 5-minute task. It wasn't. Playing audio in a terminal application without heavyweight dependencies like SDL2 or OpenAL turned into its own mini adventure.",
            "A naive attempt like calling `system(\"pw-play sound.wav &\")` is totally broken: spawning a subshell causes 30 ms frame drops, generates zombie processes (`<defunct>`) that pile up during a study session, and writing large audio chunks into Linux's default 64 KB pipe buffer can freeze the main render loop dead for 4.5 seconds waiting for the player to consume bytes.",
            "To keep the render loop locked at 60 FPS without dropping frames or leaving zombies behind, I built a double-fork detached worker architecture:"
          ],
          code: {
            language: "text",
            caption: "Double-Fork Non-Blocking Audio Architecture",
            code: "Main C Render Loop (60 FPS)\n  │\n  ├─► fork() intermediate child  [Takes <0.05 ms]\n  │     │\n  │     ├─► fork() audio feeder grandchild\n  │     │     │\n  │     │     └─► exec(\"pw-play --raw ...\")\n  │     │\n  │     └─► _exit(0)\n  │\n  └─► waitpid(child)  [Reaped instantly! Process reparented to PID 1]\n      Loop continues at 60 FPS without zombie accumulation!"
          }
        },
        {
          subheading: "FFT Spectrum Hunting: Killing the 503 Hz Ethereal Drone",
          quote: {
            text: "O som do darksouls tem um som estranho de oooonnnnnnnnnnn que tá mt alto e meio chato, um barulho meio etereo.",
            author: "Friend on Discord call",
          },
          paragraphs: [
            "When I first extracted the Dark Souls bonfire ambient audio from game recordings, a friend on our Discord call immediately noticed that irritating ringing drone overpowering the crackle.",
            "Running an FFT spectrum analysis on the audio clip revealed an enormous resonant spike at **503 Hz** (musical pitch B4) — an ethereal choir hum from the Firelink Shrine background track.",
            "I threw a parametric notch filter via FFmpeg to attenuate 503 Hz by -36 dB and its first harmonic at 251 Hz by -18 dB. The 503 Hz peak dropped by 97%, leaving only clean, warm ember crackles and low flame rumbles."
          ],
          code: {
            language: "bash",
            caption: "FFmpeg Parametric Notch Filter",
            code: "ffmpeg -i input.wav -af \"equalizer=f=503:width_type=q:w=3:g=-36,equalizer=f=251:width_type=q:w=2:g=-18\" output.wav"
          }
        },
        {
          subheading: "Gapless Looping with Raw S16LE Streaming",
          paragraphs: [
            "When looping short audio clips, restarting a .wav player causes an audible 200–400 ms gap due to ALSA/PipeWire sink renegotiation.",
            "The solution: launch `pw-play --raw --rate=22050 --channels=1 --format=s16 -` **once**. The feeder process keeps the pipe open and streams raw S16LE PCM chunks in an infinite circular buffer. When the sample index reaches the end, it wraps back to 0 instantaneously — resulting in seamless, click-free audio.",
            "Multiplying samples in real-time by a volume factor also enables software volume scaling without touching system mixers."
          ],
          code: {
            language: "c",
            caption: "Gapless S16LE PCM Circular Streaming Loop",
            code: "const int16_t *src = (const int16_t *)assets_ds_fire_ambient_pcm;\nsize_t total_samples = assets_ds_fire_ambient_pcm_len / sizeof(int16_t);\nfloat vol_factor = (float)volume_pct / 100.0f;\n\nint16_t chunk[1024];\nwhile (1) {\n    size_t sample_pos = 0;\n    while (sample_pos < total_samples) {\n        size_t batch = total_samples - sample_pos;\n        if (batch > 1024) batch = 1024;\n        for (size_t i = 0; i < batch; i++) {\n            chunk[i] = (int16_t)((float)src[sample_pos + i] * vol_factor);\n        }\n        write(audio_pipe[1], chunk, batch * sizeof(int16_t));\n        sample_pos += batch;\n    }\n}"
          }
        },
        {
          heading: "The Bug That Stole 9 Terminal Columns",
          paragraphs: [
            "One of the funniest visual bugs during development happened in the interactive settings menu: the top header box had width 66, but the options below had their right border shifted inward by exactly 9 characters, creating an unsightly notch.",
            "By calculating visible columns:",
            "$$1 (\\text{border}) + 1 (\\text{space}) + 2 (\\text{cursor}) + 24 (\\text{label}) + 2 (\\text{arrow}) + 23 (\\text{value}) + 2 (\\text{arrow}) + 1 (\\text{space}) + 1 (\\text{border}) = 57 \\text{ columns}$$",
            "$$66 - 57 = 9\\text{ columns missing!}$$",
            "Because lines are positioned using ANSI cursor escapes (`\\033[%d;%dH`), printing 57 characters placed the right border at column `start_c + 56` instead of `start_c + 65`. Every line was rewritten to guarantee exactly 64 inner columns between borders for 100% pixel-perfect borders."
          ]
        },
        {
          heading: "Performance Benchmarks & Headroom",
          paragraphs: [
            "Out of curiosity, I instrumented the engine with monotonic nanosecond timers (`clock_gettime(CLOCK_MONOTONIC)`) to see where the frame budget actually goes at 60 FPS (16.6 ms budget):"
          ],
          table: {
            headers: ["Stage", "Average Time (ms)", "Budget % (@ 60 FPS / 16.6 ms)"],
            rows: [
              ["Physics & Cellular Fire", "0.42 ms", "2.5%"],
              ["3D Rasterization & Cel-Art", "0.88 ms", "5.3%"],
              ["ANSI Frame Formatting", "0.35 ms", "2.1%"],
              ["Kernel TTY write()", "0.18 ms", "1.1%"],
              ["Total Engine Latency", "1.83 ms", "11.0%"]
            ]
          },
          callout: {
            icon: "⚡",
            text: "With total frame time under 2 ms, the engine runs at over 500 FPS theoretical throughput, leaving +89% CPU headroom for background audio decoding and battery longevity."
          }
        },
        {
          heading: "Experiments, Playdate, and Building for Fun",
          paragraphs: [
            "Writing a software rasterizer and cellular simulation in C99 without external engines or graphics libraries was one of the most fun and educational experiments I've tackled.",
            "Handling raymarching, spherical camera math, cellular automata, and raw terminal VT100 sequences by hand gave me immense intuition for low-level graphics. Many of the mathematical optimizations and memory layout tricks I explored here are feeding directly into how I design graphics and physics routines for my upcoming Playdate game, where hardware constraints are real and every CPU cycle counts.",
            "At the end of the day, programming shouldn't always be about optimizing business metrics or following convention. Sometimes the best projects are the ones you build simply because you love video games, love learning how things work under the hood, and wanted a cozy bonfire running while you study with your friends."
          ],
          callout: {
            icon: "🔥",
            text: "Explore the full source code, architecture documentation, and star the repository on GitHub: https://github.com/GabrielBaiano/fireplace-experiment"
          }
        }
      ]
    },
    {
      slug: "the-frontend-performance-paradox-and-the-duck",
      title: "The Frontend Performance Paradox and the Duck",
      icon: "🦆",
      date: "Sep 2026",
      readTime: "12 min read",
      claps: 6,
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
