// Adapted from Aceternity UI: Meteors. Uses seeded randomness so SSR and client match.
import { cn, seeded } from "@/lib/utils";

export function Meteors({ number = 20, className }: { number?: number; className?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {Array.from({ length: number }, (_, i) => (
        <span
          key={i}
          className={cn(
            "animate-meteor absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-slate-400 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-linear-to-r before:from-slate-400 before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: `${Math.floor(seeded(i, 1) * 40) - 10}%`,
            left: `${Math.floor(seeded(i, 2) * 140) - 20}%`,
            animationDelay: `${(seeded(i, 3) * 6).toFixed(2)}s`,
            animationDuration: `${Math.floor(seeded(i, 4) * 8 + 3)}s`,
          }}
        />
      ))}
    </div>
  );
}
