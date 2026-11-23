"use client";
// In the style of Aceternity UI's Encrypted Text: scrambles, then decrypts on view and on hover.
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/=+";

export function EncryptedText({
  text,
  className,
  revealMs = 35,
  flipMs = 45,
}: {
  text: string;
  className?: string;
  revealMs?: number;
  flipMs?: number;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const running = useRef(false);

  const run = useCallback(() => {
    if (running.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;
    const start = performance.now();
    let last = 0;
    const tick = (t: number) => {
      const revealed = Math.floor((t - start) / revealMs);
      if (t - last >= flipMs) {
        last = t;
        setDisplay(
          text
            .split("")
            .map((c, i) => (i < revealed || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(""),
        );
      }
      if (revealed < text.length) requestAnimationFrame(tick);
      else {
        setDisplay(text);
        running.current = false;
      }
    };
    requestAnimationFrame(tick);
  }, [text, revealMs, flipMs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [run]);

  return (
    <span ref={ref} onMouseEnter={run} className={cn("cursor-default font-mono", className)} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
