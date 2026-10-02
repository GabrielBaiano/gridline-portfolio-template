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
  subheading?: string;
  paragraphs?: string[];
  bullets?: string[];
  listOrdered?: boolean;
  code?: {
    language: string;
    code: string;
    caption?: string;
  };
  callout?: {
    icon?: string;
    text: string;
  };
  quote?: {
    text: string;
    author?: string;
  };
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
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
    }
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
      name: "fireplace-experiment",
      description: "60 FPS 3D pixel-art bonfire Pomodoro timer written in C99 with raymarching and gapless audio.",
      url: "https://github.com/GabrielBaiano/fireplace-experiment",
      language: "C",
    },
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
      slug: "building-a-3d-pixel-art-bonfire-in-the-terminal",
      title: "Building a 3D Pixel-Art Bonfire in the Terminal: Raymarching, Cellular Automata Fire, and ANSI TrueColor Sub-Pixels",
      date: "Oct 2026",
      readTime: "16 min read",
      claps: 142,
      tags: ["C99", "Graphics", "Audio", "Terminal", "Physics"],
      url: "https://github.com/GabrielBaiano/fireplace-experiment",
      image: "/images/blog/fireplace/dark_souls_bonfire.gif",
      summary: "How we built a 60 FPS 3D pixel-art bonfire Pomodoro timer in pure C99 from first principles: spherical raymarching, cel-shaded quantization, buoyant cellular fire, gapless raw PCM streaming, and ANSI TrueColor half-blocks.",
      sections: [
        {
          heading: "The Vision: Why 3D Pixel Art in a Terminal?",
          image: {
            src: "/images/blog/fireplace/dark_souls_bonfire.gif",
            alt: "Real-time 60 FPS Dark Souls Bonfire terminal mode",
            caption: "Real-time 60 FPS terminal bonfire running Dark Souls Coiled Sword mode with 3D raymarching and cellular fire.",
          },
          paragraphs: [
            "Over the last few days, what began as an idea for a cozy command-line Pomodoro timer spiraled into an obsessive technical journey: writing a complete 3D software rendering engine from scratch in C99 that translates continuous 3D geometry into discrete, cel-shaded 16-bit pixel art, drives a buoyant cellular automata fire simulation, streams gapless PCM audio without dropping a single frame, and prints everything into standard Linux terminal emulators at 60 FPS using 24-bit TrueColor ANSI half-blocks.",
            "Most terminal fire implementations (including the classic 1990s PSX Doom fire demo) rely on a 2D procedural heat matrix. You ignite the bottom line with random numbers, propagate the values upward with a smoothing kernel, and map the values to a color gradient.",
            "While charming, 2D terminal fire has a glaring limitation: **it has no depth**. You cannot rotate the camera, you cannot place an object inside the fire and have flames wrap realistically around it, and you cannot have structural logs burn, char, and collapse under gravity.",
            "Our architectural goal was fundamentally different:"
          ],
          bullets: [
            "Model physical objects in continuous 3D world-space (wood logs, rocks, twigs, and the iconic Dark Souls Coiled Sword inserted into a mound of ash and human bones).",
            "Allow full 3D spherical camera orbit (yaw and pitch controls, auto-turntable).",
            "Transform that continuous 3D rasterization into **authentic 16-bit pixel art** — not low-poly 3D rendered at low resolution, but actual pixel art with 1-pixel cel-art dark silhouettes, discrete bark plates, and indexed color palettes.",
            "Wrap it in a non-intrusive Pomodoro flow with authentic sound effects and zero external runtime dependencies."
          ]
        },
        {
          heading: "Visual Architecture: From 3D Space to Half-Blocks",
          paragraphs: [
            "The rendering pipeline executes every frame in five distinct stages with strict separation of concerns:"
          ],
          code: {
            language: "text",
            caption: "5-Stage 60 FPS Software Render Pipeline",
            code: "Simulation Update (Combustion, Particles, Collapse)\n       │\n       ▼\n3D Rasterization & Raymarching (Camera Transform, G-Buffer Fill)\n       │\n       ▼\nPixel-Art Quantization (Depth Discontinuity Outlines, Palette Shading)\n       │\n       ▼\nCellular Automata Fire Layer (Convection, Wind, Flame Decay)\n       │\n       ▼\nANSI Frame Buffer Generator (Half-Block '▀', 24-bit RGB Pairing)\n       │\n       ▼\nSingle atomic write() to TTY stdout"
          }
        },
        {
          heading: "The Mathematics of the 3D Camera & Geometry",
          subheading: "Spherical Orbit Coordinate Transform",
          paragraphs: [
            "The camera operates on a spherical coordinate orbit centered on the target focal point $T = (0, y_{target}, 0)$.",
            "Given yaw $\\theta$ (horizontal azimuth) and pitch $\\phi$ (vertical elevation) with orbital distance $R$:",
            "eye_x = T_x + R * cos(phi) * sin(theta)\neye_y = T_y + R * sin(phi)\neye_z = T_z + R * cos(phi) * cos(theta)",
            "To map world-space vertices to view-space, we construct an orthonormal camera basis (u, v, w) using the Gram-Schmidt process. Perspective projection to screen coordinates accounts for the rectangular aspect ratio of terminal fonts (glyph height is roughly 2x width), setting `scale_y = 0.5 * scale_x` to guarantee a strictly isotropic 1:1 circular aspect ratio."
          ],
          image: {
            src: "/images/blog/fireplace/camera_orbit_views.png",
            alt: "3D Camera orbit spherical angles",
            caption: "Spherical camera orbit views around the procedural hearth geometry at varying yaw and pitch.",
          }
        },
        {
          subheading: "Procedural Geometry: Coiled Sword & Skulls",
          paragraphs: [
            "The Dark Souls Coiled Sword (*Espada Espiral*) is modeled parametrically in pure math rather than loading an external 3D file. The blade twists along its longitudinal axis like a double-helix ribbon:",
            "x(t) = r(t) * cos(omega * t),   z(t) = r(t) * sin(omega * t),   y(t) = y_base + h * t",
            "Where $\\omega = 7.5\\text{ rad/unit}$ controls the helical twist frequency and $r(t)$ tapers from hilt to tip. The twisted ribs catch lighting normals dynamically.",
            "Surrounding the sword is a mound of porous ash and human skull bones. Each skull combines an ellipsoidal cranial mass with negative spherical subtraction volumes positioned at the eye sockets and nasal cavity."
          ]
        },
        {
          heading: "The Quantization Pipeline: Continuous 3D to Discrete Pixel Art",
          subheading: "G-Buffer Architecture & Cel-Art Silhouettes",
          paragraphs: [
            "If you simply rasterize 3D polygons at low resolutions (e.g. 80x48), the result looks like a muddy PlayStation 1 game — not pixel art. Handcrafted pixel art requires crisp 1-pixel cel-art silhouettes separating depth layers and discrete tonal shading bands.",
            "To achieve this, the renderer outputs to a G-Buffer with three distinct layers per sub-pixel: Color Buffer $C(x, y)$, Float Depth Buffer $Z(x, y)$, and Material/Object ID Buffer $M(x, y)$ (e.g., sword, bone, bark, endcap, stone).",
            "After rasterization, a post-processing pass scans the G-Buffer with a 4-neighborhood directional kernel: $\\mathcal{N}(x, y) = \\{(x+1, y), (x-1, y), (x, y+1), (x, y-1)\\}$. An edge is detected if either the depth gradient or the material boundary exceeds a perceptual threshold:",
            "IsEdge(x, y) = ( max |Z(x, y) - Z(i, j)| > epsilon_z ) OR ( exists M(x, y) != M(i, j) )",
            "Detected edge pixels are clamped to a dark silhouette tone ($C_{final} = C * 0.22$), creating comic-book cel outlines. Diffuse illumination is quantized into 3 to 4 discrete steps ($L_{band} = \\lfloor L * 4.0 \\rfloor / 4.0$), indexing into hand-tuned retro color ramps."
          ]
        },
        {
          heading: "The Fire Engine: Cellular Automata & Buoyant Convection",
          paragraphs: [
            "Once solid geometry is rasterized and cel-shaded, the cellular automata fire simulation takes over.",
            "The fire is modeled as a 2D convective thermal grid $H(x, y) \\in [0.0, 1.0]$. Unlike classic Doom fire:",
            "1. **Flames only emit from burning geometry**: We query the world-space heat of logs, kindling twigs, and the central ash bed. Only pixels with burning wood inject heat into the simulation base.",
            "2. **Thermal buoyancy**: Hot air rises faster than cool air: $v_y(x, y) = v_0 + \\beta \\cdot H(x, y)$.",
            "3. **Lateral turbulence**: A pseudo-random wind vector field simulates turbulent vortex shedding: $x' = x + \\sin(t \\cdot 4.2 + y \\cdot 0.3) + \\text{rand}(-1, 1)$.",
            "Thermal energy decays as it ascends: $H_{t+1}(x', y - 1) = (H_t(x, y) \\cdot \\gamma) - \\delta_{cooling}$."
          ],
          code: {
            language: "text",
            caption: "Thermal Buoyancy & Convection Transfer",
            code: "Hot Air Rises (y - 1)\n       ▲\n   [ 0.72 ]  <-- Heat decays & shifts laterally\n       ▲\n [0.85] [0.92] [0.81]\n       ▲\n  ╔═════════════╗\n  ║ Burning Log ║  <-- Fuel Source: T > Ignition\n  ╚═════════════╝"
          }
        },
        {
          heading: "Wood Thermodynamics & Kinematic Self-Collapse",
          paragraphs: [
            "Each log is subdivided into 10 independent longitudinal segments tracking Temperature, Moisture content, Structural mass, and Char layer thickness.",
            "The combustion cycle evolves through 4 physical phases:"
          ],
          bullets: [
            "**Drying Phase**: Ambient heat boils away moisture. While moisture remains, segment temperature is clamped below ignition threshold and steam particles emit.",
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
            "A standard terminal cell is roughly twice as tall as it is wide. If you print one character per simulation pixel, circular objects look like stretched vertical ovals.",
            "To solve this, we use the Unicode upper half-block glyph `▀` (U+2580). In a single terminal cell, the top half represents pixel $(x, 2y)$ via ANSI foreground color, and the bottom half represents pixel $(x, 2y+1)$ via ANSI background color.",
            "This effectively **doubles vertical resolution**: an 80x24 terminal window renders at 80x48 individual TrueColor pixels!",
            "To guarantee zero tearing and zero flicker, the entire frame is formatted into a single contiguous buffer (`s_present_buf`) and sent to the kernel in a single atomic `write(STDOUT_FILENO, buf, len)` syscall."
          ]
        },
        {
          heading: "The Audio Architecture: Non-Blocking Gapless Raw PCM Streaming",
          subheading: "The Zombie Process & Pipe Buffer Pitfall",
          paragraphs: [
            "Adding audio to a terminal C application without external runtime dependencies (like SDL2 or OpenAL) is notoriously tricky.",
            "A naive `system(\"pw-play sound.wav &\")` is fatally flawed: it spawns a shell causing frame drops, generates zombie processes (`<defunct>`) that accumulate across a 25-minute Pomodoro session, and writing large audio chunks into Linux's default 64 KB pipe buffer causes the main render loop to freeze dead for 4.5 seconds waiting for the player!",
            "To achieve zero frame drops, we engineered a double-fork detached worker architecture:"
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
            author: "Beta User Feedback",
          },
          paragraphs: [
            "When we extracted the Dark Souls bonfire ambient audio from game recordings, users noted a loud ringing hum overpowering the crackle. We wrote a Python FFT spectrum analysis script and discovered an enormous resonant spike at **503 Hz** (musical pitch B4) — an ethereal choir hum from the Firelink Shrine background track!",
            "We deployed a parametric notch filter via FFmpeg to attenuate 503 Hz by -36 dB and its first harmonic at 251 Hz by -18 dB. The 503 Hz peak dropped by 97%, leaving clean, warm ember crackles and low flame rumbles."
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
          heading: "Debugging War Stories: The 9-Character Menu Drift",
          paragraphs: [
            "During development, the terminal configuration menu had a frustrating visual glitch: the top header box had width 66, but the middle option rows had their right border shifted inward by 9 characters, creating an ugly jagged notch.",
            "By calculating visible columns: Border (1) + Space (1) + Cursor (2) + Label (24) + Arrow (2) + Value (23) + Arrow (2) + Space (1) + Border (1) = 57 columns. 66 - 57 = 9 columns missing!",
            "Because lines are positioned using ANSI cursor escapes (`\\033[%d;%dH`), printing 57 characters placed the right border at column `start_c + 56` instead of `start_c + 65`. Every line was rewritten to guarantee exactly 64 inner columns between borders for 100% pixel-perfect borders."
          ]
        },
        {
          heading: "Performance Benchmarks & Headroom",
          paragraphs: [
            "We instrumented the engine with monotonic nanosecond timers (`clock_gettime(CLOCK_MONOTONIC)`) to measure frame budget at 60 FPS (16.6 ms budget):"
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
          heading: "Running It Yourself & Controls",
          paragraphs: [
            "The entire engine is contained in a single C file (`fireplace.c`) with zero external dependencies beyond libc and POSIX math:"
          ],
          code: {
            language: "bash",
            caption: "Compilation & Launch",
            code: "git clone https://github.com/GabrielBaiano/fireplace-experiment.git\ncd fireplace-experiment\nmake clean && make\n./fireplace"
          },
          table: {
            headers: ["Key", "Action"],
            rows: [
              ["[E] / [Space]", "Kindle or stoke bonfire / rekindle embers"],
              ["[P]", "Pause / Resume Pomodoro session"],
              ["[S]", "Skip current session (Focus <-> Rest)"],
              ["[M]", "Mute / Unmute audio"],
              ["[-] / [+]", "Volume down / up (10% increments)"],
              ["[W] [A] [S] [D]", "Orbit 3D spherical camera"],
              ["[Space]", "Toggle 3D turntable auto-rotation (classic mode)"],
              ["[Q]", "Clean exit and terminal reset"]
            ]
          },
          quote: {
            text: "Written in the spirit of Simon Willison's weblog: sharing the code, the math, the bugs, and the joy of building custom software from first principles.",
            author: "Gabriel Gama"
          },
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
