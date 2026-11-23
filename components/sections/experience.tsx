import { ArrowUpRight } from "lucide-react";
import { experience } from "@/lib/data";
import { Timeline } from "@/components/ui/timeline";
import { GlowCard } from "@/components/ui/glow-card";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function Experience() {
  const data = experience.map((job) => ({
    key: job.company,
    title: (
      <div>
        <h3 className="font-display text-xl font-semibold text-neutral-100 md:text-3xl">
          {job.companyUrl ? (
            <a href={job.companyUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 hover:text-white">
              {job.company}
              <ArrowUpRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            job.company
          )}
        </h3>
        <p className="mt-1 font-mono text-xs tracking-wider text-neutral-500 uppercase">
          {job.start.split(" ")[1]} - {job.end === "Present" ? "Now" : job.end.split(" ")[1]}
        </p>
      </div>
    ),
    content: (
      <GlowCard
        className={cn(
          "p-6 md:p-7",
          job.highlight && "border-sky-400/25 bg-linear-to-br from-sky-500/[0.07] via-neutral-950 to-violet-500/[0.07]",
        )}
        color={job.highlight ? "rgba(139, 92, 246, 0.14)" : undefined}
      >
        <p className="font-display text-lg font-medium text-white md:text-xl">
          {job.role} <span className="text-neutral-500">·</span> {job.company}
        </p>
        <p className="mt-1 font-mono text-xs text-neutral-500">
          {job.start} - {job.end}
          {job.via && <> · {job.via}</>}
        </p>
        {job.summary && <p className="mt-3 text-neutral-400">{job.summary}</p>}
        {job.bullets.length > 0 && (
          <ul className="mt-5 space-y-3">
            {job.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-neutral-300 md:text-base">
                <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {job.stack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {job.stack.map((s) => (
              <li
                key={s}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-xs text-neutral-400 transition-colors hover:border-sky-400/40 hover:text-sky-200"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </GlowCard>
    ),
  }));

  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Experience" title="Where I've built things.">
        Six years across media, fintech, and enterprise platforms. Now building at Vast.
      </SectionHeading>
      <Timeline data={data} />
    </section>
  );
}
