import { experience } from "@/lib/data";

/** The two most recent roles, e.g. "Senior Software Engineer · Vast · December 2026 - Present". */
export function HeroRoles() {
  return (
    <ul className="mt-8 space-y-2">
      {experience.slice(0, 2).map((job, i) => (
        <li key={job.company} className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-sm md:text-base">
          <span
            aria-hidden
            className={i === 0 ? "h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" : "h-1.5 w-1.5 rounded-full bg-neutral-600"}
          />
          <span className="text-neutral-300">{job.role}</span>
          <span aria-hidden className="text-neutral-600">·</span>
          {job.companyUrl ? (
            <a href={job.companyUrl} target="_blank" rel="noreferrer" className="font-medium text-white underline-offset-4 hover:underline">
              {job.company}
            </a>
          ) : (
            <span className="font-medium text-white">{job.company}</span>
          )}
          <span aria-hidden className="text-neutral-600">·</span>
          <span className="font-mono text-xs text-neutral-500 md:text-sm">
            {job.start} - {job.end}
          </span>
        </li>
      ))}
    </ul>
  );
}
