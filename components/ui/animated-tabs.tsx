"use client";
// Adapted from Aceternity UI: Tabs (sliding pill highlight, content cross-fade).
import { useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TabItem = { value: string; title: string; content: ReactNode };

export function AnimatedTabs({ tabs, className }: { tabs: TabItem[]; className?: string }) {
  const [active, setActive] = useState(tabs[0].value);
  const pillId = useId();
  const barRef = useRef<HTMLDivElement>(null);
  const current = tabs.find((t) => t.value === active) ?? tabs[0];

  function select(value: string) {
    setActive(value);
    // If the reader is deep inside a long tab, bring the new tab's start into view.
    const bar = barRef.current;
    if (bar && bar.getBoundingClientRect().top < 0) {
      bar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className={className}>
      <div ref={barRef} className="scroll-mt-24" />
      <div className="sticky top-16 z-40 mx-auto mb-6 max-w-6xl bg-linear-to-b from-black from-70% to-transparent pt-4 pb-8">
        <div
          role="tablist"
          aria-label="Deep dive topics"
          className="flex w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-black/70 p-1.5 backdrop-blur-md [scrollbar-width:none] sm:w-fit"
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              type="button"
              aria-selected={active === tab.value}
              onClick={() => select(tab.value)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors",
                active === tab.value ? "text-white" : "text-neutral-400 hover:text-neutral-200",
              )}
            >
              {active === tab.value && (
                <motion.span
                  layoutId={pillId}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  className="absolute inset-0 rounded-full border border-white/15 bg-linear-to-r from-sky-500/25 to-violet-500/25"
                />
              )}
              <span className="relative">{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.value}
          role="tabpanel"
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          transition={{ duration: 0.3 }}
        >
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
