"use client";

import React, { useEffect, useState } from "react";
import { useSound } from "./SoundProvider";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      type="button"
      className={`group fixed right-4 bottom-4 z-50 cursor-pointer rounded-lg border border-border p-0.5 shadow-lg transition-all duration-300 ease-in-out sm:right-8 sm:bottom-8 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex h-full w-full items-center justify-center rounded-[8px] border border-border bg-[#555] dark:bg-[#aaa] group-hover:bg-[#222] dark:group-hover:bg-[#f5f5f5] p-1.5 transition duration-300">
        <svg
          aria-hidden="true"
          className="size-6 text-white dark:text-black"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m112 244 144-144 144 144M256 120v292"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
          />
        </svg>
      </div>
    </button>
  );
}
