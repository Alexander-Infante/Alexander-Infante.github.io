import { deepDive, deepDiveStats } from "@/lib/data";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { CodeWindow } from "@/components/ui/code-window";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionHeading } from "./section-heading";

export function DeepDive() {
  const tabs = deepDive.map((tab) => ({
    value: tab.id,
    title: tab.label,
    content: (
      <div>
        <p className="mx-auto mb-2 max-w-6xl text-neutral-400 md:text-lg">{tab.intro}</p>
        <StickyScroll
          items={tab.layers.map((layer) => ({
            key: `${tab.id}-${layer.title}`,
            kicker: layer.kicker,
            title: layer.title,
            description: layer.description,
            panel: <CodeWindow file={layer.file} lines={layer.lines} />,
          }))}
        />
      </div>
    ),
  }));

  return (
    <section id="deep-dive" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Under the hood" title="How I build production AI systems.">
        Real patterns from sophishy&apos;s API, by topic. Pick a tab and scroll through it.
      </SectionHeading>

      <dl className="mx-auto mb-12 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-5">
        {deepDiveStats.map((s) => (
          <div key={s.label} className="bg-neutral-950 px-5 py-4 last:col-span-2 sm:last:col-span-1">
            <dt className="font-mono text-[11px] tracking-wider text-neutral-500 uppercase">{s.label}</dt>
            <dd className="font-display mt-1 text-3xl font-semibold text-white">
              <NumberTicker value={s.value} />
            </dd>
          </div>
        ))}
      </dl>

      <AnimatedTabs tabs={tabs} />
    </section>
  );
}
