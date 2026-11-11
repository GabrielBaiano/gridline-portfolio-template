"use client";

import React, { useEffect, useState } from "react";
import { useSound } from "@/components/SoundProvider";

export interface TOCHeading {
  id: string;
  text: string;
  level?: number;
}

interface BlogFloatingTOCProps {
  headings: TOCHeading[];
}

export function BlogFloatingTOC({ headings }: BlogFloatingTOCProps) {
  const { playClick, playTick } = useSound();
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");

  useEffect(() => {
    if (!headings.length) return;

    const headingElements: HTMLElement[] = [];
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) headingElements.push(el);
    });

    if (headingElements.length === 0) return;

    const calculateActive = () => {
      const scrollPos = window.scrollY + 140;
      let currentActive = headings[0].id;
      for (const el of headingElements) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPos) {
          currentActive = el.id;
        } else {
          break;
        }
      }
      setActiveId(currentActive);
    };

    calculateActive();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", calculateActive, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", calculateActive);
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <aside
      aria-label="Table of contents"
      className="hidden xl:block absolute left-[calc(100%+32px)] top-0 w-[220px] h-full pointer-events-none select-none z-20"
    >
      <div className="sticky top-28 pt-6 pointer-events-auto max-h-[calc(100vh-140px)] overflow-y-auto pr-2 no-scrollbar">
        <div className="text-[11px] font-mono tracking-wider text-mutedForeground uppercase mb-2.5 flex items-center gap-1.5 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-mutedForeground"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span>Table of Contents</span>
        </div>

        <nav className="flex flex-col gap-0.5 border-l border-border/70 pl-2">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                  const targetEl = document.getElementById(h.id);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(null, "", `#${h.id}`);
                    setActiveId(h.id);
                  }
                }}
                onMouseEnter={playTick}
                title={h.text}
                className={`text-xs transition-all duration-150 py-1 px-1.5 rounded-[4px] leading-snug line-clamp-2 ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400 font-semibold bg-blue-500/10 -ml-[9px] border-l-2 border-blue-500 dark:border-blue-400 pl-2"
                    : "text-mutedForeground hover:text-foreground hover:bg-mutedBackground/40"
                }`}
              >
                {h.text}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
