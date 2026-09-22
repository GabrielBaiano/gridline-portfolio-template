import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {

  return (
    <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <h2 className="text-[1.55rem] font-semibold text-[#333333] dark:text-[#d9d9d9] p-3">
        Projects
      </h2>

      <div className="divider-dashed"></div>

      {/* 2x2 Grid with Dotted Crosshairs */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-0">
        {/* Horizontal middle divider */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 hidden sm:block">
          <div className="divider-dashed"></div>
        </div>
        {/* Vertical middle divider */}
        <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 z-0 hidden sm:block">
          <div
            className="h-full w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 14px)",
              backgroundSize: "1px 100%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {portfolioData.projects.slice(0, 4).map((proj, idx) => (
          <div key={idx} className="relative z-10 p-3">
            <ProjectCard project={proj} />
          </div>
        ))}
      </div>

      <div className="divider-dashed"></div>

      {/* View All Button */}
      <div className="relative mx-2 max-w-[690px] p-2 sm:mx-8 md:mx-auto">
        <div className="flex select-none items-center justify-center">
          <Link
            href="/projects"
            data-cuelume-hover="tick"
            data-cuelume-press="true"
            className="group w-fit rounded-lg border border-border p-0.5 no-underline"
          >
            <div className="flex h-full w-full items-center justify-center gap-1 rounded-[8px] border border-border bg-[#555] dark:bg-[#aaa] group-hover:bg-[#222] dark:group-hover:bg-[#f5f5f5] px-2.5 py-1 transition duration-300">
              <span className="text-[0.95rem] font-medium text-white dark:text-black">
                View All
              </span>
              <span className="flex items-center transition-transform duration-300 group-hover:scale-125">
                <svg
                  aria-hidden="true"
                  className="lucide lucide-arrow-up-right text-white dark:text-black"
                  fill="none"
                  height="17.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="17.5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
