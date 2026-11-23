import { GraduationCap, Mic } from "lucide-react";
import { community, education } from "@/lib/data";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SectionHeading } from "./section-heading";

export function Education() {
  const items = [
    ...education.map((e) => ({
      title: e.school,
      description: e.detail,
      tag: e.note,
      href: e.href,
      icon: <GraduationCap className="h-5 w-5 text-sky-400" />,
    })),
    ...community.map((c) => ({
      title: c.name,
      description: c.detail,
      tag: "Community",
      icon: <Mic className="h-5 w-5 text-violet-400" />,
    })),
  ];

  return (
    <section id="education" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Beyond the code" title="Learning, and giving back." />
      <HoverEffect items={items} className="-mx-2 md:mx-auto" />
    </section>
  );
}
