"use client";
// Adapted from Aceternity UI: Text Generate Effect.
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerateEffect({
  words,
  className,
  duration = 0.5,
  delay = 0,
}: {
  words: string;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const [scope, animate] = useAnimate();
  const list = words.split(" ");

  useEffect(() => {
    animate("span", { opacity: 1, filter: "blur(0px)" }, { duration, delay: stagger(0.05, { startDelay: delay }) });
  }, [animate, duration, delay]);

  return (
    <p className={cn(className)}>
      <span ref={scope}>
        {list.map((word, i) => (
          <motion.span key={word + i} className="opacity-0" style={{ filter: "blur(10px)" }}>
            {word}{" "}
          </motion.span>
        ))}
      </span>
    </p>
  );
}
