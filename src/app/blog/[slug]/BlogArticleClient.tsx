"use client";

import React, { useState } from "react";
import { useSound } from "@/components/SoundProvider";

interface ClapButtonProps {
  initialClaps: number;
}

export function ClapButton({ initialClaps }: ClapButtonProps) {
  const { playClick } = useSound();
  const [claps, setClaps] = useState(initialClaps);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClap = () => {
    playClick();
    setClaps((prev) => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <button
      type="button"
      onClick={handleClap}
      data-cuelume-hover="tick"
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-border bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-all duration-200 cursor-pointer select-none ${
        isAnimating ? "scale-105" : "scale-100"
      }`}
      aria-label="Applaud this article"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 256 256"
        height="16"
        width="16"
        className={`transition-transform duration-200 ${
          isAnimating ? "-rotate-12 scale-110 text-title" : "text-mutedForeground group-hover:text-title"
        }`}
      >
        <path d="M199,187.76h0A71.67,71.67,0,0,0,190.34,140l-20.2-35a18,18,0,0,0-31.55,17.26L114.71,81A18,18,0,1,0,83.54,99L77.81,89,65.1,67A18,18,0,1,1,96.28,49L102,59a18,18,0,1,1,31.17-18l24.23,42a18,18,0,0,1,31.2-18l21.11,36.57A72,72,0,0,1,199,187.76Z" opacity="0.2" />
        <path d="M160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0ZM196.1,41a7.91,7.91,0,0,0,4.17,1.17,8,8,0,0,0,6.84-3.83l8-13.11a8,8,0,0,0-13.68-8.33l-8,13.1A8,8,0,0,0,196.1,41Zm47.51,12.59a8,8,0,0,0-10.08-5.16l-15.06,4.85a8,8,0,0,0,2.46,15.62,8.15,8.15,0,0,0,2.46-.39l15.05-4.85A8,8,0,0,0,243.61,53.55ZM217,97.58a80.22,80.22,0,0,1-10.22,94c-.34,1.73-.72,3.46-1.19,5.18A80.17,80.17,0,0,1,58.77,216L23.5,155a26,26,0,0,1,19.24-38.79l-3-5.2a26,26,0,0,1,19.2-38.78L58.24,71A26,26,0,0,1,95.47,36.53,26.06,26.06,0,0,1,140.3,37l12.26,21.2A26.07,26.07,0,0,1,195.81,61ZM109.07,55l0,0h0l25,43.17a26,26,0,0,1,17.33-10L126.42,45a10,10,0,1,0-17.35,10ZM72.12,63l6.46,11.17a26.05,26.05,0,0,1,17.32-10L89.45,53A10,10,0,1,0,72.12,63Zm111.54,81-20.22-35a10,10,0,0,0-17.74,9.25L158.3,140a8,8,0,0,1-13.87,8l-36.5-63A10,10,0,1,0,90.58,95l26.05,45a8,8,0,0,1-13.87,8L71,93h0l0,0a10,10,0,0,0-17.33,10l35.22,61A8,8,0,0,1,75,172L54.72,137a10,10,0,0,0-17.34,10l35.27,61a64.12,64.12,0,0,0,117.42-15.44A63.52,63.52,0,0,0,183.66,144Zm19.41-38.42L181.93,69A10,10,0,0,0,164.55,79l33,57.05A80.2,80.2,0,0,1,207,161.51,64.23,64.23,0,0,0,203.07,105.58Z" />
      </svg>
      <span className="text-xs font-semibold text-foreground tabular-nums">
        {claps} {claps === 1 ? "clap" : "claps"}
      </span>
    </button>
  );
}

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
  const { playClick } = useSound();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      playClick();
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative my-4 rounded-[10px] border border-border bg-zinc-950 text-zinc-100 overflow-hidden text-xs">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-800 bg-zinc-900/60 select-none">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-zinc-400">
          {language}
        </span>
        <button
          type="button"
          onClick={copyToClipboard}
          className="text-[0.7rem] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto font-mono text-[0.8rem] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
