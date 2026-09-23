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
      title={repo.description}
      className="group relative flex flex-col justify-center p-3 sm:p-3.5 rounded-[12px] border border-border bg-background hover:bg-mutedBackground/40 transition-colors duration-200 cursor-pointer select-none min-h-[66px] sm:min-h-[70px] h-full w-full min-w-0 overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2 min-w-0 w-full">
        <h4 className="text-[0.95rem] sm:text-[0.98rem] font-medium text-title group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate leading-tight min-w-0 flex-1">
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
      <p className="text-[11.5px] sm:text-xs text-mutedForeground truncate mt-1 w-full block">
        {repo.description}
      </p>
    </a>
  );
}
