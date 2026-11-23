import { BrainCircuit, Building2, Rocket, ShieldCheck, Users } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionHeading } from "./section-heading";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col justify-center rounded-xl bg-linear-to-br from-neutral-900 to-neutral-950 p-4">
      <NumberTicker
        value={value}
        suffix={suffix}
        className="font-display bg-linear-to-r from-sky-300 to-violet-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
      />
      <div className="mt-1 font-mono text-xs tracking-wider text-neutral-500 uppercase">{label}</div>
    </div>
  );
}

function SecurityHeader() {
  const lines = ["JWT.ALG = RS256 // PINNED", "HOP = HMAC_SHA256 // 300S WINDOW", "MQTT.TOPIC = ${COGNITO:SUB}/*", "NAT_GATEWAYS = 0 // DB_PASSWORD = NULL"];
  return (
    <div className="relative flex flex-1 flex-col justify-center gap-1.5 overflow-hidden rounded-xl bg-neutral-900/40 p-4 text-xs text-sky-300/80 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] md:text-sm">
      {lines.map((l) => (
        <EncryptedText key={l} text={l} revealMs={45} />
      ))}
      <span className="mt-1 font-mono text-[10px] tracking-widest text-neutral-600 uppercase">hover to re-encrypt</span>
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-2 rounded-xl bg-linear-to-br from-neutral-900 to-neutral-950 p-4">
      <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-sky-500/20 px-3 py-1.5 text-xs text-sky-100 transition-transform duration-300 group-hover/bento:-translate-x-2">
        Signed. Let&apos;s ship it.
      </div>
      <div className="w-fit rounded-2xl rounded-bl-sm bg-neutral-800 px-3 py-1.5 text-xs text-neutral-300 transition-transform duration-300 group-hover/bento:translate-x-2">
        End-to-end encrypted 🔒
      </div>
    </div>
  );
}

const iconClass = "h-5 w-5 text-sky-400";

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <SectionHeading eyebrow="About" title="Shipping secure, intelligent systems, and the teams that build them.">
        I&apos;ve spent 6+ years building production software across media, fintech, mortgage, and enterprise SaaS. I care about
        architectures that are secure by default, AI that earns its place in the product, and teams that ship with confidence.
      </SectionHeading>

      <BentoGrid>
        <BentoGridItem
          className="md:col-span-2"
          header={<SecurityHeader />}
          icon={<ShieldCheck className={iconClass} />}
          title="Secure by design"
          description={
            <>
              Pinned-algorithm JWT verification, HMAC-signed service hops, per-identity IAM policies and a VPC with no NAT
              and no database passwords. Layered so no single control is the whole wall.{" "}
              <a href="#deep-dive" className="text-sky-300 underline-offset-4 hover:underline">
                See the deep dive
              </a>
            </>
          }
        />
        <BentoGridItem
          header={<Stat value={6} suffix="+" label="Years engineering" />}
          icon={<Rocket className={iconClass} />}
          title="Production at scale"
          description="From 6,000-person enterprises to 4-person startups."
        />
        <BentoGridItem
          header={<Stat value={60} suffix="%" label="Adoption in 2 months" />}
          icon={<BrainCircuit className={iconClass} />}
          title="AI that gets used"
          description="RAG, agents, and LLM pipelines with LangChain, LangGraph, pgvector and Bedrock."
        />
        <BentoGridItem
          header={<Stat value={4} suffix="+" label="Years leading teams" />}
          icon={<Users className={iconClass} />}
          title="Engineering leadership"
          description="Managed teams and initiatives, including a distributed team that lifted test coverage 84%+."
        />
        <BentoGridItem
          header={<ChatHeader />}
          icon={<Building2 className={iconClass} />}
          title="Founder, RevApps"
          description="Built an enterprise encrypted messaging platform that signed Coinbase."
        />
      </BentoGrid>
    </section>
  );
}
