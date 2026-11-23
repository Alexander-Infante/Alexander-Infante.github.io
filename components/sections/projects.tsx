import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { CardBody, CardContainer, CardItem } from "@/components/ui/three-d-card";
import { Meteors } from "@/components/ui/meteors";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Projects" title="Things I've made.">
        Hover a card to tilt it.
      </SectionHeading>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <CardContainer
            key={p.name}
            maxTilt={p.featured ? 4 : 8}
            containerClassName={cn("h-full", p.featured && "md:col-span-2")}
            className="h-full w-full"
          >
            <CardBody
              className={cn(
                "group/card relative flex h-full w-full flex-col rounded-2xl border border-white/10 bg-neutral-950 p-7 transition-shadow duration-300 hover:shadow-2xl hover:shadow-sky-500/10 md:p-9",
                p.featured && "bg-linear-to-br from-neutral-950 via-neutral-950 to-sky-950/40 md:min-h-96",
              )}
            >
              {p.featured && <Meteors number={18} />}
              <CardItem translateZ={30} className="font-mono text-xs tracking-[0.2em] text-sky-400 uppercase">
                {p.kicker}
              </CardItem>
              <CardItem
                translateZ={70}
                className={cn(
                  "font-display mt-3 font-semibold tracking-tight text-white",
                  p.featured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl",
                )}
              >
                {p.name}
              </CardItem>
              <CardItem
                translateZ={45}
                className={cn("mt-4 leading-relaxed text-neutral-400", p.featured ? "max-w-2xl text-base md:text-lg" : "text-sm md:text-base")}
              >
                {p.description}
              </CardItem>
              <CardItem translateZ={25} className="mt-auto w-full pt-6">
                <ul className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-md border border-white/10 bg-black/40 px-2 py-1 font-mono text-xs text-neutral-400">
                      {s}
                    </li>
                  ))}
                </ul>
              </CardItem>
              {p.url && (
                <CardItem translateZ={60} className="mt-6">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-sky-100"
                  >
                    Visit {p.url.replace("https://", "")} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </CardItem>
              )}
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}
