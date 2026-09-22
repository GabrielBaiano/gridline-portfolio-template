"use client";

import React, { useState } from "react";
import { portfolioData, SocialLink } from "@/data/portfolio";
import { ScheduleModal } from "./ScheduleModal";

export function HeroSection() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const renderSocialIcon = (icon: SocialLink["icon"]) => {
    switch (icon) {
      case "github":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        );
      case "twitter":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "weibo":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.583.631.275.825.985.442 1.574zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.194.573zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.581-.178-.402-.642.389-1.012.429-1.885.008-2.509-.788-1.167-2.943-1.107-5.404-.031 0 0-.774.338-.576-.274.381-1.204.325-2.211-.27-2.792-1.35-1.322-4.946.049-8.028 3.063C1.376 10.469 0 12.578 0 14.378c0 3.453 4.433 5.559 8.772 5.559 5.691 0 9.478-3.307 9.478-5.932 0-1.588-1.339-2.49-2.191-2.756z" />
          </svg>
        );
      case "douyin":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.001-.104z" />
          </svg>
        );
      case "bilibili":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
          </svg>
        );
      case "blog":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        );
      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
    }
  };

  return (
    <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto p-3 container-dashed">
      <div className="flex flex-col gap-2 text-base leading-6 text-[#333333] dark:text-[#d9d9d9]">
        {portfolioData.personal.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap mt-4">
        {portfolioData.personal.email && (
          <a
            href={`mailto:${portfolioData.personal.email}`}
            data-cuelume-hover="tick"
            data-cuelume-press="true"
            className="w-fit flex items-center gap-1.5 px-2.5 py-[7px] sm:py-1.5 bg-[#f4f4f4] hover:bg-[#e9e9e9] dark:bg-[#1c1c1c] dark:hover:bg-[#2b2b2b] border border-[#d1d1d1] dark:border-[#313131] rounded-[9px] text-sm font-medium text-[#333333] dark:text-[#d9d9d9] transition-colors cursor-pointer no-underline"
          >
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
              className="lucide lucide-mail text-[#9c9c9c]"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            Send an email
          </a>
        )}

        <button
          type="button"
          onClick={() => setIsScheduleOpen(true)}
          data-cuelume-hover="tick"
          data-cuelume-press="true"
          className="w-fit flex items-center gap-1.5 px-2.5 py-[7px] sm:py-1.5 bg-[#f4f4f4] hover:bg-[#e9e9e9] dark:bg-[#1c1c1c] dark:hover:bg-[#2b2b2b] border border-[#d1d1d1] dark:border-[#313131] rounded-[9px] text-sm font-medium text-[#333333] dark:text-[#d9d9d9] transition-colors cursor-pointer no-underline"
        >
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
            className="lucide lucide-calendar text-[#9c9c9c]"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          Book an intro call
        </button>
      </div>

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />

      {/* Socials Heading */}
      <p style={{ fontSize: "16px", marginTop: "16px" }} className="text-[#333333] dark:text-[#d9d9d9]">
        Here are my <strong className="font-semibold">socials</strong>
      </p>

      {/* Socials Pills dynamically mapped */}
      <div className="flex flex-wrap gap-2 mt-2">
        {portfolioData.socials.map((social, idx) => (
          <a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cuelume-hover="tick"
            data-cuelume-press="true"
            className="w-fit flex items-center gap-1.5 px-2.5 py-[7px] sm:py-1.5 bg-[#f4f4f4] hover:bg-[#e9e9e9] dark:bg-[#1c1c1c] dark:hover:bg-[#2b2b2b] border border-[#d1d1d1] dark:border-[#313131] rounded-[9px] text-sm font-medium text-[#333333] dark:text-[#d9d9d9] transition-colors cursor-pointer no-underline border-none"
          >
            {renderSocialIcon(social.icon)}
            {social.name}
          </a>
        ))}
      </div>
    </section>
  );
}
