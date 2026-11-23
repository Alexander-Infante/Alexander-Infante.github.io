"use client";
// Adapted from Aceternity UI: Wobble Card.
import { useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function WobbleCard({
  children,
  containerClassName,
  className,
}: {
  children: ReactNode;
  containerClassName?: string;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  function onMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) / 25,
      y: (e.clientY - (rect.top + rect.height / 2)) / 25,
    });
  }

  return (
    <motion.section
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setPos({ x: 0, y: 0 });
      }}
      style={{
        transform: hovering ? `translate3d(${pos.x}px, ${pos.y}px, 0) scale3d(1, 1, 1)` : "translate3d(0, 0, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn("relative mx-auto w-full overflow-hidden rounded-3xl", containerClassName)}
    >
      <div className="relative h-full overflow-hidden [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.35),rgba(255,255,255,0))]">
        <motion.div
          style={{
            transform: hovering
              ? `translate3d(${-pos.x}px, ${-pos.y}px, 0) scale3d(1.03, 1.03, 1)`
              : "translate3d(0, 0, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className={cn("h-full px-6 py-12 sm:px-10 md:py-16", className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
