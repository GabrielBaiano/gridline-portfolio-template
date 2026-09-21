"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";

interface Point {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

// Exact grid unit matching .bg-dot-grid in globals.css (background-size: 7.5px 7.5px)
const CELL_SIZE = 7.5;
const GAME_SPEED_MS = 75;

export function DotGridSnakeGame({
  className = "w-full sm:min-h-[200px] min-h-[120px] h-full grow",
}: {
  className?: string;
}) {
  const { playClick, playChime } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  // Triple-click tracking
  const clickTimestamps = useRef<number[]>([]);

  // Game state refs (for 60fps render & tick loops without closure lag)
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
  const isPlayingRef = useRef(false);
  const isGameOverRef = useRef(false);
  const blinkCountRef = useRef(0);
  const isBlinkingRef = useRef(false);
  const colsRef = useRef(50);
  const rowsRef = useRef(20);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const spawnFood = useCallback((snake: Point[], cols: number, rows: number): Point => {
    const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
    const available: Point[] = [];
    for (let x = 2; x < cols - 2; x++) {
      for (let y = 2; y < rows - 2; y++) {
        if (!occupied.has(`${x},${y}`)) {
          available.push({ x, y });
        }
      }
    }
    if (available.length === 0) return { x: 5, y: 5 };
    const idx = Math.floor(Math.random() * available.length);
    return available[idx];
  }, []);

  const resetGame = useCallback(() => {
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const startY = Math.floor(rows / 2);
    const startX = Math.min(18, Math.floor(cols / 4));

    const initialSnake: Point[] = [
      { x: startX + 5, y: startY },
      { x: startX + 4, y: startY },
      { x: startX + 3, y: startY },
      { x: startX + 2, y: startY },
      { x: startX + 1, y: startY },
      { x: startX, y: startY },
    ];

    snakeRef.current = initialSnake;
    directionRef.current = "RIGHT";
    nextDirectionRef.current = "RIGHT";
    foodRef.current = spawnFood(initialSnake, cols, rows);
    isGameOverRef.current = false;
    isBlinkingRef.current = false;
    blinkCountRef.current = 0;
  }, [spawnFood]);

  const quitGame = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    isGameOverRef.current = false;
    isBlinkingRef.current = false;
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cols = Math.max(20, Math.floor(rect.width / CELL_SIZE));
    const rows = Math.max(10, Math.floor(rect.height / CELL_SIZE));
    colsRef.current = cols;
    rowsRef.current = rows;

    resetGame();
    setIsPlaying(true);
    isPlayingRef.current = true;
    playChime();
  }, [resetGame, playChime]);

  // Triple-click detector on banner
  const handleBannerClick = () => {
    if (isPlaying) {
      // If already playing, a click does not interrupt unless user specifically wants to
      return;
    }
    const now = Date.now();
    clickTimestamps.current.push(now);
    clickTimestamps.current = clickTimestamps.current.filter((t) => now - t < 750);

    if (clickTimestamps.current.length >= 3) {
      clickTimestamps.current = [];
      startGame();
    }
  };

  // Keyboard navigation & controls
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const cur = directionRef.current;

      if (e.key === "Escape") {
        e.preventDefault();
        quitGame();
        return;
      }

      if (isGameOverRef.current) {
        if (e.code === "Space" || e.key === "Enter" || e.key.startsWith("Arrow") || ["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
          e.preventDefault();
          resetGame();
        }
        return;
      }

      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        if (cur !== "DOWN") nextDirectionRef.current = "UP";
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        if (cur !== "UP") nextDirectionRef.current = "DOWN";
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        if (cur !== "RIGHT") nextDirectionRef.current = "LEFT";
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        if (cur !== "LEFT") nextDirectionRef.current = "RIGHT";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, quitGame, resetGame]);

  // Touch controls for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isPlaying) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isPlaying || !touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (isGameOverRef.current) {
      resetGame();
      return;
    }

    const minSwipe = 10;
    if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;

    const cur = directionRef.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && cur !== "LEFT") nextDirectionRef.current = "RIGHT";
      else if (dx < 0 && cur !== "RIGHT") nextDirectionRef.current = "LEFT";
    } else {
      if (dy > 0 && cur !== "UP") nextDirectionRef.current = "DOWN";
      else if (dy < 0 && cur !== "DOWN") nextDirectionRef.current = "UP";
    }
  };

  // Game tick loop & discreet canvas rendering
  useEffect(() => {
    if (!isPlaying) return;

    let timer: NodeJS.Timeout | null = null;
    let animFrame: number | null = null;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      colsRef.current = Math.max(20, Math.floor(rect.width / CELL_SIZE));
      rowsRef.current = Math.max(10, Math.floor(rect.height / CELL_SIZE));
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Discrete Game Tick
    timer = setInterval(() => {
      if (isGameOverRef.current) return;

      const dir = nextDirectionRef.current;
      directionRef.current = dir;

      const cols = colsRef.current;
      const rows = rowsRef.current;
      const snake = [...snakeRef.current];
      const head = snake[0];

      let nextX = head.x;
      let nextY = head.y;

      if (dir === "LEFT") nextX -= 1;
      else if (dir === "RIGHT") nextX += 1;
      else if (dir === "UP") nextY -= 1;
      else if (dir === "DOWN") nextY += 1;

      // Wrap-around seamlessly across edges
      if (nextX < 0) nextX = cols - 1;
      else if (nextX >= cols) nextX = 0;

      if (nextY < 0) nextY = rows - 1;
      else if (nextY >= rows) nextY = 0;

      const newHead: Point = { x: nextX, y: nextY };

      // Self collision
      if (snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
        isGameOverRef.current = true;
        isBlinkingRef.current = true;
        playClick();

        // Discreet reset after brief blink (500ms) or quiet fade back to idle after 4s
        setTimeout(() => {
          isBlinkingRef.current = false;
        }, 500);

        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = setTimeout(() => {
          quitGame();
        }, 4000);

        return;
      }

      // Advance snake
      snake.unshift(newHead);

      // Check food collision
      const food = foodRef.current;
      if (newHead.x === food.x && newHead.y === food.y) {
        playChime();
        foodRef.current = spawnFood(snake, cols, rows);
      } else {
        snake.pop();
      }

      snakeRef.current = snake;
    }, GAME_SPEED_MS);

    // Subtle 60fps render loop
    const render = () => {
      if (!ctx || !canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Always clear canvas to remain transparent over the native .bg-dot-grid
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const snakeHeadColor = isDark ? "#ffffff" : "#111111";
      const snakeBodyColor = isDark ? "#a1a1aa" : "#52525b";
      const foodColor = isDark ? "#4ade80" : "#16a34a";

      const now = Date.now();

      // Draw glowing food dot directly on the grid
      const food = foodRef.current;
      const fx = food.x * CELL_SIZE + CELL_SIZE / 2;
      const fy = food.y * CELL_SIZE + CELL_SIZE / 2;
      const pulse = 1.8 + 0.4 * Math.sin(now / 180);

      ctx.fillStyle = foodColor;
      ctx.shadowColor = foodColor;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(fx, fy, pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw snake dots directly on top of grid points
      const snake = snakeRef.current;
      const shouldHideForBlink = isBlinkingRef.current && Math.floor(now / 100) % 2 === 0;

      if (!shouldHideForBlink) {
        snake.forEach((seg, i) => {
          const sx = seg.x * CELL_SIZE + CELL_SIZE / 2;
          const sy = seg.y * CELL_SIZE + CELL_SIZE / 2;

          if (i === 0) {
            // Head: bright accent dot
            ctx.fillStyle = snakeHeadColor;
            ctx.shadowColor = snakeHeadColor;
            ctx.shadowBlur = 2;
            ctx.beginPath();
            ctx.arc(sx, sy, 2.25, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            // Body: illuminated dot matching grid spacing
            ctx.fillStyle = snakeBodyColor;
            ctx.beginPath();
            ctx.arc(sx, sy, 1.75, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (timer) clearInterval(timer);
      if (animFrame) cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [isPlaying, playChime, playClick, quitGame, spawnFood]);

  return (
    <div
      ref={containerRef}
      onClick={handleBannerClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`${className} relative select-none overflow-hidden cursor-pointer bg-dot-grid rounded-[4px]`}
    >
      {isPlaying && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full pointer-events-none"
        />
      )}
    </div>
  );
}
