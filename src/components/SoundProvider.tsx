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

interface AudioGraph {
  ctx: AudioContext;
  master: GainNode;
  compressor: DynamicsCompressorNode;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const graphRef = useRef<AudioGraph | null>(null);
  const isMutedRef = useRef(false);
  // Per-element throttle map — prevents repeated ticks on same element within 80ms
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

  /**
   * Lazily build the AudioContext + master gain + compressor chain.
   * The compressor handles dynamic normalisation so all sounds come out
   * at consistent perceived loudness regardless of timing or browser state.
   */
  const getGraph = useCallback((): AudioGraph | null => {
    if (typeof window === "undefined") return null;
    if (graphRef.current) return graphRef.current;

    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return null;

    try {
      const ctx = new AudioCtxClass();

      // Master gain — all sounds routed here
      const master = ctx.createGain();
      master.gain.value = 0.9; // headroom; compressor handles peaks

      // Dynamics compressor — normalises volume spikes and prevents clipping
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -18; // dB
      compressor.knee.value = 6;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.12;

      master.connect(compressor);
      compressor.connect(ctx.destination);

      graphRef.current = { ctx, master, compressor };
      return graphRef.current;
    } catch {
      return null;
    }
  }, []);

  // Unlock the AudioContext on the very first user interaction (browser policy)
  useEffect(() => {
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      const graph = getGraph();
      if (graph && graph.ctx.state === "suspended") {
        graph.ctx.resume().catch(() => {});
      }
      unlocked = true;
    };
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [getGraph]);

  /**
   * Schedule a single oscillator burst into the master bus.
   * All parameters are normalised so sounds feel equally loud.
   */
  const scheduleOsc = useCallback(
    (
      ctx: AudioContext,
      dest: AudioNode,
      opts: {
        type?: OscillatorType;
        freqStart: number;
        freqEnd: number;
        gainPeak: number;
        duration: number;
        startOffset?: number;
      }
    ) => {
      const { type = "sine", freqStart, freqEnd, gainPeak, duration, startOffset = 0 } = opts;
      const now = ctx.currentTime + startOffset;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, now);
      if (freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 0.01), now + duration);
      }

      gain.gain.setValueAtTime(gainPeak, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(dest);
      osc.start(now);
      osc.stop(now + duration + 0.002);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    },
    []
  );

  const executeSound = useCallback(
    (graph: AudioGraph, type: SoundType) => {
      const { ctx, master } = graph;

      switch (type) {
        case "tick":
          // Short crisp blip — hover feedback
          scheduleOsc(ctx, master, {
            freqStart: 820,
            freqEnd: 410,
            gainPeak: 0.18,
            duration: 0.022,
          });
          break;

        case "press":
          // Mechanical click — pointer down
          scheduleOsc(ctx, master, {
            freqStart: 440,
            freqEnd: 200,
            gainPeak: 0.22,
            duration: 0.04,
          });
          break;

        case "release":
          // Subtle upward chirp — pointer up
          scheduleOsc(ctx, master, {
            freqStart: 310,
            freqEnd: 520,
            gainPeak: 0.14,
            duration: 0.028,
          });
          break;

        case "toggle":
          // Two-tone switch blip
          scheduleOsc(ctx, master, { freqStart: 520, freqEnd: 380, gainPeak: 0.18, duration: 0.018 });
          scheduleOsc(ctx, master, { freqStart: 740, freqEnd: 560, gainPeak: 0.18, duration: 0.02, startOffset: 0.024 });
          break;

        case "chime":
          // Melodic two-note chime — food/milestone
          scheduleOsc(ctx, master, { freqStart: 1046, freqEnd: 1046, gainPeak: 0.16, duration: 0.18 });
          scheduleOsc(ctx, master, { freqStart: 1568, freqEnd: 1568, gainPeak: 0.14, duration: 0.24, startOffset: 0.055 });
          break;
      }
    },
    [scheduleOsc]
  );

  const playSound = useCallback(
    (type: SoundType) => {
      if (isMutedRef.current) return;
      const graph = getGraph();
      if (!graph) return;

      const fire = () => executeSound(graph, type);

      if (graph.ctx.state === "suspended") {
        graph.ctx.resume().then(fire).catch(() => {});
      } else {
        fire();
      }
    },
    [getGraph, executeSound]
  );

  // Global event delegation for data-cuelume-* attributes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // skip synthetic touch events
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

  const playTick    = useCallback(() => playSound("tick"),    [playSound]);
  const playClick   = useCallback(() => playSound("press"),   [playSound]);
  const playPress   = useCallback(() => playSound("press"),   [playSound]);
  const playRelease = useCallback(() => playSound("release"), [playSound]);
  const playToggle  = useCallback(() => playSound("toggle"),  [playSound]);
  const playChime   = useCallback(() => playSound("chime"),   [playSound]);

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
