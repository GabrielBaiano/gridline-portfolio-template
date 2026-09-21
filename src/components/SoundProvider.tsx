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
      const saved = localStorage.getItem("soundEffectsEnabled");
      if (saved !== null) {
        const enabled = saved !== "false";
        setIsMuted(!enabled);
        isMutedRef.current = !enabled;
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
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
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
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [getAudioContext]);

  // Noise generator helper
  const createNoiseBuffer = useCallback((ctx: AudioContext): AudioBuffer => {
    const bufferSize = ctx.sampleRate * 0.1; // 100ms noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      if (isMutedRef.current) return;
      const ctx = getAudioContext();
      if (!ctx || ctx.state !== "running") return;

      const now = ctx.currentTime;

      switch (type) {
        case "tick": {
          // Bandpass noise + soft high sine tone
          const master = ctx.createGain();
          master.gain.value = 0.4;
          master.connect(ctx.destination);

          // Noise layer
          const noise = ctx.createBufferSource();
          noise.buffer = createNoiseBuffer(ctx);
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 5400;
          filter.Q.value = 1.8;

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.0001, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.14, now + 0.001);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.019);

          noise.connect(filter).connect(noiseGain).connect(master);
          noise.start(now);
          noise.stop(now + 0.02);

          // Tone layer
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.value = 2600;

          const toneGain = ctx.createGain();
          toneGain.gain.setValueAtTime(0.0001, now);
          toneGain.gain.exponentialRampToValueAtTime(0.018, now + 0.001);
          toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.013);

          osc.connect(toneGain).connect(master);
          osc.start(now);
          osc.stop(now + 0.015);

          setTimeout(() => master.disconnect(), 100);
          break;
        }

        case "press": {
          const master = ctx.createGain();
          master.gain.value = 0.4;
          master.connect(ctx.destination);

          const noise = ctx.createBufferSource();
          noise.buffer = createNoiseBuffer(ctx);
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1700;
          filter.Q.value = 1.4;

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.0001, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.13, now + 0.001);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.021);

          noise.connect(filter).connect(noiseGain).connect(master);
          noise.start(now);
          noise.stop(now + 0.025);

          setTimeout(() => master.disconnect(), 100);
          break;
        }

        case "release": {
          const master = ctx.createGain();
          master.gain.value = 0.4;
          master.connect(ctx.destination);

          const noise = ctx.createBufferSource();
          noise.buffer = createNoiseBuffer(ctx);
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 4600;
          filter.Q.value = 1.8;

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.0001, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.12, now + 0.001);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.017);

          noise.connect(filter).connect(noiseGain).connect(master);
          noise.start(now);
          noise.stop(now + 0.02);

          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.value = 3200;

          const toneGain = ctx.createGain();
          toneGain.gain.setValueAtTime(0.0001, now + 0.006);
          toneGain.gain.exponentialRampToValueAtTime(0.02, now + 0.007);
          toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.057);

          osc.connect(toneGain).connect(master);
          osc.start(now + 0.006);
          osc.stop(now + 0.06);

          setTimeout(() => master.disconnect(), 120);
          break;
        }

        case "toggle": {
          const master = ctx.createGain();
          master.gain.value = 0.4;
          master.connect(ctx.destination);

          // Click 1
          const noise1 = ctx.createBufferSource();
          noise1.buffer = createNoiseBuffer(ctx);
          const filter1 = ctx.createBiquadFilter();
          filter1.type = "bandpass";
          filter1.frequency.value = 2200;
          filter1.Q.value = 1.6;

          const gain1 = ctx.createGain();
          gain1.gain.setValueAtTime(0.0001, now);
          gain1.gain.exponentialRampToValueAtTime(0.12, now + 0.001);
          gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.017);

          noise1.connect(filter1).connect(gain1).connect(master);
          noise1.start(now);
          noise1.stop(now + 0.02);

          // Click 2
          const noise2 = ctx.createBufferSource();
          noise2.buffer = createNoiseBuffer(ctx);
          const filter2 = ctx.createBiquadFilter();
          filter2.type = "bandpass";
          filter2.frequency.value = 3800;
          filter2.Q.value = 1.6;

          const gain2 = ctx.createGain();
          gain2.gain.setValueAtTime(0.0001, now + 0.024);
          gain2.gain.exponentialRampToValueAtTime(0.1, now + 0.025);
          gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

          noise2.connect(filter2).connect(gain2).connect(master);
          noise2.start(now + 0.024);
          noise2.stop(now + 0.05);

          setTimeout(() => master.disconnect(), 150);
          break;
        }

        case "chime": {
          const master = ctx.createGain();
          master.gain.value = 0.5;
          master.connect(ctx.destination);

          // Shimmer delay
          const delay = ctx.createDelay(1);
          delay.delayTime.value = 0.12;
          const shimmerFilter = ctx.createBiquadFilter();
          shimmerFilter.type = "lowpass";
          shimmerFilter.frequency.value = 4000;
          const feedback = ctx.createGain();
          feedback.gain.value = 0.25;
          const wet = ctx.createGain();
          wet.gain.value = 0.18;

          master.connect(delay);
          delay.connect(shimmerFilter).connect(feedback).connect(delay);
          shimmerFilter.connect(wet).connect(ctx.destination);

          // Tone 1: 1046.5Hz
          const osc1 = ctx.createOscillator();
          osc1.type = "sine";
          osc1.frequency.value = 1046.5;
          const gain1 = ctx.createGain();
          gain1.gain.setValueAtTime(0.0001, now);
          gain1.gain.exponentialRampToValueAtTime(0.09, now + 0.006);
          gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.226);
          osc1.connect(gain1).connect(master);
          osc1.start(now);
          osc1.stop(now + 0.25);

          // Tone 2: 1568Hz
          const osc2 = ctx.createOscillator();
          osc2.type = "sine";
          osc2.frequency.value = 1568;
          const gain2 = ctx.createGain();
          gain2.gain.setValueAtTime(0.0001, now + 0.09);
          gain2.gain.exponentialRampToValueAtTime(0.08, now + 0.096);
          gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.356);
          osc2.connect(gain2).connect(master);
          osc2.start(now + 0.09);
          osc2.stop(now + 0.38);

          setTimeout(() => {
            master.disconnect();
            delay.disconnect();
            shimmerFilter.disconnect();
            feedback.disconnect();
            wet.disconnect();
          }, 800);
          break;
        }
      }
    },
    [getAudioContext, createNoiseBuffer]
  );

  // Global event delegation for data-cuelume attributes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const target = (e.target as Element)?.closest?.("[data-cuelume-hover]");
      if (!target) return;

      const now = performance.now();
      if (now - lastHoverTime.current < 150) return;
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
