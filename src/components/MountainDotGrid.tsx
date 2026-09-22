"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSound } from "./SoundProvider";

interface Point {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const CELL_SIZE = 7.5;
const GAME_SPEED_MS = 75;

export function MountainDotGrid({
  className = "w-full sm:min-h-[220px] min-h-[120px] h-full grow",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const { playClick, playChime } = useSound();

  // Easter egg Snake Game state
  const [isPlaying, setIsPlaying] = useState(false);
  const clickTimestamps = useRef<number[]>([]);
  const snakeRef = useRef<Point[]>([
    { x: 16, y: 10 },
    { x: 15, y: 10 },
    { x: 14, y: 10 },
    { x: 13, y: 10 },
    { x: 12, y: 10 },
    { x: 11, y: 10 },
  ]);
  const directionRef = useRef<Direction>("RIGHT");
  const nextDirectionRef = useRef<Direction>("RIGHT");
  const foodRef = useRef<Point>({ x: 28, y: 10 });
  const isGameOverRef = useRef(false);
  const isBlinkingRef = useRef(false);
  const blinkCountRef = useRef(0);
  const colsRef = useRef(50);
  const rowsRef = useRef(20);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Triple-click handler to trigger easter egg
  const handleBannerClick = () => {
    const now = performance.now();
    clickTimestamps.current.push(now);
    if (clickTimestamps.current.length > 3) {
      clickTimestamps.current.shift();
    }
    if (clickTimestamps.current.length === 3) {
      const diff = clickTimestamps.current[2] - clickTimestamps.current[0];
      if (diff < 750) {
        clickTimestamps.current = [];
        if (!isPlaying) {
          setIsPlaying(true);
          playChime();
        }
      }
    }
  };

  // Keyboard navigation for Snake
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d", "W", "S", "A", "D"].includes(key)) {
        e.preventDefault();
      }

      if (key === "Escape") {
        setIsPlaying(false);
        return;
      }

      const current = directionRef.current;
      if ((key === "ArrowUp" || key === "w" || key === "W") && current !== "DOWN") {
        nextDirectionRef.current = "UP";
      } else if ((key === "ArrowDown" || key === "s" || key === "S") && current !== "UP") {
        nextDirectionRef.current = "DOWN";
      } else if ((key === "ArrowLeft" || key === "a" || key === "A") && current !== "RIGHT") {
        nextDirectionRef.current = "LEFT";
      } else if ((key === "ArrowRight" || key === "d" || key === "D") && current !== "LEFT") {
        nextDirectionRef.current = "RIGHT";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // Main canvas render: Halftone Mountain Relief + Snake overlay
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animFrame: number;
    let gameTimer: NodeJS.Timeout | null = null;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      colsRef.current = Math.floor(rect.width / CELL_SIZE);
      rowsRef.current = Math.floor(rect.height / CELL_SIZE);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking for subtle interactive lighting
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mousePosRef.current = null;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // Snake game loop
    if (isPlaying) {
      isGameOverRef.current = false;
      isBlinkingRef.current = false;
      blinkCountRef.current = 0;
      snakeRef.current = [
        { x: 16, y: 10 },
        { x: 15, y: 10 },
        { x: 14, y: 10 },
        { x: 13, y: 10 },
        { x: 12, y: 10 },
      ];
      directionRef.current = "RIGHT";
      nextDirectionRef.current = "RIGHT";
      foodRef.current = { x: 26, y: 10 };

      gameTimer = setInterval(() => {
        if (isGameOverRef.current) return;

        directionRef.current = nextDirectionRef.current;
        const head = snakeRef.current[0];
        let nx = head.x;
        let ny = head.y;

        if (directionRef.current === "UP") ny -= 1;
        else if (directionRef.current === "DOWN") ny += 1;
        else if (directionRef.current === "LEFT") nx -= 1;
        else if (directionRef.current === "RIGHT") nx += 1;

        const cols = colsRef.current;
        const rows = rowsRef.current;

        // Collision check
        if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) {
          isGameOverRef.current = true;
          isBlinkingRef.current = true;
          setTimeout(() => setIsPlaying(false), 3000);
          return;
        }

        for (let i = 1; i < snakeRef.current.length; i++) {
          if (snakeRef.current[i].x === nx && snakeRef.current[i].y === ny) {
            isGameOverRef.current = true;
            isBlinkingRef.current = true;
            setTimeout(() => setIsPlaying(false), 3000);
            return;
          }
        }

        const newSnake = [{ x: nx, y: ny }, ...snakeRef.current];

        // Eat food
        if (nx === foodRef.current.x && ny === foodRef.current.y) {
          playClick();
          foodRef.current = {
            x: Math.floor(Math.random() * (cols - 4)) + 2,
            y: Math.floor(Math.random() * (rows - 4)) + 2,
          };
        } else {
          newSnake.pop();
        }

        snakeRef.current = newSnake;
      }, GAME_SPEED_MS);
    }

    // Animation & Halftone Mountain Renderer
    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const baseDotColor = isDark ? "rgba(255, 255, 255, " : "rgba(0, 0, 0, ";

      const cols = Math.floor(width / CELL_SIZE);
      const rows = Math.floor(height / CELL_SIZE);
      const mouse = mousePosRef.current;

      // Draw each dot on the fixed 7.5px grid
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * CELL_SIZE + CELL_SIZE / 2;
          const y = r * CELL_SIZE + CELL_SIZE / 2;

          // Normalized coordinates (0 to 1)
          const nx = x / width;
          const ny = y / height;

          // Procedural Mountain Ridge Profile matching user image
          // Left Peak: center ~0.28, steep
          const peak1 = Math.exp(-Math.pow((nx - 0.28) / 0.16, 2)) * 0.72;
          // Middle Valley & Ridge: center ~0.55
          const peak2 = Math.exp(-Math.pow((nx - 0.58) / 0.18, 2)) * 0.65;
          // Right High Mountain: center ~0.82
          const peak3 = Math.exp(-Math.pow((nx - 0.82) / 0.15, 2)) * 0.80;

          // Mountain elevation line
          const mountainElevation = Math.max(peak1, peak2, peak3);

          // Add fine organic topographic noise texture
          const organicNoise =
            Math.sin(nx * 32 + ny * 18) * 0.08 +
            Math.cos(nx * 14 - ny * 24) * 0.06;

          // Compute distance from mountain horizon (bottom is 1.0, mountain tops reach up towards 0.2)
          const mountainY = 1.0 - mountainElevation + organicNoise;
          const diff = mountainY - ny;

          // Halftone modulation: dots inside the mountain shape are denser/stronger
          let intensity = 0.15; // default subtle grid background
          let radius = 1.0;

          if (diff <= 0) {
            // Inside or on the mountain peak / slope
            const depth = Math.min(1.0, -diff / 0.45);
            // Non-linear halftone curve for sharp ridge contrast
            intensity = 0.35 + Math.pow(depth, 1.4) * 0.55;
            radius = 1.1 + depth * 1.25;
          } else if (diff < 0.08) {
            // Mountain atmospheric edge mist
            intensity = 0.22;
            radius = 1.05;
          }

          // Subtle interactive proximity highlight on mouse hover
          if (mouse) {
            const dist = Math.hypot(x - mouse.x, y - mouse.y);
            if (dist < 80) {
              const boost = (1 - dist / 80) * 0.3;
              intensity = Math.min(1.0, intensity + boost);
              radius = Math.min(2.4, radius + boost * 0.8);
            }
          }

          // Draw the Halftone Grid Dot
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.6, radius), 0, Math.PI * 2);
          ctx.fillStyle = `${baseDotColor}${intensity.toFixed(2)})`;
          ctx.fill();
        }
      }

      // Draw Snake Game elements if playing
      if (isPlaying) {
        // Food: bright pulsing dot
        const fx = foodRef.current.x * CELL_SIZE + CELL_SIZE / 2;
        const fy = foodRef.current.y * CELL_SIZE + CELL_SIZE / 2;
        const now = performance.now();
        const foodPulse = 2.2 + Math.sin(now / 150) * 0.6;

        ctx.fillStyle = isDark ? "#38bdf8" : "#0284c7";
        ctx.beginPath();
        ctx.arc(fx, fy, foodPulse, 0, Math.PI * 2);
        ctx.fill();

        // Snake Body & Head
        const snake = snakeRef.current;
        const hideBlink = isBlinkingRef.current && Math.floor(now / 120) % 2 === 0;

        if (!hideBlink) {
          snake.forEach((seg, i) => {
            const sx = seg.x * CELL_SIZE + CELL_SIZE / 2;
            const sy = seg.y * CELL_SIZE + CELL_SIZE / 2;

            ctx.beginPath();
            if (i === 0) {
              ctx.arc(sx, sy, 2.6, 0, Math.PI * 2);
              ctx.fillStyle = isDark ? "#ffffff" : "#000000";
            } else {
              ctx.arc(sx, sy, 2.0, 0, Math.PI * 2);
              ctx.fillStyle = isDark ? "#38bdf8" : "#0284c7";
            }
            ctx.fill();
          });
        }
      }

      ctx.restore();
      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (gameTimer) clearInterval(gameTimer);
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isPlaying, playClick]);

  return (
    <div
      ref={containerRef}
      onClick={handleBannerClick}
      title="Triple-click to play Snake"
      className={`${className} relative select-none overflow-hidden cursor-pointer rounded-[4px]`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
