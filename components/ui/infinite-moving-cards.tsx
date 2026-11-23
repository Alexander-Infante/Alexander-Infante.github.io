// Adapted from Aceternity UI: Infinite Moving Cards (CSS-only marquee, no DOM cloning).
import { cn } from "@/lib/utils";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  className,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) {
  const duration = speed === "fast" ? "30s" : speed === "normal" ? "45s" : "70s";
  const row = (hidden: boolean) =>
    items.map((item) => (
      <li
        key={`${item}-${hidden}`}
        aria-hidden={hidden || undefined}
        className="shrink-0 rounded-full border border-white/10 bg-linear-to-b from-neutral-900 to-neutral-950 px-4 py-2 font-mono text-sm whitespace-nowrap text-neutral-300"
      >
        {item}
      </li>
    ));

  return (
    <div
      className={cn(
        "group/marquee relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className,
      )}
    >
      <ul
        className="animate-scroll flex w-max min-w-full shrink-0 flex-nowrap gap-3 py-2 group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: duration, animationDirection: direction === "left" ? "normal" : "reverse" }}
      >
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}
