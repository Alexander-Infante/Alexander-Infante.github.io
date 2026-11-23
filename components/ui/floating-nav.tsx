"use client";
// Adapted from Aceternity UI: Floating Navbar.
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingNav({
  items,
  cta,
  className,
}: {
  items: { name: string; href: string; desktopOnly?: boolean }[];
  cta: { name: string; href: string };
  className?: string;
}) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setVisible(current < 120 || current < previous);
  });

  return (
    <motion.nav
      aria-label="Primary"
      initial={{ opacity: 0, y: -100 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "fixed inset-x-0 top-5 z-50 mx-auto flex max-w-fit items-center gap-0.5 rounded-full border border-white/10 bg-black/60 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md sm:gap-1",
        className,
      )}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-full px-2.5 py-1.5 text-xs text-neutral-400 transition-colors hover:bg-white/5 hover:text-white sm:px-3.5 sm:text-sm",
            item.desktopOnly && "hidden sm:inline-block",
          )}
        >
          {item.name}
        </a>
      ))}
      <a
        href={cta.href}
        className="relative ml-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 sm:px-4 sm:text-sm"
      >
        {cta.name}
        <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-linear-to-r from-transparent via-sky-400 to-transparent" />
      </a>
    </motion.nav>
  );
}
