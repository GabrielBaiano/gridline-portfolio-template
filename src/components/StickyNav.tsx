"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useSound } from "./SoundProvider";
import { portfolioData } from "@/data/portfolio";

export function StickyNav() {
  const { isMuted, toggleMute, playClick } = useSound();

  return (
    <div className="sticky top-0 z-50">
      <div className="relative z-50 bg-background">
        <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 container-dashed">
          <div className="flex items-stretch justify-between">
            {/* Left: Avatar + Title + Subtitle */}
            <div className="flex items-center gap-3">
              <div
                className="sm:size-12 size-11 shrink-0 border border-border rounded-[12px] p-[4px]"
                style={{ background: "var(--background)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portfolioData.personal.avatar || "/images/logo/avatar.jpg"}
                  alt={portfolioData.personal.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover border border-border rounded-[8px]"
                />
              </div>
              <div className="flex flex-col justify-between h-full py-1 select-none">
                <h1 className="text-[1.55rem] font-bold leading-[1.08] text-[#333] dark:text-[#ebebeb]">
                  {portfolioData.personal.name}
                </h1>
                <p
                  className="text-sm text-[#9c9c9c] dark:text-[#5c5c5c] transition-all duration-1000 ease-out"
                  style={{ opacity: 1, filter: "blur(0px)" }}
                >
                  {portfolioData.personal.statusBadge}
                </p>
              </div>
            </div>

            {/* Right: Sound toggle + Theme toggle + View count */}
            <div className="flex flex-col justify-between items-end">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    toggleMute();
                    playClick();
                  }}
                  className="relative z-10 w-fit cursor-pointer rounded-[6px] border border-transparent p-1.5 text-mutedForeground transition-colors duration-300 hover:border-border hover:bg-mutedBackground hover:text-foreground"
                  aria-label="Mute sound effects"
                  aria-pressed={isMuted}
                >
                  {isMuted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-volume2 lucide-volume-2"
                    >
                      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                      <path d="M16 9a5 5 0 0 1 0 6" />
                      <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                    </svg>
                  )}
                </button>
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9c9c9c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-eye"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span className="text-sm text-[#9c9c9c] tabular-nums">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider-dashed"></div>
    </div>
  );
}
