// Adapted from Aceternity UI: Bento Grid, with a mouse-follow glow on each cell.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GlowCard } from "./glow-card";

export function BentoGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto grid max-w-6xl grid-cols-1 gap-4 md:auto-rows-[minmax(15rem,auto)] md:grid-cols-3", className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title: ReactNode;
  description: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <GlowCard className={cn("group/bento row-span-1", className)}>
      <div className="flex h-full flex-col justify-between gap-4 p-5">
        {header}
        <div className="transition duration-200 group-hover/bento:translate-x-1.5">
          {icon}
          <div className="font-display mt-3 mb-1.5 text-lg font-semibold text-neutral-100">{title}</div>
          <div className="text-sm leading-relaxed text-neutral-400">{description}</div>
        </div>
      </div>
    </GlowCard>
  );
}
