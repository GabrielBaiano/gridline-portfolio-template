import React from "react";
import { AppToolItem } from "@/data/portfolio";

interface AppToolCardProps {
  item: AppToolItem;
}

function AppFallbackIcon({ name }: { name: string }) {
  const initial = (name || "A").trim().charAt(0).toUpperCase();
  return (
    <div className="w-full h-full flex items-center justify-center font-bold text-white text-lg tracking-tight select-none">
      {initial}
    </div>
  );
}

export function AppToolCard({ item }: AppToolCardProps) {
  const gradientClass = item.iconGradient || "from-blue-600 to-indigo-600 shadow-blue-500/20";

  return (
    <a
      href={item.url || item.githubUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      data-cuelume-hover="tick"
      data-cuelume-press="true"
      title={item.description}
      className="group relative flex items-center gap-3 sm:gap-3.5 p-3 sm:p-3.5 rounded-[12px] border border-border bg-background hover:bg-mutedBackground/40 transition-colors duration-200 cursor-pointer select-none min-h-[88px] sm:min-h-[90px] h-full w-full min-w-0 overflow-hidden"
    >
      {/* App Icon */}
      {item.icon ? (
        <div
          className={`w-12 h-12 rounded-[11px] ${
            item.iconBg || "bg-transparent"
          } flex items-center justify-center shrink-0 overflow-hidden relative group-hover:scale-105 transition-transform duration-200`}
        >
          <img
            src={item.icon}
            alt={item.name}
            className={`w-full h-full ${
              item.iconFit === "contain" ? "object-contain" : "object-cover"
            }`}
          />
        </div>
      ) : (
        <div
          className={`w-12 h-12 rounded-[11px] bg-gradient-to-br ${gradientClass} flex items-center justify-center shrink-0 shadow-sm border border-white/15 overflow-hidden relative group-hover:scale-105 transition-transform duration-200`}
        >
          <AppFallbackIcon name={item.name} />
        </div>
      )}

      {/* Typography: Title & Description with locked 2-line baseline */}
      <div className="flex flex-col min-w-0 flex-1 justify-center py-0.5">
        <h4 className="text-[0.95rem] sm:text-[0.98rem] font-medium text-title leading-tight tracking-tight truncate">
          {item.name}
        </h4>
        <div className="min-h-[34px] flex items-start mt-1">
          <p className="text-[11.5px] sm:text-xs text-mutedForeground line-clamp-2 leading-[1.38] overflow-hidden">
            {item.description}
          </p>
        </div>
      </div>
    </a>
  );
}
