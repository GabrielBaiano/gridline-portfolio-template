"use client";

import { useEffect, useRef, useState } from "react";

export function useAnimatedCount(target: number, duration = 800) {
  const [displayCount, setDisplayCount] = useState<number>(0);
  const animRef = useRef<number | null>(null);
  const currentValRef = useRef<number>(0);

  useEffect(() => {
    const startVal = currentValRef.current;
    if (startVal === target && displayCount === target) return;

    // For single-step user interactions (+1 / -1), update immediately
    if (startVal > 0 && Math.abs(target - startVal) <= 1) {
      currentValRef.current = target;
      setDisplayCount(target);
      return;
    }

    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const nextVal = Math.round(startVal + (target - startVal) * ease);
      currentValRef.current = nextVal;
      setDisplayCount(nextVal);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(frame);
      }
    };
    animRef.current = requestAnimationFrame(frame);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [target, duration]);

  return displayCount;
}
