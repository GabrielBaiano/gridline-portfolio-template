"use client";

import React, { useState } from "react";
import { portfolioData, Experience } from "@/data/portfolio";
import { useSound } from "./SoundProvider";

export function ExperienceSection() {
  const { playClick } = useSound();
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    playClick();
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderLogo = (exp: Experience) => {
    if (exp.logo) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={exp.company}
          className="w-full h-full object-cover border border-border rounded-[8px] p-1.5"
          decoding="async"
          draggable="false"
          height="56"
          loading="lazy"
          src={exp.logo}
          width="56"
        />
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-building-2 text-muted"
      >
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
      </svg>
    );
  };

  return (
    <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <h2 className="text-[1.55rem] font-semibold text-[#333333] dark:text-[#d9d9d9] p-3">
        Experiences
      </h2>

      <div className="divider-dashed"></div>

      <div className="flex flex-col">
        {portfolioData.experiences.map((exp, index) => {
          const isOpen = openIndices.includes(index);

          return (
            <div key={index}>
              <div className="m-1">
                <div className="flex flex-col">
                  {/* Header Row */}
                  <div
                    onClick={() => toggleIndex(index)}
                    data-cuelume-hover="tick"
                    data-cuelume-press="true"
                    className="flex transition-colors duration-300 p-3 flex-row gap-4 justify-between select-none group hover:bg-bgHover cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1 truncate sm:truncate-none">
                      <div className="shrink-0 sm:size-12 size-11 rounded-[10px] border p-[2px] bg-background border-border flex items-center justify-center overflow-hidden">
                        {renderLogo(exp)}
                      </div>

                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="sm:text-[1.20rem] text-[1.05rem] leading-[0.90] font-semibold text-title">
                            {exp.company}
                          </h3>
                          <span className="px-1 py-0 text-xs font-medium border border-border text-mutedForeground rounded-[4px]">
                            {exp.type}
                          </span>
                        </div>
                        <p className="sm:text-sm text-xs text-mutedForeground">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-title font-medium sm:text-sm text-xs">
                          {exp.period}
                        </p>
                        <p className="text-mutedForeground sm:text-sm text-xs">
                          {exp.location}
                        </p>
                      </div>
                      <div
                        className="hidden sm:block transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                      >
                        <svg
                          aria-hidden="true"
                          className="lucide lucide-chevron-down text-muted group-hover:text-title transition-colors duration-300"
                          fill="none"
                          height="18"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Body */}
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-4 mt-1 pb-3">
                        <div className="flex flex-col gap-2">
                          {exp.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2">
                              <span className="text-muted shrink-0">•</span>
                              <p className="text-sm text-foreground leading-relaxed">
                                {bullet}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {exp.skills.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 text-xs rounded border border-border bg-mutedBackground text-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {index < portfolioData.experiences.length - 1 && (
                <div className="divider-dashed"></div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
