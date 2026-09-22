"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";

// Exact 1978 Space Invaders Arcade Bitmaps (1 = illuminated dot, 0 = empty)
// 1. Squid (Top Row Alien) - 8 cols x 8 rows
const SQUID_1 = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 1, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 1, 0, 1],
];

const SQUID_2 = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
];

// 2. Crab (Middle Row Alien) - 11 cols x 8 rows
const CRAB_1 = [
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
];

const CRAB_2 = [
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
];

// 3. Octopus (Bottom Row Alien) - 12 cols x 8 rows
const OCTOPUS_1 = [
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
];

const OCTOPUS_2 = [
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
];

// 4. Cannon (Player Ship) - 13 cols x 8 rows
const CANNON = [
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// 5. Classic Alien Explosion - 13 cols x 8 rows
const EXPLOSION = [
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
];

// Pixel scale for compact micro-dots
const DOT_STEP = 3.2; // Spacing between dots in pixels
const DOT_RADIUS = 1.35; // Radius of each illuminated dot

interface Invader {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "squid" | "crab" | "octopus";
  alive: boolean;
  score: number;
  explosionTimer?: number;
}

interface Bullet {
  x: number;
  y: number;
  vy: number;
  fromPlayer: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
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

  // Screen bounds
  const boundsRef = useRef({ width: 660, height: 220 });

  // Game state
  const isGameOverRef = useRef(false);
  const isVictoryRef = useRef(false);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);

  // Player state
  const playerXRef = useRef(330);
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
  const sparksRef = useRef<Spark[]>([]);

  const initFleet = useCallback((w: number, h: number) => {
    const isSmall = w < 480;
    const numCols = isSmall ? 5 : 7;
    const numRows = h < 170 ? 2 : 3;

    // Spacing between aliens
    const colSpacing = isSmall ? 50 : 58;
    const rowSpacing = 32;
    const fleetWidth = (numCols - 1) * colSpacing + 12 * DOT_STEP;
    const startX = Math.max(20, Math.floor((w - fleetWidth) / 2));
    const startY = 24;

    const invaders: Invader[] = [];
    for (let r = 0; r < numRows; r++) {
      let type: "squid" | "crab" | "octopus";
      let score: number;
      let spriteCols: number;

      if (r === 0) {
        type = "squid";
        score = 30;
        spriteCols = 8;
      } else if (r === 1) {
        type = "crab";
        score = 20;
        spriteCols = 11;
      } else {
        type = "octopus";
        score = 10;
        spriteCols = 12;
      }

      for (let c = 0; c < numCols; c++) {
        invaders.push({
          x: startX + c * colSpacing + ((12 - spriteCols) * DOT_STEP) / 2,
          y: startY + r * rowSpacing,
          width: spriteCols * DOT_STEP,
          height: 8 * DOT_STEP,
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
    const { width, height } = boundsRef.current;
    scoreRef.current = 0;
    livesRef.current = 3;
    playerXRef.current = width / 2;
    bulletsRef.current = [];
    sparksRef.current = [];
    isGameOverRef.current = false;
    isVictoryRef.current = false;
    invulnerableTimerRef.current = 0;
    initFleet(width, height);
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
    boundsRef.current = { width: rect.width, height: rect.height };
    resetGame();
    setIsPlaying(true);
    isPlayingRef.current = true;
    playChime();
  }, [resetGame, playChime]);

  // Triple-click on the banner triggers the game
  const handleBannerClick = () => {
    if (isPlaying) {
      if (isGameOverRef.current || isVictoryRef.current) {
        resetGame();
        return;
      }
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

  const shootPlayerBullet = useCallback(() => {
    if (isGameOverRef.current || isVictoryRef.current) return;
    const now = performance.now();
    if (now - lastShotTimeRef.current < 200) return;

    const activeBullets = bulletsRef.current.filter((b) => b.fromPlayer).length;
    if (activeBullets >= 2) return;

    lastShotTimeRef.current = now;
    bulletsRef.current.push({
      x: playerXRef.current,
      y: boundsRef.current.height - 24,
      vy: -6,
      fromPlayer: true,
    });
    playPress();
  }, [playPress]);

  // Keyboard controls
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
      boundsRef.current = { width: rect.width, height: rect.height };
    };

    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);

    // Monochromatic dot renderer
    const drawMonochromeDot = (x: number, y: number, color: string, glowColor: string, radius = DOT_RADIUS) => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 3;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Draw authentic bitmap sprite using glowing circular dots
    const drawDotBitmap = (
      bitmap: number[][],
      startX: number,
      startY: number,
      color: string,
      glowColor: string
    ) => {
      const rows = bitmap.length;
      const cols = bitmap[0].length;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (bitmap[r][c] === 1) {
            drawMonochromeDot(startX + c * DOT_STEP, startY + r * DOT_STEP, color, glowColor);
          }
        }
      }
    };

    const loop = () => {
      const { width: w, height: h } = boundsRef.current;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, w, h);

      // Strictly Monochromatic Arcade Colors
      const mainWhite = isDark ? "#ffffff" : "#111111";
      const secondaryWhite = isDark ? "#e4e4e7" : "#27272a";
      const dimmedWhite = isDark ? "#a1a1aa" : "#71717a";
      const glowHalo = isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.2)";

      if (!isGameOverRef.current && !isVictoryRef.current) {
        // 1. Move Player Cannon (ArrowLeft / ArrowRight / A / D)
        const keys = keysDownRef.current;
        const cannonWidth = 13 * DOT_STEP;
        if (keys.has("arrowleft") || keys.has("a")) {
          playerXRef.current = Math.max(cannonWidth / 2 + 10, playerXRef.current - 4.5);
        }
        if (keys.has("arrowright") || keys.has("d")) {
          playerXRef.current = Math.min(w - cannonWidth / 2 - 10, playerXRef.current + 4.5);
        }

        if (invulnerableTimerRef.current > 0) {
          invulnerableTimerRef.current -= 1;
        }

        // 2. Invaders Fleet Movement
        const aliveInvaders = invadersRef.current.filter((inv) => inv.alive);
        if (aliveInvaders.length === 0) {
          isVictoryRef.current = true;
          playChime();
          setTimeout(() => {
            if (isPlayingRef.current) {
              isVictoryRef.current = false;
              initFleet(w, h);
            }
          }, 1400);
        } else {
          fleetStepTimerRef.current += 1;
          const stepSpeed = Math.max(5, Math.floor((aliveInvaders.length / 21) * 28));

          if (fleetStepTimerRef.current >= stepSpeed) {
            fleetStepTimerRef.current = 0;
            animFrameToggleRef.current = !animFrameToggleRef.current;
            playTick();

            let hitEdge = false;
            const dir = fleetDirRef.current;

            for (const inv of aliveInvaders) {
              if ((dir === 1 && inv.x + inv.width >= w - 16) || (dir === -1 && inv.x <= 16)) {
                hitEdge = true;
                break;
              }
            }

            if (hitEdge) {
              fleetDirRef.current = (dir * -1) as 1 | -1;
              for (const inv of aliveInvaders) {
                inv.y += 10;
                if (inv.y + inv.height >= h - 28) {
                  isGameOverRef.current = true;
                  playError();
                  break;
                }
              }
            } else {
              const stepX = dir * 7;
              for (const inv of aliveInvaders) {
                inv.x += stepX;
              }
            }
          }

          // 3. Alien Bombs Drop
          invaderShotTimerRef.current += 1;
          if (invaderShotTimerRef.current > 55) {
            invaderShotTimerRef.current = 0;
            const bottomAliens = aliveInvaders.filter((inv) => {
              return !aliveInvaders.some((other) => other !== inv && Math.abs(other.x - inv.x) < 30 && other.y > inv.y);
            });

            if (bottomAliens.length > 0) {
              const shooter = bottomAliens[Math.floor(Math.random() * bottomAliens.length)];
              bulletsRef.current.push({
                x: shooter.x + shooter.width / 2,
                y: shooter.y + shooter.height + 2,
                vy: 3.2,
                fromPlayer: false,
              });
            }
          }
        }

        // 4. Update Bullets
        const nextBullets: Bullet[] = [];
        for (const b of bulletsRef.current) {
          b.y += b.vy;

          if (b.y < -10 || b.y > h + 10) continue;

          let consumed = false;

          if (b.fromPlayer) {
            for (const inv of invadersRef.current) {
              if (!inv.alive) continue;
              if (
                b.x >= inv.x &&
                b.x <= inv.x + inv.width &&
                b.y >= inv.y &&
                b.y <= inv.y + inv.height
              ) {
                inv.alive = false;
                inv.explosionTimer = 9; // Display authentic explosion for 9 frames
                consumed = true;
                scoreRef.current += inv.score;
                playClick();
                break;
              }
            }
          } else {
            // Alien bullet hit player cannon
            const px = playerXRef.current;
            const py = h - 20;
            if (
              invulnerableTimerRef.current <= 0 &&
              Math.abs(b.x - px) < 18 &&
              Math.abs(b.y - py) < 10
            ) {
              consumed = true;
              livesRef.current -= 1;
              invulnerableTimerRef.current = 50;
              playError();

              if (livesRef.current <= 0) {
                isGameOverRef.current = true;
              }
            }
          }

          if (!consumed) nextBullets.push(b);
        }
        bulletsRef.current = nextBullets;
      }

      // 5. Draw Invaders (100% authentic Space Invaders bitmaps)
      const isAlt = animFrameToggleRef.current;
      for (const inv of invadersRef.current) {
        if (!inv.alive) {
          if (inv.explosionTimer && inv.explosionTimer > 0) {
            inv.explosionTimer -= 1;
            drawDotBitmap(EXPLOSION, inv.x, inv.y, dimmedWhite, glowHalo);
          }
          continue;
        }

        let bitmap: number[][];
        if (inv.type === "squid") {
          bitmap = isAlt ? SQUID_2 : SQUID_1;
        } else if (inv.type === "crab") {
          bitmap = isAlt ? CRAB_2 : CRAB_1;
        } else {
          bitmap = isAlt ? OCTOPUS_2 : OCTOPUS_1;
        }

        drawDotBitmap(bitmap, inv.x, inv.y, secondaryWhite, glowHalo);
      }

      // 6. Draw Bullets (pure monochrome beams)
      for (const b of bulletsRef.current) {
        if (b.fromPlayer) {
          // Sharp player vertical laser beam
          drawMonochromeDot(b.x, b.y - 3, mainWhite, glowHalo, 1.4);
          drawMonochromeDot(b.x, b.y, mainWhite, glowHalo, 1.5);
          drawMonochromeDot(b.x, b.y + 3, mainWhite, glowHalo, 1.4);
        } else {
          // Alien bomb
          drawMonochromeDot(b.x, b.y - 2, dimmedWhite, glowHalo, 1.3);
          drawMonochromeDot(b.x, b.y + 2, dimmedWhite, glowHalo, 1.3);
        }
      }

      // 7. Draw Player Cannon (100% authentic Space Invaders cannon)
      const isBlinking = invulnerableTimerRef.current > 0 && Math.floor(invulnerableTimerRef.current / 5) % 2 === 0;
      if (!isBlinking) {
        const cannonStartX = playerXRef.current - (13 * DOT_STEP) / 2;
        const cannonStartY = h - 22;
        drawDotBitmap(CANNON, cannonStartX, cannonStartY, mainWhite, glowHalo);
      }

      // 8. Monochromatic GAME OVER Screen
      if (isGameOverRef.current) {
        ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.78)" : "rgba(255, 255, 255, 0.82)";
        ctx.fillRect(0, 0, w, h);

        ctx.textAlign = "center";

        // "GAME OVER" title
        ctx.font = "bold 16px monospace";
        ctx.fillStyle = mainWhite;
        ctx.shadowColor = glowHalo;
        ctx.shadowBlur = 6;
        ctx.fillText("G A M E   O V E R", w / 2, h / 2 - 12);
        ctx.shadowBlur = 0;

        // Score display
        ctx.font = "11px monospace";
        ctx.fillStyle = secondaryWhite;
        ctx.fillText(`SCORE  < ${String(scoreRef.current).padStart(4, "0")} >`, w / 2, h / 2 + 10);

        // Restart prompt
        ctx.font = "10px monospace";
        ctx.fillStyle = dimmedWhite;
        ctx.fillText("PRESS SPACE TO PLAY AGAIN • ESC TO EXIT", w / 2, h / 2 + 30);
        ctx.textAlign = "left";
      }

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
