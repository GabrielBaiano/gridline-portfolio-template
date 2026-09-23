import React from "react";
import Link from "next/link";
import { BlogPostItem } from "@/data/portfolio";

export function BlogItem({ post }: { post: BlogPostItem }) {
  const clapsCount = post.claps ?? 0;
  const hasTags = post.tags && post.tags.length > 0;
  const targetHref = post.slug ? `/blog/${post.slug}` : (post.url || "/blog");

  return (
    <div className="m-1">
      <Link
        href={targetHref}
        data-cuelume-hover="tick"
        data-cuelume-press="true"
        className="block"
      >
        <div className="flex items-center justify-between group hover:bg-bgHover transition-colors duration-300 p-3 select-none">
          <div className="flex flex-col gap-2.5">
            {/* 1. Title */}
            <h3 className="text-[1rem] leading-snug font-medium text-title group-hover:text-foreground transition-colors">
              {post.title}
            </h3>

            {/* 2. Date */}
            <div className="flex items-center gap-1 text-mutedForeground select-none">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="14"
                width="14"
              >
                <path d="M8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13Z" fill="currentColor" />
                <path d="M8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7 15 8 15C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17Z" fill="currentColor" />
                <path d="M11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16Z" fill="currentColor" />
                <path d="M16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15 16 15 16C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17Z" fill="currentColor" />
                <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" fill="currentColor" />
                <path d="M16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15 11 16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13Z" fill="currentColor" />
                <path d="M8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7 9 8 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16 7 16 7H8Z" fill="currentColor" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5Z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-xs font-medium">{post.date}</p>
            </div>

            {/* 3. Claps */}
            {clapsCount > 0 && (
              <div className="flex items-center gap-1 select-none">
                <div className="flex items-center gap-1 text-mutedForeground">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="14" width="14">
                    <path d="M199,187.76h0A71.67,71.67,0,0,0,190.34,140l-20.2-35a18,18,0,0,0-31.55,17.26L114.71,81A18,18,0,1,0,83.54,99L77.81,89,65.1,67A18,18,0,1,1,96.28,49L102,59a18,18,0,1,1,31.17-18l24.23,42a18,18,0,0,1,31.2-18l21.11,36.57A72,72,0,0,1,199,187.76Z" opacity="0.2" />
                    <path d="M160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0ZM196.1,41a7.91,7.91,0,0,0,4.17,1.17,8,8,0,0,0,6.84-3.83l8-13.11a8,8,0,0,0-13.68-8.33l-8,13.1A8,8,0,0,0,196.1,41Zm47.51,12.59a8,8,0,0,0-10.08-5.16l-15.06,4.85a8,8,0,0,0,2.46,15.62,8.15,8.15,0,0,0,2.46-.39l15.05-4.85A8,8,0,0,0,243.61,53.55ZM217,97.58a80.22,80.22,0,0,1-10.22,94c-.34,1.73-.72,3.46-1.19,5.18A80.17,80.17,0,0,1,58.77,216L23.5,155a26,26,0,0,1,19.24-38.79l-3-5.2a26,26,0,0,1,19.2-38.78L58.24,71A26,26,0,0,1,95.47,36.53,26.06,26.06,0,0,1,140.3,37l12.26,21.2A26.07,26.07,0,0,1,195.81,61ZM109.07,55l0,0h0l25,43.17a26,26,0,0,1,17.33-10L126.42,45a10,10,0,1,0-17.35,10ZM72.12,63l6.46,11.17a26.05,26.05,0,0,1,17.32-10L89.45,53A10,10,0,1,0,72.12,63Zm111.54,81-20.22-35a10,10,0,0,0-17.74,9.25L158.3,140a8,8,0,0,1-13.87,8l-36.5-63A10,10,0,1,0,90.58,95l26.05,45a8,8,0,0,1-13.87,8L71,93h0l0,0a10,10,0,0,0-17.33,10l35.22,61A8,8,0,0,1,75,172L54.72,137a10,10,0,0,0-17.34,10l35.27,61a64.12,64.12,0,0,0,117.42-15.44A63.52,63.52,0,0,0,183.66,144Zm19.41-38.42L181.93,69A10,10,0,0,0,164.55,79l33,57.05A80.2,80.2,0,0,1,207,161.51,64.23,64.23,0,0,0,203.07,105.58Z" />
                  </svg>
                  <p className="text-xs font-medium">{clapsCount}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Arrow */}
          <div className="hidden sm:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-right group-hover:rotate-45 transition-all duration-300 text-muted group-hover:text-title"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}
