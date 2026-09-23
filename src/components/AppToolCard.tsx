import React from "react";
import { AppToolItem } from "@/data/portfolio";

interface AppToolCardProps {
  item: AppToolItem;
}

const GRADIENT_MAP: Record<string, string> = {
  docklift: "from-blue-500 to-indigo-600 shadow-blue-500/20",
  zipora: "from-emerald-400 to-teal-600 shadow-emerald-500/20",
  screentest: "from-sky-400 to-blue-600 shadow-sky-500/20",
  deskmark: "from-teal-600 to-emerald-800 shadow-teal-500/20",
  vidwall: "from-violet-600 to-indigo-800 shadow-violet-500/20",
  vidcrop: "from-purple-500 to-pink-600 shadow-purple-500/20",
  mousiohint: "from-amber-400 to-orange-500 shadow-amber-500/20",
  mousio: "from-blue-500 to-cyan-500 shadow-blue-500/20",
};

function AppMockupIcon({ type }: { type: AppToolItem["iconType"] }) {
  switch (type) {
    case "docklift":
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 text-white drop-shadow" fill="none">
          {/* Mini Window Frame */}
          <rect x="6" y="6" width="32" height="21" rx="3.5" fill="#FFFFFF" fillOpacity="0.95" />
          <path d="M6 12H38" stroke="#E2E8F0" strokeWidth="1.2" />
          <circle cx="10" cy="9" r="1.3" fill="#EF4444" />
          <circle cx="14" cy="9" r="1.3" fill="#F59E0B" />
          <circle cx="18" cy="9" r="1.3" fill="#10B981" />
          {/* Dock container */}
          <rect x="8" y="30" width="28" height="8" rx="2.5" fill="#000000" fillOpacity="0.35" />
          <circle cx="12.5" cy="34" r="1.6" fill="#60A5FA" />
          <circle cx="18" cy="34" r="1.6" fill="#FFFFFF" />
          <circle cx="23.5" cy="34" r="1.6" fill="#60A5FA" />
          <circle cx="29" cy="34" r="1.6" fill="#93C5FD" />
          {/* Return curved arrow */}
          <path
            d="M31 21L25 18M31 21L28 16M31 21C28 25 22 26 17 24"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "zipora":
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 text-white drop-shadow" fill="none">
          {/* Zipper interlocking teeth */}
          <rect x="20" y="5" width="4" height="2.2" rx="0.6" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="15" y="8.5" width="4" height="2.2" rx="0.6" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="20" y="12" width="4" height="2.2" rx="0.6" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="15" y="15.5" width="4" height="2.2" rx="0.6" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="20" y="19" width="4" height="2.2" rx="0.6" fill="#FFFFFF" fillOpacity="0.8" />
          {/* Zipper Slider Body */}
          <path
            d="M14 22H30L26 31H18L14 22Z"
            fill="#FFFFFF"
            stroke="#0D9488"
            strokeWidth="0.8"
          />
          {/* Zipper Pull Ring */}
          <rect x="18" y="30" width="8" height="9" rx="3.5" fill="#FFFFFF" />
          <circle cx="22" cy="35" r="2" fill="#0D9488" />
        </svg>
      );
    case "screentest":
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 text-white drop-shadow" fill="none">
          {/* Monitor Frame */}
          <rect x="6" y="8" width="32" height="21" rx="3" stroke="#FFFFFF" strokeWidth="2.4" fill="#FFFFFF" fillOpacity="0.18" />
          {/* Screen Inner Display */}
          <rect x="9.5" y="11.5" width="25" height="14" rx="1.5" fill="#FFFFFF" fillOpacity="0.3" />
          {/* Stand */}
          <path d="M22 29V35" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M15 35H29" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "deskmark":
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 text-white drop-shadow" fill="none">
          {/* Diagonal Watermark Stripes Pattern */}
          <path
            d="M6 16L16 6M6 28L28 6M6 40L40 6M18 40L40 18M30 40L40 30"
            stroke="#FFFFFF"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeDasharray="1.5 6.5"
            strokeOpacity="0.9"
          />
        </svg>
      );
    case "vidwall":
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 text-white drop-shadow" fill="none">
          {/* Dynamic 8-blade Aperture Shutter */}
          <g transform="translate(22,22) scale(0.95)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <path
                key={i}
                d="M-2 -15 C6 -15, 13 -10, 15 -2 C10 -5, 3 -7, -2 -15 Z"
                fill="#FFFFFF"
                fillOpacity="0.95"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.2" fill="#09090B" />
          </g>
        </svg>
      );
    case "vidcrop":
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 text-white drop-shadow" fill="none">
          {/* Video Camera */}
          <rect x="7" y="13" width="20" height="18" rx="3.5" fill="#FFFFFF" fillOpacity="0.92" />
          <path d="M27 19L36 14V30L27 25V19Z" fill="#FFFFFF" fillOpacity="0.92" />
          {/* Precision Scissors */}
          <circle cx="13" cy="19" r="2.4" stroke="#A855F7" strokeWidth="1.3" fill="#FFFFFF" />
          <circle cx="13" cy="25" r="2.4" stroke="#A855F7" strokeWidth="1.3" fill="#FFFFFF" />
          <path d="M15 20L21 24M15 24L21 20" stroke="#A855F7" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "mousiohint":
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 text-white drop-shadow" fill="none">
          {/* Cursor Pointer */}
          <path
            d="M9 8L17 32L21 24L30 24L9 8Z"
            fill="#FFFFFF"
            stroke="#D97706"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* MH Hint Badge */}
          <rect x="25" y="9" width="14" height="9" rx="2.5" fill="#000000" fillOpacity="0.7" />
          <text x="27.5" y="16" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="monospace">
            MH
          </text>
          {/* Keyboard lines */}
          <rect x="25" y="20" width="12" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.85" />
          <rect x="25" y="24" width="8" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      );
    case "mousio":
      return (
        <svg viewBox="0 0 44 44" className="w-8 h-8 text-white drop-shadow" fill="none">
          {/* Cursor Pointer */}
          <path
            d="M10 8L18 32L22 24L31 24L10 8Z"
            fill="#FFFFFF"
            stroke="#1D4ED8"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Velocity Motion Bars */}
          <path d="M23 13L33 13" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
          <path d="M26 17L34 17" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          <path d="M29 21L35 21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
  }
}

export function AppToolCard({ item }: AppToolCardProps) {
  const gradientClass = GRADIENT_MAP[item.iconType] || "from-blue-600 to-indigo-600 shadow-blue-500/20";

  return (
    <a
      href={item.url || item.githubUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      data-cuelume-hover="tick"
      data-cuelume-press="true"
      title={item.description}
      className="group relative flex items-center gap-3 sm:gap-3.5 p-3 sm:p-3.5 rounded-[12px] border border-border bg-background hover:bg-mutedBackground/40 transition-colors duration-200 cursor-pointer select-none min-h-[88px] sm:min-h-[90px] h-full w-full"
    >
      {/* Colorful Mockup Block Icon */}
      <div
        className={`w-12 h-12 rounded-[11px] bg-gradient-to-br ${gradientClass} flex items-center justify-center shrink-0 shadow-sm border border-white/15 overflow-hidden relative group-hover:scale-105 transition-transform duration-200`}
      >
        <AppMockupIcon type={item.iconType} />
      </div>

      {/* Typography: Title & Description with locked 2-line baseline */}
      <div className="flex flex-col min-w-0 flex-1 justify-center py-0.5">
        <h4 className="text-[0.95rem] sm:text-[0.98rem] font-medium text-title leading-tight tracking-tight truncate">
          {item.name}
        </h4>
        <p className="text-[11.5px] sm:text-xs text-mutedForeground line-clamp-2 leading-[1.38] mt-1 min-h-[34px] flex items-start">
          {item.description}
        </p>
      </div>
    </a>
  );
}
