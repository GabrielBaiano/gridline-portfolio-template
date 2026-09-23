import React from "react";
import { AppToolItem } from "@/data/portfolio";

interface AppToolCardProps {
  item: AppToolItem;
}

function AppIcon({ type }: { type: AppToolItem["iconType"] }) {
  switch (type) {
    case "docklift":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-white drop-shadow-sm" fill="none">
          {/* Mini Window */}
          <rect x="5" y="6" width="30" height="20" rx="3" fill="#FFFFFF" fillOpacity="0.95" />
          <path d="M5 11H35" stroke="#E2E8F0" strokeWidth="1.2" />
          <circle cx="8.5" cy="8.5" r="1.2" fill="#EF4444" />
          <circle cx="12" cy="8.5" r="1.2" fill="#F59E0B" />
          <circle cx="15.5" cy="8.5" r="1.2" fill="#10B981" />
          {/* Dock container */}
          <rect x="7" y="28" width="26" height="7" rx="2" fill="#000000" fillOpacity="0.4" />
          <circle cx="11" cy="31.5" r="1.5" fill="#60A5FA" />
          <circle cx="16" cy="31.5" r="1.5" fill="#FFFFFF" />
          <circle cx="21" cy="31.5" r="1.5" fill="#60A5FA" />
          <circle cx="26" cy="31.5" r="1.5" fill="#93C5FD" />
          {/* Action curved arrow */}
          <path
            d="M28 20L22 17M28 20L25 15M28 20C25 24 20 25 16 23"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "zipora":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-white drop-shadow-sm" fill="none">
          {/* Zipper teeth */}
          <rect x="18" y="5" width="4" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.7" />
          <rect x="14" y="8" width="4" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.7" />
          <rect x="18" y="11" width="4" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.7" />
          <rect x="14" y="14" width="4" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.7" />
          <rect x="18" y="17" width="4" height="2" rx="0.5" fill="#FFFFFF" fillOpacity="0.7" />
          {/* Zipper Slider */}
          <path
            d="M13 20H27L24 28H16L13 20Z"
            fill="#FFFFFF"
            stroke="#0D9488"
            strokeWidth="0.8"
          />
          {/* Zipper Pull Tab */}
          <rect x="17" y="27" width="6" height="8" rx="3" fill="#FFFFFF" />
          <circle cx="20" cy="31.5" r="1.8" fill="#0D9488" />
        </svg>
      );
    case "screentest":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-white drop-shadow-sm" fill="none">
          {/* Monitor body */}
          <rect x="6" y="8" width="28" height="19" rx="2.5" stroke="#FFFFFF" strokeWidth="2.2" fill="#FFFFFF" fillOpacity="0.15" />
          {/* Screen Inner */}
          <rect x="9" y="11" width="22" height="13" rx="1.5" fill="#FFFFFF" fillOpacity="0.25" />
          {/* Stand */}
          <path d="M20 27V32" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M14 32H26" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "deskmark":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-white drop-shadow-sm" fill="none">
          {/* Diagonal pattern */}
          <path
            d="M6 14L14 6M6 26L26 6M6 38L38 6M18 38L38 18M30 38L38 30"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="1 6"
            strokeOpacity="0.85"
          />
        </svg>
      );
    case "vidwall":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-white drop-shadow-sm" fill="none">
          {/* Aperture / Shutter Blades */}
          <g transform="translate(20,20) scale(0.9)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <path
                key={i}
                d="M-2 -14 C5 -14, 12 -9, 14 -2 C9 -5, 3 -7, -2 -14 Z"
                fill="#FFFFFF"
                fillOpacity="0.95"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3" fill="#18181B" />
          </g>
        </svg>
      );
    case "vidcrop":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-white drop-shadow-sm" fill="none">
          {/* Video Camera */}
          <rect x="7" y="12" width="18" height="16" rx="3" fill="#FFFFFF" fillOpacity="0.9" />
          <path d="M25 17L33 13V27L25 23V17Z" fill="#FFFFFF" fillOpacity="0.9" />
          {/* Scissors Icon Overlay */}
          <circle cx="12" cy="18" r="2.2" stroke="#A855F7" strokeWidth="1.2" fill="#FFFFFF" />
          <circle cx="12" cy="24" r="2.2" stroke="#A855F7" strokeWidth="1.2" fill="#FFFFFF" />
          <path d="M14 19L20 23M14 23L20 19" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "mousiohint":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-white drop-shadow-sm" fill="none">
          {/* Cursor Pointer */}
          <path
            d="M9 7L16 29L20 22L28 22L9 7Z"
            fill="#FFFFFF"
            stroke="#D97706"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* MH Hint Badge */}
          <rect x="23" y="8" width="13" height="8" rx="2" fill="#000000" fillOpacity="0.65" />
          <text x="25" y="14.5" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
            MH
          </text>
          {/* Hint lines */}
          <rect x="23" y="18" width="11" height="1.8" rx="0.9" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="23" y="21.5" width="8" height="1.8" rx="0.9" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      );
    case "mousio":
      return (
        <svg viewBox="0 0 40 40" className="w-8 h-8 text-white drop-shadow-sm" fill="none">
          {/* Cursor Pointer */}
          <path
            d="M10 8L18 30L22 23L30 23L10 8Z"
            fill="#FFFFFF"
            stroke="#1D4ED8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Motion Trails */}
          <path d="M22 12L31 12" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
          <path d="M25 16L32 16" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
          <path d="M28 20L33 20" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
  }
}

export function AppToolCard({ item }: AppToolCardProps) {
  const gradientClass = item.iconGradient || "from-blue-600 to-indigo-700";

  return (
    <a
      href={item.url || item.githubUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      data-cuelume-hover="tick"
      data-cuelume-press="true"
      className="group relative flex items-center gap-3.5 p-3 rounded-[10px] border border-border/80 bg-mutedBackground/30 hover:bg-mutedBackground/60 hover:border-border transition-all duration-200 cursor-pointer select-none"
    >
      {/* Squircle App Icon */}
      <div
        className={`w-12 h-12 rounded-[11px] bg-gradient-to-br ${gradientClass} flex items-center justify-center shrink-0 shadow-sm border border-white/10 overflow-hidden relative group-hover:scale-105 transition-transform duration-200`}
      >
        <AppIcon type={item.iconType} />
      </div>

      {/* Info Container */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[0.95rem] font-semibold text-title leading-tight tracking-tight truncate group-hover:text-title">
            {item.name}
          </h4>
          {item.tag && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-[4px] border border-border/70 bg-background/80 text-mutedForeground shrink-0">
              {item.tag}
            </span>
          )}
        </div>
        <p className="text-xs text-mutedForeground line-clamp-2 leading-snug mt-1">
          {item.description}
        </p>
      </div>
    </a>
  );
}
