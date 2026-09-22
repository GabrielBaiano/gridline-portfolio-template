"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";

// Micro Space Invaders Bitmaps on a discrete dot-grid
// 1 = illuminated dot, 0 = unlit grid dot

// Micro Squid (Alien Type A) - 5 cols x 3 rows
const SQUID_1 = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
];

const SQUID_2 = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0],
];

// Micro Crab (Alien Type B) - 5 cols x 3 rows
const CRAB_1 = [
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1],
];

const CRAB_2 = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0],
];

// Micro Cannon (Player Ship) - 5 cols x 3 rows
const CANNON = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
];

// Grid unit exactly matching .bg-dot-grid in globals.css (7.5px)
const CELL_SIZE = 7.5;

interface Invader {
  col: number;
  row: number;
  width: number;
  height: number;
  type: "squid" | "crab";
  alive: boolean;
  score: number;
}

interface Bullet {
  col: number;
  row: number;
  vy: number;
  fromPlayer: boolean;
}

interface DotSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function DotGridSpaceInvaders({
  className = "w-full sm:min-h-[220px] min-h-[140px] h-full grow",
}: {
  className?: string;
}) {
  const { playClick, playChime, playError, playTick, playPress } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const clickTimestamps = useRef<number[]>([]);

  // Game grid state
  const colsCountRef = useRef(88);
  const rowsCountRef = useRef(29);
  const isGameOverRef = useRef(false);
  const isVictoryRef = useRef(false);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);

  // Player state
  const playerColRef = useRef(44);
  const keysDownRef = useRef<Set<string>>(new Set());
  const lastShotTimeRef = useRef(0);
  const invulnerableTimerRef = useRef(0);

  // Fleet state
  const invadersRef = useRef<Invader[]>([]);
  const fleetDirRef = useRef<1 | -1>(1);
  const fleetStepTimerRef = useRef(0);
  const animFrameToggleRef = useRef(false);
  const invaderShotTimerRef = useRef(0);

  // Bullets & Sparks
  const bulletsRef = useRef<Bullet[]>([]);
  const sparksRef = useRef<DotSpark[]>([]);

  const initFleet = useCallback((totalCols: number, totalRows: number) => {
    const isSmall = totalCols < 60;
    const numCols = isSmall ? 6 : 8;
    const numRows = totalRows < 20 ? 2 : 3;

    // Spacing between invaders in grid units
    const colSpacing = isSmall ? 7 : 8;
    const rowSpacing = 5;
    const fleetWidth = (numCols - 1) * colSpacing + 5;
    const startCol = Math.max(3, Math.floor((totalCols - fleetWidth) / 2));
    const startRow = 2;

    const invaders: Invader[] = [];
    for (let r = 0; r < numRows; r++) {
      const type: "squid" | "crab" = r === 0 ? "squid" : "crab";
      const w = 5;
      const h = 3;
      const score = type === "squid" ? 30 : 20;

      for (let c = 0; c < numCols; c++) {
        invaders.push({
          col: startCol + c * colSpacing,
          row: startRow + r * rowSpacing,
          width: w,
          height: h,
          type,
          alive: true,
          score,
        });
      }
    }

    invadersRef.current = invaders;
    fleetDirRef.current = 1;
    fleetStepTimerRef.current = 0;
    animFrameToggleRef.current = false;
  }, []);

  const resetGame = useCallback(() => {
    const totalCols = colsCountRef.current;
    const totalRows = rowsCountRef.current;
    scoreRef.current = 0;
    livesRef.current = 3;
    playerColRef.current = Math.floor(totalCols / 2);
    bulletsRef.current = [];
    sparksRef.current = [];
    isGameOverRef.current = false;
    isVictoryRef.current = false;
    invulnerableTimerRef.current = 0;
    initFleet(totalCols, totalRows);
  }, [initFleet]);

  const quitGame = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    isGameOverRef.current = false;
    isVictoryRef.current = false;
    keysDownRef.current.clear();
  }, []);

  const startGame = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    colsCountRef.current = Math.max(24, Math.floor(rect.width / CELL_SIZE));
    rowsCountRef.current = Math.max(14, Math.floor(rect.height / CELL_SIZE));
    resetGame();
    setIsPlaying(true);
    isPlayingRef.current = true;
    playChime();
  }, [resetGame, playChime]);

  // Triple-click on banner triggers game
  const handleBannerClick = () => {
    if (isPlaying) return;
    const now = Date.now();
    clickTimestamps.current.push(now);
    clickTimestamps.current = clickTimestamps.current.filter((t) => now - t < 750);

    if (clickTimestamps.current.length >= 3) {
      clickTimestamps.current = [];
      startGame();
    }
  };

  const shootPlayerBullet = useCallback(() => {
    if (isGameOverRef.current || isVictoryRef.current) return;
    const now = performance.now();
    if (now - lastShotTimeRef.current < 190) return;

    const activeBullets = bulletsRef.current.filter((b) => b.fromPlayer).length;
    if (activeBullets >= 3) return;

    lastShotTimeRef.current = now;
    const pCol = playerColRef.current;
    const pRow = rowsCountRef.current - 3;

    bulletsRef.current.push({
      col: pCol,
      row: pRow - 1,
      vy: -0.7,
      fromPlayer: true,
    });
    playPress();
  }, [playPress]);

  // Keyboard controls only
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        quitGame();
        return;
      }

      if (isGameOverRef.current || isVictoryRef.current) {
        if (e.code === "Space" || e.key === "Enter" || ["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
          e.preventDefault();
          resetGame();
        }
        return;
      }

      if (e.code === "Space" || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        shootPlayerBullet();
      }

      keysDownRef.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDownRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying, quitGame, resetGame, shootPlayerBullet]);

  // Mouse / Touch click shoots only (no mouse following)
  const handlePointerDown = () => {
    if (!isPlaying) return;
    if (isGameOverRef.current || isVictoryRef.current) {
      resetGame();
      return;
    }
    shootPlayerBullet();
  };

  // 60FPS Game & Render Loop
  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const updateCanvasDimensions = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      colsCountRef.current = Math.max(24, Math.floor(rect.width / CELL_SIZE));
      rowsCountRef.current = Math.max(14, Math.floor(rect.height / CELL_SIZE));
    };

    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);

    // Monochromatic dot renderer with crisp subtle glow
    const drawMonochromeDot = (
      col: number,
      row: number,
      color: string,
      glowColor: string,
      radius = 1.6,
      glowBlur = 3
    ) => {
      const isDark = document.documentElement.classList.contains("dark");
      const x = col * CELL_SIZE + CELL_SIZE / 2;
      const y = row * CELL_SIZE + CELL_SIZE / 2;

      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = glowBlur;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle bright core in dark mode
      if (isDark) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const drawDotSprite = (
      bitmap: number[][],
      startCol: number,
      startRow: number,
      color: string,
      glowColor: string,
      radius = 1.6
    ) => {
      const rows = bitmap.length;
      const cols = bitmap[0].length;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (bitmap[r][c] === 1) {
            drawMonochromeDot(startCol + c, startRow + r, color, glowColor, radius, 3);
          }
        }
      }
    };

    const spawnExplosionDots = (centerCol: number, centerRow: number, color: string) => {
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 2.0;
        sparksRef.current.push({
          x: centerCol * CELL_SIZE + CELL_SIZE / 2,
          y: centerRow * CELL_SIZE + CELL_SIZE / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 12 + Math.floor(Math.random() * 8),
          color,
        });
      }
    };

    const loop = () => {
      const totalCols = colsCountRef.current;
      const totalRows = rowsCountRef.current;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, totalCols * CELL_SIZE + 10, totalRows * CELL_SIZE + 10);

      // Strictly Monochromatic Palette
      const playerColor = isDark ? "#ffffff" : "#111111";
      const alienColor = isDark ? "#d4d4d8" : "#27272a";
      const bulletColor = isDark ? "#ffffff" : "#18181b";
      const alienBulletColor = isDark ? "#a1a1aa" : "#52525b";
      const glowHalo = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.15)";

      if (!isGameOverRef.current && !isVictoryRef.current) {
        // 1. Move Player Cannon
        const keys = keysDownRef.current;
        if (keys.has("arrowleft") || keys.has("a")) {
          playerColRef.current = Math.max(3, playerColRef.current - 0.75);
        }
        if (keys.has("arrowright") || keys.has("d")) {
          playerColRef.current = Math.min(totalCols - 3, playerColRef.current + 0.75);
        }

        if (invulnerableTimerRef.current > 0) {
          invulnerableTimerRef.current -= 1;
        }

        // 2. Fleet Step Timing
        const aliveInvaders = invadersRef.current.filter((inv) => inv.alive);
        if (aliveInvaders.length === 0) {
          isVictoryRef.current = true;
          playChime();
          setTimeout(() => {
            if (isPlayingRef.current) {
              isVictoryRef.current = false;
              initFleet(totalCols, totalRows);
            }
          }, 1200);
        } else {
          fleetStepTimerRef.current += 1;
          const stepSpeed = Math.max(5, Math.floor((aliveInvaders.length / 24) * 30));

          if (fleetStepTimerRef.current >= stepSpeed) {
            fleetStepTimerRef.current = 0;
            animFrameToggleRef.current = !animFrameToggleRef.current;
            playTick();

            let hitEdge = false;
            const dir = fleetDirRef.current;

            for (const inv of aliveInvaders) {
              if ((dir === 1 && inv.col + inv.width >= totalCols - 2) || (dir === -1 && inv.col <= 2)) {
                hitEdge = true;
                break;
              }
            }

            if (hitEdge) {
              fleetDirRef.current = (dir * -1) as 1 | -1;
              for (const inv of aliveInvaders) {
                inv.row += 1;
                if (inv.row + inv.height >= totalRows - 3) {
                  isGameOverRef.current = true;
                  playError();
                  setTimeout(() => {
                    if (isPlayingRef.current) resetGame();
                  }, 1800);
                  break;
                }
              }
            } else {
              for (const inv of aliveInvaders) {
                inv.col += dir;
              }
            }
          }

          // 3. Alien Bomb Drop
          invaderShotTimerRef.current += 1;
          if (invaderShotTimerRef.current > 60) {
            invaderShotTimerRef.current = 0;
            const bottomAliens = aliveInvaders.filter((inv) => {
              return !aliveInvaders.some((other) => other !== inv && Math.abs(other.col - inv.col) < 5 && other.row > inv.row);
            });

            if (bottomAliens.length > 0) {
              const shooter = bottomAliens[Math.floor(Math.random() * bottomAliens.length)];
              bulletsRef.current.push({
                col: shooter.col + Math.floor(shooter.width / 2),
                row: shooter.row + shooter.height,
                vy: 0.4,
                fromPlayer: false,
              });
            }
          }
        }

        // 4. Update Bullets
        const nextBullets: Bullet[] = [];
        for (const b of bulletsRef.current) {
          b.row += b.vy;

          if (b.row < 0 || b.row > totalRows + 1) continue;

          let consumed = false;

          if (b.fromPlayer) {
            for (const inv of invadersRef.current) {
              if (!inv.alive) continue;
              if (
                Math.round(b.col) >= inv.col &&
                Math.round(b.col) <= inv.col + inv.width - 1 &&
                Math.round(b.row) >= inv.row &&
                Math.round(b.row) <= inv.row + inv.height - 1
              ) {
                inv.alive = false;
                consumed = true;
                scoreRef.current += inv.score;
                spawnExplosionDots(inv.col + Math.floor(inv.width / 2), inv.row + Math.floor(inv.height / 2), alienColor);
                playClick();
                break;
              }
            }
          } else {
            // Alien bullet hit player
            const pCol = Math.round(playerColRef.current);
            const pRow = totalRows - 3;
            if (
              invulnerableTimerRef.current <= 0 &&
              Math.abs(b.col - pCol) <= 2 &&
              Math.abs(b.row - pRow) <= 2
            ) {
              consumed = true;
              livesRef.current -= 1;
              invulnerableTimerRef.current = 50;
              spawnExplosionDots(pCol, pRow, playerColor);
              playError();

              if (livesRef.current <= 0) {
                isGameOverRef.current = true;
                setTimeout(() => {
                  if (isPlayingRef.current) resetGame();
                }, 1800);
              }
            }
          }

          if (!consumed) nextBullets.push(b);
        }
        bulletsRef.current = nextBullets;
      }

      // 5. Draw Invaders (monochromatic dots)
      const isAltFrame = animFrameToggleRef.current;
      for (const inv of invadersRef.current) {
        if (!inv.alive) continue;
        const bitmap =
          inv.type === "squid"
            ? isAltFrame ? SQUID_2 : SQUID_1
            : isAltFrame ? CRAB_2 : CRAB_1;
        drawDotSprite(bitmap, inv.col, inv.row, alienColor, glowHalo, 1.6);
      }

      // 6. Draw Bullets (monochromatic dots)
      for (const b of bulletsRef.current) {
        const c = Math.round(b.col);
        const r = Math.round(b.row);
        if (b.fromPlayer) {
          drawMonochromeDot(c, r, bulletColor, glowHalo, 1.8, 4);
          drawMonochromeDot(c, r + 1, bulletColor, glowHalo, 1.5, 2);
        } else {
          drawMonochromeDot(c, r, alienBulletColor, glowHalo, 1.5, 3);
        }
      }

      // 7. Draw Player Cannon (monochromatic dots)
      const isBlinking = invulnerableTimerRef.current > 0 && Math.floor(invulnerableTimerRef.current / 5) % 2 === 0;
      if (!isBlinking) {
        const pCol = Math.round(playerColRef.current) - 2;
        const pRow = totalRows - 3;
        drawDotSprite(CANNON, pCol, pRow, playerColor, glowHalo, 1.75);
      }

      // 8. Draw Sparks (monochromatic dots)
      const nextSparks: DotSpark[] = [];
      for (const s of sparksRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        if (s.life < s.maxLife) {
          nextSparks.push(s);
          const alpha = 1 - s.life / s.maxLife;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 3;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.6 * alpha, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      sparksRef.current = nextSparks;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateCanvasDimensions);
    };
  }, [isPlaying, playChime, playClick, playError, playTick]);

  return (
    <div
      ref={containerRef}
      onClick={handleBannerClick}
      onPointerDown={handlePointerDown}
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
