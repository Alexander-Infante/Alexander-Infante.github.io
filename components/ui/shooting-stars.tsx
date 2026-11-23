"use client";
// Adapted from Aceternity UI: Shooting Stars & Stars Background.
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ShootingStar = { id: number; x: number; y: number; angle: number; scale: number; speed: number; distance: number };

function randomStart(w: number, h: number) {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * (side % 2 === 0 ? w : h);
  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: w, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: h, angle: 225 };
    default:
      return { x: 0, y: offset, angle: 315 };
  }
}

export function ShootingStars({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}: {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}) {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientId = useId().replace(/:/g, "");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timeout: ReturnType<typeof setTimeout>;
    const spawn = () => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        const { x, y, angle } = randomStart(rect.width, rect.height);
        setStar({ id: Date.now(), x, y, angle, scale: 1, speed: Math.random() * (maxSpeed - minSpeed) + minSpeed, distance: 0 });
      }
      timeout = setTimeout(spawn, Math.random() * (maxDelay - minDelay) + minDelay);
    };
    spawn();
    return () => clearTimeout(timeout);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    let frame = 0;
    const move = () => {
      const rect = svgRef.current?.getBoundingClientRect();
      setStar((prev) => {
        if (!prev || !rect) return prev;
        const x = prev.x + prev.speed * Math.cos((prev.angle * Math.PI) / 180);
        const y = prev.y + prev.speed * Math.sin((prev.angle * Math.PI) / 180);
        if (x < -20 || x > rect.width + 20 || y < -20 || y > rect.height + 20) return null;
        const distance = prev.distance + prev.speed;
        return { ...prev, x, y, distance, scale: 1 + distance / 100 };
      });
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg ref={svgRef} aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill={`url(#${gradientId})`}
          transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={trailColor} stopOpacity={0} />
          <stop offset="100%" stopColor={starColor} stopOpacity={1} />
        </linearGradient>
      </defs>
    </svg>
  );
}
