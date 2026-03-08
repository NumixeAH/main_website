"use client";

import { useEffect, useRef, useCallback } from "react";

// ——— Spark background: tune these to change look and performance ———
const SPARK_CONFIG = {
  /** Number of particles on screen */
  particleCount: 200,
  /** Vertical speed range (negative = upward): [min, max] */
  speedY: [-0.7, -0.3] as [number, number],
  /** Horizontal drift per frame: [min, max] */
  driftX: [-0.15, 0.15] as [number, number],
  /** Extra upward nudge per frame (makes them float up over time) */
  floatUp: 0.002,
  /** Particle size range in px: [min, max] */
  size: [1, 2.5] as [number, number],
  /** How long each particle lives (frames): [min, max] */
  life: [200, 500] as [number, number],
  /** Mouse repulsion: distance (px) at which particles react */
  mouseRadius: 250,
  /** Mouse repulsion strength (higher = stronger push) */
  mouseStrength: 0.05,
  /** Random wobble per frame (adds organic movement) */
  wobble: 0.02,
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function SparkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const createParticle = useCallback(
    (width: number, height: number): Particle => {
      const [lifeMin, lifeMax] = SPARK_CONFIG.life;
      const maxLife = lifeMin + Math.random() * (lifeMax - lifeMin);
      const [syMin, syMax] = SPARK_CONFIG.speedY;
      const [dxMin, dxMax] = SPARK_CONFIG.driftX;
      const [sizeMin, sizeMax] = SPARK_CONFIG.size;
      return {
        x: Math.random() * width,
        y: height + Math.random() * 50,
        vx: dxMin + Math.random() * (dxMax - dxMin),
        vy: syMin + Math.random() * (syMax - syMin),
        size: sizeMin + Math.random() * (sizeMax - sizeMin),
        opacity: 0,
        life: 0,
        maxLife,
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const { particleCount, floatUp, mouseRadius, mouseStrength, wobble } = SPARK_CONFIG;
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(canvas.width, canvas.height)
    );
    particlesRef.current.forEach((p) => {
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
    });

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const style = getComputedStyle(document.documentElement);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sparkColor = style.getPropertyValue("--spark-color").trim();

      particlesRef.current.forEach((p) => {
        p.life++;
        if (p.life > p.maxLife) {
          Object.assign(p, createParticle(canvas.width, canvas.height));
          return;
        }

        const lifeRatio = p.life / p.maxLife;
        p.opacity =
          lifeRatio < 0.1
            ? lifeRatio / 0.1
            : lifeRatio > 0.7
              ? 1 - (lifeRatio - 0.7) / 0.3
              : 1;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          p.vx -= (dx / dist) * force * mouseStrength;
          p.vy -= (dy / dist) * force * mouseStrength;
        }

        p.vx += (Math.random() - 0.5) * wobble;
        p.vy -= floatUp;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = sparkColor.replace(
          /[\d.]+\)$/,
          `${p.opacity * 0.7})`
        );
        ctx.fill();

        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = sparkColor.replace(
            /[\d.]+\)$/,
            `${p.opacity * 0.15})`
          );
          ctx.fill();
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
