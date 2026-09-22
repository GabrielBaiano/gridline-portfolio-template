"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";

// Classic Space Invaders Pixel Art Bitmaps (1 = filled pixel, 0 = transparent)
const ALIEN_CRAB_A = [
  [0,0,1,0,0,0,0,1,0,0],
  [0,0,0,1,0,0,1,0,0,0],
  [0,0,1,1,1,1,1,1,0,0],
  [0,1,1,0,1,1,0,1,1,0],
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [0,0,0,1,1,1,1,0,0,0],
];

const ALIEN_CRAB_B = [
  [0,0,1,0,0,0,0,1,0,0],
  [1,0,0,1,0,0,1,0,0,1],
  [1,0,1,1,1,1,1,1,0,1],
  [1,1,1,0,1,1,0,1,1,1],
  [0,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,0,0],
  [0,0,1,0,0,0,0,1,0,0],
  [0,1,0,0,0,0,0,0,1,0],
];

const ALIEN_SQUID_A = [
  [0,0,0,1,1,0,0,0],
  [0,0,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,0],
  [1,1,0,1,1,0,1,1],
  [1,1,1,1,1,1,1,1],
  [0,0,1,0,0,1,0,0],
  [0,1,0,1,1,0,1,0],
  [1,0,1,0,0,1,0,1],
];

const ALIEN_SQUID_B = [
  [0,0,0,1,1,0,0,0],
  [0,0,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,0],
  [1,1,0,1,1,0,1,1],
  [1,1,1,1,1,1,1,1],
  [0,1,0,0,0,0,1,0],
  [0,0,1,0,0,1,0,0],
  [0,1,0,0,0,0,1,0],
];

const CANNON_SPRITE = [
  [0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,1,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
];

interface Invader {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "crab" | "squid";
  alive: boolean;
  score: number;
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
  const clickTimestamps = useRef<number[]>([]);

  // Game state refs
  const isPlayingRef = useRef(false);
  const isGameOverRef = useRef(false);
  const isVictoryRef = useRef(false);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const playerXRef = useRef(300);
  const keysDownRef = useRef<Set<string>>(new Set());
  const touchXRef = useRef<number | null>(null);

  const invadersRef = useRef<Invader[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const sparksRef = useRef<Spark[]>([]);

  const fleetDirRef = useRef<1 | -1>(1);
  const fleetStepTimerRef = useRef(0);
  const fleetStepIntervalRef = useRef(35);
  const animFrameToggleRef = useRef(false);
  const lastShotTimeRef = useRef(0);
  const invaderShotTimerRef = useRef(0);
  const invulnerableTimerRef = useRef(0);

  const boundsRef = useRef({ width: 660, height: 220 });

  const initFleet = useCallback((w: number, h: number) => {
    const isSmall = w < 480;
    const cols = isSmall ? 5 : 8;
    const rows = isSmall ? 2 : 3;

    const spacingX = isSmall ? 44 : 54;
    const spacingY = 28;
    const startX = Math.max(20, Math.floor((w - cols * spacingX) / 2));
    const startY = 32;

    const invaders: Invader[] = [];
    for (let r = 0; r < rows; r++) {
      const type: "crab" | "squid" = r === 0 ? "squid" : "crab";
      const spriteW = type === "squid" ? 8 * 2 : 10 * 2;
      const spriteH = 8 * 2;
      const score = type === "squid" ? 30 : 20;

      for (let c = 0; c < cols; c++) {
        invaders.push({
          x: startX + c * spacingX,
          y: startY + r * spacingY,
          width: spriteW,
          height: spriteH,
          type,
          alive: true,
          score,
        });
      }
    }

    invadersRef.current = invaders;
    fleetDirRef.current = 1;
    fleetStepTimerRef.current = 0;
    fleetStepIntervalRef.current = isSmall ? 30 : 38;
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

  // Triple click on banner to initiate
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
    if (now - lastShotTimeRef.current < 220) return;

    // Limit active player bullets
    const activePlayerBullets = bulletsRef.current.filter((b) => b.fromPlayer).length;
    if (activePlayerBullets >= 3) return;

    lastShotTimeRef.current = now;
    bulletsRef.current.push({
      x: playerXRef.current,
      y: boundsRef.current.height - 24,
      vy: -5.5,
      fromPlayer: true,
    });
    playTick();
  }, [playTick]);

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

  // Touch & Pointer controls
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isPlaying) return;
    if (isGameOverRef.current || isVictoryRef.current) {
      resetGame();
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      playerXRef.current = Math.max(16, Math.min(rect.width - 16, e.clientX - rect.left));
      shootPlayerBullet();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPlaying) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      playerXRef.current = Math.max(16, Math.min(rect.width - 16, e.clientX - rect.left));
    }
  };

  // Main 60fps Loop
  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      boundsRef.current = { width: rect.width, height: rect.height };
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    const spawnSparks = (x: number, y: number, color: string) => {
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2.5;
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 15 + Math.floor(Math.random() * 10),
          color,
        });
      }
    };

    // Draw pixel sprite
    const drawSprite = (
      bitmap: number[][],
      x: number,
      y: number,
      pixelSize: number,
      color: string
    ) => {
      ctx.fillStyle = color;
      const rows = bitmap.length;
      const cols = bitmap[0].length;
      const startX = Math.round(x - (cols * pixelSize) / 2);
      const startY = Math.round(y - (rows * pixelSize) / 2);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (bitmap[r][c] === 1) {
            ctx.fillRect(startX + c * pixelSize, startY + r * pixelSize, pixelSize, pixelSize);
          }
        }
      }
    };

    const loop = () => {
      const { width: w, height: h } = boundsRef.current;
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, w, h);

      // Colors
      const playerColor = isDark ? "#ffffff" : "#18181b";
      const crabColor = isDark ? "#4ade80" : "#16a34a";
      const squidColor = isDark ? "#38bdf8" : "#0284c7";
      const bulletColor = isDark ? "#facc15" : "#eab308";
      const alienBulletColor = isDark ? "#f43f5e" : "#e11d48";
      const hudColor = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)";

      if (!isGameOverRef.current && !isVictoryRef.current) {
        // 1. Move Player
        const keys = keysDownRef.current;
        let dx = 0;
        if (keys.has("arrowleft") || keys.has("a")) dx -= 4.2;
        if (keys.has("arrowright") || keys.has("d")) dx += 4.2;
        playerXRef.current = Math.max(16, Math.min(w - 16, playerXRef.current + dx));

        if (invulnerableTimerRef.current > 0) {
          invulnerableTimerRef.current -= 1;
        }

        // 2. Invaders Fleet Movement
        const aliveInvaders = invadersRef.current.filter((inv) => inv.alive);
        if (aliveInvaders.length === 0) {
          isVictoryRef.current = true;
          playChime();
        } else {
          fleetStepTimerRef.current += 1;

          // Fleet gets faster as fewer aliens remain
          const speedFactor = Math.max(8, Math.floor((aliveInvaders.length / 24) * fleetStepIntervalRef.current));

          if (fleetStepTimerRef.current >= speedFactor) {
            fleetStepTimerRef.current = 0;
            animFrameToggleRef.current = !animFrameToggleRef.current;

            let shouldDrop = false;
            const dir = fleetDirRef.current;

            for (const inv of aliveInvaders) {
              if ((dir === 1 && inv.x + inv.width >= w - 18) || (dir === -1 && inv.x <= 18)) {
                shouldDrop = true;
                break;
              }
            }

            if (shouldDrop) {
              fleetDirRef.current = (dir * -1) as 1 | -1;
              for (const inv of aliveInvaders) {
                inv.y += 10;
                // Check if aliens landed on player row
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

          // 3. Alien Shoots
          invaderShotTimerRef.current += 1;
          if (invaderShotTimerRef.current > 75) {
            invaderShotTimerRef.current = 0;
            const bottomShooters = aliveInvaders.filter((inv) => {
              // Only shooters with no alive invaders directly beneath
              return !aliveInvaders.some((other) => other !== inv && Math.abs(other.x - inv.x) < 20 && other.y > inv.y);
            });

            if (bottomShooters.length > 0) {
              const shooter = bottomShooters[Math.floor(Math.random() * bottomShooters.length)];
              bulletsRef.current.push({
                x: shooter.x + shooter.width / 2,
                y: shooter.y + shooter.height + 4,
                vy: 2.8,
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

          let bulletConsumed = false;

          if (b.fromPlayer) {
            // Check collision with invaders
            for (const inv of invadersRef.current) {
              if (!inv.alive) continue;
              if (
                b.x >= inv.x &&
                b.x <= inv.x + inv.width &&
                b.y >= inv.y &&
                b.y <= inv.y + inv.height
              ) {
                inv.alive = false;
                bulletConsumed = true;
                scoreRef.current += inv.score;
                spawnSparks(inv.x + inv.width / 2, inv.y + inv.height / 2, inv.type === "squid" ? squidColor : crabColor);
                playClick();
                break;
              }
            }
          } else {
            // Check collision with player
            const px = playerXRef.current;
            const py = h - 14;
            if (
              invulnerableTimerRef.current <= 0 &&
              Math.abs(b.x - px) < 12 &&
              Math.abs(b.y - py) < 10
            ) {
              bulletConsumed = true;
              livesRef.current -= 1;
              invulnerableTimerRef.current = 60; // 1s immunity
              spawnSparks(px, py, playerColor);
              playError();

              if (livesRef.current <= 0) {
                isGameOverRef.current = true;
              }
            }
          }

          if (!bulletConsumed) {
            nextBullets.push(b);
          }
        }
        bulletsRef.current = nextBullets;
      }

      // 5. Update Sparks
      const nextSparks: Spark[] = [];
      for (const s of sparksRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        if (s.life < s.maxLife) {
          nextSparks.push(s);
          const alpha = 1 - s.life / s.maxLife;
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha;
          ctx.fillRect(s.x, s.y, 2, 2);
          ctx.globalAlpha = 1;
        }
      }
      sparksRef.current = nextSparks;

      // 6. Draw Invaders
      const isAltFrame = animFrameToggleRef.current;
      for (const inv of invadersRef.current) {
        if (!inv.alive) continue;
        const bitmap =
          inv.type === "squid"
            ? isAltFrame ? ALIEN_SQUID_B : ALIEN_SQUID_A
            : isAltFrame ? ALIEN_CRAB_B : ALIEN_CRAB_A;
        const color = inv.type === "squid" ? squidColor : crabColor;
        drawSprite(bitmap, inv.x + inv.width / 2, inv.y + inv.height / 2, 2, color);
      }

      // 7. Draw Bullets
      for (const b of bulletsRef.current) {
        ctx.fillStyle = b.fromPlayer ? bulletColor : alienBulletColor;
        if (b.fromPlayer) {
          ctx.fillRect(b.x - 1, b.y - 3, 2, 6);
        } else {
          // Squiggly alien bullet
          ctx.fillRect(b.x - 1.5, b.y - 3, 3, 5);
        }
      }

      // 8. Draw Player
      const isBlinking = invulnerableTimerRef.current > 0 && Math.floor(invulnerableTimerRef.current / 6) % 2 === 0;
      if (!isBlinking) {
        drawSprite(CANNON_SPRITE, playerXRef.current, h - 14, 2, playerColor);
      }

      // 9. Draw HUD
      ctx.font = "10px monospace";
      ctx.fillStyle = hudColor;
      ctx.fillText(`SCORE: ${scoreRef.current}`, 12, 16);

      // Lives
      let livesText = "LIVES: ";
      for (let i = 0; i < livesRef.current; i++) {
        livesText += "▲ ";
      }
      ctx.fillText(livesText, w - 85, 16);

      // 10. Overlays (Game Over / Victory)
      if (isGameOverRef.current) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = isDark ? "#f87171" : "#ef4444";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", w / 2, h / 2 - 8);
        ctx.font = "11px monospace";
        ctx.fillStyle = hudColor;
        ctx.fillText("SPACE TO REPLAY • ESC TO EXIT", w / 2, h / 2 + 14);
        ctx.textAlign = "left";
      } else if (isVictoryRef.current) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = isDark ? "#4ade80" : "#16a34a";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.fillText("VICTORY! WAVE CLEARED", w / 2, h / 2 - 8);
        ctx.font = "11px monospace";
        ctx.fillStyle = hudColor;
        ctx.fillText("SPACE TO REPLAY • ESC TO EXIT", w / 2, h / 2 + 14);
        ctx.textAlign = "left";
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateSize);
    };
  }, [isPlaying, playChime, playClick, playError]);

  return (
    <div
      ref={containerRef}
      onClick={handleBannerClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={`${className} relative select-none overflow-hidden cursor-pointer bg-dot-grid rounded-[4px]`}
    >
      {isPlaying && (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block w-full h-full pointer-events-none"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              quitGame();
            }}
            className="absolute top-2 right-2 px-1.5 py-0.5 text-[10px] font-mono rounded border border-border bg-background/80 hover:bg-background text-mutedForeground transition-colors cursor-pointer select-none"
            title="Exit game (Esc)"
          >
            ESC ✕
          </button>
        </>
      )}
    </div>
  );
}
