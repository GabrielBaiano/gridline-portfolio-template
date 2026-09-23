import React from "react";
import { RepositoryItem } from "@/data/portfolio";

interface RepoCardProps {
  repo: RepositoryItem;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cuelume-hover="tick"
      data-cuelume-press="true"
      className="group relative flex flex-col justify-center p-3 sm:p-3.5 rounded-[12px] border border-border bg-background hover:bg-mutedBackground/40 transition-colors duration-200 cursor-pointer select-none"
    >
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-[1.02rem] sm:text-[1.08rem] font-bold text-title group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate">
          {repo.name}
        </h4>
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
          className="text-mutedForeground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </div>
      <p className="text-xs sm:text-[0.82rem] text-mutedForeground line-clamp-1 leading-relaxed mt-0.5">
        {repo.description}
      </p>
    </a>
  );
}
