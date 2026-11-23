import { skills } from "@/lib/data";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SectionHeading } from "./section-heading";

const speeds = ["slow", "normal", "slow"] as const;

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <div className="px-6">
        <SectionHeading eyebrow="Toolkit" title="The stack I reach for." />
      </div>
      <div className="space-y-8">
        {Object.entries(skills).map(([group, items], i) => (
          <div key={group}>
            <div className="px-6">
              <p className="mx-auto mb-3 max-w-6xl font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">{group}</p>
            </div>
            <InfiniteMovingCards items={items} direction={i % 2 === 0 ? "left" : "right"} speed={speeds[i % speeds.length]} />
          </div>
        ))}
      </div>
    </section>
  );
}
