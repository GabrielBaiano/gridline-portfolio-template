"use client";

import React from "react";
import Link from "next/link";
import { ProjectItem } from "@/data/portfolio";
import { useSound } from "./SoundProvider";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { playTick, playClick } = useSound();
  const slug = project.slug || project.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/projects/${slug}`}
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
            style={{ backgroundImage: `url(${project.bgImage})` }}
          />

          {/* Badge */}
          <h4 className="absolute top-2 left-2 text-xs text-mutedForeground group-hover:text-black dark:group-hover:text-white font-medium transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2">
            {project.label}
          </h4>

          {/* Elevated Screenshot Mock Window */}
          <div className="bg-background rounded-t-[6px] absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[75%] group-hover:h-[70%] transition-all duration-300 p-[2px] pb-0">
            <div className="w-full h-full rounded-t-[4px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.screenshot}
                alt={project.name}
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
            {project.name}
          </h3>

          <div className="flex items-center gap-1 select-none">
            <div className="relative flex items-center justify-center">
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping group-hover:hidden ${
                  project.status === "Building" ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: "10px", height: "10px", borderRadius: "50%", opacity: 0.4 }}
              />
              <svg
                className={`relative z-10 ${
                  project.status === "Building" ? "text-red-500" : "text-green-500"
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
              {project.status}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-mutedForeground font-normal leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* View Project Link Indicator */}
        <div className="flex items-center gap-1 select-none pt-1">
          <p className="text-sm text-mutedForeground transition-colors duration-300 group-hover:text-title">
            View Project
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-right text-mutedForeground transition-all duration-300 group-hover:rotate-45 group-hover:text-title"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
