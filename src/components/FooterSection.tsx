import React from "react";
import { portfolioData } from "@/data/portfolio";

export function FooterSection() {
  return (
    <footer className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 container-dashed">
      <div className="py-4 sm:py-6 flex flex-col items-center text-center relative overflow-hidden group">
        {/* Quote SVG */}
        <svg
          className="sm:text-4xl text-3xl text-[var(--grid-color)] mb-4 sm:mb-6"
          fill="currentColor"
          height="1em"
          stroke="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
        </svg>

        <blockquote className="relative z-10 max-w-2xl px-1 sm:px-4">
          <p className="text-xl sm:text-3xl font-bold italic text-title leading-relaxed tracking-tight">
            “{portfolioData.quote.text}”
          </p>
        </blockquote>

        <div className="sm:mt-8 mt-6 flex items-center gap-3 z-10">
          <div className="h-px w-8 bg-border"></div>
          <span className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-widest">
            {portfolioData.quote.author}
          </span>
          <div className="h-px w-8 bg-border"></div>
        </div>
      </div>
    </footer>
  );
}
