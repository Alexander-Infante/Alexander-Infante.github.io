import { GraduationCap } from "lucide-react";
import { usc } from "@/lib/data";
import { WobbleCard } from "@/components/ui/wobble-card";
import { ExpandableCards } from "@/components/ui/expandable-cards";
import { SectionHeading } from "./section-heading";

export function Usc() {
  const { highlight } = usc;

  const items = usc.courses.map((c) => ({
    id: c.id,
    code: c.code,
    title: c.title,
    summary: c.summary,
    details: (
      <ul className="space-y-4">
        {c.points.map((p) => (
          <li key={p} className="flex gap-3 leading-relaxed text-neutral-300">
            <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <section id="usc" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="USC" title="What I'm learning beyond the code.">
        {usc.intro}
      </SectionHeading>

      <div className="mx-auto mb-6 flex max-w-6xl flex-wrap items-center gap-3 text-sm text-neutral-400">
        <GraduationCap className="h-5 w-5 text-sky-400" />
        <span className="text-neutral-200">{usc.program}</span>
        <span aria-hidden className="hidden text-neutral-600 sm:inline">·</span>
        <span>{usc.school}</span>
        <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 font-mono text-xs text-sky-300">
          {usc.status}
        </span>
      </div>

      <div className="mx-auto max-w-6xl">
        <WobbleCard containerClassName="bg-linear-to-br from-violet-900 via-indigo-900 to-sky-900">
          <p className="font-mono text-xs tracking-[0.2em] text-sky-200/80 uppercase">{highlight.course}</p>
          <h3 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {highlight.title}
          </h3>
          <p className="mt-5 max-w-2xl leading-relaxed text-indigo-100/80 md:text-lg">{highlight.description}</p>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {highlight.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 backdrop-blur">
                <dt className="font-mono text-[11px] tracking-wider text-indigo-200/70 uppercase">{s.label}</dt>
                <dd className="font-display mt-1 text-2xl font-semibold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 flex max-w-3xl flex-wrap gap-2">
            {highlight.frameworks.map((f) => (
              <li key={f} className="rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-xs text-indigo-100/80">
                {f}
              </li>
            ))}
          </ul>
        </WobbleCard>
      </div>

      <ExpandableCards items={items} className="mx-auto mt-6 max-w-6xl" />
    </section>
  );
}
