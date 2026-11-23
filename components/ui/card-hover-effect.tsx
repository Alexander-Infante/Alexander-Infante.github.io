"use client";
// Adapted from Aceternity UI: Card Hover Effect (a highlight that slides between cards).
import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type HoverItem = { title: string; description: string; icon?: ReactNode; tag?: string; href?: string };

export function HoverEffect({ items, className }: { items: HoverItem[]; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const layoutId = useId();

  return (
    <div className={cn("mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3", className)}>
      {items.map((item, i) => {
        const Inner = (
          <>
            <AnimatePresence>
              {hovered === i && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 block h-full w-full rounded-3xl bg-linear-to-br from-sky-500/30 to-violet-500/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <div className="relative z-20 h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 transition-colors group-hover:border-white/20">
              {item.icon}
              <p className="font-display mt-4 text-lg font-semibold text-neutral-100">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-400">{item.description}</p>
              {item.tag && (
                <span className="mt-4 inline-block rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 font-mono text-xs text-sky-300">
                  {item.tag}
                </span>
              )}
            </div>
          </>
        );
        const props = {
          className: "group relative block h-full w-full p-2",
          onMouseEnter: () => setHovered(i),
          onMouseLeave: () => setHovered(null),
        };
        return item.href ? (
          <a
            key={item.title}
            href={item.href}
            {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            {...props}
          >
            {Inner}
          </a>
        ) : (
          <div key={item.title} {...props}>
            {Inner}
          </div>
        );
      })}
    </div>
  );
}
