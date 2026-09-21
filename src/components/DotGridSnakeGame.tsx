"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";

interface Point {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const CELL_SIZE = 12; // Pixel size per grid unit
const GAME_SPEED_MS = 100;

export function DotGridSnakeGame({
  className = "w-full sm:min-h-[200px] min-h-[120px] h-full grow",
}: {
  className?: string;
}) {
  const { playClick, playChime } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Triple-click tracking
  const clickTimestamps = useRef<number[]>([]);

  // Game state refs (for high-fps loop without stale closures)
  const snakeRef = useRef<Point[]>([
    { x: 6, y: 5 },
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ]);
  const directionRef = useRef<Direction>("RIGHT");
  const nextDirectionRef = useRef<Direction>("RIGHT");
  const foodRef = useRef<Point>({ x: 12, y: 5 });
  const isPlayingRef = useRef(false);
  const isGameOverRef = useRef(false);
  const colsRef = useRef(30);
  const rowsRef = useRef(15);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Load high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gridline_snake_highscore");
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch {
      // ignore
    }
  }, []);

  const spawnFood = useCallback((snake: Point[], cols: number, rows: number): Point => {
    const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
    const available: Point[] = [];
    for (let x = 1; x < cols - 1; x++) {
      for (let y = 1; y < rows - 1; y++) {
        if (!occupied.has(`${x},${y}`)) {
          available.push({ x, y });
        }
      }
    }
    if (available.length === 0) return { x: 1, y: 1 };
    const idx = Math.floor(Math.random() * available.length);
    return available[idx];
  }, []);

  const resetGame = useCallback(() => {
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const startY = Math.floor(rows / 2);
    const startX = Math.min(8, Math.floor(cols / 4));

    const initialSnake: Point[] = [
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
    setIsGameOver(false);
    setScore(0);
  }, [spawnFood]);

  const startGame = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cols = Math.max(15, Math.floor(rect.width / CELL_SIZE));
    const rows = Math.max(10, Math.floor(rect.height / CELL_SIZE));
    colsRef.current = cols;
    rowsRef.current = rows;

    resetGame();
    setIsPlaying(true);
    isPlayingRef.current = true;
    playChime();
  }, [resetGame, playChime]);

  const quitGame = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setIsGameOver(false);
    isGameOverRef.current = false;
  }, []);

  // Triple-click detector
  const handleBannerClick = () => {
    if (isPlaying) return;
    const now = Date.now();
    clickTimestamps.current.push(now);
    // Keep only timestamps within 750ms window
    clickTimestamps.current = clickTimestamps.current.filter((t) => now - t < 750);

    if (clickTimestamps.current.length >= 3) {
      clickTimestamps.current = [];
      startGame();
    }
  };

  // Keyboard navigation
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
        if (e.code === "Space" || e.key === "Enter") {
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

  // Touch controls for mobile
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

    const minSwipe = 15;
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

  // Game tick loop & canvas render
  useEffect(() => {
    if (!isPlaying) return;

    let timer: NodeJS.Timeout | null = null;
    let animFrame: number | null = null;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match display rect with device pixel ratio
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      colsRef.current = Math.max(15, Math.floor(rect.width / CELL_SIZE));
      rowsRef.current = Math.max(10, Math.floor(rect.height / CELL_SIZE));
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Game tick
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

      // Wrap around edges seamlessly
      if (nextX < 0) nextX = cols - 1;
      else if (nextX >= cols) nextX = 0;

      if (nextY < 0) nextY = rows - 1;
      else if (nextY >= rows) nextY = 0;

      const newHead: Point = { x: nextX, y: nextY };

      // Self collision
      if (snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
        isGameOverRef.current = true;
        setIsGameOver(true);
        playClick();
        return;
      }

      // Move snake
      snake.unshift(newHead);

      // Check food
      const food = foodRef.current;
      if (newHead.x === food.x && newHead.y === food.y) {
        playChime();
        setScore((prev) => {
          const next = prev + 1;
          setHighScore((curHigh) => {
            if (next > curHigh) {
              try {
                localStorage.setItem("gridline_snake_highscore", String(next));
              } catch {
                // ignore
              }
              return next;
            }
            return curHigh;
          });
          return next;
        });
        foodRef.current = spawnFood(snake, cols, rows);
      } else {
        snake.pop();
      }

      snakeRef.current = snake;
    }, GAME_SPEED_MS);

    // Render loop
    const render = () => {
      if (!ctx || !canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const isDark = document.documentElement.classList.contains("dark");
      const dotColor = isDark ? "#262626" : "#e4e4e4";
      const snakeHeadColor = isDark ? "#ffffff" : "#111111";
      const snakeBodyColor = isDark ? "#a1a1aa" : "#52525b";
      const foodColor = isDark ? "#4ade80" : "#16a34a";
      const textColor = isDark ? "#ebebeb" : "#18181b";
      const overlayBg = isDark ? "rgba(14, 13, 9, 0.85)" : "rgba(255, 255, 255, 0.88)";

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Draw background pixel dots (matching the site's dot grid aesthetic)
      const cols = colsRef.current;
      const rows = rowsRef.current;
      ctx.fillStyle = dotColor;
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * CELL_SIZE + CELL_SIZE / 2;
          const py = y * CELL_SIZE + CELL_SIZE / 2;
          ctx.beginPath();
          ctx.arc(px, py, 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw food
      const food = foodRef.current;
      const fx = food.x * CELL_SIZE + 1.5;
      const fy = food.y * CELL_SIZE + 1.5;
      const fSize = CELL_SIZE - 3;
      ctx.fillStyle = foodColor;
      ctx.shadowColor = foodColor;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.roundRect(fx, fy, fSize, fSize, 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw snake
      const snake = snakeRef.current;
      snake.forEach((seg, i) => {
        const sx = seg.x * CELL_SIZE + 1;
        const sy = seg.y * CELL_SIZE + 1;
        const sSize = CELL_SIZE - 2;
        ctx.fillStyle = i === 0 ? snakeHeadColor : snakeBodyColor;
        ctx.beginPath();
        ctx.roundRect(sx, sy, sSize, sSize, i === 0 ? 3 : 2);
        ctx.fill();
      });

      // Game Over Screen
      if (isGameOverRef.current) {
        ctx.fillStyle = overlayBg;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = textColor;
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", w / 2, h / 2 - 14);

        ctx.font = "12px monospace";
        ctx.fillStyle = isDark ? "#9f9f9f" : "#737373";
        ctx.fillText("SPACE or TAP to restart · ESC to exit", w / 2, h / 2 + 14);
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (timer) clearInterval(timer);
      if (animFrame) cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [isPlaying, playChime, playClick, spawnFood]);

  return (
    <div
      ref={containerRef}
      onClick={handleBannerClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`${className} relative select-none overflow-hidden transition-all duration-300 ${
        isPlaying ? "cursor-crosshair" : "cursor-pointer bg-dot-grid"
      } rounded-[4px]`}
      title={isPlaying ? "Use arrow keys or WASD to control the snake" : undefined}
    >
      {isPlaying && (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block w-full h-full"
            tabIndex={0}
          />

          {/* Retro Top Bar HUD */}
          <div className="absolute top-2 left-3 right-3 flex items-center justify-between text-xs font-mono select-none pointer-events-none z-10 text-mutedForeground">
            <div className="flex items-center gap-2 bg-background/80 px-2 py-0.5 rounded border border-border">
              <span className="text-foreground font-bold">🐍 SNAKE</span>
              <span>SCORE: {score.toString().padStart(2, "0")}</span>
              <span>BEST: {highScore.toString().padStart(2, "0")}</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                quitGame();
              }}
              className="pointer-events-auto cursor-pointer px-2 py-0.5 rounded border border-border bg-background/80 hover:bg-mutedBackground text-foreground transition-colors"
              title="Close game (ESC)"
            >
              ESC ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
}
