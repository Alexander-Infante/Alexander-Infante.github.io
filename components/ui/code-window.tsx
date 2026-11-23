import { cn } from "@/lib/utils";

/** A small editor-style window for showing a few lines of real code. */
export function CodeWindow({ file, lines, className }: { file: string; lines: string[]; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/10 bg-black/70 shadow-2xl backdrop-blur", className)}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        <span className="ml-2 truncate font-mono text-xs text-neutral-500">{file}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-6 md:p-5 md:text-[13px]">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span aria-hidden className="mr-4 w-5 shrink-0 text-right text-neutral-700 select-none">
              {i + 1}
            </span>
            <code className={line.trim().startsWith("//") ? "text-neutral-500" : "text-sky-100"}>{line || " "}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}
