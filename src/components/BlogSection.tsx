import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { BlogItem } from "./BlogItem";

export function BlogSection() {
  const displayedPosts = portfolioData.blogs.slice(0, 4);

  return (
    <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <div className="flex items-center justify-between p-3">
        <h2 className="text-[1.55rem] font-semibold text-title">Blog</h2>
      </div>

      <div className="divider-dashed"></div>

      <div className="flex flex-col">
        {displayedPosts.map((post, idx) => (
          <div key={idx}>
            <BlogItem post={post} />
            {idx < displayedPosts.length - 1 && (
              <div className="divider-dashed"></div>
            )}
          </div>
        ))}
      </div>

      <div className="divider-dashed"></div>

      {/* View All Button */}
      <div className="relative p-2 flex select-none items-center justify-center">
        <Link
          href="/blog"
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
    </section>
  );
}
