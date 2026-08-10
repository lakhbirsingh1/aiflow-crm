"use client";

import { useEffect, useRef } from "react";

export default function DotDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    let width = 0;
    let height = 0;
    let dpr = 1;

    const dots: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
    }[] = [];

    const spacing = 21;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots.length = 0;

      for (let y = 10; y < height; y += spacing) {
        for (let x = 10; x < width; x += spacing) {
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = event.clientX;
      mouse.targetY = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      for (const dot of dots) {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const radius = 190;

        if (distance < radius) {
          const normalized = 1 - distance / radius;
          const force = normalized * normalized;

          const angle = Math.atan2(dy, dx);

          const push = force * 2.4;

          dot.vx += Math.cos(angle) * push;
          dot.vy += Math.sin(angle) * push;

          dot.vx +=
            Math.sin(distance * 0.08) *
            force *
            0.35;

          dot.vy +=
            Math.cos(distance * 0.08) *
            force *
            0.35;
        }

        const springX =
          (dot.baseX - dot.x) * 0.045;

        const springY =
          (dot.baseY - dot.y) * 0.045;

        dot.vx += springX;
        dot.vy += springY;

        dot.vx *= 0.88;
        dot.vy *= 0.88;

        dot.x += dot.vx;
        dot.y += dot.vy;

        const cursorDistance = Math.sqrt(
          (dot.x - mouse.x) ** 2 +
            (dot.y - mouse.y) ** 2
        );

        const glowRadius = 220;

        const glow = Math.max(
          0,
          1 - cursorDistance / glowRadius
        );

        const velocity = Math.sqrt(
          dot.vx * dot.vx +
            dot.vy * dot.vy
        );

        const motionGlow = Math.min(
          velocity * 0.08,
          0.35
        );

        const finalGlow = Math.min(
          glow + motionGlow,
          1
        );

        const opacity =
          0.2 + finalGlow * 0.75;

        const size =
          1 + finalGlow * 1.8;

        ctx.beginPath();

        ctx.arc(
          dot.x,
          dot.y,
          size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(
          0,
          157,
          255,
          ${opacity}
        )`;

        ctx.shadowBlur = finalGlow * 16;

        ctx.shadowColor =
          "rgba(0, 157, 255, 0.9)";

        ctx.fill();
      }

      ctx.shadowBlur = 0;

      animationFrame =
        requestAnimationFrame(animate);
    };

    resize();

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    window.addEventListener(
      "resize",
      resize
    );

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      {/* Vignette */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(
            circle_at_center,
            transparent_15%,
            rgba(0,0,0,0.04)_55%,
            rgba(0,0,0,0.18)_100%
          )]
          dark:bg-[radial-gradient(
            circle_at_center,
            transparent_15%,
            rgba(0,0,0,0.12)_55%,
            rgba(0,0,0,0.5)_100%
          )]
        "
      />
    </div>
  );
}