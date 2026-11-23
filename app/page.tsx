import { FloatingNav } from "@/components/ui/floating-nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { DeepDive } from "@/components/sections/deep-dive";
import { Usc } from "@/components/sections/usc";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

const nav = [
  { name: "About", href: "#about", desktopOnly: true },
  { name: "Work", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Deep dive", href: "#deep-dive" },
  { name: "USC", href: "#usc" },
  { name: "Skills", href: "#skills", desktopOnly: true },
];

export default function Home() {
  return (
    <>
      <FloatingNav items={nav} cta={{ name: "Contact", href: "#contact" }} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <DeepDive />
        <Usc />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
