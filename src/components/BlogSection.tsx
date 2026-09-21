import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

export function BlogSection() {
  return (
    <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <div className="flex items-center justify-between p-3">
        <h2 className="text-[1.55rem] font-semibold text-title">Blog</h2>
      </div>

      <div className="divider-dashed"></div>

      {/* 2x3 Grid with Dotted Crosshairs */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-0">
        {/* Horizontal middle divider (desktop) */}
        <div className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 hidden sm:block">
          <div className="divider-dashed"></div>
        </div>

        {/* Vertical divider 1/3 (desktop) */}
        <div className="pointer-events-none absolute left-1/3 top-0 h-full z-0 hidden sm:block">
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

        {/* Vertical divider 2/3 (desktop) */}
        <div className="pointer-events-none absolute left-2/3 top-0 h-full z-0 hidden sm:block">
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

        {portfolioData.blogs.map((post, idx) => (
          <a
            key={idx}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cuelume-hover="tick"
            data-cuelume-press="true"
            className="group relative block p-3 transition-colors duration-300 hover:bg-bgHover select-none"
          >
            <div className="p-[4px] rounded-[10px] border border-border">
              <div className="relative aspect-square w-full overflow-hidden rounded-[6px] border border-border bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={300}
                  height={300}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0 opacity-100 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Card Info Overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-2 sm:p-2.5 opacity-100 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[0.75rem] sm:text-[0.8rem] font-semibold text-white leading-tight line-clamp-2">
                      {post.title}
                    </span>
                    <span className="text-[0.65rem] sm:text-[0.7rem] font-medium text-white/80 mt-0.5">
                      {post.date}
                    </span>
                  </div>

                  <svg
                    aria-hidden="true"
                    className="lucide lucide-arrow-up-right hidden sm:block text-white shrink-0 ml-1 transition-transform duration-300 group-hover:rotate-45"
                    fill="none"
                    height="14"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="divider-dashed"></div>

      {/* View All Button */}
      {(() => {
        const blogUrl =
          portfolioData.socials.find((s) => s.name.toLowerCase() === "blog")?.url ||
          portfolioData.socials.find((s) => s.name.toLowerCase() === "github")?.url ||
          "https://github.com";
        return (
          <div className="relative mx-2 max-w-[690px] p-2 sm:mx-8 md:mx-auto">
            <div className="flex select-none items-center justify-center">
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
