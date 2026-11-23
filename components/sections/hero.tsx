import { ArrowDown, Mail } from "lucide-react";
import { site } from "@/lib/data";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MovingBorderLink } from "@/components/ui/moving-border";
import { HeroRoles } from "./hero-roles";
import { SocialDock } from "./socials";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh w-full items-center overflow-hidden bg-black">
      <StarsBackground />
      <ShootingStars />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(56,189,248,0.08),transparent)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-24">
        <h1 className="font-display bg-linear-to-b from-white via-white to-neutral-500 bg-clip-text text-[3.5rem] leading-[0.95] font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl">
          Alexander
          <br />
          Infante
        </h1>

        <p className="font-display mt-8 text-2xl font-medium text-neutral-200 md:text-4xl">
          I build
          <FlipWords
            words={site.flipWords}
            className="bg-linear-to-r from-sky-300 to-violet-400 bg-clip-text px-2 text-transparent"
          />
          <br className="sm:hidden" />
          systems on the cloud.
        </p>
        <TextGenerateEffect
          words={site.tagline}
          delay={0.3}
          className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-xl"
        />

        <HeroRoles />

        <div className="mt-10 flex flex-wrap items-end gap-x-4 gap-y-8">
          <MovingBorderLink href="#contact" containerClassName="w-44">
            <Mail className="h-4 w-4" /> Get in touch
          </MovingBorderLink>
          <a
            href="#experience"
            className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            See my work <ArrowDown className="h-4 w-4" />
          </a>
          <SocialDock />
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-black" />
    </section>
  );
}
