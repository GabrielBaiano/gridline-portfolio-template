"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

type SoundType = "tick" | "press" | "release" | "toggle" | "chime";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playTick: () => void;
  playClick: () => void;
  playPress: () => void;
  playRelease: () => void;
  playToggle: () => void;
  playChime: () => void;
  play: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playTick: () => {},
  playClick: () => {},
  playPress: () => {},
  playRelease: () => {},
  playToggle: () => {},
  playChime: () => {},
  play: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isMutedRef = useRef(false);
  const lastHoverTime = useRef(0);

  useEffect(() => {
    try {
      const saved1 = localStorage.getItem("soundEffectsEnabled");
      const saved2 = localStorage.getItem("portfolio_sound_muted");
      if (saved1 !== null) {
        const enabled = saved1 !== "false";
        setIsMuted(!enabled);
        isMutedRef.current = !enabled;
      } else if (saved2 !== null) {
        const muted = saved2 === "true";
        setIsMuted(muted);
        isMutedRef.current = muted;
      }
    } catch {
      // ignore
    }
  }, []);

  const getAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return null;
      try {
        audioCtxRef.current = new AudioCtxClass();
      } catch {
        return null;
      }
    }
    return audioCtxRef.current;
  }, []);

  // Unlock AudioContext on first user interaction
  useEffect(() => {
    const unlock = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
    };
    window.addEventListener("pointerdown", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true, passive: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [getAudioContext]);

  const executeSound = useCallback((ctx: AudioContext, type: SoundType) => {
    const now = ctx.currentTime;

    switch (type) {
      case "tick": {
        // Crisp, tactile UI hover blip (800Hz down to 400Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(850, now);
        osc.frequency.exponentialRampToValueAtTime(420, now + 0.025);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.026);
        break;
      }

      case "press": {
        // Satisfying mechanical click (450Hz down to 180Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.045);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.046);
        break;
      }

      case "release": {
        // Subtle upward chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.03);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.031);
        break;
      }

      case "toggle": {
        // Distinct two-tone switch blip
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(520, now);
        osc1.frequency.exponentialRampToValueAtTime(380, now + 0.02);
        gain1.gain.setValueAtTime(0.09, now);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.021);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(740, now + 0.025);
        osc2.frequency.exponentialRampToValueAtTime(560, now + 0.05);
        gain2.gain.setValueAtTime(0.09, now + 0.025);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.025);
        osc2.stop(now + 0.051);
        break;
      }

      case "chime": {
        // Melodic chime for milestones / claps
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(1046.5, now); // C6
        gain1.gain.setValueAtTime(0.1, now);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.23);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1568, now + 0.06); // G6
        gain2.gain.setValueAtTime(0.09, now + 0.06);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.06);
        osc2.stop(now + 0.33);
        break;
      }
    }
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      if (isMutedRef.current) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      if (ctx.state === "suspended") {
        ctx
          .resume()
          .then(() => {
            executeSound(ctx, type);
          })
          .catch(() => {});
      } else {
        executeSound(ctx, type);
      }
    },
    [getAudioContext, executeSound]
  );

  // Global event delegation for data-cuelume attributes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "") return;
      const target = (e.target as Element)?.closest?.("[data-cuelume-hover]");
      if (!target) return;

      const now = performance.now();
      if (now - lastHoverTime.current < 120) return;
      lastHoverTime.current = now;

      const sound = (target.getAttribute("data-cuelume-hover") || "tick") as SoundType;
      playSound(sound);
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = (e.target as Element)?.closest?.("[data-cuelume-press]");
      if (!target) return;
      playSound("press");
    };

    const handlePointerUp = (e: PointerEvent) => {
      const target = (e.target as Element)?.closest?.("[data-cuelume-release]");
      if (!target) return;
      playSound("release");
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest?.("[data-cuelume-toggle]");
      if (!target) return;
      playSound("toggle");
    };

    document.addEventListener("pointerenter", handlePointerEnter, true);
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("pointerup", handlePointerUp, true);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("pointerenter", handlePointerEnter, true);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("pointerup", handlePointerUp, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [playSound]);

  const toggleMute = useCallback(() => {
    const next = !isMutedRef.current;
    isMutedRef.current = next;
    setIsMuted(next);
    try {
      localStorage.setItem("soundEffectsEnabled", String(!next));
      localStorage.setItem("portfolio_sound_muted", String(next));
    } catch {
      // ignore
    }
    if (!next) {
      playSound("toggle");
    }
  }, [playSound]);

  const playTick = useCallback(() => playSound("tick"), [playSound]);
  const playClick = useCallback(() => playSound("press"), [playSound]);
  const playPress = useCallback(() => playSound("press"), [playSound]);
  const playRelease = useCallback(() => playSound("release"), [playSound]);
  const playToggle = useCallback(() => playSound("toggle"), [playSound]);
  const playChime = useCallback(() => playSound("chime"), [playSound]);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playTick,
        playClick,
        playPress,
        playRelease,
        playToggle,
        playChime,
        play: playSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
