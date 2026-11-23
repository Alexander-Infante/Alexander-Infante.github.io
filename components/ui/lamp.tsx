"use client";
// Adapted from Aceternity UI: Lamp Effect.
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const grow = { delay: 0.3, duration: 0.8, ease: "easeInOut" } as const;

export function LampContainer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative z-0 flex min-h-[42rem] w-full flex-col items-center justify-center overflow-hidden bg-black", className)}>
      <div aria-hidden className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={grow}
          style={{ backgroundImage: "conic-gradient(from 70deg at center top, #38bdf8, transparent, transparent)" }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-black [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          viewport={{ once: true }}
          transition={grow}
          style={{ backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, #38bdf8)" }}
          className="absolute inset-auto left-1/2 h-56"
        >
          <div className="absolute right-0 bottom-0 z-20 h-full w-40 bg-black [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute right-0 bottom-0 z-20 h-40 w-full bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-sky-500 opacity-40 blur-3xl" />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true }}
          transition={grow}
          className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-sky-400 blur-2xl"
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          viewport={{ once: true }}
          transition={grow}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-sky-400"
        />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black" />
      </div>
      <div className="relative z-50 flex -translate-y-72 flex-col items-center px-5">{children}</div>
    </div>
  );
}
