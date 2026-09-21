"use client";

import React from "react";
import { useSound } from "@/components/SoundProvider";

interface ActionButtonProps {
  href?: string;
  label: string;
  icon: React.ReactNode;
}

export function ActionButton({ href, label, icon }: ActionButtonProps) {
  const { playTick, playClick } = useSound();

  if (!href) {
    return (
      <div className="py-[11px] flex text-[1.05rem] text-foreground opacity-40 w-full items-center justify-center cursor-not-allowed select-none">
        {icon}
        <div className="relative ml-1.5">
          <span>{label}</span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={playTick}
      onClick={playClick}
      className="group py-[11px] flex text-[1.05rem] text-foreground hover:text-title hover:bg-bgHover transition-all duration-300 w-full items-center justify-center cursor-pointer"
    >
      {icon}
      <div className="relative ml-1.5">
        <span>{label}</span>
        <span className="absolute left-0 bottom-0 w-full h-px bg-title origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
      </div>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-0 hidden lg:block group-hover:opacity-100 transition-opacity duration-300 ml-1"
        height="18"
        width="18"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </a>
  );
}

export function StackBadge({ name }: { name: string }) {
  const { playTick, playClick } = useSound();

  return (
    <a
      href={`https://www.google.com/search?q=${encodeURIComponent(name)}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={playTick}
      onClick={playClick}
      className="group relative flex cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-[8px] border border-border bg-transparent text-mutedForeground px-2.5 py-1 text-sm font-medium transition-all duration-300 hover:text-foreground hover:border-foreground/50 hover:bg-mutedBackground select-none"
    >
      <span className="truncate">{name}</span>
    </a>
  );
}
