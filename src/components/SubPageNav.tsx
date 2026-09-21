"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useSound } from "./SoundProvider";

interface SubPageNavProps {
  backHref?: string;
  title: string;
}

export function SubPageNav({ backHref = "/", title }: SubPageNavProps) {
  const { isMuted, toggleMute, playClick, playTick } = useSound();

  return (
    <>
      <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-2.5 container-dashed">
        <div className="flex items-center justify-between gap-2">
          {/* Left: Back Link + Title */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href={backHref}
              aria-label="Go back"
              onMouseEnter={playTick}
              onClick={playClick}
              className="relative z-10 cursor-pointer p-1 border border-transparent hover:border-border hover:bg-mutedBackground rounded-[6px] transition-colors duration-300 shrink-0 text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
            <h1 className="text-[1.15rem] font-bold leading-tight text-title truncate">
              {title}
            </h1>
          </div>

          {/* Right: Sound toggle + Theme toggle */}
          <div className="flex items-center gap-1 shrink-0">
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
                  className="lucide lucide-volume2"
                >
                  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                  <path d="M16 9a5 5 0 0 1 0 6" />
                  <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                </svg>
              )}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="divider-dashed" />
    </>
  );
}
