"use client";
// Adapted from Aceternity UI: Sticky Scroll Reveal, driven by page scroll.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

export type StickyItem = { key: string; kicker: string; title: string; description: ReactNode; panel: ReactNode };

const glows = [
  "from-sky-500/30 via-cyan-500/10",
  "from-violet-500/30 via-indigo-500/10",
  "from-cyan-400/30 via-sky-500/10",
  "from-fuchsia-500/25 via-violet-500/10",
  "from-emerald-500/25 via-cyan-500/10",
  "from-indigo-500/30 via-sky-500/10",
];

export function StickyScroll({ items }: { items: StickyItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(items.length - 1, Math.max(0, Math.floor(p * items.length))));
  });

  return (
    <div ref={ref} className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
      <div className="min-w-0">
        {items.map((item, i) => (
          <div key={item.key} className="py-8 md:flex md:min-h-[60vh] md:flex-col md:justify-center md:py-0">
            <motion.div animate={{ opacity: desktop && active !== i ? 0.25 : 1 }} transition={{ duration: 0.3 }}>
              <p className="font-mono text-xs tracking-[0.2em] text-sky-400 uppercase">
                {String(i + 1).padStart(2, "0")} · {item.kicker}
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">{item.title}</h3>
              <div className="mt-4 text-base leading-relaxed text-neutral-400">{item.description}</div>
              <div className="mt-6 md:hidden">{item.panel}</div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <div className="sticky top-[20vh] h-[56vh]">
          <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
            <AnimatePresence>
              <motion.div
                key={`glow-${active}`}
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={cn("absolute inset-0 bg-linear-to-br to-transparent", glows[active % glows.length])}
              />
            </AnimatePresence>
            <div className="relative flex h-full flex-col justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[active].key}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.3 }}
                >
                  {items[active].panel}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute right-6 bottom-5 flex gap-1.5">
              {items.map((item, i) => (
                <span
                  key={item.key}
                  className={cn("h-1 rounded-full transition-all duration-300", i === active ? "w-6 bg-sky-400" : "w-1.5 bg-white/20")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
