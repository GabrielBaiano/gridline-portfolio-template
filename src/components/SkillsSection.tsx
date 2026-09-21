"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { useSound } from "./SoundProvider";

export function SkillsSection() {
  const { playTick, playClick } = useSound();

  return (
    <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <h2 className="text-[1.55rem] font-semibold text-[#333333] dark:text-[#d9d9d9] p-3">
        Skills & Technologies
      </h2>

      <div className="divider-dashed"></div>

      <div className="flex flex-wrap items-center justify-center gap-[8px] p-3">
        {portfolioData.skills.map((skill, idx) => (
          <a
            key={idx}
            href={`https://www.google.com/search?q=${encodeURIComponent(skill.search)}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playTick}
            onClick={playClick}
            className="group relative min-w-fit flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[8px] border border-border bg-transparent text-mutedForeground px-2 py-1 transition-all duration-300 hover:text-foreground/65 hover:border-foreground/65 hover:bg-bgHoverForeground select-none flex-1"
          >
            {skill.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={skill.icon}
                alt={skill.name}
                width={16}
                height={16}
                style={{ width: "16px", height: "16px" }}
              />
            ) : (
              <span className="size-4 rounded-full border border-border bg-muted flex items-center justify-center text-xs font-bold font-mono">
                {skill.letter}
              </span>
            )}
            <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground whitespace-nowrap">
              {skill.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
