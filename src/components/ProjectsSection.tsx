"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { useSound } from "./SoundProvider";

export function ProjectsSection() {
  const { playTick, playClick } = useSound();

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
          ></div>
        </div>

        {portfolioData.projects.map((proj, idx) => (
          <div key={idx} className="relative z-10 p-3">
            <div
              onMouseEnter={playTick}
              onClick={playClick}
              className="flex flex-col gap-2 cursor-pointer group w-full select-none"
            >
              {/* Outer Card with elevated mock window */}
              <div className="p-[4px] rounded-[10px] border border-border">
                <div className="relative w-full bg-mutedBackground rounded-[6px] border border-border h-[200px] md:h-[200px] sm:h-[170px] overflow-hidden select-none">
                  {/* Hover Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundImage: `url(${proj.bgImage})` }}
                  ></div>

                  {/* Badge */}
                  <h4 className="absolute top-2 left-2 text-xs text-mutedForeground group-hover:text-black font-medium transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2">
                    {proj.label}
                  </h4>

                  {/* Elevated Screenshot Mock Window */}
                  <div className="bg-background rounded-t-[6px] absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[75%] group-hover:h-[70%] transition-all duration-300 p-[2px] pb-0">
                    <div className="w-full h-full rounded-t-[4px] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={proj.screenshot}
                        alt={proj.name}
                        width={1000}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Pin Icon Top-Right */}
                  <div className="absolute top-1 right-1 p-1.5 rounded-[8px] border border-border bg-background text-title">
                    <svg
                      fill="currentColor"
                      height="1em"
                      stroke="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      width="1em"
                    >
                      <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title & Status */}
              <div className="px-2 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[1.10rem] leading-[1.10] text-title font-bold">
                    {proj.name}
                  </h3>

                  <div className="flex items-center gap-1 select-none">
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping group-hover:hidden ${
                          proj.status === "Building" ? "bg-red-500" : "bg-green-500"
                        }`}
                        style={{ width: "10px", height: "10px", borderRadius: "50%", opacity: 0.4 }}
                      ></div>
                      <svg
                        className={`relative z-10 ${
                          proj.status === "Building" ? "text-red-500" : "text-green-500"
                        }`}
                        fill="currentColor"
                        height="14"
                        width="14"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                      </svg>
                    </div>
                    <p className="text-sm text-mutedForeground font-medium">
                      {proj.status}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#737373] dark:text-[#9f9f9f] font-normal leading-relaxed line-clamp-2">
                  {proj.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2 text-xs font-medium text-foreground">
                  {proj.websiteUrl && (
                    <a
                      href={proj.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:opacity-75 transition-opacity"
                    >
                      <span>View Project</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </a>
                  )}

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted hover:text-foreground transition-colors ml-auto"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>Github Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divider-dashed"></div>

      {/* View All Button */}
      {(() => {
        const githubUrl =
          portfolioData.socials.find((s) => s.name.toLowerCase() === "github")?.url ||
          "https://github.com";
        const reposUrl = `${githubUrl}?tab=repositories`;
        return (
          <div className="relative mx-2 max-w-[690px] p-2 sm:mx-8 md:mx-auto">
            <div className="flex select-none items-center justify-center">
              <a
                href={reposUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playTick}
                onClick={playClick}
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
              </a>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
