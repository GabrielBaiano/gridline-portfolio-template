"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useSound } from "./SoundProvider";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { playClick } = useSound();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("darkMode");
    const dark = saved !== null ? saved === "true" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    playClick();
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("darkMode", String(next));
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative w-fit z-10 cursor-pointer p-1.5 rounded-[6px] hover:bg-[#f4f4f4] dark:hover:bg-[#1c1c1c] border border-transparent"
      aria-label="Switch to dark mode"
    >
      {mounted && isDark ? (
        <Sun className="w-4 h-4 text-[#9c9c9c]" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9c9c9c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-moon"
        >
          <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
        </svg>
      )}
    </button>
  );
}
