import React from "react";
import { portfolioData } from "@/data/portfolio";

export function WikiSection() {
  return (
    <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <div className="flex items-center justify-between p-3">
        <h2 className="text-[1.55rem] font-semibold text-title">Wiki</h2>
      </div>

      <div className="divider-dashed"></div>

      <div className="flex flex-col">
        {portfolioData.wikis.map((item, idx) => (
          <div key={idx}>
            <div className="m-1">
              <div
                data-cuelume-hover="tick"
                data-cuelume-press="true"
                className="flex items-center justify-between group hover:bg-bgHover transition-colors duration-300 p-3 cursor-pointer select-none"
              >
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[1rem] sm:leading-[0.80] leading-[1.60] font-bold text-title">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-mutedForeground select-none">
                    {/* Calendar Icon + Date */}
                    <div className="flex items-center gap-1">
                      <svg
                        fill="none"
                        height="14"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        width="14"
                      >
                        <path
                          d="M8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H8Z"
                          fill="currentColor"
                        />
                        <path
                          clipRule="evenodd"
                          d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5Z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                      <p className="text-xs font-medium">{item.date}</p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="mx-1.5 w-px h-4 bg-border inline-block align-middle select-none"
                    ></span>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs text-foreground bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.5 rounded-[4px] border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {idx < portfolioData.wikis.length - 1 && (
              <div className="divider-dashed"></div>
            )}
          </div>
        ))}
      </div>

      <div className="divider-dashed"></div>

      {/* View All Button */}
      {(() => {
        const githubUrl = portfolioData.socials.find((s) => s.name.toLowerCase() === "github")?.url || "https://github.com";
        return (
          <div className="relative mx-2 max-w-[690px] p-2 sm:mx-8 md:mx-auto">
            <div className="flex select-none items-center justify-center">
              <a
                href={githubUrl}
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
