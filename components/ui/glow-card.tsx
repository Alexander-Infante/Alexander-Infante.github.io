"use client";
// Mouse-follow spotlight card, in the style of Aceternity UI's Card Spotlight.
import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlowCard({
  children,
  className,
  radius = 380,
  color = "rgba(56, 189, 248, 0.10)",
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  color?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  }

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`;

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        "group/glow relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 transition-colors hover:border-white/20",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/glow:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
