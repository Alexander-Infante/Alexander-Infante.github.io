import { Mail } from "lucide-react";
import { site } from "@/lib/data";
import { LampContainer } from "@/components/ui/lamp";
import { MovingBorderLink } from "@/components/ui/moving-border";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { SocialDock } from "./socials";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <LampContainer>
        <p className="mb-3 text-xs tracking-[0.2em] text-white/80 uppercase">
          <EncryptedText text="Contact" />
        </p>
        <h2 className="font-display bg-linear-to-br from-white to-neutral-500 bg-clip-text py-2 text-center text-4xl font-semibold tracking-tight text-transparent md:text-7xl">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400 md:text-lg">
          Whether it&apos;s a role, a project, or a question about cloud and AI architecture, my inbox is open.
        </p>
        <div className="mt-10 flex flex-wrap items-end justify-center gap-x-4 gap-y-8">
          <MovingBorderLink href={`mailto:${site.email}`}>
            <Mail className="h-4 w-4" /> {site.email}
          </MovingBorderLink>
          <SocialDock />
        </div>
      </LampContainer>

      <footer className="relative z-10 mx-auto -mt-40 max-w-6xl px-6 pb-10">
        <TextHoverEffect text="ALEX INFANTE" />
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-neutral-600 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Built with Next.js, Tailwind & Aceternity UI components</p>
        </div>
      </footer>
    </section>
  );
}
