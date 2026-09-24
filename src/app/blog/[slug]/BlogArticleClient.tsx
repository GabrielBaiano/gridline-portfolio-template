"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSound } from "@/components/SoundProvider";

const MAX_USER_CLAPS = 10;

interface ClapButtonProps {
  initialClaps: number;
  slug?: string;
}

export function ClapButton({ initialClaps, slug }: ClapButtonProps) {
  const { playClick, playError } = useSound();
  const [totalClaps, setTotalClaps] = useState(initialClaps);
  const [userClaps, setUserClaps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number }>>([]);
  const pendingClapsRef = useRef(0);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const deniedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const storageKey = slug ? `portfolio_user_claps_${slug}` : null;

  // 1. Initialize user's existing claps from localStorage (persisted per person)
  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const count = parseInt(saved, 10);
        if (!isNaN(count)) {
          setUserClaps(Math.min(count, MAX_USER_CLAPS));
        }
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  // 2. Sync total global claps from API with cache: "no-store"
  useEffect(() => {
    if (!slug) return;
    let isMounted = true;
    fetch(`/api/claps?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && typeof data.claps === "number") {
          setTotalClaps(data.claps);
          // Broadcast so any other instance receives the remote value
          window.dispatchEvent(
            new CustomEvent("portfolio-claps-sync", {
              detail: { slug, totalClaps: data.claps },
            })
          );
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // 3. Listen to cross-button sync events on the same page (top & bottom buttons)
  useEffect(() => {
    if (!slug) return;
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.slug === slug) {
        if (typeof detail.totalClaps === "number") {
          setTotalClaps(detail.totalClaps);
        }
        if (typeof detail.userClaps === "number") {
          setUserClaps(detail.userClaps);
        }
      }
    };

    window.addEventListener("portfolio-claps-sync", handleSync);
    return () => {
      window.removeEventListener("portfolio-claps-sync", handleSync);
    };
  }, [slug]);

  // 4. Send pending claps to API with keepalive
  const flushPendingClaps = useCallback(() => {
    if (!slug || pendingClapsRef.current <= 0) return;
    const countToSend = pendingClapsRef.current;
    pendingClapsRef.current = 0;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    fetch("/api/claps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, count: countToSend }),
      keepalive: true,
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.claps === "number") {
          setTotalClaps(data.claps);
          window.dispatchEvent(
            new CustomEvent("portfolio-claps-sync", {
              detail: { slug, totalClaps: data.claps },
            })
          );
        }
      })
      .catch(() => {});
  }, [slug]);

  // Flush on unmount or page reload so claps are never lost
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushPendingClaps();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      flushPendingClaps();
      if (deniedTimeoutRef.current) clearTimeout(deniedTimeoutRef.current);
    };
  }, [flushPendingClaps]);

  const triggerDenied = () => {
    playError();
    setIsDenied(true);
    if (deniedTimeoutRef.current) clearTimeout(deniedTimeoutRef.current);
    deniedTimeoutRef.current = setTimeout(() => {
      setIsDenied(false);
    }, 450);
  };

  const handleClap = () => {
    if (userClaps >= MAX_USER_CLAPS) {
      triggerDenied();
      return;
    }

    const newUserCount = userClaps + 1;
    const newTotal = totalClaps + 1;
    setUserClaps(newUserCount);
    setTotalClaps(newTotal);

    // Broadcast immediately to the other clap button on the page!
    if (slug) {
      window.dispatchEvent(
        new CustomEvent("portfolio-claps-sync", {
          detail: { slug, totalClaps: newTotal, userClaps: newUserCount },
        })
      );
    }

    // Spawn floating +1 bubble
    const id = Date.now() + Math.random();
    const x = Math.floor(Math.random() * 24) - 12;
    setBubbles((prev) => [...prev, { id, x }]);
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 750);

    // Sound and animation feedback
    if (newUserCount >= MAX_USER_CLAPS) {
      triggerDenied();
    } else {
      playClick();
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }

    // Persist user's clap count in local storage
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, String(newUserCount));
      } catch {
        // ignore
      }
    }

    // Debounce send to server, or flush immediately if limit reached
    if (slug) {
      pendingClapsRef.current += 1;
      if (newUserCount >= MAX_USER_CLAPS) {
        flushPendingClaps();
      } else {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
          flushPendingClaps();
        }, 400);
      }
    }
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Floating +1 bubbles */}
      <div className="pointer-events-none absolute inset-x-0 bottom-full h-12 overflow-visible">
        {bubbles.map((b) => (
          <span
            key={b.id}
            style={{ left: `calc(50% + ${b.x}px)` }}
            className="pointer-events-none absolute bottom-1 -translate-x-1/2 text-xs font-bold text-amber-500 dark:text-amber-400 select-none animate-clap-float"
          >
            +1
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={handleClap}
        data-cuelume-hover="tick"
        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-[8px] border transition-all duration-200 select-none cursor-pointer ${
          isDenied
            ? "animate-clap-denied border-red-500/80 bg-red-500/10 text-red-500 dark:border-red-500 dark:bg-red-500/15 dark:text-red-400"
            : "border-border bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-foreground"
        } ${isAnimating && !isDenied ? "scale-105" : "scale-100"}`}
        aria-label="Applaud this article"
        title={
          userClaps >= MAX_USER_CLAPS
            ? "Maximum 10 claps reached"
            : "Click to applaud"
        }
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 256 256"
          height="16"
          width="16"
          className={`transition-transform duration-200 ${
            isDenied
              ? "text-red-500 dark:text-red-400"
              : isAnimating
              ? "-rotate-12 scale-110 text-title"
              : "text-mutedForeground group-hover:text-title"
          }`}
        >
          <path
            d="M199,187.76h0A71.67,71.67,0,0,0,190.34,140l-20.2-35a18,18,0,0,0-31.55,17.26L114.71,81A18,18,0,1,0,83.54,99L77.81,89,65.1,67A18,18,0,1,1,96.28,49L102,59a18,18,0,1,1,31.17-18l24.23,42a18,18,0,0,1,31.2-18l21.11,36.57A72,72,0,0,1,199,187.76Z"
            opacity="0.2"
          />
          <path d="M160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0ZM196.1,41a7.91,7.91,0,0,0,4.17,1.17,8,8,0,0,0,6.84-3.83l8-13.11a8,8,0,0,0-13.68-8.33l-8,13.1A8,8,0,0,0,196.1,41Zm47.51,12.59a8,8,0,0,0-10.08-5.16l-15.06,4.85a8,8,0,0,0,2.46,15.62,8.15,8.15,0,0,0,2.46-.39l15.05-4.85A8,8,0,0,0,243.61,53.55ZM217,97.58a80.22,80.22,0,0,1-10.22,94c-.34,1.73-.72,3.46-1.19,5.18A80.17,80.17,0,0,1,58.77,216L23.5,155a26,26,0,0,1,19.24-38.79l-3-5.2a26,26,0,0,1,19.2-38.78L58.24,71A26,26,0,0,1,95.47,36.53,26.06,26.06,0,0,1,140.3,37l12.26,21.2A26.07,26.07,0,0,1,195.81,61ZM109.07,55l0,0h0l25,43.17a26,26,0,0,1,17.33-10L126.42,45a10,10,0,1,0-17.35,10ZM72.12,63l6.46,11.17a26.05,26.05,0,0,1,17.32-10L89.45,53A10,10,0,1,0,72.12,63Zm111.54,81-20.22-35a10,10,0,0,0-17.74,9.25L158.3,140a8,8,0,0,1-13.87,8l-36.5-63A10,10,0,1,0,90.58,95l26.05,45a8,8,0,0,1-13.87,8L71,93h0l0,0a10,10,0,0,0-17.33,10l35.22,61A8,8,0,0,1,75,172L54.72,137a10,10,0,0,0-17.34,10l35.27,61a64.12,64.12,0,0,0,117.42-15.44A63.52,63.52,0,0,0,183.66,144Zm19.41-38.42L181.93,69A10,10,0,0,0,164.55,79l33,57.05A80.2,80.2,0,0,1,207,161.51,64.23,64.23,0,0,0,203.07,105.58Z" />
        </svg>

        <span className={`text-xs font-semibold tabular-nums ${isDenied ? "text-red-500 dark:text-red-400" : "text-foreground"}`}>
          {totalClaps} {totalClaps === 1 ? "clap" : "claps"}
        </span>
      </button>
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
  const { playClick } = useSound();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      playClick();
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative my-4 rounded-[8px] border border-border bg-[#18181b] overflow-hidden group">
      {/* Code Header bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#27272a] bg-[#121214] text-xs text-mutedForeground select-none">
        <span className="font-mono lowercase">{language}</span>
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-green-400 font-sans">Copied!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span className="font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="p-4 text-xs font-mono text-zinc-100 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
