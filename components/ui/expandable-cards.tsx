"use client";
// Adapted from Aceternity UI: Expandable Card (shared-layout modal).
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExpandableItem = {
  id: string;
  code: string;
  title: string;
  summary: string;
  details: ReactNode;
};

export function ExpandableCards({ items, className }: { items: ExpandableItem[]; className?: string }) {
  const [active, setActive] = useState<ExpandableItem | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[70] grid place-items-center p-4">
            <motion.div
              ref={panelRef}
              layoutId={`card-${active.id}-${uid}`}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6 md:p-8">
                <div>
                  <motion.p layoutId={`code-${active.id}-${uid}`} className="font-mono text-xs tracking-[0.2em] text-sky-400 uppercase">
                    {active.code}
                  </motion.p>
                  <motion.h3
                    layoutId={`title-${active.id}-${uid}`}
                    className="font-display mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl"
                  >
                    {active.title}
                  </motion.h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="shrink-0 rounded-full border border-white/10 p-2 text-neutral-400 transition-colors hover:border-white/25 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-y-auto p-6 md:p-8"
              >
                {active.details}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className={cn("grid gap-4 md:grid-cols-2", className)}>
        {items.map((item) => (
          <motion.li key={item.id} layoutId={`card-${item.id}-${uid}`} className="rounded-2xl">
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-neutral-950 p-6 text-left transition-colors hover:border-white/25 hover:bg-neutral-900/60"
            >
              <motion.p layoutId={`code-${item.id}-${uid}`} className="font-mono text-xs tracking-[0.2em] text-sky-400 uppercase">
                {item.code}
              </motion.p>
              <motion.h3 layoutId={`title-${item.id}-${uid}`} className="font-display mt-2 text-xl font-semibold text-neutral-100">
                {item.title}
              </motion.h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.summary}</p>
              <span className="mt-auto pt-5 text-sm text-sky-300 transition-transform group-hover:translate-x-1">
                What I learned →
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
