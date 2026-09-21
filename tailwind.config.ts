import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-instagram-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border-color)",
        muted: "var(--muted-color)",
        mutedForeground: "var(--mutedForeground-color)",
        mutedBackground: "var(--mutedBackground-color)",
        mutedBackgroundHover: "var(--mutedBackgroundHover-color)",
        bgHover: "var(--bgHover-color)",
        bgHoverForeground: "var(--bgHoverForeground-color)",
        title: "var(--title-color)",
        strong: "var(--strong-color)",
      },
    },
  },
  plugins: [],
};

export default config;
