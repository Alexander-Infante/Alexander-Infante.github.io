import type { ReactNode } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mx-auto mb-12 max-w-6xl md:mb-16">
      <p className="mb-3 text-xs tracking-[0.2em] text-sky-400 uppercase">
        <EncryptedText text={eyebrow} />
      </p>
      <h2 className="font-display max-w-3xl bg-linear-to-b from-white to-neutral-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-5xl">
        {title}
      </h2>
      {children && <div className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">{children}</div>}
    </div>
  );
}
