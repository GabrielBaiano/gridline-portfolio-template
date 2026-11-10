"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSound } from "@/components/SoundProvider";

export interface TOCHeading {
  id: string;
  text: string;
  level?: 2 | 3;
}

interface BlogFloatingTOCProps {
  headings: TOCHeading[];
}

export function BlogFloatingTOC({ headings }: BlogFloatingTOCProps) {
  const { playClick, playTick } = useSound();
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const [readProgress, setReadProgress] = useState(0);
  const isClickingRef = useRef(false);

  // 1. Reading progress percentage tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / docHeight) * 100)));
            setReadProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Active heading detection via IntersectionObserver and scroll position
  useEffect(() => {
    if (!headings.length) return;

    const headingElements: HTMLElement[] = [];
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) headingElements.push(el);
    });

    if (headingElements.length === 0) return;

    const calculateActive = () => {
      if (isClickingRef.current) return;
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
        if (isClickingRef.current) return;
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
      className="hidden xl:block absolute left-[calc(100%+44px)] top-0 w-[240px] h-full pointer-events-none select-none z-20"
    >
      <div className="sticky top-28 pt-7 pointer-events-auto max-h-[calc(100vh-140px)] overflow-y-auto pr-1 no-scrollbar flex flex-col gap-2.5">
        {/* Header */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-mutedForeground font-semibold pb-1">
          <div className="flex items-center gap-1.5">
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
            <span>On This Page</span>
          </div>
          {readProgress > 0 && (
            <span className="text-[10px] font-mono font-medium text-mutedForeground tabular-nums">
              {readProgress}%
            </span>
          )}
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-0.5 border-l border-border/70 pl-2">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            const isSub = h.level === 3;
            return (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                  isClickingRef.current = true;
                  setActiveId(h.id);

                  const targetEl = document.getElementById(h.id);
                  if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(null, "", `#${h.id}`);
                  }

                  setTimeout(() => {
                    isClickingRef.current = false;
                  }, 600);
                }}
                onMouseEnter={playTick}
                title={h.text}
                className={`transition-all duration-150 py-1 px-2 rounded-r-[6px] leading-snug line-clamp-2 ${
                  isSub ? "text-[11px] pl-3.5" : "text-xs"
                } ${
                  isActive
                    ? "text-title font-medium bg-mutedBackground/60 -ml-[9px] border-l-2 border-title pl-2"
                    : "text-mutedForeground hover:text-foreground hover:bg-mutedBackground/30"
                }`}
              >
                {h.text}
              </a>
            );
          })}
        </nav>

        {/* Quick jump to top */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => {
              playClick();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={playTick}
            className="flex items-center gap-1.5 text-[11px] font-mono text-mutedForeground hover:text-title transition-colors cursor-pointer group"
          >
            <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
