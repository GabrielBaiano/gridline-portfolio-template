"use client";

import React, { useEffect, useState } from "react";
import { useSound } from "./SoundProvider";

const TEMPLATE_REPO_URL = "https://github.com/GabrielBaiano/gridline-portfolio-template";
const STORAGE_KEY = "gridline_template_notice_dismissed";

export function TemplateNotification() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const { playClick } = useSound();

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        return;
      }
    } catch {
      // ignore localStorage errors
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playClick();
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  const handleClick = () => {
    playClick();
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  if (!mounted) return null;

  return (
    <aside
      aria-label="Portfolio template notification"
      className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-[310px] transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="relative group rounded-lg border border-border bg-background/95 backdrop-blur-md p-3 shadow-lg hover:border-foreground/30 transition-all">
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          type="button"
          aria-label="Dismiss notification"
          data-cuelume-hover="tick"
          data-cuelume-press="press"
          className="absolute -top-2 -right-2 size-5 rounded-full border border-border bg-background hover:bg-mutedBackground text-muted hover:text-foreground flex items-center justify-center text-[10px] shadow-sm transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Link to repository */}
        <a
          href={TEMPLATE_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          data-cuelume-hover="tick"
          className="block pr-3 text-left"
        >
          <p className="text-xs font-semibold text-title leading-tight">
            Want this portfolio template?
          </p>
          <p className="text-[11px] text-muted mt-0.5 flex items-center gap-1 group-hover:text-foreground transition-colors">
            <span>Use it for your own site</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </p>
        </a>
      </div>
    </aside>
  );
}
