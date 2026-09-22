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

// Pre-render sound into AudioBuffer (PCM memory cache)
function createToneBuffer(
  ctx: AudioContext,
  freqStart: number,
  freqEnd: number,
  duration: number,
  gainPeak: number
): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const numFrames = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = ctx.createBuffer(1, numFrames, sampleRate);
  const data = buffer.getChannelData(0);

  let phase = 0;
  for (let i = 0; i < numFrames; i++) {
    const t = i / numFrames;
    // Exponential frequency sweep
    const freq = freqStart * Math.pow(Math.max(freqEnd, 0.01) / freqStart, t);
    phase += (2 * Math.PI * freq) / sampleRate;

    // Linear attack / exponential decay envelope
    let env: number;
    if (t < 0.1) {
      env = t / 0.1;
    } else {
      env = Math.exp(-6 * (t - 0.1));
    }

    data[i] = Math.sin(phase) * env * gainPeak;
  }

  return buffer;
}

// Pre-render two-tone sound into AudioBuffer
function createDualToneBuffer(
  ctx: AudioContext,
  tone1: { f1: number; f2: number; dur: number; peak: number; offset: number },
  tone2: { f1: number; f2: number; dur: number; peak: number; offset: number }
): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const totalDuration = Math.max(tone1.offset + tone1.dur, tone2.offset + tone2.dur);
  const numFrames = Math.max(1, Math.floor(sampleRate * totalDuration));
  const buffer = ctx.createBuffer(1, numFrames, sampleRate);
  const data = buffer.getChannelData(0);

  const applyTone = (tone: typeof tone1) => {
    const startFrame = Math.floor(tone.offset * sampleRate);
    const toneFrames = Math.floor(tone.dur * sampleRate);
    let phase = 0;

    for (let i = 0; i < toneFrames; i++) {
      const idx = startFrame + i;
      if (idx >= numFrames) break;
      const t = i / toneFrames;
      const freq = tone.f1 * Math.pow(Math.max(tone.f2, 0.01) / tone.f1, t);
      phase += (2 * Math.PI * freq) / sampleRate;

      let env: number;
      if (t < 0.1) {
        env = t / 0.1;
      } else {
        env = Math.exp(-5 * (t - 0.1));
      }

      data[idx] += Math.sin(phase) * env * tone.peak;
    }
  };

  applyTone(tone1);
  applyTone(tone2);
  return buffer;
}

interface AudioEngine {
  ctx: AudioContext;
  buffers: Map<SoundType, AudioBuffer>;
  masterGain: GainNode;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const engineRef = useRef<AudioEngine | null>(null);
  const isMutedRef = useRef(false);
  const isUnlockedRef = useRef(false);
  const lastHoverMap = useRef<WeakMap<Element, number>>(new WeakMap());

  // Load persisted mute preference
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

  // Initialize engine ONLY upon valid user interaction (complies with browser Autoplay Policy)
  const initEngine = useCallback((): AudioEngine | null => {
    if (typeof window === "undefined") return null;
    if (engineRef.current) return engineRef.current;

    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return null;

    try {
      const ctx = new AudioCtxClass();
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.85;
      masterGain.connect(ctx.destination);

      // Pre-render PCM AudioBuffers into RAM
      const buffers = new Map<SoundType, AudioBuffer>();

      // 1. Tick: crisp, subtle micro-blip (20ms, 820Hz -> 410Hz)
      buffers.set("tick", createToneBuffer(ctx, 820, 410, 0.02, 0.16));

      // 2. Press: tactile mechanical click (35ms, 440Hz -> 200Hz)
      buffers.set("press", createToneBuffer(ctx, 440, 200, 0.035, 0.22));

      // 3. Release: subtle lift (25ms, 300Hz -> 500Hz)
      buffers.set("release", createToneBuffer(ctx, 300, 500, 0.025, 0.14));

      // 4. Toggle: double-blip switch
      buffers.set(
        "toggle",
        createDualToneBuffer(
          ctx,
          { f1: 520, f2: 380, dur: 0.02, peak: 0.18, offset: 0 },
          { f1: 740, f2: 560, dur: 0.025, peak: 0.18, offset: 0.024 }
        )
      );

      // 5. Chime: melodic harmonic chord (C6 -> G6)
      buffers.set(
        "chime",
        createDualToneBuffer(
          ctx,
          { f1: 1046.5, f2: 1046.5, dur: 0.18, peak: 0.16, offset: 0 },
          { f1: 1568, f2: 1568, dur: 0.24, peak: 0.14, offset: 0.05 }
        )
      );

      engineRef.current = { ctx, buffers, masterGain };
      return engineRef.current;
    } catch {
      return null;
    }
  }, []);

  // Listen to the very first user interaction to create/resume the AudioContext cleanly
  useEffect(() => {
    const handleGesture = () => {
      const engine = initEngine();
      if (engine && engine.ctx.state === "suspended") {
        engine.ctx.resume().catch(() => {});
      }
      isUnlockedRef.current = true;
    };

    window.addEventListener("pointerdown", handleGesture, { passive: true });
    window.addEventListener("keydown", handleGesture, { passive: true });
    window.addEventListener("touchstart", handleGesture, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
    };
  }, [initEngine]);

  // Ultra-fast zero-latency sound trigger via cached AudioBuffer
  const playSound = useCallback(
    (type: SoundType) => {
      if (isMutedRef.current) return;

      const engine = engineRef.current || initEngine();
      if (!engine) return;

      if (engine.ctx.state === "suspended") {
        engine.ctx.resume().catch(() => {});
      }

      const buffer = engine.buffers.get(type);
      if (!buffer) return;

      try {
        const source = engine.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(engine.masterGain);
        source.start(0); // Plays immediately at sub-millisecond precision
        source.onended = () => {
          source.disconnect();
        };
      } catch {
        // Audio playback failed safely
      }
    },
    [initEngine]
  );

  // Global event delegation for data-cuelume-* attributes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handlePointerEnter = (e: PointerEvent) => {
      // Ignore simulated touch mouse events
      if (e.pointerType === "touch") return;

      const target = (e.target as Element)?.closest?.("[data-cuelume-hover]");
      if (!target) return;

      const now = performance.now();
      const last = lastHoverMap.current.get(target) ?? 0;
      if (now - last < 80) return;
      lastHoverMap.current.set(target, now);

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
    if (!next) playSound("toggle");
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
