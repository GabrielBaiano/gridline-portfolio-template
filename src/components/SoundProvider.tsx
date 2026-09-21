"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playTick: () => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playTick: () => {},
  playClick: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_sound_muted");
    if (saved !== null) {
      setIsMuted(saved === "true");
    }
  }, []);

  const getAudioContext = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtx) {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      setAudioCtx(ctx);
      return ctx;
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  };

  const playTone = (freq: number, duration: number, gainValue = 0.05) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(gainValue, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay or permissions fail gracefully
    }
  };

  const playTick = () => playTone(800, 0.03, 0.03);
  const playClick = () => playTone(450, 0.06, 0.06);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    localStorage.setItem("portfolio_sound_muted", String(next));
    if (!next) {
      playTone(600, 0.05, 0.05);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playTick, playClick }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
