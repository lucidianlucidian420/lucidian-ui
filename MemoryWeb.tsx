"use client";
import { useEffect, useRef } from "react";

export default function MemoryWeb({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      dots.forEach((dot, i) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "#a855f7"; // purple
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = "rgba(168, 85, 247, 0.3)";
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <div className={`relative h-64 w-full mt-6 border border-purple-300 rounded-xl overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute top-2 left-2 text-xs text-purple-400">🕸️ Memory Web</p>
    </div>
  );
}
